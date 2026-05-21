import { useState, useEffect } from "react";
import { FadeIn } from "./ui/FadeIn.jsx";
import { shared } from "../styles/tokens.js";
import { PROFILE } from "../data/index.js";

// ── Mobile hook ──────────────────────────────────────────────────────────────
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isMobile;
}

// ── Typewriter role cycler ───────────────────────────────────────────────────
function RoleCycler({ roles }) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    const current = roles[index];
    if (typing) {
      if (charIdx < current.length) {
        const t = setTimeout(() => {
          setDisplayed(current.slice(0, charIdx + 1));
          setCharIdx(c => c + 1);
        }, 55);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 1800);
        return () => clearTimeout(t);
      }
    } else {
      if (charIdx > 0) {
        const t = setTimeout(() => {
          setDisplayed(current.slice(0, charIdx - 1));
          setCharIdx(c => c - 1);
        }, 30);
        return () => clearTimeout(t);
      } else {
        setIndex(i => (i + 1) % roles.length);
        setTyping(true);
      }
    }
  }, [charIdx, typing, index, roles]);

  return (
    <p style={s.heroRole}>
      {displayed}
      <span style={s.typeCursor}>|</span>
    </p>
  );
}

// ── Main Hero ────────────────────────────────────────────────────────────────
export default function Hero({ onNav }) {
  const isMobile = useIsMobile();

  return (
    <section id="about" style={{
      ...s.hero,
      flexDirection: isMobile ? "column-reverse" : "row",
      padding: isMobile ? "100px 20px 60px" : "120px 32px 80px",
      gap: isMobile ? 32 : 80,
      alignItems: isMobile ? "center" : "center",
      textAlign: isMobile ? "center" : "left",
    }}>

      {/* Text column */}
      <div style={{
        ...s.heroContent,
        maxWidth: isMobile ? "100%" : 580,
        alignItems: isMobile ? "center" : "flex-start",
      }}>
        <FadeIn delay={0.1}>
          <p style={s.heroEyebrow}>Portfolio · Available for hire</p>
        </FadeIn>

        <FadeIn delay={0.25}>
          <h1 style={{
            ...s.heroTitle,
            whiteSpace: isMobile ? "normal" : "nowrap",
            fontSize: isMobile ? "clamp(28px, 8vw, 48px)" : "clamp(32px, 4.5vw, 64px)",
          }}>
            <span style={s.heroGold}>{PROFILE.name}</span>
          </h1>
          <RoleCycler roles={PROFILE.roles} />

          <div style={{ ...s.socialRow, justifyContent: isMobile ? "center" : "flex-start" }}>
            <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" style={s.socialLink}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#c8a96e88"; e.currentTarget.style.color = "#c8a96e"; e.currentTarget.style.boxShadow = "0 0 16px #c8a96e33"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#ffffff18"; e.currentTarget.style.color = "#9d9385"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              <span>GitHub</span>
            </a>
            <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" style={s.socialLink}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#0a66c288"; e.currentTarget.style.color = "#0a66c2"; e.currentTarget.style.boxShadow = "0 0 16px #0a66c233"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#ffffff18"; e.currentTarget.style.color = "#9d9385"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span>LinkedIn</span>
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <p style={{ ...s.heroSub, textAlign: isMobile ? "center" : "left" }}>
            Undergraduate in B.Sc. Computer Science and Technology at Sabaragamuwa University of Sri Lanka, passionate about building impactful Machine Learning and AI-driven solutions, with experience in graphic design.
          </p>
        </FadeIn>

        <FadeIn delay={0.55}>
          <div style={{ ...s.heroBtns, justifyContent: isMobile ? "center" : "flex-start" }}>
            <button className="btn-primary-el" style={shared.btnPrimary} onClick={() => onNav("Projects")}>
              View My Work
            </button>
            <a
              href={PROFILE.cvUrl}
              download
              className="btn-ghost-el"
              style={{ ...shared.btnGhost, display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download CV
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={0.7}>
          <div style={{ ...s.heroStats, justifyContent: isMobile ? "center" : "flex-start" }}>
            {[
              ["3rd", "Year Undergraduate"],
              ["6+",  "Years Experience"],
              ["10+", "Projects Done"],
            ].map(([num, label]) => (
              <div key={label} className="stat-item" style={{ ...s.stat, alignItems: isMobile ? "center" : "flex-start" }}>
                <span style={s.statNum}>{num}</span>
                <span style={s.statLabel}>{label}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>

      {/* Photo column */}
      <div style={{ ...s.heroVisual, flexShrink: 0 }}>
        <FadeIn delay={0.3}>
          <AvatarScene isMobile={isMobile} />
        </FadeIn>
      </div>

      {!isMobile && (
        <div style={s.scrollHint}>
          <div style={s.scrollLine} />
          <span style={s.scrollText}>scroll</span>
        </div>
      )}
    </section>
  );
}

// ── Avatar Scene ─────────────────────────────────────────────────────────────
function AvatarScene({ isMobile }) {
  const size = isMobile ? 240 : 360;

  const PARTICLES = [
    { size: 5, color: "#c8a96e", top: "18%", left: "12%",      delay: "0s",   dur: "4s"   },
    { size: 4, color: "#9b7eb8", top: "72%", left: "8%",       delay: "1.2s", dur: "5s"   },
    { size: 3, color: "#7ab8d4", top: "30%", right: "10%",     delay: "0.6s", dur: "3.5s" },
    { size: 5, color: "#c8a96e", bottom: "20%", right: "14%",  delay: "2s",   dur: "4.5s" },
    { size: 3, color: "#8b9e7a", top: "60%", right: "6%",      delay: "0.4s", dur: "6s"   },
  ];
  const CORNERS = [
    { top: 16, left: 16,    borderTop: "2px solid #c8a96e", borderLeft:  "2px solid #c8a96e" },
    { top: 16, right: 16,   borderTop: "2px solid #c8a96e", borderRight: "2px solid #c8a96e" },
    { bottom: 16, left: 16,  borderBottom: "2px solid #c8a96e", borderLeft:  "2px solid #c8a96e" },
    { bottom: 16, right: 16, borderBottom: "2px solid #c8a96e", borderRight: "2px solid #c8a96e" },
  ];

  const dotRadius = isMobile ? 72 : 108;

  return (
    <div style={{ ...s.avatarScene, width: size, height: size }}>
      {/* Orbs */}
      <div style={{ ...s.ambientOrb, width: isMobile ? 170 : 260, height: isMobile ? 170 : 260, background: "radial-gradient(circle, #c8a96e28 0%, transparent 70%)", animation: "orbPulse1 7s ease-in-out infinite", top: -20, left: -20 }} />
      <div style={{ ...s.ambientOrb, width: isMobile ? 130 : 200, height: isMobile ? 130 : 200, background: "radial-gradient(circle, #9b7eb824 0%, transparent 70%)", animation: "orbPulse2 9s ease-in-out infinite", bottom: -10, right: -10 }} />

      {/* Rings */}
      <div style={s.ringOuter} />
      <div style={s.ringMiddle}>
        {[0,60,120,180,240,300].map(deg => (
          <div key={deg} style={{
            ...s.ringDot,
            top:  `calc(50% + ${Math.sin(deg * Math.PI / 180) * dotRadius}px - 3px)`,
            left: `calc(50% + ${Math.cos(deg * Math.PI / 180) * dotRadius}px - 3px)`,
          }} />
        ))}
      </div>
      <div style={s.ringInner} />

      {/* Corners */}
      {CORNERS.map((br, i) => (
        <div key={i} style={{ position: "absolute", width: 14, height: 14, ...br }} />
      ))}

      {/* Particles — hide on mobile for cleanliness */}
      {!isMobile && PARTICLES.map((p, i) => (
        <div key={i} style={{
          position: "absolute", width: p.size, height: p.size, borderRadius: "50%",
          background: p.color, boxShadow: `0 0 8px ${p.color}`,
          top: p.top, left: p.left, right: p.right, bottom: p.bottom,
          animation: `particleDrift ${p.dur} ease-in-out ${p.delay} infinite`,
        }} />
      ))}

      {/* Photo */}
      <div style={s.avatarWrap}>
        {PROFILE.photo ? (
          <>
            <img className="avatar-photo" src={PROFILE.photo} alt={PROFILE.name} style={s.avatarPhoto} />
            <div style={s.avatarPhotoOverlay} />
          </>
        ) : (
          <div style={s.avatarPlaceholder}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#c8a96e33" strokeWidth="1">
              <circle cx="12" cy="8" r="4"/>
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
            </svg>
            <span style={s.placeholderHint}>Set PROFILE.photo{"\n"}in data/index.js</span>
          </div>
        )}
      </div>

      {/* Badges */}
      <div style={{ ...s.avatarBadge, fontSize: isMobile ? 8 : 10 }}><span style={s.badgeDot} />FSE</div>
      <div style={{ ...s.statusBadge, fontSize: isMobile ? 8 : 10 }}>
        <span style={s.statusDot} />
        <span style={{ color: "#4ade80" }}>Available</span>
      </div>
    </div>
  );
}

const s = {
  hero: { minHeight: "100vh", display: "flex", alignItems: "center", maxWidth: 1200, margin: "0 auto", position: "relative" },
  heroContent: { flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" },
  heroEyebrow: { fontFamily: "'Montserrat', sans-serif", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#c8a96e", marginBottom: 20 },
  heroTitle: { fontWeight: 600, lineHeight: 1.1, margin: "0 0 12px", letterSpacing: "-0.02em" },
  heroGold: { background: "linear-gradient(90deg, #c8a96e, #f0d4a0, #c8a96e, #9b7040)", backgroundSize: "300% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontStyle: "italic", animation: "gradientShift 4s ease infinite" },
  heroRole: { fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(12px, 1.8vw, 16px)", fontWeight: 500, color: "#c8a96e", letterSpacing: "0.06em", margin: "0 0 20px", minHeight: "1.6em", display: "flex", alignItems: "center", gap: 2 },
  typeCursor: { display: "inline-block", color: "#c8a96eaa", fontWeight: 300, animation: "blink 0.9s step-end infinite" },
  socialRow: { display: "flex", gap: 12, marginBottom: 28, flexWrap: "wrap" },
  socialLink: { display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", border: "1px solid #ffffff18", background: "linear-gradient(135deg, #161410, #0e0d0b)", color: "#9d9385", textDecoration: "none", fontFamily: "'Montserrat', sans-serif", fontSize: 12, fontWeight: 500, letterSpacing: "0.04em", transition: "border-color 0.25s, color 0.25s, box-shadow 0.25s", cursor: "pointer" },
  heroSub: { fontSize: 12, lineHeight: 1.9, color: "#9d9385", marginBottom: 32, fontWeight: 400, fontFamily: "'Montserrat', sans-serif" },
  heroBtns: { display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 48, alignItems: "center" },
  heroStats: { display: "flex", gap: 32, flexWrap: "wrap" },
  stat: { display: "flex", flexDirection: "column", gap: 4 },
  statNum: { fontSize: 32, fontWeight: 300, lineHeight: 1, background: "linear-gradient(135deg, #c8a96e, #f0d49a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" },
  statLabel: { fontSize: 10, color: "#6b6358", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'Montserrat', sans-serif" },
  heroVisual: { display: "flex", justifyContent: "center", alignItems: "center" },
  scrollHint: { position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, opacity: 0.4 },
  scrollLine: { width: 1, height: 36, background: "linear-gradient(to bottom, transparent, #c8a96e)" },
  scrollText: { fontFamily: "'Montserrat', sans-serif", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#c8a96e" },
  avatarScene: { position: "relative", display: "flex", alignItems: "center", justifyContent: "center" },
  ambientOrb: { position: "absolute", borderRadius: "50%", pointerEvents: "none" },
  ringOuter: { position: "absolute", inset: 0, borderRadius: "50%", border: "1px dashed #c8a96e22", animation: "rotateCW 25s linear infinite" },
  ringMiddle: { position: "absolute", inset: 12, borderRadius: "50%", border: "1px solid #c8a96e18", animation: "rotateCCW 18s linear infinite" },
  ringDot: { position: "absolute", width: 6, height: 6, borderRadius: "50%", background: "#c8a96e", boxShadow: "0 0 8px #c8a96e" },
  ringInner: { position: "absolute", inset: 28, borderRadius: "50%", border: "1px solid #c8a96e2a", boxShadow: "0 0 20px #c8a96e0a, inset 0 0 20px #c8a96e05" },
  avatarWrap: { position: "absolute", inset: 36, borderRadius: "50%", background: "linear-gradient(145deg, #1e1a14 0%, #0e0c0a 100%)", border: "1.5px solid #c8a96e44", boxShadow: "0 0 40px #c8a96e18, inset 0 0 30px #c8a96e08", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", zIndex: 4 },
  avatarPhoto: { width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%", display: "block" },
  avatarPhotoOverlay: { position: "absolute", inset: 0, borderRadius: "50%", background: "linear-gradient(180deg, transparent 50%, #0c0c0e44 100%)", pointerEvents: "none" },
  avatarPlaceholder: { display: "flex", flexDirection: "column", alignItems: "center", gap: 6 },
  placeholderHint: { fontFamily: "'Montserrat', sans-serif", fontSize: 8, color: "#4a4438", textAlign: "center", letterSpacing: "0.04em", padding: "0 10px", whiteSpace: "pre-line" },
  avatarBadge: { position: "absolute", bottom: 12, right: 2, background: "linear-gradient(135deg, #c8a96e, #9b7040)", color: "#0c0c0e", fontWeight: 800, padding: "4px 10px", letterSpacing: "0.12em", fontFamily: "'Montserrat', sans-serif", zIndex: 6, display: "flex", alignItems: "center", gap: 4, boxShadow: "0 4px 14px #c8a96e44" },
  badgeDot: { width: 4, height: 4, borderRadius: "50%", background: "#0c0c0e", display: "inline-block" },
  statusBadge: { position: "absolute", top: 14, left: 0, background: "linear-gradient(135deg, #0e130e, #0a0f0a)", border: "1px solid #4ade8044", fontFamily: "'Montserrat', sans-serif", fontWeight: 500, padding: "4px 10px", letterSpacing: "0.08em", display: "flex", alignItems: "center", gap: 5, zIndex: 6, boxShadow: "0 4px 14px #4ade8022" },
  statusDot: { width: 5, height: 5, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 8px #4ade80", animation: "pulseGlow 2s ease-in-out infinite", display: "inline-block", flexShrink: 0 },
};
