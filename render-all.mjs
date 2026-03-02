#!/usr/bin/env node
// render-all.mjs — 全テロップ一括レンダリング（SE付き MP4）
import { execSync } from "child_process";
import { mkdirSync } from "fs";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const telopsData = require("./src/LocalNarratorTTS_telop_data_v2.json");

const OUTPUT_DIR = "./output";
mkdirSync(OUTPUT_DIR, { recursive: true });

const activeTelops = telopsData.telops.filter((t) => (t.duration ?? 0) > 0);

console.log(`\n🎬 LocalNarratorTTS テロップ一括レンダリング（SE付き・MP4）`);
console.log(`対象: ${activeTelops.length}件\n`);

let success = 0;
let fail = 0;

for (const telop of activeTelops) {
  const id = String(telop.id).padStart(2, "0");
  const compId = `telop-${id}`;
  const outputFile = `${OUTPUT_DIR}/${id}_${telop.type}.mp4`;

  console.log(`[${id}] ${telop.text.slice(0, 40)}...`);

  try {
    execSync(
      `npx remotion render src/index.ts ${compId} "${outputFile}" --codec=h264 --crf=16`,
      { stdio: "inherit" }
    );
    success++;
    console.log(`  ✅ → ${outputFile}\n`);
  } catch (e) {
    fail++;
    console.error(`  ❌ 失敗\n`);
  }
}

console.log(`\n完了: 成功 ${success}件 / 失敗 ${fail}件`);
