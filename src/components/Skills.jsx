import { useState, useEffect } from "react";
import { FadeIn } from "./ui/FadeIn.jsx";
import { SKILLS } from "../data/index.js";
import { shared } from "../styles/tokens.js";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isMobile;
}

const CATEGORY_COLORS = {
  "Frontend":             "#61dafb",
  "Backend":              "#3c873a",
  "DevOps":               "#ff9900",
  "Design":               "#e85d8a",
  "Frontend Development": "#61dafb",
  "Backend Development":  "#3c873a",
  "Databases":            "#cc2927",
  "Programming Languages":"#a259ff",
  "Data Science & ML":    "#ffb000",
};

export default function Skills() {
  const isMobile = useIsMobile();

  return (
    <section id="skills" style={{ ...shared.section, padding: isMobile ? "80px 16px" : "100px 32px" }}>
      <FadeIn>
        <p style={shared.sectionEyebrow}>My Expertise</p>
        <h2 style={shared.sectionTitle}>Skills & Technologies</h2>
      </FadeIn>

      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(280px, 1fr))",
        gap: 20,
        marginTop: 16,
        width: "100%",
        boxSizing: "border-box",
      }}>
        {Object.entries(SKILLS).map(([category, tools], idx) => {
          const color = CATEGORY_COLORS[category] || "#c8a96e";
          return (
            <FadeIn key={category} delay={idx * 0.1}>
              <div style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
                border: `1px solid ${color}33`,
                borderRadius: 16,
                padding: isMobile ? 14 : 20,
                backdropFilter: "blur(12px)",
                boxShadow: `0 8px 24px rgba(0,0,0,0.2), 0 0 0 1px ${color}11`,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                width: "100%",
                boxSizing: "border-box",
                overflow: "hidden",
              }}>
                {/* Header */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: color, boxShadow: `0 0 8px ${color}`, flexShrink: 0 }} />
                  <h3 style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700, color, fontFamily: "'Montserrat', sans-serif", margin: 0 }}>
                    {category}
                  </h3>
                </div>

                {/* Skills grid */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "repeat(3, 1fr)" : "repeat(2, 1fr)",
                  gap: 8,
                  width: "100%",
                }}>
                  {tools.map((skill) => (
                    <div
                      key={skill.name}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "8px 10px",
                        borderRadius: 10,
                        background: "rgba(255,255,255,0.03)",
                        border: `1px solid ${skill.color}28`,
                        transition: "transform 0.25s ease, box-shadow 0.25s ease",
                        cursor: "default",
                        minWidth: 0,
                        overflow: "hidden",
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.transform = "scale(1.04)";
                        e.currentTarget.style.boxShadow = `0 0 14px ${skill.color}44`;
                        e.currentTarget.style.borderColor = skill.color + "66";
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.boxShadow = "none";
                        e.currentTarget.style.borderColor = skill.color + "28";
                      }}
                    >
                      <img src={skill.icon} alt={skill.name} style={{ width: 18, height: 18, flexShrink: 0 }} />
                      <span style={{
                        fontSize: 11, color: "#d6d6d6", fontWeight: 500,
                        fontFamily: "'Montserrat', sans-serif",
                        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                        minWidth: 0,
                      }}>
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}
