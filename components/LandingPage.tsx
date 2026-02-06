import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  MessageSquare,
  ArrowRight,
  Zap,
  Shield,
  Globe,
  Users,
  CheckCircle,
  Play,
  Star,
  Plus,
  Facebook,
  Instagram,
  Twitter,
  Github,
  Mail,
  Phone,
  HelpCircle,
  Quote,
  Menu,
  X
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import { dbService } from '../services/dbService';

const LandingPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [plans, setPlans] = useState<any[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isRTL = i18n.dir() === 'rtl';

  useEffect(() => {
    setPlans(dbService.getPlans());
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of the sticky navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen relative bg-slate-50">
      {/* Background Elements */}
      <div className="fixed top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-blue-50/80 to-transparent -z-10"></div>
      <div className="fixed top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px] -z-10"></div>
      <div className="fixed bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[100px] -z-10"></div>

      {/* Navbar Container (Sticky Header) */}
      <header className="fixed top-0 left-0 right-0 z-[100] w-full bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm">
        <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setIsMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <div className="bg-slate-900 text-white p-2.5 rounded-xl text-center flex items-center justify-center">
              <span className="font-bold text-lg leading-none">AR</span>
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">{t('app_name')}</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6">
            <button onClick={() => scrollToSection('hero')} className="text-[10px] font-bold text-slate-500 hover:text-slate-900 transition uppercase tracking-widest outline-none">{t('menu_main')}</button>
            <button onClick={() => scrollToSection('features')} className="text-[10px] font-bold text-slate-500 hover:text-slate-900 transition uppercase tracking-widest outline-none">{t('features_title')}</button>
            <button onClick={() => scrollToSection('testimonials')} className="text-[10px] font-bold text-slate-500 hover:text-slate-900 transition uppercase tracking-widest outline-none">{t('customers_reviews')}</button>
            <button onClick={() => scrollToSection('pricing')} className="text-[10px] font-bold text-slate-500 hover:text-slate-900 transition uppercase tracking-widest outline-none">{t('menu_billing')}</button>
            <button onClick={() => scrollToSection('faq')} className="text-[10px] font-bold text-slate-500 hover:text-slate-900 transition uppercase tracking-widest outline-none">{t('faq')}</button>
            <button onClick={() => scrollToSection('contact')} className="text-[10px] font-bold text-slate-500 hover:text-slate-900 transition uppercase tracking-widest outline-none">اتصل بنا</button>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>
            <Link to="/login" className="hidden lg:block px-6 py-3 rounded-xl font-bold text-sm text-slate-600 hover:text-slate-900 hover:bg-white transition">{t('login_btn')}</Link>
            <Link to="/register" className="hidden sm:flex bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-xl hover:bg-black transition items-center gap-2 group">
              {t('hero_cta')} <ArrowRight size={16} className="group-hover:translate-x-[-2px] transition rtl:rotate-180" />
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile Full-Height Sidebar Menu */}
        <div
          className={`fixed inset-0 z-[10000] lg:hidden transition-all duration-300 ${isMobileMenuOpen ? 'visible' : 'invisible'}`}
        >
          {/* Backdrop (Dark overlay) */}
          <div
            className={`absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>

          {/* Sidebar Drawer: Full Height */}
          <div
            className={`absolute top-0 bottom-0 w-[300px] bg-white shadow-2xl transition-transform duration-500 ease-in-out flex flex-col z-[10001] ${isMobileMenuOpen
                ? 'translate-x-0'
                : (isRTL ? 'translate-x-full' : '-translate-x-full')
              } ${isRTL ? 'right-0' : 'left-0'}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-white">
              <div className="flex items-center gap-3">
                <div className="bg-black text-white p-2.5 rounded-xl shadow-lg">
                  <span className="font-bold text-lg leading-none">AR</span>
                </div>
                <span className="text-xl font-bold text-black tracking-tight">{t('app_name')}</span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-10 h-10 flex items-center justify-center bg-slate-100 text-black rounded-xl hover:bg-slate-200 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Links List */}
            <div className="flex-1 overflow-y-auto bg-white px-6 py-8 space-y-1">
              <MobileNavLink label={t('menu_main')} onClick={() => scrollToSection('hero')} />
              <MobileNavLink label={t('features_title')} onClick={() => scrollToSection('features')} />
              <MobileNavLink label={t('customers_reviews')} onClick={() => scrollToSection('testimonials')} />
              <MobileNavLink label={t('menu_billing')} onClick={() => scrollToSection('pricing')} />
              <MobileNavLink label={t('faq')} onClick={() => scrollToSection('faq')} />
              <MobileNavLink label="اتصل بنا" onClick={() => scrollToSection('contact')} />
            </div>

            {/* Bottom Actions */}
            <div className="p-6 bg-slate-50 border-t border-slate-100 space-y-4">
              <div className="flex justify-center mb-2">
                <LanguageSwitcher />
              </div>
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full py-4 text-center font-bold text-black bg-white border border-slate-200 rounded-2xl active:scale-95 transition-transform"
              >
                {t('login_btn')}
              </Link>
              <Link
                to="/register"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full py-4 text-center font-bold text-white bg-black rounded-2xl shadow-xl active:scale-95 transition-transform"
              >
                {t('hero_cta')}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section Padding for Fixed Header */}
      <div className="h-20"></div>

      {/* Hero Section */}
      <section id="hero" className="max-w-7xl mx-auto px-6 py-24 text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md border border-white px-4 py-2 rounded-full mb-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs font-bold text-slate-600 tracking-wide uppercase">{t('ai_connected')}</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-8 leading-[1.1] tracking-tight max-w-4xl mx-auto">
          {t('hero_title')}
        </h1>

        <p className="text-xl md:text-2xl text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
          {t('hero_desc')}
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <Link to="/register" className="h-16 px-10 bg-blue-600 text-white rounded-2xl font-bold text-lg shadow-2xl shadow-blue-500/40 hover:bg-blue-700 transition flex items-center gap-3 w-full md:w-auto justify-center group">
            {t('hero_cta')} <ArrowRight size={22} className="group-hover:translate-x-[-4px] transition rtl:rotate-180" />
          </Link>
          <button className="h-16 px-10 bg-white text-slate-700 rounded-2xl font-bold text-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition flex items-center gap-3 w-full md:w-auto justify-center">
            <Play size={20} className="fill-slate-700" /> {t('watch_demo')}
          </button>
        </div>

        {/* Floating Badges */}
        <div className="mt-20 flex flex-wrap justify-center gap-6 opacity-60 grayscale hover:grayscale-0 transition duration-700">
          <div className="flex items-center gap-2 font-bold text-slate-500"><CheckCircle size={18} className="text-emerald-500" /> No credit card required</div>
          <div className="flex items-center gap-2 font-bold text-slate-500"><CheckCircle size={18} className="text-emerald-500" /> 14-day free trial</div>
          <div className="flex items-center gap-2 font-bold text-slate-500"><CheckCircle size={18} className="text-emerald-500" /> Cancel anytime</div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-32 border-t border-slate-100">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">{t('features_title')}</h2>
          <p className="text-slate-500 font-bold max-w-xl mx-auto leading-relaxed">{t('hero_desc')}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          <FeatureCard
            icon={Zap}
            title={t('feature_instant_title')}
            desc={t('feature_instant_desc')}
            color="bg-amber-500"
          />
          <FeatureCard
            icon={Shield}
            title={t('feature_accents_title')}
            desc={t('feature_accents_desc')}
            color="bg-emerald-500"
          />
          <FeatureCard
            icon={MessageSquare}
            title={t('feature_sales_title')}
            desc={t('feature_sales_desc')}
            color="bg-blue-500"
          />
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="bg-slate-900 py-32 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">{t('customers_reviews')}</h2>
            <div className="flex justify-center gap-1 text-amber-400">
              <Star size={20} fill="currentColor" />
              <Star size={20} fill="currentColor" />
              <Star size={20} fill="currentColor" />
              <Star size={20} fill="currentColor" />
              <Star size={20} fill="currentColor" />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard
              name="أحمد علي"
              role="متجر ذهب"
              text="استخدمت النظام لمدة شهر والنتائج كانت مذهلة! زادت مبيعاتنا بنسبة 40% بفضل الرد السريع والذكي على استفسارات العملاء."
            />
            <TestimonialCard
              name="إيمان محمود"
              role="خبيرة تجميل"
              text="وفر عليّ ساعات طويلة من الرد المردد على الأسئلة الشائعة. الآن أتفرغ لعملي الحقيقي والبوت يتولى الباقي بذكاء."
            />
            <TestimonialCard
              name="ياسر القحطاني"
              role="صاحب وكالة تسويق"
              text="أفضل ميزة هي فهمه للهجات الخليجية. العملاء لا يشعرون أنهم يتحدثون مع بوت أبداً، الردود طبيعية جداً."
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="max-w-7xl mx-auto px-6 py-32 relative">
        <div className="text-center mb-20 relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">{t('choose_plan')}</h2>
          <p className="text-slate-500 font-bold max-w-xl mx-auto">{t('choose_plan_desc')}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative z-10">
          {plans.map((plan, i) => (
            <div key={i} className={`p-12 rounded-[3rem] border transition duration-500 group flex flex-col ${plan.popular ? 'bg-white text-slate-900 border-blue-100 shadow-[0_32px_64px_-16px_rgba(30,41,59,0.1)] scale-105 z-10' : 'bg-transparent border-slate-200 hover:border-slate-400'}`}>
              {plan.popular && (
                <div className="mb-6 inline-flex bg-blue-100 text-blue-600 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest self-start">{t('most_popular')}</div>
              )}
              <h3 className="text-2xl font-bold mb-2 tracking-tight">{t(plan.name) || plan.name}</h3>
              <div className="flex items-baseline gap-2 mb-10">
                <span className="text-5xl font-bold tracking-tight">${plan.price}</span>
                <span className={`text-sm font-bold uppercase tracking-widest ${plan.popular ? 'text-slate-400' : 'text-slate-500'}`}>/{t('month')}</span>
              </div>

              <div className="space-y-4 mb-12 flex-1">
                {plan.features.map((feature: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle size={20} className={plan.popular ? 'text-emerald-500' : 'text-blue-500'} />
                    <span className={`text-sm font-bold ${plan.popular ? 'text-slate-600' : 'text-slate-500'}`}>{t(feature) || feature}</span>
                  </div>
                ))}
              </div>

              <Link
                to="/register"
                className={`w-full py-5 rounded-[2rem] font-bold text-center transition ${plan.popular ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20 hover:bg-blue-700' : 'bg-slate-900 text-white shadow-xl hover:bg-black'}`}
              >
                {t('subscribe_now')}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="bg-white py-32 border-t border-slate-100 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-xl shadow-blue-500/5">
              <HelpCircle size={40} />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">{t('faq')}</h2>
            <p className="text-slate-500 font-bold">كل ما تريد معرفته عن نظامنا المتطور</p>
          </div>

          <div className="space-y-4">
            <FAQItem question={t('trial_question')} answer={t('trial_answer')} />
            <FAQItem question="كيف يعمل الذكاء الاصطناعي مع اللهجات؟" answer="نظامنا مبني على نماذج متطورة جداً تفهم السياق واللهجة المحلية بدقة، وترد بالأسلوب الذي يفضله عملاؤك سواء فصحى أو عامية." />
            <FAQItem question="هل يمكنني إلغاء اشتراكي في أي وقت؟" answer="نعم، نوفر لك التحكم الكامل في اشتراكك. يمكنك الإلغاء أو الترقية بسهولة من لوحة تحكم حسابك." />
            <FAQItem question="هل بياناتي وبيانات عملائي آمنة؟" answer="نحن نتبع أعلى معايير الأمان والتشفير. بياناتك لا تستخدم لتدريب النماذج العامة، وهي ملك لك بالكامل." />
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="max-w-7xl mx-auto px-6 py-32 border-t border-slate-100">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">نحن هنا لمساعدتك</h2>
            <p className="text-lg text-slate-500 font-medium mb-10 leading-relaxed">
              لديك استفسار؟ فريقنا التقني جاهز للرد على جميع تساؤلاتك حول أتمتة الردود والذكاء الاصطناعي على مدار الساعة.
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/5">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">راسلنا على</p>
                  <p className="text-lg font-bold text-slate-900">support@autoreply.pro</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/5">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">تحدث معنا</p>
                  <p className="text-lg font-bold text-slate-900">+966 500 000 000</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white p-10 rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(30,41,59,0.05)] border border-slate-100">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">الاسم</label>
                <input type="text" placeholder="أدخل اسمك" className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none ring-1 ring-slate-100 focus:ring-2 focus:ring-blue-500 transition" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">البريد الإلكتروني</label>
                <input type="email" placeholder="example@mail.com" className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none ring-1 ring-slate-100 focus:ring-2 focus:ring-blue-500 transition text-left" />
              </div>
            </div>
            <div className="space-y-2 mb-8">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">الرسالة</label>
              <textarea placeholder="كيف يمكننا مساعدتك؟" rows={4} className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none ring-1 ring-slate-100 focus:ring-2 focus:ring-blue-500 transition resize-none"></textarea>
            </div>
            <button className="w-full py-5 bg-slate-900 text-white rounded-2xl font-bold hover:bg-black transition-all shadow-xl shadow-slate-900/10">
              إرسال الرسالة
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
          {/* Logo & Name */}
          <div className="flex flex-col items-center gap-3 mb-8">
            <div className="bg-white text-black p-3.5 rounded-2xl shadow-xl transition-transform hover:scale-110 duration-500">
              <span className="font-black text-2xl leading-none">AR</span>
            </div>
            <div>
              <h4 className="text-2xl font-bold text-white tracking-tight">{t('app_name')}</h4>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.4em] mt-1">{t('slogan')}</p>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="flex gap-4 mb-8">
            <FooterSocialIcon icon={Facebook} />
            <FooterSocialIcon icon={Instagram} />
            <FooterSocialIcon icon={Twitter} />
            <FooterSocialIcon icon={Github} />
          </div>

          {/* Contact Info */}
          <div className="flex flex-wrap justify-center gap-6 mb-10 px-4">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition duration-300">
              <Mail size={16} className="text-white" />
              <span>support@autoreply.pro</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition duration-300">
              <Phone size={16} className="text-white" />
              <span>+966 500 000 000</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition duration-300">
              <Globe size={16} className="text-white" />
              <span>Riyadh, Saudi Arabia</span>
            </div>
          </div>

          {/* Copyright & Links */}
          <div className="pt-8 border-t border-white/10 w-full flex flex-col items-center gap-4">
            <p className="text-[9px] font-bold text-slate-600 uppercase tracking-[0.5em]">
              © 2026 {t('app_name')}. All rights reserved.
            </p>
            <div className="flex gap-8">
              <a href="#" className="text-[9px] font-bold text-slate-500 uppercase tracking-widest hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-[9px] font-bold text-slate-500 uppercase tracking-widest hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, desc, color }: any) => (
  <div className="p-10 rounded-[3rem] bg-white border border-slate-100 hover:border-blue-200 hover:shadow-[0_32px_64px_-16px_rgba(30,41,59,0.05)] transition duration-700 group">
    <div className={`w-16 h-16 rounded-2xl ${color} flex items-center justify-center text-white shadow-xl mb-8 group-hover:scale-110 transition duration-700`}>
      <Icon size={32} />
    </div>
    <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">{title}</h3>
    <p className="text-slate-500 leading-relaxed font-bold text-sm">
      {desc}
    </p>
  </div>
);

const TestimonialCard = ({ name, role, text }: { name: string, role: string, text: string }) => (
  <div className="p-10 rounded-[3rem] bg-slate-800 border border-slate-700 text-white relative group hover:bg-slate-700 transition duration-500">
    <Quote className="absolute top-6 right-6 text-slate-600 opacity-20" size={48} />
    <div className="flex gap-1 text-amber-400 mb-6 group-hover:scale-105 transition duration-500">
      <Star size={14} fill="currentColor" />
      <Star size={14} fill="currentColor" />
      <Star size={14} fill="currentColor" />
      <Star size={14} fill="currentColor" />
      <Star size={14} fill="currentColor" />
    </div>
    <p className="text-lg font-bold text-slate-200 leading-relaxed mb-8 italic">"{text}"</p>
    <div>
      <p className="font-bold text-white text-sm">{name}</p>
      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">{role}</p>
    </div>
  </div>
);

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`rounded-[2rem] border transition-all duration-500 ${isOpen ? 'bg-slate-50 border-blue-200 shadow-xl shadow-blue-500/5' : 'bg-white border-slate-100 overflow-hidden'}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-8 text-right flex justify-between items-center bg-transparent transition"
      >
        <span className="font-bold text-slate-900 text-lg">{question}</span>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${isOpen ? 'bg-blue-600 text-white rotate-45' : 'bg-slate-100 text-slate-400'}`}>
          <Plus size={24} />
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-500 ${isOpen ? 'max-h-60 p-8 pt-0' : 'max-h-0'}`}>
        <p className="text-sm font-bold text-slate-500 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};

const SocialIcon = ({ icon: Icon }: any) => (
  <a href="#" className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-slate-500 hover:bg-white hover:text-slate-900 transition shadow-sm border border-white/5">
    <Icon size={20} />
  </a>
);

const FooterSocialIcon = ({ icon: Icon }: any) => (
  <a href="#" className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all duration-300 border border-white/10 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20 group">
    <Icon size={24} className="group-hover:scale-110 transition-transform" />
  </a>
);

const MobileNavLink = ({ label, onClick }: { label: string, onClick: () => void }) => (
  <button
    onClick={onClick}
    className="w-full text-right text-lg font-bold text-slate-600 hover:text-slate-900 transition-colors py-2 border-b border-slate-50 flex items-center justify-between group"
  >
    {label}
    <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 transition-all ltr:rotate-0 rtl:rotate-180" />
  </button>
);

export default LandingPage;
