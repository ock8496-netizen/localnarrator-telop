// Root.tsx — LocalNarratorTTS テロップ Root Composition
import React from "react";
import { Composition } from "remotion";
import { TelopComposition } from "./TelopComposition";
import telopsData from "./LocalNarratorTTS_telop_data_v2.json";

const FPS = 30;
const WIDTH = 1920;
const HEIGHT = 1080;

// duration > 0 のテロップのみ登録
const activeTelops = telopsData.telops.filter((t: any) => (t.duration ?? 0) > 0);

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {activeTelops.map((telop: any) => (
        <Composition
          key={`telop-${telop.id}`}
          id={`telop-${String(telop.id).padStart(2, "0")}`}
          component={TelopComposition}
          durationInFrames={Math.round(telop.duration * FPS)}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
          defaultProps={{ telop }}
        />
      ))}
    </>
  );
};
