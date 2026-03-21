import { useTranslation } from "react-i18next";
import {
  AreaChart,
  Area,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";
import { 
  Sprout, 
  TrendingUp, 
  Satellite, 
  Banknote, 
  CloudRain,
  Zap
} from "lucide-react";
import "../../styles/platform-section.css";

const yieldData = [
  { month: "May", yield: 20 },
  { month: "Jun", yield: 45 },
  { month: "Jul", yield: 35 },
  { month: "Aug", yield: 60 },
  { month: "Sep", yield: 85 },
  { month: "Oct", yield: 75 },
];

const soilData = [
  { subject: "Nitrogen", A: 120, fullMark: 150 },
  { subject: "Phosphorus", A: 98, fullMark: 150 },
  { subject: "Potassium", A: 86, fullMark: 150 },
  { subject: "pH Level", A: 99, fullMark: 150 },
  { subject: "Moisture", A: 85, fullMark: 150 },
];

function PlatformSection() {
  const { t } = useTranslation();

  return (
    <section className="platform-section">
      <div className="platform-container">
        
        {/* LEFT: Dashboard Mockup */}
        <div className="platform-visual">
          
          <div className="floating-analytics float-top">
            <span className="float-label">{t("platform.riskScore")}</span>
            <span className="float-value">0.12</span>
            <span className="float-trend">{t("platform.lowRisk")}</span>
          </div>

          <div className="floating-analytics float-bottom">
            <span className="float-label">{t("platform.optimalProfit")}</span>
            <span className="float-value">₹24,500</span>
            <span className="float-trend">{t("platform.profitTrend")}</span>
          </div>

          <div className="platform-mockup-wrap">
            <div className="dashboard-mockup">
              
              <div className="mockup-header">
                <div className="mockup-title-wrap">
                  <h4>{t("platform.intelligenceHub")}</h4>
                  <h3>{t("platform.farmOverview")}</h3>
                </div>
                <div className="mockup-status">
                  {t("platform.liveSync")}
                </div>
              </div>

              <div className="mockup-grid">
                
                {/* Yield Chart */}
                <div className="mockup-card">
                  <h5>{t("platform.yieldGrowth")}</h5>
                  <div style={{ width: "100%", height: 120 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={yieldData}>
                        <defs>
                          <linearGradient id="colorYield" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <Area 
                          type="monotone" 
                          dataKey="yield" 
                          stroke="#10b981" 
                          fillOpacity={1} 
                          fill="url(#colorYield)" 
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Radar Chart */}
                <div className="mockup-card">
                  <h5>{t("platform.soilHealth")}</h5>
                  <div style={{ width: "100%", height: 120 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={soilData}>
                        <PolarGrid stroke="#e2e8f0" />
                        <PolarAngleAxis dataKey="subject" tick={{ fontSize: 8 }} />
                        <Radar
                          name="Soil"
                          dataKey="A"
                          stroke="#10b981"
                          fill="#10b981"
                          fillOpacity={0.2}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

              </div>

              <div className="mockup-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
                <div className="mockup-card">
                  <h5>{t("platform.forecast")}</h5>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <CloudRain size={20} color="#059669" />
                    <div>
                      <div style={{ fontSize: "1rem", fontWeight: 800 }}>28°C</div>
                      <div style={{ fontSize: "0.6rem", color: "#64748b" }}>{t("platform.rainChance")}</div>
                    </div>
                  </div>
                </div>
                <div className="mockup-card">
                  <h5>{t("platform.aiRecommendation")}</h5>
                  <div style={{ fontSize: "0.75rem", lineHeight: 1.4, color: "#334155" }}>
                    <strong>{t("platform.plantingWindow")}</strong> {t("platform.plantingWindowDesc")}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* RIGHT: Content */}
        <div className="platform-content">
          <div className="platform-text-header">
            <h2>{t("platform.title")}</h2>
            <p>{t("platform.subtitle")}</p>
          </div>

          <div className="feature-bullets">
            
            <div className="feature-bullet">
              <div className="icon-badge">
                <Sprout />
              </div>
              <div className="bullet-text">
                <h4>{t("platform.features.cropPlanning.title")}</h4>
                <p>{t("platform.features.cropPlanning.desc")}</p>
              </div>
            </div>

            <div className="feature-bullet">
              <div className="icon-badge">
                <TrendingUp />
              </div>
              <div className="bullet-text">
                <h4>{t("platform.features.yieldPrediction.title")}</h4>
                <p>{t("platform.features.yieldPrediction.desc")}</p>
              </div>
            </div>

            <div className="feature-bullet">
              <div className="icon-badge">
                <Satellite />
              </div>
              <div className="bullet-text">
                <h4>{t("platform.features.weatherRisk.title")}</h4>
                <p>{t("platform.features.weatherRisk.desc")}</p>
              </div>
            </div>

            <div className="feature-bullet">
              <div className="icon-badge">
                <Banknote />
              </div>
              <div className="bullet-text">
                <h4>{t("platform.features.profit.title")}</h4>
                <p>{t("platform.features.profit.desc")}</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default PlatformSection;