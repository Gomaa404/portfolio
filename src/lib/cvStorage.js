/* ============================================================
   cvStorage.js — lightweight localStorage-backed CV store.
   Stores metadata in "cv_list" and file data in "cv_file_<id>".
   Max file size: 10 MB (enforced before storing).
   ============================================================ */

const LIST_KEY  = "cv_list";
const FILE_PFX  = "cv_file_";
const MAX_BYTES = 10 * 1024 * 1024; // 10 MB

/* ── helpers ── */
function getList() {
  try { return JSON.parse(localStorage.getItem(LIST_KEY) || "[]"); }
  catch { return []; }
}
function saveList(arr) {
  localStorage.setItem(LIST_KEY, JSON.stringify(arr));
}

/* ── public API ── */

/** Return all CV metadata objects (no file data). */
export function listCVs() { return getList(); }

/**
 * Store a new CV.
 * @param {File} file  - the PDF File object
 * @returns {Promise<object>} the stored metadata record
 */
export async function storeCV(file) {
  if (file.size > MAX_BYTES) throw new Error("File exceeds 10 MB limit.");
  if (file.type !== "application/pdf") throw new Error("Only PDF files are accepted.");

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const id   = crypto.randomUUID();
      const meta = {
        id,
        name:      file.name,
        size:      file.size,
        uploadedAt: Date.now(),
        extracted: null, // populated after extraction
      };
      try {
        localStorage.setItem(FILE_PFX + id, reader.result);
        const list = getList();
        list.unshift(meta);
        saveList(list);
        resolve(meta);
      } catch (e) {
        reject(new Error("Storage quota exceeded. Delete some CVs and try again."));
      }
    };
    reader.onerror = () => reject(new Error("Failed to read file."));
    reader.readAsDataURL(file);
  });
}

/** Retrieve the base64 data URL for a stored CV. */
export function getCVFile(id) {
  return localStorage.getItem(FILE_PFX + id) || null;
}

/** Update extracted/edited metadata for a CV. */
export function updateCVMeta(id, extracted) {
  const list = getList().map(cv =>
    cv.id === id ? { ...cv, extracted } : cv
  );
  saveList(list);
}

/** Delete a CV by id. */
export function deleteCV(id) {
  localStorage.removeItem(FILE_PFX + id);
  saveList(getList().filter(cv => cv.id !== id));
}

/** Get a single CV metadata record. */
export function getCVMeta(id) {
  return getList().find(cv => cv.id === id) || null;
}

/** Format byte size for display. */
export function fmtSize(bytes) {
  if (bytes < 1024)        return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}
