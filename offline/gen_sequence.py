import json, os, math

FPS = 30
BASE = "/Users/oc_k00/oc-work/projects/localnarrator-offline"
TELOP_DIR = "/Users/oc_k00/oc-work/projects/localnarrator-telop/output"
AUDIO_DIR = f"{BASE}/audio"

with open(f"{BASE}/sequence/durations.json") as f:
    durations = json.load(f)

def secs_to_tc(s):
    h = int(s//3600); m = int((s%3600)//60); sec = s%60
    f = int(round((sec - int(sec)) * FPS))
    return f"{h:02d}:{m:02d}:{int(sec):02d}:{f:02d}"

def telop_file(telop_id):
    files = os.listdir(TELOP_DIR)
    prefix = f"{telop_id:02d}_"
    for fn in sorted(files):
        if fn.startswith(prefix) and fn.endswith(".mp4"):
            return os.path.join(TELOP_DIR, fn)
    return None

cuts = [
    ("A-1",0.0,1,None,"A-1",3.0),("A-2",3.5,2,None,"A-2",4.0),
    ("A-3",8.0,None,None,"A-3",None),("A-4",17.0,None,3,"A-4",3.0),
    ("A-5",22.0,None,4,"A-5",3.0),("A-6",27.0,None,None,"A-6",None),
    ("B-1",33.0,5,None,None,2.5),("B-2",36.0,None,None,"B-2",None),
    ("B-3",47.0,6,None,"B-3",6.0),("B-4",58.0,10,None,"B-4",4.0),
    ("B-5",68.0,None,11,"B-5",4.0),
    ("C-1",75.0,12,None,None,3.0),("C-2",78.0,None,13,"C-2",5.0),
    ("C-3",90.0,None,14,"C-3",5.0),
    ("D-1",110.0,15,None,None,3.0),("D-2",113.0,None,16,"D-2",5.0),
    ("D-3",121.0,None,17,"D-3",4.0),
    ("E-1",135.0,None,18,"E-1",5.0),
    ("F-1",150.0,19,None,None,3.0),("F-2",153.0,None,20,"F-2",4.0),
    ("F-3",165.0,None,21,"F-3",4.0),("F-4",177.0,None,22,"F-4",4.0),
    ("G-1",190.0,23,None,None,3.0),("G-2",193.0,None,None,"G-2",None),
    ("G-3",198.0,None,None,"G-3",None),
    ("H-1",210.0,24,None,None,3.0),("H-2",213.0,None,25,"H-2",3.0),
    ("H-3",225.0,None,None,"H-3",None),("H-4",230.0,26,None,"H-4",3.5),
    ("I-1",240.0,27,None,None,3.0),("I-2",243.0,None,None,"I-2",None),
    ("I-3",253.0,28,None,"I-3",5.0),
    ("J-1",270.0,29,None,None,3.0),("J-2",273.0,None,30,"J-2",5.0),
    ("J-3",283.0,None,31,"J-3",3.0),
    ("K-1",295.0,32,None,None,3.0),("K-2",298.0,None,33,"K-2",5.0),
    ("K-3",312.0,None,34,"K-3",4.0),
    ("L-1",320.0,35,None,None,2.5),("L-2",322.0,36,None,"L-2",5.0),
    ("L-3",335.0,None,37,"L-3",4.0),("L-4",343.0,None,38,"L-4",5.0),
    ("L-5",350.0,None,39,"L-5",5.0),
    ("M-1",355.0,40,None,"M-1",4.0),("M-2",360.0,41,None,"M-2",4.0),
    ("M-3",374.0,42,None,"M-3",8.0),
]

# EDL
edl_lines = ["TITLE: LocalNarratorTTS_offline", "FCM: NON-DROP FRAME", ""]
evt = 1
for cut_id,tc_start,v2,v3,nar,telop_dur in cuts:
    if nar and nar in durations:
        dur = durations[nar]
        tc_end = tc_start + dur
        edl_lines.append(f"{evt:03d}  AX       AA    C        00:00:00:00 {secs_to_tc(dur)} {secs_to_tc(tc_start)} {secs_to_tc(tc_end)}")
        edl_lines.append(f"* FROM CLIP NAME: {nar}.wav")
        edl_lines.append(f"* COMMENT: {cut_id}")
        edl_lines.append("")
        evt += 1

with open(f"{BASE}/sequence/LocalNarratorTTS_audio.edl","w") as f:
    f.write("\n".join(edl_lines))

# Timeline map JSON
timeline = []
for cut_id,tc_start,v2,v3,nar,telop_dur in cuts:
    entry = {"cut":cut_id,"tc_start_sec":tc_start,"tc_start":secs_to_tc(tc_start)}
    if v2:
        fp = telop_file(v2)
        entry["V2_fullscreen"] = {"id":v2,"file":os.path.basename(fp) if fp else f"{v2:02d}","duration_sec":telop_dur or 3.0}
    if v3:
        fp = telop_file(v3)
        entry["V3_overlay"] = {"id":v3,"file":os.path.basename(fp) if fp else f"{v3:02d}","duration_sec":telop_dur or 3.0}
    if nar:
        entry["A1_narration"] = {"file":f"{nar}.wav","duration_sec":durations.get(nar,5.0)}
    timeline.append(entry)

with open(f"{BASE}/sequence/timeline_map.json","w") as f:
    json.dump(timeline, f, ensure_ascii=False, indent=2)

# README
readme = """# LocalNarratorTTS — オフライン編集パッケージ

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
"""

with open(f"{BASE}/README.md","w") as f:
    f.write(readme)

print("完了")
print(f"  EDL: {BASE}/sequence/LocalNarratorTTS_audio.edl")
print(f"  Map: {BASE}/sequence/timeline_map.json")
