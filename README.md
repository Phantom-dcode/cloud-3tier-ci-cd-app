# Enterprise Multi-Tier Web Application with CI/CD

An enterprise 3-tier cloud application featuring React 19, Node.js Express REST API, MongoDB Atlas, JWT authentication, role-based access controls, interactive dashboard telemetry, and automated AWS GitHub Actions CI/CD deployment pipelines.

---

## Key Features

- **Presentation Layer (Tier 1):** Responsive SPA built with React 19, Vite, Tailwind CSS, Lucide icons, and Recharts interactive metrics.
- **Application Layer (Tier 2):** Modular Node.js Express REST API with Controllers, Services, Repositories, Middlewares (Helmet, CORS, Rate-limiter), and JWT authentication.
- **Data Layer (Tier 3):** Dual-mode MongoDB Atlas NoSQL integration with indexed Mongoose schemas and zero-config in-memory fallback engine.
- **DevOps & CI/CD:** GitHub Actions workflows for continuous integration (`ci.yml`), S3 + CloudFront deployment (`frontend-deploy.yml`), and EC2 SSH deployment (`backend-deploy.yml`).

---

## Quick Start (Local Development)

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
```

### 3. Run Integrated Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to access the interactive dashboard.

---

## Repository Structure

```
Multi-Tier-Web-Application-CI-CD/
├── .github/workflows/       # Automated CI/CD GitHub Actions
├── backend/                  # Express REST API, Models, Controllers, Services
├── docs/                     # System API, AWS, Nginx, & Architecture Documentation
├── infrastructure/           # AWS EC2, S3, CloudFront setup guides & diagrams
├── scripts/                  # Shell automation scripts (setup, build, deploy)
├── src/                      # React 19 SPA Frontend
├── server.ts                 # Full-stack Server Entry point
└── package.json
```

---

## License
[MIT License](LICENSE)
