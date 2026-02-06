
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { MessageCircle, ThumbsUp, EyeOff, Cpu, Zap, ArrowUpRight, CheckCircle2 } from 'lucide-react';

const data = [
  { name: 'السبت', replies: 40, comments: 24 },
  { name: 'الأحد', replies: 30, comments: 13 },
  { name: 'الاثنين', replies: 20, comments: 98 },
  { name: 'الثلاثاء', replies: 27, comments: 39 },
  { name: 'الأربعاء', replies: 18, comments: 48 },
  { name: 'الخميس', replies: 23, comments: 38 },
  { name: 'الجمعة', replies: 34, comments: 43 },
];

const StatCard = ({ title, value, icon: Icon, color, trend }: any) => {
  const colorClasses: any = {
    blue: 'bg-blue-600 text-white shadow-blue-500/20',
    emerald: 'bg-emerald-600 text-white shadow-emerald-500/20',
    orange: 'bg-orange-500 text-white shadow-orange-500/20',
    purple: 'bg-purple-600 text-white shadow-purple-500/20'
  };

  return (
    <div className="glass-card p-6 rounded-[2rem] hover:shadow-xl transition duration-500 group">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-4 rounded-2xl ${colorClasses[color]} group-hover:scale-110 transition duration-500`}>
          <Icon size={24} />
        </div>
        {trend && (
          <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
            <ArrowUpRight size={12} /> {trend}
          </span>
        )}
      </div>
      <p className="text-slate-500 text-xs font-bold mb-1 uppercase tracking-widest">{title}</p>
      <h3 className="text-3xl font-bold text-slate-900 tracking-tight">{value}</h3>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const connectedPages = JSON.parse(localStorage.getItem('connected_pages') || '[]');
  const activeWebhooks = connectedPages.filter((p: any) => p.tasks?.includes('webhook_active')).length;

  const recentEvents = [
    { id: 1, text: "تم الرد على استفسار السعر بذكاء", time: "منذ دقيقتين", type: "ai" },
    { id: 2, text: "إخفاء تعليق يحتوي على أرقام هواتف", time: "منذ 10 دقائق", type: "hide" },
    { id: 3, text: "أتمتة ناجحة لمنشور متجر الأناقة", time: "منذ ساعة", type: "setup" },
  ];

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center bg-slate-900 p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
        <div className="relative z-10 space-y-3">
          <h2 className="text-3xl font-bold text-white tracking-tight">أهلاً بك، أحمد المشرف 👋</h2>
          <p className="text-slate-400 text-sm font-medium max-w-md leading-relaxed">أداء ممتاز! لقد قام نظامك بمعالجة 124 تعليقاً بنجاح خلال آخر 24 ساعة الماضية.</p>
        </div>
        <div className="flex gap-4 mt-8 md:mt-0 relative z-10">
          <div className="glass px-6 py-4 rounded-[1.5rem] border-white/10">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">الصفحات النشطة</p>
            <p className="text-2xl font-bold text-white">{activeWebhooks} / {connectedPages.length}</p>
          </div>
          <button className="bg-blue-600 text-white px-8 py-4 rounded-[1.5rem] hover:bg-blue-700 transition font-bold text-sm shadow-xl shadow-blue-500/20">
             تحليل الأداء الكامل
          </button>
        </div>
        {/* Abstract Background Design */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full -ml-10 -mb-10 blur-2xl"></div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="إجمالي الردود" value="1,245" icon={MessageCircle} color="blue" trend="+12%" />
        <StatCard title="إعجابات تلقائية" value="850" icon={ThumbsUp} color="emerald" trend="+5%" />
        <StatCard title="تعليقات مخفية" value="124" icon={EyeOff} color="orange" trend="+24%" />
        <StatCard title="استهلاك AI" value="452" icon={Cpu} color="purple" trend="+8%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card p-8 rounded-[2.5rem]">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-xl font-bold text-slate-900">تحليل التفاعل الأسبوعي</h3>
            <div className="glass px-4 py-2 rounded-xl">
              <select className="bg-transparent text-xs font-bold text-slate-600 outline-none cursor-pointer">
                <option>آخر 7 أيام</option>
                <option>آخر 30 يوم</option>
              </select>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 11, fontWeight: 700, fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 11, fontWeight: 700, fill: '#64748b'}} />
                <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)', fontFamily: 'IBM Plex Sans Arabic'}} />
                <Bar dataKey="replies" fill="#3b82f6" radius={[8, 8, 0, 0]} barSize={24} />
                <Bar dataKey="comments" fill="#10b981" radius={[8, 8, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-8 rounded-[2.5rem] flex flex-col">
          <h3 className="text-xl font-bold text-slate-900 mb-8">النشاط الأخير</h3>
          <div className="flex-1 space-y-6">
            {recentEvents.map(event => (
              <div key={event.id} className="flex gap-5 group">
                <div className={`w-1.5 h-12 rounded-full shrink-0 transition-transform duration-500 group-hover:scale-y-125 ${event.type === 'ai' ? 'bg-blue-500' : event.type === 'hide' ? 'bg-orange-500' : 'bg-emerald-500'}`}></div>
                <div>
                  <p className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition">{event.text}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{event.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-10 w-full py-4 glass text-slate-600 font-bold rounded-2xl text-xs hover:bg-white transition shadow-sm">
            سجل النشاط الكامل
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
