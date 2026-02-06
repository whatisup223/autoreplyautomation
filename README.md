# AutoReply Automation SaaS 🚀

منصة أتمتة الردود الذكية على فيسبوك وإنستجرام باستخدام الذكاء الاصطناعي (Gemini AI).
تتيح المنصة للمستخدمين ربط صفحاتهم، تفعيل الرد الآلي على التعليقات والرسائل، وتدريب الذكاء الاصطناعي على بياناتهم الخاصة.

## 🛠️ التقنيات المستخدمة (Tech Stack)

- **Frontend:** React, TypeScript, Tailwind CSS, Vite
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **AI:** Google Gemini Pro API
- **Integration:** Facebook Graph API & Webhooks

---

## 🚀 دليل التشغيل (Getting Started)

### 1. المتطلبات المسبقة (Prerequisites)
- تثبيت [Node.js](https://nodejs.org/) (الإصدار 18 أو أحدث).
- تثبيت [MongoDB](https://www.mongodb.com/try/download/community) وتشغيله محلياً، أو استخدام [MongoDB Atlas](https://www.mongodb.com/atlas).

### 2. إعداد الخادم (Backend Setup)

انتقل إلى مجلد الخادم وقم بتثبيت المكتبات:

```bash
cd server
npm install
```

قم بإنشاء ملف `.env` داخل مجلد `server` وأضف الإعدادات التالية (تم إنشاؤه تلقائياً، تأكد من القيم):

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/autoreply
FB_VERIFY_TOKEN=AUTOREPLY_SECURE_TOKEN_2025
FB_PAGE_ACCESS_TOKEN=YOUR_FB_PAGE_ACCESS_TOKEN
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

تشغيل الخادم:

```bash
node index.js
# أو في وضع التطوير
npm run dev
```

عند النجاح، ستظهر رسالة: `🚀 Server running on port 5000`

### 3. إعداد الواجهة الأمامية (Frontend Setup)

في نافذة ترمينال جديدة، انتقل للمجلد الرئيسي:

```bash
cd ..
npm install
npm run dev
```

سيتم تشغيل الواجهة على الرابط: `http://localhost:5173`

---

## 🌐 إعداد الربط مع فيسبوك (Facebook Setup)

لكي يعمل الرد التلقائي، يجب ربط التطبيق بـ Facebook Developers.

1.  **إنشاء تطبيق:** اذهب إلى [Facebook Developers](https://developers.facebook.com/) وأنشئ تطبيقاً من نوع **Business**.
2.  **إعداد Webhook:**
    *   في إعدادات التطبيق، أضف منتج **Webhooks**.
    *   اختر **Page** ثم اشترك في أحداث: `feed` (للتعليقات) و `messages` (للرسائل).
3.  **رابط الاستدعاء (Callback URL):**
    *   فيسبوك لا يقبل `localhost`. استخدم خدمة **Ngrok** لإنشاء رابط آمن:
    ```bash
    ngrok http 5000
    ```
    *   انسخ رابط HTTPS الناتج (مثل `https://xxxx.ngrok-free.app`).
    *   في إعدادات الويب هوك في فيسبوك، ضع الرابط: `https://xxxx.ngrok-free.app/api/webhook`
    *   ضع رمز التحقق (Verify Token) الموجود في ملف `.env`: `AUTOREPLY_SECURE_TOKEN_2025`

4.  **توليد Access Token:**
    *   من الـ Graph API Explorer، احصل على `User Access Token` بصلاحيات `pages_manage_metadata`, `pages_messaging`, `pages_read_engagement`.
    *   استخدم هذا التوكن في صفحة "الصفحات المتصلة" في التطبيق لجلب صفحاتك.

---

## 🤖 إعداد الذكاء الاصطناعي (AI Setup)

1.  احصل على مفتاح API من [Google AI Studio](https://makersuite.google.com/app/apikey).
2.  ضعه في ملف `.env` للمتغير `GEMINI_API_KEY`.
3.  سيقوم النظام الآن باستخدام Gemini للرد على التعليقات الواردة بذكاء.

---

## 📁 هيكلية المشروع

```
/
├── components/       # واجهة المستخدم (React Components)
├── server/          # الخادم (Backend)
│   ├── models/      # نماذج قاعدة البيانات (User, Page, Log)
│   ├── routes/      # مسارات API (Webhook, Knowledge)
│   ├── services/    # منطق العمل (Facebook Service, Gemini Service)
│   └── index.js     # نقطة انطلاق الخادم
├── src/             # ملفات الواجهة الأساسية (App, main, translations)
└── README.md        # دليل الاستخدام
```

تم التطوير بواسطة **Antigravity Agent**. 🚀
