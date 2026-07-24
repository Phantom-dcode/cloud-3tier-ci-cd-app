import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  growth?: number;
  subtitle?: string;
  icon: React.ReactNode;
  iconBg?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  growth,
  subtitle,
  icon,
  iconBg = 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
}) => {
  const isPositive = growth !== undefined && growth >= 0;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl transition-all hover:border-slate-700">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-400">{title}</p>
          <h3 className="text-2xl font-bold text-slate-100 mt-1">{value}</h3>
        </div>
        <div className={`p-3 rounded-xl border ${iconBg}`}>
          {icon}
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-800/80 text-xs">
        {growth !== undefined ? (
          <div className={`flex items-center gap-1 font-semibold ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
            {isPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
            <span>{isPositive ? `+${growth}%` : `${growth}%`}</span>
            <span className="text-slate-500 font-normal">vs last month</span>
          </div>
        ) : (
          <span className="text-slate-400">{subtitle}</span>
        )}
      </div>
    </div>
  );
};
