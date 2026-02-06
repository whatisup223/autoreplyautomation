
import React, { useState } from 'react';
import { MessageSquare, Search, Filter, Sparkles, Send, CheckCircle, Shield } from 'lucide-react';
import AutomationTester from './AutomationTester';

const Inbox: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'live' | 'test'>('live');

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">مركز التحكم الذكي</h2>
          <p className="text-gray-500 text-sm">راقب التفاعلات الحية واختبر القواعد الجديدة.</p>
        </div>
        <div className="flex bg-white p-1 rounded-xl border border-gray-100 shadow-sm">
          <button 
            onClick={() => setActiveTab('live')}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition ${activeTab === 'live' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            التفاعلات الحية
          </button>
          <button 
            onClick={() => setActiveTab('test')}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition ${activeTab === 'test' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            اختبار الأتمتة
          </button>
        </div>
      </div>

      {activeTab === 'live' ? (
        <div className="grid lg:grid-cols-3 gap-6 h-[600px]">
          {/* قائمة التفاعلات */}
          <div className="lg:col-span-1 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col">
            <div className="p-4 border-b border-gray-50 space-y-3">
              <div className="relative">
                <Search className="absolute right-3 top-3 text-gray-400" size={18} />
                <input type="text" placeholder="بحث في التعليقات..." className="w-full pr-10 pl-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm" />
              </div>
              <div className="flex gap-2">
                <button className="flex-1 text-[10px] font-bold bg-blue-50 text-blue-600 py-1 rounded-lg">الكل</button>
                <button className="flex-1 text-[10px] font-bold text-gray-400 hover:bg-gray-50 py-1 rounded-lg">بانتظار الرد</button>
                <button className="flex-1 text-[10px] font-bold text-gray-400 hover:bg-gray-50 py-1 rounded-lg">بواسطة AI</button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-2">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className={`p-4 rounded-xl cursor-pointer transition ${i === 1 ? 'bg-blue-50 border-blue-100 border' : 'hover:bg-gray-50 border border-transparent'}`}>
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-sm font-bold text-gray-800">عميل فيسبوك {i}</p>
                    <span className="text-[10px] text-gray-400">منذ {i * 5} د</span>
                  </div>
                  <p className="text-xs text-gray-600 line-clamp-1">ممكن أعرف السعر وطريقة التوصيل لو سمحت؟</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-green-100 text-green-600 rounded text-[9px] font-bold">تم الرد ذكياً</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* معاينة المحادثة والرد */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">C1</div>
                <div>
                  <h4 className="font-bold text-sm">عميل فيسبوك 1</h4>
                  <p className="text-[10px] text-green-600">نشط الآن على صفحة: متجر الأناقة</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-orange-500 hover:bg-orange-50 rounded-lg transition" title="إخفاء التعليق"><Shield size={18} /></button>
                <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition" title="رد ذكي يدوي"><Sparkles size={18} /></button>
              </div>
            </div>

            <div className="flex-1 p-6 space-y-6 overflow-y-auto">
              <div className="flex gap-3">
                <div className="bg-gray-100 p-4 rounded-2xl rounded-tr-none max-w-[80%]">
                  <p className="text-sm text-gray-800">أهلاً بك، كنت أسأل عن الفستان المعروض في البوست الأخير، هل متوفر مقاس 42؟</p>
                  <span className="text-[10px] text-gray-400 mt-2 block">10:45 AM</span>
                </div>
              </div>
              <div className="flex gap-3 justify-end">
                <div className="bg-blue-600 p-4 rounded-2xl rounded-tl-none max-w-[80%] text-white">
                  <p className="text-sm">أهلاً بك! نعم متوفر المقاس، وبإمكانك الاختيار بين 3 ألوان مختلفة. هل تودين حجز قطعة؟ ✨</p>
                  <div className="flex items-center gap-1 mt-2">
                    <CheckCircle size={10} />
                    <span className="text-[9px] opacity-80">رد بواسطة Gemini AI</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-100">
              <div className="flex gap-2">
                <input type="text" placeholder="اكتب ردك هنا..." className="flex-1 p-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                <button className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition">
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <AutomationTester />
      )}
    </div>
  );
};

export default Inbox;
