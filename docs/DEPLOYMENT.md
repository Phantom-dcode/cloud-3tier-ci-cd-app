# Production Deployment Guide

## Prerequisites
- AWS Account with AdministratorAccess / IAM credentials
- MongoDB Atlas Cluster URI
- GitHub Repository with Actions enabled

## Step 1: Local Setup & Build Test
```bash
git clone https://github.com/your-username/Multi-Tier-Web-Application-CI-CD.git
cd Multi-Tier-Web-Application-CI-CD
npm install
npm run build
```

## Step 2: Configure Environment Variables
Copy `.env.example` to `.env` and fill in secrets:
- `JWT_SECRET`
- `MONGODB_URI`
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_S3_BUCKET`
- `AWS_CLOUDFRONT_DISTRIBUTION_ID`
- `EC2_HOST`
- `EC2_SSH_KEY`

## Step 3: Trigger Automated GitHub Actions Pipeline
Push code to branch `main` to initiate automated testing, building, S3 deployment, CloudFront cache purge, and EC2 PM2 deployment.
