import React, { useState } from "react";
import { 
  Users, 
  MessageSquare, 
  Clock, 
  MapPin, 
  AlertCircle, 
  CheckCircle2, 
  Search, 
  Filter, 
  ArrowRight,
  Send,
  UserCheck,
  Zap,
  Tag
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FarmerRequests = () => {
  const [selectedTicket, setSelectedTicket] = useState(null);

  const tickets = [
    {
      id: "TKT-1088",
      farmer: "Ramesh Nayak",
      location: "Cuttack",
      issue: "Yellow leaves in rice crop",
      category: "Pest/Disease",
      status: "Open",
      time: "2h ago",
      priority: "High",
      history: [
        { type: "user", text: "My 2-acre rice field is showing yellow spots on the leaves. It started from the corner and is spreading fast.", time: "2h ago" }
      ]
    },
    {
      id: "TKT-1092",
      farmer: "Suresh Sahu",
      location: "Bhubaneswar",
      issue: "Low yield prediction query",
      category: "Advisory",
      status: "Pending",
      time: "5h ago",
      priority: "Medium",
      history: [
        { type: "user", text: "The AI assistant predicted lower yield this season. I want to know what fertilizers I should add now.", time: "5h ago" }
      ]
    }
  ];

  return (
    <div className="h-full flex flex-col space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Farmer Support Requests</h1>
          <p className="text-slate-500 font-medium">Resolving tickets and providing expert agricultural advisory.</p>
        </div>
        
        <div className="flex items-center gap-4">
           <div className="bg-white px-4 py-2.5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
              <UserCheck size={20} className="text-indigo-600" />
              <span className="text-xs font-black uppercase text-indigo-600">3 Online Experts</span>
           </div>
           <button className="px-6 py-2.5 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-blue-200">
              New Ticket
           </button>
        </div>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-0">
        {/* TICKET LIST */}
        <div className="lg:col-span-1 space-y-4 overflow-y-auto pr-2">
           <div className="flex gap-2 mb-6">
              <div className="relative flex-1 group">
                 <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                 <input 
                   type="text" 
                   placeholder="Search tickets..." 
                   className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-bold text-sm"
                 />
              </div>
              <button className="p-4 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-blue-600 transition-colors">
                 <Filter size={20} />
              </button>
           </div>

           {tickets.map(ticket => (
             <motion.button
               key={ticket.id}
               onClick={() => setSelectedTicket(ticket)}
               whileHover={{ x: 5 }}
               className={`w-full text-left p-6 rounded-[2.5rem] border transition-all ${selectedTicket?.id === ticket.id ? 'bg-white border-blue-500 shadow-xl ring-1 ring-blue-500' : 'bg-white/60 border-slate-200 hover:border-blue-200 shadow-sm'}`}
             >
                <div className="flex justify-between items-start mb-4">
                   <div className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase ${ticket.priority === 'High' ? 'bg-rose-100 text-rose-600' : 'bg-blue-100 text-blue-600'}`}>
                      {ticket.priority} Priority
                   </div>
                   <span className="text-[10px] text-slate-400 font-bold">{ticket.time}</span>
                </div>
                <h4 className="font-black text-slate-900 leading-tight mb-2 line-clamp-2">{ticket.issue}</h4>
                <div className="flex items-center gap-3 mt-4 pt-3 border-t border-slate-100">
                   <div className="w-8 h-8 rounded-full bg-slate-100 overflow-hidden">
                      <img src={`https://ui-avatars.com/api/?name=${ticket.farmer}&background=random`} alt="" />
                   </div>
                   <div>
                      <p className="text-xs font-black text-slate-900">{ticket.farmer}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">{ticket.location}</p>
                   </div>
                </div>
             </motion.button>
           ))}
        </div>

        {/* CHAT INTERFACE */}
        <div className="lg:col-span-2 min-h-0 h-full">
           <AnimatePresence mode="wait">
              {selectedTicket ? (
                <motion.div 
                  key={selectedTicket.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-[3.5rem] border border-slate-200 shadow-2xl h-full flex flex-col overflow-hidden"
                >
                   {/* TICKET HEADER */}
                   <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                            <Tag size={24} />
                         </div>
                         <div>
                            <h3 className="text-xl font-black text-slate-900 tracking-tight">{selectedTicket.id}</h3>
                            <p className="text-xs text-slate-500 font-medium">Category: <span className="font-bold text-slate-700">{selectedTicket.category}</span></p>
                         </div>
                      </div>
                      <div className="flex gap-2">
                         <button className="p-3 bg-slate-50 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"><AlertCircle size={20} /></button>
                         <button className="p-3 bg-slate-50 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all"><CheckCircle2 size={20} /></button>
                      </div>
                   </div>

                   {/* MESSAGES */}
                   <div className="flex-1 overflow-y-auto p-10 space-y-8 bg-slate-50/30">
                      {selectedTicket.history.map((msg, i) => (
                        <div key={i} className={`flex ${msg.type === 'user' ? 'justify-start' : 'justify-end'}`}>
                           <div className={`max-w-[80%] p-6 rounded-[2rem] ${msg.type === 'user' ? 'bg-white shadow-md rounded-tl-none' : 'bg-blue-600 text-white shadow-xl shadow-blue-900/10 rounded-tr-none'}`}>
                              <p className="text-sm font-medium leading-relaxed">{msg.text}</p>
                              <p className={`text-[10px] mt-3 font-bold uppercase opacity-60 ${msg.type === 'user' ? 'text-slate-400' : 'text-blue-100'}`}>{msg.time}</p>
                           </div>
                        </div>
                      ))}
                   </div>

                   {/* INPUT AREA */}
                   <div className="p-8 bg-white border-t border-slate-100">
                      <div className="flex gap-4">
                         <div className="flex-1 relative group">
                            <textarea 
                              placeholder="Type your advisory or internal note..." 
                              className="w-full pl-6 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-[2rem] outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium text-sm resize-none h-14"
                            />
                         </div>
                         <button className="w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:scale-105 active:scale-95 transition-all">
                            <Send size={24} strokeWidth={2.5} />
                         </button>
                      </div>
                      <div className="mt-6 flex flex-wrap gap-2">
                         <button className="px-4 py-2 bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-colors">Assign Expert</button>
                         <button className="px-4 py-2 bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-colors">Satellite Intel</button>
                         <button className="px-4 py-2 bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-colors">Schedule Visit</button>
                         <div className="flex-1" />
                         <span className="flex items-center gap-2 text-[10px] font-black text-amber-500 uppercase">
                            <Zap size={14} className="animate-pulse" /> AI Draft Available
                         </span>
                      </div>
                   </div>
                </motion.div>
              ) : (
                <div className="h-full bg-slate-50 border-4 border-dashed border-slate-200 rounded-[3.5rem] flex flex-col items-center justify-center p-20 text-center text-slate-400">
                   <MessageSquare size={60} className="mb-6 opacity-20" />
                   <h3 className="text-2xl font-black text-slate-900 mb-2">Select a Support Ticket</h3>
                   <p className="font-medium max-w-sm italic">Direct communication with regional farmers to solve immediate agricultural hurdles.</p>
                </div>
              )}
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default FarmerRequests;
