import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";
import SignUpPage from "./pages/SignUpPage";
import DashboardHome from "./pages/DashboardHome";
import AboutPage from "./pages/AboutPage";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/dashboard" element={<DashboardHome />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Layout>
  );
}
