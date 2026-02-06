
import React, { useState } from 'react';
import { 
  Users, 
  CreditCard, 
  Activity, 
  Globe, 
  ShieldAlert, 
  CheckCircle, 
  Ban, 
  TrendingUp, 
  DollarSign, 
  Plus, 
  Edit,
  Trash2,
  Settings,
  Mail,
  Search,
  Filter
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'plans' | 'settings'>('overview');

  return (
    <div className="space-y-8 pb-12">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">إدارة المنصة</h2>
          <p className="text-slate-600 text-sm font-semibold mt-1">غرفة العمليات المركزية للمسؤولين.</p>
        </div>
        <div className="flex items-center gap-3 glass px-4 py-2 rounded-2xl border-purple-200">
          <div className="w-2 h-2 bg-purple-600 rounded-full animate-ping"></div>
          <span className="text-xs font-bold text-purple-700">اتصال السيرفر آمن</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AdminStatCard title="إجمالي المستخدمين" value="2,840" icon={Users} trend="+124" color="indigo" />
        <AdminStatCard title="الإيرادات (MRR)" value="$42,100" icon={DollarSign} trend="+8.2%" color="emerald" />
        <AdminStatCard title="اشتراكات برو" value="512" icon={CreditCard} trend="+12" color="blue" />
        <AdminStatCard title="معدل التحويل" value="3.4%" icon={TrendingUp} trend="+0.5%" color="purple" />
      </div>

      <div className="glass-card rounded-[2.5rem] overflow-hidden">
        <div className="flex border-b border-slate-200 bg-white/50 backdrop-blur-md px-4 overflow-x-auto">
          <AdminTab label="نظرة عامة" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
          <AdminTab label="المستخدمين" active={activeTab === 'users'} onClick={() => setActiveTab('users')} />
          <AdminTab label="الخطط والأسعار" active={activeTab === 'plans'} onClick={() => setActiveTab('plans')} />
          <AdminTab label="إعدادات الموقع" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
        </div>

        <div className="p-8">
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'users' && <UsersTab />}
          {activeTab === 'plans' && <PlansTab />}
          {activeTab === 'settings' && <div className="p-10 text-center font-bold text-slate-400">قريباً: إعدادات متقدمة للتحكم في واجهة المنصة.</div>}
        </div>
      </div>
    </div>
  );
};

const AdminTab = ({ label, active, onClick }: any) => (
  <button
    onClick={onClick}
    className={`px-8 py-5 text-sm font-bold transition-all relative shrink-0 ${
      active ? 'text-purple-700' : 'text-slate-500 hover:text-slate-800'
    }`}
  >
    {label}
    {active && <div className="absolute bottom-0 left-0 right-0 h-1 bg-purple-600 rounded-t-full"></div>}
  </button>
);

