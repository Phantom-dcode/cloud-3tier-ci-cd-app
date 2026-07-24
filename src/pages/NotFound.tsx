import React from 'react';
import { AlertTriangle, Home } from 'lucide-react';
import { Button } from '../components/common/Button';

export const NotFound: React.FC<{ onNavigateHome: () => void }> = ({ onNavigateHome }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
      <div className="p-4 bg-amber-500/10 text-amber-400 rounded-full border border-amber-500/20 mb-4">
        <AlertTriangle className="w-12 h-12" />
      </div>
      <h1 className="text-4xl font-black text-slate-100 mb-2">404</h1>
      <h2 className="text-xl font-bold text-slate-200 mb-2">Endpoint or Route Not Found</h2>
      <p className="text-xs text-slate-400 max-w-md mb-6">
        The route you are trying to access does not exist in this multi-tier application.
      </p>
      <Button onClick={onNavigateHome} icon={<Home className="w-4 h-4" />}>
        Return to Dashboard
      </Button>
    </div>
  );
};
