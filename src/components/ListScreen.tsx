// ListScreen.tsx
import React from "react";
import { Trail } from "@remotion/motion-blur";
import { colors, fonts, sizes } from "./theme";
import { useSlideUp, useFadeIn, staggerDelay } from "./animations";
import { Glow, YellowRule, DarkBg } from "./shared";

type ListItem = { label: string };

type Props = {
  variant: "list" | "tags";
  header?: string;
  items: ListItem[];
};

export const ListScreen: React.FC<Props> = ({
  variant,
  header,
  items,
}) => {
  const bgFade = useFadeIn(0, 12);

  if (variant === "tags") {
    return (
      <DarkBg>
        <div style={{ opacity: bgFade }}>
          <Glow top={200} left="50%" />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              display: "flex",
              flexWrap: "wrap",
              gap: 16,
              justifyContent: "center",
            }}
          >
            {items.map((item, i) => {
              const anim = useSlideUp(staggerDelay(i, 6) + 5);
              return (
                <Trail key={i} layers={3} lagInFrames={2} trailOpacity={0.5}>
                <div
                  style={{
                    background: colors.bgCard,
                    border: `1px solid ${colors.border}`,
                    borderRadius: 100,
                    padding: "14px 28px",
                    fontSize: 20,
                    fontWeight: 600,
                    color: colors.text,
                    fontFamily: fonts.ja,
                    ...anim,
                  }}
                >
                  {item.label}
                </div>
                </Trail>
              );
            })}
          </div>
        </div>
      </DarkBg>
    );
  }

  // variant === "list"
  return (
    <DarkBg>
      <div style={{ opacity: bgFade }}>
        <Glow top={-100} right={100} />
        {/* Header */}
        {header && (
          <div style={{ position: "absolute", top: 56, left: sizes.marginLeft, right: sizes.marginLeft }}>
            <div
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: colors.yellow,
                fontFamily: fonts.ja,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              {header}
            </div>
            <YellowRule />
          </div>
        )}

        {/* Items */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: sizes.marginLeft,
            transform: "translateY(-50%)",
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          {items.map((item, i) => {
            const anim = useSlideUp(staggerDelay(i, 6) + 8);
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 24,
                  ...anim,
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: fonts.mono,
                    fontSize: 16,
                    fontWeight: 700,
                    flexShrink: 0,
                    background: colors.yellowDim,
                    border: `1px solid ${colors.borderYellow}`,
                    color: colors.yellow,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div
                  style={{
                    fontSize: 30,
                    fontWeight: 700,
                    color: colors.text,
                    fontFamily: fonts.ja,
                  }}
                >
                  {item.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DarkBg>
  );
};
