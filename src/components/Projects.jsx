import { useState } from "react";
import { FadeIn } from "./ui/FadeIn.jsx";
import { PROJECTS, PROJECT_CATEGORIES, PROFILE } from "../data/index.js";
import { shared } from "../styles/tokens.js";

// Category accent colors
const CAT_COLORS = {
  "All":        "#c8a96e",
  "Full Stack": "#61dafb",
  "ML":         "#8b9e7a",
  "Design":     "#e85d8a",
};

export default function Projects() {
  const [active, setActive] = useState("All");

  const filtered = active === "All"
    ? PROJECTS
    : PROJECTS.filter(p => p.category === active);

  const designCount = PROJECTS.filter(p => p.category === "Design").length;

  return (
    <section id="projects" style={shared.section}>
      <FadeIn>
        <p style={shared.sectionEyebrow}>Selected Work</p>
        <h2 style={shared.sectionTitle}>Projects</h2>
      </FadeIn>

      {/* ── Category filter tabs ── */}
      <FadeIn delay={0.1}>
        <div style={s.filterRow}>
          {PROJECT_CATEGORIES.map(cat => {
            const isActive = active === cat;
            const color = CAT_COLORS[cat] || "#c8a96e";
            return (
              <button
                key={cat}
                style={{
                  ...s.filterBtn,
                  borderColor:   isActive ? color + "88" : "#ffffff14",
                  color:         isActive ? color         : "#7a7068",
                  background:    isActive ? color + "12"  : "transparent",
                  boxShadow:     isActive ? `0 0 16px ${color}22` : "none",
                }}
                onClick={() => setActive(cat)}
              >
                {/* dot indicator */}
                <span style={{ ...s.filterDot, background: isActive ? color : "#4a4438" }} />
                {cat}
                <span style={{
                  ...s.filterCount,
                  color:      isActive ? color      : "#4a4438",
                  background: isActive ? color+"18" : "#ffffff08",
                }}>
                  {cat === "All" ? PROJECTS.length : PROJECTS.filter(p => p.category === cat).length}
                </span>
              </button>
            );
          })}

          
          
        </div>
      </FadeIn>

      {/* ── Project grid ── */}
      <div style={s.grid}>
        {filtered.map((p, i) => (
          <FadeIn key={p.title} delay={i * 0.08}>
            <ProjectCard project={p} />
          </FadeIn>
        ))}
      </div>

      {/* ── Bottom CTA ── */}
      <FadeIn delay={0.2}>
        <div style={s.bottomRow}>
          
          <span style={s.bottomCount}>{PROJECTS.length} projects total</span>
        </div>
      </FadeIn>
    </section>
  );
}

