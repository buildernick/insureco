import React from "react";
import { useNavigate } from "react-router-dom";
import AloNavBar from "../alo/AloNavBar";

export default function Layout({ children }) {
  return (
    <>
      <a href="#main-content" className="layout-skip-link">
        Skip to main content
      </a>
      <AloNavBar />
      <main id="main-content" className="layout-main">
        {children}
      </main>
    </>
  );
}
