import type { CSSProperties } from "react";
import type { ProjectRole } from "@/constants/Projects";

const HEADING: CSSProperties = {
  fontSize: "clamp(0.78rem,1.1vw,0.95rem)",
  fontWeight: 800,
  color: "rgb(255,255,255)",
  marginBottom: "clamp(8px,1vw,12px)",
  letterSpacing: "0.04em",
  borderLeft: "3px solid rgba(255,255,255,0.4)",
  paddingLeft: "clamp(8px,1vw,12px)",
};

const PART_STYLE: Record<string, { accent: string; badgeBg: string; badgeText: string }> = {
  Frontend: { accent: "#93c5fd", badgeBg: "rgba(255,255,255,0.1)", badgeText: "#fff" },
  Backend:  { accent: "#86efac", badgeBg: "rgba(255,255,255,0.1)", badgeText: "#fff" },
  Design:   { accent: "#f9a8d4", badgeBg: "rgba(255,255,255,0.1)", badgeText: "#fff" },
  AI:       { accent: "#c4b5fd", badgeBg: "rgba(255,255,255,0.1)", badgeText: "#fff" },
  DevOps:   { accent: "#fcd34d", badgeBg: "rgba(255,255,255,0.1)", badgeText: "#fff" },
};

const FALLBACK = { accent: "#94a3b8", badgeBg: "rgba(255,255,255,0.1)", badgeText: "#fff" };

/** Original 담당 파트 cards. Do not reuse for 작업 방식. */
export function RolesList({ items }: { items: ProjectRole[] }) {
  return (
    <div style={{ marginBottom: "clamp(14px,1.6vw,20px)" }}>
      <p style={HEADING}>담당 파트</p>
      <div style={{ display: "flex", flexDirection: "column", gap: "clamp(6px,0.8vw,9px)" }}>
        {items.map(({ part, detail }, idx) => {
          const s = PART_STYLE[part] ?? FALLBACK;
          return (
            <div
              key={`${part}-${idx}`}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "clamp(10px,1.2vw,14px)",
                padding: "clamp(9px,1.1vw,13px) clamp(13px,1.5vw,17px)",
                borderRadius: 10,
                backgroundColor: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderLeft: `4px solid ${s.accent}`,
                boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
              }}
            >
              <span
                style={{
                  flexShrink: 0,
                  marginTop: 2,
                  fontSize: "clamp(0.62rem,0.85vw,0.76rem)",
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  padding: "3px 10px",
                  borderRadius: 6,
                  backgroundColor: s.badgeBg,
                  color: s.badgeText,
                  whiteSpace: "nowrap",
                  textTransform: "uppercase",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                {part}
              </span>
              <span
                style={{
                  fontSize: "clamp(0.82rem,1.15vw,0.95rem)",
                  color: "rgb(203,213,225)",
                  lineHeight: 1.65,
                }}
              >
                {detail}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
