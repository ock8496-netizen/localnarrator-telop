# LocalNarratorTTS テロップ生成プロジェクト

Remotion ベースのテロップアニメーション生成システム。  
1920×1080 / 60fps / ProRes4444（アルファ付き）出力対応。

---

## 🎬 テロップ一覧（全42本）

| ID | Type | テキスト | 備考 |
|----|------|---------|------|
| 01 | impact | 音声にNG…再収録できない… | |
| 02 | impact | テキストを打つだけで音声を差し替え | |
| 03 | note | 完璧なクローンではありません | |
| 04 | note | 仮ナレ・下読みに十分実用的 | |
| 05 | section_title | できること | showTimeline |
| 06 | list_item | ❶ ボイスクローンで音声差し替え | |
| 10 | impact | 完全ローカル ／ ネット不要 ／ APIキー不要 | |
| 11 | info | 300文字以上 → 句点で自動分割 | centered / size:L |
| 12 | section_title | インストール：Mac | showTimeline |
| 13 | info | install.command をダブルクリック | |
| 14 | info | 「開発元が未確認」→ 右クリック →「開く」 | |
| 15 | section_title | インストール：Windows | showTimeline |
| 16 | info | install.bat をダブルクリック | |
| 17 | info | 「詳細情報」→「実行」 | |
| 18 | info | ウィンドウ → エクステンション → Local TTS... | |
| 19 | section_title | STEP 1：言語と参照音声を設定 | showTimeline |
| 20 | info | 対応言語：日本語 / 英語 / 中国語... | |
| 21 | info | 参照音声：6秒以上のWAVファイル推奨 | |
| 22 | info | Reference Transcript → 書き起こしを入力 | |
| 23 | section_title | STEP 2：テキストを入力 | showTimeline |
| 24 | section_title | STEP 3：生成 → タイムライン配置 | showTimeline |
| 25 | note | TTS = テキストから音声を生成する技術 | |
| 26 | impact | テキスト入力→配置まで 1ボタンで完結 | |
| 27 | section_title | STEP 4：サーバーモードで高速化 | showTimeline |
| 28 | comparison | 通常：約25秒 → サーバーモード：約10〜15秒 | |
| 29 | section_title | STEP 5：バリエーション生成 | showTimeline |
| 30 | info | 2〜5テイクを一括生成 → ベストを選択 | |
| 31 | note | 末尾のパディングはトリムで削除 | |
| 32 | section_title | STEP 6：長文テキストの自動分割 | showTimeline |
| 33 | info | 300文字以上 → 句点で自動分割 → 連続配置 | |
| 34 | info | 目安：1000文字 ≒ 90秒 ／ 3000文字 ≒ 5分 | |
| 35 | section_title | Tips | showTimeline |
| 36 | info | モデル：0.6B（軽量・高速）／ 1.7B（高品質） | |
| 37 | info | 出力先：プロジェクトフォルダ内 | |
| 38 | info | 末尾が途切れる → 句読点を付ける | centered / size:L |
| 39 | info | セグメント間の切れ目 → トリム・クロスフェード | centered / size:L |
| 40 | impact | ナレーション作成はテキストを打つだけ | |
| 41 | list_item | ボイスクローン ／ ローカル ／ 高速... | |
| 42 | end_card | チャンネル登録・高評価よろしくお願いします | |

---

## 🎵 SE マッピング（テック系・ビジネスPro）

| コンポーネント | SEファイル | 元ファイル名 |
|--------------|-----------|------------|
| Impact | se/impact.mp3 | zoom_inout |
| SectionTitle | se/swoosh.mp3 | zoom_inout |
| InfoBar | se/pop.mp3 | hightech_bleep_confirm |
| Note | se/notification.mp3 | electric_buzz_glitch |
| ListScreen | se/list_item.mp3 | modern_tech_select |
| Comparison | se/reveal.mp3 | robot_positive |
| EndCard | se/chime.mp3 | hightech_bleep_confirm |

SE素材ソース: [Mixkit](https://mixkit.co/free-sound-effects/technology/)（ロイヤリティフリー）

---

## 🚀 使い方

```bash
# 通常mp4（SE込み）一括レンダリング
node render-all.mjs

# ProRes4444 アルファ付き一括レンダリング
node render-alpha.mjs

# 単体レンダリング（例: telop-11）
npx remotion render src/index.ts telop-11 output/11_info.mp4 --codec=h264 --gl=angle
```

---

## 📁 ディレクトリ構成

```
src/
  LocalNarratorTTS_telop_data_v2.json  # テロップデータ（全設定）
  TelopComposition.tsx                  # メインコンポジション・SE_MAP
  components/                           # 各テロップコンポーネント
public/
  se/                                   # SEファイル（テック系）
output/                                 # mp4出力先
output_alpha/                           # ProRes4444出力先
```

---

## ✅ 現状

- 全42テロップ データ定義済み
- 全 section_title に `showTimeline: true` 適用済み
- テック系SE全種差し替え済み
- telop 11 / 38 / 39: `centered: true` / `size: "l"` 適用済み
