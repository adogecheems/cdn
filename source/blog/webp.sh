#!/bin/bash

find . -type f -iname "*.png" | while read -r file; do
  webp_file="${file%.png}.webp"
  cwebp "$file" -o "$webp_file"
  echo "Converted $file -> $webp_file (quality $QUALITY)"
done