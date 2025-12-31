#!/bin/bash

# Netlify-specific build script for SSG pre-rendering
# Uses Puppeteer's bundled Chromium

echo "🏗️  Starting Netlify SSG build..."
echo ""

# Install Puppeteer's bundled Chrome browser
echo "📦 Installing Puppeteer Chrome browser..."
npx puppeteer browsers install chrome

if [ $? -ne 0 ]; then
  echo "❌ Failed to install Puppeteer Chrome!"
  exit 1
fi

echo "✅ Puppeteer Chrome installed"
echo ""

# Run the standard SSG build
chmod +x build-ssg.sh
./build-ssg.sh

echo "🎉 Netlify build complete!"
