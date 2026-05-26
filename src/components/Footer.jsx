export default function Footer() {
  return (
    <footer style={s.footer}>
      <span style={s.logo}>
        <span style={s.accent}>{"<"}</span>Nadeera Shasika<span style={s.accent}>{"/>"}</span>
      </span>
      <span style={s.text}>© 2026 · Nadeera Shasika · All rights reserved</span>
    </footer>
  );
}

const s = {
  footer: {
    borderTop: "1px solid transparent",
    backgroundImage: "linear-gradient(#0c0c0e, #0c0c0e), linear-gradient(90deg, transparent, #c8a96e44, transparent)",
    backgroundOrigin: "border-box",
    backgroundClip: "padding-box, border-box",
    padding: "28px 32px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: 1200,
    margin: "0 auto",
    flexWrap: "wrap",
    gap: 12,
  },
  logo: { fontSize: 16, fontFamily: "'Courier New', monospace", color: "#e8e0d0" },
  accent: { color: "#c8a96e" },
  text: { fontSize: 12, color: "#4a4438", fontFamily: "'Courier New', monospace", letterSpacing: "0.05em" },
};
