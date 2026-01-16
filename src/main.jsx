import "@carbon/charts/styles.css";
import "./index.scss";

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
