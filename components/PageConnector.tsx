
import React, { useState } from 'react';
import { Facebook, CheckCircle2, Plus, AlertCircle, Loader2, Save, Zap, ZapOff } from 'lucide-react';
import { fetchUserPages, subscribePageToWebhook } from '../services/facebookService';
import { FBPage } from '../types';

const PageConnector: React.FC = () => {
  const [token, setToken] = useState(localStorage.getItem('fb_user_token') || '');
  const [isFetching, setIsFetching] = useState(false);
  const [pages, setPages] = useState<FBPage[]>([]);
  const [connectedPages, setConnectedPages] = useState<FBPage[]>(
    JSON.parse(localStorage.getItem('connected_pages') || '[]')
  );
  const [error, setError] = useState<string | null>(null);
  const [subscribingId, setSubscribingId] = useState<string | null>(null);

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
        tasks: [] // سنستخدم هذا لتخزين حالة الاشتراك
      }));
      setPages(formattedPages);
      localStorage.setItem('fb_user_token', token);
    } catch (err: any) {
      setError(err.message || 'فشل في جلب الصفحات. تأكد من صحة التوكن.');
    } finally {
      setIsFetching(false);
    }
  };

  const toggleSubscription = async (page: FBPage) => {
    setSubscribingId(page.id);
    try {
      // تنفيذ الاشتراك الحقيقي في فيسبوك
      await subscribePageToWebhook(page.id, page.access_token);
      
      const isConnected = connectedPages.some(p => p.id === page.id);
      let newConnected;
      if (isConnected) {
        newConnected = connectedPages.map(p => p.id === page.id ? { ...p, tasks: ['webhook_active'] } : p);
      } else {
        newConnected = [...connectedPages, { ...page, tasks: ['webhook_active'] }];
      }
      setConnectedPages(newConnected);
      localStorage.setItem('connected_pages', JSON.stringify(newConnected));
      alert(`تم تفعيل الاستقبال التلقائي لصفحة ${page.name} بنجاح!`);
    } catch (err: any) {
      alert(`خطأ في الاشتراك: ${err.message}`);
    } finally {
      setSubscribingId(null);
    }
  };

  const removePage = (id: string) => {
    const newConnected = connectedPages.filter(p => p.id !== id);
    setConnectedPages(newConnected);
    localStorage.setItem('connected_pages', JSON.stringify(newConnected));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
          <Facebook className="text-blue-600" />
          ربط حساب فيسبوك (الإعداد المتقدم)
        </h2>
        
        <div className="flex gap-2">
          <input
            type="password"
            placeholder="أدخل User Access Token..."
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button
            onClick={handleFetch}
            disabled={isFetching || !token}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition disabled:opacity-50 flex items-center gap-2"
          >
            {isFetching ? <Loader2 className="animate-spin" /> : <Save size={20} />}
            جلب الصفحات
          </button>
        </div>
        {error && <p className="mt-3 text-red-500 text-sm flex items-center gap-1"><AlertCircle size={14} /> {error}</p>}
      </div>

      <div className="grid gap-4">
        <h3 className="text-lg font-semibold text-gray-700">إدارة صفحاتك النشطة</h3>
        {(pages.length > 0 ? pages : connectedPages).map(page => {
          const isConnected = connectedPages.some(p => p.id === page.id);
          const isWebhookActive = connectedPages.find(p => p.id === page.id)?.tasks?.includes('webhook_active');
          
          return (
            <div key={page.id} className="bg-white p-5 rounded-xl border border-gray-100 flex items-center justify-between hover:shadow-md transition">
              <div className="flex items-center gap-4">
                <img src={page.picture} alt="" className="w-14 h-14 rounded-full border-2 border-blue-50 bg-gray-100" />
                <div>
                  <h4 className="font-bold text-gray-800">{page.name}</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">ID: {page.id}</span>
                    {isWebhookActive && (
                      <span className="flex items-center gap-1 text-[10px] bg-green-100 text-green-600 px-2 py-0.5 rounded-full font-bold">
                        <Zap size={10} fill="currentColor" /> متصلة بالويب هوك
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => toggleSubscription(page)}
                  disabled={subscribingId === page.id}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition ${
                    isWebhookActive 
                    ? 'bg-blue-50 text-blue-600 border border-blue-100' 
                    : 'bg-green-600 text-white hover:bg-green-700 shadow-sm'
                  }`}
                >
                  {subscribingId === page.id ? <Loader2 size={18} className="animate-spin" /> : <Zap size={18} />}
                  {isWebhookActive ? 'تحديث الاشتراك' : 'تفعيل الرد التلقائي'}
                </button>
                
                {isConnected && (
                  <button 
                    onClick={() => removePage(page.id)}
                    className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition"
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
  );
};

export default PageConnector;
