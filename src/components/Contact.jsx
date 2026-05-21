import { useState, useEffect } from "react";
import { FadeIn } from "./ui/FadeIn.jsx";
import { shared } from "../styles/tokens.js";
import { PROFILE } from "../data/index.js";

const API_URL = "http://localhost:5000/api/contact";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isMobile;
}

const CONTACT_LINKS = [
  {
    label: "Email",
    val: PROFILE.email,
    href: `mailto:${PROFILE.email}`,
    color: "#c8a96e",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="M2 7l10 7 10-7"/>
      </svg>
    ),
  },
  {
    label: "GitHub",
    val: PROFILE.github.replace("https://", ""),
    href: PROFILE.github,
    color: "#e8e0d0",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    val: PROFILE.linkedin.replace("https://", ""),
    href: PROFILE.linkedin,
    color: "#0a66c2",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
];

export default function Contact() {
  const isMobile = useIsMobile();

  return (
    <section id="contact" style={shared.section}>
      <FadeIn>
        <p style={shared.sectionEyebrow}>Let's Talk</p>
        <h2 style={shared.sectionTitle}>Get In Touch</h2>
        <p style={s.sub}>Have a project in mind or just want to connect? I'd love to hear from you.</p>
      </FadeIn>

      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1.2fr",
        gap: isMobile ? 24 : 48,
        alignItems: "start",
      }}>
        {/* Contact link cards */}
        <FadeIn delay={0.1}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {CONTACT_LINKS.map(({ label, val, href, color, icon }) => (
              <a
                key={label}
                href={href}
                target={label !== "Email" ? "_blank" : undefined}
                rel="noopener noreferrer"
                style={s.contactCard}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = color + "66";
                  e.currentTarget.style.boxShadow  = `0 8px 28px ${color}20, 0 0 0 1px ${color}33`;
                  e.currentTarget.style.transform  = "translateY(-3px)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "#ffffff0d";
                  e.currentTarget.style.boxShadow  = "none";
                  e.currentTarget.style.transform  = "translateY(0)";
                }}
              >
                <div style={{ ...s.iconCircle, background: color + "14", border: `1px solid ${color}33`, color }}>
                  {icon}
                </div>
                <div style={s.cardText}>
                  <span style={s.cardLabel}>{label}</span>
                  <span style={{ ...s.cardVal, color, fontSize: isMobile ? 11 : 13 }}>{val}</span>
                </div>
                <span style={{ ...s.cardArrow, color }}>→</span>
              </a>
            ))}
          </div>
        </FadeIn>

        {/* Form */}
        <FadeIn delay={0.2}>
          <div style={{
            ...s.formWrap,
            padding: isMobile ? "24px 20px" : "36px",
          }}>
            <ContactForm isMobile={isMobile} />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function ContactForm({ isMobile }) {
  const [form, setForm]           = useState({ name: "", email: "", message: "" });
  const [errors, setErrors]       = useState({});
  const [status, setStatus]       = useState("idle");
  const [serverMsg, setServerMsg] = useState("");

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    setErrors(ev => ({ ...ev, [e.target.name]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim())    errs.name    = "Name is required.";
    if (!form.email.trim())   errs.email   = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "Enter a valid email.";
    if (!form.message.trim()) errs.message = "Message is required.";
    else if (form.message.trim().length < 10)     errs.message = "Minimum 10 characters.";
    return errs;
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStatus("loading");
    try {
      const res  = await fetch(API_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setServerMsg(data.message);
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
        if (data.errors) {
          const fe = {};
          data.errors.forEach(e => { fe[e.field] = e.message; });
          setErrors(fe);
        }
        setServerMsg(data.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setServerMsg("Could not reach the server. Please try again later.");
    }
  };

  const inputStyle = (field) => ({
    background: "linear-gradient(135deg, #161412 0%, #0f0e0c 100%)",
    border: `1px solid ${errors[field] ? "#e05555" : "#c8a96e1a"}`,
    color: "#e8e0d0", padding: "12px 14px", fontSize: 14,
    fontFamily: "'Montserrat', sans-serif",
    outline: "none", width: "100%", boxSizing: "border-box",
    borderRadius: 2, transition: "border-color 0.3s",
  });

  if (status === "success") return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, padding: "32px 0" }}>
      <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#4ade8022", border: "1px solid #4ade8055", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>✓</div>
      <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 13, color: "#4ade80", textAlign: "center", lineHeight: 1.7 }}>{serverMsg}</p>
      <button style={s.submitBtn} onClick={() => setStatus("idle")}>Send Another</button>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {/* Name + Email — stacked on mobile, side by side on desktop */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 12 }}>
        {["name", "email"].map(field => (
          <div key={field} style={s.field}>
            <input style={inputStyle(field)} name={field} placeholder={field === "name" ? "Your Name" : "Your Email"} value={form[field]} onChange={handleChange} />
            {errors[field] && <span style={s.err}>{errors[field]}</span>}
          </div>
        ))}
      </div>
      <div style={s.field}>
        <textarea style={{ ...inputStyle("message"), height: "110px", resize: "none" }} name="message" placeholder="Your Message" value={form.message} onChange={handleChange} />
        {errors.message && <span style={s.err}>{errors.message}</span>}
      </div>
      {status === "error" && !Object.keys(errors).length && (
        <p style={{ ...s.err, marginBottom: 2 }}>{serverMsg}</p>
      )}
      <button
        className="btn-primary-el"
        style={{ ...s.submitBtn, opacity: status === "loading" ? 0.7 : 1, width: isMobile ? "100%" : "auto" }}
        onClick={handleSubmit}
        disabled={status === "loading"}
      >
        {status === "loading" ? "Sending…" : "Send Message"}
      </button>
    </div>
  );
}

const s = {
  sub: { fontSize: 16, color: "#7a7068", marginTop: -36, marginBottom: 48, lineHeight: 1.7, fontFamily: "'Montserrat', sans-serif" },
  contactCard: {
    display: "flex", alignItems: "center", gap: 16, padding: "18px 20px",
    background: "linear-gradient(135deg, #131210 0%, #0e0d0b 100%)",
    border: "1px solid #ffffff0d", textDecoration: "none",
    transition: "border-color 0.3s, box-shadow 0.3s, transform 0.3s", cursor: "pointer",
  },
  iconCircle: {
    width: 48, height: 48, borderRadius: "50%",
    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
  },
  cardText: { display: "flex", flexDirection: "column", gap: 3, flex: 1, minWidth: 0 },
  cardLabel: { fontFamily: "'Montserrat', sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#4a4438" },
  cardVal: { fontFamily: "'Montserrat', sans-serif", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" },
  cardArrow: { fontSize: 16, opacity: 0.7, flexShrink: 0 },
  formWrap: {
    background: "linear-gradient(135deg, #141210 0%, #0e0d0b 50%, #101214 100%)",
    border: "1px solid #c8a96e22",
    boxShadow: "0 0 40px #c8a96e08, inset 0 0 30px #c8a96e04",
  },
  field: { display: "flex", flexDirection: "column", gap: 4 },
  err: { fontFamily: "'Montserrat', sans-serif", fontSize: 11, color: "#e05555", paddingLeft: 2 },
  submitBtn: { ...shared.btnPrimary, fontFamily: "'Montserrat', sans-serif", alignSelf: "flex-start" },
};
