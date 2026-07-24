# AWS Security Group Rules

## Inbound Rules
| Type | Protocol | Port Range | Source | Purpose |
| --- | --- | --- | --- | --- |
| SSH | TCP | 22 | Admin IP / 32 | Remote SSH Access |
| HTTP | TCP | 80 | 0.0.0.0/0 | Web Traffic |
| HTTPS | TCP | 443 | 0.0.0.0/0 | Secure Web Traffic |
| Custom TCP | TCP | 3000 | 0.0.0.0/0 | Backend Express Port |

## Outbound Rules
| Type | Protocol | Port Range | Destination | Purpose |
| --- | --- | --- | --- | --- |
| All traffic | ALL | ALL | 0.0.0.0/0 | Outbound Internet Access |
