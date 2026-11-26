# Amigo Animation site, option B ("one line") — handoff, 11-25-2026

**Links.** Public (phone + sharing): https://amigostudios.github.io/amigo-animation-wireframes/b/ · Desk review: https://claude.ai/artifact/NV3YhrRtjwa2Jz6DSFa2W6 (never text the artifact link; it fails in iMessage).

**Files.** `index.html` (main), `specialty.html#commercials|ui|3d|packages`, `line.css`, `line.js`, `assets/`. CSS was built in rounds: later blocks at the bottom of `line.css` override earlier ones, so add new rules at the end.

**Publish (Austin OK'd keeping both current).**
1. Rebuild the artifact copy: join the `<!--A-->` and `<!--B-->` blocks of index.html into `_build/amigo-animation-b.html`, publish that path with root = this folder and the changed files.
2. Public link: `sh ../_qc/pushb.sh "message"` (needs a clone of amigostudios/amigo-animation-wireframes at the path in the script; re-clone with gh if missing). Then text him the github.io link.

**QC.** `../_qc/shot.mjs line/index.html name 1440 900 "sel:#say@60" 5000 [js]` (390 844 for phone), `../_qc/b_interact.mjs` (8 checks), `../_qc/wk` (Safari engine), `../_qc/ff.py` (Firefox). The Mac Safari engine has missed two real iPhone bugs (blend-mode grain, transformed photo escaping a rounded box): avoid blend modes and transforms inside rounded clips, and ask Austin for a phone screenshot.

**Decided by Austin.** Dark header. Day to night order (dark header, blue pool, terracotta logos, night work, black team + close). MOTION as the line-drawn word. Reel autoplays, big and centred. Work grid 3 across. Board spray always white. No palm. No bird flapping, no reflection shimmer. No draggable bezier toy. Options pills are review-only.

**Still open.** Top drawing (Curve default / Wave / Sun). Header photo (Studio / Water / Off): both photos have unresolved rights. Whether phone lag and the disappearing board are fixed (board moved to its own layer 11-25; unconfirmed on his iPhone). Pool auto-surf motion (carves + cutbacks) awaiting his reaction. Copy slots are placeholders.
