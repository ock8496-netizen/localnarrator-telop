// Comparison.tsx
import React from "react";
import { colors, fonts } from "./theme";
import { useSlideUp, useScaleIn, useFadeIn, staggerDelay } from "./animations";
import { Glow, DarkBg } from "./shared";

type Props = {
  beforeLabel?: string;
  beforeValue: number;
  beforeUnit?: string;
  afterLabel?: string;
  afterValue: number;
  afterUnit?: string;
  speedup?: string; // "最大60%高速化"
};

export const Comparison: React.FC<Props> = ({
  beforeLabel = "通常モード",
  beforeValue,
  beforeUnit = "秒",
  afterLabel = "サーバーモード",
  afterValue,
  afterUnit = "秒",
  speedup = "最大60%高速化",
}) => {
  const bgFade = useFadeIn(0, 12);
  const leftAnim = useSlideUp(8);
  const arrowAnim = useScaleIn(18);
  const rightAnim = useSlideUp(26);

  const boxBase: React.CSSProperties = {
    width: 520,
    borderRadius: 20,
    padding: 48,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <DarkBg>
      <div style={{ opacity: bgFade }}>
        <Glow top={50} right={100} />
        <Glow bottom={50} left={200} size={400} />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            alignItems: "stretch",
            gap: 48,
          }}
        >
          {/* Before */}
          <div
            style={{
              ...boxBase,
              background: colors.bgCard,
              border: `1px solid ${colors.border}`,
              ...leftAnim,
            }}
          >
            <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: colors.textDim, marginBottom: 16 }}>
              {beforeLabel}
            </div>
            <div style={{ fontFamily: fonts.en, fontWeight: 900, fontSize: 72, fontStyle: "italic", lineHeight: 1, color: "rgba(255,255,255,0.1)" }}>
              ~{beforeValue}<span style={{ fontSize: 36 }}>{beforeUnit}</span>
            </div>
            <div style={{ fontSize: 17, color: colors.textSub, marginTop: 10 }}>
              1回あたりの生成時間
            </div>
          </div>

          {/* Arrow */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              ...arrowAnim,
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: colors.yellowDim,
                border: `1px solid ${colors.borderYellow}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={colors.yellow} strokeWidth={2.5}>
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </div>
            <div
              style={{
                fontFamily: fonts.mono,
                fontSize: 11,
                color: colors.textDim,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                textAlign: "center",
                lineHeight: 1.4,
              }}
            >
              SERVER<br />MODE
            </div>
          </div>

          {/* After */}
          <div
            style={{
              ...boxBase,
              background: "rgba(255,214,0,0.03)",
              border: `1px solid ${colors.borderYellow}`,
              boxShadow: "0 0 50px rgba(255,214,0,0.06)",
              ...rightAnim,
            }}
          >
            <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: colors.yellow, marginBottom: 16 }}>
              {afterLabel}
            </div>
            <div style={{ fontFamily: fonts.en, fontWeight: 900, fontSize: 72, fontStyle: "italic", lineHeight: 1, color: colors.yellow, textShadow: "0 0 30px rgba(255,214,0,0.15)" }}>
              ~{afterValue}<span style={{ fontSize: 36 }}>{afterUnit}</span>
            </div>
            <div style={{ fontSize: 17, color: colors.textSub, marginTop: 10 }}>
              {speedup}
            </div>
          </div>
        </div>
      </div>
    </DarkBg>
  );
};
