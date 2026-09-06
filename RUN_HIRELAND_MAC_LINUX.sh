#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"

echo "========================================"
echo "       HIRELAND LOCAL LAUNCHER"
echo "========================================"

if ! command -v node >/dev/null 2>&1; then
  echo "Node.js is required. Install the current Node.js LTS release."
  exit 1
fi

if [ ! -d node_modules ]; then
  echo "Installing dependencies for the first run..."
  npm install
fi

if [ ! -f .env ] && [ -f .env.example ]; then
  cp .env.example .env
  echo "Created .env. Add OPENAI_API_KEY to enable AI challenge generation."
fi

echo "Starting Hireland at http://localhost:8000"
npm start
