// EndCard.tsx
import React from "react";
import { colors, fonts } from "./theme";
import { useSlideUp, useScaleIn, useFadeIn, staggerDelay } from "./animations";
import { Glow, DarkBg } from "./shared";

type Props = {
  title?: string;
  highlight?: string;
  subtitle?: string;
  features?: string[];
};

export const EndCard: React.FC<Props> = ({
  title = "ナレーション作成は",
  highlight = "テキストを打つだけ",
  subtitle = "LocalNarratorTTS — 完全ローカル・API不要・音声データ外部送信なし",
  features = ["ボイスクローン", "完全ローカル", "高速サーバーモード", "バリエーション生成", "長文自動分割"],
}) => {
  const bgFade = useFadeIn(0, 12);
  const logoAnim = useScaleIn(5);
  const titleAnim = useSlideUp(10);
  const subAnim = useSlideUp(18);
  const btnsAnim = useSlideUp(24);

  return (
    <DarkBg>
      <div style={{ opacity: bgFade }}>
        <Glow top={100} left="50%" size={800} />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 24,
          }}
        >
          {/* Logo */}
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: colors.yellow,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 40px rgba(255,214,0,0.2)",
              ...logoAnim,
            }}
          >
            <svg width={36} height={36} viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth={2.5}>
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="22" />
            </svg>
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: 56,
              fontWeight: 900,
              color: colors.text,
              fontFamily: fonts.ja,
              textAlign: "center",
              lineHeight: 1.3,
              letterSpacing: "-0.01em",
              ...titleAnim,
            }}
          >
            {title}
            <br />
            <em style={{ fontStyle: "italic", color: colors.yellow }}>{highlight}</em>
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: 20,
              color: colors.textSub,
              fontFamily: fonts.ja,
              textAlign: "center",
              maxWidth: 600,
              lineHeight: 1.6,
              ...subAnim,
            }}
          >
            {subtitle}
          </div>

          {/* CTA Buttons */}
          <div style={{ display: "flex", gap: 16, marginTop: 12, ...btnsAnim }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "14px 28px",
                borderRadius: 100,
                fontSize: 16,
                fontWeight: 700,
                fontFamily: fonts.ja,
                background: colors.yellow,
                color: "#111",
                boxShadow: "0 4px 20px rgba(255,214,0,0.2)",
              }}
            >
              ▶ チャンネル登録
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "14px 28px",
                borderRadius: 100,
                fontSize: 16,
                fontWeight: 700,
                fontFamily: fonts.ja,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              👍 高評価
            </div>
          </div>

          {/* Feature tags */}
          <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
            {features.map((f, i) => {
              const anim = useSlideUp(staggerDelay(i, 3) + 30);
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: 14,
                    color: colors.textDim,
                    fontFamily: fonts.ja,
                    ...anim,
                  }}
                >
                  <div
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: colors.yellow,
                    }}
                  />
                  {f}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DarkBg>
  );
};
