
import React from 'react';
import { 
  LayoutDashboard, 
  Settings, 
  MessageSquare, 
  Settings2, 
  Activity, 
  Facebook,
  CreditCard,
  LogOut,
  ShieldCheck,
  Home,
  Users,
  BarChart3,
  Globe
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  mode: 'user' | 'admin';
}

const Sidebar: React.FC<SidebarProps> = ({ mode }) => {
  const location = useLocation();

  const userMenuItems = [
    { icon: LayoutDashboard, label: 'الرئيسية', path: '/' },
    { icon: Facebook, label: 'الصفحات', path: '/pages' },
    { icon: Settings2, label: 'القواعد', path: '/rules' },
    { icon: MessageSquare, label: 'صندوق الوارد', path: '/inbox' },
    { icon: Activity, label: 'السجلات', path: '/activity' },
    { icon: CreditCard, label: 'الاشتراك', path: '/billing' },
  ];

  const adminMenuItems = [
    { icon: BarChart3, label: 'نظرة عامة', path: '/admin' },
    { icon: Users, label: 'إدارة المستخدمين', path: '/admin/users' },
    { icon: CreditCard, label: 'خطط الأسعار', path: '/admin/plans' },
    { icon: Globe, label: 'المحتوى العام', path: '/admin/cms' },
    { icon: Settings, label: 'إعدادات النظام', path: '/admin/settings' },
  ];

  const menu = mode === 'user' ? userMenuItems : adminMenuItems;

  return (
    <div className="w-64 glass h-screen border-l border-white/20 flex flex-col fixed right-0 top-0 z-30 transition-all duration-300">
      <div className="p-8 border-b border-white/20 flex items-center gap-3">
        <div className="bg-blue-600 text-white p-2 rounded-xl font-bold shadow-lg shadow-blue-500/20">AR</div>
        <div className="flex flex-col">
          <h1 className="text-lg font-bold text-gray-800 leading-none">أوتو ريبلاي</h1>
          <span className="text-[10px] font-bold text-blue-600 mt-1 uppercase tracking-wider">
            {mode === 'admin' ? 'لوحة الإدارة' : 'برو AI'}
          </span>
        </div>
      </div>
      
      <div className="flex-1 p-4 space-y-6 overflow-y-auto">
        <nav className="space-y-1.5">
          {menu.map((item) => (
            <SidebarItem 
              key={item.path} 
              item={item} 
              isActive={location.pathname === item.path} 
              mode={mode}
            />
          ))}
        </nav>
      </div>

      <div className="p-4 space-y-2 border-t border-white/20">
        <Link to="/landing" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-white/50 rounded-2xl transition-all font-semibold text-sm">
          <Home size={18} />
          <span>الموقع الرسمي</span>
        </Link>
        <button className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50/50 w-full rounded-2xl transition-all font-bold text-sm">
          <LogOut size={18} />
          <span>خروج</span>
        </button>
      </div>
    </div>
  );
};

const SidebarItem = ({ item, isActive, mode }: any) => {
  const activeClass = mode === 'admin' 
    ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30' 
    : 'bg-blue-600 text-white shadow-lg shadow-blue-500/30';

  return (
    <Link
      to={item.path}
      className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 text-sm font-semibold group ${
        isActive 
        ? activeClass
        : 'text-gray-500 hover:bg-white/50 hover:text-gray-800'
      }`}
    >
      <item.icon size={18} className={`${isActive ? 'scale-110' : 'opacity-70 group-hover:opacity-100 group-hover:scale-110'} transition-all`} />
      <span>{item.label}</span>
    </Link>
  );
};

export default Sidebar;
