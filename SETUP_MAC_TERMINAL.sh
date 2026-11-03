#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
if ! command -v node >/dev/null; then echo 'Install Node.js first: https://nodejs.org/'; exit 1; fi
npm install
npm run build
if command -v code >/dev/null; then code .; else echo 'VS Code CLI not found. Open VS Code, press Cmd+Shift+P, run: Shell Command: Install code command in PATH. Then run code .'; fi
echo 'Project ready. Run: npm run dev'
