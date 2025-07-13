#!/bin/bash

# FSBO Platform Vercel Deployment Script
echo "🚀 Starting FSBO Platform deployment to Vercel..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Run this script from the project root directory"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm run install:all

# Build the project
echo "🔨 Building the project..."
npm run build

# Check if Vercel CLI is available
if ! command -v vercel &> /dev/null; then
    echo "📥 Installing Vercel CLI..."
    npm install -g vercel
fi

# Login to Vercel (if not already logged in)
echo "🔐 Checking Vercel authentication..."
vercel whoami || vercel login

# Deploy to Vercel
echo "🌐 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment complete!"
echo ""
echo "📋 Next steps:"
echo "1. Set up your cloud database (Neon, Supabase, or Railway)"
echo "2. Configure environment variables in Vercel dashboard"
echo "3. Update NEXT_PUBLIC_API_URL in frontend/.env.local"
echo "4. Test your deployment at the provided URL"
echo ""
echo "📖 See DEPLOYMENT.md for detailed instructions" 