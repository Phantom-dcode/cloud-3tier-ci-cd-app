import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { LogOut, User, Shield, Terminal, Activity } from 'lucide-react';
import { Badge } from '../common/Loader';

interface NavbarProps {
  onToggleSidebar?: () => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 h-16 bg-slate-900/90 border-b border-slate-800 backdrop-blur-md px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-indigo-600/20 text-indigo-400 rounded-xl border border-indigo-500/30">
          <Terminal className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-sm font-bold text-slate-100 tracking-wide flex items-center gap-2">
            Cloud Tier Enterprise <span className="text-xs font-normal text-indigo-400 bg-indigo-950/60 border border-indigo-800/50 px-2 py-0.5 rounded-full">v2.4</span>
          </h1>
          <p className="text-[11px] text-slate-400 hidden sm:block">
            AWS EC2 • S3 + CloudFront • MongoDB Atlas • Express REST API
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
          <Activity className="w-3.5 h-3.5 animate-pulse" />
          <span>CI/CD Pipeline Operational</span>
        </div>

        {user && (
          <div className="flex items-center gap-3 pl-3 border-l border-slate-800">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-semibold text-slate-200">{user.name}</p>
              <div className="flex items-center justify-end gap-1.5 mt-0.5">
                <Badge variant={user.role === 'admin' ? 'danger' : user.role === 'manager' ? 'warning' : 'info'}>
                  {user.role.toUpperCase()}
                </Badge>
              </div>
            </div>
            <img
              src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}
              alt={user.name}
              className="w-9 h-9 rounded-full ring-2 ring-indigo-500/40 object-cover"
            />
            <button
              onClick={logout}
              title="Logout"
              className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
