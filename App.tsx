
import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import PageConnector from './components/PageConnector';
import RulesEditor from './components/RulesEditor';
import Inbox from './components/Inbox';
import ActivityLog from './components/ActivityLog';
import Billing from './components/Billing';
import Settings from './components/Settings';
import LandingPage from './components/LandingPage';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import AdminDashboard from './components/Admin/AdminDashboard';
import { Bell, User, Search } from 'lucide-react';

const Header = ({ mode }: { mode: 'user' | 'admin' }) => (
  <header className="h-20 glass border-b border-white/30 flex items-center justify-between px-10 sticky top-0 z-20 backdrop-blur-2xl">
    <div className="flex items-center gap-6">
       <div className="relative hidden md:block">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="ابحث عن صفحات، عملاء، أو سجلات..." 
            className="pr-12 pl-6 py-2.5 glass-input rounded-2xl text-xs font-bold outline-none w-80"
          />
       </div>
    </div>
    
    <div className="flex items-center gap-6">
      <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl border font-bold text-[10px] uppercase tracking-wider ${mode === 'admin' ? 'bg-purple-50 border-purple-200 text-purple-700' : 'bg-emerald-50 border-emerald-200 text-emerald-700'}`}>
        <div className={`w-2 h-2 rounded-full animate-pulse ${mode === 'admin' ? 'bg-purple-600' : 'bg-emerald-600'}`}></div>
        <span>{mode === 'admin' ? 'تحكم المسؤول نشط' : 'الذكاء الاصطناعي متصل'}</span>
      </div>

      <div className="flex items-center gap-5 border-r border-slate-200 pr-6">
        <div className="relative p-2.5 glass-card hover:bg-white transition cursor-pointer rounded-xl group shadow-sm">
          <Bell size={20} className="text-slate-500 group-hover:text-blue-600 transition" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white shadow-sm"></span>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden text-left md:block text-right">
            <p className="text-sm font-bold text-slate-900 leading-none mb-1">أحمد المشرف</p>
            <p className={`text-[9px] font-bold uppercase tracking-widest ${mode === 'admin' ? 'text-purple-600' : 'text-blue-600'}`}>
              {mode === 'admin' ? 'أدمن النظام' : 'خطة برو فعال'}
            </p>
          </div>
          <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-white shadow-xl ${mode === 'admin' ? 'bg-purple-600 shadow-purple-500/20' : 'bg-blue-600 shadow-blue-500/20'}`}>
            <User size={22} />
          </div>
        </div>
      </div>
    </div>
  </header>
);

const AppContent = () => {
  const location = useLocation();
  const isLanding = location.pathname === '/landing' || location.pathname === '/landing/';
  const isAuth = ['/login', '/register'].includes(location.pathname);
  const isAdmin = location.pathname.startsWith('/admin');

  if (isLanding || isAuth) {
    return (
      <Routes>
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    );
  }

  const mode = isAdmin ? 'admin' : 'user';

  return (
    <div className="flex min-h-screen">
      <Sidebar mode={mode} />
      <main className="flex-1 mr-64 overflow-hidden relative">
        <Header mode={mode} />
        <div className="p-10 max-w-7xl mx-auto min-h-[calc(100vh-80px)] overflow-y-auto">
          <Routes>
            {/* User Routes */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/pages" element={<PageConnector />} />
            <Route path="/rules" element={<RulesEditor />} />
            <Route path="/inbox" element={<Inbox />} />
            <Route path="/activity" element={<ActivityLog />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/settings" element={<Settings />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminDashboard />} />
            <Route path="/admin/plans" element={<AdminDashboard />} />
            <Route path="/admin/cms" element={<AdminDashboard />} />
            <Route path="/admin/settings" element={<AdminDashboard />} />

            <Route path="*" element={<Dashboard />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
