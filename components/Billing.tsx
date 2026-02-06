import React from 'react';
import { Check, Zap, Shield, Crown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const PricingCard = ({ title, price, features, icon: Icon, recommended }: any) => {
  const { t } = useTranslation();
  return (
    <div className={`bg-white p-8 rounded-3xl border-2 transition-all relative ${recommended ? 'border-blue-500 shadow-xl shadow-blue-50' : 'border-gray-100 hover:border-gray-200'}`}>
      {recommended && (
        <span className="absolute -top-4 right-8 rtl:left-8 rtl:right-auto bg-blue-500 text-white px-4 py-1 rounded-full text-xs font-bold">{t('most_popular')}</span>
      )}
      <div className={`w-12 h-12 rounded-2xl mb-6 flex items-center justify-center ${recommended ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'}`}>
        <Icon size={24} />
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <div className="flex items-baseline gap-1 mb-6">
        <span className="text-4xl font-bold">${price}</span>
        <span className="text-gray-400">/{t('month')}</span>
      </div>
      <ul className="space-y-4 mb-8">
        {features.map((f: string, i: number) => (
          <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
            <Check size={16} className="text-green-500 shrink-0" />
            {t(f)}
          </li>
        ))}
      </ul>
      <button className={`w-full py-4 rounded-2xl font-bold transition ${recommended ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-100' : 'bg-gray-50 text-gray-800 hover:bg-gray-100'}`}>
        {t('subscribe_now')}
      </button>
    </div>
  );
};

const Billing: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-12">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-800">{t('choose_plan')}</h2>
        <p className="text-gray-500 max-w-lg mx-auto">{t('choose_plan_desc')}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <PricingCard
          title={t('plans_title_basic')}
          price="19"
          icon={Zap}
          features={['feature_3_pages', 'feature_keyword_reply', 'feature_500_replies', 'feature_email_support']}
        />
        <PricingCard
          title={t('plans_title_pro')}
          price="49"
          recommended={true}
          icon={Shield}
          features={['feature_10_pages', 'feature_smart_reply', 'feature_unlimited_auto', 'feature_hide_comments', 'ai_performance']}
        />
        <PricingCard
          title={t('plans_title_agency')}
          price="99"
          icon={Crown}
          features={['feature_unlimited_pages', 'feature_whitelabel', 'feature_api', 'active_chats', 'users_management']}
        />
      </div>

      <div className="bg-blue-50 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h4 className="text-xl font-bold text-blue-900">{t('custom_plan')}</h4>
          <p className="text-blue-700 font-medium">We offer special solutions for large enterprises and government entities.</p>
        </div>
        <button className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold hover:bg-blue-50 transition border border-blue-100 shadow-sm">
          {t('contact_sales')}
        </button>
      </div>
    </div>
  );
};

export default Billing;