const AdminStatCard = ({ title, value, icon: Icon, trend, color }: any) => {
  const colors: any = {
    indigo: 'bg-indigo-600 text-white',
    emerald: 'bg-emerald-600 text-white',
    blue: 'bg-blue-600 text-white',
    purple: 'bg-purple-600 text-white'
  };

  return (
    <div className="glass-card p-6 rounded-[2rem] hover:shadow-2xl hover:shadow-indigo-500/5 transition duration-500 group">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-4 rounded-2xl ${colors[color]} shadow-xl group-hover:scale-110 transition duration-500`}>
          <Icon size={24} />
        </div>
        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
          {trend}
        </span>
      </div>
      <p className="text-slate-400 text-xs font-bold mb-1 uppercase tracking-widest">{title}</p>
      <h3 className="text-3xl font-bold text-slate-900 tracking-tight">{value}</h3>
    </div>
  );
};

const OverviewTab = () => (
  <div className="grid lg:grid-cols-2 gap-10">
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h4 className="text-lg font-bold text-slate-900">أحدث المشتركين</h4>
        <button className="text-xs font-bold text-purple-600 hover:underline">عرض الكل</button>
      </div>
      <div className="space-y-4">
        {[1,2,3,4].map(i => (
          <div key={i} className="flex items-center justify-between p-5 glass-card rounded-2xl hover:bg-white transition duration-300">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-slate-200 to-slate-100 border border-white flex items-center justify-center font-bold text-slate-500">U{i}</div>
              <div>
                <p className="text-sm font-bold text-slate-900">مستخدم في المنصة #{i}</p>
                <p className="text-[10px] font-bold text-slate-400 tracking-wider">USER_ID_2025_{i}</p>
              </div>
            </div>
            <div className="text-left">
              <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-3 py-1 rounded-full border border-blue-100">برو سنوي</span>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="space-y-6">
       <h4 className="text-lg font-bold text-slate-900">الحالة التقنية</h4>
       <div className="h-full min-h-[250px] glass rounded-[2.5rem] border-dashed border-2 border-slate-200 flex flex-col items-center justify-center p-10 text-center">
          <Activity size={48} className="text-slate-300 mb-4" />
          <p className="font-bold text-slate-400 max-w-[200px]">جميع الأنظمة تعمل بكفاءة عالية (99.99%)</p>
       </div>
    </div>
  </div>
);

const UsersTab = () => (
  <div className="space-y-6">
    <div className="flex flex-col md:flex-row justify-between gap-4 glass p-4 rounded-2xl border-slate-200">
      <div className="flex gap-4 flex-1">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input type="text" placeholder="البحث بالاسم، البريد، أو المعرف..." className="w-full pr-12 pl-6 py-2.5 glass-input rounded-xl text-sm font-bold outline-none" />
        </div>
        <button className="glass px-4 py-2.5 rounded-xl text-slate-600 hover:bg-white transition flex items-center gap-2">
          <Filter size={18} /> <span className="text-sm font-bold">تصفية</span>
        </button>
      </div>
      <button className="bg-purple-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-xl shadow-purple-500/20 hover:bg-purple-700 transition flex items-center justify-center gap-2">
        <Plus size={18} /> إضافة مستخدم يدوي
      </button>
    </div>
    
    <div className="overflow-x-auto rounded-2xl border border-slate-100">
      <table className="w-full text-right bg-white/30 backdrop-blur-sm">
        <thead>
          <tr className="text-slate-500 text-[10px] uppercase font-bold border-b border-slate-200 bg-slate-50/50">
            <th className="py-4 px-6">المستخدم</th>
            <th className="py-4 px-6">الحالة التقنية</th>
            <th className="py-4 px-6">الاشتراك</th>
            <th className="py-4 px-6">تاريخ الدخول</th>
            <th className="py-4 px-6 text-center">العمليات</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {[1,2,3,4,5,6].map(i => (
            <tr key={i} className="group hover:bg-white/50 transition duration-300">
              <td className="py-5 px-6">
                 <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm">AM</div>
                   <div>
                     <p className="text-sm font-bold text-slate-900 leading-none mb-1">عميل تجريبي #{i}</p>
                     <p className="text-[10px] font-bold text-slate-500">client_email_{i}@test.com</p>
                   </div>
                 </div>
              </td>
              <td className="py-5 px-6">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-700 bg-emerald-100/50 border border-emerald-200 px-3 py-1 rounded-full">
                  <CheckCircle size={10} /> نشط
                </span>
              </td>
              <td className="py-5 px-6 font-bold text-xs text-slate-700">احترافي (شهري)</td>
              <td className="py-5 px-6 text-[10px] font-bold text-slate-400">منذ 3 ساعات</td>
              <td className="py-5 px-6">
                <div className="flex gap-2 justify-center">
                  <button className="p-2 glass text-slate-500 hover:text-blue-600 hover:bg-white rounded-lg transition"><Edit size={16} /></button>
                  <button className="p-2 glass text-slate-500 hover:text-red-600 hover:bg-white rounded-lg transition"><Trash2 size={16} /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const PlansTab = () => (
  <div className="grid md:grid-cols-3 gap-8">
     <PlanCard title="الأساسية" price="19" users="3" />
     <PlanCard title="الاحترافية" price="49" users="10" featured={true} />
     <PlanCard title="الشركات" price="99" users="∞" />
     <div className="glass rounded-[2.5rem] border-dashed border-2 border-purple-200 flex flex-col items-center justify-center p-10 text-slate-400 group cursor-pointer hover:border-purple-500 hover:text-purple-600 transition duration-500">
       <Plus size={40} className="mb-4 group-hover:scale-125 transition" />
       <p className="font-bold text-sm">تصميم خطة سعرية جديدة</p>
     </div>
  </div>
);

const PlanCard = ({ title, price, users, featured }: any) => (
  <div className={`glass-card p-10 rounded-[2.5rem] border-slate-100 flex flex-col transition duration-500 ${featured ? 'border-purple-200 bg-white/70 shadow-purple-500/5 shadow-2xl scale-105' : ''}`}>
    <div className="flex justify-between items-start mb-6">
      <h5 className="font-bold text-slate-900 text-lg">{title}</h5>
      <Settings size={18} className="text-slate-300 cursor-pointer hover:text-slate-600 transition" />
    </div>
    <div className="flex items-baseline gap-1 mb-8">
      <span className="text-4xl font-bold text-slate-900 tracking-tight">${price}</span>
      <span className="text-slate-400 text-sm font-bold uppercase tracking-widest">/شهري</span>
    </div>
    <div className="flex-1 space-y-4 mb-10">
       <div className="flex items-center gap-3 text-xs font-bold text-slate-600">
         <CheckCircle size={16} className="text-emerald-500" /> ربط {users} صفحات فيسبوك
       </div>
       <div className="flex items-center gap-3 text-xs font-bold text-slate-600">
         <CheckCircle size={16} className="text-emerald-500" /> دعم كامل لـ Gemini AI
       </div>
    </div>
    <button className="w-full py-4 glass text-purple-700 font-bold rounded-2xl hover:bg-white transition border-purple-100">تعديل المزايا</button>
  </div>
);

export default AdminDashboard;
