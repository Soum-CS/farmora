import React from "react";
import { FileText, CheckCircle, Clock, ChevronRight, Search, Gem, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const GovernmentSchemes = () => {
  const schemes = [
    {
      title: "PM-Kisan Samman Nidhi",
      desc: "Income support of ₹6,000 per year in three equal installments to small and marginal farmer families.",
      eligibility: "Small and marginal farmers owning up to 2 hectares of cultivable land.",
      status: "Open",
      delay: 0.1
    },
    {
      title: "Pradhan Mantri Fasal Bima Yojana",
      desc: "Comprehensive insurance coverage against crop failure, helping in stabilizing the income of farmers.",
      eligibility: "All farmers including sharecroppers and tenant farmers growing notified crops.",
      status: "Seasonal",
      delay: 0.2
    },
    {
      title: "Kisan Credit Card (KCC)",
      desc: "Provides farmers with timely access to credit for their cultivation and other needs.",
      eligibility: "All farmers – individuals/joint borrowers who are owner cultivators.",
      status: "Always Open",
      delay: 0.3
    }
  ];

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-10 pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Government Schemes</h1>
          <p className="text-slate-500 font-medium italic">Latest agricultural financial support and insurance</p>
        </div>
        <div className="relative group min-w-[300px]">
           <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
           <input type="text" placeholder="Search by scheme name or tag..." className="w-full pl-12 pr-6 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all" />
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-emerald-600 rounded-[2rem] p-8 text-white shadow-xl shadow-emerald-200">
           <Gem size={40} className="mb-6 opacity-30" />
           <h3 className="text-2xl font-black mb-2">Check Eligibility</h3>
           <p className="text-emerald-100 font-medium text-sm mb-6 leading-relaxed">AI-powered eligibility check based on your farm profile and location.</p>
           <button className="w-full py-3 bg-white text-emerald-700 rounded-xl font-black text-sm shadow-lg hover:scale-105 transition-transform">Start Pre-Check</button>
        </div>
        <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
           <Clock size={40} className="mb-6 text-amber-500" />
           <h3 className="text-2xl font-black text-slate-800 mb-2 font-['Inter']">Recent Applications</h3>
           <p className="text-slate-500 font-medium text-sm mb-6">Track your ongoing submissions and documents.</p>
           <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-400 italic">Doc</div>
              ))}
           </div>
        </div>
        <div className="bg-amber-50 md:bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
           <ShieldCheck size={40} className="mb-6 text-blue-500" />
           <h3 className="text-2xl font-black text-slate-800 mb-2">Help Desk</h3>
           <p className="text-slate-500 font-medium text-sm mb-6">Talk to an expert about scheme document requirements.</p>
           <button className="flex items-center gap-2 text-emerald-600 font-black text-sm hover:translate-x-2 transition-transform">
             Contact Support <ChevronRight size={18} />
           </button>
        </div>
      </div>

      <div className="space-y-6">
         <h2 className="text-2xl font-black text-slate-900 tracking-tight">Available for You</h2>
         <div className="grid grid-cols-1 gap-6">
            {schemes.map((scheme, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: scheme.delay }}
                className="bg-white/70 backdrop-blur-xl border border-slate-200 p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all group"
              >
                 <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="space-y-4 flex-1">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-600">
                             <FileText size={24} />
                          </div>
                          <div>
                            <h4 className="text-xl font-black text-slate-900">{scheme.title}</h4>
                            <span className="text-xs font-black text-emerald-600 uppercase tracking-widest">{scheme.status}</span>
                          </div>
                       </div>
                       <p className="text-slate-600 font-medium italic">{scheme.desc}</p>
                       <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 italic">
                          <p className="text-xs font-bold text-slate-400 uppercase mb-1">Eligibility Criteria</p>
                          <p className="text-sm text-slate-700">{scheme.eligibility}</p>
                       </div>
                    </div>
                    
                    <div className="flex shrink-0 gap-3">
                       <button className="px-6 py-3 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all">Download Info</button>
                       <button className="px-8 py-3 bg-emerald-600 text-white rounded-2xl font-black shadow-lg shadow-emerald-200 hover:scale-105 transition-transform">Apply Now</button>
                    </div>
                 </div>
              </motion.div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default GovernmentSchemes;
