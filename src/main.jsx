import "@carbon/charts/styles.css";
import "./index.scss";

import { registerBuilderTokens } from "./components/builder/builderTokens";
registerBuilderTokens();

import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";

const domNode = document.getElementById("root");
const root = createRoot(domNode);
root.render(
  <BrowserRouter>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </BrowserRouter>,
);

// Note: React.StrictMode removed due to compatibility issues with React Leaflet
// Strict Mode causes double-mounting in development which breaks Leaflet's map initialization
// This is a known issue with React Leaflet + React 19 Strict Mode
