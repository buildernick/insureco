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
import ProgressOptionsPreview from "./pages/ProgressOptionsPreview";
import BusinessComingSoon from "./pages/business/BusinessComingSoon";
import BusinessDashboard from "./pages/business/BusinessDashboard";
import PropertiesPage from "./pages/business/PropertiesPage";
import PropertyDetailPage from "./pages/business/PropertyDetailPage";
import AddPropertyPage from "./pages/business/AddPropertyPage";
import FleetPage from "./pages/business/FleetPage";
import VehicleDetailPage from "./pages/business/VehicleDetailPage";
import AddVehiclePage from "./pages/business/AddVehiclePage";
import FileClaimPage from "./pages/business/FileClaimPage";
import MakePaymentPage from "./pages/business/MakePaymentPage";
import MapPage from "./pages/business/MapPage";

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
        <Route path="/progress-preview" element={<ProgressOptionsPreview />} />

        {/* Business Routes */}
        <Route path="/business" element={<Navigate to="/business/dashboard" replace />} />
        <Route path="/business/dashboard" element={<BusinessDashboard />} />
        <Route path="/business/properties" element={<PropertiesPage />} />
        <Route path="/business/properties/add" element={<AddPropertyPage />} />
        <Route path="/business/properties/:propertyId" element={<PropertyDetailPage />} />
        <Route path="/business/fleet" element={<FleetPage />} />
        <Route path="/business/fleet/add" element={<AddVehiclePage />} />
        <Route path="/business/fleet/:vehicleId" element={<VehicleDetailPage />} />
        <Route path="/business/map" element={<MapPage />} />
        <Route path="/business/claims" element={<BusinessComingSoon />} />
        <Route path="/business/payments" element={<BusinessComingSoon />} />
        <Route path="/business/file-claim" element={<FileClaimPage />} />
        <Route path="/business/make-payment" element={<MakePaymentPage />} />
      </Routes>
    </Layout>
  );
}
