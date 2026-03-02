// Note.tsx
import React from "react";
import { AbsoluteFill } from "remotion";
import { colors, fonts, sizes } from "./theme";
import { useFadeIn } from "./animations";

type Props = {
  text: string;
  position?: "bottom-right" | "bottom-center";
  prefix?: string; // "※" など
};

export const Note: React.FC<Props> = ({
  text,
  position = "bottom-right",
  prefix,
}) => {
  const fade = useFadeIn(5, 10);

  const posStyle: React.CSSProperties =
    position === "bottom-right"
      ? { bottom: sizes.marginBottom, right: 64 }
      : { bottom: sizes.marginBottom, left: "50%", transform: "translateX(-50%)" };

  return (
    <AbsoluteFill style={{ background: "transparent" }}>
      <div
        style={{
          position: "absolute",
          ...posStyle,
          background: "rgba(10,10,10,0.85)",
          backdropFilter: "blur(16px)",
          border: `1px solid ${colors.border}`,
          borderRadius: 10,
          padding: "12px 20px",
          fontSize: 20,
          color: colors.textSub,
          fontWeight: 400,
          fontFamily: fonts.ja,
          opacity: fade,
        }}
      >
        {prefix && (
          <span style={{ color: colors.yellow, marginRight: 6, fontWeight: 600 }}>
            {prefix}
          </span>
        )}
        {text}
      </div>
    </AbsoluteFill>
  );
};
