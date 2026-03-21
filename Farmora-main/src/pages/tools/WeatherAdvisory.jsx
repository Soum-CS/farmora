import React, { useEffect, useState, useCallback } from "react";
import { 
  CloudRain, 
  Sun, 
  Wind, 
  Droplets, 
   Loader2,
   MapPin,
  CloudLightning,
  ChevronRight,
  TrendingDown,
  AlertTriangle,
  Info
} from "lucide-react";
import { motion } from "framer-motion";
import { getWeather } from "../../api";

const ICON_MAP = {
   Sun,
   CloudRain,
   CloudLightning
};

const FALLBACK_WEATHER = {
   location: { city: "Bargarh", state: "Odisha" },
   current: { temperature: 28, humidity: 64, windSpeed: 12, condition: "Sunny" },
   hourlyForecast: [
      { time: "10:00", temperature: "28C", icon: "Sun", rainChance: "0%" },
      { time: "13:00", temperature: "31C", icon: "Sun", rainChance: "5%" },
      { time: "16:00", temperature: "29C", icon: "CloudRain", rainChance: "45%" },
      { time: "19:00", temperature: "26C", icon: "CloudLightning", rainChance: "70%" }
   ],
   weeklyForecast: [
      { day: "Mon", tempRange: "30/22C", icon: "Sun" },
      { day: "Tue", tempRange: "29/21C", icon: "CloudRain" },
      { day: "Wed", tempRange: "27/20C", icon: "CloudLightning" },
      { day: "Thu", tempRange: "28/21C", icon: "Sun" },
      { day: "Fri", tempRange: "31/23C", icon: "Sun" }
   ],
   alerts: [
      {
         title: "Active Warning",
         description: "Heavy rainfall cluster detected moving East. Potential intensity of 25mm/hr between 17:00 and 20:00 tonight.",
         advisory: "Postpone all fertilizer applications for the next 24h."
      }
   ],
   insights: {
      evaporationRate: "Moderate (4.2mm/day)",
      dewPoint: "19C (Standard)",
      solarIndex: "8.4 (V. High)",
      solarNote: "High UV index predicted. Optimal photosynthesis between 8 AM - 11 AM."
   }
};

const QUICK_LOCATIONS = [
   "Bargarh",
   "Sambalpur",
   "Cuttack",
   "Bhubaneswar",
   "Raipur",
   "Kolkata"
];

