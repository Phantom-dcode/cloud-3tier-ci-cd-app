import React from 'react';
import { Server, Database, Cloud, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900/80 border-t border-slate-800 py-4 px-6 text-xs text-slate-400 flex flex-col md:flex-row items-center justify-between gap-3">
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1.5"><Cloud className="w-3.5 h-3.5 text-sky-400" /> AWS EC2 + S3</span>
        <span className="flex items-center gap-1.5"><Server className="w-3.5 h-3.5 text-indigo-400" /> Node.js Express API</span>
        <span className="flex items-center gap-1.5"><Database className="w-3.5 h-3.5 text-emerald-400" /> MongoDB Atlas NoSQL</span>
        <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> JWT Auth</span>
      </div>
      <div className="text-slate-500 text-[11px]">
        © 2026 Multi-Tier Enterprise Web Application with GitHub Actions CI/CD
      </div>
    </footer>
  );
};
