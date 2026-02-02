
import { GoogleGenAI, Modality } from "@google/genai";

const AI_CONFIG = {
  model: 'gemini-3-flash-preview',
  systemInstruction: `You are a helpful AI assistant named Baba running on a vintage Samsung Galaxy S Duos 2 (S7582). 
  The hardware is old (2013), but your brain is state-of-the-art. 
  Be concise, friendly, wise, and efficient. 
  Owner: Harsh Mishra. 
  Project: Project Baba. 
  If a child talks to you, be extra kind and tell stories.`,
};

export const generateAiResponse = async (prompt: string): Promise<string> => {
  if (!process.env.API_KEY) return "Baba needs an API key to think.";
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: AI_CONFIG.model,
      contents: prompt,
      config: { systemInstruction: AI_CONFIG.systemInstruction }
    });
    return response.text || "Baba is silent for a moment.";
  } catch (error) {
    return "Baba is having trouble connecting to his brain.";
  }
};

export const generateSpeech = async (text: string): Promise<string | null> => {
  if (!process.env.API_KEY) return null;
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });
    return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data || null;
  } catch (error) {
    console.error("TTS Error:", error);
    return null;
  }
};
