#!/bin/bash

# Netlify-specific build script with Puppeteer support
# This installs Chrome dependencies needed for SSG pre-rendering

echo "🏗️  Starting Netlify SSG build..."
echo ""

# Install Chromium dependencies for Puppeteer
echo "📦 Installing Chromium dependencies..."
sudo apt-get update
sudo apt-get install -y \
  chromium-browser \
  ca-certificates \
  fonts-liberation \
  libappindicator3-1 \
  libasound2 \
  libatk-bridge2.0-0 \
  libatk1.0-0 \
  libc6 \
  libcairo2 \
  libcups2 \
  libdbus-1-3 \
  libexpat1 \
  libfontconfig1 \
  libgbm1 \
  libgcc1 \
  libglib2.0-0 \
  libgtk-3-0 \
  libnspr4 \
  libnss3 \
  libpango-1.0-0 \
  libpangocairo-1.0-0 \
  libstdc++6 \
  libx11-6 \
  libx11-xcb1 \
  libxcb1 \
  libxcomposite1 \
  libxcursor1 \
  libxdamage1 \
  libxext6 \
  libxfixes3 \
  libxi6 \
  libxrandr2 \
  libxrender1 \
  libxss1 \
  libxtst6 \
  lsb-release \
  wget \
  xdg-utils

echo "✅ Chromium dependencies installed"
echo ""

# Set Puppeteer to skip bundled Chromium download and use system Chromium
export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
export PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Run the standard SSG build
chmod +x build-ssg.sh
./build-ssg.sh

echo "🎉 Netlify build complete!"
