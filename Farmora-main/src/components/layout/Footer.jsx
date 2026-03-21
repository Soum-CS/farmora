import "../../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Top Grid */}
        <div className="footer-grid">
          
          {/* Brand & Newsletter Column */}
          <div className="footer-brand">
            <h3><span>🌾</span> Farmora</h3>
            <p>
              Pioneering the future of precision agriculture in India through AI-driven 
              forensic data and expert validation.
            </p>
            
            <div className="footer-newsletter">
              <h4>Stay Updated</h4>
              <div className="newsletter-wrap">
                <input 
                  type="email" 
                  placeholder="name@company.com" 
                  className="footer-input"
                />
                <button className="footer-btn">Subscribe</button>
              </div>
            </div>
          </div>

          {/* Product Column */}
          <div className="footer-col">
            <h4>Product</h4>
            <ul className="footer-links">
              <li><a href="#yield">Yield Prediction</a></li>
              <li><a href="#soil">Soil Analysis</a></li>
              <li><a href="#weather">Weather Intelligence</a></li>
              <li><a href="#marketplace">Marketplace</a></li>
            </ul>
          </div>

          {/* Solutions Column */}
          <div className="footer-col">
            <h4>Solutions</h4>
            <ul className="footer-links">
              <li><a href="#farmers">Farmers</a></li>
              <li><a href="#officers">Agri Officers</a></li>
              <li><a href="#supply">Supply Chain</a></li>
              <li><a href="#institutions">Institutions</a></li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className="footer-col">
            <h4>Resources</h4>
            <ul className="footer-links">
              <li><a href="#docs">Documentation</a></li>
              <li><a href="#research">Research</a></li>
              <li><a href="#api">API</a></li>
              <li><a href="#blog">Blog</a></li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="footer-col">
            <h4>Company</h4>
            <ul className="footer-links">
              <li><a href="#about">About</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#partners">Partners</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            © {new Date().getFullYear()} Farmora AgriTech. All rights reserved.
          </div>
          
          <div className="footer-socials">
            <a href="https://twitter.com" className="social-icon" target="_blank" rel="noreferrer">𝕏</a>
            <a href="https://linkedin.com" className="social-icon" target="_blank" rel="noreferrer">In</a>
            <a href="https://instagram.com" className="social-icon" target="_blank" rel="noreferrer">Ig</a>
          </div>
        </div>

        {/* Decorative BG Icon */}
        <div className="footer-decor">🚜</div>

      </div>
    </footer>
  );
}

export default Footer;
