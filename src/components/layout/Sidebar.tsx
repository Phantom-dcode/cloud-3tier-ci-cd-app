import React from 'react';
import { LayoutDashboard, Users, Package, ShoppingCart, User, Settings, Layers, GitBranch, ShieldAlert } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentPath, onNavigate }) => {
  const { user } = useAuth();

  const navItems = [
    { label: 'Dashboard', path: '/', icon: LayoutDashboard, role: 'user' },
    { label: 'Users Management', path: '/users', icon: Users, role: 'manager' },
    { label: 'Products Catalog', path: '/products', icon: Package, role: 'user' },
    { label: 'Orders & Fulfillment', path: '/orders', icon: ShoppingCart, role: 'user' },
    { label: 'Profile & Credentials', path: '/profile', icon: User, role: 'user' },
    { label: 'System Settings', path: '/settings', icon: Settings, role: 'admin' },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between p-4 shrink-0">
      <div className="space-y-6">
        <div className="px-2 pt-2">
          <p className="text-[10px] font-bold tracking-wider text-slate-500 uppercase mb-2">Primary Modules</p>
          <nav className="space-y-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = currentPath === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => onNavigate(item.path)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="px-2 pt-2 border-t border-slate-800/80">
          <p className="text-[10px] font-bold tracking-wider text-slate-500 uppercase mb-2">Tier Topology</p>
          <div className="space-y-2 text-xs text-slate-400 bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5"><Layers className="w-3.5 h-3.5 text-sky-400" /> Tier 1</span>
              <span className="text-[10px] bg-slate-800 text-sky-300 px-2 py-0.5 rounded">S3 + CDN</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5"><GitBranch className="w-3.5 h-3.5 text-indigo-400" /> Tier 2</span>
              <span className="text-[10px] bg-slate-800 text-indigo-300 px-2 py-0.5 rounded">EC2 + Express</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5"><ShieldAlert className="w-3.5 h-3.5 text-emerald-400" /> Tier 3</span>
              <span className="text-[10px] bg-slate-800 text-emerald-300 px-2 py-0.5 rounded">Mongo Atlas</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-3 bg-gradient-to-br from-indigo-950/40 to-slate-900 border border-indigo-500/20 rounded-xl text-center">
        <p className="text-[11px] font-semibold text-indigo-300">Automated CI/CD</p>
        <p className="text-[10px] text-slate-400 mt-1">GitHub Actions • S3 • EC2 SSH PM2</p>
      </div>
    </aside>
  );
};
