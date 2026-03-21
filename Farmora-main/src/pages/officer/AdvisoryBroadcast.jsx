import React, { useState } from "react";
import { 
  Send, 
  Bell, 
  MessageCircle, 
  Smartphone, 
  AlertTriangle, 
  CloudRain, 
  Zap,
  Users,
  MapPin,
  CheckCircle2,
  Phone,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AdvisoryBroadcast = () => {
  const [channels, setChannels] = useState(["Notification", "SMS"]);
  const [template, setTemplate] = useState(null);

  const toggleChannel = (ch) => {
    setChannels(prev => 
      prev.includes(ch) ? prev.filter(c => c !== ch) : [...prev, ch]
    );
  };

  const templates = [
    { id: 1, type: "Pest Warning", icon: Zap, color: "text-rose-500", bg: "bg-rose-50", text: "Urgent: Yellow Stem Borer detected in Bhatli region. Recommended pesticide application within 48 hours." },
    { id: 2, type: "Rainfall Advisory", icon: CloudRain, color: "text-blue-500", bg: "bg-blue-50", text: "Weather Alert: Heavy rainfall predicted for Bargarh district. Ensure proper drainage in rice fields." },
    { id: 3, type: "Pesticide Use", icon: AlertTriangle, color: "text-amber-500", bg: "bg-amber-50", text: "Organic Farming Tip: Use Neems oil spray for early-stage pest control in Maize crops." }
  ];

  const targetGroups = [
    { name: "All Farmers", count: "12,482" },
    { name: "Rice Growers", count: "8,920" },
    { name: "Kendrapara Block", count: "1,240" },
    { name: "Active Outbreak Zones", count: "480" }
  ];

  return (
    <div className="h-full flex flex-col space-y-10">
      <header>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Advisory Broadcast</h1>
        <p className="text-slate-500 font-medium italic">Send critical alerts and agricultural advisories through multi-channel networks.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 flex-1 min-h-0">
        {/* COMPOSER SECTION */}
        <div className="lg:col-span-3 space-y-10 overflow-y-auto pr-2">
           {/* STEP 1: MESSAGE */}
           <section className="space-y-6">
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-black text-xs">1</div>
                 <h3 className="text-xl font-black text-slate-900">Compose Message</h3>
              </div>
              <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl p-8 space-y-6">
                 <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Select Template (Optional)</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                       {templates.map(t => (
                         <button 
                          key={t.id} 
                          onClick={() => setTemplate(t)}
                          className={`p-4 rounded-3xl border transition-all text-left group ${template?.id === t.id ? 'bg-blue-600 border-blue-600 text-white' : 'bg-slate-50 border-slate-100 hover:border-blue-200'}`}
                         >
                            <t.icon size={20} className={`mb-3 ${template?.id === t.id ? 'text-white' : t.color}`} />
                            <p className="text-[10px] font-black uppercase tracking-tight">{t.type}</p>
                         </button>
                       ))}
                    </div>
                 </div>
                 <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Broadcast Content</label>
                    <textarea 
                      placeholder="Enter the advisory message here..." 
                      value={template?.text || ""}
                      onChange={(e) => setTemplate(prev => ({ ...prev, text: e.target.value }))}
                      className="w-full p-8 bg-slate-50 border border-slate-100 rounded-[2rem] outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-bold text-slate-700 min-h-[200px] resize-none"
                    />
                 </div>
              </div>
           </section>

           {/* STEP 2: CHANNELS */}
           <section className="space-y-6">
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-black text-xs">2</div>
                 <h3 className="text-xl font-black text-slate-900">Delivery Channels</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                 {[
                   { id: "Notification", icon: Bell, label: "App Push" },
                   { id: "SMS", icon: Smartphone, label: "SMS Gateway" },
                   { id: "WhatsApp", icon: MessageCircle, label: "WhatsApp" },
                 ].map(ch => (
                   <button 
                    key={ch.id}
                    onClick={() => toggleChannel(ch.id)}
                    className={`flex items-center justify-between p-6 rounded-3xl border-2 transition-all ${channels.includes(ch.id) ? 'bg-white border-blue-600 shadow-xl' : 'bg-white/50 border-transparent opacity-60 grayscale'}`}
                   >
                      <div className="flex flex-col gap-2">
                         <ch.icon size={28} className={channels.includes(ch.id) ? 'text-blue-600' : 'text-slate-400'} />
                         <span className="text-[10px] font-black uppercase tracking-widest">{ch.label}</span>
                      </div>
                      {channels.includes(ch.id) && <CheckCircle2 className="text-blue-600" size={20} />}
                   </button>
                 ))}
              </div>
           </section>
        </div>

        {/* SUMMARY SECTION */}
        <div className="lg:col-span-2 space-y-8">
           <div className="bg-white rounded-[3rem] border border-slate-200 shadow-2xl p-10 space-y-10">
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-6 mb-6">Broadcast Summary</h3>
              
              <div className="space-y-6">
                 <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                       <MapPin size={14} /> Target Audience
                    </label>
                    <select className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 appearance-none outline-none focus:ring-4 focus:ring-blue-500/10">
                       {targetGroups.map(g => (
                         <option key={g.name}>{g.name} ({g.count} Farmers)</option>
                       ))}
                    </select>
                 </div>

                 <div className="flex items-center justify-between p-4 bg-blue-50 rounded-2xl border border-blue-100">
                    <div className="flex items-center gap-3">
                       <Users className="text-blue-600" size={20} />
                       <span className="text-[10px] font-black uppercase tracking-widest text-blue-700">Estimated Reach</span>
                    </div>
                    <span className="text-lg font-black text-blue-900">12,482</span>
                 </div>
              </div>

              <div className="pt-10 border-t border-slate-100">
                 <button className="w-full py-5 bg-blue-600 text-white rounded-[2.5rem] font-black uppercase tracking-[0.2em] shadow-2xl shadow-blue-500/30 hover:bg-blue-700 hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-4">
                    Initialize Broadcast <Send size={24} />
                 </button>
                 <p className="text-center text-[10px] text-slate-400 font-bold mt-6 uppercase tracking-widest italic flex items-center justify-center gap-2">
                    <Zap size={14} className="text-amber-500" /> Authorized regional advisory protocol
                 </p>
              </div>
           </div>

           <div className="bg-slate-900 rounded-[3rem] p-8 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full translate-x-12 -translate-y-12 group-hover:scale-150 transition-transform" />
              <h4 className="font-bold text-sm tracking-widest border-b border-white/10 pb-4 mb-6 flex items-center gap-2">
                 <Phone size={16} className="text-blue-400" /> Emergency Protocols
              </h4>
              <p className="text-xs font-medium opacity-60 leading-relaxed italic mb-6">
                 Critical alerts ignore DND settings and are sent via regional SMS towers for 100% penetration.
              </p>
              <button className="w-full flex items-center justify-between group/btn text-[10px] font-black uppercase tracking-widest text-blue-400 hover:text-white transition-colors">
                 Emergency Guidelines <ArrowRight className="group-hover/btn:translate-x-3 transition-transform" />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdvisoryBroadcast;
