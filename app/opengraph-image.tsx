import { ImageResponse } from "next/og";
import { liveTools } from "@/lib/tools";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "UIYard — free design tools that run in your browser. No signup, nothing uploaded.";

// Category colours — the share card shows the variety, not one theme.
const SWATCHES = ["#f5643c", "#f2a63d", "#7fa650", "#2563eb", "#d85e86"];

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background:
            "radial-gradient(900px 500px at 18% 10%, #16233f, #0d0d10 65%)",
          color: "#ececee",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <svg width="84" height="84" viewBox="0 0 100 100">
            <path d="M34 36 A16 16 0 0 1 66 36 L50 43 Z" fill="#f5643c" />
            <path d="M28 38 L50 48 L72 38 L72 50 L50 60 L28 50 Z" fill="#f5643c" />
            <path d="M28 54 L50 64 L72 54 L72 66 L50 76 L28 66 Z" fill="#f5643c" />
          </svg>
          <div style={{ display: "flex", fontSize: 56, fontWeight: 700 }}>
            UIYard
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              display: "flex",
              fontSize: 68,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            All design tools, in one yard.
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#a2a2ab" }}>
            {liveTools.length} free tools · no signup · nothing uploaded
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 10,
              padding: 16,
              borderRadius: 20,
              background: "#18181d",
              boxShadow: "0 0 60px rgba(37,99,235,0.3)",
            }}
          >
            {SWATCHES.map((c) => (
              <div
                key={c}
                style={{
                  display: "flex",
                  width: 54,
                  height: 72,
                  borderRadius: 12,
                  background: c,
                }}
              />
            ))}
          </div>
          <div style={{ display: "flex", fontSize: 28, color: "#7fa9ff" }}>
            uiyard.com
          </div>
        </div>
      </div>
    ),
    size
  );
}
