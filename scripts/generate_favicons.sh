#!/bin/bash
set -e

SRC="src/assets/logo-full.png"
DEST_DIR="public/favicon"

mkdir -p $DEST_DIR

SIZES=("16x16" "32x32" "48x48" "64x64" "128x128")

for SIZE in "${SIZES[@]}"; do
    magick "$SRC" -resize "$SIZE" "$DEST_DIR/favicon-$SIZE.png"
	echo "$DEST_DIR/favicon-$SIZE.png"
done

magick "$SRC" -define icon:auto-resize=16,32,48 "$DEST_DIR/favicon.ico"
echo "$DEST_DIR/favicon.ico"