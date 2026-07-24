# Nginx Reverse Proxy Configuration Guide

Nginx acts as the primary reverse proxy on the AWS EC2 instance, forwarding external HTTP/HTTPS traffic to the Node.js Express process running on port 3000.

## Configuration File Location
Save the configuration at `/etc/nginx/sites-available/multi-tier-app.conf`.

## Nginx Config Example
```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Enable Site & Restart Nginx
```bash
sudo ln -s /etc/nginx/sites-available/multi-tier-app.conf /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```
