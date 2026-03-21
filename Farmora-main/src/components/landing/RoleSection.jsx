import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../../styles/role-selection.css";

function RoleSection() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const portals = [
    {
      role: "farmer",
      titleKey: "roles.farmer.title",
      descKey: "roles.farmer.desc",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
      ctaKey: "roles.farmer.cta",
      class: "card-farmer"
    },
    {
      role: "officer",
      titleKey: "roles.officer.title",
      descKey: "roles.officer.desc",
      image: "https://images.unsplash.com/photo-1581091215367-9b6c00b3035a",
      ctaKey: "roles.officer.cta",
      class: "card-officer"
    },
    {
      role: "consumer",
      titleKey: "roles.consumer.title",
      descKey: "roles.consumer.desc",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e",
      ctaKey: "roles.consumer.cta",
      class: "card-consumer"
    }
  ];

  const handleSelectRole = (role) => {
    localStorage.setItem("selectedRole", role);
    navigate("/signup");
  };

  return (
    <section className="roles-section">
      <div className="roles-inner">
        {/* Header */}
        <div className="roles-header">
          <div className="roles-eyebrow">{t("roles.eyebrow")}</div>
          <h2 className="roles-title">
            {t("roles.title", { portal: "" })} <span>{t("roles.titlePortal")}</span>
          </h2>
          <p className="roles-subtitle">{t("roles.subtitle")}</p>
        </div>

        {/* Portal Cards */}
        <div className="roles-grid">
          {portals.map((portal) => (
            <div 
              key={portal.role} 
              className={`role-portal-card ${portal.class}`}
              onClick={() => handleSelectRole(portal.role)}
            >
              <div className="portal-image-container">
                <img 
                  src={portal.image} 
                  alt={t(portal.titleKey)} 
                  className="portal-image" 
                />
              </div>
              
              <div className="portal-content">
                <h3 className="portal-title">{t(portal.titleKey)}</h3>
                <p className="portal-desc">{t(portal.descKey)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default RoleSection;