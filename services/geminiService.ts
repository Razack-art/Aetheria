
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getCreativeAssistance = async (prompt: string, context: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are the Aetheria AI Creative Assistant. Help the user build in our persistent virtual world.
      
      User Prompt: ${prompt}
      Current Project Context: ${context}
      
      Provide creative ideas, pseudo-code for game logic, or visual descriptions for their creation. Keep it inspiring and technical where needed.`,
      config: {
        temperature: 0.8,
        topP: 0.95,
        maxOutputTokens: 1000,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Creative Assistance Error:", error);
    return "The Aetheria AI core is temporarily recalibrating. Please try your prompt again in a moment.";
  }
};

export const getPlayerBriefing = async (playerData: any) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a short, 2-sentence immersive "Daily Briefing" for a player in the Aetheria universe.
      Player Data: 
      Name: ${playerData.name}
      Level: ${playerData.level}
      Top Skill: ${Object.entries(playerData.skills).sort((a: any, b: any) => b[1] - a[1])[0][0]}
      Currency: ${playerData.currency}
      
      The tone should be futuristic and authoritative. Reference their specific stats.`,
    });
    return response.text;
  } catch (error) {
    return `Welcome back, ${playerData.name}. Systems are operational. Your current balance is ${playerData.currency} Aethels.`;
  }
};
