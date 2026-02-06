
import { GoogleGenAI } from "@google/genai";

// Fix: Use a named parameter for apiKey and strictly rely on process.env.API_KEY as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateSmartReply = async (content: string, context: string = 'customer service'): Promise<string> => {
  try {
    // Fix: Call generateContent directly through ai.models.generateContent
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `
        You are a professional social media manager for a Facebook page. 
        Context: ${context}
        User Comment/Message: "${content}"
        
        Task: Write a friendly, helpful, and brief reply in Arabic. 
        If it's an inquiry about price, ask them to check their private messages or provide a general helpful response.
        If it's a compliment, thank them warmly.
        Keep it natural and human-like. Avoid being robotic.
      `,
      config: {
        temperature: 0.7,
        topP: 0.8,
        // Fix: Removed maxOutputTokens to avoid potential response blockage or truncation issues as per recommendations
      }
    });

    // Fix: Access the .text property directly (not a method call)
    return response.text?.trim() || "شكراً لتواصلك معنا، سنقوم بالرد عليك في أقرب وقت.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "أهلاً بك! تم استلام استفسارك وسنقوم بالرد قريباً.";
  }
};
