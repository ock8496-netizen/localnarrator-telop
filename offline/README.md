# LocalNarratorTTS — オフライン編集パッケージ

## フォルダ構成
```
LocalNarratorTTS_offline/
├── audio/                    ← ナレーション36本 (VOICEVOX No.7 アナウンス / 話速1.15倍)
├── sequence/
│   ├── durations.json        ← 各ナレの実測秒数
│   ├── timeline_map.json     ← カット別配置マップ (TC / ファイル名 / 尺)
│   └── LocalNarratorTTS_audio.edl  ← Premiere Pro インポート用EDL
└── README.md
```

## テロップ素材
Drive: LocalNarratorTTS_telop_v2 フォルダの MP4 ファイルを使用
https://drive.google.com/drive/folders/1OSFT1XX_e2ttm_z4iOg7GrIYxWggP3UM

## Premiere Pro 取り込み手順

### レイヤー構成
- V3: オーバーレイテロップ（InfoBar, Note）
- V2: フルスクリーンテロップ（Impact, SectionTitle, List, Comparison, EndCard）
- V1: 画面収録 or ブラック（仮）
- A1: ナレーション音声
- A2: BGM（任意）

### ナレーション配置
1. File > Import で audio/ フォルダを読み込み
2. sequence/timeline_map.json の tc_start を参照して A1 に配置
   例: A-1.wav → 00:00:00:00 / B-2.wav → 00:00:36:00

### テロップ配置（timeline_map.jsonより抜粋）
| TC | V2 (fullscreen) | V3 (overlay) |
|---|---|---|
| 00:00:00 | ID01_impact.mp4 | — |
| 00:00:03 | ID02_impact.mp4 | — |
| 00:00:33 | ID05_section_title.mp4 | — |
| 00:00:47 | ID06_list_item.mp4 | — |
| 00:01:15 | ID12_section_title.mp4 | — |
| 00:05:54 | ID42_end_card.mp4 | — |

## ナレーション仕様
- VOICEVOX / No.7「アナウンス」(speaker_id: 30)
- 話速: 1.15倍（チュートリアル向けやや速め）
- 出力: 24kHz / 16bit / モノラル WAV
