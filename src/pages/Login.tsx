import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Terminal, Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '../components/common/Button';

interface LoginProps {
  onNavigateToRegister: () => void;
  onSuccess: () => void;
}

export const Login: React.FC<LoginProps> = ({ onNavigateToRegister, onSuccess }) => {
  const { login } = useAuth();
  const { showToast } = useToast();
  const [email, setEmail] = useState('admin@cloud enterprise.com');
  const [password, setPassword] = useState('admin123');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await login(email, password);
    setIsLoading(false);
    if (res.success) {
      showToast('Welcome back! JWT session authenticated.', 'success');
      onSuccess();
    } else {
      showToast(res.error || 'Invalid credentials.', 'error');
    }
  };

  const handleQuickLogin = (quickEmail: string, quickPw: string) => {
    setEmail(quickEmail);
    setPassword(quickPw);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="p-3 bg-indigo-600/20 text-indigo-400 rounded-2xl border border-indigo-500/30 mb-3">
            <Terminal className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-100">Enterprise Sign In</h2>
          <p className="text-xs text-slate-400 mt-1">
            Access Multi-Tier Microservices & AWS Management Layer
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="name@company.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          <Button type="submit" isLoading={isLoading} className="w-full mt-2" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
            Authenticate Session
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-800 text-center">
          <p className="text-xs text-slate-400">
            Need an account?{' '}
            <button
              onClick={onNavigateToRegister}
              className="text-indigo-400 hover:text-indigo-300 font-semibold underline underline-offset-4"
            >
              Register New User
            </button>
          </p>
        </div>

        <div className="mt-6 p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Demo Credentials
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => handleQuickLogin('admin@cloud enterprise.com', 'admin123')}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-left hover:border-indigo-500/50 transition-colors"
            >
              <span className="font-semibold text-indigo-300 block">Admin Role</span>
              <span className="text-[10px] text-slate-500">Full Privileges</span>
            </button>
            <button
              onClick={() => handleQuickLogin('user@cloud enterprise.com', 'user123')}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-left hover:border-indigo-500/50 transition-colors"
            >
              <span className="font-semibold text-emerald-300 block">User Role</span>
              <span className="text-[10px] text-slate-500">Standard Access</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
