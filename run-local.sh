#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"
echo "Monarch Private Estates is running at: http://localhost:8080"
python3 -m http.server 8080
