/* ============================================================
   ImageEditor.jsx — Full-featured canvas image editor page
   Supports: crop, resize, rotate, brightness/contrast,
             filters, and lossless-ish compression download.
   ============================================================ */
import { useEffect, useRef, useState, useCallback, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload, RotateCcw, RotateCw, Download, Crop, ZoomIn, ZoomOut,
  Sun, Contrast, Sliders, ImageIcon, Trash2, ChevronDown, ChevronUp,
  Maximize2, RefreshCw, Wand2, X
} from "lucide-react";

/* ── CSS Filters preset list ── */
const FILTER_PRESETS = [
  { name: "None",       css: "" },
  { name: "Vivid",      css: "saturate(1.8) contrast(1.1)" },
  { name: "Matte",      css: "contrast(0.85) saturate(0.9) brightness(1.05)" },
  { name: "Chrome",     css: "contrast(1.2) saturate(1.3) hue-rotate(5deg)" },
  { name: "Fade",       css: "contrast(0.8) saturate(0.6) brightness(1.15)" },
  { name: "B&W",        css: "grayscale(1)" },
  { name: "Sepia",      css: "sepia(0.85)" },
  { name: "Cool",       css: "hue-rotate(200deg) saturate(1.2)" },
  { name: "Warm",       css: "hue-rotate(-20deg) saturate(1.3) brightness(1.05)" },
  { name: "Dramatic",   css: "contrast(1.4) brightness(0.9) saturate(1.3)" },
  { name: "Soft",       css: "blur(0.3px) brightness(1.05) contrast(0.9)" },
  { name: "Neon",       css: "saturate(2) contrast(1.2) hue-rotate(30deg)" },
];

/* ── Clamp helper ── */
const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

/* ── Slider control ── */
function Slider({ label, icon: Icon, value, min, max, step = 1, onChange, unit = "" }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="flex items-center gap-1.5 text-white/60 font-medium">
          {Icon && <Icon size={12} />}{label}
        </span>
        <span className="text-violet-300 font-mono">{value}{unit}</span>
      </div>
      <div className="relative h-1.5 rounded-full bg-white/10">
        <div
          className="absolute left-0 top-0 h-full rounded-full"
          style={{
            width: `${((value - min) / (max - min)) * 100}%`,
            background: "linear-gradient(90deg, #7c3aed, #0891b2)"
          }}
        />
        <input
          type="range" min={min} max={max} step={step} value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
        />
      </div>
    </div>
  );
}

