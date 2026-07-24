import React from 'react';
import { Activity as ActivityType } from '../../types';
import { Activity, ShieldCheck, UserCheck, Package, ShoppingCart, Cpu } from 'lucide-react';

interface RecentActivityProps {
  activities: ActivityType[];
}

export const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  const getIcon = (category: string) => {
    switch (category) {
      case 'auth': return <ShieldCheck className="w-4 h-4 text-emerald-400" />;
      case 'user': return <UserCheck className="w-4 h-4 text-sky-400" />;
      case 'product': return <Package className="w-4 h-4 text-indigo-400" />;
      case 'order': return <ShoppingCart className="w-4 h-4 text-amber-400" />;
      default: return <Cpu className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-3">
      {activities.map(act => (
        <div
          key={act.id}
          className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/50 border border-slate-800/80 hover:border-slate-700 transition-colors"
        >
          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 shrink-0 mt-0.5">
            {getIcon(act.category)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-slate-200 truncate">{act.userName}</span>
              <span className="text-[10px] text-slate-500 whitespace-nowrap">
                {new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{act.details}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
