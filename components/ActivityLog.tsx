
import React from 'react';
import { CheckCircle, XCircle, Clock, User, MessageCircle, ArrowLeftRight } from 'lucide-react';

const ActivityLog: React.FC = () => {
  const logs = [
    { id: '1', page: 'متجر الأناقة', user: 'محمد علي', action: 'رد تلقائي + لايك', content: 'بكام الفستان ده؟', reply: 'تم إرسال التفاصيل خاص يا فندم!', status: 'success', time: 'منذ دقيقتين' },
    { id: '2', page: 'مطعم السعادة', user: 'سارة أحمد', action: 'إخفاء تعليق ضار', content: 'المطعم ده سيء جداً لا تجربوه', reply: 'N/A', status: 'success', time: 'منذ 15 دقيقة' },
    { id: '3', page: 'متجر الأناقة', user: 'خالد حسن', action: 'رد ذكي (Gemini)', content: 'عندكم مقاس XL؟', reply: 'نعم متوفر بـ 3 ألوان مختلفة...', status: 'success', time: 'منذ ساعة' },
    { id: '4', page: 'صفحة العقارات', user: 'إبراهيم', action: 'فشل في الرد', content: 'ممكن العنوان؟', reply: 'Error: Token Expired', status: 'failed', time: 'منذ ساعتين' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">سجل النشاط</h2>
        <button className="text-sm text-blue-600 font-bold hover:underline">تحميل التقرير (CSV)</button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-right">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-sm font-bold text-gray-600">الصفحة / العميل</th>
              <th className="px-6 py-4 text-sm font-bold text-gray-600">الإجراء</th>
              <th className="px-6 py-4 text-sm font-bold text-gray-600">المحتوى</th>
              <th className="px-6 py-4 text-sm font-bold text-gray-600">الحالة</th>
              <th className="px-6 py-4 text-sm font-bold text-gray-600">الوقت</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-gray-50/50 transition">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                      <User size={14} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800">{log.user}</p>
                      <p className="text-[10px] text-gray-400">{log.page}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs font-medium text-gray-600">{log.action}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="max-w-xs">
                    <p className="text-xs text-gray-700 truncate">💬 {log.content}</p>
                    {log.reply !== 'N/A' && <p className="text-[10px] text-green-600 mt-1 truncate">↪️ {log.reply}</p>}
                  </div>
                </td>
                <td className="px-6 py-4">
                  {log.status === 'success' ? (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-bold">
                      <CheckCircle size={10} /> ناجح
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-50 text-red-600 rounded-full text-[10px] font-bold">
                      <XCircle size={10} /> فشل
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span className="text-[10px] text-gray-400 flex items-center gap-1">
                    <Clock size={10} /> {log.time}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActivityLog;
