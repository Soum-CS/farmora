import React, { useState } from "react";
import { 
  Map as MapIcon, 
  Layers, 
  Filter, 
  Navigation, 
  Maximize2, 
  ShieldAlert, 
  CloudRain, 
  Sprout, 
  AlertTriangle,
  Search,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const RegionalIntelMap = () => {
  const [activeLayers, setActiveLayers] = useState(["Crops", "Disease"]);
  const [searchQuery, setSearchQuery] = useState("");

  const layers = [
    { id: "Crops", icon: Sprout, color: "text-emerald-500", label: "Crop Distribution" },
    { id: "Disease", icon: ShieldAlert, color: "text-rose-500", label: "Disease Outbreaks" },
    { id: "Pest", icon: AlertTriangle, color: "text-amber-500", label: "Pest Risk Zones" },
    { id: "Rainfall", icon: CloudRain, color: "text-blue-500", label: "Rainfall Zones" },
  ];

  const toggleLayer = (id) => {
    setActiveLayers(prev => 
      prev.includes(id) ? prev.filter(l => l !== id) : [...prev, id]
    );
  };

  const locations = [
    { name: "Bhatli Sector", status: "Critical", type: "Disease Cluster", color: "bg-rose-500" },
    { name: "Ambapali East", status: "Warning", type: "Pest Risk", color: "bg-amber-500" },
    { name: "Sohela Plains", status: "Optimal", type: "Rice Growth", color: "bg-emerald-500" },
  ];

  return (
    <div className="h-full flex flex-col space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Regional Intelligence Map</h1>
          <p className="text-slate-500 font-medium">Monitoring regional agricultural patterns and risks in real-time.</p>
        </div>
        
        <div className="flex items-center gap-3">
           <div className="relative group">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
              <input 
                type="text" 
                placeholder="Search villages..." 
                className="pl-12 pr-6 py-2.5 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-sm font-bold w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
           </div>
           <button className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-500 hover:bg-slate-50 transition-colors">
              <Maximize2 size={20} />
           </button>
        </div>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-8 min-h-0">
        {/* MAP COMPONENT */}
        <div className="lg:col-span-3 relative bg-slate-200 rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
           {/* MOCK MAP BACKGROUND */}
           <div className="absolute inset-0 bg-[#cbd5e1] opacity-60 flex items-center justify-center">
              <div className="text-center opacity-30 select-none">
                 <MapIcon size={120} className="mx-auto mb-4" />
                 <p className="text-2xl font-black uppercase tracking-[0.2em]">Map Visual System</p>
              </div>
           </div>

           {/* LAYER INDICATORS (MOCK) */}
           <div className="absolute inset-0 pointer-events-none p-10">
              {activeLayers.includes("Disease") && (
                <div className="absolute top-[30%] left-[20%] w-32 h-32 bg-rose-500/10 rounded-full border-2 border-rose-500 animate-pulse flex items-center justify-center">
                   <ShieldAlert size={24} className="text-rose-500" />
                </div>
              )}
              {activeLayers.includes("Pest") && (
                 <div className="absolute bottom-[25%] left-[45%] w-24 h-24 bg-amber-500/10 rounded-full border-2 border-amber-500 flex items-center justify-center">
                    <AlertTriangle size={20} className="text-amber-500" />
                 </div>
              )}
              {activeLayers.includes("Crops") && (
                 <div className="absolute top-[15%] right-[25%] w-40 h-40 bg-emerald-500/10 rounded-full border-2 border-emerald-500 animate-pulse flex items-center justify-center">
                    <Sprout size={32} className="text-emerald-500" />
                 </div>
              )}
           </div>

           {/* CONTROLS */}
           <div className="absolute top-6 left-6 flex flex-col gap-3">
              <div className="p-4 bg-white/80 backdrop-blur rounded-3xl border border-slate-200 shadow-xl space-y-4">
                 <div className="flex items-center gap-3 border-b border-slate-100 pb-2 mb-2">
                    <Layers size={18} className="text-blue-600" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Active Layers</span>
                 </div>
                 {layers.map(layer => (
                   <button 
                    key={layer.id}
                    onClick={() => toggleLayer(layer.id)}
                    className={`w-full flex items-center gap-3 p-2 rounded-xl transition-all ${activeLayers.includes(layer.id) ? 'bg-blue-50 ring-1 ring-blue-100' : 'opacity-50 grayscale hover:grayscale-0 hover:opacity-100'}`}
                   >
                      <layer.icon size={16} className={layer.color} />
                      <span className="text-[10px] font-black uppercase text-slate-700">{layer.label}</span>
                   </button>
                 ))}
              </div>
           </div>

           <div className="absolute bottom-6 right-6 flex flex-col gap-3">
               <button className="p-4 bg-white rounded-3xl shadow-xl text-blue-600 hover:scale-110 transition-transform">
                  <Navigation size={24} />
               </button>
               <button className="p-4 bg-white rounded-3xl shadow-xl text-slate-500 hover:scale-110 transition-transform" onClick={() => setActiveLayers([])}>
                  <Filter size={24} />
               </button>
           </div>
        </div>

        {/* SIDEBAR INTEL */}
        <div className="space-y-6 overflow-y-auto pr-2">
           <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-xl shadow-blue-900/5">
              <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
                 <ShieldAlert size={20} className="text-rose-500" /> Current Hotzones
              </h3>
              <div className="space-y-4">
                 {locations.map((loc, i) => (
                    <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:bg-white hover:border-blue-100 hover:shadow-md transition-all cursor-pointer">
                       <div className="flex justify-between items-start mb-2">
                          <span className="font-bold text-slate-900">{loc.name}</span>
                          <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase text-white ${loc.color}`}>{loc.status}</span>
                       </div>
                       <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{loc.type}</p>
                    </div>
                 ))}
              </div>
           </div>

           <div className="bg-blue-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full translate-x-12 -translate-y-12 group-hover:scale-150 transition-transform" />
              <h3 className="text-lg font-black mb-4 relative z-10 font-serif">Officer Advisory</h3>
              <p className="text-xs font-medium opacity-80 leading-relaxed mb-6 relative z-10">
                 Precipitation levels in Sohela Plains are 15% higher than seasonal average. Recommend early harvest for Paddy crops.
              </p>
              <button className="w-full py-3 bg-blue-600 rounded-xl font-black text-[10px] uppercase tracking-widest relative z-10 shadow-lg shadow-blue-900/40 hover:bg-blue-500 transition-colors">
                 Issue Broadcast
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default RegionalIntelMap;
