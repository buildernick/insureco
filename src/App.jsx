import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import SignUpConfirmationPage from "./pages/SignUpConfirmationPage";
import DashboardHome from "./pages/DashboardHome";
import AboutPage from "./pages/AboutPage";
import ThemePreviewPage from "./pages/ThemePreviewPage";
import BusinessComingSoon from "./pages/business/BusinessComingSoon";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signup/confirmation" element={<SignUpConfirmationPage />} />
        <Route path="/dashboard" element={<DashboardHome />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/theme-preview" element={<ThemePreviewPage />} />

        {/* Business Routes - Placeholder pages for now */}
        <Route path="/business" element={<Navigate to="/business/dashboard" replace />} />
        <Route path="/business/dashboard" element={<BusinessComingSoon />} />
        <Route path="/business/properties" element={<BusinessComingSoon />} />
        <Route path="/business/fleet" element={<BusinessComingSoon />} />
        <Route path="/business/map" element={<BusinessComingSoon />} />
        <Route path="/business/claims" element={<BusinessComingSoon />} />
        <Route path="/business/payments" element={<BusinessComingSoon />} />
        <Route path="/business/file-claim" element={<BusinessComingSoon />} />
        <Route path="/business/make-payment" element={<BusinessComingSoon />} />
      </Routes>
    </Layout>
  );
}
