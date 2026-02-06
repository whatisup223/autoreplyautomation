import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Clock, User, FileDown, Smile, Frown, Meh, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { dbService } from '../services/dbService';

const ActivityLog: React.FC = () => {
  const { t } = useTranslation();
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    setLogs(dbService.getLogs());
  }, []);

  const downloadCSV = () => {
    const headers = ["User", "Page", "Action", "Content", "Sentiment", "Intent", "Status", "Time"];
    const rows = logs.map(l => [
      l.user || 'AI',
      l.page || 'System',
      l.type,
      l.content,
      l.sentiment || 'N/A',
      l.intent || 'N/A',
      l.status || 'success',
      new Date(l.timestamp).toLocaleString()
    ]);

    let csvContent = "data:text/csv;charset=utf-8,"
      + headers.join(",") + "\n"
      + rows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `activity_log_${new Date().getTime()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">{t('activity_log_title')}</h2>
          <p className="text-slate-600 text-sm font-semibold mt-1">Track every action with AI-powered sentiment & intent analysis.</p>
        </div>
        <button
          onClick={downloadCSV}
          className="bg-white border border-slate-200 text-slate-900 px-6 py-3 rounded-xl font-bold text-sm shadow-sm hover:bg-slate-50 transition flex items-center gap-2"
        >
          <FileDown size={18} className="text-blue-600" /> {t('download_csv')}
        </button>
      </div>

      <div className="glass-card bg-white/40 backdrop-blur-md rounded-[2.5rem] border border-white overflow-hidden shadow-2xl shadow-slate-500/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left rtl:text-right">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-5 text-[10px] uppercase font-bold text-slate-400 tracking-widest">{t('page_client')}</th>
                <th className="px-8 py-5 text-[10px] uppercase font-bold text-slate-400 tracking-widest">Sentiment & Intent</th>
                <th className="px-8 py-5 text-[10px] uppercase font-bold text-slate-400 tracking-widest">{t('content_header')}</th>
                <th className="px-8 py-5 text-[10px] uppercase font-bold text-slate-400 tracking-widest">{t('status')}</th>
                <th className="px-8 py-5 text-[10px] uppercase font-bold text-slate-400 tracking-widest">{t('time_header')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-white/50 transition duration-300 group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-slate-100 to-slate-50 border border-white text-slate-400 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition duration-500">
                        <User size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 leading-none mb-1">{log.user || 'AI System'}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{log.page || 'All Pages'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col gap-1.5">
                      {log.sentiment && (
                        <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-lg border text-[10px] font-bold uppercase w-fit ${log.sentiment === 'positive' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                            log.sentiment === 'negative' ? 'bg-red-50 text-red-600 border-red-100' :
                              'bg-slate-50 text-slate-500 border-slate-100'
                          }`}>
                          {log.sentiment === 'positive' ? <Smile size={10} /> : log.sentiment === 'negative' ? <Frown size={10} /> : <Meh size={10} />}
                          {log.sentiment}
                        </div>
                      )}
                      {log.intent && (
                        <span className="text-[10px] font-bold text-blue-600 flex items-center gap-1 px-2 py-0.5 bg-blue-50 border border-blue-100 rounded-lg w-fit uppercase">
                          <Zap size={10} fill="currentColor" /> {log.intent}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="max-w-xs">
                      <p className="text-sm text-slate-600 font-medium line-clamp-1 italic">"{log.content}"</p>
                      {log.reply && <p className="text-[10px] text-emerald-600 font-bold mt-1.5 flex items-center gap-1">
                        <span className="bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">↪️ {log.reply}</span>
                      </p>}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    {(log.status || 'success') === 'success' ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-bold border border-emerald-100 uppercase tracking-widest">
                        <CheckCircle size={12} /> {t('success_status')}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-700 rounded-full text-[10px] font-bold border border-red-100 uppercase tracking-widest">
                        <XCircle size={12} /> {t('failed_status')}
                      </span>
                    )}
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1.5 uppercase tracking-widest">
                      <Clock size={12} /> {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ActivityLog;
