// Impact.tsx
import React from "react";
import { Trail } from "@remotion/motion-blur";
import { colors, fonts } from "./theme";
import { useSlideUp, useFadeIn } from "./animations";
import { Glow, TimelineDeco, DarkBg } from "./shared";

type Props = {
  text: string;
  size?: "xl" | "l";
  highlight?: string; // イエロー＋イタリックにする部分
  sub?: string;
  showTimeline?: boolean;
};

// 助詞・接続詞などの短い文字を中間行に分離するパターン
const SPLIT_PARTICLES = ["で", "が", "を", "に", "は", "も", "と", "の"];

export const Impact: React.FC<Props> = ({
  text,
  size = "xl",
  highlight,
  sub,
  showTimeline = false,
}) => {
  const bgFade = useFadeIn(0, 12);
  const line1Anim = useSlideUp(6);
  const line2Anim = useSlideUp(12);
  const line3Anim = useSlideUp(18);
  const subAnim = useSlideUp(22);
  const fontSize = size === "xl" ? 88 : 56;
  const lineHeight = size === "xl" ? 1.15 : 1.2;

  /**
   * 2行レイアウト:
   *   Line 1: highlight より前のテキスト（白）
   *   Line 2: highlight（イエロー＋イタリック）
   */
  const renderLines = () => {
    if (!highlight) {
      return (
        <h1 style={{ fontSize, fontWeight: 900, color: colors.text, fontFamily: fonts.ja, lineHeight, letterSpacing: "-0.02em", margin: 0, textAlign: "center", ...line1Anim }}>
          {text}
        </h1>
      );
    }

    const idx = text.indexOf(highlight);
    if (idx === -1) {
      return (
        <h1 style={{ fontSize, fontWeight: 900, color: colors.text, fontFamily: fonts.ja, lineHeight, letterSpacing: "-0.02em", margin: 0, textAlign: "center", ...line1Anim }}>
          {text}
        </h1>
      );
    }

    const prefix = text.slice(0, idx);
    const suffix = text.slice(idx + highlight.length);

    return (
      <>
        {/* Line 1: prefix */}
        {prefix && (
          <h1 style={{ fontSize, fontWeight: 900, color: colors.text, fontFamily: fonts.ja, lineHeight, letterSpacing: "-0.02em", margin: 0, textAlign: "center", ...line1Anim }}>
            {prefix}
          </h1>
        )}
        {/* Line 2: highlight（イエロー＋イタリック） */}
        <h1 style={{ fontSize, fontWeight: 900, color: colors.yellow, fontFamily: fonts.ja, fontStyle: "italic", lineHeight, letterSpacing: "-0.02em", margin: 0, textAlign: "center", textShadow: `0 0 60px rgba(255,214,0,0.25)`, ...line3Anim }}>
          {highlight}
        </h1>
        {suffix && (
          <h1 style={{ fontSize: fontSize * 0.7, fontWeight: 700, color: colors.textSub, fontFamily: fonts.ja, lineHeight: 1.2, margin: 0, textAlign: "center", ...subAnim }}>
            {suffix}
          </h1>
        )}
      </>
    );
  };

  return (
    <DarkBg>
      <div style={{ opacity: bgFade }}>
        {/* メイングロー：中央上 */}
        <Glow top={-60} left="30%" size={700} />
        <Glow top={200} right="10%" size={400} />

        {/* 左上：細い装飾ライン */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: 3,
          background: `linear-gradient(90deg, transparent, ${colors.yellow} 20%, ${colors.yellow} 40%, transparent)`,
        }} />

        {/* 左端縦バー */}
        <div style={{
          position: "absolute",
          top: "20%",
          left: 0,
          width: 3,
          height: "60%",
          background: `linear-gradient(180deg, transparent, ${colors.yellow} 30%, ${colors.yellow} 70%, transparent)`,
        }} />

        {/* 右端縦バー */}
        <div style={{
          position: "absolute",
          top: "20%",
          right: 0,
          width: 3,
          height: "60%",
          background: `linear-gradient(180deg, transparent, ${colors.yellow} 30%, ${colors.yellow} 70%, transparent)`,
        }} />

        {/* コーナー装飾：左上 */}
        <div style={{ position: "absolute", top: 48, left: 64, display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ width: 40, height: 2, background: colors.yellow, opacity: 0.6 }} />
          <div style={{ width: 24, height: 2, background: colors.yellow, opacity: 0.3 }} />
        </div>

        {/* コーナー装飾：右下 */}
        <div style={{ position: "absolute", bottom: showTimeline ? 240 : 48, right: 64, display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end" }}>
          <div style={{ width: 40, height: 2, background: colors.yellow, opacity: 0.3 }} />
          <div style={{ width: 24, height: 2, background: colors.yellow, opacity: 0.6 }} />
        </div>

        {showTimeline && <TimelineDeco />}

        {/* テキストブロック */}
        <Trail layers={4} lagInFrames={2} trailOpacity={0.5}>
        <div
          style={{
            position: "absolute",
            top: showTimeline ? "42%" : "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            width: "100%",
            maxWidth: 1400,
            padding: "0 60px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 0,
          }}
        >
          {renderLines()}
          {sub && (
            <p
              style={{
                marginTop: 24,
                fontSize: 22,
                color: colors.textSub,
                lineHeight: 1.6,
                fontFamily: fonts.ja,
                ...subAnim,
              }}
            >
              {sub}
            </p>
          )}
        </div>
        </Trail>
      </div>
    </DarkBg>
  );
};
