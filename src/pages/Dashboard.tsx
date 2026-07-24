import React, { useEffect, useState } from 'react';
import { DashboardStats } from '../types';
import { api } from '../services/api';
import { StatsCard } from '../components/dashboard/StatsCard';
import { AnalyticsChart } from '../components/dashboard/AnalyticsChart';
import { RecentActivity } from '../components/dashboard/RecentActivity';
import { Loader } from '../components/common/Loader';
import { Card } from '../components/common/Card';
import { DollarSign, ShoppingCart, Users, Package, RefreshCw, Layers, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '../components/common/Button';

interface DashboardProps {
  onNavigate: (path: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStats = async () => {
    setRefreshing(true);
    const res = await api.get<DashboardStats>('/dashboard/stats');
    if (res.success && res.data) {
      setStats(res.data);
    }
    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return <Loader text="Loading live analytics metrics..." size="lg" />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-100">Enterprise Dashboard</h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time multi-tier infrastructure telemetry, revenue analytics, and system audit logs.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchStats}
            isLoading={refreshing}
            icon={<RefreshCw className="w-3.5 h-3.5" />}
          >
            Refresh Telemetry
          </Button>
        </div>
      </div>

      {stats && (
        <>
          {/* Top 4 Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard
              title="TOTAL REVENUE"
              value={`$${stats.totalRevenue.toLocaleString()}`}
              growth={stats.revenueGrowth}
              icon={<DollarSign className="w-5 h-5" />}
              iconBg="bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
            />
            <StatsCard
              title="TOTAL ORDERS"
              value={stats.totalOrders}
              growth={stats.ordersGrowth}
              icon={<ShoppingCart className="w-5 h-5" />}
              iconBg="bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
            />
            <StatsCard
              title="ACTIVE USERS"
              value={stats.activeUsers}
              growth={stats.usersGrowth}
              icon={<Users className="w-5 h-5" />}
              iconBg="bg-sky-500/10 text-sky-400 border-sky-500/20"
            />
            <StatsCard
              title="INVENTORY STOCK"
              value={stats.inventoryCount}
              subtitle={`${stats.lowStockItems} low stock alerts`}
              icon={<Package className="w-5 h-5" />}
              iconBg="bg-amber-500/10 text-amber-400 border-amber-500/20"
            />
          </div>

          {/* Main Charts & Activities */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card
              title="Revenue Trajectory & Orders"
              subtitle="Monthly aggregated gross revenue across all connected tiers"
              className="lg:col-span-2"
            >
              <AnalyticsChart data={stats.monthlyRevenue} />
            </Card>

            <Card
              title="Audit Log & Activity"
              subtitle="Latest system activities and security events"
              action={
                <Button size="sm" variant="ghost" onClick={() => onNavigate('/settings')}>
                  View All
                </Button>
              }
            >
              <RecentActivity activities={stats.recentActivities} />
            </Card>
          </div>

          {/* Bottom Quick Controls & Architecture Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card title="Quick Management Shortcuts" subtitle="Fast administrative workflows">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => onNavigate('/users')}
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-indigo-500/50 text-left transition-colors"
                >
                  <Users className="w-4 h-4 text-sky-400 mb-1.5" />
                  <span className="font-semibold text-slate-200 block">Manage Users</span>
                  <span className="text-[10px] text-slate-500">Roles & Access</span>
                </button>

                <button
                  onClick={() => onNavigate('/products')}
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-indigo-500/50 text-left transition-colors"
                >
                  <Package className="w-4 h-4 text-indigo-400 mb-1.5" />
                  <span className="font-semibold text-slate-200 block">Catalog</span>
                  <span className="text-[10px] text-slate-500">Products & Inventory</span>
                </button>

                <button
                  onClick={() => onNavigate('/orders')}
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-indigo-500/50 text-left transition-colors"
                >
                  <ShoppingCart className="w-4 h-4 text-emerald-400 mb-1.5" />
                  <span className="font-semibold text-slate-200 block">Fulfillment</span>
                  <span className="text-[10px] text-slate-500">Process Orders</span>
                </button>

                <button
                  onClick={() => onNavigate('/settings')}
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-indigo-500/50 text-left transition-colors"
                >
                  <Zap className="w-4 h-4 text-amber-400 mb-1.5" />
                  <span className="font-semibold text-slate-200 block">CI/CD Config</span>
                  <span className="text-[10px] text-slate-500">AWS & Workflows</span>
                </button>
              </div>
            </Card>

            <Card title="Architecture Status" subtitle="3-Tier Microservices Health">
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="flex items-center gap-2 text-slate-300">
                    <Layers className="w-4 h-4 text-sky-400" /> Tier 1: Frontend (S3 + CloudFront)
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20">HEALTHY</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="flex items-center gap-2 text-slate-300">
                    <Zap className="w-4 h-4 text-indigo-400" /> Tier 2: Backend API (AWS EC2)
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20">ONLINE</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="flex items-center gap-2 text-slate-300">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" /> Tier 3: Database (MongoDB Atlas)
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20">CONNECTED</span>
                </div>
              </div>
            </Card>

            <Card title="Category Distribution" subtitle="Inventory proportions by category">
              <div className="space-y-2 text-xs">
                {stats.categoryDistribution.map((cat, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded bg-slate-950">
                    <span className="text-slate-300 font-medium">{cat.name}</span>
                    <span className="text-indigo-400 font-bold bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-800">{cat.value} items</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};
