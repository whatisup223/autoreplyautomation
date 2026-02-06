
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, Zap, Shield, MessageSquare, CheckCircle, 
  ArrowLeft, Facebook, Star, Users, Play, Globe, 
  ChevronDown, Mail, Phone, MapPin, Send, Facebook as FbIcon, 
  Twitter, Instagram, Linkedin, HelpCircle
} from 'lucide-react';

const LandingPage: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    { q: "هل أحتاج إلى خبرة برمجية لاستخدام النظام؟", a: "على الإطلاق! تم تصميم أوتو ريبلاي ليكون بسيطاً جداً. كل ما عليك هو ربط صفحتك وتحديد الردود التي تريدها." },
    { q: "كيف يحميني النظام من سرقة العملاء؟", a: "يقوم النظام فوراً بإخفاء أي تعليق يحتوي على أرقام هواتف أو روابط، مما يمنع المنافسين من التواصل مع عملائك." },
    { q: "هل يدعم النظام الرد بالعامية المصرية أو الخليجية؟", a: "نعم، بفضل تقنيات Gemini AI، يستطيع النظام فهم كافة اللهجات العربية والرد بنفس الأسلوب بشكل طبيعي جداً." },
    { q: "هل يمكنني إلغاء اشتراكي في أي وقت؟", a: "نعم، اشتراكنا شهري ويمكنك الإلغاء في أي لحظة من لوحة التحكم دون أي قيود." }
  ];

  return (
    <div className="min-h-screen selection:bg-blue-100 selection:text-blue-600 bg-[#f8fafc]">
      {/* Background Orbs */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/10 rounded-full blur-[120px] -z-10"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-400/10 rounded-full blur-[120px] -z-10"></div>

      {/* Navigation */}
      <nav className="sticky top-6 z-50 px-6 mx-auto max-w-7xl">
        <div className="glass px-8 py-4 rounded-[2rem] flex items-center justify-between shadow-lg shadow-blue-500/5">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 text-white p-2 rounded-xl font-bold shadow-lg shadow-blue-500/20">AR</div>
            <span className="text-xl font-bold text-slate-900">أوتو ريبلاي برو</span>
          </div>
          <div className="hidden lg:flex items-center gap-10 text-sm font-bold text-slate-500">
            <a href="#features" className="hover:text-blue-600 transition">المميزات</a>
            <a href="#pricing" className="hover:text-blue-600 transition">الأسعار</a>
            <a href="#faq" className="hover:text-blue-600 transition">الأسئلة الشائعة</a>
            <a href="#contact" className="hover:text-blue-600 transition">اتصل بنا</a>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition">دخول</Link>
            <Link to="/register" className="bg-blue-600 text-white px-6 py-2.5 rounded-2xl font-bold text-sm shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition active:scale-95">ابدأ مجاناً</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-32 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-xs font-bold text-blue-600 mb-10 animate-pulse">
            <Sparkles size={14} /> أتمتة ذكية مدعومة بـ Gemini AI 2.5
          </div>
          <h1 className="text-5xl md:text-8xl font-bold leading-[1.1] text-slate-900 mb-8 max-w-5xl tracking-tight">
            ضاعف مبيعاتك وأتمت <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">تفاعلات عملائك بذكاء</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl leading-relaxed mb-12 font-medium">
            توقف عن الرد اليدوي! دع الذكاء الاصطناعي يتولى الرد على التعليقات والرسائل، إخفاء المنافسين، وزيادة التفاعل على مدار الساعة.
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <Link to="/register" className="bg-slate-900 text-white px-10 py-5 rounded-[2.5rem] font-bold text-lg shadow-2xl hover:bg-black transition flex items-center gap-3">
              ابدأ تجربتك المجانية <ArrowLeft size={20} />
            </Link>
            <a href="#pricing" className="glass px-10 py-5 rounded-[2.5rem] font-bold text-lg text-slate-700 flex items-center gap-3 hover:bg-white transition">
               عرض خطط الأسعار
            </a>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="max-w-7xl mx-auto px-6 mb-24">
        <div className="glass-card rounded-[3rem] p-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatItem label="رد مؤتمت يومياً" value="+50K" />
          <StatItem label="عميل نشط" value="+2,500" />
          <StatItem label="توفير في الوقت" value="90%" />
          <StatItem label="دقة الردود" value="99.9%" />
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold text-slate-900 tracking-tight">كل ما تحتاجه للسيطرة على صفحاتك</h2>
            <p className="text-slate-500 max-w-xl mx-auto font-medium">نظام متكامل يجمع بين قوة الذكاء الاصطناعي وسهولة الاستخدام المطلقة.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={MessageSquare} 
              title="ردود ذكية وعميقة" 
              desc="الذكاء الاصطناعي لا يكتفي بالرد، بل يفهم سياق السؤال ويقدم معلومات دقيقة حول منتجاتك وكأنك أنت من يجيب."
              color="blue"
            />
            <FeatureCard 
              icon={Shield} 
              title="نظام الحماية القصوى" 
              desc="إخفاء تلقائي وفوري للتعليقات المسيئة أو التي تحتوي على أرقام هواتف المنافسين لحماية عملائك."
              color="purple"
            />
            <FeatureCard 
              icon={Zap} 
              title="أتمتة الرسائل الخاصة" 
              desc="بمجرد تعليق العميل، يقوم النظام بإرسال تفاصيل المنتج أو السعر في رسالة خاصة لزيادة فرص البيع."
              color="orange"
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">خطط تناسب طموحاتك</h2>
            <p className="text-slate-500 font-medium">اختر الخطة التي تناسب حجم أعمالك، ابدأ مجاناً وقم بالترقية لاحقاً.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <PriceCard 
              title="الأساسية" 
              price="19" 
              features={["ربط 3 صفحات", "500 رد تلقائي/شهر", "دعم الكلمات المفتاحية", "إحصائيات بسيطة"]} 
            />
            <PriceCard 
              title="الاحترافية" 
              price="49" 
              featured={true}
              features={["ربط 10 صفحات", "ردود AI غير محدودة", "إخفاء المنافسين", "أتمتة الرسائل الخاصة", "دعم فني سريع"]} 
            />
            <PriceCard 
              title="الوكالات" 
              price="99" 
              features={["ربط صفحات غير محدود", "كل مميزات الاحترافية", "نظام White Label", "تقارير متقدمة للموكلين"]} 
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-slate-50/50">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4 flex items-center justify-center gap-3">
              <HelpCircle className="text-blue-600" /> الأسئلة الشائعة
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="glass-card rounded-2xl overflow-hidden transition-all">
                <button 
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full p-6 flex items-center justify-between text-right font-bold text-slate-800 hover:bg-white/50 transition"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`transition-transform duration-300 ${activeFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {activeFaq === idx && (
                  <div className="px-6 pb-6 text-slate-500 font-medium text-sm leading-relaxed animate-in fade-in slide-in-from-top-2">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-slate-900 tracking-tight">لديك استفسار؟ <br /><span className="text-blue-600">نحن هنا للمساعدة</span></h2>
            <p className="text-slate-500 text-lg font-medium">فريقنا متاح للرد على كافة أسئلتك التقنية والتجارية حول المنصة.</p>
            
            <div className="space-y-6">
              <ContactInfo icon={Mail} label="البريد الإلكتروني" value="support@autoreply.pro" />
              <ContactInfo icon={Phone} label="الدعم عبر واتساب" value="+20 123 456 7890" />
              <ContactInfo icon={MapPin} label="المقر الرئيسي" value="دبي، الإمارات العربية المتحدة" />
            </div>

            <div className="flex gap-4 pt-4">
              <SocialIcon icon={FbIcon} />
              <SocialIcon icon={Twitter} />
              <SocialIcon icon={Instagram} />
              <SocialIcon icon={Linkedin} />
            </div>
          </div>

          <div className="glass-card p-10 rounded-[3rem]">
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 mr-2">الاسم بالكامل</label>
                  <input type="text" placeholder="أدخل اسمك" className="w-full glass-input p-4 rounded-2xl text-sm outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 mr-2">البريد الإلكتروني</label>
                  <input type="email" placeholder="email@example.com" className="w-full glass-input p-4 rounded-2xl text-sm outline-none" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 mr-2">الموضوع</label>
                <input type="text" placeholder="كيف يمكننا مساعدتك؟" className="w-full glass-input p-4 rounded-2xl text-sm outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 mr-2">الرسالة</label>
                <textarea rows={4} placeholder="اكتب تفاصيل استفسارك هنا..." className="w-full glass-input p-4 rounded-2xl text-sm outline-none resize-none"></textarea>
              </div>
              <button className="w-full btn-primary py-5 rounded-2xl font-bold flex items-center justify-center gap-3 active:scale-95 transition">
                إرسال الرسالة الآن <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 text-white p-2 rounded-xl font-bold">AR</div>
              <span className="text-2xl font-bold tracking-tight">أوتو ريبلاي برو</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed font-medium">نظام الأتمتة الأول في الشرق الأوسط المعتمد كلياً على الذكاء الاصطناعي لإدارة صفحات فيسبوك باحترافية.</p>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-lg">روابط سريعة</h4>
            <ul className="space-y-4 text-slate-400 text-sm font-medium">
              <li><a href="#features" className="hover:text-white transition">المميزات</a></li>
              <li><a href="#pricing" className="hover:text-white transition">الأسعار</a></li>
              <li><a href="#faq" className="hover:text-white transition">الأسئلة الشائعة</a></li>
              <li><Link to="/login" className="hover:text-white transition">تسجيل الدخول</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-lg">قانوني</h4>
            <ul className="space-y-4 text-slate-400 text-sm font-medium">
              <li><a href="#" className="hover:text-white transition">سياسة الخصوصية</a></li>
              <li><a href="#" className="hover:text-white transition">شروط الخدمة</a></li>
              <li><a href="#" className="hover:text-white transition">اتفاقية مستوى الخدمة</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-lg">النشرة البريدية</h4>
            <p className="text-slate-400 text-xs mb-4">اشترك ليصلك أحدث تحديثات الذكاء الاصطناعي في التسويق.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="بريدك" className="bg-slate-800 border-none p-3 rounded-xl text-sm flex-1" />
              <button className="bg-blue-600 p-3 rounded-xl hover:bg-blue-700 transition"><Send size={18} /></button>
            </div>
          </div>
        </div>
        <div className="text-center pt-10 border-t border-slate-800 text-slate-500 text-xs font-bold">
          <p>© 2025 أوتو ريبلاي برو. جميع الحقوق محفوظة.</p>
        </div>
      </footer>
    </div>
  );
};

