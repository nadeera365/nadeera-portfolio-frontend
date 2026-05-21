// ── Font injection ────────────────────────────────────────────────────────────
const montserratLink = document.createElement("link");
montserratLink.href = "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap";
montserratLink.rel = "stylesheet";
document.head.appendChild(montserratLink);

// ── Global keyframes & utility classes ───────────────────────────────────────
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes floatOrb {
    0%, 100% { transform: translateY(0px) scale(1); }
    50% { transform: translateY(-30px) scale(1.05); }
  }
  @keyframes rotateSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes pulseGlow {
    0%, 100% { box-shadow: 0 0 12px #c8a96e55; }
    50% { box-shadow: 0 0 28px #c8a96eaa, 0 0 48px #c8a96e33; }
  }
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes borderGlow {
    0%, 100% { border-color: #c8a96e22; }
    50% { border-color: #c8a96e66; }
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes orbPulse1 {
    0%, 100% { transform: scale(1) translate(0,0); opacity: 0.7; }
    33% { transform: scale(1.15) translate(8px,-10px); opacity: 1; }
    66% { transform: scale(0.9) translate(-6px,6px); opacity: 0.5; }
  }
  @keyframes orbPulse2 {
    0%, 100% { transform: scale(1) translate(0,0); opacity: 0.5; }
    33% { transform: scale(1.2) translate(-10px,8px); opacity: 0.9; }
    66% { transform: scale(0.85) translate(8px,-8px); opacity: 0.6; }
  }
  @keyframes orbPulse3 {
    0%, 100% { transform: scale(1) translate(0,0); opacity: 0.4; }
    50% { transform: scale(1.3) translate(6px,10px); opacity: 0.8; }
  }
  @keyframes rotateCW { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  @keyframes rotateCCW { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
  @keyframes particleDrift {
    0% { transform: translateY(0) translateX(0) scale(1); opacity: 0.8; }
    50% { transform: translateY(-18px) translateX(8px) scale(1.3); opacity: 1; }
    100% { transform: translateY(0) translateX(0) scale(1); opacity: 0.8; }
  }
  @keyframes avatarReveal {
    from { clip-path: circle(0% at 50% 50%); opacity: 0; }
    to { clip-path: circle(55% at 50% 50%); opacity: 1; }
  }
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes marqueeReverse {
    0% { transform: translateX(-50%); }
    100% { transform: translateX(0); }
  }

  .avatar-photo { animation: avatarReveal 0.9s cubic-bezier(0.22,1,0.36,1) forwards; }
  .marquee-track { display: flex; width: max-content; }
  .marquee-track-fwd { animation: marquee 28s linear infinite; }
  .marquee-track-rev { animation: marqueeReverse 32s linear infinite; }
  .marquee-track-fwd:hover, .marquee-track-rev:hover { animation-play-state: paused; }
  .tool-card { transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease; cursor: none; }
  .tool-card:hover { transform: translateY(-6px) scale(1.06); }
  .project-card-img { transition: transform 0.6s ease; }
  .project-card { transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease; }
  .project-card:hover .project-card-img { transform: scale(1.07); }
  .project-card:hover { transform: translateY(-6px); }
  .skill-card { transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease; position: relative; }
  .skill-card::before { content:''; position:absolute; inset:0; background:linear-gradient(135deg,#c8a96e08 0%,transparent 60%); opacity:0; transition:opacity 0.4s ease; pointer-events:none; }
  .skill-card:hover::before { opacity:1; }
  .skill-card:hover { transform:translateY(-4px); box-shadow:0 12px 40px #c8a96e14; border-color:#c8a96e33 !important; }
  .timeline-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
  .timeline-card:hover { transform: translateX(4px); box-shadow: -4px 0 24px #c8a96e18; }
  .contact-link-item { transition: transform 0.25s ease, opacity 0.25s ease; }
  .contact-link-item:hover { transform: translateX(6px); opacity: 0.85; }
  .pill-item { transition: background 0.2s, color 0.2s, border-color 0.2s; }
  .pill-item:hover { background: #c8a96e18 !important; color: #c8a96e !important; border-color: #c8a96e44 !important; }
  .btn-primary-el { transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease; }
  .btn-primary-el:hover { background: #d4b87e !important; transform: translateY(-2px); box-shadow: 0 8px 24px #c8a96e44; }
  .btn-ghost-el { transition: border-color 0.2s ease, color 0.2s ease, transform 0.2s ease; }
  .btn-ghost-el:hover { border-color: #c8a96e88 !important; color: #c8a96e !important; transform: translateY(-2px); }
  .stat-item { transition: transform 0.25s ease; }
  .stat-item:hover { transform: translateY(-4px); }
  * { box-sizing: border-box; }
`;
document.head.appendChild(styleSheet);

// ── Shared style tokens ───────────────────────────────────────────────────────
export const t = {
  gold: "#c8a96e",
  blue: "#7ab8d4",
  bg: "#0c0c0e",
  surface: "#0e0d0b",
  text: "#e8e0d0",
  muted: "#9d9385",
  dim: "#7a7068",
  faint: "#4a4438",
};

// ── Shared style objects used across components ───────────────────────────────
export const shared = {
  section: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "100px 32px",
    position: "relative",
    zIndex: 2,
  },
  sectionEyebrow: {
    fontFamily: "'Montserrat', monospace",
    fontSize: 11,
    letterSpacing: "0.25em",
    textTransform: "uppercase",
    color: "#c8a96e",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: "clamp(36px, 5vw, 56px)",
    fontWeight: 400,
    background: "linear-gradient(120deg, #f0e8d8 0%, #c8a96e 50%, #e8dcc8 100%)",
    backgroundSize: "200% auto",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    animation: "gradientShift 6s ease infinite",
    margin: "0 0 60px",
    letterSpacing: "-0.02em",
  },
  btnPrimary: {
    background: "#c8a96e",
    color: "#0c0c0e",
    border: "none",
    padding: "14px 32px",
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    cursor: "none",
    fontFamily: "'Montserrat', monospace",
  },
  btnGhost: {
    background: "transparent",
    color: "#e8e0d0",
    border: "1px solid #ffffff22",
    padding: "14px 32px",
    fontSize: 14,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    cursor: "none",
    fontFamily: "'Montserrat', monospace",
  },
  badge: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    padding: "3px 10px",
    borderRadius: 4,
  },
  badgeWork: {
    background: "#c8a96e18",
    color: "#c8a96e",
    border: "1px solid #c8a96e44",
  },
  badgeEdu: {
    background: "#7ab8d418",
    color: "#7ab8d4",
    border: "1px solid #7ab8d444",
  },
  badgeType: {
    background: "#ffffff08",
    color: "#9d9385",
    border: "1px solid #ffffff14",
  },
  timeline: {
    display: "flex",
    flexDirection: "column",
    gap: 0,
    paddingLeft: 28,
    borderLeft: "1px solid #ffffff0f",
  },
  timelineItem: {
    position: "relative",
    paddingLeft: 28,
    paddingBottom: 32,
  },
  timelineDot: {
    position: "absolute",
    left: -35,
    top: 14,
    width: 9,
    height: 9,
    borderRadius: "50%",
    background: "#c8a96e",
    border: "2px solid #0c0c0e",
    boxShadow: "0 0 12px #c8a96e55",
    animation: "pulseGlow 2.5s ease-in-out infinite",
  },
  timelineContent: {
    background: "linear-gradient(135deg, #131210 0%, #0e0d0b 100%)",
    border: "1px solid #ffffff0d",
    borderLeft: "2px solid #c8a96e22",
    padding: "24px 28px",
    fontFamily: "'Montserrat', sans-serif",
    position: "relative",
    overflow: "hidden",
  },
  timelineBadgeRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 14,
    flexWrap: "wrap",
  },
  timelinePeriod: {
    fontSize: 11,
    color: "#4a4438",
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 400,
    whiteSpace: "nowrap",
    marginLeft: "auto",
  },
  timelineRole: {
    fontSize: 19,
    fontWeight: 600,
    color: "#f0e8d8",
    marginBottom: 4,
    fontFamily: "'Montserrat', sans-serif",
    letterSpacing: "-0.01em",
  },
  timelineCompany: {
    fontSize: 13,
    color: "#c8a96e",
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 500,
    letterSpacing: "0.03em",
  },
  timelineDesc: {
    fontSize: 14,
    lineHeight: 1.8,
    color: "#7a7068",
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 300,
  },
};
