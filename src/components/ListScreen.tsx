// ListScreen.tsx
import React from "react";
import { colors, fonts, sizes } from "./theme";
import { useSlideUp, useFadeIn, staggerDelay } from "./animations";
import { Glow, YellowRule, DarkBg } from "./shared";

type ListItem = { label: string };

type Props = {
  variant: "list" | "tags";
  header?: string;
  items: ListItem[];
  transparent?: boolean;
};

export const ListScreen: React.FC<Props> = ({
  variant,
  header,
  items,
  transparent = false,
}) => {
  const bgFade = useFadeIn(0, 12);

  const tagAnims = [
    useSlideUp(staggerDelay(0, 6) + 5),
    useSlideUp(staggerDelay(1, 6) + 5),
    useSlideUp(staggerDelay(2, 6) + 5),
    useSlideUp(staggerDelay(3, 6) + 5),
    useSlideUp(staggerDelay(4, 6) + 5),
    useSlideUp(staggerDelay(5, 6) + 5),
    useSlideUp(staggerDelay(6, 6) + 5),
    useSlideUp(staggerDelay(7, 6) + 5),
  ];

  if (variant === "tags") {
    return (
      <DarkBg transparent={transparent}>
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
              gap: 24,
              justifyContent: "center",
              maxWidth: 1400,
            }}
          >
            {items.map((item, i) => {
              return (
                <div
                  key={i}
                  style={{
                    background: colors.bgCard,
                    border: `1px solid ${colors.border}`,
                    borderRadius: 100,
                    padding: "24px 48px",
                    fontSize: 56,
                    fontWeight: 600,
                    color: colors.text,
                    fontFamily: fonts.ja,
                    whiteSpace: "nowrap",
                    ...tagAnims[i],
                  }}
                >
                  {item.label}
                </div>
              );
            })}
          </div>
        </div>
      </DarkBg>
    );
  }

  // variant === "list"
  return (
    <DarkBg transparent={transparent}>
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
            const anim = tagAnims[i] ?? tagAnims[0];
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
