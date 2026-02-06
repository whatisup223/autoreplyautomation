import React, { useState, useEffect } from 'react';
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
  Filter,
  Save,
  Image,
  Type,
  MessageSquare,
  Key,
  X
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { dbService } from '../../services/dbService';
import Modal from '../Modal';

// --- Shared Components ---

const PageHeader = ({ title, subtitle }: { title: string, subtitle: string }) => {
  const { t } = useTranslation();
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h2 className="text-3xl font-bold text-slate-900">{title}</h2>
        <p className="text-slate-600 text-sm font-semibold mt-1">{subtitle}</p>
      </div>
      <div className="flex items-center gap-3 glass px-4 py-2 rounded-2xl border-purple-200">
        <div className="w-2 h-2 bg-purple-600 rounded-full animate-ping"></div>
        <span className="text-xs font-bold text-purple-700">{t('secure_connection')}</span>
      </div>
    </div>
  );
};

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

const PlanCard = ({ plan, onEdit }: { plan: any, onEdit: (p: any) => void }) => {
  const { t } = useTranslation();
  return (
    <div className={`glass-card p-10 rounded-[2.5rem] border-slate-100 flex flex-col transition duration-500 ${plan.popular ? 'border-purple-200 bg-white/70 shadow-purple-500/5 shadow-2xl scale-105' : ''}`}>
      <div className="flex justify-between items-start mb-6">
        <h5 className="font-bold text-slate-900 text-lg">{t(plan.name) || plan.name}</h5>
        <Settings size={18} className="text-slate-300 cursor-pointer hover:text-slate-600 transition" onClick={() => onEdit(plan)} />
      </div>
      <div className="flex items-baseline gap-1 mb-8">
        <span className="text-4xl font-bold text-slate-900 tracking-tight">${plan.price}</span>
        <span className="text-slate-400 text-sm font-bold uppercase tracking-widest">{t('monthly')}</span>
      </div>
      <div className="flex-1 space-y-4 mb-10">
        {plan.features.map((f: string, idx: number) => (
          <div key={idx} className="flex items-center gap-3 text-xs font-bold text-slate-600">
            <CheckCircle size={16} className="text-emerald-500" /> {t(f) || f}
          </div>
        ))}
      </div>
      <button onClick={() => onEdit(plan)} className="w-full py-4 glass text-purple-700 font-bold rounded-2xl hover:bg-white transition border-purple-100">{t('edit_features')}</button>
    </div>
  );
};

// --- Page Components ---

