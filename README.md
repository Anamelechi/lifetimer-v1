# Docker Apache/Next.js + Cloudflare Tunnel

[![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=Cloudflare&logoColor=white)](https://www.cloudflare.com/)
[![Apache](https://img.shields.io/badge/Apache-D22128?style=for-the-badge&logo=Apache&logoColor=white)](https://httpd.apache.org/)
[![Next.js](https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)

A production-ready containerized web application deployment using Docker Compose with Cloudflare Tunnel integration. Supports both static Apache hosting and dynamic Next.js applications with zero-downtime deployments and enterprise-grade security.

## 🚀 Features

- **🌐 Zero-Configuration Public Access**: Cloudflare Tunnel bypasses NAT/firewall without port forwarding
- **🐳 Container Isolation**: Completely isolated from host Apache instance
- **📊 Dashboard Management**: Full tunnel control via Cloudflare Dashboard and mobile app
- **🔒 Enterprise Security**: Built-in SSL/TLS, DDoS protection, and access controls
- **⚡ Multiple Deployment Options**: Static files, SSR Next.js, or hybrid configurations
- **🔄 Zero-Downtime Updates**: Rolling deployments with automated health checks
- **📱 Mobile Management**: Control tunnels and monitor traffic from iOS/Android app

## 📋 Prerequisites

- Ubuntu 18.04+ (or compatible Linux distribution)
- Docker and Docker Compose installed
- Cloudflare account with domain management
- SSH access to target server
- Minimum 1GB RAM, 10GB storage

## 🏗️ Architecture

```
Internet → Cloudflare Edge → Cloudflare Tunnel → Docker Network → Application Container
```

### Network Topology
- **External**: Cloudflare global network (SSL termination, DDoS protection)
- **Tunnel**: Encrypted connection bypassing firewall/NAT
- **Internal**: Docker bridge network with service discovery
- **Isolation**: No direct port exposure to host system

## 📁 Project Structure

```
/opt/docker-apache/
├── app/                    # Next.js application source (SSR mode)
├── www/                    # Static web files (Apache mode)  
├── config/                 # Apache/Nginx configuration files
├── nginx/                  # Reverse proxy configs (hybrid mode)
├── docker-compose.yml      # Service orchestration
├── .env                    # Environment variables
├── deploy.sh              # Automated deployment script
├── Dockerfile             # Custom image build (optional)
└── README.md              # This file
```

## ⚡ Quick Start

### 1. Clone and Setup
```bash
# Create project directory
sudo mkdir -p /opt/docker-apache
cd /opt/docker-apache

# Set permissions
sudo chown -R $USER:$USER /opt/docker-apache
```

### 2. Create Cloudflare Tunnel
1. **Login to [Cloudflare Dashboard](https://dash.cloudflare.com)**
2. **Navigate to**: Zero Trust → Access → Tunnels
3. **Create tunnel** and copy the token
4. **Add public hostname**: `subdomain.yourdomain.com` → `apache-container:80`

### 3. Configure Environment
```bash
# Create environment file
cat > .env << 'EOF'
COMPOSE_PROJECT_NAME=apache-cloudflare
TUNNEL_TOKEN=your_tunnel_token_here
APACHE_PORT=8080
EOF
```

### 4. Deploy Application

#### Option A: Static Website (Apache)
```bash
# Create static content
mkdir -p www
echo "<h1>Hello World</h1>" > www/index.html

# Start services
docker compose up -d
```

#### Option B: Next.js Application (SSR)
```bash
# Copy your Next.js project to app/
cp -r /path/to/your/nextjs-project/* app/

# Deploy with custom script
chmod +x deploy.sh
./deploy.sh ssr
```

## 🔧 Configuration Options

### Static Apache Deployment
```yaml
services:
  apache-container:
    image: httpd:2.4-alpine
    volumes:
      - ./www:/usr/local/apache2/htdocs:ro
    networks:
      - tunnel-network
```

### Next.js SSR Deployment  
```yaml
services:
  nextjs-app:
    image: node:18-alpine
    working_dir: /app
    volumes:
      - ./app:/app
    command: sh -c "npm ci && npm run start"
    environment:
      - NODE_ENV=production
```

### PHP Support
```yaml
services:
  apache-container:
    image: php:8.2-apache
    volumes:
      - ./www:/var/www/html:ro
```

## 🚀 Deployment Methods

### Automated Script Deployment
```bash
# Static export
./deploy.sh static

# Server-side rendering
./deploy.sh ssr

# Auto-detect build type
./deploy.sh build
```

### Manual Deployment
```bash
# Build and start services
docker compose up -d --build

# View deployment logs
docker compose logs -f

# Check service status
docker compose ps
```

### CI/CD Integration
```yaml
# GitHub Actions example
- name: Deploy to production
  run: |
    scp -r ./* user@server:/opt/docker-apache/app/
    ssh user@server 'cd /opt/docker-apache && ./deploy.sh ssr'
```

## 🔒 Security Configuration

### Cloudflare SSL Settings
1. **SSL/TLS Mode**: Full (strict) recommended
2. **HSTS**: Enable for enhanced security
3. **Always Use HTTPS**: Force SSL connections
4. **Bot Fight Mode**: Enable automated protection

### Container Security
```bash
# Remove development ports from production
# Comment out ports mapping in docker-compose.yml
# ports:
#   - "3000:3000"  # Remove this line for production
```

### Access Control (Zero Trust)
1. **Create Access Application** in Cloudflare Dashboard
2. **Configure policies** (IP restrictions, email domains)
3. **Enable audit logging** for compliance

## 📊 Monitoring & Maintenance

### Health Monitoring
```bash
# Check container status
docker compose ps

# View application logs
docker compose logs -f [service-name]

# Monitor tunnel connection
docker compose logs cloudflared-tunnel
```

### Dashboard Monitoring
- **Tunnel Status**: Zero Trust → Tunnels → [Your Tunnel]
- **Traffic Analytics**: Analytics & Logs → Access Requests  
- **Performance Metrics**: Speed → Overview

### Mobile App Management
- **iOS**: [Cloudflare One Agent](https://apps.apple.com/app/cloudflare-one-agent/id1477936896)
- **Android**: [Cloudflare One Agent](https://play.google.com/store/apps/details?id=com.cloudflare.oneclient)

## 🔄 Updates & Maintenance

### Application Updates
```bash
# Update container images
docker compose pull

# Restart with new images
docker compose up -d

# Zero-downtime deployment
docker compose up -d --no-deps [service-name]
```

### Tunnel Token Rotation
```bash
# Generate new token in Cloudflare Dashboard
# Update .env file
nano .env

# Restart tunnel service
docker compose restart cloudflared-tunnel
```

### Backup Procedures
```bash
# Backup application data
tar -czf backup-$(date +%Y%m%d).tar.gz www/ app/ config/

# Backup Docker volumes
docker run --rm -v $(pwd):/backup alpine tar czf /backup/volumes-backup.tar.gz /var/lib/docker/volumes/
```

## 🐛 Troubleshooting

### Common Issues

#### 502 Bad Gateway
```bash
# Check container connectivity
docker compose exec cloudflared-tunnel nslookup apache-container

# Verify service is running
curl http://localhost:8080  # If port mapping enabled

# Restart services
docker compose restart
```

#### Tunnel Connection Failed
```bash
# Verify token validity
echo $TUNNEL_TOKEN | base64 -d | jq .

# Check tunnel status in dashboard
# Regenerate token if needed
```

#### Build Failures (Next.js)
```bash
# Check Node.js version compatibility
docker compose exec nextjs-app node --version

# Clear npm cache
docker compose exec nextjs-app npm cache clean --force

# Rebuild from scratch  
docker compose down && docker compose up -d --build
```

### Performance Optimization

#### Static Content Caching
```nginx
# Add to nginx configuration
location ~* \.(css|js|jpg|jpeg|png|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

#### Container Resource Limits
```yaml
services:
  nextjs-app:
    deploy:
      resources:
        limits:
          memory: 512M
          cpus: '0.5'
```

## 📚 Advanced Configurations

### Multi-Site Deployment
```bash
# Create separate directories for multiple sites
/opt/docker-apache-site1/
/opt/docker-apache-site2/

# Use different tunnel tokens and domains
# Manage via Cloudflare Dashboard
```

### Load Balancing
```yaml
# Add multiple application instances
services:
  app-1:
    # ... configuration
  app-2:
    # ... configuration
  nginx-lb:
    # ... load balancer configuration
```

### Development Environment
```yaml
# Override for development
services:
  nextjs-app:
    command: npm run dev
    environment:
      - NODE_ENV=development
    volumes:
      - ./app:/app  # Enable hot reload
```

## 🤝 Contributing

1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open Pull Request**

### Development Setup
```bash
# Clone repository
git clone <repository-url>
cd docker-apache-cloudflare

# Install dependencies
npm install  # If developing deployment scripts

# Run tests
./tests/integration-test.sh
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Cloudflare Team** - For the innovative Tunnel technology
- **Docker Community** - For containerization best practices  
- **Next.js Team** - For the excellent React framework
- **Apache Foundation** - For the reliable web server

## 📞 Support

### Documentation
- **Cloudflare Tunnel Docs**: [https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/)
- **Docker Compose Reference**: [https://docs.docker.com/compose/](https://docs.docker.com/compose/)
- **Next.js Deployment Guide**: [https://nextjs.org/docs/deployment](https://nextjs.org/docs/deployment)

### Community Support
- **GitHub Issues**: [Project Issues](https://github.com/your-repo/issues)
- **Cloudflare Community**: [https://community.cloudflare.com/](https://community.cloudflare.com/)
- **Docker Community**: [https://forums.docker.com/](https://forums.docker.com/)

### Commercial Support
For enterprise deployments and commercial support, please contact: [philznjoku@gmail.com](mailto:philznjoku@gmail.com)

---

**⭐ If this project helped you, please consider giving it a star!**

Made with ❤️ for the developer community
