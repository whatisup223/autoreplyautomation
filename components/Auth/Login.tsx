
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Facebook, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const handleLogin = (e: React.FormEvent) => {
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
      <div className="fixed top-[20%] right-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] -z-10"></div>
      <div className="fixed bottom-[10%] left-[-10%] w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-md w-full glass-card rounded-[3rem] p-12 shadow-2xl relative">
        <div className="text-center mb-12">
          <Link to="/landing" className="inline-flex items-center gap-3 mb-8 group">
            <div className="bg-blue-600 text-white p-2.5 rounded-2xl font-bold shadow-lg shadow-blue-500/20 group-hover:scale-110 transition">AR</div>
            <span className="text-2xl font-bold text-slate-800 tracking-tight">أوتو ريبلاي</span>
          </Link>
          <h2 className="text-3xl font-bold text-slate-800">أهلاً بك مجدداً</h2>
          <p className="text-slate-500 font-semibold mt-2">سجل دخولك لبدء أتمتة صفحاتك.</p>
        </div>

        <form className="space-y-6" onSubmit={handleLogin}>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">البريد الإلكتروني</label>
            <div className="relative">
              <Mail className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="email" 
                placeholder="admin@example.com" 
                className="w-full pr-14 pl-6 py-4 glass rounded-[1.5rem] focus:ring-2 focus:ring-blue-500 outline-none transition font-medium" 
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between px-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">كلمة المرور</label>
              <Link to="/forgot-password" text-blue-600 className="text-xs font-bold text-blue-600 hover:underline">نسيتها؟</Link>
            </div>
            <div className="relative">
              <Lock className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full pr-14 pl-6 py-4 glass rounded-[1.5rem] focus:ring-2 focus:ring-blue-500 outline-none transition font-medium" 
                required
              />
            </div>
          </div>

          <button disabled={loading} className="w-full bg-slate-900 text-white py-5 rounded-[1.5rem] font-bold text-lg hover:bg-black shadow-xl transition flex items-center justify-center gap-3 group active:scale-95">
            {loading ? <Loader2 className="animate-spin" /> : <>دخول للمنصة <ArrowRight size={20} className="group-hover:translate-x-[-4px] transition" /></>}
          </button>
        </form>

        <div className="mt-12 text-center">
          <p className="text-sm text-slate-500 font-bold">ليس لديك حساب؟ <Link to="/register" className="text-blue-600 hover:underline">أنشئ حسابك الآن</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
