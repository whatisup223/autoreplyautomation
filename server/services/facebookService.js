const axios = require('axios');
const geminiService = require('./geminiService');

// --- FB Graph API Base ---
const API_URL = 'https://graph.facebook.com/v19.0';
const PAGE_ACCESS_TOKEN = process.env.FB_PAGE_ACCESS_TOKEN || ''; // In real app, fetch from DB based on pageId

// --- Handle New Comment ---
async function handleNewComment(pageId, commentData) {
    const commentId = commentData.comment_id;
    const parentId = commentData.parent_id;
    const senderId = commentData.from.id;
    const message = commentData.message;

    // لا ترد على ردودك الخاصة
    if (senderId === pageId) return;

    // 1. توليد الرد باستخدام Gemini AI
    const replyText = await geminiService.generateReply(message);

    // 2. إرسال الرد كتعليق
    try {
        await axios.post(`${API_URL}/${commentId}/comments`, {
            message: replyText,
            access_token: PAGE_ACCESS_TOKEN
        });
        console.log(`✅ Replied to comment ${commentId}: ${replyText}`);

        // 3. (اختياري) إرسال رسالة خاصة
        // await sendPrivateMessage(commentId, "مرحباً، تم الرد عليك!");

    } catch (error) {
        console.error('❌ Error replying to comment:', error.response ? error.response.data : error.message);
    }
}

// --- Send Reply ---
async function sendReply(commentId, replyText) {
    try {
        await axios.post(`${API_URL}/${commentId}/comments`, {
            message: replyText,
            access_token: PAGE_ACCESS_TOKEN
        });
        console.log(`Replied: ${replyText}`);
    } catch (error) {
        console.error('FB Reply Error:', error.message);
    }
}

module.exports = {
    handleNewComment,
    sendReply
};
