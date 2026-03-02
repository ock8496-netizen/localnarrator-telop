// InfoBar.tsx
import React from "react";
import { AbsoluteFill } from "remotion";
import { colors, fonts, sizes } from "./theme";
import { useSlideLeft, useFadeIn } from "./animations";
import { Glow, DarkBg } from "./shared";

type Props = {
  text: string;
  size?: "xl" | "l" | "m" | "s";
  codes?: string[]; // モノスペース＋イエローで表示する部分
  centered?: boolean; // trueならフルスクリーン中央配置
  transparent?: boolean;
};

export const InfoBar: React.FC<Props> = ({
  text,
  size = "m",
  codes = [],
  centered = false,
  transparent = false,
}) => {
  const slideAnim = useSlideLeft(5);
  const fontSize = size === "xl" ? 44 : size === "l" ? 36 : size === "m" ? 28 : 24;
  const padding = size === "xl" ? "24px 48px 24px 36px" : size === "l" ? "20px 40px 20px 30px" : size === "m" ? "16px 32px 16px 24px" : "12px 28px 12px 20px";
  const iconSize = size === "xl" ? 52 : size === "l" ? 44 : size === "m" ? 36 : 32;

  /** テキスト内の codes 部分をハイライト */
  const renderText = () => {
    if (codes.length === 0) return text;
    let result: React.ReactNode[] = [];
    let remaining = text;
    let key = 0;

    for (const code of codes) {
      const idx = remaining.indexOf(code);
      if (idx === -1) continue;
      if (idx > 0) result.push(<span key={key++}>{remaining.slice(0, idx)}</span>);
      result.push(
        <span
          key={key++}
          style={{
            fontFamily: fonts.mono,
            fontSize: fontSize - 2,
            fontWeight: 500,
            background: colors.yellowDim,
            border: `1px solid ${colors.borderYellow}`,
            borderRadius: 5,
            padding: "2px 10px",
            color: colors.yellow,
          }}
        >
          {code}
        </span>
      );
      remaining = remaining.slice(idx + code.length);
    }
    if (remaining) result.push(<span key={key++}>{remaining}</span>);
    return result;
  };

  const bar = (
    <div style={{ display: "flex", alignItems: "stretch", ...slideAnim }}>
      {/* Yellow bar */}
      <div
        style={{
          width: 3,
          background: colors.yellow,
          flexShrink: 0,
        }}
      />
      {/* Body */}
      <div
        style={{
          background: centered ? colors.bgCard : "rgba(10,10,10,0.92)",
          backdropFilter: centered ? "none" : "blur(20px)",
          border: `1px solid ${colors.border}`,
          borderLeft: "none",
          borderRadius: "0 12px 12px 0",
          padding,
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: iconSize,
            height: iconSize,
            borderRadius: 10,
            background: colors.yellowDim,
            border: `1px solid ${colors.borderYellow}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <svg
            width={iconSize * 0.5}
            height={iconSize * 0.5}
            viewBox="0 0 24 24"
            fill="none"
            stroke={colors.yellow}
            strokeWidth={2}
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
        </div>
        {/* Text */}
        <div
          style={{
            fontSize,
            fontWeight: 500,
            color: colors.text,
            fontFamily: fonts.ja,
          }}
        >
          {renderText()}
        </div>
      </div>
    </div>
  );

  if (centered) {
    return (
      <DarkBg transparent={transparent}>
        <Glow top={200} left={400} />
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {bar}
        </div>
      </DarkBg>
    );
  }

  // ローワーサード
  return (
    <AbsoluteFill style={{ background: "transparent" }}>
      <div
        style={{
          position: "absolute",
          bottom: sizes.marginBottom,
          left: 64,
        }}
      >
        {bar}
      </div>
    </AbsoluteFill>
  );
};
