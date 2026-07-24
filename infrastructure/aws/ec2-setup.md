# AWS EC2 Setup Documentation

1. Provision Ubuntu 24.04 LTS instance.
2. Allocate Elastic IP address and attach to instance.
3. Configure SSH key pair.
4. Install Node.js 20, PM2, and Nginx.
5. Clone repository and run `npm run build`.
6. Start process via PM2: `pm2 start ecosystem.config.js --env production`.
