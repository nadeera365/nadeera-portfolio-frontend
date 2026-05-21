import { FadeIn } from "./ui/FadeIn.jsx";
import { EXPERIENCE } from "../data/index.js";
import { shared } from "../styles/tokens.js";

export default function Experience() {
  return (
    <section id="experience" style={shared.section}>
      <FadeIn>
        <p style={shared.sectionEyebrow}>Career Path</p>
        <h2 style={shared.sectionTitle}>Experience</h2>
      </FadeIn>

      <div style={shared.timeline}>
        {EXPERIENCE.map((e, i) => (
          <FadeIn key={e.role} delay={i * 0.12}>
            <div style={shared.timelineItem}>
              <div style={shared.timelineDot} />
              <div className="timeline-card" style={shared.timelineContent}>
                <div style={shared.timelineBadgeRow}>
                  <span style={{ ...shared.badge, ...shared.badgeWork }}>Work</span>
                  <span style={shared.timelinePeriod}>{e.period}</span>
                </div>
                <h3 style={shared.timelineRole}>{e.role}</h3>
                <p style={shared.timelineCompany}>{e.company}</p>
                <p style={{ ...shared.timelineDesc, marginTop: 10 }}>{e.desc}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
