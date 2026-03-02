// theme.ts — DARK YELLOW Design Tokens
// フォントはここを変更するだけで全コンポーネントに反映されます

export const fonts = {
  ja: "'Noto Sans JP', sans-serif", // ← 差し替えポイント（例: 'Zen Kaku Gothic New'）
  en: "'Inter', sans-serif",
  mono: "'JetBrains Mono', monospace",
};

export const colors = {
  bgDeep: "#0a0a0a",
  bgPrimary: "#111111",
  bgCard: "#1a1a1a",
  bgCardHover: "#222222",
  border: "rgba(255,255,255,0.08)",
  borderYellow: "rgba(255,215,0,0.25)",
  borderYellowStrong: "rgba(255,215,0,0.5)",
  yellow: "#FFD600",
  yellowLight: "#FFEB3B",
  yellowDim: "rgba(255,214,0,0.15)",
  yellowGlow: "rgba(255,214,0,0.08)",
  text: "#F0F0F0",
  textSub: "rgba(255,255,255,0.45)",
  textDim: "rgba(255,255,255,0.18)",
  red: "#ef4444",
};

export const sizes = {
  frame: { width: 1920, height: 1080 },
  marginLeft: 80,
  marginBottom: 52,
  cardRadius: 20,
  pillRadius: 100,
  iconSize: 36,
};
