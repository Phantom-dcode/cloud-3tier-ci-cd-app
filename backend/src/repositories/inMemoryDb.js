import bcrypt from 'bcryptjs';

// Pre-seeded password hash for 'admin123' and 'user123'
const defaultAdminPassword = bcrypt.hashSync('admin123', 10);
const defaultUserPassword = bcrypt.hashSync('user123', 10);

export const initialUsers = [
  {
    id: 'usr-1',
    name: 'Sarah Connor',
    email: 'admin@cloud enterprise.com',
    password: defaultAdminPassword,
    role: 'admin',
    status: 'active',
    department: 'Cloud Ops & DevOps',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    lastLogin: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 120).toISOString(),
  },
  {
    id: 'usr-2',
    name: 'Marcus Vance',
    email: 'manager@cloud enterprise.com',
    password: defaultAdminPassword,
    role: 'manager',
    status: 'active',
    department: 'Infrastructure Management',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    lastLogin: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 90).toISOString(),
  },
  {
    id: 'usr-3',
    name: 'Elena Rostova',
    email: 'user@cloud enterprise.com',
    password: defaultUserPassword,
    role: 'user',
    status: 'active',
    department: 'Product Engineering',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    lastLogin: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45).toISOString(),
  },
  {
    id: 'usr-4',
    name: 'David Chen',
    email: 'd.chen@cloud enterprise.com',
    password: defaultUserPassword,
    role: 'user',
    status: 'inactive',
    department: 'Quality Assurance',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    lastLogin: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
  }
];

export const initialProducts = [
  {
    id: 'prod-1',
    name: 'AWS Cloud Architecture Bundle v4',
    sku: 'AWS-ARC-001',
    category: 'Cloud Solutions',
    price: 499.00,
    stock: 45,
    status: 'in_stock',
    description: 'Enterprise-grade multi-tier architecture templates with automated Terraform modules and CI/CD pipelines.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60).toISOString(),
  },
  {
    id: 'prod-2',
    name: 'Kubernetes Cluster Monitoring Probe',
    sku: 'K8S-MON-002',
    category: 'DevOps & Tooling',
    price: 299.00,
    stock: 8,
    status: 'low_stock',
    description: 'Real-time telemetry and anomaly detection node agent for production EKS/GKE clusters.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45).toISOString(),
  },
  {
    id: 'prod-3',
    name: 'Secure API Gateway License',
    sku: 'SEC-GW-003',
    category: 'Security',
    price: 899.00,
    stock: 100,
    status: 'in_stock',
    description: 'OAuth2/JWT proxy with WAF rules, DDoS protection, and rate-limiting middleware.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
  },
  {
    id: 'prod-4',
    name: 'Serverless Edge Accelerator',
    sku: 'SRV-EDG-004',
    category: 'Cloud Solutions',
    price: 199.00,
    stock: 0,
    status: 'out_of_stock',
    description: 'Ultra-low latency global routing worker with automatic CDN cache purge integration.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(),
  },
  {
    id: 'prod-5',
    name: 'PostgreSQL Distributed Cluster Manager',
    sku: 'DB-PG-005',
    category: 'Database & Storage',
    price: 1250.00,
    stock: 22,
    status: 'in_stock',
    description: 'Multi-region failover and read-replica orchestration engine with WAL archiver.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
  }
];

export const initialOrders = [
  {
    id: 'ord-101',
    orderNumber: 'ORD-2026-8801',
    customerName: 'Acme Cloud Technologies',
    customerEmail: 'billing@acmecloud.io',
    items: [
      { productId: 'prod-1', productName: 'AWS Cloud Architecture Bundle v4', quantity: 2, unitPrice: 499.00 },
      { productId: 'prod-3', productName: 'Secure API Gateway License', quantity: 1, unitPrice: 899.00 }
    ],
    totalAmount: 1897.00,
    status: 'delivered',
    paymentStatus: 'paid',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
  },
  {
    id: 'ord-102',
    orderNumber: 'ORD-2026-8802',
    customerName: 'Nexus Digital Systems',
    customerEmail: 'devops@nexusdigital.com',
    items: [
      { productId: 'prod-2', productName: 'Kubernetes Cluster Monitoring Probe', quantity: 3, unitPrice: 299.00 }
    ],
    totalAmount: 897.00,
    status: 'processing',
    paymentStatus: 'paid',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
  },
  {
    id: 'ord-103',
    orderNumber: 'ORD-2026-8803',
    customerName: 'Apex Financial Systems',
    customerEmail: 'infra@apexfin.org',
    items: [
      { productId: 'prod-5', productName: 'PostgreSQL Distributed Cluster Manager', quantity: 1, unitPrice: 1250.00 }
    ],
    totalAmount: 1250.00,
    status: 'shipped',
    paymentStatus: 'paid',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
  },
  {
    id: 'ord-104',
    orderNumber: 'ORD-2026-8804',
    customerName: 'Global Logistics Corp',
    customerEmail: 'tech@globallogistics.com',
    items: [
      { productId: 'prod-1', productName: 'AWS Cloud Architecture Bundle v4', quantity: 1, unitPrice: 499.00 }
    ],
    totalAmount: 499.00,
    status: 'pending',
    paymentStatus: 'pending',
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  }
];

export const initialActivities = [
  {
    id: 'act-1',
    userId: 'usr-1',
    userName: 'Sarah Connor',
    userRole: 'admin',
    action: 'USER_LOGIN',
    category: 'auth',
    details: 'User authenticated via JWT from IP 192.168.1.45',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    ipAddress: '192.168.1.45',
  },
  {
    id: 'act-2',
    userId: 'usr-1',
    userName: 'Sarah Connor',
    userRole: 'admin',
    action: 'ORDER_STATUS_UPDATE',
    category: 'order',
    details: 'Order ORD-2026-8801 status updated to delivered',
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    ipAddress: '192.168.1.45',
  },
  {
    id: 'act-3',
    userId: 'usr-2',
    userName: 'Marcus Vance',
    userRole: 'manager',
    action: 'PRODUCT_INVENTORY_UPDATE',
    category: 'product',
    details: 'Updated stock count for Kubernetes Cluster Monitoring Probe to 8',
    timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    ipAddress: '10.0.4.12',
  },
  {
    id: 'act-4',
    userId: 'usr-1',
    userName: 'Sarah Connor',
    userRole: 'admin',
    action: 'SYSTEM_BACKUP_SUCCESS',
    category: 'system',
    details: 'Automated snapshot backup created on AWS S3 bucket cloud-tier-backups',
    timestamp: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
    ipAddress: '127.0.0.1',
  }
];

class InMemoryDatabase {
  constructor() {
    this.users = [...initialUsers];
    this.products = [...initialProducts];
    this.orders = [...initialOrders];
    this.activities = [...initialActivities];
  }

  logActivity(userId, userName, userRole, action, category, details, ipAddress = '127.0.0.1') {
    const newAct = {
      id: `act-${Date.now()}`,
      userId,
      userName,
      userRole,
      action,
      category,
      details,
      timestamp: new Date().toISOString(),
      ipAddress,
    };
    this.activities.unshift(newAct);
    return newAct;
  }
}

export const inMemoryDb = new InMemoryDatabase();
