#!/usr/bin/env bash
# Regenerate the link-preview image (app/opengraph-image.png) from the
# development-only /og-card page, with headless Edge or Chrome.
#   1. pnpm dev -p 3100   (in another terminal)
#   2. bash scripts/make-og-image.sh
set -euo pipefail
url="${1:-http://localhost:3100/og-card}"
browser=""
for p in "/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" \
         "/c/Program Files/Google/Chrome/Application/chrome.exe" \
         "$(command -v google-chrome 2>/dev/null || true)"; do
  [ -n "$p" ] && [ -f "$p" ] && browser="$p" && break
done
[ -n "$browser" ] || { echo "No Edge or Chrome found" >&2; exit 1; }
out="$(pwd)/app/opengraph-image.png"
command -v cygpath >/dev/null && out="$(cygpath -w "$out")"
"$browser" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
  --window-size=1200,630 --virtual-time-budget=4000 --screenshot="$out" "$url" 2>/dev/null
cp app/opengraph-image.png app/twitter-image.png
echo "wrote app/opengraph-image.png and app/twitter-image.png"