export const AdminOverview: React.FC = () => {
  const { t } = useTranslation();
  const [users, setUsers] = useState<any[]>([]);
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    setUsers(dbService.getUsers());
    setLogs(dbService.getLogs());
  }, []);

  const totalRevenue = users.reduce((acc, u) => acc + (u.planPrice || 0), 0);
  const activeSubs = users.filter(u => u.status === 'active').length;

  return (
    <div className="space-y-8 pb-12">
      <PageHeader title={t('admin_dashboard_title')} subtitle={t('admin_dashboard_subtitle')} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AdminStatCard title={t('total_users')} value={users.length} icon={Users} trend={`+${users.filter(u => u.dateJoined === new Date().toLocaleDateString()).length}`} color="indigo" />
        <AdminStatCard title={t('revenue')} value={`$${totalRevenue}`} icon={DollarSign} trend="+0%" color="emerald" />
        <AdminStatCard title={t('pro_subs')} value={activeSubs} icon={CreditCard} trend="+0" color="blue" />
        <AdminStatCard title={t('conversion_rate')} value="--" icon={TrendingUp} trend="0%" color="purple" />
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h4 className="text-lg font-bold text-slate-900">{t('latest_subscribers')}</h4>
            <button className="text-xs font-bold text-purple-600 hover:underline">{t('view_all')}</button>
          </div>
          <div className="space-y-4">
            {users.slice(0, 4).map((user, i) => (
              <div key={user.id} className="flex items-center justify-between p-5 glass-card rounded-2xl hover:bg-white transition duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-slate-200 to-slate-100 border border-white flex items-center justify-center font-bold text-slate-500">{user.name?.charAt(0) || 'U'}</div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{user.name}</p>
                    <p className="text-[10px] font-bold text-slate-400 tracking-wider">ID: {user.id}</p>
                  </div>
                </div>
                <div className="text-left">
                  <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-3 py-1 rounded-full border border-blue-100">{user.plan || t('plan_basic')}</span>
                </div>
              </div>
            ))}
            {users.length === 0 && <p className="text-slate-400 text-sm italic">{t('waiting_for_process')}</p>}
          </div>
        </div>
        <div className="space-y-6">
          <h4 className="text-lg font-bold text-slate-900">{t('technical_status')}</h4>
          <div className="h-full min-h-[250px] glass rounded-[2.5rem] border-dashed border-2 border-slate-200 flex flex-col items-center justify-center p-10 text-center">
            <Activity size={48} className="text-slate-300 mb-4" />
            <p className="font-bold text-slate-400 max-w-[200px]">{t('system_operational')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AdminUsers: React.FC = () => {
  const { t } = useTranslation();
  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [formData, setFormData] = useState({ name: '', email: '', status: 'active', plan: 'pro_plan_label' });

  useEffect(() => {
    setUsers(dbService.getUsers());
  }, []);

  const handleSaveUser = () => {
    if (!formData.name || !formData.email) return;
    dbService.saveUser(currentUser ? { ...currentUser, ...formData } : formData);
    setUsers(dbService.getUsers());
    setIsModalOpen(false);
    setCurrentUser(null);
    setFormData({ name: '', email: '', status: 'active', plan: 'pro_plan_label' });
  };

  const handleDelete = () => {
    if (currentUser) {
      dbService.deleteUser(currentUser.id);
      setUsers(dbService.getUsers());
      setIsDeleteModalOpen(false);
      setCurrentUser(null);
    }
  };

  const filteredUsers = users.filter(u => u.name?.toLowerCase().includes(search.toLowerCase()) || u.email?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-8 pb-12">
      <PageHeader title={t('users_management')} subtitle={t('users_subtitle')} />

      <div className="flex flex-col md:flex-row justify-between gap-4 glass p-4 rounded-2xl border-slate-200">
        <div className="flex gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 rtl:right-auto rtl:left-4" size={18} />
            <input
              type="text"
              placeholder={t('search_placeholder')}
              className="w-full pr-12 pl-6 rtl:pl-12 rtl:pr-6 py-2.5 glass-input rounded-xl text-sm font-bold outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="glass px-4 py-2.5 rounded-xl text-slate-600 hover:bg-white transition flex items-center gap-2">
            <Filter size={18} /> <span className="text-sm font-bold">{t('filter')}</span>
          </button>
        </div>
        <button
          onClick={() => { setCurrentUser(null); setFormData({ name: '', email: '', status: 'active', plan: 'pro_plan_label' }); setIsModalOpen(true); }}
          className="bg-purple-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-xl shadow-purple-500/20 hover:bg-purple-700 transition flex items-center justify-center gap-2"
        >
          <Plus size={18} /> {t('add_user_manual')}
        </button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-100">
        <table className="w-full text-left rtl:text-right bg-white/30 backdrop-blur-sm">
          <thead>
            <tr className="text-slate-500 text-[10px] uppercase font-bold border-b border-slate-200 bg-slate-50/50">
              <th className="py-4 px-6">{t('table_user')}</th>
              <th className="py-4 px-6">{t('table_status')}</th>
              <th className="py-4 px-6">{t('table_plan')}</th>
              <th className="py-4 px-6">{t('table_date')}</th>
              <th className="py-4 px-6 text-center">{t('table_actions')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredUsers.map(user => (
              <tr key={user.id} className="group hover:bg-white/50 transition duration-300">
                <td className="py-5 px-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm">{user.name?.charAt(0)}</div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 leading-none mb-1">{user.name}</p>
                      <p className="text-[10px] font-bold text-slate-500">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-5 px-6">
                  <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold ${user.status === 'active' ? 'text-emerald-700 bg-emerald-100/50 border-emerald-200' : 'text-red-700 bg-red-100/50 border-red-200'} border px-3 py-1 rounded-full`}>
                    {user.status === 'active' ? <CheckCircle size={10} /> : <Ban size={10} />} {t(user.status === 'active' ? 'active' : 'status_inactive')}
                  </span>
                </td>
                <td className="py-5 px-6 font-bold text-xs text-slate-700">{t(user.plan)}</td>
                <td className="py-5 px-6 text-[10px] font-bold text-slate-400">{user.dateJoined}</td>
                <td className="py-5 px-6">
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => { setCurrentUser(user); setFormData({ name: user.name, email: user.email, status: user.status, plan: user.plan }); setIsModalOpen(true); }}
                      className="p-2 glass text-slate-500 hover:text-blue-600 hover:bg-white rounded-lg transition"
                    >
                      <Edit size={16} />
                    </button>
                    <button onClick={() => { setCurrentUser(user); setIsDeleteModalOpen(true); }} className="p-2 glass text-slate-500 hover:text-red-600 hover:bg-white rounded-lg transition"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* User Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentUser ? t('edit') : t('add_user')}
        footer={(
          <>
            <button onClick={() => setIsModalOpen(false)} className="px-6 py-2 text-slate-500 font-bold text-sm">{t('logout')}</button>
            <button onClick={handleSaveUser} className="px-6 py-2 bg-purple-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-purple-500/20">{t('save_changes')}</button>
          </>
        )}
      >
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{t('name_field')}</label>
            <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-purple-200 transition font-bold" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{t('email')}</label>
            <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-purple-200 transition font-bold" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{t('table_status')}</label>
              <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-purple-200 transition font-bold">
                <option value="active">{t('active')}</option>
                <option value="inactive">{t('status_inactive')}</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{t('table_plan')}</label>
              <select value={formData.plan} onChange={(e) => setFormData({ ...formData, plan: e.target.value })} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-purple-200 transition font-bold">
                <option value="plan_basic">{t('plan_basic')}</option>
                <option value="pro_plan_label">{t('plan_pro')}</option>
                <option value="plan_enterprise">{t('plan_enterprise')}</option>
              </select>
            </div>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title={t('delete_file')}
        footer={(
          <>
            <button onClick={() => setIsDeleteModalOpen(false)} className="px-6 py-2 text-slate-500 font-bold text-sm">Cancel</button>
            <button onClick={handleDelete} className="px-6 py-2 bg-red-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-red-500/20">Delete</button>
          </>
        )}
      >
        <p className="text-slate-600 font-bold">{t('key_warning')}</p>
        <p className="text-sm text-slate-400 mt-2">Are you sure you want to delete {currentUser?.name}?</p>
      </Modal>
    </div>
  );
};

export const AdminPlans: React.FC = () => {
  const { t } = useTranslation();
  const [plans, setPlans] = useState<any[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<any>(null);
  const [formData, setFormData] = useState({ name: '', price: 0, features: [] as string[] });
  const [newFeature, setNewFeature] = useState('');

  useEffect(() => {
    setPlans(dbService.getPlans());
  }, []);

  const handleSavePlan = () => {
    if (!formData.name) return;
    dbService.savePlan(currentPlan ? { ...currentPlan, ...formData } : { ...formData, features: formData.features.length > 0 ? formData.features : ['feature_3_pages'] });
    setPlans(dbService.getPlans());
    setIsModalOpen(false);
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData({ ...formData, features: [...formData.features, newFeature.trim()] });
      setNewFeature('');
    }
  };

  const removeFeature = (idx: number) => {
    const updatedFeatures = [...formData.features];
    updatedFeatures.splice(idx, 1);
    setFormData({ ...formData, features: updatedFeatures });
  };

  return (
    <div className="space-y-8 pb-12">
      <PageHeader title={t('plans_title')} subtitle={t('plans_subtitle')} />
      <div className="grid md:grid-cols-3 gap-8 text-right rtl:mr-auto">
        {plans.map(plan => (
          <PlanCard key={plan.id} plan={plan} onEdit={(p) => {
            setCurrentPlan(p);
            setFormData({ name: p.name, price: p.price, features: p.features || [] });
            setIsModalOpen(true);
          }} />
        ))}
        <div
          onClick={() => { setCurrentPlan(null); setFormData({ name: '', price: 0, features: [] }); setIsModalOpen(true); }}
          className="glass rounded-[2.5rem] border-dashed border-2 border-purple-200 flex flex-col items-center justify-center p-10 text-slate-400 group cursor-pointer hover:border-purple-500 hover:text-purple-600 transition duration-500"
        >
          <Plus size={40} className="mb-4 group-hover:scale-125 transition" />
          <p className="font-bold text-sm">{t('create_plan')}</p>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentPlan ? t('edit') : t('create_plan')}
        footer={(
          <button onClick={handleSavePlan} className="px-6 py-2 bg-purple-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-purple-500/20">{t('save_changes')}</button>
        )}
      >
        <div className="space-y-6">
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{t('name_field')}</label>
            <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold outline-none focus:border-purple-200 transition" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{t('monthly_price')} ($)</label>
            <input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold outline-none focus:border-purple-200 transition" />
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex justify-between">
              <span>{t('edit_features')}</span>
              <span className="text-purple-600">{formData.features.length} Features</span>
            </label>

            <div className="space-y-2">
              {formData.features.map((feature, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-xl group">
                  <div className="flex items-center gap-3">
                    <CheckCircle size={14} className="text-emerald-500" />
                    <span className="text-xs font-bold text-slate-700">{t(feature) || feature}</span>
                  </div>
                  <button onClick={() => removeFeature(idx)} className="text-slate-300 hover:text-red-500 transition">
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                placeholder="Add new feature..."
                className="flex-1 p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold outline-none focus:border-purple-200 transition"
                onKeyPress={(e) => e.key === 'Enter' && addFeature()}
              />
              <button onClick={addFeature} className="p-3 bg-purple-100 text-purple-600 rounded-xl hover:bg-purple-600 hover:text-white transition">
                <Plus size={18} />
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export const AdminCMS: React.FC = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = () => setIsModalOpen(true);

  return (
    <div className="space-y-8 pb-12">
      <PageHeader title={t('cms_title')} subtitle={t('cms_subtitle')} />

      <div className="bg-white/50 backdrop-blur-sm p-8 rounded-[2rem] border border-white space-y-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-purple-100 rounded-xl text-purple-600"><Image size={24} /></div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">{t('home_interface')}</h3>
            <p className="text-sm text-slate-500">{t('hero_section_edit')}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">{t('main_title')}</label>
            <input type="text" defaultValue="أتمتة ذكية لصفحاتك باستخدام الذكاء الاصطناعي" className="w-full p-4 glass-input rounded-xl text-sm font-bold" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">{t('sub_title')}</label>
            <input type="text" defaultValue="ردود فورية، زيادة في المبيعات، ومساعد ذكي يعمل 24/7." className="w-full p-4 glass-input rounded-xl text-sm font-bold" />
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">{t('cta_text')}</label>
            <div className="flex gap-4">
              <input type="text" defaultValue="ابدأ التجربة المجانية" className="flex-1 p-4 glass-input rounded-xl text-sm font-bold" />
              <input type="text" defaultValue="/register" placeholder="Link" className="flex-1 p-4 glass-input rounded-xl text-sm font-bold text-left" dir="ltr" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white/50 backdrop-blur-sm p-8 rounded-[2rem] border border-white h-full">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <MessageSquare size={20} className="text-blue-500" /> {t('customers_reviews')}
            </h3>
            <button className="text-xs font-bold text-purple-600 bg-purple-50 px-3 py-1 rounded-lg hover:bg-purple-100">{t('add_new')}</button>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex gap-4 p-4 glass rounded-xl group hover:bg-white transition">
                <div className="w-10 h-10 rounded-full bg-slate-200 shrink-0"></div>
                <div>
                  <p className="text-sm font-bold text-slate-800">Mohamed Ali</p>
                  <p className="text-xs text-slate-500 line-clamp-1">{t('great_service')}</p>
                </div>
                <button className="mr-auto text-slate-400 hover:text-red-500"><Trash2 size={16} /></button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/50 backdrop-blur-sm p-8 rounded-[2rem] border border-white h-full">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Type size={20} className="text-emerald-500" /> {t('faq')}
            </h3>
            <button className="text-xs font-bold text-purple-600 bg-purple-50 px-3 py-1 rounded-lg hover:bg-purple-100">{t('add_new')}</button>
          </div>
          <div className="space-y-4">
            {[1, 2].map(i => (
              <div key={i} className="p-4 glass rounded-xl group hover:bg-white transition">
                <p className="text-sm font-bold text-slate-800 mb-1">{t('trial_question')}</p>
                <p className="text-xs text-slate-500">{t('trial_answer')}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button onClick={handleSave} className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-black transition shadow-xl flex items-center gap-2">
          <Save size={18} /> {t('save_changes')}
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={t('save_changes')}>
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-4">
            <CheckCircle size={32} />
          </div>
          <p className="font-bold text-slate-900 leading-relaxed">{t('system_operational')}</p>
          <button onClick={() => setIsModalOpen(false)} className="mt-6 w-full py-3 bg-slate-900 text-white rounded-xl font-bold">Done</button>
        </div>
      </Modal>
    </div>
  );
};

export const AdminSettings: React.FC = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleSave = () => setIsModalOpen(true);

  return (
    <div className="space-y-8 pb-12">
      <PageHeader title={t('settings_title')} subtitle={t('settings_subtitle')} />
      {/* General Settings */}
      <div className="bg-white/50 backdrop-blur-sm p-8 rounded-[2rem] border border-white">
        <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <Settings size={22} className="text-slate-400" /> {t('general_settings')}
        </h3>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">{t('platform_name')}</label>
            <input type="text" defaultValue="AutoReply Pro" className="w-full p-4 glass-input rounded-xl text-sm font-bold" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">{t('support_email')}</label>
            <input type="email" defaultValue="support@autoreply.pro" className="w-full p-4 glass-input rounded-xl text-sm font-bold" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">{t('default_language')}</label>
            <select className="w-full p-4 glass-input rounded-xl text-sm font-bold text-slate-600">
              <option>العربية (Arabic)</option>
              <option>English</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">{t('timezone')}</label>
            <select className="w-full p-4 glass-input rounded-xl text-sm font-bold text-slate-600">
              <option>GMT+03:00 (Riyadh)</option>
              <option>GMT+02:00 (Cairo)</option>
            </select>
          </div>
        </div>
      </div>

      {/* API Keys */}
      <div className="bg-white/50 backdrop-blur-sm p-8 rounded-[2rem] border border-white">
        <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <Key size={22} className="text-orange-500" /> {t('api_keys')}
        </h3>
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">{t('master_key')}</label>
            <div className="relative">
              <input type="password" defaultValue="**********************" className="w-full p-4 glass-input rounded-xl text-sm font-bold tracking-widest" />
              <button className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-blue-600 rtl:left-4 rtl:right-auto rtl:bg-white rtl:px-1">{t('change')}</button>
            </div>
          </div>

          <div className="p-4 bg-orange-50 border border-orange-100 rounded-xl flex gap-3 text-orange-700">
            <ShieldAlert size={20} className="shrink-0" />
            <p className="text-xs font-semibold">{t('key_warning')}</p>
          </div>
        </div>
      </div>

      {/* SMTP Settings */}
      <div className="bg-white/50 backdrop-blur-sm p-8 rounded-[2rem] border border-white">
        <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <Mail size={22} className="text-blue-500" /> {t('smtp_server')}
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">{t('host')}</label>
            <input type="text" defaultValue="smtp.sendgrid.net" className="w-full p-4 glass-input rounded-xl text-sm font-bold" dir="ltr" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">{t('port')}</label>
            <input type="text" defaultValue="587" className="w-full p-4 glass-input rounded-xl text-sm font-bold" dir="ltr" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">{t('username')}</label>
            <input type="text" defaultValue="apikey" className="w-full p-4 glass-input rounded-xl text-sm font-bold" dir="ltr" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">{t('password_field')}</label>
            <input type="password" defaultValue="****************" className="w-full p-4 glass-input rounded-xl text-sm font-bold" dir="ltr" />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button onClick={handleSave} className="bg-purple-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-purple-700 transition shadow-xl flex items-center gap-2">
          <Save size={18} /> {t('save_changes')}
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={t('save_changes')}>
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-4">
            <CheckCircle size={32} />
          </div>
          <p className="font-bold text-slate-900 leading-relaxed">{t('system_operational')}</p>
          <button onClick={() => setIsModalOpen(false)} className="mt-6 w-full py-3 bg-purple-600 text-white rounded-xl font-bold">Done</button>
        </div>
      </Modal>
    </div>
  );
};
