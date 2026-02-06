
import React, { useState } from 'react';
import { User, Bell, Shield, Globe, Save, Key } from 'lucide-react';
import WebhookSettings from './WebhookSettings';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'webhook' | 'security'>('profile');

  const tabs = [
    { id: 'profile', label: 'الملف الشخصي', icon: User },
    { id: 'webhook', label: 'إعدادات الويب هوك', icon: Globe },
    { id: 'security', label: 'الأمان والوصول', icon: Shield },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">الإعدادات المتقدمة</h2>
      
      <div className="flex gap-4 border-b border-gray-100 overflow-x-auto pb-1">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-bold transition border-b-2 ${
              activeTab === tab.id ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="pt-4">
        {activeTab === 'profile' && (
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
            <div className="flex items-center gap-6 pb-6 border-b border-gray-50">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-2xl font-bold">أ</div>
              <div>
                <button className="text-blue-600 text-sm font-bold hover:underline">تغيير الصورة الشخصية</button>
                <p className="text-xs text-gray-400 mt-1">PNG, JPG بحد أقصى 5 ميجابايت</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">الاسم الكامل</label>
                <input type="text" defaultValue="أحمد المشرف" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">البريد الإلكتروني</label>
                <input type="email" defaultValue="admin@example.com" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
            </div>

            <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition flex items-center gap-2">
              <Save size={18} /> حفظ التغييرات
            </button>
          </div>
        )}

        {activeTab === 'webhook' && <WebhookSettings />}

        {activeTab === 'security' && (
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
            <h3 className="font-bold text-lg mb-4">إدارة الوصول والأمان</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <Key className="text-gray-400" />
                  <div>
                    <p className="text-sm font-bold">كلمة المرور</p>
                    <p className="text-xs text-gray-500">تم تغييرها آخر مرة منذ 3 أشهر</p>
                  </div>
                </div>
                <button className="text-blue-600 text-sm font-bold hover:underline">تغيير</button>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <Bell className="text-gray-400" />
                  <div>
                    <p className="text-sm font-bold">تنبيهات البريد</p>
                    <p className="text-xs text-gray-500">تلقي إشعارات عند فشل الرد التلقائي</p>
                  </div>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 accent-blue-600" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
