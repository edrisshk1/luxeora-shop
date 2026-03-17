#!/bin/bash

# Luxury Shop - Quick Setup Script
# This script automates initial setup

echo ""
echo "========================================"
echo "  LUXURY SHOP - QUICK SETUP"
echo "========================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed!"
    echo "Please download from: https://nodejs.org/"
    exit 1
fi

echo "[✓] Node.js found: $(node --version)"

echo ""
echo "[1/4] Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install dependencies"
    exit 1
fi

echo "[✓] Dependencies installed"

echo ""
echo "[2/4] Checking for .env.local file..."
if [ ! -f ".env.local" ]; then
    echo "[!] .env.local not found"
    echo "[!] Copying from .env.example..."
    cp .env.example .env.local
    echo ""
    echo "[✓] Created .env.local"
    echo "[!] IMPORTANT: Update .env.local with your Firebase credentials!"
    echo "[!] Guide: See DEPLOYMENT_GUIDE.md"
else
    echo "[✓] .env.local exists"
fi

echo ""
echo "[3/4] Project structure:"
ls -la src/

echo ""
echo "[4/4] Ready to start development!"
echo ""
echo "Next steps:"
echo "1. Update .env.local with Firebase credentials"
echo "2. Run: npm run dev"
echo "3. Open: http://localhost:3000"
echo ""
echo "For deployment:"
echo "- See README.md for full instructions"
echo "- See DEPLOYMENT_GUIDE.md for step-by-step guide"
echo ""