/* ── Collapsible panel ── */
function Panel({ title, icon: Icon, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="glass rounded-2xl overflow-hidden border border-white/5">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-white/80 hover:text-white transition-colors"
      >
        <span className="flex items-center gap-2"><Icon size={14} className="text-violet-400" />{title}</span>
        {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 flex flex-col gap-3">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   Main Editor Component
   ══════════════════════════════════════════════════════════════ */
export default function ImageEditor() {
  const canvasRef    = useRef(null);
  const previewRef   = useRef(null); // off-screen canvas for crop
  const fileInputRef = useRef(null);
  const [image,    setImage]    = useState(null); // HTMLImageElement
  const [fileName, setFileName] = useState("");

  /* ── Adjustments ── */
  const [brightness,  setBrightness]  = useState(100);
  const [contrast,    setContrast]    = useState(100);
  const [saturation,  setSaturation]  = useState(100);
  const [sharpness,   setSharpness]   = useState(0);
  const [rotation,    setRotation]    = useState(0);
  const [scaleX,      setScaleX]      = useState(100);
  const [scaleY,      setScaleY]      = useState(100);
  const [filterIdx,   setFilterIdx]   = useState(0);
  const [quality,     setQuality]     = useState(90);
  const [outputFmt,   setOutputFmt]   = useState("image/jpeg");

  /* ── Crop state ── */
  const [cropMode, setCropMode]   = useState(false);
  const [cropRect, setCropRect]   = useState(null);
  const [dragging, setDragging]   = useState(false);
  const [cropStart,setCropStart]  = useState(null);
  const [cropEnd,  setCropEnd]    = useState(null);

  /* ── History ── */
  const [history, setHistory] = useState([]);
  const pushHistory = useCallback((img) => {
    setHistory(h => [...h.slice(-9), img]);
  }, []);

  /* ── Build CSS filter string ── */
  const buildFilter = useCallback(() => {
    const preset = FILTER_PRESETS[filterIdx].css;
    const base = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;
    return preset ? `${base} ${preset}` : base;
  }, [brightness, contrast, saturation, filterIdx]);

  /* ── Draw image on canvas ── */
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !image) return;
    const ctx = canvas.getContext("2d");

    const rad = (rotation * Math.PI) / 180;
    const cos = Math.abs(Math.cos(rad));
    const sin = Math.abs(Math.sin(rad));
    const sw  = (image.naturalWidth  * scaleX) / 100;
    const sh  = (image.naturalHeight * scaleY) / 100;
    canvas.width  = Math.round(sw * cos + sh * sin);
    canvas.height = Math.round(sw * sin + sh * cos);

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(rad);
    ctx.filter = buildFilter();
    ctx.drawImage(image, -sw / 2, -sh / 2, sw, sh);
    ctx.restore();

    // Draw crop overlay
    if (cropMode && cropStart && cropEnd) {
      const x = Math.min(cropStart.x, cropEnd.x);
      const y = Math.min(cropStart.y, cropEnd.y);
      const w = Math.abs(cropEnd.x - cropStart.x);
      const h = Math.abs(cropEnd.y - cropStart.y);
      ctx.fillStyle = "rgba(0,0,0,0.45)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.clearRect(x, y, w, h);
      ctx.strokeStyle = "#818cf8";
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, w, h);
    }
  }, [image, rotation, scaleX, scaleY, buildFilter, cropMode, cropStart, cropEnd]);

  useEffect(() => { draw(); }, [draw]);

  /* ── File upload ── */
  const loadFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    setFileName(file.name);
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      pushHistory(img);
      setImage(img);
      resetAdjustments();
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  const resetAdjustments = () => {
    setBrightness(100); setContrast(100); setSaturation(100);
    setSharpness(0); setRotation(0); setScaleX(100); setScaleY(100);
    setFilterIdx(0); setCropMode(false); setCropRect(null);
    setCropStart(null); setCropEnd(null);
  };

  /* ── Drag & drop ── */
  const onDrop = (e) => {
    e.preventDefault();
    loadFile(e.dataTransfer.files[0]);
  };

  /* ── Crop mouse events ── */
  const getCanvasPos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scX = canvas.width  / rect.width;
    const scY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scX,
      y: (e.clientY - rect.top)  * scY,
    };
  };

  const onMouseDown = (e) => {
    if (!cropMode) return;
    setDragging(true);
    const pos = getCanvasPos(e);
    setCropStart(pos);
    setCropEnd(pos);
  };
  const onMouseMove = (e) => {
    if (!cropMode || !dragging) return;
    setCropEnd(getCanvasPos(e));
  };
  const onMouseUp = () => { if (cropMode) setDragging(false); };

  /* ── Apply crop ── */
  const applyCrop = () => {
    if (!cropStart || !cropEnd || !canvasRef.current) return;
    const x = Math.round(Math.min(cropStart.x, cropEnd.x));
    const y = Math.round(Math.min(cropStart.y, cropEnd.y));
    const w = Math.round(Math.abs(cropEnd.x - cropStart.x));
    const h = Math.round(Math.abs(cropEnd.y - cropStart.y));
    if (w < 2 || h < 2) return;

    const tmp = document.createElement("canvas");
    tmp.width = w; tmp.height = h;
    tmp.getContext("2d").drawImage(canvasRef.current, x, y, w, h, 0, 0, w, h);

    const cropped = new Image();
    cropped.onload = () => {
      pushHistory(cropped);
      setImage(cropped);
      setCropMode(false);
      setCropStart(null);
      setCropEnd(null);
      setRotation(0);
      setScaleX(100);
      setScaleY(100);
    };
    cropped.src = tmp.toDataURL();
  };

  /* ── Download ── */
  const download = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    const ext  = outputFmt === "image/png" ? "png" : outputFmt === "image/webp" ? "webp" : "jpg";
    const q    = outputFmt === "image/png" ? undefined : quality / 100;
    link.download = `edited-${fileName || "image"}.${ext}`;
    link.href = canvasRef.current.toDataURL(outputFmt, q);
    link.click();
  };

  /* ── Undo ── */
  const undo = () => {
    if (history.length < 2) return;
    const prev = history[history.length - 2];
    setHistory(h => h.slice(0, -1));
    setImage(prev);
    resetAdjustments();
  };

  /* ── Fit canvas display ── */
  const canvasStyle = {
    maxWidth: "100%",
    maxHeight: "calc(100vh - 180px)",
    objectFit: "contain",
    cursor: cropMode ? "crosshair" : "default",
    borderRadius: "12px",
    display: image ? "block" : "none",
  };

  return (
    <div
      className="min-h-screen bg-black text-white pt-20 pb-10"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* ── Page header ── */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-6">
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#7c3aed,#0891b2)" }}>
              <Wand2 size={16} />
            </div>
            <h1 className="text-2xl font-extrabold" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
              Image Editor
            </h1>
          </div>
          <p className="text-white/40 text-sm ml-11">Crop · Resize · Rotate · Filters · Export — all in your browser</p>
        </motion.div>
      </div>

      {/* ── Main layout ── */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col lg:flex-row gap-5">

        {/* ── Left sidebar ── */}
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="w-full lg:w-72 flex-shrink-0 flex flex-col gap-3 lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto pr-0.5"
          style={{ scrollbarWidth: "thin" }}
        >
          {/* Adjustments */}
          <Panel title="Adjustments" icon={Sliders}>
            <Slider label="Brightness" icon={Sun}      value={brightness}  min={0}   max={200} onChange={setBrightness}  unit="%" />
            <Slider label="Contrast"  icon={Contrast}  value={contrast}    min={0}   max={200} onChange={setContrast}    unit="%" />
            <Slider label="Saturation"                 value={saturation}  min={0}   max={200} onChange={setSaturation}  unit="%" />
          </Panel>

          {/* Transform */}
          <Panel title="Transform" icon={RefreshCw}>
            <Slider label="Rotation"  value={rotation}  min={-180} max={180} onChange={setRotation}  unit="°" />
            <Slider label="Scale W"   value={scaleX}    min={10}   max={300} onChange={setScaleX}    unit="%" />
            <Slider label="Scale H"   value={scaleY}    min={10}   max={300} onChange={setScaleY}    unit="%" />
            <div className="flex gap-2 mt-1">
              <button onClick={() => setRotation(r => clamp(r - 90, -180, 180))}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl glass text-xs text-white/70 hover:text-white transition-colors">
                <RotateCcw size={13} /> -90°
              </button>
              <button onClick={() => setRotation(r => clamp(r + 90, -180, 180))}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl glass text-xs text-white/70 hover:text-white transition-colors">
                <RotateCw size={13} /> +90°
              </button>
            </div>
          </Panel>

          {/* Filters */}
          <Panel title="Filters" icon={Wand2}>
            <div className="grid grid-cols-3 gap-2">
              {FILTER_PRESETS.map((f, i) => (
                <button
                  key={f.name}
                  onClick={() => setFilterIdx(i)}
                  className={`py-2 rounded-xl text-xs font-medium transition-all duration-200 ${
                    filterIdx === i
                      ? "text-white scale-105"
                      : "glass text-white/50 hover:text-white/80"
                  }`}
                  style={filterIdx === i ? { background: "linear-gradient(135deg,#7c3aed,#0891b2)" } : {}}
                >
                  {f.name}
                </button>
              ))}
            </div>
          </Panel>

          {/* Export */}
          <Panel title="Export" icon={Download} defaultOpen={false}>
            <div className="flex flex-col gap-2">
              <label className="text-xs text-white/50 font-medium">Format</label>
              <div className="flex gap-2">
                {[["JPEG","image/jpeg"],["PNG","image/png"],["WebP","image/webp"]].map(([lbl, fmt]) => (
                  <button key={fmt} onClick={() => setOutputFmt(fmt)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      outputFmt === fmt ? "text-white" : "glass text-white/50 hover:text-white/70"
                    }`}
                    style={outputFmt === fmt ? { background: "linear-gradient(135deg,#7c3aed,#0891b2)" } : {}}>
                    {lbl}
                  </button>
                ))}
              </div>
              {outputFmt !== "image/png" && (
                <Slider label="Quality" value={quality} min={10} max={100} onChange={setQuality} unit="%" />
              )}
            </div>
          </Panel>
        </motion.aside>

        {/* ── Canvas area ── */}
        <motion.main
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex-1 flex flex-col gap-4"
        >
          {/* Toolbar */}
          {image && (
            <div className="flex flex-wrap items-center gap-2">
              {/* Crop */}
              <button
                onClick={() => { setCropMode(c => !c); setCropStart(null); setCropEnd(null); }}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  cropMode ? "text-white" : "glass text-white/60 hover:text-white"
                }`}
                style={cropMode ? { background: "linear-gradient(135deg,#7c3aed,#0891b2)" } : {}}
              >
                <Crop size={13} /> Crop
              </button>

              {cropMode && cropStart && cropEnd && (
                <>
                  <button onClick={applyCrop}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white"
                    style={{ background: "linear-gradient(135deg,#059669,#0891b2)" }}>
                    Apply Crop
                  </button>
                  <button onClick={() => { setCropMode(false); setCropStart(null); setCropEnd(null); }}
                    className="glass flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs text-white/60 hover:text-white">
                    <X size={13} /> Cancel
                  </button>
                </>
              )}

              <div className="ml-auto flex items-center gap-2">
                <button onClick={undo} disabled={history.length < 2}
                  className="glass flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs text-white/60 hover:text-white disabled:opacity-30 transition-all">
                  <RotateCcw size={13} /> Undo
                </button>
                <button onClick={resetAdjustments}
                  className="glass flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs text-white/60 hover:text-white transition-all">
                  <RefreshCw size={13} /> Reset
                </button>
                <button onClick={download}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold text-white transition-all hover:scale-105"
                  style={{ background: "linear-gradient(135deg,#7c3aed,#0891b2)", boxShadow: "0 0 20px rgba(124,58,237,0.4)" }}>
                  <Download size={13} /> Export
                </button>
              </div>
            </div>
          )}

          {/* Drop zone / Canvas */}
          <div
            className={`relative flex-1 flex items-center justify-center rounded-2xl transition-all overflow-hidden ${
              !image ? "border-2 border-dashed border-white/10 hover:border-violet-500/40" : "glass"
            }`}
            style={{ minHeight: "420px" }}
            onDragOver={e => e.preventDefault()}
            onDrop={onDrop}
          >
            {!image ? (
              <motion.div
                className="flex flex-col items-center gap-4 text-center px-8"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
              >
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center"
                  style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)" }}>
                  <ImageIcon size={32} className="text-violet-400" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-white/80 mb-1">Drop an image here</p>
                  <p className="text-sm text-white/30">or click to browse — JPEG, PNG, WebP, GIF</p>
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="btn-neon px-6 py-2.5 text-sm text-white mt-2"
                >
                  <Upload size={14} /> Choose File
                </button>
              </motion.div>
            ) : (
              <canvas
                ref={canvasRef}
                style={canvasStyle}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseUp}
              />
            )}
          </div>

          {/* Image info bar */}
          {image && (
            <div className="flex items-center justify-between px-3 py-2 glass rounded-xl text-xs text-white/40">
              <span>{fileName || "image"}</span>
              <span>{image.naturalWidth} × {image.naturalHeight}px</span>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1 hover:text-white transition-colors"
              >
                <Upload size={12} /> Replace
              </button>
            </div>
          )}
        </motion.main>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={e => loadFile(e.target.files[0])}
      />
    </div>
  );
}
