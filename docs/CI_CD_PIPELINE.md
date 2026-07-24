# CI/CD Pipeline Architecture & GitHub Actions

## Workflow Overview

Our CI/CD pipeline consists of modular workflows:

1. **`ci.yml` (Continuous Integration):**
   - Triggers on PR & Push to `main`/`develop`
   - Executes TypeScript type checking (`npm run lint`)
   - Verifies build output (`npm run build`)

2. **`cd.yml` (Continuous Delivery):**
   - Triggers on Push to `main`
   - Orchestrates `frontend-deploy.yml` and `backend-deploy.yml`

3. **`frontend-deploy.yml`:**
   - Builds static React bundle
   - Syncs build to AWS S3 bucket
   - Executes CloudFront CDN invalidation (`/*`)

4. **`backend-deploy.yml`:**
   - Connects via SSH to EC2 instance
   - Pulls latest commit from GitHub
   - Re-compiles server bundle with `esbuild`
   - Reloads PM2 zero-downtime cluster
