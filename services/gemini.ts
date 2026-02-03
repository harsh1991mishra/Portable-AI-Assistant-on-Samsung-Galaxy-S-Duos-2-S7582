
import { GoogleGenAI, Modality } from "@google/genai";
import { GroundingSource } from "../types";

const AI_CONFIG = {
  model: 'gemini-3-flash-preview' as const,
  systemInstruction: `You are a helpful AI assistant named Baba running on a vintage Samsung Galaxy S Duos 2 (S7582). 
  The hardware is old (2013), but your brain is state-of-the-art. 
  Be concise, friendly, wise, and efficient. 
  Owner: Harsh Mishra. 
  Project: Project Baba. 
  When providing information that might be recent, use your tools to search the web.
  If a child talks to you, be extra kind and tell stories.`,
};

export const generateAiResponse = async (prompt: string): Promise<{ text: string, sources?: GroundingSource[] }> => {
  if (!process.env.API_KEY) return { text: "Baba needs an API key to think. Please ensure process.env.API_KEY is configured." };
  
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: AI_CONFIG.model,
      contents: prompt,
      config: { 
        systemInstruction: AI_CONFIG.systemInstruction,
        tools: [{ googleSearch: {} }]
      }
    });

    const text = response.text || "Baba is silent for a moment.";
    
    // Extract grounding chunks for search citations
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    const sources: GroundingSource[] = chunks
      ?.map((chunk: any) => ({
        title: chunk.web?.title || 'Web Source',
        url: chunk.web?.uri || ''
      }))
      .filter((s: GroundingSource) => s.url !== '') || [];

    return { text, sources: sources.length > 0 ? sources : undefined };
  } catch (error) {
    console.error("Gemini Error:", error);
    return { text: "Baba is having trouble connecting to his brain. Please check your network or API quota." };
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
