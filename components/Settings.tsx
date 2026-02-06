import React, { useState, useEffect } from 'react';
import {
  User,
  Lock,
  Bell,
  Code,
  Globe,
  Save,
  Check,
  Copy,
  AlertTriangle,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Mail,
  Zap,
  Bot
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { dbService } from '../services/dbService';
import Modal from './Modal';

const Settings: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Crisis Settings State
  const [crisisSettings, setCrisisSettings] = useState<any>(null);

  useEffect(() => {
    setCrisisSettings(dbService.getCrisisSettings());
  }, []);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      if (activeTab === 'crisis') {
        dbService.saveCrisisSettings(crisisSettings);
      }
      setIsSaving(false);
      setIsModalOpen(true);
    }, 1000);
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
  };

  if (!crisisSettings) return null;

  const tabs = [
    { id: 'profile', label: t('profile'), icon: User },
    { id: 'security', label: t('security'), icon: Lock },
    { id: 'crisis', label: t('crisis_management'), icon: AlertTriangle, highlight: true },
    { id: 'notifications', label: t('notifications'), icon: Bell },
    { id: 'integrations', label: t('integrations'), icon: Code },
  ];

  return (
    <div className="max-w-6xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Tabs */}
        <div className="w-full md:w-72 space-y-2 shrink-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center justify-between p-4 rounded-2xl transition duration-300 font-bold text-sm ${activeTab === tab.id
                  ? 'bg-slate-900 text-white shadow-xl shadow-slate-200 scale-[1.02]'
                  : tab.highlight
                    ? 'bg-orange-50 text-orange-600 hover:bg-orange-100'
                    : 'bg-white text-slate-500 hover:bg-slate-50'
                }`}
            >
              <div className="flex items-center gap-3">
                <tab.icon size={20} />
                {tab.label}
              </div>
              <ChevronRight size={16} className={`${activeTab === tab.id ? 'opacity-100' : 'opacity-0'} transition`} />
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 glass-card bg-white/70 backdrop-blur-md rounded-[2.5rem] border border-white p-8 md:p-12 shadow-2xl shadow-slate-500/5">
          {/* Header */}
          <div className="flex justify-between items-start mb-10 pb-6 border-b border-slate-100">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">{tabs.find(t => t.id === activeTab)?.label}</h2>
              <p className="text-slate-500 text-sm font-semibold mt-1">
                {activeTab === 'crisis' ? t('crisis_settings_subtitle') : t('user_settings_subtitle')}
              </p>
            </div>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-slate-900 text-white px-8 py-3.5 rounded-2xl font-bold text-sm shadow-xl hover:bg-black transition flex items-center gap-2 group disabled:opacity-50"
            >
              {isSaving ? <Zap size={18} className="animate-spin" /> : <Save size={18} />}
              {t('save_changes')}
            </button>
          </div>

          {/* Tab Content */}
          <div className="space-y-8">
            {activeTab === 'profile' && (
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">{t('name_field')}</label>
                  <input type="text" defaultValue="Ahmed Ali" className="w-full p-4 bg-slate-50 border-none rounded-2xl text-sm font-bold text-slate-700 outline-none focus:ring-2 ring-slate-100 transition" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">{t('email')}</label>
                  <input type="email" defaultValue="ahmed@example.com" className="w-full p-4 bg-slate-50 border-none rounded-2xl text-sm font-bold text-slate-700 outline-none focus:ring-2 ring-slate-100 transition" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">{t('default_language')}</label>
                  <button onClick={toggleLanguage} className="w-full p-4 bg-slate-50 rounded-2xl flex justify-between items-center text-sm font-bold text-slate-700 hover:bg-slate-100 transition">
                    <div className="flex items-center gap-3"><Globe size={18} /> {i18n.language === 'ar' ? 'العربية' : 'English'}</div>
                    <span className="text-[10px] text-blue-600 px-2 py-0.5 bg-blue-50 border border-blue-100 rounded-lg">{t('change')}</span>
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'crisis' && (
              <div className="space-y-10">
                {/* Info Box */}
                <div className="p-6 bg-orange-50 border border-orange-100 rounded-[2rem] flex gap-4">
                  <div className="w-12 h-12 bg-orange-500 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-orange-200">
                    <Bot size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-orange-900 text-sm mb-1">{t('crisis_management')}</h4>
                    <p className="text-xs text-orange-700 font-medium leading-relaxed">{t('crisis_desc')}</p>
                  </div>
                </div>

                {/* Toggle Switch */}
                <div className="flex items-center justify-between p-6 bg-white border border-slate-100 rounded-[2rem] shadow-sm hover:shadow-md transition">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${crisisSettings.enabled ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'} transition`}>
                      <Zap size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{t('enable_crisis_mode')}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{t('pro_plan_label')}</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={crisisSettings.enabled}
                      onChange={(e) => setCrisisSettings({ ...crisisSettings, enabled: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-14 h-8 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-emerald-500"></div>
                  </label>
                </div>

                <div className={`space-y-8 transition-all duration-500 ${crisisSettings.enabled ? 'opacity-100 scale-100' : 'opacity-40 scale-[0.98] pointer-events-none grayscale'}`}>
                  <div className="space-y-4">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                      <Mail size={16} className="text-blue-500" /> {t('notify_email_label')}
                    </label>
                    <input
                      type="email"
                      value={crisisSettings.notifyEmail}
                      onChange={(e) => setCrisisSettings({ ...crisisSettings, notifyEmail: e.target.value })}
                      placeholder="admin@yourbusiness.com"
                      className="w-full p-5 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold text-slate-700 focus:bg-white focus:ring-4 ring-blue-50 transition outline-none"
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                      <Zap size={16} className="text-orange-500" /> {t('crisis_message_label')}
                    </label>
                    <textarea
                      rows={4}
                      value={crisisSettings.customMessage}
                      onChange={(e) => setCrisisSettings({ ...crisisSettings, customMessage: e.target.value })}
                      className="w-full p-6 bg-slate-50 border border-slate-100 rounded-[2rem] text-sm font-bold text-slate-700 focus:bg-white focus:ring-4 ring-orange-50 transition outline-none resize-none leading-relaxed"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <div className="p-6 bg-blue-50/50 rounded-3xl border border-blue-100 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <ShieldCheck className="text-blue-600" size={32} />
                    <div>
                      <p className="text-sm font-bold text-slate-900">{t('two_factor_auth')}</p>
                      <p className="text-xs text-slate-500 font-medium">{t('two_factor_desc')}</p>
                    </div>
                  </div>
                  <button className="px-6 py-2 bg-white text-blue-600 rounded-xl text-xs font-bold border border-blue-100 hover:bg-blue-600 hover:text-white transition">{t('enable_btn')}</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Settings Updated">
        <div className="flex flex-col items-center text-center p-4">
          <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-3xl flex items-center justify-center mb-6 shadow-xl shadow-emerald-500/5">
            <CheckCircle2 size={40} />
          </div>
          <h4 className="text-xl font-bold text-slate-900 mb-2">Changes Saved Successfully</h4>
          <p className="font-bold text-slate-400 text-sm leading-relaxed">Your preferences have been updated. The AI behavior will adjust immediately.</p>
          <button onClick={() => setIsModalOpen(false)} className="mt-8 w-full py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-xl">Done</button>
        </div>
      </Modal>
    </div>
  );
};

export default Settings;
