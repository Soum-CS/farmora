import React from "react";
import { ShieldCheck, FileText, Download, CheckCircle, AlertCircle } from "lucide-react";

const QualityChecks = () => {
  const reports = [
    { id: "QC-8842", batch: "Paddy (Swarna) - Batch A", date: "Oct 22, 2025", score: 98, status: "Passed", authority: "State Agmark Lab" },
    { id: "QC-8839", batch: "Premium Cotton - 500 Tons", date: "Oct 15, 2025", score: 95, status: "Passed", authority: "KVK Khurda" },
    { id: "QC-8810", batch: "Maize (Hybrid) - FPO X", date: "Oct 10, 2025", score: 72, status: "Warning", authority: "Independent Auditor" },
    { id: "QC-8795", batch: "Organic Tomatoes", date: "Oct 01, 2025", score: 99, status: "Passed", authority: "Organic Certifiers India" },
  ];

  const getScoreColor = (score) => {
    if (score >= 90) return "text-emerald-600 bg-emerald-50 border-emerald-200";
    if (score >= 75) return "text-amber-600 bg-amber-50 border-amber-200";
    return "text-rose-600 bg-rose-50 border-rose-200";
  };

  return (
    <div className="space-y-6 relative z-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Quality & Compliance</h2>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-slate-900 text-white rounded-xl font-bold hover:bg-amber-600 transition-colors flex items-center gap-2 text-sm">
            <ShieldCheck size={16} /> Request Inspection
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reports.map((report) => (
          <div key={report.id} className="bg-white rounded-[2rem] border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center font-black text-xl shadow-sm ${getScoreColor(report.score)}`}>
                  {report.score}
                </div>
                {report.status === "Passed" ? (
                  <CheckCircle className="text-emerald-500" size={24} />
                ) : (
                  <AlertCircle className="text-amber-500" size={24} />
                )}
              </div>
              <h3 className="font-black text-slate-900 text-lg leading-tight mb-1">{report.batch}</h3>
              <p className="text-xs font-bold text-slate-400 mt-2">Tested by: <span className="text-slate-600">{report.authority}</span></p>
              <p className="text-xs font-bold text-slate-400 mt-1">Date: <span className="text-slate-600">{report.date}</span></p>
            </div>
            
            <button className="mt-6 w-full py-3 bg-slate-50 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-100 transition-colors flex items-center justify-center gap-2">
              <FileText size={16} /> Full Report <Download size={14} className="ml-1 opacity-50"/>
            </button>
          </div>
        ))}
      </div>

      {/* Certification Badge Banner */}
      <div className="bg-slate-900 rounded-[3rem] p-8 shadow-xl relative overflow-hidden text-white mt-8 flex flex-col md:flex-row items-center gap-8 group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500 rounded-full translate-x-1/3 -translate-y-1/3 group-hover:scale-110 transition-transform opacity-20 pointer-events-none blur-[40px]" />
        
        <div className="w-20 h-20 bg-amber-500 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/20 shrink-0">
          <ShieldCheck size={40} className="text-slate-900" />
        </div>
        <div>
          <h2 className="text-2xl font-black tracking-tight mb-2">100% Verified Sourcing guaranteed.</h2>
          <p className="text-slate-400 font-medium max-w-2xl leading-relaxed">
            Every bulk crop listed in the B2B Wholesale market undergoes strict 4-tier quality assurance from certified FPOs and external agmark labs. We stand behind the quality of every delivery.
          </p>
        </div>
      </div>
    </div>
  );
};

export default QualityChecks;
