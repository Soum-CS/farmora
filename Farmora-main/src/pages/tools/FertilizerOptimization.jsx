import React, { useState } from "react";
import { 
  FlaskConical, 
  Droplets, 
  Zap, 
  Target, 
  TrendingUp, 
  AlertTriangle,
  ChevronRight,
  Info,
  CheckCircle2,
  Package,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FertilizerOptimization = () => {
  const [soilComposition, setSoilComposition] = useState({
    nitrogen: 42,
    phosphorus: 28,
    potassium: 35,
    ph: 6.8
  });

  const recommendation = {
    mix: "NPK 14-14-14",
    quantity: "45kg / Acre",
    time: "Post-irrigation (Evening)",
    efficiency: 92,
    savings: "₹1,240 saved"
  };

  return (
    <div className="p-8 space-y-10 min-h-screen bg-[#fdfcf0]">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Fertilizer & Soil Optimization</h1>
          <p className="text-slate-500 font-medium italic">Maximizing yield while minimizing input costs through soil data.</p>
        </div>
        <button className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-indigo-500/30 hover:bg-indigo-700 hover:-translate-y-1 transition-all flex items-center gap-3">
           <Package size={20} /> Order Specific Fertilizer
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* CURRENT SOIL STATUS */}
        <div className="lg:col-span-2 space-y-8">
           <section className="bg-white rounded-[3.5rem] border border-slate-200 shadow-xl shadow-indigo-900/5 p-10">
              <div className="flex items-center justify-between mb-12">
                 <h2 className="text-xl font-black text-slate-900 uppercase tracking-widest flex items-center gap-3">
                    <FlaskConical size={22} className="text-indigo-600" /> Soil NPK Composition
                 </h2>
                 <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 bg-slate-50 px-3 py-1 rounded-full">
                    <Info size={12} /> Last Sample: Oct 14
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                 {[
                   { label: "Nitrogen (N)", value: soilComposition.nitrogen, color: "emerald", desc: "For leaf growth" },
                   { label: "Phosphorus (P)", value: soilComposition.phosphorus, color: "blue", desc: "For root system" },
                   { label: "Potassium (K)", value: soilComposition.potassium, color: "amber", desc: "Overall health" },
                 ].map((comp, i) => (
                   <div key={i} className="space-y-6">
                      <div className="relative">
                         <div className="w-full bg-slate-100 h-40 rounded-[2.5rem] overflow-hidden flex flex-col justify-end">
                            <motion.div 
                               initial={{ height: 0 }}
                               animate={{ height: `${comp.value}%` }}
                               transition={{ duration: 1, delay: i * 0.2 }}
                               className={`w-full bg-${comp.color}-500 opacity-20`}
                            />
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                               <span className="text-3xl font-black text-slate-800">{comp.value}</span>
                               <span className="text-[10px] font-black text-slate-400 opacity-60 uppercase">mg/kg</span>
                            </div>
                         </div>
                      </div>
                      <div className="text-center">
                         <p className="text-xs font-black text-slate-800 uppercase tracking-widest mb-1">{comp.label}</p>
                         <p className="text-[10px] font-medium text-slate-400">{comp.desc}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </section>

           <section className="bg-indigo-950 rounded-[3.5rem] p-10 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl" />
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                 <div className="space-y-6 flex-1">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-widest border border-indigo-500/30">
                       <Target size={14} /> AI Optimization Result
                    </div>
                    <h2 className="text-3xl font-black tracking-tight">Precise Application Matrix</h2>
                    <div className="grid grid-cols-2 gap-6">
                       <div className="space-y-1">
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Mix Requirement</p>
                          <p className="text-xl font-black text-indigo-300">{recommendation.mix}</p>
                       </div>
                       <div className="space-y-1">
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Recommended Dose</p>
                          <p className="text-xl font-black text-indigo-300">{recommendation.quantity}</p>
                       </div>
                    </div>
                    <p className="text-sm font-medium text-slate-400 leading-relaxed border-t border-white/5 pt-6">
                       Optimal application time is <span className="text-white">today evening</span>. 
                       Soil absorption will be at peak matching the temperature drop and root activity.
                    </p>
                 </div>

                 <div className="w-56 h-56 rounded-full border-[12px] border-indigo-500/10 flex flex-col items-center justify-center relative bg-indigo-900/40">
                    <Zap size={40} className="text-amber-400 mb-2" />
                    <p className="text-4xl font-black">{recommendation.efficiency}%</p>
                    <p className="text-[10px] font-black uppercase opacity-60">Efficiency</p>
                    <motion.div 
                      animate={{ rotate: -360 }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-x-[-12px] inset-y-[-12px] border-t-[12px] border-indigo-400 rounded-full"
                    />
                 </div>
              </div>
           </section>
        </div>

        {/* SIDEBAR: SAVINGS & HISTORY */}
        <div className="space-y-8">
           <section className="bg-emerald-600 rounded-[3rem] p-8 text-white text-center">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                 <TrendingUp size={32} />
              </div>
              <h3 className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-1">Impact Analysis</h3>
              <h2 className="text-3xl font-black mb-1">{recommendation.savings}</h2>
              <p className="text-xs font-medium opacity-70 mb-8">Compared to traditional broadcasting methods.</p>
              <div className="space-y-3">
                 <div className="p-4 bg-emerald-700/50 rounded-2xl flex items-center justify-between text-left">
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-70">Wastage Reduced</span>
                    <span className="font-black text-emerald-300">32%</span>
                 </div>
                 <div className="p-4 bg-emerald-700/50 rounded-2xl flex items-center justify-between text-left">
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-70">Enviro Impact</span>
                    <span className="font-black text-emerald-300">Min.</span>
                 </div>
              </div>
           </section>

           <section className="bg-white rounded-[3rem] border border-slate-200 shadow-xl shadow-blue-900/5 p-8">
              <h2 className="text-xl font-black text-slate-900 tracking-tight mb-8">Health Track</h2>
              <div className="space-y-6">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                       <Droplets size={20} />
                    </div>
                    <div>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Current pH</p>
                       <p className="text-sm font-black text-slate-800">6.8 (Neutral)</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
                       <Zap size={20} />
                    </div>
                    <div>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Conductivity</p>
                       <p className="text-sm font-black text-slate-800">High (Organic)</p>
                    </div>
                 </div>
              </div>
              <button className="w-full mt-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                 Full Analysis <ArrowRight size={14} />
              </button>
           </section>
        </div>
      </div>
    </div>
  );
};

export default FertilizerOptimization;
