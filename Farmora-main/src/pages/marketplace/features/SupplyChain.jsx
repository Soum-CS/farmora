import React from "react";
import { Truck, MapPin, PackageCheck, AlertCircle, ArrowRight } from "lucide-react";

const SupplyChain = () => {
  return (
    <div className="space-y-6 relative z-10">
      
      {/* Active Shipment Tracker */}
      <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-widest mb-3">
              Active Shipment
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Premium Cotton Delivery</h2>
            <p className="text-slate-500 font-bold text-sm mt-1">Order #ORD-9390 • Expected: Tomorrow, 2:00 PM</p>
          </div>
          <button className="px-5 py-2.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-amber-600 transition-colors text-sm">
            Contact Driver
          </button>
        </div>

        {/* Tracking Timeline */}
        <div className="relative mt-12 mb-8 px-4 md:px-12">
          {/* Progress Bar Background */}
          <div className="absolute top-1/2 left-4 md:left-12 right-4 md:right-12 h-1.5 bg-slate-100 -translate-y-1/2 rounded-full z-0" />
          {/* Progress Bar Fill */}
          <div className="absolute top-1/2 left-4 md:left-12 w-2/3 h-1.5 bg-amber-500 -translate-y-1/2 rounded-full z-0" />

          <div className="relative z-10 flex justify-between">
            {/* Step 1 */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/30 mb-3">
                <CheckCircle size={20} />
              </div>
              <p className="font-black text-slate-900 text-sm">Farm Prep</p>
              <p className="text-xs font-bold text-slate-400 mt-1">Oct 12, 10:00 AM</p>
            </div>
            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/30 mb-3">
                <CheckCircle size={20} />
              </div>
              <p className="font-black text-slate-900 text-sm">Quality QA</p>
              <p className="text-xs font-bold text-slate-400 mt-1">Oct 12, 2:30 PM</p>
            </div>
            {/* Step 3 */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-xl shadow-slate-900/20 mb-3 ring-4 ring-white -translate-y-1">
                <Truck size={24} />
              </div>
              <p className="font-black text-amber-600 text-sm">In Transit</p>
              <p className="text-xs font-bold text-slate-500 mt-1">Near Sambalpur</p>
            </div>
            {/* Step 4 */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-white border-2 border-slate-200 text-slate-300 flex items-center justify-center mb-3">
                <MapPin size={20} />
              </div>
              <p className="font-bold text-slate-400 text-sm">Destination</p>
              <p className="text-xs font-bold text-slate-400 mt-1">Pending</p>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics & Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-emerald-900 text-white rounded-[2rem] p-6 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-800 rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-500 opacity-50" />
          <div className="relative z-10 border border-emerald-700/50 bg-emerald-800/30 p-4 rounded-2xl w-fit mb-4">
            <PackageCheck size={24} className="text-emerald-300" />
          </div>
          <h3 className="text-4xl font-black mb-1">98.5%</h3>
          <p className="text-emerald-200 font-bold text-sm tracking-wide">On-Time Delivery Rate</p>
        </div>

        <div className="bg-white rounded-[2rem] border border-slate-200 p-6 shadow-sm">
          <div className="p-4 rounded-2xl w-fit mb-4 bg-blue-50 text-blue-600">
            <Truck size={24} />
          </div>
          <h3 className="text-4xl font-black text-slate-900 mb-1">12</h3>
          <p className="text-slate-500 font-bold text-sm tracking-wide">Active Transports</p>
        </div>

        <div className="bg-white rounded-[2rem] border border-slate-200 p-6 shadow-sm">
          <div className="p-4 rounded-2xl w-fit mb-4 bg-amber-50 text-amber-600">
            <AlertCircle size={24} />
          </div>
          <h3 className="text-4xl font-black text-slate-900 mb-1">0</h3>
          <p className="text-slate-500 font-bold text-sm tracking-wide">Transit Issues</p>
        </div>
      </div>
      
    </div>
  );
};

// Simple icon for the component to prevent undefined errors
const CheckCircle = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
);

export default SupplyChain;
