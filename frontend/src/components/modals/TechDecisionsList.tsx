import type { CSSProperties } from "react";
import type { TechDecisionItem } from "@/constants/Projects";

const HEADING: CSSProperties = {
  fontSize: "clamp(0.78rem,1.1vw,0.95rem)",
  fontWeight: 800,
  color: "rgb(255,255,255)",
  marginBottom: "clamp(10px,1.2vw,14px)",
  letterSpacing: "0.04em",
  borderLeft: "3px solid rgba(255,255,255,0.4)",
  paddingLeft: "clamp(8px,1vw,12px)",
};

/** Same row language as the work-method list. Shared by every project modal. */
export function TechDecisionsList({ items }: { items: TechDecisionItem[] }) {
  return (
    <div style={{ marginTop: "clamp(16px,2vw,24px)" }}>
      <style>{`
        .td-rule {
          width: 1.25rem;
          height: 1px;
          margin-top: 0.55rem;
          flex-shrink: 0;
          background: #475569;
          transition: width 150ms, background-color 150ms;
        }
        .td-title {
          transition: color 150ms;
        }
        .td-step:hover .td-rule,
        .td-step:focus-within .td-rule {
          width: 2.25rem;
          background: #e2e8f0;
        }
        .td-step:hover .td-title,
        .td-step:focus-within .td-title {
          color: #f8fafc;
        }
        @media (prefers-reduced-motion: reduce) {
          .td-rule, .td-title { transition: none; }
        }
      `}</style>
      <p style={HEADING}>기술적 의사결정</p>
      <div>
        {items.map((item, idx) => {
          const last = idx === items.length - 1;
          return (
            <div
              key={`td-${idx}`}
              className="td-step"
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.9rem",
                padding: "0.85rem 0",
                borderBottom: last ? "none" : "1px solid rgba(148,163,184,0.16)",
              }}
            >
              <span className="td-rule" aria-hidden="true" />
              <div style={{ minWidth: 0 }}>
                <p
                  className="td-title"
                  style={{
                    margin: 0,
                    fontSize: "clamp(0.84rem,1.05vw,0.95rem)",
                    fontWeight: 500,
                    color: "#e2e8f0",
                    lineHeight: 1.4,
                  }}
                >
                  {item.title}
                </p>
                <p
                  style={{
                    margin: "0.4rem 0 0",
                    fontSize: "clamp(0.78rem,1.05vw,0.9rem)",
                    color: "#94a3b8",
                    lineHeight: 1.65,
                  }}
                >
                  {item.detail}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
