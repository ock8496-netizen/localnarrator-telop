#!/usr/bin/env node
// render-all.mjs — 全テロップ一括レンダリング（SE付き ProRes4444 アルファ付き）
import { execSync } from "child_process";
import { mkdirSync } from "fs";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const telopsData = require("./src/LocalNarratorTTS_telop_data_v2.json");

const OUTPUT_DIR = "./output";
mkdirSync(OUTPUT_DIR, { recursive: true });

const activeTelops = telopsData.telops.filter((t) => (t.duration ?? 0) > 0);

console.log(`\n🎬 LocalNarratorTTS テロップ一括レンダリング（SE付き・ProRes4444 アルファ付き）`);
console.log(`対象: ${activeTelops.length}件\n`);

let success = 0;
let fail = 0;

for (const telop of activeTelops) {
  const id = String(telop.id).padStart(2, "0");
  const compId = `telop-${id}`;
  const outputFile = `${OUTPUT_DIR}/${id}_${telop.type}.mov`;

  // telop データと transparent フラグを両方渡す
  const props = JSON.stringify({ telop, transparent: true });
  // シェルのシングルクォート内でエスケープ
  const escapedProps = props.replace(/'/g, "'\\''");

  console.log(`[${id}] ${telop.text.slice(0, 40)}...`);

  try {
    execSync(
      `npx remotion render src/index.ts ${compId} "${outputFile}" --codec=prores --prores-profile=4444 --image-format=png --pixel-format=yuva444p10le --props='${escapedProps}'`,
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
console.log(`出力先: ${OUTPUT_DIR}/ (ProRes4444 .mov)`);
