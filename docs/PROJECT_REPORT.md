# Project Capstone Report: Multi-Tier Web Application with CI/CD

## Project Title
Enterprise Multi-Tier Web Application with Automated GitHub Actions CI/CD Pipeline & AWS Infrastructure

## Objective
To engineer a scalable, enterprise-ready 3-tier web application complete with JWT authentication, role-based access control, REST APIs, product catalog management, purchase order fulfillment, interactive telemetry analytics dashboard, and automated continuous integration/continuous deployment pipelines to AWS EC2, S3, and CloudFront.

## Technical Architecture & Tiers
- **Presentation Tier:** React 19 + Vite + Tailwind CSS SPA hosted on AWS S3 with CloudFront CDN distribution.
- **Application Tier:** Node.js Express REST API hosted on AWS EC2 with PM2 cluster process management and Nginx reverse proxy.
- **Database Tier:** MongoDB Atlas NoSQL cluster with indexed schemas and failover capabilities.

## Results & Benchmarks
- Automated deployment completed in under 2 minutes via GitHub Actions workflows.
- Zero-downtime reloads achieved via PM2 process management on AWS EC2.
- 100% WCAG accessibility compliant dashboard UI.
