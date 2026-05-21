import { useState } from "react";
import { FadeIn } from "./ui/FadeIn.jsx";
import { EDUCATION } from "../data/index.js";
import { shared } from "../styles/tokens.js";

const TABS = ["Academic", "Certifications"];

export default function Education() {
  const [activeTab, setActiveTab] = useState("Academic");

  const filtered = EDUCATION.filter(e =>
    activeTab === "Academic"
      ? ["Degree", "Course", "School"].includes(e.type)
      : e.type === "Certification"
  );

  const count = (tab) =>
    tab === "Academic"
      ? EDUCATION.filter(e => ["Degree", "Course", "School"].includes(e.type)).length
      : EDUCATION.filter(e => e.type === "Certification").length;

  return (
    <section id="education" style={shared.section}>
      <FadeIn>
        <p style={shared.sectionEyebrow}>Academic & Certifications</p>
        <h2 style={shared.sectionTitle}>Education</h2>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div style={s.tabRow}>
          {TABS.map(tab => (
            <button
              key={tab}
              style={{ ...s.tabBtn, ...(activeTab === tab ? s.tabBtnActive : {}) }}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "Academic" ? "🎓 " : "🏅 "}{tab}
              <span style={{ ...s.tabCount, ...(activeTab === tab ? s.tabCountActive : {}) }}>
                {count(tab)}
              </span>
            </button>
          ))}
        </div>
      </FadeIn>

      <div style={shared.timeline}>
        {filtered.map((e, i) => (
          <FadeIn key={e.degree} delay={i * 0.12}>
            <div style={shared.timelineItem}>
              <div style={{ ...shared.timelineDot, background: "#7ab8d4", boxShadow: "0 0 12px #7ab8d455" }} />
              <div className="timeline-card" style={{ ...shared.timelineContent, borderLeft: "2px solid #7ab8d422" }}>
                <div style={shared.timelineBadgeRow}>
                  <span style={{ ...shared.badge, ...shared.badgeEdu }}>{e.type}</span>
                  <span style={shared.timelinePeriod}>{e.period}</span>
                </div>
                <h3 style={s.degree}>{e.degree}</h3>
                <p style={s.school}>{e.school}</p>
                <p style={{ ...shared.timelineDesc, marginTop: 8 }}>{e.detail}</p>
                {/* ✅ Show Credentials Button */}
                {e.type === "Certification" && e.credentialUrl && (
  <a
    href={e.credentialUrl}
    target="_blank"
    rel="noopener noreferrer"
    style={s.credentialBtn}
    onMouseEnter={e => {
      e.currentTarget.style.borderColor = "#7ab8d488";
      e.currentTarget.style.boxShadow = "0 0 16px #7ab8d422";
      e.currentTarget.style.color = "#7ab8d4";
    }}
    onMouseLeave={e => {
      e.currentTarget.style.borderColor = "#ffffff14";
      e.currentTarget.style.boxShadow = "none";
      e.currentTarget.style.color = "#9d9385";
    }}
  >
    🔗 Show Credentials
  </a>
                )}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

const s = {
  tabRow: { display: "flex", gap: 12, marginBottom: 40 },
  tabBtn: {
    display: "flex", alignItems: "center", gap: 8,
    background: "transparent", border: "1px solid #ffffff14",
    color: "#7a7068", padding: "10px 24px",
    fontFamily: "'Montserrat', sans-serif", fontSize: 13, fontWeight: 500,
    letterSpacing: "0.04em", cursor: "none", transition: "all 0.25s ease",
  },
  tabBtnActive: { background: "#7ab8d414", border: "1px solid #7ab8d455", color: "#7ab8d4" },
  tabCount: {
    fontSize: 11, fontWeight: 600, background: "#ffffff0d", color: "#4a4438",
    borderRadius: 20, padding: "1px 8px", fontFamily: "'Montserrat', sans-serif",
  },
  tabCountActive: { background: "#7ab8d422", color: "#7ab8d4" },
  degree: {
    fontSize: 19, fontWeight: 600, color: "#f0e8d8", marginBottom: 5,
    fontFamily: "'Montserrat', sans-serif", letterSpacing: "-0.01em",
  },
  school: {
    fontSize: 13, color: "#7ab8d4", fontFamily: "'Montserrat', sans-serif",
    fontWeight: 500, marginBottom: 10, letterSpacing: "0.03em",
  },
  credentialBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    marginTop: 12,
    padding: "6px 14px",
    fontSize: 12,
    fontFamily: "'Montserrat', sans-serif",
    letterSpacing: "0.04em",
    textDecoration: "none",
    color: "#9d9385",
    border: "1px solid #ffffff14",
    background: "transparent",
    transition: "all 0.25s ease",
  },
};
