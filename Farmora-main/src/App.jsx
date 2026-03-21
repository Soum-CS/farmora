import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/public/Home";
import AuthPage from "./pages/public/AuthPage";
import RoleSelection from "./pages/public/RoleSelection";

import FarmerDashboard from "./pages/dashboards/FarmerDashboard";
import OfficerDashboard from "./pages/dashboards/OfficerDashboard";
import MarketplaceDashboard from "./pages/dashboards/MarketplaceDashboard";
import BulkMarket from "./pages/marketplace/BulkMarket";
import FreshProduce from "./pages/marketplace/FreshProduce";

import Marketplace from "./pages/shared/Marketplace";
import Profile from "./pages/shared/Profile";
import Settings from "./pages/shared/Settings";

import ProtectedRoute from "./components/auth/ProtectedRoute";
import FarmerOnboarding from "./pages/verify/FarmerOnboarding";
import FarmerVerification from "./pages/verify/FarmerVerification";
import OfficerVerification from "./pages/verify/OfficerVerification";
import BuyerRegistration from "./pages/verify/BuyerRegistration";

// OFFICER DASHBOARD PAGES
import OfficerLayout from "./components/layout/OfficerLayout";
import RegionalIntelMap from "./pages/officer/RegionalIntelMap";
import DiseaseMonitoring from "./pages/officer/DiseaseMonitoring";
import FarmerRequests from "./pages/officer/FarmerRequests";
import AdvisoryBroadcast from "./pages/officer/AdvisoryBroadcast";
import CropAnalytics from "./pages/officer/CropAnalytics";
import GovtSchemes from "./pages/officer/GovtSchemes";
import FarmerDatabase from "./pages/officer/FarmerDatabase";
import FieldInspectionReport from "./pages/officer/FieldInspectionReport";
import OfficerProfile from "./pages/officer/OfficerProfile";

// NEW FEATURE PAGES
import FarmerLayout from "./components/layout/FarmerLayout";
import DiseaseScanner from "./pages/tools/DiseaseScanner";
import DiseaseMap from "./pages/tools/DiseaseMap";
import CropPlanning from "./pages/tools/CropPlanning";
import DecisionSimulator from "./pages/tools/DecisionSimulator";
import WeatherAdvisory from "./pages/tools/WeatherAdvisory";
import FertilizerOptimization from "./pages/tools/FertilizerOptimization";

import GovernmentSchemes from "./pages/info/GovernmentSchemes";
import FarmerCommunity from "./pages/community/FarmerCommunity";
import { 
  ExpertConsultation, 
  FarmProfile, 
  AiAssistantPage 
} from "./pages/tools/Placeholders";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/choose-role" element={<RoleSelection />} />

        {/* Verification & Onboarding Routes */}
        <Route path="/onboarding/farmer" element={<FarmerOnboarding />} />
        <Route path="/verify/farmer" element={<FarmerVerification />} />
        <Route path="/verify/officer" element={<OfficerVerification />} />
        <Route path="/verify/buyer" element={<BuyerRegistration />} />

        {/* Protected Farmer Platform Routes */}
        <Route
          path="/dashboard/farmer"
          element={
            <ProtectedRoute role="farmer">
              <FarmerLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<FarmerDashboard />} />
          <Route path="crop-planning" element={<CropPlanning />} />
          <Route path="simulator" element={<DecisionSimulator />} />
          <Route path="weather" element={<WeatherAdvisory />} />
          <Route path="fertilizer" element={<FertilizerOptimization />} />
          <Route path="disease-scanner" element={<DiseaseScanner />} />
          <Route path="disease-map" element={<DiseaseMap />} />
          <Route path="marketplace" element={<Marketplace />} />
          <Route path="schemes" element={<GovernmentSchemes />} />
          <Route path="community" element={<FarmerCommunity />} />
          <Route path="ai-assistant" element={<AiAssistantPage />} />
          <Route path="experts" element={<ExpertConsultation />} />
          <Route path="profile" element={<FarmProfile />} />
        </Route>

        <Route
          path="/dashboard/officer"
          element={
            <ProtectedRoute role="officer">
              <OfficerLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<OfficerDashboard />} />
          <Route path="intel-map" element={<RegionalIntelMap />} />
          <Route path="disease-monitoring" element={<DiseaseMonitoring />} />
          <Route path="requests" element={<FarmerRequests />} />
          <Route path="broadcast" element={<AdvisoryBroadcast />} />
          <Route path="analytics" element={<CropAnalytics />} />
          <Route path="schemes" element={<GovtSchemes />} />
          <Route path="database" element={<FarmerDatabase />} />
          <Route path="inspections" element={<FieldInspectionReport />} />
          <Route path="profile" element={<OfficerProfile />} />
        </Route>

        <Route
          path="/dashboard/marketplace"
          element={
            <ProtectedRoute role="marketplace">
              <MarketplaceDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/marketplace/bulk"
          element={
            <ProtectedRoute role="marketplace">
              <BulkMarket />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/marketplace/fresh"
          element={
            <ProtectedRoute role="marketplace">
              <FreshProduce />
            </ProtectedRoute>
          }
        />

        {/* Legacy compatibility or shared pages */}
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;