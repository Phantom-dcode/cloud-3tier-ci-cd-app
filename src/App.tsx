import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import { Dashboard } from './pages/Dashboard';
import { UsersPage } from './pages/Users';
import { ProductsPage } from './pages/Products';
import { OrdersPage } from './pages/Orders';
import { ProfilePage } from './pages/Profile';
import { SettingsPage } from './pages/Settings';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { NotFound } from './pages/NotFound';

const MainContent: React.FC = () => {
  const [currentPath, setCurrentPath] = useState('/');
  const { isAuthenticated } = useAuth();

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
  };

  const renderView = () => {
    switch (currentPath) {
      case '/':
        return (
          <ProtectedRoute onNavigateToLogin={() => setCurrentPath('/login')}>
            <Dashboard onNavigate={handleNavigate} />
          </ProtectedRoute>
        );
      case '/users':
        return (
          <ProtectedRoute requiredRoles={['admin', 'manager']} onNavigateToLogin={() => setCurrentPath('/login')}>
            <UsersPage />
          </ProtectedRoute>
        );
      case '/products':
        return (
          <ProtectedRoute onNavigateToLogin={() => setCurrentPath('/login')}>
            <ProductsPage />
          </ProtectedRoute>
        );
      case '/orders':
        return (
          <ProtectedRoute onNavigateToLogin={() => setCurrentPath('/login')}>
            <OrdersPage />
          </ProtectedRoute>
        );
      case '/profile':
        return (
          <ProtectedRoute onNavigateToLogin={() => setCurrentPath('/login')}>
            <ProfilePage />
          </ProtectedRoute>
        );
      case '/settings':
        return (
          <ProtectedRoute requiredRoles={['admin']} onNavigateToLogin={() => setCurrentPath('/login')}>
            <SettingsPage />
          </ProtectedRoute>
        );
      case '/login':
        return (
          <Login
            onNavigateToRegister={() => setCurrentPath('/register')}
            onSuccess={() => setCurrentPath('/')}
          />
        );
      case '/register':
        return (
          <Register
            onNavigateToLogin={() => setCurrentPath('/login')}
            onSuccess={() => setCurrentPath('/')}
          />
        );
      default:
        return <NotFound onNavigateHome={() => setCurrentPath('/')} />;
    }
  };

  const isAuthPage = currentPath === '/login' || currentPath === '/register';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-600 selection:text-white">
      <Navbar />

      <div className="flex-1 flex overflow-hidden">
        {isAuthenticated && !isAuthPage && (
          <Sidebar currentPath={currentPath} onNavigate={handleNavigate} />
        )}

        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            {renderView()}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <MainContent />
      </ToastProvider>
    </AuthProvider>
  );
}
