
import React, { useState, useEffect } from 'react';
import {
  Users,
  MessageSquare,
  Search,
  Star,
  Archive,
  Clock,
  Send,
  MoreVertical,
  Bot,
  CheckCircle,
  AlertCircle,
  Smile,
  Frown,
  Meh,
  Zap,
  User,
  ShieldAlert,
  Mail
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { dbService } from '../services/dbService';
import { generateSmartReply, analyzeMessage } from '../services/geminiService';
import Modal from './Modal';

const Inbox: React.FC = () => {
  const { t } = useTranslation();
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSimulationOpen, setIsSimulationOpen] = useState(false);
  const [simContent, setSimContent] = useState('أنا غاضب جداً! الخدمة سيئة ولم يصلني المنتج حتى الآن، أطالب باسترداد مالي فوراً!');
  const [simResult, setSimResult] = useState<any>(null);
  const [simLoading, setSimLoading] = useState(false);

  const handleSend = () => {
    if (!message.trim()) return;
    setSending(true);

    setTimeout(() => {
      dbService.addLog({
        type: 'manual_reply',
        content: message,
        user: 'Ahmed Ali',
        page: 'Customer Page',
        status: 'success',
        sentiment: 'positive',
        intent: 'manual_reply'
      });
      setMessage('');
      setSending(false);
      setIsModalOpen(true);
    }, 500);
  };

  const runSimulation = async () => {
    setSimLoading(true);
    setSimResult(null);
    try {
      const reply = await generateSmartReply(simContent);
      const analysis = await analyzeMessage(simContent);
      const settings = dbService.getCrisisSettings();

      const isCrisisActive = settings.enabled && analysis.sentiment === 'negative';

      setSimResult({
        reply,
        analysis,
        crisisTriggered: isCrisisActive,
        settings
      });
    } catch (error) {
      console.error("Simulation failed:", error);
    } finally {
      setSimLoading(false);
    }
  };

  const useDraft = () => {
    const draft = "Yes, absolutely! Our Pro Plan includes full API access with increased rate limits and dedicated support. Would you like me to send you the documentation?";
    setMessage(draft);
  };

  const customers = [
    { id: 1, name: 'Mohamed Ali', lastMsg: 'I have an issue with the plan', time: '10:30 AM', sentiment: 'negative', intent: 'complaint', urgency: 'high' },
    { id: 2, name: 'Sara Kamel', lastMsg: 'How much is the pro plan?', time: 'Yesterday', sentiment: 'neutral', intent: 'pricing', urgency: 'medium' },
    { id: 3, name: 'John Doe', lastMsg: 'Thanks for the great service!', time: 'Yesterday', sentiment: 'positive', intent: 'feedback', urgency: 'low' },
  ];

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col gap-6 overflow-hidden pb-4">
      {/* Simulation Trigger Bar */}
      <div className="bg-slate-900 text-white p-4 rounded-3xl flex items-center justify-between shadow-xl shadow-slate-200 animate-in fade-in slide-in-from-top-4 duration-500">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center border border-blue-500/30">
            <ShieldAlert size={20} className="text-blue-400" />
          </div>
          <div>
            <p className="text-sm font-bold">Crisis Mode Simulator</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest text-blue-400">Experimental AI Feature</p>
          </div>
        </div>
        <button
          onClick={() => setIsSimulationOpen(true)}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-xl text-xs font-bold transition flex items-center gap-2"
        >
          <Zap size={14} fill="currentColor" /> Run Crisis Test
        </button>
      </div>

      <div className="flex-1 flex gap-6 overflow-hidden">
        {/* Sidebar List */}
        <div className="w-80 flex flex-col glass-card rounded-[2rem] overflow-hidden shrink-0 hidden md:flex">
          <div className="p-6 border-b border-white/50">
            <h3 className="text-xl font-bold text-slate-900 mb-4">{t('inbox_title')}</h3>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 rtl:left-auto rtl:right-4" size={16} />
              <input type="text" placeholder={t('search_placeholder')} className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-bold text-slate-700 outline-none rtl:pl-4 rtl:pr-10" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {customers.map((c) => (
              <div key={c.id} className={`p-4 rounded-3xl cursor-pointer transition duration-300 hover:bg-white/80 border border-transparent ${c.id === 1 ? 'bg-blue-50/50 border-blue-100 shadow-sm' : ''}`}>
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-slate-900 text-sm">{c.name}</h4>
                  <span className="text-[10px] font-bold text-slate-400">{c.time}</span>
                </div>
                <p className="text-xs text-slate-500 line-clamp-1 font-medium mb-2">{c.lastMsg}</p>

                <div className="flex gap-2">
                  <div className={`flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-bold border ${c.sentiment === 'positive' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                    c.sentiment === 'negative' ? 'bg-red-50 text-red-600 border-red-100' :
                      'bg-slate-50 text-slate-500 border-slate-100'
                    }`}>
                    {c.sentiment === 'positive' ? <Smile size={10} /> : c.sentiment === 'negative' ? <Frown size={10} /> : <Meh size={10} />}
                    {c.sentiment}
                  </div>
                  {c.urgency === 'high' && (
                    <div className="flex items-center gap-1 px-2 py-0.5 bg-orange-50 text-orange-600 border border-orange-100 rounded-lg text-[10px] font-bold uppercase tracking-tighter shadow-sm animate-pulse">
                      <Zap size={10} fill="currentColor" /> Urgent
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 glass-card rounded-[2rem] flex flex-col overflow-hidden">
          {/* Chat Header */}
          <div className="p-6 border-b border-white/50 flex justify-between items-center bg-white/40 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-lg shadow-indigo-200">MA</div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Mohamed Ali</h3>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-[10px] text-emerald-600 font-bold"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> {t('online')}</span>
                  <span className="text-slate-300">|</span>
                  <span className="text-[10px] text-red-500 font-bold flex items-center gap-1"><Frown size={12} /> Dissatisfied Customer</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2.5 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-blue-600 transition shadow-sm"><Star size={20} /></button>
              <button className="p-2.5 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-red-600 transition shadow-sm"><Archive size={20} /></button>
              <button className="p-2.5 bg-white border border-slate-100 rounded-xl text-slate-400 transition shadow-sm"><MoreVertical size={20} /></button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-white/20">
            <div className="flex flex-col items-center mb-8">
              <span className="px-4 py-1 bg-slate-100/50 rounded-full text-[10px] font-bold text-slate-400 uppercase tracking-widest">Today, 10:30 AM</span>
            </div>

            {/* Incoming */}
            <div className="flex gap-4 max-w-[80%]">
              <div className="w-8 h-8 rounded-xl bg-slate-100 shrink-0"></div>
              <div className="space-y-1">
                <div className="p-5 bg-white rounded-3xl rounded-tl-none shadow-xl shadow-slate-500/5 text-sm font-medium text-slate-700 leading-relaxed border border-white">
                  Hello! I have an issue with the pro plan pricing. I was promised a discount but it's not showing up.
                  <div className="mt-4 pt-3 border-t border-slate-50 flex gap-4">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-red-500 uppercase tracking-tighter">
                      <Frown size={14} /> Negative Sentiment
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-blue-500 uppercase tracking-tighter">
                      <Zap size={14} /> Pricing Intent
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-slate-400 ml-2">10:30 AM</span>
              </div>
            </div>

            {/* AI Draft Suggestion */}
            <div className="flex gap-4 max-w-[80%] ml-auto rtl:mr-auto rtl:ml-0 flex-row-reverse rtl:flex-row">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 shrink-0 flex items-center justify-center text-white shadow-xl shadow-purple-500/20">
                <Bot size={20} />
              </div>
              <div className="space-y-4 w-full">
                <div className="p-6 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 backdrop-blur-md border border-blue-100 rounded-3xl shadow-xl shadow-blue-500/5 text-sm font-medium text-slate-700 leading-relaxed relative group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-widest">
                      <Bot size={14} /> {t('ai_draft')}
                    </div>
                    <span className="text-[10px] font-bold text-blue-400 px-2 py-0.5 bg-white rounded-lg border border-blue-50 shadow-sm underline">Confidence: 98%</span>
                  </div>

                  I'm very sorry to hear that! We definitely want to honor any promise made. Could you please provide the discount code or the email where you received the offer? I'll fix this for you right away.

                  {/* Suggestion Actions */}
                  <div className="mt-6 pt-4 border-t border-blue-200/50 flex gap-3">
                    <button onClick={useDraft} className="flex-1 py-3 bg-blue-600 text-white rounded-2xl text-xs font-bold shadow-xl shadow-blue-500/30 hover:bg-blue-700 transition flex items-center justify-center gap-2">
                      <CheckCircle size={16} /> {t('use_draft')}
                    </button>
                    <button className="px-6 py-3 bg-white text-slate-500 rounded-2xl text-xs font-bold border border-slate-200 hover:bg-slate-50 transition">
                      {t('edit')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="p-6 bg-white/60 backdrop-blur-md border-t border-white/50">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder={t('type_message')}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-5 bg-white rounded-[2rem] text-sm font-bold text-slate-700 outline-none shadow-xl shadow-slate-500/5 border border-slate-100 focus:border-blue-200 transition"
                />
                <button className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-slate-50 rounded-xl text-slate-400 rotate-45 transition rtl:right-auto rtl:left-4">
                  <Star size={20} />
                </button>
              </div>
              <button
                onClick={handleSend}
                disabled={sending}
                className="w-16 h-16 bg-slate-900 text-white rounded-[2rem] flex items-center justify-center shadow-2xl hover:bg-black transition group disabled:opacity-50"
              >
                <Send size={24} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition rtl:rotate-180" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Simulation Modal */}
      <Modal isOpen={isSimulationOpen} onClose={() => setIsSimulationOpen(false)} title="Crisis Management Simulator">
        <div className="space-y-6 p-2">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex justify-between">
              <span>Customer Input (Negative)</span>
              <span className="text-orange-500">Current Language: Arabic</span>
            </label>
            <textarea
              value={simContent}
              onChange={(e) => setSimContent(e.target.value)}
              className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-700 focus:bg-white transition outline-none resize-none"
              rows={3}
            />
          </div>

          <button
            onClick={runSimulation}
            disabled={simLoading}
            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-xl hover:bg-black transition flex items-center justify-center gap-2 group disabled:opacity-50"
          >
            {simLoading ? <Zap size={18} className="animate-spin" /> : <Zap size={18} fill="currentColor" />}
            Start AI Analysis & Crisis Test
          </button>

          {simResult && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
              {/* Status Label */}
              <div className={`p-4 rounded-2xl flex items-center gap-3 ${simResult.crisisTriggered ? 'bg-orange-50 border border-orange-100' : 'bg-slate-50 border border-slate-100'}`}>
                {simResult.crisisTriggered ? (
                  <>
                    <div className="w-8 h-8 bg-orange-500 text-white rounded-lg flex items-center justify-center shadow-lg shadow-orange-200">
                      <ShieldAlert size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-orange-900">Crisis Mode Triggered!</p>
                      <p className="text-[10px] text-orange-600 font-bold uppercase tracking-tight">Bot Interrupted • Human Handover Active</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-8 h-8 bg-slate-400 text-white rounded-lg flex items-center justify-center shadow-lg">
                      <Bot size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Normal Bot Flow</p>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">Sentiment Neutral/Positive • Bot continues normally</p>
                    </div>
                  </>
                )}
              </div>

              {/* Analysis Pills */}
              <div className="flex gap-2">
                <div className="px-3 py-1 bg-white border border-slate-100 rounded-xl text-[10px] font-bold text-slate-500">
                  Sentiment: <span className={simResult.analysis.sentiment === 'negative' ? 'text-red-500' : 'text-emerald-500'}>{simResult.analysis.sentiment}</span>
                </div>
                <div className="px-3 py-1 bg-white border border-slate-100 rounded-xl text-[10px] font-bold text-slate-500 uppercase">
                  Intent: {simResult.analysis.intent}
                </div>
              </div>

              {/* Final Output */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Final Bot Response</label>
                <div className={`p-5 rounded-3xl text-sm font-bold leading-relaxed border ${simResult.crisisTriggered ? 'bg-orange-50 border-orange-200 text-orange-900' : 'bg-blue-50/50 border-blue-100 text-slate-700'}`}>
                  {simResult.reply}
                </div>
              </div>

              {/* Notification Simulation */}
              {simResult.crisisTriggered && (
                <div className="p-4 bg-blue-900 text-white rounded-2xl flex items-center gap-4 shadow-xl shadow-blue-200 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-1 bg-white/10 text-[8px] font-bold uppercase rounded-bl-xl tracking-widest">Mock Service</div>
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                    <Mail size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">System Notification Sent</p>
                    <p className="text-xs font-bold leading-tight">Handover alert sent to: <span className="text-blue-300 decoration-dotted underline">{simResult.settings.notifyEmail}</span></p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </Modal>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Success">
        <div className="flex flex-col items-center text-center p-4">
          <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-3xl flex items-center justify-center mb-6 shadow-xl shadow-emerald-500/5">
            <CheckCircle size={40} />
          </div>
          <h4 className="text-xl font-bold text-slate-900 mb-2">Message Dispatched</h4>
          <p className="font-bold text-slate-400 text-sm leading-relaxed">Your reply has been sent and the log has been updated with sentiment tags.</p>
          <button onClick={() => setIsModalOpen(false)} className="mt-8 w-full py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-xl">Back to Chat</button>
        </div>
      </Modal>
    </div>
  );
};

export default Inbox;
