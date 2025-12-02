import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";
import SignUpPage from "./pages/SignUpPage";
import SignUpConfirmationPage from "./pages/SignUpConfirmationPage";
import DashboardHome from "./pages/DashboardHome";
import AboutPage from "./pages/AboutPage";
import ThemePreviewPage from "./pages/ThemePreviewPage";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signup/confirmation" element={<SignUpConfirmationPage />} />
        <Route path="/dashboard" element={<DashboardHome />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/theme-preview" element={<ThemePreviewPage />} />
      </Routes>
    </Layout>
  );
}
