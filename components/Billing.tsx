
import React from 'react';
import { Check, Zap, Shield, Crown } from 'lucide-react';

const PricingCard = ({ title, price, features, icon: Icon, recommended }: any) => (
  <div className={`bg-white p-8 rounded-3xl border-2 transition-all relative ${recommended ? 'border-blue-500 shadow-xl shadow-blue-50' : 'border-gray-100 hover:border-gray-200'}`}>
    {recommended && (
      <span className="absolute -top-4 right-8 bg-blue-500 text-white px-4 py-1 rounded-full text-xs font-bold">الأكثر رواجاً</span>
    )}
    <div className={`w-12 h-12 rounded-2xl mb-6 flex items-center justify-center ${recommended ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'}`}>
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <div className="flex items-baseline gap-1 mb-6">
      <span className="text-4xl font-bold">${price}</span>
      <span className="text-gray-400">/شهر</span>
    </div>
    <ul className="space-y-4 mb-8">
      {features.map((f: string, i: number) => (
        <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
          <Check size={16} className="text-green-500 shrink-0" />
          {f}
        </li>
      ))}
    </ul>
    <button className={`w-full py-4 rounded-2xl font-bold transition ${recommended ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-100' : 'bg-gray-50 text-gray-800 hover:bg-gray-100'}`}>
      اشترك الآن
    </button>
  </div>
);

const Billing: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-800">خطط تناسب جميع الاحتياجات</h2>
        <p className="text-gray-500 max-w-lg mx-auto">اختر الخطة التي تناسب حجم أعمالك وابدأ الأتمتة الذكية اليوم.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <PricingCard 
          title="الخطة الأساسية" 
          price="19" 
          icon={Zap}
          features={['ربط 3 صفحات فيسبوك', 'رد تلقائي بالكلمات المفتاحية', '500 رد/شهر', 'دعم فني عبر البريد']} 
        />
        <PricingCard 
          title="خطة المحترفين" 
          price="49" 
          recommended={true}
          icon={Shield}
          features={['ربط 10 صفحات فيسبوك', 'ردود ذكية بـ Gemini AI', 'أتمتة غير محدودة', 'إخفاء التعليقات الضارة', 'تقارير أداء متقدمة']} 
        />
        <PricingCard 
          title="خطة الوكالات" 
          price="99" 
          icon={Crown}
          features={['صفحات غير محدودة', 'نظام White Label', 'أولوية في الدعم الفني', 'API مخصص للمطورين', 'تدريب مباشر للفريق']} 
        />
      </div>

      <div className="bg-blue-50 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h4 className="text-xl font-bold text-blue-900">هل تحتاج لخطة مخصصة؟</h4>
          <p className="text-blue-700">نوفر حلولاً خاصة للشركات الكبرى والمؤسسات الحكومية.</p>
        </div>
        <button className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold hover:bg-blue-50 transition border border-blue-100">
          تواصل مع المبيعات
        </button>
      </div>
    </div>
  );
};

export default Billing;
