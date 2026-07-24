# AWS Infrastructure Setup Guide

## 1. Amazon EC2 Instance Setup
1. Launch an **Ubuntu 24.04 LTS** EC2 instance (`t3.medium` recommended).
2. Attach Security Group allowing:
   - Port 22 (SSH)
   - Port 80 (HTTP)
   - Port 443 (HTTPS)
   - Port 3000 (Backend Express Internal Port)
3. SSH into EC2 and run Node.js 20 & PM2 installation scripts:
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs nginx git
sudo npm install -g pm2
```

## 2. Amazon S3 Bucket & CloudFront CDN
1. Create S3 Bucket `multi-tier-frontend-assets`.
2. Enable Static Web Hosting or CloudFront Origin Access Control (OAC).
3. Create CloudFront Distribution pointing to the S3 Origin.
