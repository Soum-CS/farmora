import React, { useState } from "react";
import { Plus, Upload, CheckCircle, AlertTriangle, IndianRupee, MapPin, Scale } from "lucide-react";
import { motion } from "framer-motion";

const SellCrops = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    crop: "",
    variety: "",
    quantity: "",
    unit: "Quintals",
    price: "",
    location: "Khurda, Odisha",
    isOrganic: false
  });

  const crops = ["Paddy (Rice)", "Maize", "Cotton", "Wheat", "Mung Bean", "Peanut"];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-[3rem] border border-slate-200 shadow-xl overflow-hidden">
        <div className="flex border-b border-slate-100">
          {[1, 2, 3].map((s) => (
            <div 
              key={s} 
              className={`flex-1 p-6 text-center border-r border-slate-100 last:border-r-0 transition-colors ${step === s ? 'bg-emerald-50' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 text-xs font-black ${step >= s ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                {s}
              </div>
              <p className={`text-[10px] font-black uppercase tracking-widest ${step >= s ? 'text-emerald-700' : 'text-slate-400'}`}>
                {s === 1 ? 'Details' : s === 2 ? 'Price & Qty' : 'Certification'}
              </p>
            </div>
          ))}
        </div>

        <div className="p-8 md:p-12">
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
              <div className="space-y-2 text-center mb-4">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Post Your Harvest</h2>
                <p className="text-slate-500 font-medium">Let's start with the basics of what you're selling.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Crop Category</label>
                  <select 
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all cursor-pointer"
                    onChange={(e) => setFormData({...formData, crop: e.target.value})}
                  >
                    <option value="">Select Crop</option>
                    {crops.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Variety / Grade</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Swarna, Hybrid-7"
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-medium"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 p-6 bg-emerald-50 rounded-[2rem] border border-emerald-100">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm shrink-0">
                  <CheckCircle size={24} />
                </div>
                <div>
                  <p className="text-sm font-black text-emerald-900">Verified Listing Status</p>
                  <p className="text-xs font-bold text-emerald-700/70">Authenticated farmers sell 3x faster on Farmora.</p>
                </div>
              </div>

              <button 
                onClick={() => setStep(2)}
                className="w-full py-4 bg-slate-900 text-white rounded-[2rem] font-black text-sm hover:bg-emerald-600 transition-colors shadow-xl shadow-slate-900/10 active:scale-[0.98] mt-6"
              >
                Continue to Pricing
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Quantity Available</label>
                    <div className="relative">
                      <Scale className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input 
                        type="number" 
                        placeholder="0.00"
                        className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 font-black text-slate-400 text-xs">QTLS</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Asking Price (per unit)</label>
                    <div className="relative">
                      <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input 
                        type="number" 
                        placeholder="0.00"
                        className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-[2.5rem] p-6 border border-slate-100 flex flex-col justify-center space-y-4">
                  <div className="flex items-center gap-2 text-indigo-600">
                    <TrendingUp size={18} />
                    <span className="text-xs font-black uppercase tracking-widest">Market Insight</span>
                  </div>
                  <p className="text-xl font-black text-slate-900">Current Market: ₹2,240 <span className="text-xs text-slate-400 font-bold">/ qtl</span></p>
                  <p className="text-xs font-bold text-slate-500 leading-relaxed">
                    Setting your price within 5% of the market average increases visibility by <span className="text-emerald-600">45%</span>.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button onClick={() => setStep(1)} className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-[2rem] font-black text-sm hover:bg-slate-200 transition-colors">Back</button>
                <button onClick={() => setStep(3)} className="flex-[2] py-4 bg-slate-900 text-white rounded-[2rem] font-black text-sm hover:bg-emerald-600 transition-colors shadow-lg">Proceed to Certification</button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
              <div className="space-y-6">
                <div className="p-8 border-2 border-dashed border-slate-200 rounded-[3rem] text-center space-y-4 hover:border-emerald-400 transition-colors cursor-pointer group">
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 mx-auto group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                    <Upload size={32} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900">Upload Quality Certificate</h3>
                    <p className="text-sm font-medium text-slate-500">Agmark, KVK report, or lab test results (PDF/JPG)</p>
                  </div>
                </div>

                <div className="bg-amber-50 rounded-[2rem] border border-amber-100 p-6 flex gap-4">
                  <AlertTriangle className="text-amber-600 shrink-0" size={24} />
                  <p className="text-xs font-bold text-amber-800 leading-relaxed pt-1">
                    Listings without certification are marked as "Self-Verified" and typically take longer to resolve B2B contracts.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button onClick={() => setStep(2)} className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-[2rem] font-black text-sm hover:bg-slate-200 transition-colors">Back</button>
                <button className="flex-[2] py-4 bg-emerald-600 text-white rounded-[2rem] font-black text-sm hover:bg-emerald-700 transition-colors shadow-xl shadow-emerald-900/20">Publish Listing</button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellCrops;
