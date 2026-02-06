
import React, { useState } from 'react';
import { Plus, Trash2, Save, ToggleLeft, ToggleRight, Sparkles, EyeOff, ThumbsUp, UserPlus } from 'lucide-react';
import { AutomationRule } from '../types';

const RulesEditor: React.FC = () => {
  const [rules, setRules] = useState<AutomationRule[]>([
    {
      id: '1',
      name: 'الرد على استفسار السعر',
      trigger: 'comment',
      keywords: ['بكام', 'سعر', 'التكلفة'],
      replyText: 'أهلاً بك! تم إرسال كافة التفاصيل في رسالة خاصة.',
      useAI: true,
      actionHide: true,
      actionLike: true,
      actionMention: true,
      active: true,
    }
  ]);

  const toggleRule = (id: string) => {
    setRules(rules.map(r => r.id === id ? { ...r, active: !r.active } : r));
  };

  const removeRule = (id: string) => {
    setRules(rules.filter(r => r.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">قواعد الأتمتة</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition">
          <Plus size={20} />
          إضافة قاعدة جديدة
        </button>
      </div>

      <div className="grid gap-6">
        {rules.map((rule) => (
          <div key={rule.id} className={`bg-white rounded-2xl shadow-sm border p-6 transition-all ${rule.active ? 'border-blue-200 ring-1 ring-blue-100' : 'border-gray-200 opacity-75'}`}>
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${rule.active ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
                  {rule.trigger === 'comment' ? <Sparkles size={24} /> : <Save size={24} />}
                </div>
                <div>
                  <h3 className="text-lg font-bold">{rule.name}</h3>
                  <p className="text-sm text-gray-500">مشغّل بواسطة {rule.trigger === 'comment' ? 'التعليقات' : 'الرسائل'}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => toggleRule(rule.id)}>
                  {rule.active ? <ToggleRight size={40} className="text-blue-600" /> : <ToggleLeft size={40} className="text-gray-300" />}
                </button>
                <button onClick={() => removeRule(rule.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">الكلمات المفتاحية</label>
                  <div className="flex flex-wrap gap-2">
                    {rule.keywords.map(k => (
                      <span key={k} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">{k}</span>
                    ))}
                    <button className="text-blue-600 text-sm font-semibold">+ إضافة</button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">نص الرد الافتراضي</label>
                  <textarea 
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm min-h-[100px]"
                    defaultValue={rule.replyText}
                  />
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl space-y-3">
                <h4 className="font-semibold text-gray-700 mb-2">الإجراءات التلقائية</h4>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-sm">
                    <EyeOff size={18} className="text-orange-500" />
                    <span>إخفاء التعليق بعد الرد</span>
                  </div>
                  <input type="checkbox" checked={rule.actionHide} readOnly className="w-4 h-4 text-blue-600" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-sm">
                    <ThumbsUp size={18} className="text-green-500" />
                    <span>عمل لايك تلقائي</span>
                  </div>
                  <input type="checkbox" checked={rule.actionLike} readOnly className="w-4 h-4 text-blue-600" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-sm">
                    <UserPlus size={18} className="text-blue-500" />
                    <span>منشن للعميل في الرد</span>
                  </div>
                  <input type="checkbox" checked={rule.actionMention} readOnly className="w-4 h-4 text-blue-600" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-sm">
                    <Sparkles size={18} className="text-purple-500" />
                    <span>استخدام الذكاء الاصطناعي (Gemini)</span>
                  </div>
                  <input type="checkbox" checked={rule.useAI} readOnly className="w-4 h-4 text-blue-600" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RulesEditor;