function ProjectCard({ project: p }) {
  const isBehance = p.isBehance;

  return (
    <a
      href={p.link || "#"}
      target={p.link && p.link !== "#" ? "_blank" : undefined}
      rel="noopener noreferrer"
      style={{ textDecoration: "none", display: "block" }}
    >
      <div
        className="project-card"
        style={{ ...s.card, boxShadow: "0 0 0 1px #ffffff0a" }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = p.color + "88";
          e.currentTarget.style.boxShadow = `0 16px 48px ${p.color}22, 0 0 0 1px ${p.color}44`;
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = "#ffffff11";
          e.currentTarget.style.boxShadow = "0 0 0 1px #ffffff0a";
        }}
      >
        {/* Image */}
        <div style={s.imgWrap}>
          <img className="project-card-img" src={p.img} alt={p.title} style={s.img} />
          <div style={{ ...s.imgOverlay, background: `linear-gradient(to bottom, ${p.color}22 0%, #0c0c0e 100%)` }} />
          <div style={{ ...s.imgShimmer, background: `linear-gradient(120deg, transparent 30%, ${p.color}18 50%, transparent 70%)` }} />

          {/* Category tag */}
          <span style={{ ...s.tag, color: p.color, borderColor: p.color + "55", position: "absolute", top: 14, left: 14 }}>
            {p.category}
          </span>

          {/* Platform badge — Behance for Design, GitHub for others */}
          {isBehance ? (
            <span style={s.behanceBadge}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="#1769ff">
                <path d="M8.228 14.585c.513 0 .955-.086 1.326-.258.37-.172.558-.49.558-.956 0-.509-.178-.853-.534-1.033-.357-.179-.793-.269-1.31-.269H5.455v2.516h2.773zm-.307-4.296c.45 0 .832-.099 1.147-.296.315-.198.473-.524.473-.979 0-.499-.158-.84-.473-1.023C8.753 7.81 8.371 7.72 7.92 7.72H5.455v2.569h2.466zM15.893 9.9c-.453 0-.84.126-1.163.377-.323.251-.514.637-.574 1.156h3.405c-.06-.519-.25-.905-.573-1.156a1.611 1.611 0 00-1.095-.377zM24 2v20c0 1.1-.9 2-2 2H2c-1.1 0-2-.9-2-2V2C0 .9.9 0 2 0h20c1.1 0 2 .9 2 2zM9.697 16.151c.487-.196.886-.501 1.196-.914.31-.413.465-.941.465-1.582 0-.671-.152-1.216-.458-1.637-.171-.233-.403-.443-.694-.628.368-.194.65-.454.848-.781.197-.327.296-.725.296-1.193 0-.458-.087-.854-.261-1.188-.174-.334-.424-.608-.75-.822-.307-.196-.672-.336-1.095-.42-.423-.085-.89-.127-1.402-.127H3.592v9.5h4.468c.617 0 1.15-.098 1.637-.208zM20.5 11.5h-5.125c.06.616.278 1.075.654 1.379.376.303.83.455 1.364.455.5 0 .921-.113 1.263-.338.199-.129.383-.32.551-.572l1.187.399c-.286.574-.683 1.004-1.188 1.29-.506.285-1.096.428-1.77.428-.954 0-1.734-.302-2.341-.906-.607-.604-.91-1.426-.91-2.466 0-1.04.299-1.876.897-2.509.597-.633 1.36-.95 2.286-.95.886 0 1.617.293 2.191.88.575.585.862 1.415.862 2.488 0 .148-.007.281-.021.422z"/>
              </svg>
              Behance
            </span>
          ) : (
            <span style={s.githubBadge}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="#e8e0d0">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              GitHub
            </span>
          )}

          <span style={{ ...s.year, position: "absolute", top: 18, right: 14 }}>{p.year}</span>
        </div>

        {/* Body */}
        <div style={s.body}>
          <div style={{ width: 32, height: 2, background: `linear-gradient(90deg, ${p.color}, transparent)`, marginBottom: 14 }} />
          <h3 style={s.title}>{p.title}</h3>
          <p style={s.desc}>{p.desc}</p>
          <div style={s.techRow}>
            {p.tech.map(t => (
              <span key={t} style={{ ...s.techChip, borderColor: p.color + "33" }}>{t}</span>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <span style={{ ...s.arrow, color: p.color }}>
              {isBehance ? "View on Behance →" : "View on GitHub →"}
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}

const s = {
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 28 },

  filterRow: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 10,
    marginBottom: 40,
  },
  filterBtn: {
    display: "flex", alignItems: "center", gap: 7,
    padding: "9px 20px",
    border: "1px solid",
    background: "transparent",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: 12, fontWeight: 500,
    letterSpacing: "0.06em",
    cursor: "none",
    transition: "all 0.25s ease",
  },
  filterDot: {
    width: 6, height: 6, borderRadius: "50%", flexShrink: 0,
    transition: "background 0.25s",
  },
  filterCount: {
    fontSize: 10, fontWeight: 600,
    padding: "1px 7px", borderRadius: 20,
    fontFamily: "'Montserrat', sans-serif",
    transition: "all 0.25s",
  },
  behanceBtn: {
    display: "flex", alignItems: "center", gap: 7,
    padding: "9px 16px",
    border: "1px solid #1769ff33",
    color: "#1769ffaa",
    textDecoration: "none",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: 11, fontWeight: 500,
    letterSpacing: "0.04em",
    cursor: "none",
    transition: "all 0.25s ease",
    marginLeft: "auto",
  },
  card: {
    background: "linear-gradient(160deg, #131210 0%, #0c0c0e 100%)",
    border: "1px solid #ffffff11", overflow: "hidden", cursor: "none",
  },
  imgWrap: { position: "relative", width: "100%", height: 200, overflow: "hidden" },
  img: { width: "100%", height: "100%", objectFit: "cover", display: "block" },
  imgOverlay: { position: "absolute", inset: 0, pointerEvents: "none" },
  imgShimmer: { position: "absolute", inset: 0, backgroundSize: "200% 100%", animation: "shimmer 3s linear infinite", pointerEvents: "none" },
  tag: { fontSize: 10, fontFamily: "'Montserrat', monospace", letterSpacing: "0.15em", textTransform: "uppercase", border: "1px solid", padding: "3px 10px", background: "#0c0c0ecc" },
  behanceBadge: {
    position: "absolute", bottom: 12, left: 14,
    display: "flex", alignItems: "center", gap: 5,
    background: "#0a0a14ee", border: "1px solid #1769ff44",
    color: "#1769ff", fontSize: 10, fontFamily: "'Montserrat', sans-serif",
    fontWeight: 600, padding: "3px 10px", letterSpacing: "0.06em",
  },
  githubBadge: {
    position: "absolute", bottom: 12, left: 14,
    display: "flex", alignItems: "center", gap: 5,
    background: "#0e0e0eee", border: "1px solid #ffffff22",
    color: "#e8e0d0", fontSize: 10, fontFamily: "'Montserrat', sans-serif",
    fontWeight: 600, padding: "3px 10px", letterSpacing: "0.06em",
  },
  year: { fontSize: 11, color: "#4a4438", fontFamily: "'Montserrat', monospace" },
  body: { padding: "24px 28px 28px" },
  title: { fontSize: 24, fontWeight: 400, color: "#f0e8d8", marginBottom: 10, letterSpacing: "-0.01em" },
  desc: { fontSize: 14, lineHeight: 1.75, color: "#7a7068", marginBottom: 18 },
  techRow: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 },
  techChip: { fontSize: 11, color: "#6b6358", background: "#ffffff05", padding: "3px 10px", fontFamily: "'Montserrat', monospace", letterSpacing: "0.05em", border: "1px solid #ffffff0a" },
  arrow: { fontSize: 13, fontFamily: "'Montserrat', monospace", letterSpacing: "0.05em", opacity: 0.8 },

  bottomRow: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    flexWrap: "wrap", gap: 16, marginTop: 48,
    paddingTop: 32, borderTop: "1px solid #ffffff08",
  },
  viewAllBtn: {
    display: "flex", alignItems: "center", gap: 10,
    padding: "12px 28px",
    border: "1px solid #ffffff14",
    color: "#9d9385",
    textDecoration: "none",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: 13, fontWeight: 500,
    letterSpacing: "0.04em",
    cursor: "none",
    transition: "all 0.3s ease",
    background: "linear-gradient(135deg, #131210, #0e0d0b)",
  },
  bottomCount: {
    fontFamily: "'Montserrat', monospace",
    fontSize: 11, color: "#4a4438", letterSpacing: "0.1em",
  },
};
