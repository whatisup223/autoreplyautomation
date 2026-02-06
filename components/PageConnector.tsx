import React, { useState, useEffect } from 'react';
import { Facebook, CheckCircle2, Plus, AlertCircle, Loader2, Save, Zap, ZapOff } from 'lucide-react';
import { fetchUserPages, subscribePageToWebhook } from '../services/facebookService';
import { FBPage } from '../types';
import { useTranslation } from 'react-i18next';
import { dbService } from '../services/dbService';
import Modal from './Modal';

const PageConnector: React.FC = () => {
  const { t } = useTranslation();
  const [token, setToken] = useState(localStorage.getItem('fb_user_token') || '');
  const [isFetching, setIsFetching] = useState(false);
  const [pages, setPages] = useState<FBPage[]>([]);
  const [connectedPages, setConnectedPages] = useState<FBPage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [subscribingId, setSubscribingId] = useState<string | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [pageToToggle, setPageToToggle] = useState<any>(null);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    setConnectedPages(dbService.getPages());
  }, []);

  const handleFetch = async () => {
    if (!token) return;
    setIsFetching(true);
    setError(null);
    try {
      const data = await fetchUserPages(token);
      const formattedPages = data.map((p: any) => ({
        id: p.id,
        name: p.name,
        access_token: p.access_token,
        category: p.category,
        picture: p.picture?.data?.url || `https://graph.facebook.com/${p.id}/picture`,
        tasks: []
      }));
      setPages(formattedPages);
      localStorage.setItem('fb_user_token', token);
    } catch (err: any) {
      setError(err.message || 'Error fetching pages.');
    } finally {
      setIsFetching(false);
    }
  };

  const toggleSubscription = async (page: FBPage) => {
    setSubscribingId(page.id);
    try {
      await subscribePageToWebhook(page.id, page.access_token);
      const existingPages = dbService.getPages();
      const isConnected = existingPages.some((p: any) => p.id === page.id);
      let newConnected;
      if (isConnected) {
        newConnected = existingPages.map((p: any) => p.id === page.id ? { ...p, tasks: ['webhook_active'] } : p);
      } else {
        newConnected = [...existingPages, { ...page, tasks: ['webhook_active'] }];
      }
      dbService.savePages(newConnected);
      setConnectedPages(newConnected);
      dbService.addLog({ type: 'subscription', content: `Connected page: ${page.name}`, page: page.name });
      setSuccessMsg(`Successfully connected ${page.name}`);
      setIsSuccessModalOpen(true);
    } catch (err: any) {
      setError(`Error subscribing: ${err.message}`);
    } finally {
      setSubscribingId(null);
    }
  };

  const handleRemovePage = () => {
    if (pageToToggle) {
      const newConnected = connectedPages.filter(p => p.id !== pageToToggle.id);
      dbService.savePages(newConnected);
      setConnectedPages(newConnected);
      setIsDeleteModalOpen(false);
      setPageToToggle(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="bg-white/70 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-xl shadow-blue-500/5 border border-white">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-slate-900">
          <div className="bg-blue-600 p-2.5 rounded-xl text-white shadow-lg shadow-blue-200">
            <Facebook size={24} />
          </div>
          {t('connect_fb')}
        </h2>

        <div className="flex gap-4">
          <input
            type="password"
            placeholder={t('enter_token_placeholder')}
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="flex-1 px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-bold text-sm shadow-inner"
          />
          <button
            onClick={handleFetch}
            disabled={isFetching || !token}
            className="bg-slate-900 text-white px-8 py-4 rounded-2xl hover:bg-black transition disabled:opacity-50 flex items-center gap-3 font-bold text-sm shadow-xl"
          >
            {isFetching ? <Loader2 className="animate-spin" /> : <Save size={20} />}
            {t('fetch_pages')}
          </button>
        </div>
        {error && <p className="mt-4 text-red-500 text-xs font-bold flex items-center gap-2 bg-red-50 p-4 rounded-xl border border-red-100"><AlertCircle size={14} /> {error}</p>}
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-bold text-slate-800 ml-4 rtl:mr-4 rtl:ml-0">{t('active_pages_management')}</h3>
        <div className="grid gap-4">
          {(pages.length > 0 ? pages : connectedPages).map(page => {
            const isConnected = connectedPages.some(p => p.id === page.id);
            const isWebhookActive = connectedPages.find(p => p.id === page.id)?.tasks?.includes('webhook_active');

            return (
              <div key={page.id} className="bg-white/60 backdrop-blur-md p-6 rounded-[2rem] border border-white flex items-center justify-between hover:shadow-2xl hover:shadow-blue-500/5 transition duration-500 group">
                <div className="flex items-center gap-5">
                  <div className="relative">
                    <img src={page.picture} alt="" className="w-16 h-16 rounded-2xl border-4 border-white shadow-lg bg-slate-50 group-hover:scale-105 transition duration-500" />
                    {isConnected && <div className="absolute -top-2 -right-2 bg-emerald-500 text-white p-1 rounded-lg shadow-lg border-2 border-white"><CheckCircle2 size={12} /></div>}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">{page.name}</h4>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">{t('page_id')}: {page.id}</span>
                      {isWebhookActive && (
                        <span className="flex items-center gap-1.5 text-[10px] bg-emerald-50 text-emerald-600 border border-emerald-100 px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                          <Zap size={10} fill="currentColor" /> {t('webhook_connected')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => toggleSubscription(page)}
                    disabled={subscribingId === page.id}
                    className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-xs font-bold transition duration-300 shadow-lg ${isWebhookActive
                      ? 'bg-blue-50 text-blue-600 border border-blue-100 shadow-blue-100'
                      : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-200'
                      }`}
                  >
                    {subscribingId === page.id ? <Loader2 size={16} className="animate-spin" /> : <Zap size={16} />}
                    {isWebhookActive ? t('update_subscription') : t('activate_auto_reply')}
                  </button>

                  {isConnected && (
                    <button
                      onClick={() => { setPageToToggle(page); setIsDeleteModalOpen(true); }}
                      className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition border border-transparent hover:border-red-100"
                    >
                      <ZapOff size={20} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title={t('logout')}
        footer={(
          <button onClick={handleRemovePage} className="px-8 py-3 bg-red-600 text-white rounded-xl font-bold text-sm shadow-xl">Disconnect</button>
        )}
      >
        <p className="text-slate-600 font-bold">Are you sure you want to disconnect {pageToToggle?.name}?</p>
      </Modal>

      {/* Success Modal */}
      <Modal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        title="Success"
        footer={(
          <button onClick={() => setIsSuccessModalOpen(false)} className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold">Great!</button>
        )}
      >
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-4">
            <CheckCircle2 size={32} />
          </div>
          <p className="font-bold text-slate-900 leading-relaxed">{successMsg}</p>
        </div>
      </Modal>
    </div>
  );
};

export default PageConnector;
