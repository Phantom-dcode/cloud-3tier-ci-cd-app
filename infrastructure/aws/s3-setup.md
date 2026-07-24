# AWS S3 Bucket Setup

1. Create bucket `multi-tier-web-app-frontend`.
2. Disable "Block all public access" if using static website hosting, or create Origin Access Control (OAC) for CloudFront integration.
3. Configure CORS policy:
```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": []
  }
]
```
