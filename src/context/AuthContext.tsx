import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '../types';
import { api, getStoredToken, setStoredToken, removeStoredToken } from '../services/api';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string, role?: string, department?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (data: Partial<User> & { password?: string }) => Promise<{ success: boolean; error?: string }>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: getStoredToken(),
    isAuthenticated: false,
    isLoading: true,
  });

  const refreshProfile = async () => {
    const token = getStoredToken();
    if (!token) {
      setState({ user: null, token: null, isAuthenticated: false, isLoading: false });
      return;
    }

    const res = await api.get<User>('/auth/profile');
    if (res.success && res.data) {
      setState({
        user: res.data,
        token,
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      removeStoredToken();
      setState({ user: null, token: null, isAuthenticated: false, isLoading: false });
    }
  };

  useEffect(() => {
    refreshProfile();
  }, []);

  const login = async (email: string, password: string) => {
    setState(prev => ({ ...prev, isLoading: true }));
    const res = await api.post<{ user: User; token: string }>('/auth/login', { email, password });
    if (res.success && res.data) {
      setStoredToken(res.data.token);
      setState({
        user: res.data.user,
        token: res.data.token,
        isAuthenticated: true,
        isLoading: false,
      });
      return { success: true };
    } else {
      setState(prev => ({ ...prev, isLoading: false }));
      return { success: false, error: res.error || 'Login failed' };
    }
  };

  const register = async (name: string, email: string, password: string, role = 'user', department = 'Engineering') => {
    setState(prev => ({ ...prev, isLoading: true }));
    const res = await api.post<{ user: User; token: string }>('/auth/register', { name, email, password, role, department });
    if (res.success && res.data) {
      setStoredToken(res.data.token);
      setState({
        user: res.data.user,
        token: res.data.token,
        isAuthenticated: true,
        isLoading: false,
      });
      return { success: true };
    } else {
      setState(prev => ({ ...prev, isLoading: false }));
      return { success: false, error: res.error || 'Registration failed' };
    }
  };

  const logout = () => {
    removeStoredToken();
    setState({ user: null, token: null, isAuthenticated: false, isLoading: false });
  };

  const updateProfile = async (data: Partial<User> & { password?: string }) => {
    const res = await api.put<User>('/auth/profile', data);
    if (res.success && res.data) {
      setState(prev => ({ ...prev, user: res.data! }));
      return { success: true };
    }
    return { success: false, error: res.error || 'Update failed' };
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        updateProfile,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
