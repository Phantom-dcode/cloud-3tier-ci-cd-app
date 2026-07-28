<div align="center">

# ☁️ Cloud 3-Tier CI/CD Application

### Enterprise-grade multi-tier web platform with automated cloud deployment

A production-ready **React 19 + Node.js + MongoDB** application demonstrating full-stack architecture, secure authentication, and end-to-end CI/CD automation.

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_App-2ea44f?style=for-the-badge)](https://ais-pre-y5omk7akwybxhjwftcfdnk-692835517606.asia-southeast1.run.app)
[![API Health](https://img.shields.io/badge/💚_API_Health-Check_Status-brightgreen?style=for-the-badge)](https://ais-pre-y5omk7akwybxhjwftcfdnk-692835517606.asia-southeast1.run.app/api/health)

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-EC2_%7C_S3_%7C_CloudFront-FF9900?style=flat-square&logo=amazonaws&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/CI%2FCD-GitHub_Actions-2088FF?style=flat-square&logo=githubactions&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)

</div>

---

## 🚀 Live Deployment

| Service | Link |
|---|---|
| 🌐 **Production App** | [ais-pre-y5omk7ak...run.app](https://ais-pre-y5omk7akwybxhjwftcfdnk-692835517606.asia-southeast1.run.app) |
| 💚 **API Health Check** | [/api/health](https://ais-pre-y5omk7akwybxhjwftcfdnk-692835517606.asia-southeast1.run.app/api/health) |

---

## ✨ Key Features

- 🎨 **Presentation Layer (Tier 1)** — Responsive SPA built with React 19, Vite, Tailwind CSS, Lucide icons, and Recharts for live dashboard telemetry.
- ⚙️ **Application Layer (Tier 2)** — Modular Node.js/Express REST API with Controllers, Services, Repositories, and middleware (Helmet, CORS, rate-limiting) plus JWT authentication.
- 🗄️ **Data Layer (Tier 3)** — Dual-mode MongoDB Atlas integration with indexed Mongoose schemas and a zero-config in-memory fallback engine.
- 🔁 **DevOps & CI/CD** — GitHub Actions pipelines for CI (`ci.yml`), frontend deploy to S3 + CloudFront (`frontend-deploy.yml`), and backend deploy to EC2 via SSH (`backend-deploy.yml`).

---

## 🏗️ Architecture

```
┌─────────────────────┐     ┌──────────────────────┐     ┌─────────────────────┐
│   TIER 1 — Client   │────▶│  TIER 2 — App Server  │────▶│  TIER 3 — Database  │
│  React 19 + Vite    │     │  Node.js + Express    │     │   MongoDB Atlas     │
│  Tailwind + Recharts│     │  JWT · Helmet · CORS  │     │  Mongoose + Indexes │
└─────────────────────┘     └──────────────────────┘     └─────────────────────┘
        │                            │
        ▼                            ▼
   CloudFront + S3               EC2 + Nginx + PM2
        └────────── GitHub Actions CI/CD ──────────┘
```

---

## ⚡ Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env

# 3. Run the integrated dev server
npm run dev
---

## 📁 Repository Structure

```
cloud-3tier-ci-cd-app/
├── .github/workflows/   # CI/CD pipelines (CI, frontend deploy, backend deploy)
├── backend/             # Express REST API — Models, Controllers, Services
├── docs/                # API, AWS, Nginx & architecture documentation
├── infrastructure/      # AWS EC2 / S3 / CloudFront setup guides & diagrams
├── scripts/             # Shell automation (setup, build, deploy)
├── src/                 # React 19 SPA frontend
├── server.ts            # Full-stack server entry point
└── package.json
```

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React 19 · Vite · Tailwind CSS · Recharts · Lucide Icons |
| Backend | Node.js · Express · JWT · Helmet · CORS |
| Database | MongoDB Atlas · Mongoose |
| Infrastructure | AWS EC2 · S3 · CloudFront · Nginx · PM2 |
| CI/CD | GitHub Actions |

---

## 📄 License

Released under the [MIT License](./LICENSE).

---

<div align="center">

Built by [Phantom-dcode](https://github.com/Phantom-dcode)

</div>
