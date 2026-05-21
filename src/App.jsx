import { useState, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";

// Side-effect: injects fonts + global CSS (runs once on import)
import "./styles/tokens.js";

import Navbar    from "./components/Navbar.jsx";
import Hero      from "./components/Hero.jsx";
import Skills    from "./components/Skills.jsx";
import Projects  from "./components/Projects.jsx";
import Experience from "./components/Experience.jsx";
import Education  from "./components/Education.jsx";
import Contact   from "./components/Contact.jsx";
import Order     from "./components/Order.jsx";
import Footer    from "./components/Footer.jsx";
import { Divider } from "./components/ui/FadeIn.jsx";

const NAV_LINKS = ["About", "Skills", "Projects", "Experience", "Education", "Order", "Contact"];

export default function App() {
  const [activeSection, setActiveSection] = useState("About");
  const [cursor, setCursor]               = useState({ x: -100, y: -100 });
  const [hovered, setHovered]             = useState(false);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sections = NAV_LINKS.map(n => document.getElementById(n.toLowerCase()));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const id = e.target.id;
            setActiveSection(id.charAt(0).toUpperCase() + id.slice(1));
          }
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach(s => s && obs.observe(s));
    return () => obs.disconnect();
  }, []);

  // Custom cursor
  useEffect(() => {
    const onMove = (e) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      style={s.root}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Custom cursor dot */}
      <div style={{ ...s.cursor, left: cursor.x, top: cursor.y, opacity: hovered ? 1 : 0 }} />

      {/* Noise texture */}
      <div style={s.noise} />

      {/* Ambient background orbs */}
      <div style={s.orb1} />
      <div style={s.orb2} />

      {/* Navigation */}
      <Navbar active={activeSection} onNav={scrollTo} />

      {/* Sections */}
      <Hero onNav={scrollTo} />
      <Divider />
      <Skills />
      <Divider />
      <Projects />
      <Divider />
      <Experience />
      <Divider />
      <Education />
      <Divider />
      <Order />
      <Divider />
      <Contact />

      {/* Footer */}
      <Footer />

      {/* Vercel Web Analytics */}
      <Analytics />
    </div>
  );
}

const s = {
  root: {
    background: "#0c0c0e",
    backgroundImage: `
      radial-gradient(ellipse 80% 60% at 80% -10%, #c8a96e12 0%, transparent 60%),
      radial-gradient(ellipse 60% 50% at -10% 60%, #7ab8d40a 0%, transparent 60%),
      radial-gradient(ellipse 50% 40% at 50% 110%, #9b7eb80a 0%, transparent 60%)
    `,
    backgroundAttachment: "fixed",
    color: "#e8e0d0",
    fontFamily: "'Cormorant Garamond', 'Georgia', serif",
    minHeight: "100vh",
    position: "relative",
    overflowX: "hidden",
    cursor: "none",
  },
  cursor: {
    position: "fixed", width: 10, height: 10, borderRadius: "50%",
    background: "#c8a96e", pointerEvents: "none", zIndex: 9999,
    transform: "translate(-50%,-50%)", mixBlendMode: "difference",
    transition: "opacity 0.3s",
  },
  noise: {
    position: "fixed", inset: 0,
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
    pointerEvents: "none", zIndex: 1, opacity: 0.35,
  },
  orb1: {
    position: "fixed", top: "-20%", right: "-10%", width: 700, height: 700,
    borderRadius: "50%",
    background: "radial-gradient(circle, #c8a96e14 0%, #9b7eb808 40%, transparent 70%)",
    pointerEvents: "none", zIndex: 0,
    animation: "floatOrb 12s ease-in-out infinite",
  },
  orb2: {
    position: "fixed", bottom: "5%", left: "-15%", width: 600, height: 600,
    borderRadius: "50%",
    background: "radial-gradient(circle, #7ab8d410 0%, #7a8fa308 40%, transparent 70%)",
    pointerEvents: "none", zIndex: 0,
    animation: "floatOrb 16s ease-in-out infinite reverse",
  },
};