const WeatherAdvisory = () => {
   const [weather, setWeather] = useState(FALLBACK_WEATHER);
   const [loading, setLoading] = useState(true);
   const [loadingLocation, setLoadingLocation] = useState(false);
   const [selectedLocation, setSelectedLocation] = useState("Bargarh");
   const [customLocation, setCustomLocation] = useState("");
   const [locationError, setLocationError] = useState("");
   const [lastRefreshAt, setLastRefreshAt] = useState(null);

   const fetchWeatherForLocation = useCallback(async (location, options = {}) => {
      const { silent = false } = options;
      if (!silent) setLoadingLocation(true);

      try {
         const data = await getWeather(location);
         setWeather(data);
         setLocationError("");
         setLastRefreshAt(new Date());
      } catch (err) {
         console.warn("Weather API unavailable, using fallback:", err.message);
         if (!silent) {
            setLocationError(`Unable to fetch weather for ${location}. Showing fallback data.`);
         }
      } finally {
         setLoading(false);
         if (!silent) setLoadingLocation(false);
      }
   }, []);

   useEffect(() => {
      fetchWeatherForLocation(selectedLocation);
   }, [selectedLocation, fetchWeatherForLocation]);

   useEffect(() => {
      const intervalId = setInterval(() => {
         fetchWeatherForLocation(selectedLocation, { silent: true });
      }, 60000);

      return () => clearInterval(intervalId);
   }, [selectedLocation, fetchWeatherForLocation]);

   const applyCustomLocation = () => {
      const normalized = customLocation.trim();
      if (!normalized) return;
      setLoadingLocation(true);
      setSelectedLocation(normalized);
   };

   const locationText = [weather?.location?.city, weather?.location?.state].filter(Boolean).join(", ");
   const alert = weather?.alerts?.[0] || FALLBACK_WEATHER.alerts[0];
   const hourlyForecast = weather?.hourlyForecast || FALLBACK_WEATHER.hourlyForecast;
   const weeklyForecast = weather?.weeklyForecast || FALLBACK_WEATHER.weeklyForecast;
   const current = weather?.current || FALLBACK_WEATHER.current;
   const insights = weather?.insights || FALLBACK_WEATHER.insights;

   if (loading) {
      return (
         <div className="p-8 min-h-screen bg-[#fdfcf0] flex items-center justify-center">
            <div className="flex items-center gap-3 text-slate-600 font-bold">
               <Loader2 className="animate-spin" size={22} /> Loading weather intelligence...
            </div>
         </div>
      );
   }

  return (
    <div className="p-8 space-y-10 min-h-screen bg-[#fdfcf0]">
      <header>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Weather Intelligence & Advisory</h1>
        <p className="text-slate-500 font-medium italic">Hyper-local forecasts and precision-farming climate alerts.</p>
            <div className="mt-6 flex flex-col md:flex-row gap-3 md:items-center">
               <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-2xl px-4 py-2 shadow-sm">
                  <MapPin size={16} className="text-slate-500" />
                  <label htmlFor="weather-location" className="text-xs font-black uppercase tracking-wider text-slate-500">Location</label>
                  <select
                     id="weather-location"
                     value={selectedLocation}
                     onChange={(e) => {
                        setLoadingLocation(true);
                        setSelectedLocation(e.target.value);
                     }}
                     className="bg-transparent text-sm font-bold text-slate-800 outline-none"
                  >
                     {QUICK_LOCATIONS.map((loc) => (
                        <option key={loc} value={loc}>{loc}</option>
                     ))}
                  </select>
               </div>

               <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-2xl px-3 py-2 shadow-sm">
                  <input
                     type="text"
                     value={customLocation}
                     onChange={(e) => setCustomLocation(e.target.value)}
                     onKeyDown={(e) => {
                        if (e.key === "Enter") applyCustomLocation();
                     }}
                     placeholder="Try any city"
                     className="min-w-44 md:min-w-64 text-sm font-medium text-slate-700 placeholder:text-slate-400 outline-none"
                  />
                  <button
                     onClick={applyCustomLocation}
                     className="px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-colors"
                  >
                     Apply
                  </button>
               </div>

               {loadingLocation && (
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                     <Loader2 size={14} className="animate-spin" /> Updating location...
                  </div>
               )}
            </div>
            {locationError && (
               <p className="mt-2 text-xs font-bold text-amber-700">{locationError}</p>
            )}
            {lastRefreshAt && (
               <p className="mt-1 text-xs font-semibold text-slate-500">
                  Auto-refreshing every 60s. Last update: {lastRefreshAt.toLocaleTimeString()}
               </p>
            )}
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* MAIN WEATHER CARD */}
        <div className="lg:col-span-2 space-y-8">
           <section className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[3.5rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-blue-900/20">
              <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full translate-x-1/3 -translate-y-1/3 blur-3xl" />
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                 <div className="space-y-4 text-center md:text-left">
                    <div className="flex items-center gap-2 justify-center md:justify-start px-4 py-1.5 bg-white/10 rounded-full border border-white/10 w-fit text-[10px] font-black uppercase tracking-widest text-blue-200">
                       <MapPin size={14} /> {locationText || "Bargarh, Odisha"}
                    </div>
                    <div className="flex items-baseline gap-4 justify-center md:justify-start">
                       <h2 className="text-7xl font-black">{current.temperature}C</h2>
                       <span className="text-2xl font-bold opacity-60">{current.condition}</span>
                    </div>
                    <div className="flex items-center gap-6 justify-center md:justify-start text-sm font-medium opacity-80">
                       <span className="flex items-center gap-2"><Droplets size={18} /> {current.humidity}% Humidity</span>
                       <span className="flex items-center gap-2"><Wind size={18} /> {current.windSpeed} km/h Wind</span>
                    </div>
                 </div>
                 <motion.div 
                   animate={{ y: [0, -10, 0] }}
                   transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                   className="text-amber-300 drop-shadow-[0_0_20px_rgba(252,211,77,0.4)]"
                 >
                    <Sun size={120} strokeWidth={1} />
                 </motion.div>
              </div>

              <div className="mt-12 grid grid-cols-4 gap-4 relative z-10">
                 {hourlyForecast.map((h, i) => (
                    (() => {
                      const HourIcon = ICON_MAP[h.icon] || Sun;
                      return (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-3xl p-4 text-center group hover:bg-white/10 transition-colors">
                       <p className="text-[10px] font-black uppercase opacity-60 mb-2">{h.time}</p>
                       <HourIcon size={24} className="mx-auto mb-2 text-blue-200" />
                       <p className="text-sm font-black">{h.temperature}</p>
                       <p className="text-[9px] font-bold text-blue-300">{h.rainChance}</p>
                    </div>
                      );
                    })()
                 ))}
              </div>
           </section>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <section className="bg-rose-50 rounded-[3rem] border border-rose-100 p-8 shadow-xl shadow-rose-900/5">
                 <div className="flex items-center gap-3 text-rose-600 mb-6">
                    <AlertTriangle size={24} />
                    <h3 className="text-xl font-black tracking-tight">{alert.title || "Active Warning"}</h3>
                 </div>
                 <p className="text-sm font-medium text-slate-700 leading-relaxed mb-6">
                    {alert.description}
                 </p>
                 <div className="p-4 bg-white rounded-2xl border border-rose-100 space-y-1">
                    <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Advisory</p>
                    <p className="text-xs font-bold text-slate-600">{alert.advisory}</p>
                 </div>
              </section>

              <section className="bg-white rounded-[3rem] border border-slate-200 p-8 shadow-xl shadow-emerald-900/5">
                 <h3 className="text-xl font-black text-slate-900 tracking-tight mb-6">Climate Insights</h3>
                 <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                       <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Evaporation Rate</p>
                          <p className="text-xs font-black text-slate-700">{insights.evaporationRate}</p>
                       </div>
                       <TrendingDown size={20} className="text-emerald-500" />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                       <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Dew Point</p>
                          <p className="text-xs font-black text-slate-700">{insights.dewPoint}</p>
                       </div>
                       <Info size={20} className="text-blue-500" />
                    </div>
                 </div>
              </section>
           </div>
        </div>

        {/* SIDEBAR: WEEKLY & HISTORICAL */}
        <div className="space-y-8">
           <section className="bg-white rounded-[3rem] border border-slate-200 shadow-xl shadow-blue-900/5 p-8">
              <h2 className="text-xl font-black text-slate-900 tracking-tight mb-8">5-Day Outlook</h2>
              <div className="space-y-6">
                 {weeklyForecast.map((w, i) => (
                   (() => {
                     const WeekIcon = ICON_MAP[w.icon] || Sun;
                     return (
                   <div key={i} className="flex items-center justify-between group cursor-pointer hover:bg-slate-50 p-2 rounded-2xl transition-all">
                      <div className="flex items-center gap-4">
                         <span className="w-8 font-black text-slate-400 text-xs">{w.day}</span>
                         <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                            <WeekIcon size={20} />
                         </div>
                      </div>
                      <span className="text-sm font-black text-slate-700">{w.tempRange}</span>
                   </div>
                     );
                   })()
                 ))}
              </div>
              <button className="w-full mt-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                 Advanced Chart <ChevronRight size={14} />
              </button>
           </section>

           <section className="bg-amber-900 rounded-[3rem] p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full translate-x-12 -translate-y-12" />
              <div className="w-12 h-12 bg-amber-800 rounded-2xl flex items-center justify-center mb-6">
                 <Sun size={24} className="text-amber-300" />
              </div>
              <h3 className="text-xl font-black mb-4 tracking-tight">Solar Intensity</h3>
              <p className="text-sm font-medium opacity-70 leading-relaxed mb-6">
                         {insights.solarNote}
              </p>
              <div className="text-xs font-black bg-amber-500/30 px-3 py-1.5 rounded-full inline-block">
                         Index: {insights.solarIndex}
              </div>
           </section>
        </div>
      </div>
    </div>
  );
};

export default WeatherAdvisory;
