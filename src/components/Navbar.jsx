import { useState, useEffect } from "react";
import { NAV_LINKS } from "../data/index.js";

export default function Navbar({ active, onNav }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (link) => {
    onNav(link);
    setMenuOpen(false);
  };

  return (
    <nav style={{ ...s.nav, ...(scrolled ? s.navScrolled : {}) }}>
      <div style={s.navInner}>
        {/* Logo */}
        <span style={s.logo} onClick={() => handleNav("About")}>
          <span style={s.logoAccent}>{"<"}</span>Nadeera<span style={s.logoAccent}>{"/>"}</span>
        </span>

        {/* Desktop links */}
        {/* Desktop links — hidden on mobile via className + injected CSS */}
        <div className="nav-desktop-links" style={s.navLinks}>
          {NAV_LINKS.map(l => (
            <button
              key={l}
              style={{ ...s.navBtn, ...(active === l ? s.navBtnActive : {}) }}
              onClick={() => handleNav(l)}
            >
              {l}
            </button>
          ))}
        </div>

        {/* Hamburger — always visible on mobile via CSS class */}
        <button
          className="hamburger-btn"
          style={s.hamburger}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span style={{
            ...s.hLine,
            transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
          }} />
          <span style={{ ...s.hLine, opacity: menuOpen ? 0 : 1, transform: "none" }} />
          <span style={{
            ...s.hLine,
            transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none",
          }} />
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div style={s.mobileMenu}>
          {NAV_LINKS.map(l => (
            <button
              key={l}
              style={{ ...s.mobileNavBtn, ...(active === l ? s.mobileNavBtnActive : {}) }}
              onClick={() => handleNav(l)}
            >
              <span style={{ ...s.mobileNavDot, opacity: active === l ? 1 : 0 }} />
              {l}
            </button>
          ))}
        </div>
      )}

      {/* Responsive styles */}
      <style>{`
        .nav-desktop-links { display: flex; }
        .hamburger-btn     { display: none; }
        @media (max-width: 768px) {
          .nav-desktop-links { display: none !important; }
          .hamburger-btn     { display: flex !important; flex-direction: column; gap: 5px; }
        }
      `}</style>
    </nav>
  );
}

const s = {
  nav: {
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
    transition: "background 0.4s, border-color 0.4s",
    borderBottom: "1px solid transparent",
  },
  navScrolled: {
    background: "rgba(12,12,14,0.95)",
    backdropFilter: "blur(20px)",
    borderBottom: "1px solid #ffffff0d",
  },
  navInner: {
    maxWidth: 1200, margin: "0 auto", padding: "0 24px",
    height: 64, display: "flex", alignItems: "center", justifyContent: "space-between",
  },
  logo: {
    fontSize: 20, fontWeight: 800, letterSpacing: "0.05em",
    cursor: "pointer", color: "#e8e0d0", fontFamily: "'Montserrat', sans-serif",
    userSelect: "none",
  },
  logoAccent: { color: "#c8a96e" },
  navLinks: {
    display: "flex", gap: 2,
    // hidden on mobile via injected CSS class below
  },
  navBtn: {
    background: "none", border: "none", color: "#9d9385",
    fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase",
    padding: "8px 12px", cursor: "pointer", transition: "color 0.2s",
    fontFamily: "'Montserrat', sans-serif", fontWeight: 600,
  },
  navBtnActive: { color: "#c8a96e" },
  hamburger: {
    flexDirection: "column", gap: 5,
    background: "none", border: "none", cursor: "pointer", padding: 8,
    display: "none", // overridden by injected media query
  },
  hLine: {
    width: 24, height: 2, background: "#e8e0d0", borderRadius: 2,
    display: "block", transition: "transform 0.3s ease, opacity 0.3s ease",
  },
  mobileMenu: {
    display: "flex", flexDirection: "column",
    background: "rgba(10,10,12,0.98)",
    backdropFilter: "blur(20px)",
    borderTop: "1px solid #c8a96e22",
    padding: "8px 0 16px",
  },
  mobileNavBtn: {
    background: "none", border: "none", color: "#9d9385",
    padding: "14px 28px", textAlign: "left", fontSize: 13,
    cursor: "pointer", fontFamily: "'Montserrat', sans-serif",
    fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase",
    display: "flex", alignItems: "center", gap: 12,
    transition: "color 0.2s",
  },
  mobileNavBtnActive: { color: "#c8a96e" },
  mobileNavDot: {
    width: 5, height: 5, borderRadius: "50%",
    background: "#c8a96e", flexShrink: 0,
    boxShadow: "0 0 6px #c8a96e",
  },
};
