# AWS IAM Setup Guide

1. Create IAM User `github-actions-deployer`.
2. Attach inline policies or managed policies:
   - `AmazonS3FullAccess`
   - `CloudFrontFullAccess`
3. Generate Access Key ID & Secret Access Key for GitHub Secrets configuration.
