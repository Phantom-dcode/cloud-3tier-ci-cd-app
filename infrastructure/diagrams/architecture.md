# Multi-Tier Architecture Diagrams

```
+-----------------------------------------------------------------------------+
|                             AWS CLOUD INFRASTRUCTURE                        |
|                                                                             |
|  +---------------------------+             +-----------------------------+  |
|  |     PRESENTATION TIER     |             |      APPLICATION TIER       |  |
|  |                           |             |                             |  |
|  | Amazon S3                 |  HTTPS API  | Amazon EC2 (Ubuntu)         |  |
|  | (Static React App)        | ----------> | - Nginx Reverse Proxy       |  |
|  |         |                 |             | - Node.js Express REST API  |  |
|  |         v                 |             | - PM2 Cluster Manager       |  |
|  | AWS CloudFront CDN        |             +-----------------------------+  |
|  +---------------------------+                            |                 |
|                                                           | Mongoose        |
|                                                           v                 |
|                                            +-----------------------------+  |
|                                            |        DATABASE TIER        |  |
|                                            |                             |  |
|                                            | MongoDB Atlas Cluster       |  |
|                                            | (Users, Products, Orders)   |  |
|                                            +-----------------------------+  |
+-----------------------------------------------------------------------------+
```
