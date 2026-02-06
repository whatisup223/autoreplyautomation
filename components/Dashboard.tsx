import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  ThumbsUp,
  Clock,
  Zap,
  TrendingUp,
  MoreHorizontal,
  ArrowUpRight,
  Facebook,
  Bot,
  Smile,
  Frown,
  Meh,
  Activity,
  Target,
  ShieldCheck
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { dbService } from '../services/dbService';

const StatCard = ({ title, value, icon: Icon, trend, color, unit }: any) => {
  const colors: any = {
    blue: 'bg-indigo-600 text-white shadow-indigo-500/30',
    purple: 'bg-purple-600 text-white shadow-purple-500/30',
    emerald: 'bg-emerald-600 text-white shadow-emerald-500/30',
    orange: 'bg-orange-500 text-white shadow-orange-500/30',
  };

  return (
    <div className="glass-card p-6 rounded-[2.5rem] bg-white/70 backdrop-blur-md border border-white hover:shadow-2xl hover:shadow-indigo-500/5 transition duration-500 group">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-4 rounded-2xl ${colors[color]} shadow-xl group-hover:scale-110 transition duration-500`}>
          <Icon size={24} />
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">{trend}</span>
          {unit && <span className="text-[10px] text-slate-400 font-bold mt-1 tracking-widest uppercase">{unit}</span>}
        </div>
      </div>
      <div>
        <p className="text-slate-500 text-[10px] font-bold mb-1 uppercase tracking-widest">{title}</p>
        <h3 className="text-3xl font-bold text-slate-900 tracking-tight">{value}</h3>
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const [stats, setStats] = useState<any>(null);
  const [recentLogs, setRecentLogs] = useState<any[]>([]);

  useEffect(() => {
    setStats(dbService.getStats());
    setRecentLogs(dbService.getLogs().slice(0, 5));
  }, []);

  if (!stats) return null;

  const totalLogs = stats.total_replies || 1;
  const sentiment = stats.sentiment_summary;

  return (
    <div className="space-y-8 pb-12">
      {/* Page Heading */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">{t('dashboard_title')}</h2>
          <p className="text-slate-500 text-sm font-semibold mt-1">{t('dashboard_subtitle')}</p>
        </div>
        <div className="flex gap-4">
          <div className="px-4 py-2 bg-white rounded-xl border border-slate-100 flex items-center gap-3 shadow-sm">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">{t('system_operational')}</span>
          </div>
        </div>
      </div>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title={t('total_replies')} value={stats.total_replies} icon={MessageSquare} trend="+12%" color="blue" />
        <StatCard title={t('active_bot_pages')} value={stats.active_pages} icon={Facebook} trend="+2" color="purple" />
        <StatCard title={t('saved_hours')} value={stats.saved_hours} icon={Clock} trend="+85%" color="emerald" unit={t('month')} />
        <StatCard title={t('response_speed')} value={stats.avg_response_time} icon={Zap} trend="-15%" color="orange" unit={t('sec')} />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Chart Area */}
        <div className="lg:col-span-2 glass-card p-8 rounded-[2.5rem] bg-white/60 border border-white">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="text-xl font-bold text-slate-900">{t('performance_overview')}</h3>
              <p className="text-slate-500 text-sm font-medium mt-1">{t('performance_growth')}</p>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-[10px] font-bold uppercase tracking-widest">30D</button>
              <button className="px-3 py-1.5 bg-white text-slate-400 rounded-lg text-[10px] font-bold uppercase tracking-widest">7D</button>
            </div>
          </div>
          <div className="h-64 flex items-end justify-between gap-4 px-4 relative">
            {/* Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between opacity-5 pointer-events-none">
              {[1, 2, 3, 4].map(i => <div key={i} className="w-full border-t border-slate-900"></div>)}
            </div>

            {[45, 60, 40, 80, 55, 90, 70].map((h, i) => (
              <div key={i} className="flex-1 group relative flex flex-col items-center">
                <div className="w-full bg-gradient-to-t from-indigo-600 via-indigo-500 to-indigo-400 rounded-t-xl transition-all duration-700 hover:scale-x-105 cursor-pointer relative" style={{ height: `${h}%` }}>
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition"></div>
                </div>
                <div className="absolute -top-12 bg-slate-900 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition -translate-y-2 group-hover:translate-y-0 shadow-xl z-10 whitespace-nowrap">
                  {h * 12} {t('total_comments')}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-8 px-4">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
              <span key={d} className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{d}</span>
            ))}
          </div>
        </div>

        {/* Sentiment Analysis Side Card */}
        <div className="glass-card p-8 rounded-[2.5rem] bg-white/60 border border-white flex flex-col">
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Target size={20} className="text-indigo-600" />
            {t('sentiment_analysis')}
          </h3>

          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-6 p-6 bg-indigo-50 rounded-[2rem] border border-indigo-100 mb-8">
              <div className="relative w-20 h-20 shrink-0">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="40" cy="40" r="34" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-200" />
                  <circle cx="40" cy="40" r="34" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-indigo-600" strokeDasharray={213} strokeDashoffset={213 - (213 * (sentiment.positive / totalLogs))} />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center font-bold text-indigo-700 text-lg">
                  {Math.round((sentiment.positive / totalLogs) * 100)}%
                </div>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">{t('brand_health')}</h4>
                <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">{t('status_active')}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                  <span className="flex items-center gap-1.5 text-emerald-600"><Smile size={14} /> {t('positive')}</span>
                  <span className="text-slate-400">{sentiment.positive}</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-white shadow-inner">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(sentiment.positive / totalLogs) * 100}%` }}></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                  <span className="flex items-center gap-1.5 text-slate-500"><Meh size={14} /> {t('neutral')}</span>
                  <span className="text-slate-400">{sentiment.neutral}</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-white shadow-inner">
                  <div className="h-full bg-slate-400 rounded-full" style={{ width: `${(sentiment.neutral / totalLogs) * 100}%` }}></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                  <span className="flex items-center gap-1.5 text-red-600"><Frown size={14} /> {t('negative')}</span>
                  <span className="text-slate-400">{sentiment.negative}</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-white shadow-inner">
                  <div className="h-full bg-red-500 rounded-full" style={{ width: `${(sentiment.negative / totalLogs) * 100}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">{t('urgent_actions_required')}</p>
            <div className="flex items-center gap-3 p-4 bg-red-50 rounded-2xl border border-red-100 animate-pulse">
              <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-red-200">
                <Bot size={20} />
              </div>
              <p className="text-[10px] font-bold text-red-700 leading-tight">{t('urgent_negative_detected')}</p>
              <ArrowUpRight size={18} className="text-red-300 ml-auto" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Hot Topics & Activity */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Hot Topics */}
        <div className="glass-card p-8 rounded-[2.5rem] bg-white/60 border border-white">
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <TrendingUp size={20} className="text-purple-600" />
            {t('hot_topics')} & {t('top_intents')}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { key: 'intent_pricing', count: 124, color: 'bg-blue-100 text-blue-600' },
              { key: 'intent_feature', count: 85, color: 'bg-purple-100 text-purple-600' },
              { key: 'intent_technical', count: 42, color: 'bg-orange-100 text-orange-600' },
              { key: 'intent_feedback', count: 210, color: 'bg-emerald-100 text-emerald-600' }
            ].map(topic => (
              <div key={topic.key} className={`p-4 rounded-2xl border border-white shadow-sm flex flex-col transition hover:scale-105 duration-300 ${topic.color}`}>
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-80 mb-1">{t(topic.key)}</span>
                <span className="text-xl font-bold">{topic.count}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {['#Pricing', '#Delivery_Time', '#Bot_Accuracy', '#Feature_Request', '#Customer_Support'].map(tag => (
              <span key={tag} className="px-3 py-1 bg-white border border-slate-100 rounded-lg text-[10px] font-bold text-slate-500 uppercase">{tag}</span>
            ))}
          </div>
        </div>

        {/* Recent Activity Mini List */}
        <div className="glass-card p-8 rounded-[2.5rem] bg-white/60 border border-white">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Activity size={20} className="text-emerald-600" />
              {t('recent_activity')}
            </h3>
            <button className="text-indigo-600 font-bold text-xs hover:underline uppercase tracking-widest">{t('view_all')}</button>
          </div>
          <div className="space-y-4">
            {recentLogs.map((log) => (
              <div key={log.id} className="flex items-center justify-between p-4 bg-white/40 border border-white rounded-2xl hover:bg-white transition duration-300 group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 font-bold group-hover:bg-indigo-600 group-hover:text-white transition duration-500">
                    {log.user?.charAt(0) || 'A'}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 leading-none mb-1">{log.user}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase truncate max-w-[150px]">{log.content}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  {log.sentiment && (
                    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider ${log.sentiment === 'positive' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                      log.sentiment === 'negative' ? 'bg-red-50 text-red-600 border-red-100' :
                        'bg-slate-50 text-slate-500 border-slate-100'
                      }`}>
                      {log.sentiment === 'positive' ? <Smile size={12} /> : log.sentiment === 'negative' ? <Frown size={12} /> : <Meh size={12} />}
                      {t(log.sentiment)}
                    </div>
                  )}
                  <span className="text-[10px] font-bold text-slate-300">{new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
