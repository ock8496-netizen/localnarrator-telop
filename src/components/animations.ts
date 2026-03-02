// animations.ts — Remotion animation helpers
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/** フェードイン（opacity 0→1） */
export const useFadeIn = (delay = 0, duration = 12) => {
  const frame = useCurrentFrame();
  return interpolate(frame - delay, [0, duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
};

/** 下からスライドイン */
export const useSlideUp = (delay = 0, distance = 40) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 15, stiffness: 120, mass: 0.8 },
  });
  return {
    opacity: progress,
    transform: `translateY(${interpolate(progress, [0, 1], [distance, 0])}px)`,
  };
};

/** 左からスライドイン */
export const useSlideLeft = (delay = 0, distance = 60) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 100, mass: 0.8 },
  });
  return {
    opacity: progress,
    transform: `translateX(${interpolate(progress, [0, 1], [-distance, 0])}px)`,
  };
};

/** 右からスライドイン（大数字用） */
export const useSlideRight = (delay = 0, distance = 80) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 18, stiffness: 80, mass: 1.2 },
  });
  return {
    opacity: interpolate(progress, [0, 1], [0, 0.06]),
    transform: `translateX(${interpolate(progress, [0, 1], [distance, 0])}px)`,
  };
};

/** スケールイン（ボタン・アイコン用） */
export const useScaleIn = (delay = 0) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 10, stiffness: 150, mass: 0.6 },
  });
  return {
    opacity: progress,
    transform: `scale(${interpolate(progress, [0, 1], [0.8, 1])})`,
  };
};

/** プログレスバー伸長 */
export const useProgressBar = (percentage: number, delay = 0, duration = 20) => {
  const frame = useCurrentFrame();
  const width = interpolate(frame - delay, [0, duration], [0, percentage], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return `${width}%`;
};

/** スタッガー遅延（リスト用） */
export const staggerDelay = (index: number, interval = 5) => index * interval;
