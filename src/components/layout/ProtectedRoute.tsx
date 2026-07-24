import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Loader } from '../common/Loader';
import { ShieldAlert } from 'lucide-react';
import { UserRole } from '../../types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: UserRole[];
  onNavigateToLogin: () => void;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRoles,
  onNavigateToLogin,
}) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Loader text="Authenticating enterprise credentials..." size="lg" />;
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
        <div className="p-4 bg-rose-500/10 text-rose-400 rounded-full border border-rose-500/20 mb-4">
          <ShieldAlert className="w-10 h-10" />
        </div>
        <h2 className="text-xl font-bold text-slate-100 mb-2">Authentication Required</h2>
        <p className="text-sm text-slate-400 max-w-md mb-6">
          Please log in with your credentials to access protected system modules and APIs.
        </p>
        <button
          onClick={onNavigateToLogin}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-all"
        >
          Sign In to Access
        </button>
      </div>
    );
  }

  if (requiredRoles && !requiredRoles.includes(user.role)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
        <div className="p-4 bg-amber-500/10 text-amber-400 rounded-full border border-amber-500/20 mb-4">
          <ShieldAlert className="w-10 h-10" />
        </div>
        <h2 className="text-xl font-bold text-slate-100 mb-2">Access Restricted</h2>
        <p className="text-sm text-slate-400 max-w-md mb-4">
          Your current role (<strong className="text-amber-300">{user.role.toUpperCase()}</strong>) does not have authorization for this module. Required role: {requiredRoles.join(', ')}.
        </p>
      </div>
    );
  }

  return <>{children}</>;
};
