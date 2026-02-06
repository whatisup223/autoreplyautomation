import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowRight, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../../components/LanguageSwitcher';

const ForgotPassword: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            // In a real app, you wouldn't alert before redirecting usually, but for demo feedback:
            alert('تم إرسال رابط الاستعادة! جاري توجيهك...');
            navigate('/dashboard');
        }, 1500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 overflow-hidden relative">
            <div className="absolute top-6 right-6 z-50">
                <LanguageSwitcher />
            </div>

            <div className="fixed top-[20%] right-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] -z-10"></div>

            <div className="max-w-md w-full glass-card rounded-[3rem] p-12 shadow-2xl">
                <div className="text-center mb-10">
                    <Link to="/" className="inline-block text-2xl font-bold text-slate-800 tracking-tight mb-6">{t('app_name')}</Link>
                    <h2 className="text-3xl font-bold text-slate-800">{t('reset_password_title')}</h2>
                    <p className="text-slate-500 font-semibold mt-2">{t('reset_desc')}</p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">{t('email')}</label>
                        <div className="relative">
                            <Mail className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <input
                                type="email"
                                placeholder="you@example.com"
                                className="w-full pr-14 pl-6 py-4 glass rounded-[1.5rem] focus:ring-2 focus:ring-blue-500 outline-none transition font-medium"
                                required
                            />
                        </div>
                    </div>

                    <button disabled={loading} className="w-full bg-slate-900 text-white py-5 rounded-[1.5rem] font-bold text-lg hover:bg-black shadow-xl transition flex items-center justify-center gap-3 group active:scale-95">
                        {loading ? <Loader2 className="animate-spin" /> : <>{t('send_reset_link')} <ArrowRight size={20} className="group-hover:translate-x-[-4px] transition rtl:rotate-180" /></>}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <Link to="/login" className="text-sm font-bold text-slate-500 hover:text-blue-600 transition">{t('back_to_login')}</Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
