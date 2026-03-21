import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/index.css";
import "./i18n";

/* GLOBAL DESIGN SYSTEM */
import "./styles/global.css";

/* LANDING PAGE */
import "./styles/navbar.css";
import "./styles/hero.css";
import "./styles/features.css";
import "./styles/cta.css";
import "./styles/footer.css";
import "./styles/landing.css";

/* DASHBOARD */
import "./styles/dashboard.css";

/* MARKETPLACE */
import "./styles/marketplace.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);