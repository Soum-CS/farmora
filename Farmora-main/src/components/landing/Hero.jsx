import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { 
  FlaskConical, 
  CloudRain, 
  Banknote, 
  Activity, 
  AlertTriangle, 
  MapPin, 
  Wheat, 
  Droplets,
  Bot,
  Zap,
  ArrowRight,
  PlayCircle,
  Users,
  Award,
  Library
} from "lucide-react";
import "../../styles/hero.css";

const yieldData = [
  { month: "Jan", yield: 2.1, projected: 2.2 },
  { month: "Feb", yield: 2.5, projected: 2.6 },
  { month: "Mar", yield: 2.9, projected: 3.1 },
  { month: "Apr", yield: 3.4, projected: 3.5 },
  { month: "May", yield: 4.0, projected: 4.2 },
  { month: "Jun", yield: 4.6, projected: 4.8 },
  { month: "Jul", yield: 5.2, projected: 5.5 },
  { month: "Aug", yield: 5.8, projected: 6.1 },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-tooltip">
        <div className="tooltip-val">{payload[0].value} t/ha</div>
        <div className="tooltip-label">Yield Index</div>
      </div>
    );
  }
  return null;
};

function Hero() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <section className="hero-section">
      
      {/* Background Image and Overlay */}
      <div className="hero-bg-container">
        <img 
          src="/src/assets/images/hero-bg.png" 
          alt="Modern Farm" 
          className="hero-bg-image"
        />
        <div className="hero-bg-overlay" />
      </div>

      <div className="hero-inner">
        {/* ── LEFT: Copy ── */}
        <div className="hero-copy">

          {/* Badge */}
          <div className="hero-badge-pill">
            <span className="hero-badge-dot" />
            {t("hero.badge")}
          </div>

          {/* Headline */}
          <h1 className="hero-headline">
            {t("hero.title")}
          </h1>

          {/* Subtext */}
          <p className="hero-subtext">
            {t("hero.subtitle")}
          </p>

          {/* CTA Buttons */}
          <div className="hero-ctas">
            <button
              onClick={() => navigate("/auth")}
              className="hero-btn-primary group"
            >
              {t("hero.cta")}
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="hero-btn-secondary">
              <PlayCircle size={20} />
              {t("hero.watchVideo")}
            </button>
          </div>

          {/* Trust line */}
          <div className="hero-trust-badges">
            <div className="trust-badge">
              <div className="trust-icon">
                <Users size={16} />
              </div>
              <span>{t("hero.trust.farmers")}</span>
            </div>
            <div className="trust-badge">
              <div className="trust-icon">
                <Award size={16} />
              </div>
              <span>{t("hero.trust.experts")}</span>
            </div>
            <div className="trust-badge">
              <div className="trust-icon">
                <Library size={16} />
              </div>
              <span>{t("hero.trust.institutions")}</span>
            </div>
          </div>

        </div>

        {/* ── RIGHT: Journal Card ── */}
        <div className="hero-dashboard-wrap">
          <div className="journal-card-container">
            <div className="journal-card">
              <div className="journal-header">
                <div className="journal-title-group">
                  <span className="journal-label">{t("hero.card.label")}</span>
                  <h3 className="journal-title">{t("hero.card.title")}</h3>
                </div>
                <div className="journal-date">{t("hero.card.date")}</div>
              </div>

              <div className="journal-divider" />

              <div className="journal-content">
                <div className="journal-stat-grid">
                  <div className="journal-stat">
                    <span className="stat-label">{t("hero.card.yieldLabel")}</span>
                    <span className="stat-value">4.6 <small>t/ha</small></span>
                    <span className="stat-trend">{t("hero.card.trend")}</span>
                  </div>
                  <div className="journal-stat">
                    <span className="stat-label">{t("hero.card.moistureLabel")}</span>
                    <span className="stat-value">62 <small>%</small></span>
                    <span className="stat-condition">{t("hero.card.moistureStatus")}</span>
                  </div>
                </div>

                <div className="journal-chart-wrap">
                  <div className="chart-header">
                    <span>{t("hero.card.chartLabel")}</span>
                  </div>
                  <div className="hero-recharts-wrap">
                    <ResponsiveContainer width="100%" height={100}>
                      <LineChart data={yieldData}>
                        <Line
                          type="monotone"
                          dataKey="yield"
                          stroke="#166534"
                          strokeWidth={2}
                          dot={{ r: 3, fill: '#166534' }}
                          animationDuration={2000}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="journal-footer">
                  <div className="journal-insight">
                    <Wheat size={14} />
                    <span>{t("hero.card.insight")}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Subtle organic accents instead of floating icons */}
            <div className="organic-accent clay-blob" />
            <div className="organic-accent leaf-shadow" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;