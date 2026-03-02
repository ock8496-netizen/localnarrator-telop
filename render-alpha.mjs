#!/usr/bin/env node
// render-alpha.mjs — ProRes 4444 アルファ付き全件レンダリング
import { execSync } from "child_process";
import { mkdirSync, rmSync, existsSync } from "fs";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const telopsData = require("./src/LocalNarratorTTS_telop_data_v2.json");

const FRAMES_BASE = "./frames_alpha";
const OUTPUT_DIR = "./output_alpha";
mkdirSync(OUTPUT_DIR, { recursive: true });

const activeTelops = telopsData.telops.filter((t) => (t.duration ?? 0) > 0);
console.log(`\n🎬 ProRes 4444 アルファ付き一括レンダリング`);
console.log(`対象: ${activeTelops.length}件\n`);

let success = 0, fail = 0;

for (const telop of activeTelops) {
  const id = String(telop.id).padStart(2, "0");
  const compId = `telop-${telop.id}`;
  const framesDir = `${FRAMES_BASE}/${id}_${telop.type}`;
  const outputFile = `${OUTPUT_DIR}/${id}_${telop.type}.mov`;

  console.log(`[${telop.id}] ${telop.type}: ${telop.text?.slice(0, 30)}`);
  try {
    // Step1: PNGシーケンス出力
    mkdirSync(framesDir, { recursive: true });
    execSync(
      `npx remotion render src/index.ts ${compId} "${framesDir}/" --sequence --image-format=png --props='{"transparent":true}' --gl=angle`,
      { stdio: "pipe" }
    );
    // Step2: ProRes 4444 変換
    execSync(
      `ffmpeg -y -framerate 60 -i "${framesDir}/element-%03d.png" -c:v prores_ks -profile:v 4444 -pix_fmt yuva444p10le "${outputFile}"`,
      { stdio: "pipe" }
    );
    // Step3: フレームフォルダ削除（容量節約）
    rmSync(framesDir, { recursive: true, force: true });
    
    console.log(`  ✅ → ${outputFile}\n`);
    success++;
  } catch (e) {
    console.error(`  ❌ 失敗: ${e.message?.slice(0, 100)}\n`);
    fail++;
  }
}

console.log(`\n完了: 成功 ${success}件 / 失敗 ${fail}件`);
