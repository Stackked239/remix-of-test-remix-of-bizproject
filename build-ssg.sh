#!/bin/bash

# Build SSG Script for BizHealth.ai
# This script builds the app and prerenders all routes for SEO

echo "🏗️  Starting Static Site Generation build..."
echo ""

# Step 1: Extract routes from App.tsx
echo "🔍 Extracting routes from App.tsx..."
node extract-routes.js

if [ $? -ne 0 ]; then
  echo "❌ Route extraction failed!"
  exit 1
fi

echo ""

# Step 2: Build the Vite app
echo "📦 Building Vite app..."
npm run build

if [ $? -ne 0 ]; then
  echo "❌ Vite build failed!"
  exit 1
fi

echo "✅ Vite build complete!"
echo ""

# Step 3: Run prerender script
echo "🎨 Prerendering all routes..."
node prerender.js

if [ $? -ne 0 ]; then
  echo "❌ Prerender failed!"
  exit 1
fi

echo ""
echo "🎉 Static Site Generation build finished successfully!"
echo "📁 Output directory: dist/"
echo ""
echo "To test locally, run: npm run preview"
