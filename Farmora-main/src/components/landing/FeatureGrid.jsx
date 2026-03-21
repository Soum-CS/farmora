import { useTranslation } from "react-i18next";
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { 
  Sprout, 
  Banknote, 
  FlaskConical, 
  CloudRain, 
  AlertTriangle, 
  LayoutDashboard,
  TrendingUp
} from 'lucide-react';
import yieldPredictionImg from "../../assets/images/yield_prediction.png";
import profitForecastingImg from "../../assets/images/profit_forecasting.png";
import riskScoringImg from "../../assets/images/risk_scoring.png";
import decisionDashboardImg from "../../assets/images/decision_dashboard.png";
import "../../styles/feature-grid.css";

const miniData = [
  { val: 400 }, { val: 600 }, { val: 500 }, { val: 700 }, { val: 800 }, { val: 650 }
];

function FeatureGrid() {
  const { t } = useTranslation();

  const smallFeatures = [
    {
      titleKey: "features.cards.yieldPrediction.title",
      icon: Sprout,
      color: "#059669",
      image: yieldPredictionImg,
      descKey: "features.cards.yieldPrediction.desc"
    },
    {
      titleKey: "features.cards.profitForecasting.title",
      icon: Banknote,
      color: "#EAB308",
      image: profitForecastingImg,
      descKey: "features.cards.profitForecasting.desc"
    },
    {
      titleKey: "features.cards.soilOptimization.title",
      icon: FlaskConical,
      color: "#1E3A8A",
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399",
      descKey: "features.cards.soilOptimization.desc"
    },
    {
      titleKey: "features.cards.weatherIntelligence.title",
      icon: CloudRain,
      color: "#C2410C",
      image: "https://images.unsplash.com/photo-1475113548554-5a36f1f523d6",
      descKey: "features.cards.weatherIntelligence.desc"
    },
    {
      titleKey: "features.cards.riskScoring.title",
      icon: AlertTriangle,
      color: "#EF4444",
      image: riskScoringImg,
      descKey: "features.cards.riskScoring.desc"
    },
    {
      titleKey: "features.cards.decisionDashboard.title",
      icon: LayoutDashboard,
      color: "#8b5cf6",
      image: decisionDashboardImg,
      descKey: "features.cards.decisionDashboard.desc"
    }
  ];

  return (
    <section className="feature-grid-section">
      <div className="feature-grid-container">
        
        <div className="feature-grid-header">
          <div className="roles-eyebrow">{t("features.eyebrow")}</div>
          <h2>{t("features.title")}</h2>
          <p>{t("features.subtitle")}</p>
        </div>

        <div className="feature-layout">
          
          {/* Spotlight Card */}
          <div className="feature-spotlight">
            <div className="neu-card spotlight-card-enhanced">
              <div className="spotlight-image-bg">
                <img 
                  src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449" 
                  alt="Farmer using technology" 
                  className="spotlight-photo"
                />
                <div className="image-overlay-gradient"></div>
              </div>

              <div className="spotlight-content-layer">
                <div className="spotlight-header">
                  <span className="spotlight-badge">{t("features.spotlight.badge")}</span>
                  <h3>{t("features.spotlight.title")}</h3>
                  <p>{t("features.spotlight.desc")}</p>
                </div>

                <div className="glass-data-grid">
                  <div className="glass-stat-pills">
                    <div className="glass-pill">
                      <span className="pill-label">{t("features.spotlight.yieldOutlook")}</span>
                      <span className="pill-value">4.8 T/ah</span>
                    </div>
                    <div className="glass-pill">
                      <span className="pill-label">{t("features.spotlight.soilHealth")}</span>
                      <span className="pill-value">{t("features.spotlight.soilStatus")}</span>
                    </div>
                    <div className="glass-pill">
                      <span className="pill-label">{t("features.spotlight.marketValue")}</span>
                      <span className="pill-value">₹1.2L</span>
                    </div>
                  </div>

                  <div className="glass-chart-card">
                    <div className="chart-header">
                      <TrendingUp size={16} />
                      <span>{t("features.spotlight.yieldChart")}</span>
                    </div>
                    <div style={{ height: 60, marginTop: 10 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={miniData}>
                          <Area type="monotone" dataKey="val" stroke="#10b981" fill="#10b981" fillOpacity={0.2} strokeWidth={2} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="feature-stack">
            {smallFeatures.map((f, i) => (
              <div key={i} className="neu-card small-feature-card-enhanced">
                <div className="feature-card-image">
                  <img src={f.image} alt={t(f.titleKey)} className="feature-thumb" />
                  <div className="feature-icon-floating" style={{ color: f.color }}>
                    <f.icon size={18} />
                  </div>
                </div>
                
                <div className="feature-card-content">
                  <h3>{t(f.titleKey)}</h3>
                  <div className="hover-text-wrapper">
                    <div className="hover-text">
                      {t(f.descKey)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

export default FeatureGrid;