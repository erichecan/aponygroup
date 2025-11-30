import { GoogleGenAI, Content, Part } from "@google/genai";
import { Language, Message, Role } from "../types";

// Helper to convert internal Message format to Gemini SDK Content format
const convertHistoryToContents = (history: Message[]): Content[] => {
  return history.map((msg) => ({
    role: msg.role === Role.USER ? 'user' : 'model',
    parts: [{ text: msg.content } as Part],
  }));
};

export const streamGeminiResponse = async (
  prompt: string,
  history: Message[],
  language: Language,
  onChunk: (text: string) => void
): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error("API_KEY not found in environment variables");
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // System instruction to guide behavior and language for Apony Inc
    const systemInstruction = language === Language.ZH 
      ? "你代表 Apony Inc (Apony Logistics)，一家专业的全球物流和海外仓服务商。你的职责是回答客户关于我们服务的问题：海外仓储（美国仓、FBA中转、一件代发）、物流派送（海运、空运）、以及WMS系统。请保持专业、礼貌、简洁。如果用户询问运费，请建议他们联系销售部门获取详细报价。始终用中文回答。"
      : "You represent Apony Inc, a professional global logistics and overseas warehousing provider. Your role is to answer customer questions about our services: Overseas Warehousing (US Warehouses, FBA Transfer, Dropshipping), Logistics Delivery (Ocean, Air Freight), and WMS systems. Be professional, concise, and polite. If users ask for specific shipping rates, suggest they contact our sales team for a quote. Always respond in English.";

    const contents = [...convertHistoryToContents(history), { role: 'user', parts: [{ text: prompt }] }];

    const result = await ai.models.generateContentStream({
      model: 'gemini-2.5-flash',
      contents: contents as any,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    let fullText = "";
    
    for await (const chunk of result) {
      const chunkText = chunk.text;
      if (chunkText) {
        fullText += chunkText;
        onChunk(chunkText);
      }
    }

    return fullText;

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};