
const FB_GRAPH_URL = 'https://graph.facebook.com/v21.0';

/**
 * جلب صفحات المستخدم
 */
export const fetchUserPages = async (userAccessToken: string) => {
  try {
    const response = await fetch(`${FB_GRAPH_URL}/me/accounts?fields=name,access_token,category,picture,id&access_token=${userAccessToken}`);
    const data = await response.json();
    if (data.error) throw new Error(data.error.message);
    return data.data;
  } catch (error) {
    console.error("FB Fetch Error:", error);
    throw error;
  }
};

/**
 * تفعيل الويب هوك للصفحة (Subscribe App to Page)
 * هذه هي الخطوة التي تجعل فيسبوك يرسل الإشعارات لعنوان الويب هوك الخاص بك
 */
export const subscribePageToWebhook = async (pageId: string, pageAccessToken: string) => {
  try {
    const response = await fetch(`${FB_GRAPH_URL}/${pageId}/subscribed_apps`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        subscribed_fields: ['feed', 'messages', 'mention', 'ratings'],
        access_token: pageAccessToken 
      })
    });
    const result = await response.json();
    if (result.error) throw new Error(result.error.message);
    return result.success; // true
  } catch (error) {
    console.error("Subscription Error:", error);
    throw error;
  }
};

/**
 * الرد على تعليق مع دعم المنشن
 */
export const replyToComment = async (commentId: string, message: string, pageAccessToken: string, customerId?: string) => {
  try {
    const finalMessage = customerId ? `@[${customerId}] ${message}` : message;
    const response = await fetch(`${FB_GRAPH_URL}/${commentId}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: finalMessage, access_token: pageAccessToken })
    });
    return await response.json();
  } catch (error) {
    console.error("Reply Error:", error);
  }
};

export const likeComment = async (commentId: string, pageAccessToken: string) => {
  try {
    await fetch(`${FB_GRAPH_URL}/${commentId}/likes`, {
      method: 'POST',
      body: new URLSearchParams({ access_token: pageAccessToken })
    });
  } catch (error) {
    console.error("Like Error:", error);
  }
};

export const hideComment = async (commentId: string, pageAccessToken: string) => {
  try {
    await fetch(`${FB_GRAPH_URL}/${commentId}`, {
      method: 'POST',
      body: new URLSearchParams({ is_hidden: 'true', access_token: pageAccessToken })
    });
  } catch (error) {
    console.error("Hide Error:", error);
  }
};
