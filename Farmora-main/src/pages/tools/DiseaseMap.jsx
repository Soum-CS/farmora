import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { MapContainer, TileLayer, CircleMarker, Circle, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { ShieldAlert, Wifi, WifiOff, RefreshCw, Filter, Layers, Info, ArrowRight, MapPin, Flame, Play, Pause } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { getApiBaseUrl } from "../../api";

const API_BASE = getApiBaseUrl();
const REGION_OPTIONS = ["Bargarh", "Sambalpur", "Cuttack", "Raipur", "All"];
const TIME_WINDOWS = [
  { label: "24h", value: 24 },
  { label: "3d", value: 72 },
  { label: "7d", value: 168 }
];

const FALLBACK_ALERTS = [
  { _id: "f1", village: "Bhatli",    disease: "Leaf Blight", status: "Outbreak", severity: "critical", lat: 21.01, lng: 83.15 },
  { _id: "f2", village: "Ambapali",  disease: "Pest Attack",  status: "Warning",  severity: "high",     lat: 21.18, lng: 83.22 },
  { _id: "f3", village: "Bargarh",   disease: "Rice Blast",   status: "Clustered",severity: "high",     lat: 21.33, lng: 83.62 },
  { _id: "f4", village: "Sohela",    disease: "Stem Borer",   status: "Moderate", severity: "medium",   lat: 21.07, lng: 83.52 },
];

// Map status/severity to Leaflet circle marker color
function alertColor(alert) {
  if (alert.status === "Outbreak")  return "#dc2626"; // red-600
  if (alert.status === "Clustered") return "#ea580c"; // orange-600
  if (alert.status === "Warning")   return "#d97706"; // amber-600
  return "#65a30d"; // lime-600 — Moderate / Resolved
}

function severityBg(severity) {
  if (severity === "critical") return "bg-red-600";
  if (severity === "high")     return "bg-orange-500";
  if (severity === "medium")   return "bg-amber-500";
  return "bg-lime-500";
}

function parseAlertTime(alert) {
  if (!alert?.createdAt) return null;
  const t = new Date(alert.createdAt);
  return Number.isNaN(t.getTime()) ? null : t;
}

// Tiny component to refit map bounds when alerts change
function FitBounds({ alerts }) {
  const map = useMap();
  useEffect(() => {
    const withCoords = alerts.filter(a => (a.displayLat ?? a.lat) && (a.displayLng ?? a.lng));
    if (withCoords.length === 0) return;
    const bounds = withCoords.map(a => [a.displayLat ?? a.lat, a.displayLng ?? a.lng]);
    map.fitBounds(bounds, { padding: [60, 60] });
  }, [alerts, map]);
  return null;
}

const DiseaseMap = () => {
  const { t } = useTranslation();
  const [alerts, setAlerts]         = useState(FALLBACK_ALERTS);
  const [selected, setSelected]     = useState(null);
  const [live, setLive]             = useState(false);   // SSE connected?
  const [lastUpdate, setLastUpdate] = useState(null);
  const [newIds, setNewIds]         = useState(new Set());
  const [selectedRegion, setSelectedRegion] = useState("Bargarh");
  const [timeWindowHours, setTimeWindowHours] = useState(24);
  const [viewMode, setViewMode] = useState("points");
  const [playbackOn, setPlaybackOn] = useState(false);
  const [playbackIndex, setPlaybackIndex] = useState(0);
  const sseRef                      = useRef(null);
  const reconnectTimeoutRef         = useRef(null);

  // Merge incoming alerts — keep existing, append truly new ones
  const mergeAlerts = useCallback((incoming, options = {}) => {
    const { replace = false } = options;
    if (!Array.isArray(incoming)) return;

    if (replace) {
      setAlerts([...incoming]);
      setLastUpdate(new Date());
      return;
    }

    if (incoming.length === 0) return;

    setAlerts(prev => {
      const existingIds = new Set(prev.map(a => String(a._id)));
      const added = incoming.filter(a => !existingIds.has(String(a._id)));
      if (added.length > 0) {
        setNewIds(ids => {
          const next = new Set(ids);
          added.forEach(a => next.add(String(a._id)));
          setTimeout(() => setNewIds(n => { const c = new Set(n); added.forEach(a => c.delete(String(a._id))); return c; }), 3000);
          return next;
        });
      }
      // Replace existing with fresh data, prepend newly arrived
      const merged = [...added, ...prev.map(p => incoming.find(i => String(i._id) === String(p._id)) || p)];
      return merged;
    });
    setLastUpdate(new Date());
  }, []);

  // Connect to SSE stream
  const connectSSE = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
    if (sseRef.current) sseRef.current.close();
    const regionQuery = selectedRegion === "All" ? "" : `?region=${encodeURIComponent(selectedRegion)}`;
    const es = new EventSource(`${API_BASE}/disease-alerts/stream${regionQuery}`);

    es.addEventListener("snapshot", (e) => {
      try { mergeAlerts(JSON.parse(e.data), { replace: true }); } catch (_) {}
    });

    es.addEventListener("alert", (e) => {
      try {
        const alert = JSON.parse(e.data);
        mergeAlerts([alert]);
      } catch (_) {}
    });

    es.onopen  = () => setLive(true);
    es.onerror = () => {
      setLive(false);
      es.close();
      // Reconnect after 10 seconds
      reconnectTimeoutRef.current = setTimeout(connectSSE, 10000);
    };

    sseRef.current = es;
  }, [mergeAlerts, selectedRegion]);

  useEffect(() => {
    setAlerts([]);
    setSelected(null);
    connectSSE();
    return () => {
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
      if (sseRef.current) sseRef.current.close();
    };
  }, [connectSSE, selectedRegion]);

  // Fallback polling every 30 s if SSE is not alive
  useEffect(() => {
    if (live) return;
    const poll = async () => {
      try {
        const regionQuery = selectedRegion === "All" ? "" : `?region=${encodeURIComponent(selectedRegion)}`;
        const res = await fetch(`${API_BASE}/disease-alerts${regionQuery}`);
        if (!res.ok) return;
        const data = await res.json();
        mergeAlerts(data, { replace: true });
      } catch (_) {}
    };
    poll(); // immediate first load
    const id = setInterval(poll, 30000);
    return () => clearInterval(id);
  }, [live, mergeAlerts, selectedRegion]);

  const timeFilteredAlerts = useMemo(() => {
    const nowMs = Date.now();
    const cutoff = nowMs - (timeWindowHours * 60 * 60 * 1000);
    return alerts.filter((a) => {
      const parsed = parseAlertTime(a);
      if (!parsed) return true;
      return parsed.getTime() >= cutoff;
    });
  }, [alerts, timeWindowHours]);

  const timelineAlerts = useMemo(() => {
    return [...timeFilteredAlerts].sort((a, b) => {
      const ta = parseAlertTime(a)?.getTime() ?? 0;
      const tb = parseAlertTime(b)?.getTime() ?? 0;
      return ta - tb;
    });
  }, [timeFilteredAlerts]);

  useEffect(() => {
    setPlaybackIndex(timelineAlerts.length > 0 ? timelineAlerts.length - 1 : 0);
  }, [timelineAlerts.length]);

  useEffect(() => {
    if (!playbackOn || timelineAlerts.length === 0) return;
    const id = setInterval(() => {
      setPlaybackIndex((prev) => {
        if (prev >= timelineAlerts.length - 1) return 0;
        return prev + 1;
      });
    }, 1200);
    return () => clearInterval(id);
  }, [playbackOn, timelineAlerts.length]);

  const playbackVisibleAlerts = useMemo(() => {
    if (!playbackOn || timelineAlerts.length === 0) return timelineAlerts;
    return timelineAlerts.slice(0, playbackIndex + 1);
  }, [timelineAlerts, playbackOn, playbackIndex]);

  // Spread alerts with identical coordinates so close points stay individually clickable.
  const visibleAlerts = useMemo(() => {
    const withCoords = playbackVisibleAlerts.filter(a => a.lat && a.lng);
    const groups = new Map();

    for (const alert of withCoords) {
      const key = `${Number(alert.lat).toFixed(3)},${Number(alert.lng).toFixed(3)}`;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(alert);
    }

    const spread = [];
    for (const group of groups.values()) {
      if (group.length === 1) {
        spread.push({ ...group[0], displayLat: group[0].lat, displayLng: group[0].lng });
        continue;
      }

      const ringRadius = 0.0045;
      group.forEach((alert, i) => {
        const angle = (2 * Math.PI * i) / group.length;
        spread.push({
          ...alert,
          displayLat: alert.lat + ringRadius * Math.sin(angle),
          displayLng: alert.lng + ringRadius * Math.cos(angle)
        });
      });
    }

    return spread;
  }, [playbackVisibleAlerts]);

  const heatCells = useMemo(() => {
    const cells = new Map();
    for (const alert of playbackVisibleAlerts) {
      if (!alert.lat || !alert.lng) continue;
      const key = `${Number(alert.lat).toFixed(2)},${Number(alert.lng).toFixed(2)}`;
      const severityWeight = alert.severity === "critical" ? 4 : alert.severity === "high" ? 3 : alert.severity === "medium" ? 2 : 1;
      const existing = cells.get(key) || { lat: alert.lat, lng: alert.lng, intensity: 0 };
      existing.intensity += severityWeight;
      cells.set(key, existing);
    }
    return Array.from(cells.values());
  }, [playbackVisibleAlerts]);

  const listAlerts = useMemo(() => {
    return [...playbackVisibleAlerts].sort((a, b) => {
      const ta = parseAlertTime(a)?.getTime() ?? 0;
      const tb = parseAlertTime(b)?.getTime() ?? 0;
      return tb - ta;
    });
  }, [playbackVisibleAlerts]);

  const MAP_CENTER    = [21.2, 83.4];

  return (
    <div className="p-6 md:p-10 space-y-8 pb-20">
      {/* HEADER */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            {t("farmer.tools.diseaseMap.title")}
          </h1>
          <p className="text-slate-500 font-medium italic">
            {t("farmer.tools.diseaseMap.subtitle")}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 bg-white text-xs font-black text-slate-700">
            <MapPin size={14} />
            <label htmlFor="region-select" className="uppercase tracking-wider">Region</label>
            <select
              id="region-select"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="bg-transparent text-xs font-black outline-none"
            >
              {REGION_OPTIONS.map((region) => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>
          {/* Live indicator */}
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black border ${live ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "bg-slate-50 border-slate-200 text-slate-500"}`}>
            {live ? <Wifi size={14} /> : <WifiOff size={14} />}
            {live ? "Live" : "Polling"}
            {lastUpdate && <span className="opacity-60"> · {lastUpdate.toLocaleTimeString()}</span>}
          </div>
          <div className="flex items-center gap-2 px-2 py-1.5 rounded-full border border-slate-200 bg-white text-xs font-black text-slate-700">
            {TIME_WINDOWS.map((w) => (
              <button
                key={w.value}
                onClick={() => setTimeWindowHours(w.value)}
                className={`px-2.5 py-1 rounded-full transition-colors ${timeWindowHours === w.value ? "bg-slate-900 text-white" : "hover:bg-slate-100"}`}
              >
                {w.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => setViewMode((m) => (m === "points" ? "heat" : "points"))}
            className="px-4 py-2 rounded-full border border-slate-200 bg-white text-xs font-black text-slate-700 flex items-center gap-2"
            title="Toggle heat layer"
          >
            <Flame size={14} /> {viewMode === "points" ? "Heat" : "Points"}
          </button>
          <button
            onClick={() => setPlaybackOn((p) => !p)}
            className="px-4 py-2 rounded-full border border-slate-200 bg-white text-xs font-black text-slate-700 flex items-center gap-2"
            title="Play timeline"
          >
            {playbackOn ? <Pause size={14} /> : <Play size={14} />} {playbackOn ? "Pause" : "Play"}
          </button>
          <button
            onClick={connectSSE}
            className="p-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all shadow-sm"
            title="Reconnect"
          >
            <RefreshCw size={16} />
          </button>
          <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-50 transition-all shadow-sm">
            <Filter size={18} /> {t("farmer.tools.diseaseMap.filters")}
          </button>
          <button className="px-5 py-2.5 bg-emerald-600 text-white rounded-2xl font-black flex items-center gap-2 shadow-lg shadow-emerald-200">
            <Layers size={18} /> {t("farmer.tools.diseaseMap.viewLayers")}
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEAFLET MAP */}
        <div className="lg:col-span-2 relative min-h-[520px] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
          <MapContainer
            center={MAP_CENTER}
            zoom={10}
            style={{ height: "100%", minHeight: 520, width: "100%" }}
            scrollWheelZoom={true}
            zoomControl={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {viewMode === "points" && visibleAlerts.length > 0 && <FitBounds alerts={visibleAlerts} />}
            {viewMode === "heat" && heatCells.length > 0 && <FitBounds alerts={heatCells} />}

            {viewMode === "heat" && heatCells.map((cell, idx) => (
              <Circle
                key={`heat-${idx}`}
                center={[cell.lat, cell.lng]}
                radius={Math.min(6000, 1200 + cell.intensity * 650)}
                pathOptions={{
                  color: "#f97316",
                  fillColor: "#ef4444",
                  fillOpacity: Math.min(0.5, 0.14 + cell.intensity * 0.05),
                  weight: 0
                }}
              />
            ))}

            {viewMode === "points" && visibleAlerts.map((alert) => (
              <CircleMarker
                key={String(alert._id)}
                center={[alert.displayLat ?? alert.lat, alert.displayLng ?? alert.lng]}
                radius={alert.status === "Outbreak" ? 18 : alert.status === "Clustered" ? 16 : 12}
                pathOptions={{
                  color:       alertColor(alert),
                  fillColor:   alertColor(alert),
                  fillOpacity: 0.65,
                  weight:      2
                }}
                eventHandlers={{ click: () => setSelected(alert) }}
              >
                <Popup>
                  <div className="text-sm font-bold">
                    <p className="text-base font-black">{alert.village}</p>
                    <p>{alert.disease}</p>
                    <p className="text-xs opacity-70 capitalize">{alert.status} · {alert.severity}</p>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>

          {/* Legend overlay */}
          <div className="absolute top-5 left-5 z-[1000] p-4 bg-white/90 backdrop-blur rounded-2xl border border-slate-200 shadow-xl space-y-2.5">
            {[
              { color: "bg-red-600",    label: t("farmer.tools.diseaseMap.liveOutbreaks") },
              { color: "bg-orange-500", label: "Clustered" },
              { color: "bg-amber-500",  label: t("farmer.tools.diseaseMap.reportedWarnings") },
              { color: "bg-lime-500",   label: "Moderate" },
              { color: "bg-red-500",    label: viewMode === "heat" ? "Heat = higher spread intensity" : "" },
            ].map(({ color, label }) => (
              !label ? null : (
                <div key={label} className="flex items-center gap-2.5">
                  <span className={`w-3 h-3 rounded-full ${color} ${color === "bg-red-600" ? "animate-pulse" : ""}`} />
                  <span className="text-[10px] font-black uppercase text-slate-600 tracking-wide">{label}</span>
                </div>
              )
            ))}
          </div>
        </div>

        {/* SIDEBAR ALERTS */}
        <div className="space-y-6">
          <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
            <ShieldAlert className="text-red-500" size={24} />
            {t("farmer.tools.diseaseMap.criticalAlerts")}
            <span className="ml-auto text-sm font-bold text-slate-400">{listAlerts.length}</span>
          </h2>

          <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1">
            <AnimatePresence>
              {listAlerts.map((alert, i) => (
                <motion.div
                  key={String(alert._id)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: i < 8 ? i * 0.06 : 0 }}
                  onClick={() => setSelected(alert)}
                  className={`bg-white p-5 rounded-3xl border cursor-pointer group transition-all
                    ${newIds.has(String(alert._id)) ? "border-emerald-400 shadow-emerald-100 shadow-md ring-1 ring-emerald-300" : "border-slate-200 shadow-sm hover:shadow-md"}
                    ${selected?._id === alert._id ? "ring-2 ring-emerald-500" : ""}`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-black text-slate-900">{alert.village}</h4>
                      <p className="text-xs font-bold text-slate-400">{alert.status}</p>
                    </div>
                    <span className={`px-3 py-1 ${severityBg(alert.severity)} text-white text-[10px] font-black rounded-lg uppercase tracking-widest`}>
                      {alert.disease}
                    </span>
                  </div>
                  {alert.lat && alert.lng && (
                    <p className="text-[9px] font-bold text-slate-400 mb-1">{alert.lat.toFixed(2)}°N {alert.lng.toFixed(2)}°E</p>
                  )}
                  {newIds.has(String(alert._id)) && (
                    <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">● New</span>
                  )}
                  <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity mt-1">
                    <span>{t("farmer.tools.diseaseMap.viewDetails")}</span>
                    <ArrowRight size={14} />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Selected alert detail */}
          {selected && (
            <motion.div
              key={String(selected._id)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 bg-slate-900 rounded-[2rem] text-white shadow-xl"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-black text-base">{selected.village}</h4>
                  <p className="text-xs opacity-60 capitalize">{selected.status} · {selected.severity}</p>
                </div>
                <button onClick={() => setSelected(null)} className="text-white/50 hover:text-white text-xs font-bold">✕</button>
              </div>
              <p className="text-sm font-bold text-amber-300 mb-1">{selected.disease}</p>
              {selected.lat && <p className="text-xs opacity-50">{selected.lat.toFixed(4)}°N, {selected.lng.toFixed(4)}°E</p>}
            </motion.div>
          )}

          <div className="p-6 bg-slate-900 rounded-[2rem] text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rotate-45 translate-x-12 -translate-y-12" />
            <div className="flex items-center gap-2 mb-4">
              <Info size={18} className="text-blue-400" />
              <h4 className="font-bold text-sm tracking-tight">{t("farmer.tools.diseaseMap.didYouKnow")}</h4>
            </div>
            <p className="text-xs font-medium opacity-80 leading-relaxed mb-4">
              Leaf blight can spread up to 5 km in just 48 hours depending on wind direction and humidity. Map markers update in real-time via SSE.
            </p>
            <button className="w-full py-2 bg-white/10 hover:bg-white/20 rounded-xl font-bold text-xs transition-colors">
              {t("farmer.tools.diseaseMap.setupAlerts")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiseaseMap;
