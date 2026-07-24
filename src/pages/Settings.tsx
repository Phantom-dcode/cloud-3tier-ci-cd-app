import React, { useEffect, useState } from 'react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Loader';
import { api } from '../services/api';
import { Settings, Server, Database, Cloud, GitBranch, CheckCircle2, Shield, RefreshCw } from 'lucide-react';
import { Button } from '../components/common/Button';

export const SettingsPage: React.FC = () => {
  const [healthData, setHealthData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchHealth = async () => {
    setLoading(true);
    const res = await api.get('/health');
    if (res) setHealthData(res);
    setLoading(false);
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-100 flex items-center gap-2">
            <Settings className="w-6 h-6 text-indigo-400" /> System Settings & Telemetry
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Production environment topology, AWS service endpoints, and GitHub Actions CI/CD configuration.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={fetchHealth}
          isLoading={loading}
          icon={<RefreshCw className="w-3.5 h-3.5" />}
        >
          Check Backend Health
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Backend API Health" subtitle="Express API service runtime status">
          {healthData ? (
            <div className="space-y-3 text-xs">
              <div className="flex justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400">Status</span>
                <Badge variant="success">{healthData.status}</Badge>
              </div>
              <div className="flex justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400">Uptime</span>
                <span className="font-mono text-indigo-300">{(healthData.uptime || 0).toFixed(1)} seconds</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400">Service</span>
                <span className="font-semibold text-slate-200">{healthData.service}</span>
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-400">Click Check Backend Health to pull telemetry.</p>
          )}
        </Card>

        <Card title="AWS & Infrastructure Binding" subtitle="Configured Cloud Services">
          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="flex items-center gap-2 text-slate-300">
                <Cloud className="w-4 h-4 text-sky-400" /> Tier 1: Frontend S3 + CloudFront
              </span>
              <span className="font-mono text-sky-300 text-[10px]">d123456.cloudfront.net</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="flex items-center gap-2 text-slate-300">
                <Server className="w-4 h-4 text-indigo-400" /> Tier 2: Backend EC2 Instance
              </span>
              <span className="font-mono text-indigo-300 text-[10px]">ec2-3-85-100-20.compute.amazonaws.com</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="flex items-center gap-2 text-slate-300">
                <Database className="w-4 h-4 text-emerald-400" /> Tier 3: MongoDB Atlas Cluster
              </span>
              <span className="font-mono text-emerald-300 text-[10px]">cluster0.mongodb.net</span>
            </div>
          </div>
        </Card>
      </div>

      <Card title="CI/CD GitHub Actions Workflows" subtitle="Automated continuous integration and deployment pipeline">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-200">ci.yml</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-slate-400 text-[11px]">Linting, TypeScript compilation & unit testing</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-200">cd.yml</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-slate-400 text-[11px]">End-to-end continuous deployment trigger</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-200">frontend-deploy.yml</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-slate-400 text-[11px]">Vite build, AWS S3 sync, CloudFront invalidation</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-200">backend-deploy.yml</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-slate-400 text-[11px]">SSH EC2 deployment & PM2 process restart</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
