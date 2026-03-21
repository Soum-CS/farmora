import React from "react";
import { FileCheck, Landmark, CheckCircle2, AlertCircle, Clock, Search, ChevronRight } from "lucide-react";

const GovtSchemes = () => (
  <div className="space-y-8">
    <header>
      <h1 className="text-3xl font-black text-slate-900 tracking-tight">Government Schemes</h1>
      <p className="text-slate-500 font-medium italic">Managing regional participation in state and central agriculture schemes.</p>
    </header>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
       {[
         { name: "PM-Kisan Samman Nidhi", applicants: 842, verified: "92%", color: "bg-emerald-600" },
         { name: "Crop Insurance (PMFBY)", applicants: 316, verified: "68%", color: "bg-blue-600" },
         { name: "Odisha Krushak Sahayata", applicants: 120, verified: "100%", color: "bg-amber-500" },
       ].map((scheme, i) => (
         <div key={i} className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-xl shadow-blue-900/5 group">
            <div className={`w-12 h-12 rounded-2xl ${scheme.color} flex items-center justify-center text-white mb-6 shadow-lg`}>
               <Landmark size={24} />
            </div>
            <h3 className="text-lg font-black text-slate-900 mb-2">{scheme.name}</h3>
            <div className="space-y-4">
               <div className="flex justify-between items-center text-xs font-bold text-slate-500 uppercase tracking-widest">
                  <span>Enrolled</span>
                  <span>{scheme.applicants}</span>
               </div>
               <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${scheme.color}`} style={{ width: scheme.verified }} />
               </div>
               <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-2">
                  <CheckCircle2 size={12} /> {scheme.verified} Verification Rate
               </p>
            </div>
         </div>
       ))}
    </div>

    <section className="bg-white rounded-[3rem] border border-slate-200 shadow-xl p-8 md:p-10 space-y-8">
       <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-slate-900 uppercase tracking-widest flex items-center gap-3">
             <Clock size={22} className="text-amber-500" /> Pending verifications
          </h2>
          <div className="relative">
             <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
             <input type="text" placeholder="Search applicant..." className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold outline-none" />
          </div>
       </div>

       <div className="space-y-4">
          {[
            { name: "Anil Biswal", scheme: "PM-Kisan", doc: "Land Record Missing", time: "2 days ago" },
            { name: "Sasmita Rout", scheme: "PMFBY", doc: "Photo ID Mismatch", time: "3 days ago" },
            { name: "Naba Patra", scheme: "Krushak Sahayata", doc: "Aadhar Link Required", time: "5 days ago" },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-6 bg-slate-50 border border-slate-100 rounded-2xl group hover:bg-white hover:shadow-lg transition-all">
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-300">
                     <FileCheck size={20} />
                  </div>
                  <div>
                     <p className="font-black text-slate-900 text-sm">{item.name}</p>
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.scheme}</p>
                  </div>
               </div>
               <div className="flex items-center gap-6">
                  <div className="text-right">
                     <p className="text-[10px] font-black text-rose-500 uppercase flex items-center gap-1 justify-end"><AlertCircle size={12} /> {item.doc}</p>
                     <p className="text-[10px] text-slate-400 font-bold mt-0.5">{item.time}</p>
                  </div>
                  <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all">
                     <ChevronRight size={18} />
                  </button>
               </div>
            </div>
          ))}
       </div>
    </section>
  </div>
);

export default GovtSchemes;
