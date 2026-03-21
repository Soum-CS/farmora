import React from "react";
import { ClipboardList, Plus, MapPin, Calendar, Clock, ChevronRight, ShieldCheck, Filter, FileCheck } from "lucide-react";

const FieldInspectionReport = () => (
  <div className="space-y-8">
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Field Inspection Reports</h1>
        <p className="text-slate-500 font-medium italic">Documenting and submitting mandatory field visit findings.</p>
      </div>
      <button className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-blue-500/30 hover:bg-blue-700 hover:-translate-y-1 transition-all flex items-center gap-3">
         <Plus size={20} /> New Inspection
      </button>
    </header>

    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
       {/* STATS */}
       <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white">
             <h3 className="text-xs font-black uppercase tracking-[0.2em] opacity-60 mb-8 border-b border-white/10 pb-4">Monthly Goal</h3>
             <div className="flex justify-between items-end mb-4">
                <span className="text-4xl font-black italic">14<span className="text-lg opacity-40">/20</span></span>
                <span className="text-[10px] font-black uppercase text-blue-400 mb-1">70% Reached</span>
             </div>
             <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500" style={{ width: "70%" }} />
             </div>
             <p className="text-[10px] font-medium opacity-60 mt-6 leading-relaxed">
                6 more mandatory inspections required by month-end for regional compliance.
             </p>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-xl shadow-blue-900/5 space-y-6">
             <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Scheduled Visits</h3>
             <div className="space-y-4">
                {[
                  { village: "Bhatli", farmer: "R. Nayak", time: "Tomorrow, 10 AM" },
                  { village: "Sohela", farmer: "G. Patra", time: "Wed, 2 PM" },
                ].map((v, i) => (
                  <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-4">
                     <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-slate-400 shadow-sm">
                        <Calendar size={16} />
                     </div>
                     <div>
                        <p className="text-xs font-black text-slate-900">{v.village} • {v.farmer}</p>
                        <p className="text-[9px] font-bold text-slate-400 uppercase">{v.time}</p>
                     </div>
                  </div>
                ))}
             </div>
          </div>
       </div>

       {/* RECENT REPORTS */}
       <div className="lg:col-span-3 bg-white rounded-[3rem] border border-slate-200 shadow-xl shadow-blue-900/5 p-8 md:p-10 space-y-8">
          <div className="flex items-center justify-between">
             <h2 className="text-xl font-black text-slate-900 uppercase tracking-widest flex items-center gap-3">
                <ClipboardList size={22} className="text-blue-600" /> Recent Submissions
             </h2>
             <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:text-blue-600 transition-colors">
                <Filter size={18} />
             </button>
          </div>

          <div className="space-y-4">
             {[
               { id: "INS-4421", village: "Kendrapara", crop: "Rice", date: "Oct 12, 2023", status: "Approved" },
               { id: "INS-4418", village: "Bargarh", crop: "Maize", date: "Oct 10, 2023", status: "Approved" },
               { id: "INS-4415", village: "Ambapali", crop: "Cotton", date: "Oct 08, 2023", status: "Draft" },
               { id: "INS-4412", village: "Bhatli", crop: "Rice", date: "Oct 05, 2023", status: "Approved" },
             ].map((report, i) => (
               <div key={i} className="flex items-center justify-between p-6 bg-white border border-slate-100 rounded-[2rem] group hover:border-blue-200 hover:shadow-lg transition-all cursor-pointer">
                  <div className="flex items-center gap-6">
                     <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                        <FileCheck size={24} />
                     </div>
                     <div>
                        <p className="font-black text-slate-900 text-lg">{report.village}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{report.crop} • Visit on {report.date}</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-8">
                     <div className="text-right">
                        <span className={`px-2.5 py-1 text-[9px] font-black uppercase rounded-full ${report.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                           {report.status}
                        </span>
                        <p className="text-[9px] font-mono text-slate-300 mt-1">{report.id}</p>
                     </div>
                     <ChevronRight size={20} className="text-slate-300 group-hover:text-blue-600 transition-colors" />
                  </div>
               </div>
             ))}
          </div>
       </div>
    </div>
  </div>
);

export default FieldInspectionReport;
