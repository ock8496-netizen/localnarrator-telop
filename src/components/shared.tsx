// shared.tsx — 共通装飾パーツ
import React from "react";
import { AbsoluteFill } from "remotion";
import { colors, fonts } from "./theme";

/* ━━━ ノイズオーバーレイ（バンディング対策） ━━━
 * SVG feTurbulence による静的ノイズをフレームに載せる
 * opacity を極小にすることでグラデーション帯域を視覚的に破壊する
 */
const NOISE_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'>
  <filter id='n'>
    <feTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/>
    <feColorMatrix type='saturate' values='0'/>
  </filter>
  <rect width='300' height='300' filter='url(%23n)'/>
</svg>`;
const NOISE_URL = `url("data:image/svg+xml,${encodeURIComponent(NOISE_SVG)}")`;

export const NoiseOverlay: React.FC<{ opacity?: number }> = ({ opacity = 0.10 }) => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      zIndex: 9999,
      backgroundImage: NOISE_URL,
      backgroundRepeat: "repeat",
      backgroundSize: "300px 300px",
      opacity,
      pointerEvents: "none",
    }}
  />
);

/* ━━━ グロー球 ━━━
 * 中間ストップを細かく設定してグラデーション自体のバンディングも低減
 */
export const Glow: React.FC<{
  top?: number | string;
  left?: number | string;
  right?: number | string;
  bottom?: number | string;
  size?: number;
}> = ({ top, left, right, bottom, size = 600 }) => (
  <div
    style={{
      position: "absolute",
      top,
      left,
      right,
      bottom,
      width: size,
      height: size,
      borderRadius: "50%",
      background: `radial-gradient(circle,
        rgba(255,214,0,0.10) 0%,
        rgba(255,214,0,0.08) 15%,
        rgba(255,214,0,0.06) 30%,
        rgba(255,214,0,0.04) 45%,
        rgba(255,214,0,0.02) 60%,
        rgba(255,214,0,0.01) 70%,
        transparent 80%)`,
      filter: "blur(80px)",
      pointerEvents: "none",
    }}
  />
);

/* ━━━ タイムライン装飾 ━━━ */
export const TimelineDeco: React.FC = () => (
  <div
    style={{
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: 220,
      background: "linear-gradient(180deg, transparent, rgba(10,10,10,0.98) 40%)",
      pointerEvents: "none",
    }}
  >
    {/* V1 track */}
    <div
      style={{
        position: "absolute",
        left: 72,
        right: 36,
        bottom: 148,
        height: 30,
        borderRadius: 2,
        background:
          "linear-gradient(90deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.12) 30%, transparent 30.5%, transparent 33%, rgba(255,255,255,0.12) 33%, rgba(255,255,255,0.12) 60%, transparent 60.5%, transparent 63%, rgba(255,255,255,0.12) 63%, rgba(255,255,255,0.12) 100%)",
      }}
    />
    {/* V2 track */}
    <div
      style={{
        position: "absolute",
        left: 72,
        right: 36,
        bottom: 112,
        height: 30,
        borderRadius: 2,
        opacity: 0.6,
        background:
          "linear-gradient(90deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.07) 36%, transparent 36.5%, transparent 40%, rgba(255,255,255,0.07) 40%, rgba(255,255,255,0.07) 70%, transparent 70.5%)",
      }}
    />
    {/* A1 track (yellow) */}
    <div
      style={{
        position: "absolute",
        left: 72,
        right: 36,
        bottom: 74,
        height: 26,
        borderRadius: 2,
        background:
          "linear-gradient(90deg, rgba(255,214,0,0.12) 0%, rgba(255,214,0,0.12) 26%, transparent 26.5%, transparent 30%, rgba(255,214,0,0.12) 30%, rgba(255,214,0,0.12) 56%, transparent 56.5%, transparent 60%, rgba(255,214,0,0.12) 60%, rgba(255,214,0,0.12) 86%, transparent 86.5%)",
      }}
    />
    {/* Playhead */}
    <div
      style={{
        position: "absolute",
        bottom: 26,
        left: "44%",
        width: 2,
        height: 190,
        background: colors.red,
        boxShadow: `0 0 8px rgba(239,68,68,0.4)`,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -6,
          left: -5,
          width: 12,
          height: 10,
          background: colors.red,
          clipPath: "polygon(0 0, 100% 0, 50% 80%)",
        }}
      />
    </div>
    {/* Timecode */}
    <div
      style={{
        position: "absolute",
        bottom: 182,
        left: 72,
        fontFamily: fonts.mono,
        fontSize: 11,
        color: colors.textDim,
        display: "flex",
        gap: 100,
      }}
    >
      {["00:00:00:00", "00:00:05:00", "00:00:10:00", "00:00:15:00", "00:00:20:00"].map(
        (tc) => (
          <span key={tc}>{tc}</span>
        )
      )}
    </div>
  </div>
);

/* ━━━ イエロー横線 ━━━ */
export const YellowRule: React.FC<{ width?: string }> = ({ width = "100%" }) => (
  <div
    style={{
      width,
      height: 1,
      background: `linear-gradient(90deg, ${colors.yellow}, transparent 60%)`,
      marginBottom: 16,
    }}
  />
);

/* ━━━ フルスクリーン背景 ━━━ */
export const DarkBg: React.FC<{ children: React.ReactNode; transparent?: boolean }> = ({ children, transparent }) => (
  <AbsoluteFill style={{ background: transparent ? "transparent" : colors.bgPrimary }}>
    {children}
    {!transparent && <NoiseOverlay />}
  </AbsoluteFill>
);
