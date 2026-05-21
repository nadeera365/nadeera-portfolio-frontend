import { useState } from "react";
import { FadeIn } from "./ui/FadeIn.jsx";
import { shared } from "../styles/tokens.js";
import { ORDER_SERVICES, PROFILE } from "../data/index.js";

const API_URL = "http://localhost:5000/api/contact";

export default function Order() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="order" style={shared.section}>
      <FadeIn>
        <p style={shared.sectionEyebrow}>Hire Me</p>
        <h2 style={shared.sectionTitle}>Place an Order</h2>
        <p style={s.sub}>
          Choose a service below and I'll get back to you within 24 hours with a detailed quote.
        </p>
      </FadeIn>

      {/* ── Service cards ── */}
      <div style={s.servicesGrid}>
        {ORDER_SERVICES.map((svc, i) => (
          <FadeIn key={svc.id} delay={i * 0.08}>
            <ServiceCard
              service={svc}
              isSelected={selected?.id === svc.id}
              onSelect={() => setSelected(selected?.id === svc.id ? null : svc)}
            />
          </FadeIn>
        ))}
      </div>

      {/* ── Order form — slides in when a service is selected ── */}
      {selected && (
        <FadeIn delay={0}>
          <div style={s.formSection}>
            <div style={s.formHeader}>
              <div style={{ ...s.formIconBubble, background: selected.color + "18", border: `1px solid ${selected.color}44` }}>
                <span style={{ fontSize: 22 }}>{selected.icon}</span>
              </div>
              <div>
                <h3 style={s.formTitle}>Order: {selected.title}</h3>
                <p style={s.formMeta}>{selected.price} · {selected.duration}</p>
              </div>
              <button style={s.clearBtn} onClick={() => setSelected(null)}>✕ Change</button>
            </div>
            <OrderForm service={selected} onSuccess={() => setSelected(null)} />
          </div>
        </FadeIn>
      )}

      {/* ── Bottom note ── */}
      <FadeIn delay={0.2}>
        <div style={s.note}>
          <span style={s.noteDot} />
          <p style={s.noteText}>
            Not sure what you need? <a href={`mailto:${PROFILE.email}`} style={s.noteLink}>Email me directly</a> and we'll figure it out together.
          </p>
        </div>
      </FadeIn>
    </section>
  );
}

// ── Service card ─────────────────────────────────────────────────────────────
function ServiceCard({ service: svc, isSelected, onSelect }) {
  return (
    <div
      style={{
        ...s.card,
        borderColor: isSelected ? svc.color + "88" : "#ffffff0d",
        boxShadow: isSelected ? `0 0 32px ${svc.color}22, 0 0 0 1px ${svc.color}44` : "none",
        background: isSelected
          ? `linear-gradient(135deg, ${svc.color}0a 0%, #0e0d0b 100%)`
          : "linear-gradient(135deg, #131210 0%, #0e0d0b 100%)",
      }}
      onMouseEnter={e => {
        if (!isSelected) {
          e.currentTarget.style.borderColor = svc.color + "55";
          e.currentTarget.style.transform = "translateY(-4px)";
          e.currentTarget.style.boxShadow = `0 12px 32px ${svc.color}18`;
        }
      }}
      onMouseLeave={e => {
        if (!isSelected) {
          e.currentTarget.style.borderColor = "#ffffff0d";
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "none";
        }
      }}
    >
      {/* Top */}
      <div style={s.cardTop}>
        <div style={{ ...s.iconBubble, background: svc.color + "18", border: `1px solid ${svc.color}33` }}>
          <span style={{ fontSize: 20 }}>{svc.icon}</span>
        </div>
        <div style={{ ...s.priceBadge, color: svc.color, borderColor: svc.color + "44", background: svc.color + "10" }}>
          {svc.price}
        </div>
      </div>

      {/* Info */}
      <h3 style={s.cardTitle}>{svc.title}</h3>
      <p style={s.cardDesc}>{svc.desc}</p>

      {/* Deliverables */}
      <div style={s.deliverables}>
        {svc.deliverables.map((d, i) => (
          <div key={i} style={s.deliverableItem}>
            <span style={{ ...s.deliverableDot, background: svc.color }} />
            <span style={s.deliverableText}>{d}</span>
          </div>
        ))}
      </div>

      {/* Duration + CTA */}
      <div style={s.cardFooter}>
        <span style={s.duration}>⏱ {svc.duration}</span>
        <button
          style={{
            ...s.selectBtn,
            background: isSelected ? svc.color : "transparent",
            color: isSelected ? "#0c0c0e" : svc.color,
            borderColor: svc.color + "66",
          }}
          onClick={onSelect}
        >
          {isSelected ? "✓ Selected" : "Select →"}
        </button>
      </div>
    </div>
  );
}

