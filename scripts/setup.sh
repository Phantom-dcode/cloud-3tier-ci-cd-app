#!/usr/bin/env bash
set -e

echo "=== Initializing Multi-Tier Web Application Environment ==="

if [ ! -f .env ]; then
  echo "Creating .env from .env.example..."
  cp .env.example .env
fi

echo "Installing Node.js packages..."
npm install

echo "Running type check & build verification..."
npm run lint
npm run build

echo "=== Setup Completed Successfully ==="
