const { GoogleGenerativeAI } = require("@google/generative-ai");

// --- Initialize Gemini ---
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

async function generateReply(userMessage) {
    try {
        // يمكننا هنا إضافة سياق مسبق (Context) من قاعدة المعرفة
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `
        أنت مساعد ذكي لخدمة العملاء على فيسبوك.
        الرسالة الواردة من العميل: "${userMessage}"
        
        أجب باحترافية، وود، واختصار. استخدم اللهجة المصرية البسيطة إذا كانت الرسالة عامية.
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return text;
    } catch (error) {
        console.error('Gemini API Error:', error);
        return "شكراً لتواصلك معنا! سنرد عليك قريباً."; // Fallback reply
    }
}

module.exports = {
    generateReply
};
