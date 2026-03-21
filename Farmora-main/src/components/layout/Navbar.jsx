import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Leaf } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../ui/LanguageSwitcher";
import "../../styles/navbar.css"; // Ensure component styles are loaded

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <Link to="/" className="logo">
          <div className="logo-icon-wrap">
            <Leaf size={24} fill="currentColor" />
          </div>
          <span className="logo-text">Farmora</span>
        </Link>

        {/* Desktop Nav */}
        <ul className="nav-links">
          <li><Link to="/farmers">{t("navbar.farmers")}</Link></li>
          <li><Link to="/officers">{t("navbar.officers")}</Link></li>
          <li><Link to="/marketplace">{t("navbar.marketplace")}</Link></li>
          <li><Link to="/about">{t("navbar.about")}</Link></li>
        </ul>

        <div className="nav-actions">
          <LanguageSwitcher />

          {user ? (
            <div className="flex items-center gap-4">
              <Link 
                to={user.role === 'farmer' ? "/dashboard/farmer" : "/dashboard/officer"} 
                className="px-6 py-2 bg-emerald-600 text-white rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-emerald-200"
              >
                Dashboard
              </Link>
              <button 
                onClick={() => {
                  localStorage.removeItem("user");
                  window.location.reload();
                }}
                className="text-xs font-bold text-slate-500 hover:text-rose-500 transition-colors"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link to="/auth" className="btn-signin">
              {t("auth.signIn")}
            </Link>
          )}

          {/* Mobile Toggle */}
          <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${isOpen ? "open" : ""}`}>
        <ul className="mobile-nav-links">
          <li>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem' }}>
              <LanguageSwitcher />
            </div>
          </li>
          <li onClick={() => setIsOpen(false)}><Link to="/farmers">{t("navbar.farmers")}</Link></li>
          <li onClick={() => setIsOpen(false)}><Link to="/officers">{t("navbar.officers")}</Link></li>
          <li onClick={() => setIsOpen(false)}><Link to="/marketplace">{t("navbar.marketplace")}</Link></li>
          <li onClick={() => setIsOpen(false)}><Link to="/about">{t("navbar.about")}</Link></li>
          <li onClick={() => setIsOpen(false)}>
            <Link to="/auth" className="mobile-btn-signin">{t("auth.signIn")}</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;