#!/bin/bash

# Netlify-specific build script for SSG pre-rendering
# Uses Puppeteer's bundled Chromium instead of system Chromium

echo "🏗️  Starting Netlify SSG build..."
echo ""

# Ensure Puppeteer downloads its bundled Chromium
# (Don't skip Chromium download - we need it for prerendering)
unset PUPPETEER_SKIP_CHROMIUM_DOWNLOAD
unset PUPPETEER_EXECUTABLE_PATH

echo "📦 Puppeteer will use its bundled Chromium..."
echo ""

# Run the standard SSG build
chmod +x build-ssg.sh
./build-ssg.sh

echo "🎉 Netlify build complete!"
