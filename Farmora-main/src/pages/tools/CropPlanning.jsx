import React from "react";
import { 
  Calendar, 
  Sprout, 
  Droplets, 
  Sun, 
  Wind, 
  ArrowRight, 
  ChevronRight, 
  Info,
  Clock,
  ShieldCheck,
  TrendingUp,
  MapPin
} from "lucide-react";
import { motion } from "framer-motion";

const CropPlanning = () => {
  const currentCrops = [
    { name: "Rice (Paddy)", variety: "MTU 1010", status: "Vegetative", progress: 65, health: "Excellent" },
    { name: "Green Gram", variety: "WGG 42", status: "Sowing", progress: 15, health: "Normal" },
  ];

  const recommendations = [
    { crop: "Maize", confidence: 94, reason: "Optimal soil moisture & market demand", window: "Nov 15 - Nov 25" },
    { crop: "Groundnut", confidence: 82, reason: "Historical yield performance", window: "Nov 20 - Dec 05" },
  ];

  return (
    <div className="p-8 space-y-10 min-h-screen bg-[#fdfcf0]">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Crop Planning & Management</h1>
          <p className="text-slate-500 font-medium italic">Data-driven strategies for your next harvest season.</p>
        </div>
        <button className="px-8 py-4 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-emerald-500/30 hover:bg-emerald-700 hover:-translate-y-1 transition-all flex items-center gap-3">
           <Calendar size={20} /> Plan New Season
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* CURRENT SEASON OVERVIEW */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white rounded-[3rem] border border-slate-200 shadow-xl shadow-emerald-900/5 p-8 md:p-10">
            <div className="flex items-center justify-between mb-8">
               <h2 className="text-xl font-black text-slate-900 uppercase tracking-widest flex items-center gap-3">
                  <Sprout size={22} className="text-emerald-600" /> Active Crops
               </h2>
               <span className="text-[10px] font-black text-slate-400">SEASON: KHARIF 2024</span>
            </div>

            <div className="space-y-6">
               {currentCrops.map((crop, i) => (
                 <div key={i} className="p-6 bg-slate-50 rounded-[2.5rem] border border-slate-100 group hover:border-emerald-200 hover:bg-white hover:shadow-lg transition-all">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                       <div className="flex items-center gap-5">
                          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm group-hover:bg-emerald-50 transition-colors">
                             <Sprout size={28} />
                          </div>
                          <div>
                             <h3 className="text-lg font-black text-slate-900">{crop.name}</h3>
                             <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{crop.variety} • {crop.status} Stage</p>
                          </div>
                       </div>
                       <div className="flex-1 max-w-xs space-y-2">
                          <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                             <span>Progress</span>
                             <span>{crop.progress}%</span>
                          </div>
                          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                             <motion.div 
                               initial={{ width: 0 }}
                               animate={{ width: `${crop.progress}%` }}
                               className="h-full bg-emerald-500" 
                             />
                          </div>
                       </div>
                       <div className="text-right">
                          <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest">
                             {crop.health}
                          </span>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
          </section>

          {/* AI ADVISORY */}
          <section className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-[80px]" />
             <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                <div className="flex-1 space-y-6">
                   <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest border border-emerald-500/30">
                      <ShieldCheck size={14} /> AI Recommendation Engine
                   </div>
                   <h2 className="text-3xl font-black tracking-tight">Optimal Sowing Window</h2>
                   <p className="text-slate-400 font-medium leading-relaxed">
                      Based on current soil nitrogen levels and the upcoming 14-day moisture forecast, 
                      the next 5 days represent the <strong>optimal window</strong> for Green Gram sowing in your region.
                   </p>
                   <button className="flex items-center gap-2 text-emerald-400 font-black text-xs uppercase tracking-widest hover:text-white transition-colors">
                      View Detailed Soil Report <ChevronRight size={16} />
                   </button>
                </div>
                <div className="w-48 h-48 rounded-full border-8 border-emerald-500/20 flex items-center justify-center relative">
                   <div className="text-center">
                      <p className="text-4xl font-black text-emerald-400">88%</p>
                      <p className="text-[10px] font-black uppercase opacity-60">Confidence</p>
                   </div>
                   <motion.div 
                     animate={{ rotate: 360 }}
                     transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                     className="absolute inset-0 border-t-8 border-emerald-500 rounded-full"
                   />
                </div>
             </div>
          </section>
        </div>

        {/* SIDEBAR TOOLS */}
        <div className="space-y-8">
           <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-emerald-900/5 p-8">
              <h2 className="text-xl font-black text-slate-900 tracking-tight mb-6">Market Trends</h2>
              <div className="space-y-6">
                 {recommendations.map((rec, i) => (
                   <div key={i} className="space-y-3">
                      <div className="flex justify-between items-center">
                         <p className="font-black text-slate-800">{rec.crop}</p>
                         <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded-full">
                            {rec.confidence}% Match
                         </span>
                      </div>
                      <p className="text-xs text-slate-500 font-medium leading-snug">{rec.reason}</p>
                      <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase">
                         <Clock size={12} /> {rec.window}
                      </div>
                      {i < recommendations.length - 1 && <div className="border-b border-slate-100 pt-3" />}
                   </div>
                 ))}
              </div>
           </section>

           <section className="bg-indigo-900 rounded-[2.5rem] p-8 text-white">
              <div className="bg-indigo-800/50 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
                 <Wind size={24} className="text-indigo-300" />
              </div>
              <h3 className="text-xl font-black mb-4 tracking-tight">Climate Risk Advisory</h3>
              <p className="text-sm font-medium opacity-70 leading-relaxed mb-6">
                Potential frost risk detected for late December. We suggest implementing plastic mulch or protective covers.
              </p>
              <button className="w-full py-4 bg-white text-indigo-900 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-50 transition-colors">
                 Manage Risk Plan
              </button>
           </section>
        </div>
      </div>
    </div>
  );
};

export default CropPlanning;
