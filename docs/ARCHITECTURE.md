# Multi-Tier System Architecture Specification

## Architecture Overview

This production-grade multi-tier web application implements an enterprise 3-tier decoupled cloud topology designed for high availability, security isolation, and linear scalability.

```
+-----------------------------------------------------------------------+
|                         PRESENTATION LAYER                            |
|  React 19 + Vite + Tailwind CSS SPA served via AWS S3 + CloudFront CDN |
+-----------------------------------------------------------------------+
                                  |
                           HTTPS REST Calls
                                  v
+-----------------------------------------------------------------------+
|                        BUSINESS LOGIC LAYER                           |
| Node.js Express REST API running on AWS EC2 behind Nginx & PM2 Proxy  |
+-----------------------------------------------------------------------+
                                  |
                            MongoDB Protocol
                                  v
+-----------------------------------------------------------------------+
|                          DATA STORAGE LAYER                           |
|       MongoDB Atlas NoSQL Distributed Database Cluster with Indexes   |
+-----------------------------------------------------------------------+
```

## Security Design & Best Practices
1. **Zero-Trust Token Auth:** JWT authentication with expiration & bcrypt password hashing.
2. **Reverse Proxy:** Nginx handling SSL termination, rate limiting, and header masking.
3. **Database Isolation:** MongoDB Atlas accessible only via whitelisted VPC/IP ranges.
4. **WAF & Security Groups:** Restricted AWS Security Groups permitting SSH only from management IP and HTTP/HTTPS traffic.
