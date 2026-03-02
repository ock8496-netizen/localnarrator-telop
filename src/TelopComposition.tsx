// TelopComposition.tsx — テロップJSONからコンポーネントを動的にレンダリング
import React from "react";
import { Audio, staticFile } from "remotion";
import { Impact } from "./components/Impact";
import { SectionTitle } from "./components/SectionTitle";
import { InfoBar } from "./components/InfoBar";
import { Note } from "./components/Note";
import { ListScreen } from "./components/ListScreen";
import { Comparison } from "./components/Comparison";
import { EndCard } from "./components/EndCard";

type Telop = {
  id: number;
  type: string;
  text: string;
  alpha: boolean;
  duration: number;
  component: string;
  props: Record<string, any>;
};

/** コンポーネント種別ごとのSEマッピング */
const SE_MAP: Record<string, { file: string; startFrom?: number; volume?: number }> = {
  Impact:       { file: "se/impact.mp3",       volume: 1.0 },
  SectionTitle: { file: "se/swoosh.mp3",        volume: 0.85 },
  InfoBar:      { file: "se/pop.mp3",           volume: 0.8 },
  Note:         { file: "se/notification.mp3",  volume: 0.7 },
  ListScreen:   { file: "se/swoosh.mp3",        volume: 0.75 },
  Comparison:   { file: "se/reveal.mp3",        volume: 0.9 },
  EndCard:      { file: "se/chime.mp3",         volume: 0.85 },
};

export const TelopComposition: React.FC<{ telop: Telop }> = ({ telop }) => {
  const { component, text, props } = telop;
  const se = SE_MAP[component];

  const seAudio = se ? (
    <Audio
      src={staticFile(se.file)}
      startFrom={0}
      volume={se.volume ?? 1.0}
    />
  ) : null;

  const renderComponent = () => {
    switch (component) {
      case "Impact":
        return <Impact text={text} {...props} />;

      case "SectionTitle":
        return <SectionTitle label={text} {...props} />;

      case "InfoBar":
        return <InfoBar text={text} {...props} />;

      case "Note":
        return <Note text={text} {...props} />;

      case "ListScreen":
        return <ListScreen {...props} />;

      case "Comparison": {
        const before = props.before ?? 25;
        const after = props.after ?? 10;
        const speedup = props.speedup ?? "最大60%高速化";
        return <Comparison beforeValue={before} afterValue={after} speedup={speedup} />;
      }

      case "EndCard":
        return <EndCard {...props} />;

      default:
        return (
          <div style={{ background: "#111", color: "#FFD600", display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", fontSize: 32, fontFamily: "sans-serif" }}>
            Unknown component: {component}
          </div>
        );
    }
  };

  return (
    <>
      {seAudio}
      {renderComponent()}
    </>
  );
};
