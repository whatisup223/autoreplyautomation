
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      navigate('/');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 overflow-hidden relative">
      {/* Background Orbs */}
      <div className="fixed top-[10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] -z-10"></div>
      <div className="fixed bottom-[20%] right-[-10%] w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-md w-full glass-card rounded-[3rem] p-12 shadow-2xl relative">
        <div className="text-center mb-10">
          <Link to="/landing" className="inline-flex items-center gap-3 mb-8 group">
            <div className="bg-blue-600 text-white p-2.5 rounded-2xl font-bold shadow-lg shadow-blue-500/20 group-hover:scale-110 transition duration-500">AR</div>
            <span className="text-2xl font-bold text-slate-800 tracking-tight">أوتو ريبلاي</span>
          </Link>
          <h2 className="text-3xl font-bold text-slate-800">ابدأ أتمتة صفحاتك</h2>
          <p className="text-slate-500 font-bold mt-2">انضم لمئات المحترفين الذين يوفرون وقتهم.</p>
        </div>

        <form className="space-y-6" onSubmit={handleRegister}>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">الاسم بالكامل</label>
            <div className="relative">
              <User className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="text" 
                placeholder="أدخل اسمك" 
                className="w-full pr-14 pl-6 py-4 glass-input rounded-[1.5rem] outline-none transition font-bold text-slate-800" 
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">البريد الإلكتروني</label>
            <div className="relative">
              <Mail className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="email" 
                placeholder="name@example.com" 
                className="w-full pr-14 pl-6 py-4 glass-input rounded-[1.5rem] outline-none transition font-bold text-slate-800" 
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">كلمة المرور</label>
            <div className="relative">
              <Lock className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full pr-14 pl-6 py-4 glass-input rounded-[1.5rem] outline-none transition font-bold text-slate-800" 
                required
              />
            </div>
          </div>

          <button disabled={loading} className="w-full btn-primary py-5 rounded-[1.5rem] font-bold text-lg shadow-xl transition flex items-center justify-center gap-3 group active:scale-95">
            {loading ? <Loader2 className="animate-spin" /> : <>إنشاء حساب مجاني <ArrowRight size={20} className="group-hover:translate-x-[-4px] transition" /></>}
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-sm text-slate-500 font-bold">لديك حساب بالفعل؟ <Link to="/login" className="text-blue-600 hover:underline">تسجيل الدخول</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
