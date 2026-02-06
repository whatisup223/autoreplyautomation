import React, { useState } from 'react';
import {
  LayoutDashboard,
  MessageSquare,
  Repeat,
  Activity,
  CreditCard,
  Settings,
  LogOut,
  Facebook,
  BookOpen,
  BarChart3,
  Users,
  Globe,
  AlertTriangle
} from 'lucide-react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Modal from './Modal';

const Sidebar = ({ mode }: { mode: 'user' | 'admin' }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const confirmLogout = () => {
    setIsLogoutModalOpen(false);
    navigate('/login');
  };

  return (
    <>
      <aside className="w-64 h-screen glass flex flex-col fixed inset-y-0 z-50 transition-all rtl:right-0 rtl:border-l ltr:left-0 ltr:border-r border-white/30">
        <div className="p-8 pb-4">
          <div className="flex items-center gap-3 text-slate-900 mb-1">
            <div className="bg-slate-900 text-white p-2 rounded-xl">
              <span className="font-bold text-lg">AR</span>
            </div>
            <span className="font-bold text-xl tracking-tight">{t('app_name')}</span>
          </div>
          <p className="text-[10px] text-slate-500 font-bold ltr:mr-12 rtl:mr-12">{t('slogan')}</p>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {mode === 'user' ? (
            <>
              <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{t('menu_main')}</p>
              <SidebarItem to="/dashboard" icon={LayoutDashboard} label={t('menu_dashboard')} active={location.pathname === '/dashboard'} />
              <SidebarItem to="/inbox" icon={MessageSquare} label={t('menu_inbox')} active={location.pathname === '/inbox'} badge="5" />

              <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 mt-6">{t('menu_automation')}</p>
              <SidebarItem to="/pages" icon={Facebook} label={t('menu_pages')} active={location.pathname === '/pages'} />
              <SidebarItem to="/rules" icon={Repeat} label={t('menu_rules')} active={location.pathname === '/rules'} />
              <SidebarItem to="/knowledge" icon={BookOpen} label={t('menu_knowledge')} active={location.pathname === '/knowledge'} />
              <SidebarItem to="/activity" icon={Activity} label={t('menu_activity')} active={location.pathname === '/activity'} />

              <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 mt-6">{t('menu_account')}</p>
              <SidebarItem to="/billing" icon={CreditCard} label={t('menu_billing')} active={location.pathname === '/billing'} />
              <SidebarItem to="/settings" icon={Settings} label={t('menu_settings')} active={location.pathname === '/settings'} />
            </>
          ) : (
            <>
              <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{t('menu_admin_section')}</p>
              <SidebarItem to="/admin" icon={BarChart3} label={t('menu_admin_overview')} active={location.pathname === '/admin'} />
              <SidebarItem to="/admin/users" icon={Users} label={t('menu_admin_users')} active={location.pathname.includes('/users')} />
              <SidebarItem to="/admin/plans" icon={CreditCard} label={t('menu_admin_plans')} active={location.pathname.includes('/plans')} />
              <SidebarItem to="/admin/cms" icon={Globe} label={t('menu_admin_cms')} active={location.pathname.includes('/cms')} />
              <SidebarItem to="/admin/settings" icon={Settings} label={t('menu_admin_settings')} active={location.pathname.includes('/settings')} />
            </>
          )}
        </nav>

        <div className="p-4 border-t border-white/30">
          <button onClick={() => setIsLogoutModalOpen(true)} className="flex items-center gap-3 text-slate-500 hover:text-red-600 hover:bg-red-50 p-3 rounded-xl w-full transition font-bold text-sm group">
            <LogOut size={18} className="group-hover:-translate-x-1 transition rtl:rotate-180" />
            <span>{t('logout')}</span>
          </button>
        </div>
      </aside>

      <Modal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        title={t('logout')}
        footer={(
          <button onClick={confirmLogout} className="px-8 py-3 bg-red-600 text-white rounded-xl font-bold text-sm shadow-xl">Logout</button>
        )}
      >
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle size={32} />
          </div>
          <p className="font-bold text-slate-900 leading-relaxed">Are you sure you want to log out of your account?</p>
        </div>
      </Modal>
    </>
  );
};

const SidebarItem = ({ icon: Icon, label, active, to, badge }: any) => (
  <NavLink to={to} className={`flex items-center justify-between px-4 py-3 rounded-xl transition duration-300 group ${active ? 'bg-white shadow-lg shadow-blue-500/5 text-blue-600' : 'text-slate-500 hover:bg-white/50 hover:text-slate-900'}`}>
    <div className="flex items-center gap-3">
      <Icon size={20} className={active ? 'text-blue-600' : 'text-slate-400 group-hover:text-blue-500 transition'} />
      <span className="font-bold text-sm">{label}</span>
    </div>
    {badge && (
      <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md shadow-sm">
        {badge}
      </span>
    )}
  </NavLink>
);

export default Sidebar;
