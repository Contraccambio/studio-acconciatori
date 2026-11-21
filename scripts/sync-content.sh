#!/usr/bin/env bash
# Refresh markdown notes from the Project store into content/
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEST="$ROOT/content"

STORE=""
for candidate in \
  /cursor/stores/self/docs \
  /cursor/stores/bc-1c203567-ec5c-4598-b6dd-8d87fab5eff3/docs
do
  if [ -d "$candidate" ]; then
    STORE="$candidate"
    break
  fi
done

if [ -z "$STORE" ]; then
  echo "Store docs/ non trovata." >&2
  exit 1
fi

mkdir -p "$DEST"
# Keep README; replace topic markdown from store
find "$DEST" -maxdepth 1 -type f -name '*.md' ! -name 'README.md' -delete
cp "$STORE"/*.md "$DEST"/
rm -f "$DEST/project-context.md"
echo "Sincronizzati da $STORE → $DEST"
ls -1 "$DEST"/*.md
