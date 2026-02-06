
import React, { useState } from 'react';
import { Play, Sparkles, MessageCircle, ThumbsUp, EyeOff, Loader2 } from 'lucide-react';
import { generateSmartReply } from '../services/geminiService';
import { replyToComment, likeComment, hideComment } from '../services/facebookService';

const AutomationTester: React.FC = () => {
  const [commentId, setCommentId] = useState('');
  const [commentText, setCommentText] = useState('');
  const [selectedPageId, setSelectedPageId] = useState('');
  const [status, setStatus] = useState<'idle' | 'running' | 'done'>('idle');
  const [logs, setLogs] = useState<string[]>([]);

  const connectedPages = JSON.parse(localStorage.getItem('connected_pages') || '[]');

  const addLog = (msg: string) => setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev]);

  const runTest = async () => {
    if (!commentId || !selectedPageId) return;
    const page = connectedPages.find((p: any) => p.id === selectedPageId);
    if (!page) return;

    setStatus('running');
    setLogs([]);
    addLog(`بدء معالجة التعليق: ${commentId}`);

    try {
      // 1. Generate AI Reply
      addLog("جاري استشارة Gemini لإنشاء رد ذكي...");
      const reply = await generateSmartReply(commentText || "استفسار عام");
      addLog(`الرد المقترح: ${reply}`);

      // 2. Real API Calls
      addLog("إرسال الرد إلى فيسبوك...");
      await replyToComment(commentId, reply, page.access_token);
      addLog("تم إرسال الرد بنجاح.");

      addLog("إجراء لايك تلقائي...");
      await likeComment(commentId, page.access_token);
      
      addLog("إخفاء التعليق الأصلي (للحماية من المنافسين)...");
      await hideComment(commentId, page.access_token);

      addLog("اكتملت العملية بنجاح! تحقق من صفحتك الآن.");
    } catch (err: any) {
      addLog(`خطأ: ${err.message}`);
    } finally {
      setStatus('done');
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Play className="text-green-600" />
        تشغيل أتمتة حقيقية (تجربة حية)
      </h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">اختر الصفحة المستهدفة</label>
            <select 
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl"
              value={selectedPageId}
              onChange={(e) => setSelectedPageId(e.target.value)}
            >
              <option value="">-- اختر صفحة --</option>
              {connectedPages.map((p: any) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">معرف التعليق (Comment ID)</label>
            <input 
              type="text"
              placeholder="123456789_987654321"
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl"
              value={commentId}
              onChange={(e) => setCommentId(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">محتوى التعليق (للمحاكاة الذكية)</label>
            <textarea 
              placeholder="مثلاً: بكام السعر؟"
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl min-h-[80px]"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
          </div>

          <button
            onClick={runTest}
            disabled={status === 'running' || !commentId || !selectedPageId}
            className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition flex items-center justify-center gap-2"
          >
            {status === 'running' ? <Loader2 className="animate-spin" /> : <Sparkles size={20} />}
            تنفيذ الأتمتة الآن
          </button>
        </div>

        <div className="bg-gray-900 text-green-400 p-4 rounded-xl font-mono text-xs overflow-y-auto max-h-[350px]">
          <p className="text-gray-500 mb-2 border-b border-gray-800 pb-1">Console Logs / سجل العمليات</p>
          {logs.length === 0 && <p className="text-gray-700 italic">انتظار بدء العملية...</p>}
          {logs.map((log, i) => <div key={i} className="mb-1">{log}</div>)}
        </div>
      </div>
    </div>
  );
};

export default AutomationTester;
