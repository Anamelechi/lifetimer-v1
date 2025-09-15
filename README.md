# 🏛️ Life Timer v1 - ARCHIVED

[![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=Cloudflare&logoColor=white)](https://www.cloudflare.com/)
[![Apache](https://img.shields.io/badge/Apache-D22128?style=for-the-badge&logo=Apache&logoColor=white)](https://httpd.apache.org/)
[![Next.js](https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)

> **⚠️ THIS REPOSITORY IS ARCHIVED AND NO LONGER MAINTAINED**
> 
> This is the archived v1 codebase of Life Timer. For the current active development, visit [Life-timer-production](https://github.com/Anamelechi/Life-timer-production).

## 📚 What was Life Timer v1?

Life Timer v1 was a production-ready containerized web application deployment featuring:

- **🌐 Cloudflare Tunnel Integration**: Zero-configuration public access bypassing NAT/firewall
- **🐳 Docker Compose Setup**: Complete containerized deployment with Apache and Next.js
- **📊 Dashboard Management**: Full tunnel control via Cloudflare Dashboard and mobile app
- **🔒 Enterprise Security**: Built-in SSL/TLS, DDoS protection, and access controls
- **🔄 Zero-Downtime Updates**: Rolling deployments with automated health checks
- **📱 Mobile Management**: Control tunnels and monitor traffic from iOS/Android app

## 🏗️ Original Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Cloudflare    │───▶│   Docker Host   │───▶│  Apache/Next.js │
│     Tunnel      │    │   (Ubuntu)      │    │   Container     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Tech Stack (v1)
- **Frontend**: Next.js with Apache hosting
- **Deployment**: Docker Compose with multi-service architecture  
- **Networking**: Cloudflare Tunnel for secure public access
- **Security**: Enterprise-grade SSL/TLS and DDoS protection
- **CI/CD**: GitHub Actions with automated deployment scripts

## 📅 Archive Information

- **Archive Date**: September 15, 2025
- **Last Active Commit**: `d26c62e` - "Add archive notice for Life Timer v1"  
- **Total Commits**: 85+ commits preserving full development history
- **Original Repository**: Merged into [Life-timer-production](https://github.com/Anamelechi/Life-timer-production)

## 🚀 Life Timer v2 (Current)

The current active version features:
- **⏰ Real-time Life Timer**: Second-by-second life tracking
- **📱 Progressive Web App**: Full PWA with offline support
- **🌓 Dark/Light Theme**: Modern UI with theme switching
- **🌍 Internationalization**: 5 language support (en, es, fr, de, it)
- **🎯 Life Goals**: Personal goal tracking system
- **⭐ Birth Chart**: Astrology chart generation
- **🚀 Simplified Deployment**: Streamlined Docker setup

👉 **[Visit Life Timer v2](https://github.com/Anamelechi/Life-timer-production)**

## 📂 Repository Structure (v1)

```
life-timer-v1/
├── .github/workflows/     # CI/CD pipelines
├── .gitpod.yml           # Gitpod configuration  
├── life-timer/           # Next.js application
│   ├── docker-compose.yml
│   ├── Dockerfile
│   └── src/             # Application source
├── deploy.sh            # Deployment script
└── README.md           # Original documentation
```

## 🛠️ Running v1 Locally (Historical)

If you need to reference the v1 setup:

```bash
# Clone this archive
git clone https://github.com/Anamelechi/lifetimer-v1.git
cd lifetimer-v1

# Follow original README for setup
# Note: Requires Cloudflare tunnel configuration
```

## 📖 Original Documentation

The complete v1 documentation is preserved in this repository, including:
- Docker Compose configuration
- Cloudflare Tunnel setup instructions
- Apache hosting configuration
- Deployment scripts and CI/CD workflows

## ⚡ Migration to v2

Life Timer evolved from v1's Docker/Apache/Cloudflare architecture to v2's modern PWA approach:

| Feature | v1 | v2 |
|---------|----|----|
| **Architecture** | Docker + Apache + Cloudflare | Next.js PWA |
| **Deployment** | Complex multi-service | Single container |
| **UI/UX** | Basic interface | Modern PWA with themes |
| **Features** | Life timer only | Goals, birth chart, i18n |
| **Offline** | Limited | Full PWA offline support |
| **Mobile** | Web responsive | Native app-like experience |

## 🔗 Links

- **Current Repository**: [Life-timer-production](https://github.com/Anamelechi/Life-timer-production)
- **Live Demo**: [Coming Soon - v2]
- **Issues**: Use main repository for any questions
- **Discussions**: [Feature discussions in main repo](https://github.com/Anamelechi/Life-timer-production/discussions)

## 📜 License

This archived codebase maintains the original MIT License.

---

**🏛️ Archived September 15, 2025** | **Built with ❤️ by Anamelechi**

*This repository serves as a historical reference for Life Timer v1's Docker/Cloudflare architecture. All active development has moved to [Life-timer-production](https://github.com/Anamelechi/Life-timer-production).*