const StatItem = ({ label, value }: any) => (
  <div className="text-center">
    <h3 className="text-4xl font-bold text-slate-900 mb-1">{value}</h3>
    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{label}</p>
  </div>
);

const FeatureCard = ({ icon: Icon, title, desc, color }: any) => {
  const colors: any = {
    blue: 'bg-blue-600 shadow-blue-500/20',
    purple: 'bg-purple-600 shadow-purple-500/20',
    orange: 'bg-orange-500 shadow-orange-500/20'
  };
  return (
    <div className="glass-card p-10 rounded-[3rem] hover:-translate-y-2 transition duration-500 group">
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-8 shadow-xl ${colors[color]} group-hover:scale-110 transition duration-500`}>
        <Icon size={32} />
      </div>
      <h3 className="text-2xl font-bold mb-4 text-slate-900">{title}</h3>
      <p className="text-slate-500 leading-relaxed font-medium text-sm">{desc}</p>
    </div>
  );
};

const PriceCard = ({ title, price, features, featured }: any) => (
  <div className={`glass-card p-10 rounded-[3rem] relative transition duration-500 ${featured ? 'border-blue-500 scale-105 shadow-2xl z-10' : 'hover:scale-105'}`}>
    {featured && <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-6 py-1.5 rounded-full text-xs font-bold shadow-xl">الأكثر طلباً</span>}
    <h3 className="text-xl font-bold text-slate-800 mb-6">{title}</h3>
    <div className="flex items-baseline gap-1 mb-8">
      <span className="text-4xl font-bold text-slate-900">${price}</span>
      <span className="text-slate-400 text-sm font-bold">/شهرياً</span>
    </div>
    <ul className="space-y-4 mb-10">
      {features.map((f: string, idx: number) => (
        <li key={idx} className="flex items-center gap-3 text-sm font-bold text-slate-600">
          <CheckCircle size={18} className="text-emerald-500" /> {f}
        </li>
      ))}
    </ul>
    <Link to="/register" className={`w-full py-4 rounded-2xl font-bold text-center block transition ${featured ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-xl' : 'glass hover:bg-white text-slate-700'}`}>
      ابدأ الآن
    </Link>
  </div>
);

const ContactInfo = ({ icon: Icon, label, value }: any) => (
  <div className="flex items-center gap-5">
    <div className="w-12 h-12 glass rounded-xl flex items-center justify-center text-blue-600 shadow-sm">
      <Icon size={24} />
    </div>
    <div>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{label}</p>
      <p className="text-lg font-bold text-slate-800">{value}</p>
    </div>
  </div>
);

const SocialIcon = ({ icon: Icon }: any) => (
  <a href="#" className="w-10 h-10 glass rounded-lg flex items-center justify-center text-slate-500 hover:text-blue-600 hover:bg-white transition shadow-sm">
    <Icon size={20} />
  </a>
);

export default LandingPage;
