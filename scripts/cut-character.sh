#!/usr/bin/env bash
# Cut a Gemini character pose out of its flat magenta (#FF00FF) background and
# save it as a trimmed, transparent WebP in public/character/cut/.
#
#   scripts/cut-character.sh <input image> <output name> [--white]
#
# --white also removes near-white areas (pose "peek" had a white wall strip).
# Needs ffmpeg and node. Edge pixels are kept (never eroded, which would eat the
# ink outline); instead, magenta-tinted fringe pixels (red and blue both well
# above green) are recoloured to their green level. Nothing on the character
# is tinted that way: skin, plaid and the olive tee all have green >= blue.
#
# ERASE="x0,y0,x1,y1;..." (source-image pixels) clears stray marks Gemini drew,
# e.g. the ledge line in the hang and sit poses:
#   ERASE="0,44,291,57;358,44,544,57;611,44,896,57" scripts/cut-character.sh pose2.jfif hang
#
# CROP="w:h:x:y" forces the trim rectangle instead of fitting it to the figure.
# Animation frames of one pose must share a rectangle, or the figure jumps when
# frames swap: cut each frame once, take the union of the printed crops, then
# re-cut the whole set with CROP set to that union.
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

M="gt(r(X\,Y)-g(X\,Y)\,28)*gt(b(X\,Y)-g(X\,Y)\,28)"
A="alpha(X,Y)"
if [ -n "${ERASE:-}" ]; then
  IFS=';' read -ra rects <<< "$ERASE"
  for r in "${rects[@]}"; do
    IFS=',' read -r x0 y0 x1 y1 <<< "$r"
    A="$A*(1-between(X\,$x0\,$x1)*between(Y\,$y0\,$y1))"
  done
fi
ffmpeg -loglevel error -y -i "$in" -filter_complex \
  "$pre,colorkey=0xFF00FF:0.3:0.1,format=rgba,geq=r='if($M,g(X,Y),r(X,Y))':g='g(X,Y)':b='if($M,g(X,Y),b(X,Y))':a='$A'" \
  "$tmp/cut.png"

IFS=, read -r w h < <(ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0 "$tmp/cut.png")
ffmpeg -loglevel error -y -i "$tmp/cut.png" -vf "alphaextract,format=gray" -f rawvideo "$tmp/alpha.raw"

# Bounding box of the opaque pixels, padded 8px.
crop="${CROP:-}"
[ -n "$crop" ] || crop="$(node -e '
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
