#!/bin/bash

find . -type f \( -iname "*.png" -o -iname "*.jpg" -o -iname "*.jpeg" \) | while read -r file; do
  webp_file="${file%.*}.webp"
  cwebp "$file" -o "$webp_file"
  echo "Converted $file -> $webp_file (quality $QUALITY)"
done