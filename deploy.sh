#!/bin/bash

# Next.js to Docker Apache Deployment Script
# Usage: ./deploy.sh [static|ssr|local-build]

set -e

DOCKER_DIR="/opt/docker-apache"
NEXTJS_SOURCE="${1:-./}"
DEPLOY_TYPE="${2:-static}"

echo "🚀 Next.js Deployment Script"
echo "================================"

# Function to deploy static build
deploy_static() {
    echo "📦 Building Next.js for static export..."
    
    # Check if we're in a Next.js project
    if [[ ! -f "package.json" ]]; then
        echo "❌ No package.json found. Are you in a Next.js project directory?"
        exit 1
    fi

    # Install dependencies if needed
    if [[ ! -d "node_modules" ]]; then
        echo "📥 Installing dependencies..."
        npm install
    fi

    # Build for export
    echo "🔨 Building static export..."
    npm run build

    # Check if out directory exists
    if [[ ! -d "out" ]]; then
        echo "❌ No 'out' directory found. Make sure your next.config.js has output: 'export'"
        echo "Add this to your next.config.js:"
        echo "module.exports = { output: 'export', trailingSlash: true, images: { unoptimized: true } }"
        exit 1
    fi

    # Backup current deployment
    if [[ -d "${DOCKER_DIR}/www" ]]; then
        echo "💾 Backing up current deployment..."
        sudo mv "${DOCKER_DIR}/www" "${DOCKER_DIR}/www.backup.$(date +%Y%m%d_%H%M%S)"
    fi

    # Deploy new files
    echo "🚀 Deploying static files..."
    sudo mkdir -p "${DOCKER_DIR}/www"
    sudo cp -r out/* "${DOCKER_DIR}/www/"
    sudo chown -R www-data:www-data "${DOCKER_DIR}/www" 2>/dev/null || true
    
    echo "✅ Static deployment complete!"
    echo "🌐 Your site should be live at your configured domain"
}

# Function to deploy SSR version
deploy_ssr() {
    echo "🚀 Deploying Next.js SSR version..."
    
    # Backup current app
    if [[ -d "${DOCKER_DIR}/app" ]]; then
        echo "💾 Backing up current app..."
        sudo mv "${DOCKER_DIR}/app" "${DOCKER_DIR}/app.backup.$(date +%Y%m%d_%H%M%S)"
    fi

    # Copy source files
    echo "📂 Copying source files..."
    sudo mkdir -p "${DOCKER_DIR}/app"
    sudo cp -r ./* "${DOCKER_DIR}/app/" 2>/dev/null || true
    sudo chown -R 1000:1000 "${DOCKER_DIR}/app"

    # Stop current containers
    echo "🛑 Stopping current containers..."
    cd "${DOCKER_DIR}"
    sudo docker compose down

    # Start SSR containers
    echo "🚀 Starting SSR containers..."
    sudo docker compose up -d

    echo "✅ SSR deployment complete!"
    echo "⏳ Container is building... Check logs with: docker compose logs -f"
}

# Function to build locally and deploy static
build_and_deploy() {
    echo "🏗️ Building locally and deploying static files..."
    
    # Build the project
    echo "📦 Installing dependencies..."
    npm ci
    
    echo "🔨 Building project..."
    npm run build
    
    # Check if it's a static export or needs server
    if [[ -d "out" ]]; then
        echo "📁 Static export found, deploying static files..."
        deploy_static
    elif [[ -d ".next" ]]; then
        echo "⚡ Next.js build found, deploying as SSR..."
        deploy_ssr
    else
        echo "❌ No build output found. Build may have failed."
        exit 1
    fi
}

# Function to show help
show_help() {
    echo "Usage: $0 [command]"
    echo ""
    echo "Commands:"
    echo "  static      - Build and deploy as static export (default)"
    echo "  ssr         - Deploy as SSR with Node.js container"
    echo "  build       - Build locally and auto-detect deployment type"
    echo "  help        - Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 static   - Deploy static export"
    echo "  $0 ssr      - Deploy with SSR"
    echo "  $0 build    - Auto-detect and deploy"
}

# Check if Docker directory exists
if [[ ! -d "${DOCKER_DIR}" ]]; then
    echo "❌ Docker directory ${DOCKER_DIR} not found!"
    echo "Make sure you've set up the containerized Apache first."
    exit 1
fi

# Main logic
case "${DEPLOY_TYPE}" in
    "static")
        deploy_static
        ;;
    "ssr")
        deploy_ssr
        ;;
    "build")
        build_and_deploy
        ;;
    "help"|"--help"|"-h")
        show_help
        ;;
    *)
        echo "❌ Unknown command: ${DEPLOY_TYPE}"
        show_help
        exit 1
        ;;
esac

echo ""
echo "🎉 Deployment complete!"
echo "🔗 Check your site: https://your-subdomain.yourdomain.com"
echo "📊 Monitor in Cloudflare Dashboard: https://dash.cloudflare.com"
echo "🐳 Check container logs: cd ${DOCKER_DIR} && docker compose logs -f"
