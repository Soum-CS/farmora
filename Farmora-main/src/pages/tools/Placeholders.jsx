import React from "react";
const PlaceholderPage = ({ title }) => (
  <div className="p-10 flex flex-col items-center justify-center min-h-[60vh] text-slate-400">
    <h1 className="text-3xl font-black text-slate-800 mb-2">{title}</h1>
    <p>This feature is coming soon to the Farmora platform.</p>
  </div>
);
export const CropPlanning = () => <PlaceholderPage title="Crop Planning" />;
export const FertilizerOptimization = () => <PlaceholderPage title="Fertilizer Optimization" />;
export const ExpertConsultation = () => <PlaceholderPage title="Expert Consultation" />;
export const FarmProfile = () => <PlaceholderPage title="Farm Profile" />;
export const AiAssistantPage = () => <PlaceholderPage title="AI Assistant" />;
export const WeatherAdvisory = () => <PlaceholderPage title="Weather Advisory" />;
export const DecisionSimulator = () => <PlaceholderPage title="Decision Simulator" />;
