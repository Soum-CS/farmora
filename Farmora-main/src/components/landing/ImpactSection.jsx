import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { 
  TrendingUp, 
  Recycle, 
  Target, 
  Banknote,
  Zap
} from "lucide-react";
import "../../styles/impact.css";

function Counter({ end, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime = null;
    const endValue = typeof end === 'string' ? parseFloat(end.replace(/[^0-9.]/g, '')) : end;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const currentCount = Math.floor(progress * endValue);
      
      setCount(currentCount);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [hasStarted, end, duration]);

  return (
    <span ref={elementRef} className="impact-number">
      {String(end).startsWith('+') ? '+' : ''}
      {count}
      {suffix}
    </span>
  );
}

function ImpactSection() {
  const { t } = useTranslation();

  const stats = [
    {
      labelKey: "impact.stats.yieldIncrease.label",
      value: "30",
      suffix: "%",
      prefix: "+",
      icon: TrendingUp,
      descKey: "impact.stats.yieldIncrease.desc",
    },
    {
      labelKey: "impact.stats.fertilizerWaste.label",
      value: "25",
      suffix: "%",
      prefix: "-",
      icon: Recycle,
      descKey: "impact.stats.fertilizerWaste.desc",
    },
    {
      labelKey: "impact.stats.planningAccuracy.label",
      value: "40",
      suffix: "%",
      prefix: "+",
      icon: Target,
      descKey: "impact.stats.planningAccuracy.desc",
    },
    {
      labelKey: "impact.stats.farmerProfit.label",
      value: "20",
      suffix: "%",
      prefix: "+",
      icon: Banknote,
      descKey: "impact.stats.farmerProfit.desc",
    },
  ];

  return (
    <section className="impact-section">
      {/* Background Particles */}
      <div className="impact-particles">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              top: `${(i * 13) % 100}%`,
              left: `${(i * 17) % 100}%`,
              width: '4px',
              height: '4px',
              animationDelay: `${i * 0.3}s`
            }}
          />
        ))}
      </div>

      <div className="impact-container">
        <div className="impact-header">
          <h2>{t("impact.title")}</h2>
          <p>{t("impact.subtitle")}</p>
        </div>

        <div className="impact-grid">
          {stats.map((stat, idx) => (
            <div key={idx} className="impact-card">
              <div className="icon-badge" style={{ marginBottom: '1.5rem', background: 'rgba(255,255,255,0.1)', color: '#10b981' }}>
                <stat.icon />
              </div>
              <Counter end={stat.value} suffix={stat.suffix} />
              <h3>{t(stat.labelKey)}</h3>
              <p>{t(stat.descKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ImpactSection;