import type { CSSProperties } from "react";
import type { ProjectRole } from "@/constants/Projects";

const HEADING: CSSProperties = {
  fontSize: "clamp(0.78rem,1.1vw,0.95rem)",
  fontWeight: 800,
  color: "rgb(255,255,255)",
  marginBottom: "clamp(10px,1.2vw,14px)",
  letterSpacing: "0.04em",
  borderLeft: "3px solid rgba(255,255,255,0.4)",
  paddingLeft: "clamp(8px,1vw,12px)",
};

/** Quiet index, same motion as the home nav rule. No icons, rails, or frames. */
export function WorkMethodTimeline({ items }: { items: ProjectRole[] }) {
  return (
    <div style={{ marginBottom: "clamp(14px,1.6vw,20px)" }}>
      <style>{`
        .wm-rule {
          width: 1.25rem;
          height: 1px;
          margin-top: 0.55rem;
          flex-shrink: 0;
          background: #475569;
          transition: width 150ms, background-color 150ms;
        }
        .wm-part {
          transition: color 150ms;
        }
        .wm-step:hover .wm-rule,
        .wm-step:focus-within .wm-rule {
          width: 2.25rem;
          background: #e2e8f0;
        }
        .wm-step:hover .wm-part,
        .wm-step:focus-within .wm-part {
          color: #e2e8f0;
        }
        @media (prefers-reduced-motion: reduce) {
          .wm-rule, .wm-part { transition: none; }
        }
      `}</style>
      <p style={HEADING}>작업 방식</p>
      <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {items.map((item, idx) => {
          const last = idx === items.length - 1;
          return (
            <li
              key={`${item.part}-${idx}`}
              className="wm-step"
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.9rem",
                padding: "0.85rem 0",
                borderBottom: last ? "none" : "1px solid rgba(148,163,184,0.16)",
              }}
            >
              <span className="wm-rule" aria-hidden="true" />
              <div style={{ minWidth: 0 }}>
                <p
                  className="wm-part"
                  style={{
                    margin: 0,
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    color: "#64748b",
                    lineHeight: 1.3,
                  }}
                >
                  {item.part}
                </p>
                <p
                  style={{
                    margin: "0.35rem 0 0",
                    fontSize: "clamp(0.78rem,1.05vw,0.9rem)",
                    color: "#94a3b8",
                    lineHeight: 1.6,
                  }}
                >
                  {item.detail}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
