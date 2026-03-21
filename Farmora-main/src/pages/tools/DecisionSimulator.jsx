import React, { useState } from "react";
import { 
  BarChart3, 
  TrendingUp, 
  Droplets, 
  FlaskConical, 
  Sun, 
  AlertTriangle, 
  ArrowRight, 
  Zap,
  RotateCcw,
  PlayCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const DecisionSimulator = () => {
  const [scenario, setScenario] = useState({
    waterLevel: 50,
    fertilizerAmt: 30,
    pestRisk: 10
  });

  const [simulationResult, setSimulationResult] = useState({
    yieldScore: 78,
    marketValue: "₹4.2L",
    profitMargin: 24,
    healthIdx: 82
  });

  const runSimulation = () => {
    // Basic logic for demonstration
    const newYield = scenario.waterLevel * 0.8 + scenario.fertilizerAmt * 1.2 - scenario.pestRisk * 2;
    setSimulationResult({
      yieldScore: Math.min(100, Math.max(0, Math.round(newYield))),
      marketValue: `₹${(newYield * 5).toFixed(1)}L`,
      profitMargin: Math.round(newYield / 3),
      healthIdx: Math.round(scenario.waterLevel * 0.9 + (100 - scenario.pestRisk) * 0.1)
    });
  };

  return (
    <div className="p-8 space-y-10 min-h-screen bg-[#fdfcf0]">
      <header>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Agricultural Decision Simulator</h1>
        <p className="text-slate-500 font-medium italic">Predict future yield outcomes by adjusting variables in a risk-free environment.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* SIMULATION CONTROLS */}
        <div className="lg:col-span-1 space-y-6">
           <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-emerald-900/5 p-8 space-y-8">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 pb-4 border-b border-slate-100">Variables</h3>
              
              <div className="space-y-8">
                 <div className="space-y-4">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-600">
                       <span className="flex items-center gap-2"><Droplets size={14} className="text-blue-500" /> Water Intake</span>
                       <span>{scenario.waterLevel}%</span>
                    </div>
                    <input 
                      type="range" 
                      className="w-full accent-blue-500" 
                      value={scenario.waterLevel}
                      onChange={(e) => setScenario({...scenario, waterLevel: parseInt(e.target.value)})}
                    />
                 </div>

                 <div className="space-y-4">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-600">
                       <span className="flex items-center gap-2"><FlaskConical size={14} className="text-emerald-500" /> NPK Level</span>
                       <span>{scenario.fertilizerAmt}%</span>
                    </div>
                    <input 
                      type="range" 
                      className="w-full accent-emerald-500" 
                      value={scenario.fertilizerAmt}
                      onChange={(e) => setScenario({...scenario, fertilizerAmt: parseInt(e.target.value)})}
                    />
                 </div>

                 <div className="space-y-4">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-600">
                       <span className="flex items-center gap-2"><AlertTriangle size={14} className="text-rose-500" /> Pest Tolerance</span>
                       <span>{scenario.pestRisk}%</span>
                    </div>
                    <input 
                      type="range" 
                      className="w-full accent-rose-500" 
                      value={scenario.pestRisk}
                      onChange={(e) => setScenario({...scenario, pestRisk: parseInt(e.target.value)})}
                    />
                 </div>
              </div>

              <button 
                onClick={runSimulation}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-900/20"
              >
                 <PlayCircle size={18} /> Update Forecast
              </button>

              <button 
                onClick={() => setScenario({ waterLevel: 50, fertilizerAmt: 30, pestRisk: 10 })}
                className="w-full py-3 text-slate-400 font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:text-slate-600 transition-colors"
              >
                 <RotateCcw size={14} /> Reset Scenario
              </button>
           </section>
        </div>

        {/* RESULTS & FORECAST */}
        <div className="lg:col-span-3 space-y-8">
           <section className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-blue-600/5 backdrop-blur-[100px]" />
              <div className="relative z-10 space-y-12">
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 bg-blue-600/20 rounded-xl flex items-center justify-center text-blue-400 border border-blue-500/30">
                          <Zap size={22} />
                       </div>
                       <h2 className="text-2xl font-black tracking-tight">AI Yield Forecast</h2>
                    </div>
                    <span className="px-4 py-1.5 bg-blue-500/20 text-blue-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-500/30">
                       High Precision Model v4.2
                    </span>
                 </div>

                 <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                      { label: "Yield Expectation", value: `${simulationResult.yieldScore}%`, subtext: "Seasonal score", icon: BarChart3, color: "text-blue-400" },
                      { label: "Est. Market Value", value: simulationResult.marketValue, subtext: "Current MSP rate", icon: TrendingUp, color: "text-emerald-400" },
                      { label: "Profit Margin", value: `${simulationResult.profitMargin}%`, subtext: "ROI Projection", icon: Zap, color: "text-amber-400" },
                      { label: "Plant Health Index", value: `${simulationResult.healthIdx}`, subtext: "Vitality score", icon: FlaskConical, color: "text-indigo-400" },
                    ].map((stat, i) => (
                      <div key={i} className="space-y-4">
                         <div className={`p-4 bg-white/5 rounded-2xl border border-white/10 inline-block ${stat.color}`}>
                            <stat.icon size={24} />
                         </div>
                         <div>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
                            <h3 className="text-2xl font-black">{stat.value}</h3>
                            <p className="text-[10px] font-medium opacity-40">{stat.subtext}</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
           </section>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <section className="bg-white rounded-[3rem] border border-slate-200 p-8 shadow-xl shadow-emerald-900/5">
                 <h3 className="text-xl font-black text-slate-900 tracking-tight mb-6">Optimization Path</h3>
                 <p className="text-sm font-medium text-slate-500 leading-relaxed mb-8">
                    To reach maximum yield of 95%, the system suggests increasing nitrogen application by 12% 
                    and adjusting the irrigation cycle to late evening hours.
                 </p>
                 <button className="flex items-center gap-2 text-emerald-600 font-black text-xs uppercase tracking-widest hover:text-emerald-700 transition-colors">
                    Apply Suggestions <ArrowRight size={16} />
                 </button>
              </section>

              <section className="bg-rose-50 rounded-[3rem] border border-rose-100 p-8">
                 <h3 className="text-xl font-black text-rose-900 tracking-tight mb-6 flex items-center gap-2">
                    <AlertTriangle size={20} className="text-rose-500" /> Risk Factors
                 </h3>
                 <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white/60 rounded-2xl border border-rose-100">
                       <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Soil Acidity Leak</span>
                       <span className="text-xs font-black text-rose-600">Minor Risk</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white/60 rounded-2xl border border-rose-100">
                       <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Hydration Stress</span>
                       <span className="text-xs font-black text-amber-600">Moderate</span>
                    </div>
                 </div>
              </section>
           </div>
        </div>
      </div>
    </div>
  );
};

export default DecisionSimulator;