// ── Order form ───────────────────────────────────────────────────────────────
function OrderForm({ service, onSuccess }) {
  const [form, setForm] = useState({ name: "", email: "", details: "", budget: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
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
    if (!form.details.trim()) errs.details = "Please describe your project.";
    return errs;
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStatus("loading");

    const message = `SERVICE ORDER: ${service.title} (${service.price})\n\nProject Details:\n${form.details}\n\nBudget: ${form.budget || "Not specified"}`;

    try {
      const res  = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, message }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setServerMsg("Order received! I'll get back to you within 24 hours with a detailed quote.");
        setTimeout(() => onSuccess(), 4000);
      } else {
        setStatus("error");
        setServerMsg(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setServerMsg("Could not reach the server. Please email me directly.");
    }
  };

  if (status === "success") return (
    <div style={s.successBox}>
      <div style={s.successIcon}>✓</div>
      <h4 style={s.successTitle}>Order Received!</h4>
      <p style={s.successMsg}>{serverMsg}</p>
    </div>
  );

  const inputStyle = (field) => ({
    background: "linear-gradient(135deg, #161412, #0f0e0c)",
    border: `1px solid ${errors[field] ? "#e05555" : "#ffffff10"}`,
    color: "#e8e0d0", padding: "12px 16px", fontSize: 14,
    fontFamily: "'Montserrat', sans-serif",
    outline: "none", width: "100%", boxSizing: "border-box",
    borderRadius: 2,
    transition: "border-color 0.3s",
  });

  return (
    <div style={s.form}>
      <div style={s.formGrid}>
        <div style={s.field}>
          <label style={s.label}>Your Name</label>
          <input style={inputStyle("name")} name="name" placeholder="John Doe" value={form.name} onChange={handleChange} />
          {errors.name && <span style={s.err}>{errors.name}</span>}
        </div>
        <div style={s.field}>
          <label style={s.label}>Your Email</label>
          <input style={inputStyle("email")} name="email" placeholder="you@example.com" value={form.email} onChange={handleChange} />
          {errors.email && <span style={s.err}>{errors.email}</span>}
        </div>
      </div>
      <div style={s.field}>
        <label style={s.label}>Budget (optional)</label>
        <input style={inputStyle("budget")} name="budget" placeholder="e.g. $100–$200 or flexible" value={form.budget} onChange={handleChange} />
      </div>
      <div style={s.field}>
        <label style={s.label}>Project Details <span style={{ color: "#e05555" }}>*</span></label>
        <textarea
          style={{ ...inputStyle("details"), height: 130, resize: "none" }}
          name="details"
          placeholder={`Tell me about your project...\n- What do you need?\n- Any specific requirements?\n- Deadline?`}
          value={form.details}
          onChange={handleChange}
        />
        {errors.details && <span style={s.err}>{errors.details}</span>}
      </div>
      {status === "error" && <p style={{ ...s.err, marginBottom: 4 }}>{serverMsg}</p>}
      <button
        className="btn-primary-el"
        style={{ ...shared.btnPrimary, opacity: status === "loading" ? 0.7 : 1, fontFamily: "'Montserrat', sans-serif" }}
        onClick={handleSubmit}
        disabled={status === "loading"}
      >
        {status === "loading" ? "Sending Order…" : "Place Order →"}
      </button>
    </div>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const s = {
  sub: { fontSize: 16, color: "#7a7068", marginTop: -36, marginBottom: 52, lineHeight: 1.8, fontFamily: "'Montserrat', sans-serif" },
  servicesGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: 20, marginBottom: 40 },

  card: {
    border: "1px solid #ffffff0d",
    padding: "28px",
    transition: "border-color 0.3s, transform 0.3s, box-shadow 0.3s, background 0.3s",
    cursor: "none",
    display: "flex", flexDirection: "column", gap: 0,
  },
  cardTop: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 },
  iconBubble: { width: 46, height: 46, borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center" },
  priceBadge: {
    fontFamily: "'Montserrat', sans-serif", fontSize: 11, fontWeight: 700,
    padding: "4px 12px", border: "1px solid", letterSpacing: "0.06em",
  },
  cardTitle: { fontFamily: "'Montserrat', sans-serif", fontSize: 17, fontWeight: 700, color: "#f0e8d8", marginBottom: 8, letterSpacing: "-0.01em" },
  cardDesc: { fontFamily: "'Montserrat', sans-serif", fontSize: 13, color: "#7a7068", lineHeight: 1.7, marginBottom: 18, fontWeight: 300 },
  deliverables: { display: "flex", flexDirection: "column", gap: 6, marginBottom: 20 },
  deliverableItem: { display: "flex", alignItems: "center", gap: 8 },
  deliverableDot: { width: 5, height: 5, borderRadius: "50%", flexShrink: 0 },
  deliverableText: { fontFamily: "'Montserrat', sans-serif", fontSize: 12, color: "#9d9385", fontWeight: 400 },
  cardFooter: { display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: 16, borderTop: "1px solid #ffffff08" },
  duration: { fontFamily: "'Montserrat', sans-serif", fontSize: 11, color: "#4a4438", fontWeight: 500 },
  selectBtn: {
    fontFamily: "'Montserrat', sans-serif", fontSize: 11, fontWeight: 700,
    letterSpacing: "0.08em", textTransform: "uppercase",
    padding: "7px 16px", border: "1px solid",
    cursor: "none", transition: "all 0.25s ease",
  },

  formSection: {
    background: "linear-gradient(135deg, #141210, #0e0d0b)",
    border: "1px solid #c8a96e22",
    boxShadow: "0 0 40px #c8a96e0a",
    padding: "36px",
    marginBottom: 40,
  },
  formHeader: { display: "flex", alignItems: "center", gap: 16, marginBottom: 28, flexWrap: "wrap" },
  formIconBubble: { width: 52, height: 52, borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  formTitle: { fontFamily: "'Montserrat', sans-serif", fontSize: 18, fontWeight: 700, color: "#f0e8d8", marginBottom: 4 },
  formMeta: { fontFamily: "'Montserrat', sans-serif", fontSize: 12, color: "#c8a96e", fontWeight: 500 },
  clearBtn: { marginLeft: "auto", background: "transparent", border: "1px solid #ffffff14", color: "#7a7068", fontFamily: "'Montserrat', sans-serif", fontSize: 11, fontWeight: 600, padding: "6px 14px", cursor: "none", letterSpacing: "0.06em", transition: "all 0.2s" },

  form: { display: "flex", flexDirection: "column", gap: 16 },
  formGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
  field: { display: "flex", flexDirection: "column", gap: 6 },
  label: { fontFamily: "'Montserrat', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#6b6358" },
  err: { fontFamily: "'Montserrat', sans-serif", fontSize: 11, color: "#e05555", paddingLeft: 2 },

  successBox: { display: "flex", flexDirection: "column", alignItems: "center", gap: 12, padding: "40px 0", textAlign: "center" },
  successIcon: { width: 60, height: 60, borderRadius: "50%", background: "#4ade8022", border: "1px solid #4ade8055", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, color: "#4ade80" },
  successTitle: { fontFamily: "'Montserrat', sans-serif", fontSize: 20, fontWeight: 700, color: "#4ade80" },
  successMsg: { fontFamily: "'Montserrat', sans-serif", fontSize: 14, color: "#9d9385", lineHeight: 1.7, maxWidth: 400 },

  note: { display: "flex", alignItems: "center", gap: 12, padding: "20px 24px", border: "1px solid #ffffff08", background: "#0e0d0b08", marginTop: 8 },
  noteDot: { width: 6, height: 6, borderRadius: "50%", background: "#c8a96e", boxShadow: "0 0 8px #c8a96e", flexShrink: 0 },
  noteText: { fontFamily: "'Montserrat', sans-serif", fontSize: 13, color: "#7a7068", fontWeight: 300 },
  noteLink: { color: "#c8a96e", textDecoration: "none", fontWeight: 600 },
};
