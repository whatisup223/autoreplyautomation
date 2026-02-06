
import { GoogleGenAI } from "@google/genai";
import { dbService } from "./dbService";

const getClient = () => {
  const apiKey = process.env.API_KEY || localStorage.getItem('gemini_api_key');
  if (!apiKey) {
    console.warn("Gemini API Key is missing.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

/**
 * Analyzes message sentiment and intent
 */
export const analyzeMessage = async (content: string) => {
  const ai = getClient();
  if (!ai) return { sentiment: 'neutral', intent: 'unknown', urgency: 'medium' };

  try {
    const model = ai.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Analyze this customer message: "${content}". 
        Return a JSON object with:
        1. "sentiment": "positive", "negative", or "neutral"
        2. "intent": a short label (e.g., "pricing", "complaint", "feedback", "greeting")
        3. "urgency": "low", "medium", or "high"
        JSON ONLY.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return JSON.parse(text);
  } catch (error) {
    console.error("AI Analysis failed:", error);
    return { sentiment: 'neutral', intent: 'unknown', urgency: 'medium' };
  }
};

export const generateSmartReply = async (content: string, context: string = 'customer service'): Promise<string> => {
  try {
    const crisisSettings = dbService.getCrisisSettings();
    const analysis = await analyzeMessage(content);

    // IF Crisis Mode is enabled AND Sentiment is Negative -> Stop Bot & Use Custom Message
    if (crisisSettings.enabled && analysis.sentiment === 'negative') {
      console.log("Negative sentiment detected. Stopping bot and sending crisis message.");

      // Log the email notification simulation
      dbService.addLog({
        type: 'system_alert',
        content: `Sent crisis email to ${crisisSettings.notifyEmail} regarding user: ${content}`,
        status: 'success',
        sentiment: 'negative',
        intent: 'crisis_alert'
      });

      return crisisSettings.customMessage;
    }

    const ai = getClient();
    if (!ai) return "Thanks for your message! Our team will get back to you soon.";

    const model = ai.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `
      System: You are an AI assistant for a business. Context: ${context}.
      Customer said: "${content}"
      
      Requirements:
      1. Be professional and helpful.
      2. If you don't know the answer, say you'll check with a human.
      3. Keep it brief.
      4. Support Arabic and English naturally.
      
      Reply:
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini Error:", error);
    return "We've received your message and are processing it. Thank you!";
  }
};
