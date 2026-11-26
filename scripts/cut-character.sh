#!/usr/bin/env bash
# Cut a Gemini character pose out of its flat magenta (#FF00FF) background and
# save it as a trimmed, transparent WebP in public/character/cut/.
#
#   scripts/cut-character.sh <input image> <output name> [--white]
#
# --white also removes near-white areas (pose "peek" had a white wall strip).
# Needs ffmpeg and node. The alpha edge is eroded 2px to remove the pink fringe
# that JPEG compression leaves around the ink outline.
set -euo pipefail

in="$1"; name="$2"; white="${3:-}"
tmp="$(mktemp -d)"
out="public/character/cut/${name}.webp"
mkdir -p public/character/cut

pre="format=rgb24"
if [ "$white" = "--white" ]; then
  W="gt(min(min(r(X\,Y)\,g(X\,Y))\,b(X\,Y))\,215)"
  pre="format=rgb24,geq=r='if($W,255,r(X,Y))':g='if($W,0,g(X,Y))':b='if($W,255,b(X,Y))'"
fi

ffmpeg -loglevel error -y -i "$in" -filter_complex \
  "$pre,colorkey=0xFF00FF:0.3:0.08,format=rgba,split[c][a];[a]alphaextract,erosion,erosion[m];[c][m]alphamerge" \
  "$tmp/cut.png"

IFS=, read -r w h < <(ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0 "$tmp/cut.png")
ffmpeg -loglevel error -y -i "$tmp/cut.png" -vf "alphaextract,format=gray" -f rawvideo "$tmp/alpha.raw"

# Bounding box of the opaque pixels, padded 8px.
crop="$(node -e '
const a = require("fs").readFileSync(process.argv[1]); const W = +process.argv[2], H = +process.argv[3];
let x0 = W, y0 = H, x1 = -1, y1 = -1;
for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (a[y * W + x] > 24) {
  if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
const p = 8; x0 = Math.max(0, x0 - p); y0 = Math.max(0, y0 - p);
x1 = Math.min(W - 1, x1 + p); y1 = Math.min(H - 1, y1 + p);
console.log(`${x1 - x0 + 1}:${y1 - y0 + 1}:${x0}:${y0}`);
' "$tmp/alpha.raw" "$w" "$h")"

ffmpeg -loglevel error -y -i "$tmp/cut.png" -vf "crop=$crop" -c:v libwebp -quality 85 -pix_fmt yuva420p "$out"
rm -rf "$tmp"
echo "$out (crop $crop)"
