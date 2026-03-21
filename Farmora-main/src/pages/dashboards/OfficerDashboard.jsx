import React from "react";
import { 
  Users, 
  Sprout, 
  AlertTriangle, 
  MessageSquare, 
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Map,
  FileCheck,
  Zap,
  ChevronRight,
  Clock,
  Landmark,
  Plus,
  Leaf
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SummaryCard = ({ title, value, subtext, icon: Icon, colorClass, onClick, buttonText }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white/70 backdrop-blur-xl border border-white/50 p-6 rounded-[2.5rem] shadow-xl shadow-blue-900/5 group"
  >
    <div className="flex items-center justify-between mb-4">
      <div className={`w-12 h-12 rounded-2xl ${colorClass} flex items-center justify-center text-white shadow-lg`}>
        <Icon size={24} />
      </div>
      {buttonText && (
        <button 
          onClick={onClick}
          className="text-[10px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all"
        >
          {buttonText} <ChevronRight size={14} />
        </button>
      )}
    </div>
    <div>
      <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{title}</p>
      <h3 className="text-3xl font-black text-slate-900 leading-none">{value}</h3>
      <p className="text-xs font-bold text-slate-500 mt-2 flex items-center gap-2">
        {subtext}
      </p>
    </div>
  </motion.div>
);

const HealthScoreGauge = ({ score }) => {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex flex-col items-center justify-center">
      <svg className="w-48 h-48 -rotate-90">
        <circle
          cx="96"
          cy="96"
          r={radius}
          className="stroke-slate-100 fill-none"
          strokeWidth="16"
        />
        <motion.circle
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          cx="96"
          cy="96"
          r={radius}
          className="stroke-emerald-500 fill-none"
          strokeWidth="16"
          strokeDasharray={circumference}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-4xl font-black text-slate-900 leading-none">{score}</span>
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">District Score</span>
      </div>
    </div>
  );
};

const OfficerDashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const stats = [
    { title: "Registered Farmers", value: "12,482", subtext: "+4.2% from last month", icon: Users, colorClass: "bg-blue-600" },
    { title: "Active Farms", value: "8,240", subtext: "Across 42 villages", icon: Sprout, colorClass: "bg-emerald-600" },
    { title: "Major Crop", value: "Rice", subtext: "72% of regional land", icon: Leaf, colorClass: "bg-amber-500" },
    { title: "Disease Alerts", value: "14", subtext: "3 Critical clusters", icon: AlertTriangle, colorClass: "bg-rose-500" },
    { title: "Farmer Requests", value: "48", subtext: "Avg response: 2.4 hrs", icon: MessageSquare, colorClass: "bg-indigo-600" },
  ];

  const alerts = [
    { village: "Bhatli", farms: 12, severity: "High", title: "Disease Cluster Detected" },
    { village: "Ambapali", farms: 8, severity: "Medium", title: "Pest Outbreak Risk" },
    { village: "Sohela", farms: 25, severity: "High", title: "Heavy Rainfall Alert" },
  ];

  const diseaseReports = [
    { village: "Kendrapara", crop: "Rice", disease: "Leaf Blight", status: "Pending" },
    { village: "Bargarh", crop: "Maize", disease: "Stem Borer", status: "Verified" },
  ];

  const supportRequests = [
    { farmer: "Ramesh", issue: "Yellow leaves in rice", location: "Cuttack", time: "2h ago" },
    { farmer: "Suresh", issue: "Low yield prediction", location: "Bhubaneswar", time: "5h ago" },
  ];

  return (
    <div className="space-y-10 pb-20">
      {/* NEW TOP ROW: DISTRICT HEALTH SCORE (Prominent) */}
      <section className="bg-white/70 backdrop-blur-xl border border-white/50 p-10 rounded-[3.5rem] shadow-2xl shadow-blue-900/10 relative overflow-hidden group mb-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full translate-x-1/3 -translate-y-1/3 group-hover:scale-110 transition-transform opacity-50" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="space-y-6 max-w-lg text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest border border-blue-100">
                <Landmark size={14} /> Global Command Monitoring
              </div>
              <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-tight">
                Regional Agricultural <br />
                <span className="text-emerald-500">Stability & Health</span>
              </h2>
              <p className="text-slate-500 font-medium text-sm leading-relaxed">
                Aggregated real-time data from 12,482 sensors and satellite imagery. 
                Your district is performing <span className="text-emerald-600 font-bold">5.2% above</span> the seasonal average.
              </p>
              <div className="flex items-center gap-6 pt-2 justify-center md:justify-start">
                <div>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                   <p className="text-emerald-600 font-black flex items-center gap-1"><ShieldCheck size={16} /> Secure</p>
                </div>
                <div className="w-px h-8 bg-slate-200" />
                <div>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Last Sync</p>
                   <p className="text-slate-800 font-black flex items-center gap-1"><Clock size={16} /> 2m Ago</p>
                </div>
              </div>
            </div>

            <HealthScoreGauge score={88} />
          </div>
      </section>

      {/* ROW 1: METRICS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {stats.map((stat, i) => (
           <SummaryCard key={i} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* ROW 2: REGIONAL INTELLIGENCE ALERTS */}
        <section className="bg-slate-900 rounded-[3rem] p-8 md:p-10 text-white relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-[80px]" />
           <div className="flex items-center justify-between mb-8 relative z-10">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-blue-600/20 rounded-xl flex items-center justify-center text-blue-400 border border-blue-500/30">
                    <Zap size={22} />
                 </div>
                 <h2 className="text-2xl font-black tracking-tight">Regional AI Intelligence</h2>
              </div>
              <button 
                onClick={() => navigate("intel-map")}
                className="px-5 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur rounded-2xl text-[10px] font-black uppercase tracking-widest border border-white/10 transition-all"
              >
                Open Map
              </button>
           </div>

           <div className="space-y-4 relative z-10">
              {alerts.map((alert, i) => (
                <div key={i} className="flex items-center justify-between p-5 bg-white/5 border border-white/10 rounded-2xl group hover:bg-white/10 transition-all cursor-pointer">
                   <div className="flex items-center gap-4">
                      <div className={`w-2 h-10 rounded-full ${alert.severity === 'High' ? 'bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.5)]' : 'bg-amber-500'}`} />
                      <div>
                         <p className="font-bold text-sm tracking-tight">{alert.title}</p>
                         <p className="text-xs text-slate-400 font-medium">{alert.village} • {alert.farms} Farms Affected</p>
                      </div>
                   </div>
                   <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.1em] ${alert.severity === 'High' ? 'bg-rose-500/20 text-rose-400' : 'bg-amber-500/20 text-amber-400'}`}>
                      {alert.severity}
                   </span>
                </div>
              ))}
           </div>
        </section>

        {/* ROW 3: DISEASE REPORT SUMMARY */}
        <section className="bg-white/70 backdrop-blur-xl border border-white p-8 md:p-10 rounded-[3rem] shadow-xl shadow-blue-900/5">
           <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center text-rose-600">
                    <ShieldCheck size={22} />
                 </div>
                 <h2 className="text-2xl font-black text-slate-900 tracking-tight">Recent Disease Reports</h2>
              </div>
              <button 
                onClick={() => navigate("disease-monitoring")}
                className="text-[10px] font-black text-rose-600 uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all"
              >
                Monitoring Tool <ChevronRight size={14} />
              </button>
           </div>

           <div className="space-y-4">
              {diseaseReports.map((report, i) => (
                <div key={i} className="flex items-center justify-between p-5 bg-slate-50 border border-slate-100 rounded-2xl group hover:bg-white hover:border-rose-100 hover:shadow-md transition-all">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-slate-400 group-hover:text-rose-500 transition-colors">
                         <Map size={24} />
                      </div>
                      <div>
                         <p className="font-black text-slate-900">{report.disease}</p>
                         <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{report.crop} • {report.village}</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-4">
                      <span className={`px-2.5 py-1 text-[9px] font-black uppercase rounded-full ${report.status === 'Verified' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                         {report.status}
                      </span>
                      <ChevronRight size={18} className="text-slate-300 group-hover:text-rose-400 transition-colors" />
                   </div>
                </div>
              ))}
           </div>
        </section>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* ROW 4: FARMER SUPPORT REQUESTS */}
        <section className="bg-white/70 backdrop-blur-xl border border-white p-8 md:p-10 rounded-[3rem] shadow-xl shadow-blue-900/5">
           <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                    <MessageSquare size={22} />
                 </div>
                 <h2 className="text-2xl font-black text-slate-900 tracking-tight">Farmer Support</h2>
              </div>
              <button 
                onClick={() => navigate("requests")}
                className="text-[10px] font-black text-indigo-600 uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all"
              >
                View Library <ChevronRight size={14} />
              </button>
           </div>

           <div className="space-y-3">
              {supportRequests.map((req, i) => (
                <div key={i} className="flex items-center justify-between p-6 bg-white/40 border border-slate-100 rounded-2xl hover:bg-white hover:shadow-lg transition-all cursor-pointer">
                   <div className="flex items-center gap-5">
                      <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white overflow-hidden shadow-sm">
                         <img src={`https://ui-avatars.com/api/?name=${req.farmer}&background=random`} alt={req.farmer} />
                      </div>
                      <div>
                         <div className="flex items-center gap-3 mb-0.5">
                            <span className="font-black text-slate-900 text-sm">{req.farmer}</span>
                            <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                               <Clock size={12} /> {req.time}
                            </span>
                         </div>
                         <p className="text-xs text-slate-500 font-medium italic">"{req.issue}"</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100/50 rounded-xl">
                      <Landmark size={14} className="text-slate-400" />
                      <span className="text-[10px] font-black text-slate-600 uppercase tracking-tighter">{req.location}</span>
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* ROW 5: GOVERNMENT SCHEME SUMMARY */}
        <section className="bg-emerald-900 rounded-[3rem] p-8 md:p-10 text-white relative overflow-hidden">
           <div className="absolute bottom-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full translate-x-12 translate-y-12 blur-3xl" />
           <div className="flex items-center justify-between mb-8 relative z-10">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400 border border-emerald-500/30">
                    <CheckCircle2 size={22} />
                 </div>
                 <h2 className="text-2xl font-black tracking-tight">Scheme Enrollment</h2>
              </div>
              <button 
                onClick={() => navigate("schemes")}
                className="px-5 py-2.5 bg-emerald-700/50 hover:bg-emerald-700 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-emerald-600/30 transition-all"
              >
                Manage Schemes
              </button>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
              {[
                { label: "PM-Kisan Beneficiaries", value: "842", percent: 84 },
                { label: "Crop Insurance Enrollment", value: "316", percent: 62 },
                { label: "Land Record Linked", value: "1,120", percent: 92 },
                { label: "Pending Verifications", value: "94", percent: 12, critical: true },
              ].map((item, i) => (
                <div key={i} className="p-5 bg-white/5 border border-white/10 rounded-[2rem] space-y-3 group hover:bg-white/10 transition-colors">
                   <div className="flex justify-between items-start">
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-60 leading-tight pr-4">{item.label}</p>
                      <span className="text-lg font-black">{item.value}</span>
                   </div>
                   <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${item.percent}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className={`h-full ${item.critical ? 'bg-amber-400' : 'bg-emerald-500'}`} 
                      />
                   </div>
                </div>
              ))}
           </div>
        </section>
      </div>

      {/* ROW 6: QUICK ACTIONS */}
      <section className="bg-white/70 backdrop-blur-xl border border-white p-8 rounded-[3rem] shadow-xl shadow-blue-900/5">
         <h2 className="text-xl font-black text-slate-900 uppercase tracking-widest mb-8 flex items-center gap-3">
            <TrendingUp size={22} className="text-blue-600" /> Command Quick Actions
         </h2>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Regional Map", icon: Map, path: "intel-map", color: "hover:bg-blue-50 text-blue-600" },
              { label: "Broadcast Alert", icon: Zap, path: "broadcast", color: "hover:bg-emerald-50 text-emerald-600" },
              { label: "Farmer Database", icon: Users, path: "database", color: "hover:bg-purple-50 text-purple-600" },
              { label: "New Report", icon: Plus, path: "inspections", color: "hover:bg-rose-50 text-rose-600" },
              { 
                label: "Skip to Farmer", 
                icon: Leaf, 
                path: "switch-role", 
                color: "hover:bg-emerald-50 text-emerald-600",
                onClick: () => {
                  const user = JSON.parse(localStorage.getItem("user") || "{}");
                  localStorage.setItem("user", JSON.stringify({ ...user, role: "farmer" }));
                  window.location.href = "/dashboard/farmer";
                }
              },
            ].map((action, i) => (
              <button 
                key={i}
                onClick={action.onClick ? action.onClick : () => navigate(action.path)}
                className={`flex flex-col items-center gap-4 p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm transition-all hover:scale-105 hover:shadow-xl ${action.color}`}
              >
                <action.icon size={32} strokeWidth={2.5} />
                <span className="text-[10px] font-black uppercase tracking-widest text-center">{action.label}</span>
              </button>
            ))}
         </div>
      </section>
    </div>
  );
};

// Placeholder for CheckCircle2 if not imported
const CheckCircle2 = ({ size, className }) => <ShieldCheck size={size} className={className} />;

export default OfficerDashboard;