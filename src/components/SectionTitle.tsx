// SectionTitle.tsx
import React from "react";
import { AbsoluteFill } from "remotion";
import { Trail } from "@remotion/motion-blur";
import { colors, fonts, sizes } from "./theme";
import { useSlideUp, useSlideRight, useProgressBar, useFadeIn } from "./animations";
import { Glow, TimelineDeco, YellowRule, DarkBg } from "./shared";

type Props = {
  variant: "step" | "plain";
  label: string;
  highlight?: string; // イエローにする部分
  step?: number;
  total?: number;
  showTimeline?: boolean;
};

export const SectionTitle: React.FC<Props> = ({
  variant,
  label,
  highlight,
  step,
  total = 6,
  showTimeline = false,
}) => {
  const pillAnim = useSlideUp(5);
  const titleAnim = useSlideUp(10);
  const bigNumAnim = useSlideRight(0);
  const bgFade = useFadeIn(0, 12);
  const progressWidth = useProgressBar(
    step ? (step / total) * 100 : 0,
    15,
    20
  );

  const renderTitle = () => {
    if (!highlight) return label;
    const idx = label.indexOf(highlight);
    if (idx === -1) return label;
    return (
      <>
        {label.slice(0, idx)}
        <span style={{ color: colors.yellow }}>{highlight}</span>
        {label.slice(idx + highlight.length)}
      </>
    );
  };

  if (variant === "plain") {
    return (
      <DarkBg>
        <div style={{ opacity: bgFade }}>
          {/* グロー：右上 大 + 左下 小 */}
          <Glow top={-160} right={-80} size={700} />
          <Glow bottom={-80} left={120} size={320} />

          {/* 右端：縦の黄色シェイプ（太いバー） */}
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: 6,
              height: "100%",
              background: `linear-gradient(180deg, transparent 0%, ${colors.yellow} 30%, ${colors.yellow} 70%, transparent 100%)`,
            }}
          />

          {/* 左端：細い黄色ライン */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: 0,
              width: 3,
              height: 200,
              transform: "translateY(-50%)",
              background: `linear-gradient(180deg, transparent, ${colors.yellow} 40%, ${colors.yellow} 60%, transparent)`,
            }}
          />

          {/* 背景：大きな英字ウォーターマーク */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              right: 80,
              transform: "translateY(-50%)",
              fontFamily: fonts.en,
              fontSize: 320,
              fontWeight: 900,
              fontStyle: "italic",
              color: "rgba(255,214,0,0.04)",
              lineHeight: 1,
              letterSpacing: "-0.05em",
              userSelect: "none",
            }}
          >
            SECTION
          </div>

          {/* コンテンツ */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: sizes.marginLeft,
              ...titleAnim,
            }}
          >
            {/* ラベル小文字 */}
            <div
              style={{
                fontFamily: fonts.mono,
                fontSize: 13,
                fontWeight: 700,
                color: colors.yellow,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginBottom: 16,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              {/* 短い黄色バー */}
              <div
                style={{
                  width: 32,
                  height: 2,
                  background: colors.yellow,
                  borderRadius: 2,
                }}
              />
              SECTION
            </div>

            {/* メイン見出し */}
            <h2
              style={{
                fontSize: 80,
                fontWeight: 900,
                color: colors.text,
                fontFamily: fonts.ja,
                letterSpacing: "-0.01em",
                lineHeight: 1.1,
                margin: 0,
              }}
            >
              {label.includes("・") || label.includes("／") ? (
                // スラッシュ・中点で改行
                label.split(/([・／])/).map((part, i) => (
                  <React.Fragment key={i}>
                    {i > 0 && i % 2 === 0 && <br />}
                    {part === "・" || part === "／" ? (
                      <span style={{ color: colors.yellow, margin: "0 4px" }}>{part}</span>
                    ) : (
                      part
                    )}
                  </React.Fragment>
                ))
              ) : (
                label
              )}
            </h2>

            {/* 下線：グラデーション横線 */}
            <div
              style={{
                marginTop: 24,
                width: 480,
                height: 2,
                background: `linear-gradient(90deg, ${colors.yellow}, rgba(255,214,0,0.3) 60%, transparent)`,
                borderRadius: 2,
              }}
            />
          </div>

          {/* 右下：黄色の四角形シェイプ装飾 */}
          <div
            style={{
              position: "absolute",
              bottom: 64,
              right: 80,
              display: "flex",
              gap: 8,
              alignItems: "flex-end",
            }}
          >
            <div style={{ width: 8, height: 24, background: colors.yellow, borderRadius: 2, opacity: 0.8 }} />
            <div style={{ width: 8, height: 48, background: colors.yellow, borderRadius: 2, opacity: 0.5 }} />
            <div style={{ width: 8, height: 16, background: colors.yellow, borderRadius: 2, opacity: 0.3 }} />
          </div>
        </div>
      </DarkBg>
    );
  }

  // variant === "step"
  const stepStr = String(step).padStart(2, "0");
  return (
    <DarkBg>
      <div style={{ opacity: bgFade }}>
        <Glow top={-200} right={-100} />
        <Glow top={undefined} bottom={-100} left={200} size={400} />
        {showTimeline && <TimelineDeco />}

        {/* 右上 大数字 */}
        <div
          style={{
            position: "absolute",
            top: -20,
            right: 64,
            fontFamily: fonts.en,
            fontSize: 280,
            fontWeight: 900,
            fontStyle: "italic",
            lineHeight: 1,
            color: `rgba(255,214,0,0.06)`,
            ...bigNumAnim,
          }}
        >
          {stepStr}
        </div>

        {/* コンテンツ */}
        <Trail layers={3} lagInFrames={2} trailOpacity={0.5}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: sizes.marginLeft,
            transform: "translateY(-50%)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginBottom: 20,
              ...pillAnim,
            }}
          >
            <div
              style={{
                background: colors.yellowDim,
                border: `1px solid ${colors.borderYellow}`,
                borderRadius: 100,
                padding: "7px 20px",
                fontFamily: fonts.mono,
                fontSize: 13,
                fontWeight: 700,
                color: colors.yellow,
                letterSpacing: "0.1em",
              }}
            >
              STEP {stepStr}
            </div>
            <div
              style={{
                fontFamily: fonts.mono,
                fontSize: 13,
                color: colors.textDim,
                letterSpacing: "0.05em",
              }}
            >
              / {String(total).padStart(2, "0")}
            </div>
          </div>

          <h2
            style={{
              fontSize: 60,
              fontWeight: 900,
              color: colors.text,
              fontFamily: fonts.ja,
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              margin: 0,
              ...titleAnim,
            }}
          >
            {renderTitle()}
          </h2>
        </div>
        </Trail>

        {/* プログレスバー */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 3,
            background: "rgba(255,255,255,0.04)",
          }}
        >
          <div
            style={{
              height: "100%",
              width: progressWidth,
              background: colors.yellow,
              borderRadius: "0 2px 2px 0",
            }}
          />
        </div>
      </div>
    </DarkBg>
  );
};
