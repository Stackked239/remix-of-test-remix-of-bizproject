#!/bin/bash

# Build SSG Script for BizHealth.ai
# This script builds the app and prerenders all routes for SEO

echo "🏗️  Starting Static Site Generation build..."

# Step 1: Build the Vite app
echo "📦 Building Vite app..."
npm run build

if [ $? -ne 0 ]; then
  echo "❌ Vite build failed!"
  exit 1
fi

echo "✅ Vite build complete!"

# Step 2: Run prerender script
echo "🎨 Prerendering all routes..."
node prerender.js

if [ $? -ne 0 ]; then
  echo "❌ Prerender failed!"
  exit 1
fi

echo "✅ Prerender complete!"
echo "🎉 Static Site Generation build finished successfully!"
echo "📁 Output directory: dist/"
