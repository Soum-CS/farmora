import React from "react";
import { User, Shield, MapPin, Award, Mail, Phone, Lock, ChevronRight, LogOut, Settings } from "lucide-react";

const OfficerProfile = () => (
  <div className="max-w-4xl mx-auto space-y-10 pb-20">
    <header className="text-center">
       <div className="relative inline-block mb-6">
          <div className="w-32 h-32 rounded-[2.5rem] bg-blue-100 border-4 border-white shadow-2xl overflow-hidden">
             <img src="https://ui-avatars.com/api/?name=Rakesh+Mohanty&background=2563eb&color=fff&size=200" alt="Officer" />
          </div>
          <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-500 border-4 border-white rounded-2xl flex items-center justify-center text-white shadow-lg">
             <Shield size={20} />
          </div>
       </div>
       <h1 className="text-3xl font-black text-slate-900 tracking-tight">Rakesh Mohanty</h1>
       <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-1">Regional Agriculture Officer • Grade I</p>
    </header>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
       {/* BASIC INFO */}
       <section className="bg-white rounded-[3rem] border border-slate-200 shadow-xl p-8 space-y-8">
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 border-b border-slate-50 pb-4">Personal Intelligence</h3>
          <div className="space-y-6">
             {[
               { icon: MapPin, label: "Assigned Region", value: "Bargarh District, Odisha" },
               { icon: award, label: "Years of Service", value: "8.5 Years" },
               { icon: Mail, label: "Work Email", value: "rakesh.m@farmora.gov.in" },
               { icon: Phone, label: "Emergency Contact", value: "+91 98765 43210" },
             ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                   <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                      <item.icon size={20} />
                   </div>
                   <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{item.label}</p>
                      <p className="text-sm font-bold text-slate-900">{item.value}</p>
                   </div>
                </div>
             ))}
          </div>
       </section>

       {/* GOVERNANCE & SECURITY */}
       <section className="bg-slate-900 rounded-[3rem] p-8 text-white space-y-8">
          <h3 className="text-xs font-black uppercase tracking-widest opacity-40 border-b border-white/5 pb-4">System Access</h3>
          <div className="space-y-4">
             {[
               { icon: Lock, label: "Two-Factor Auth", status: "Enabled", color: "text-emerald-400" },
               { icon: Shield, label: "Access Level", status: "Administrator", color: "text-blue-400" },
               { icon: Settings, label: "Command Config", status: "Manage", color: "text-slate-400" },
             ].map((item, i) => (
                <button key={i} className="w-full flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all text-left">
                   <div className="flex items-center gap-4">
                      <item.icon size={20} className="opacity-40" />
                      <div>
                         <p className="text-[10px] font-black uppercase tracking-widest opacity-40">{item.label}</p>
                         <p className={`text-xs font-black ${item.color}`}>{item.status}</p>
                      </div>
                   </div>
                   <ChevronRight size={18} className="opacity-20" />
                </button>
             ))}
             <button className="w-full mt-4 py-4 bg-rose-500/10 text-rose-500 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 hover:bg-rose-500 hover:text-white transition-all">
                <LogOut size={16} /> Logout Securely
             </button>
          </div>
       </section>
    </div>
  </div>
);

// Helper for award icon case
const award = Award;

export default OfficerProfile;
