import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import './App.css';

/* ── Lazy-loaded pages for code splitting ── */
const Home        = lazy(() => import("./pages/Home"));
const ImageEditor = lazy(() => import("./pages/ImageEditor"));

/* ── Minimal loading fallback ── */
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div
        className="w-10 h-10 rounded-full border-2 border-transparent animate-spin"
        style={{ borderTopColor: "#7c3aed", borderRightColor: "#0891b2" }}
      />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="editor" element={<ImageEditor />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
