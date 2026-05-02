/* ============================================================
   Layout.jsx — Shell that wraps all pages.
   Theme state now lives in ThemeContext (no local state here)
   so toggling the theme never re-renders Layout's children.
   ============================================================ */
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Layout() {
  return (
    /* The bg/text colours come from CSS variables set on <html>
       by ThemeContext, so no className switching needed here. */
    <div className="flex flex-col min-h-dvh">
      <Navbar />
      <main className="flex-grow flex flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
