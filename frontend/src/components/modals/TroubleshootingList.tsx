import type { CSSProperties } from "react";
import type { TroubleshootingItem } from "@/constants/Projects";

const BODY: CSSProperties = {
  fontSize: "clamp(0.72rem,0.95vw,0.82rem)",
  color: "rgb(203,213,225)",
  lineHeight: 1.6,
};

/**
 * Titles stay visible. Body is native <details> so no extra state or scroll-jacking.
 */
export function TroubleshootingList({ items }: { items: TroubleshootingItem[] }) {
  return (
    <>
      <style>{`
        .ts-item > summary { list-style: none; }
        .ts-item > summary::-webkit-details-marker { display: none; }
        .ts-item[open] > summary { margin-bottom: clamp(10px,1.2vw,14px); }
        .ts-item[open] .ts-chevron { transform: rotate(180deg); }
      `}</style>
      <div className="trouble-grid grid" style={{ gap: "clamp(10px,1.2vw,14px)" }}>
        {items.map((item, idx) => (
          <details
            key={`ts-${idx}`}
            className="ts-item"
            style={{
              padding: "clamp(12px,1.4vw,16px) clamp(14px,1.6vw,18px)",
              borderRadius: 14,
              backgroundColor: "rgba(255,255,255,0.05)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
              border: "1px solid rgba(255,255,255,0.1)",
              minWidth: 0,
            }}
          >
            <summary
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                fontSize: "clamp(0.82rem,1.05vw,0.94rem)",
                fontWeight: 800,
                color: "rgb(255,255,255)",
              }}
            >
              <span style={{ flex: 1 }}>{item.title}</span>
              <span
                className="ts-chevron"
                aria-hidden="true"
                style={{
                  flexShrink: 0,
                  color: "rgb(148,163,184)",
                  fontSize: "0.85em",
                  lineHeight: 1.4,
                  transition: "transform 0.15s ease",
                }}
              >
                ▾
              </span>
            </summary>
            <p style={{ ...BODY, marginBottom: "clamp(4px,0.6vw,6px)" }}>
              <strong style={{ color: "rgb(226,232,240)" }}>문제:</strong> {item.problem}
            </p>
            {item.cause && (
              <p style={{ ...BODY, marginBottom: "clamp(4px,0.6vw,6px)" }}>
                <strong style={{ color: "rgb(226,232,240)" }}>원인:</strong> {item.cause}
              </p>
            )}
            <p style={{ ...BODY, marginBottom: item.result || item.metrics ? "clamp(4px,0.6vw,6px)" : 0 }}>
              <strong style={{ color: "rgb(226,232,240)" }}>해결:</strong> {item.solution}
            </p>
            {item.result && (
              <p style={{ ...BODY, marginBottom: item.metrics ? "clamp(4px,0.6vw,6px)" : 0 }}>
                <strong style={{ color: "rgb(226,232,240)" }}>결과:</strong> {item.result}
              </p>
            )}
            {item.metrics && (
              <div
                style={{
                  marginTop: "clamp(12px,1.4vw,16px)",
                  padding: "clamp(12px,1.4vw,16px) clamp(14px,1.6vw,18px)",
                  borderRadius: 10,
                  backgroundColor: "rgba(0,0,0,0.2)",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <p style={{ fontSize: "clamp(0.68rem,0.88vw,0.78rem)", fontWeight: 700, color: "rgb(148,163,184)", marginBottom: 8 }}>
                  {item.metrics.label}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
                  <span style={{ fontSize: "clamp(0.72rem,0.9vw,0.82rem)", color: "rgb(203,213,225)", padding: "4px 8px", borderRadius: 6, backgroundColor: "rgba(255,255,255,0.08)" }}>
                    Before {item.metrics.before}
                  </span>
                  <span style={{ color: "rgb(148,163,184)", fontWeight: 700 }}>➔</span>
                  <span style={{ fontSize: "clamp(0.72rem,0.9vw,0.82rem)", fontWeight: 700, padding: "4px 8px", borderRadius: 6, backgroundColor: "rgba(34,197,94,0.2)", color: "#4ade80" }}>
                    After {item.metrics.after}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: "clamp(0.78rem,1vw,0.88rem)", fontWeight: 800, color: "#4ade80" }}>
                    ⬇ {item.metrics.improvementPercent}% 개선
                  </span>
                </div>
                <div style={{ marginTop: 8, height: 8, borderRadius: 4, backgroundColor: "rgba(255,255,255,0.1)", overflow: "hidden", display: "flex" }}>
                  <div style={{ width: `${100 - item.metrics.improvementPercent}%`, height: "100%", backgroundColor: "#22c55e" }} />
                  <div style={{ width: `${item.metrics.improvementPercent}%`, height: "100%", backgroundColor: "rgba(255,255,255,0.08)" }} />
                </div>
              </div>
            )}
          </details>
        ))}
      </div>
    </>
  );
}
