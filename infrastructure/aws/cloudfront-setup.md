# AWS CloudFront CDN Setup

1. Create CloudFront Web Distribution.
2. Set Origin Domain to S3 bucket endpoint.
3. Set Default Root Object to `index.html`.
4. Configure Custom Error Responses:
   - Error Code `403` & `404` -> Response Code `200`, Path `/index.html` (Supports React SPA client-side routing).
