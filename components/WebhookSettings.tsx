
import React, { useState, useEffect } from 'react';
import { Globe, Copy, Check, ShieldCheck, Code, AlertTriangle } from 'lucide-react';

const WebhookSettings: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null);
  const [verifyToken, setVerifyToken] = useState('');
  
  useEffect(() => {
    const savedToken = localStorage.getItem('fb_verify_token');
    if (savedToken) {
      setVerifyToken(savedToken);
    } else {
      const newToken = 'AUTOREPLY_' + Math.random().toString(36).substring(2, 12).toUpperCase();
      setVerifyToken(newToken);
      localStorage.setItem('fb_verify_token', newToken);
    }
  }, []);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const backendCode = `
// كود Node.js (Express) لاستقبال الويب هوك ومعالجته بـ Gemini
const express = require('express');
const app = express();
app.use(express.json());

// 1. التحقق من الويب هوك (GET)
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token === '${verifyToken}') {
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// 2. استقبال الأحداث (POST)
app.post('/webhook', async (req, res) => {
  const body = req.body;
  if (body.object === 'page') {
    body.entry.forEach(async (entry) => {
      const webhook_event = entry.changes[0].value;
      if (webhook_event.item === 'comment' && webhook_event.verb === 'add') {
        const commentId = webhook_event.comment_id;
        const message = webhook_event.message;
        console.log('تعليق جديد وارد:', message);
        // هنا يمكنك استدعاء API الرد التلقائي الخاص بك
      }
    });
    res.status(200).send('EVENT_RECEIVED');
  } else {
    res.sendStatus(404);
  }
});

app.listen(3000, () => console.log('الخادم يعمل على منفذ 3000'));
`;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-100">
            <Globe size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">نظام الربط الحي (Full SaaS Stack)</h2>
            <p className="text-gray-500 text-sm font-medium">خطوات تحويل التطبيق من تجريبي إلى نظام أتمتة حقيقي.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="font-bold text-gray-700 border-r-4 border-blue-500 pr-3">بيانات الربط مع Facebook</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Verify Token (Challenge Hub)</label>
                <div className="flex gap-2">
                  <input readOnly value={verifyToken} className="flex-1 bg-gray-50 border border-gray-200 p-3 rounded-xl text-sm font-mono font-bold text-blue-600" />
                  <button onClick={() => copyToClipboard(verifyToken, 'token')} className="p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition">
                    {copied === 'token' ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
                  </button>
                </div>
              </div>

              <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 flex gap-3">
                <AlertTriangle className="text-amber-600 shrink-0" size={20} />
                <p className="text-xs text-amber-800 leading-relaxed">
                  <strong>ملاحظة:</strong> فيسبوك لا يقبل روابط localhost. يجب عليك استخدام خدمة مثل <strong>Ngrok</strong> أو <strong>Cloudflare Tunnel</strong> لتوليد رابط HTTPS يشير إلى جهازك أثناء التطوير.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-bold text-gray-700 flex items-center gap-2">
                  <ShieldCheck size={18} className="text-green-600" />
                  الخطوة الأخيرة للتفعيل:
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  بعد وضع البيانات أعلاه في Facebook Developers، اذهب إلى صفحة <strong>"الصفحات المتصلة"</strong> في تطبيقنا واضغط على <strong>"تفعيل الرد التلقائي"</strong> لكل صفحة تريد مراقبتها.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-gray-700 flex items-center gap-2">
              <Code size={20} className="text-purple-600" />
              كود الخادم (Backend)
            </h3>
            <div className="relative group">
              <pre className="bg-gray-900 text-gray-300 p-4 rounded-xl text-[10px] font-mono overflow-x-auto max-h-[350px] leading-relaxed border border-gray-800">
                {backendCode}
              </pre>
              <button 
                onClick={() => copyToClipboard(backendCode, 'code')}
                className="absolute top-3 left-3 bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg transition"
              >
                {copied === 'code' ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebhookSettings;
