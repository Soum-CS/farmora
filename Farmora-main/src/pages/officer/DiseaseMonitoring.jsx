import React, { useState } from "react";
import { 
  ShieldAlert, 
  MapPin, 
  User, 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  MessageSquare, 
  Search, 
  Filter, 
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Maximize2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const DiseaseMonitoring = () => {
  const [activeTab, setActiveTab] = useState("Pending");
  const [selectedReport, setSelectedReport] = useState(null);

  const reports = [
    { 
      id: "REP-9921",
      farmer: "Ramesh Kumar",
      village: "Kendrapara",
      crop: "Rice (Paddy)",
      disease: "Leaf Blight",
      status: "Pending",
      timestamp: "2 hours ago",
      description: "Yellow spots observed on about 20% of the crop canopy logic. Spreading to adjacent fields.",
      image: "https://images.unsplash.com/photo-1599395919018-8096f2641a02?auto=format&fit=crop&w=400&q=80"
    },
    { 
      id: "REP-9925",
      farmer: "Sita Devi",
      village: "Bargarh",
      crop: "Maize",
      disease: "Stem Borer",
      status: "Verified",
      timestamp: "5 hours ago",
      description: "Typical stem borer damage. Verified via satellite scan.",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=400&q=80"
    },
    { 
      id: "REP-9930",
      farmer: "Gopal Swain",
      village: "Sohela",
      crop: "Cotton",
      disease: "Pest Attack",
      status: "Action Taken",
      timestamp: "1 day ago",
      description: "High density of pests. Pesticide advisory sent.",
      image: "https://images.unsplash.com/photo-1594900595180-205167098e94?auto=format&fit=crop&w=400&q=80"
    }
  ];

  const filteredReports = reports.filter(r => r.status === activeTab || activeTab === "All");

  return (
    <div className="h-full flex flex-col space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Disease Monitoring & Verification</h1>
          <p className="text-slate-500 font-medium italic">Command center for verifying crop disease reports and issuing advisories.</p>
        </div>
        
        <div className="flex bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm">
           {["Pending", "Verified", "All"].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-rose-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
              >
                {tab}
              </button>
           ))}
        </div>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-0">
        {/* LIST OF REPORTS */}
        <div className="lg:col-span-1 space-y-4 overflow-y-auto pr-2">
           <div className="relative mb-6">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search reports..." 
                className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 outline-none transition-all font-bold text-sm"
              />
           </div>

           {filteredReports.map((report) => (
             <motion.button
               key={report.id}
               onClick={() => setSelectedReport(report)}
               whileHover={{ x: 5 }}
               className={`w-full text-left p-6 rounded-[2.5rem] border transition-all ${selectedReport?.id === report.id ? 'bg-white border-rose-500 shadow-xl ring-1 ring-rose-500' : 'bg-white/60 border-slate-200 hover:border-rose-200 shadow-sm'}`}
             >
                <div className="flex justify-between items-start mb-4">
                   <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center text-rose-500">
                      <ShieldAlert size={20} />
                   </div>
                   <span className="text-[10px] font-mono text-slate-400 font-bold">{report.id}</span>
                </div>
                <div>
                   <h4 className="font-black text-slate-900 text-lg mb-1">{report.disease}</h4>
                   <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">{report.crop} • {report.village}</p>
                   <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                      <span className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase">
                         <Calendar size={12} /> {report.timestamp}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase ${report.status === 'Verified' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                         {report.status}
                      </span>
                   </div>
                </div>
             </motion.button>
           ))}
        </div>

        {/* REPORT DETAILS */}
        <div className="lg:col-span-2 min-h-0 h-full">
           <AnimatePresence mode="wait">
              {selectedReport ? (
                <motion.div 
                  key={selectedReport.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-[3.5rem] border border-slate-100 shadow-2xl h-full flex flex-col overflow-hidden"
                >
                   <div className="p-10 flex-1 overflow-y-auto space-y-10">
                      <div className="flex justify-between items-start">
                         <div className="space-y-2">
                           <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-rose-50 text-rose-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-rose-100">
                              <AlertTriangle size={14} /> Critical Alert
                           </div>
                           <h2 className="text-4xl font-black text-slate-900 tracking-tight">{selectedReport.disease}</h2>
                           <p className="text-slate-500 font-medium">Reported by <span className="text-slate-900 font-bold">{selectedReport.farmer}</span> from <span className="text-slate-900 font-bold">{selectedReport.village}</span></p>
                         </div>
                         <div className="text-right">
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                           <p className="text-xl font-black text-emerald-600">{selectedReport.status}</p>
                         </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <div className="space-y-6">
                            <div className="space-y-2">
                               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                  <MapPin size={14} /> Location Intelligence
                               </label>
                               <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                  <p className="text-sm font-bold text-slate-700">{selectedReport.village} Sector 4G</p>
                                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Latitude: 21.46 • Longitude: 83.62</p>
                               </div>
                            </div>
                            <div className="space-y-2">
                               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                  <MessageSquare size={14} /> Farmer Observation
                               </label>
                               <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 italic text-slate-600 text-sm leading-relaxed">
                                  "{selectedReport.description}"
                               </div>
                            </div>
                         </div>
                         <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                               <TrendingUp size={14} /> Visual Evidence
                            </label>
                            <div className="aspect-video rounded-3xl overflow-hidden shadow-lg border-4 border-slate-50 relative group">
                               <img src={selectedReport.image} alt="Disease" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                               <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent flex items-end p-6">
                                  <button className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-xl text-white text-xs font-bold hover:bg-white/40 transition-colors">
                                     <Maximize2 size={14} /> Full View
                                  </button>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>

                   <div className="p-8 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-6">
                      <div className="flex gap-4 flex-1">
                         <button className="flex-1 py-4 bg-emerald-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all active:scale-95 flex items-center justify-center gap-3">
                            <CheckCircle2 size={20} /> Verify Detection
                         </button>
                         <button className="flex-1 py-4 bg-rose-500 text-white rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-rose-200 hover:bg-rose-600 transition-all active:scale-95 flex items-center justify-center gap-3">
                            <XCircle size={20} /> Reject Report
                         </button>
                      </div>
                      <button className="px-10 py-4 border-2 border-slate-200 rounded-2xl font-black uppercase tracking-widest text-slate-500 hover:bg-white hover:text-blue-600 hover:border-blue-200 transition-all flex items-center gap-3">
                         Send Advisory <ArrowRight size={20} />
                      </button>
                   </div>
                </motion.div>
              ) : (
                <div className="h-full bg-slate-100/50 border-4 border-dashed border-slate-200 rounded-[3.5rem] flex flex-col items-center justify-center p-20 text-center text-slate-400">
                   <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-xl mb-6">
                      <ShieldAlert size={48} className="opacity-20" />
                   </div>
                   <h3 className="text-2xl font-black text-slate-900 mb-2">Select a Report to Monitor</h3>
                   <p className="font-medium max-w-sm">Review incoming reports from farmers, verify them via satellite intelligence, and take immediate action.</p>
                </div>
              )}
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default DiseaseMonitoring;
