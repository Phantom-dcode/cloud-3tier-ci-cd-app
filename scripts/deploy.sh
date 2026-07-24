#!/usr/bin/env bash
set -e

echo "=== Executing Multi-Tier Deployment Script ==="

git pull origin main
npm ci
npm run build

echo "Reloading PM2 cluster..."
pm2 reload ecosystem.config.js --env production || pm2 start ecosystem.config.js --env production
pm2 save

echo "=== Deployment Finished Successfully ==="
