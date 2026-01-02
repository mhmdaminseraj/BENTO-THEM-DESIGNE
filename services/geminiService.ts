
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getThemeRecommendations = async (userPrompt: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `کاربر به دنبال یک تم یا اکوسیستم طراحی با این درخواست است: "${userPrompt}". 
    نیازهای آن‌ها را تحلیل کنید و دسته‌بندی‌های مرتبط را از این لیست انتخاب کنید: eCommerce, Blog, Magazine, Portfolio, Corporate, Landing Pages, Dashboard.
    پاسخ بخش 'reasoning' حتماً به زبان فارسی باشد.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          reasoning: {
            type: Type.STRING,
            description: "توضیح کوتاهی به فارسی درباره علت انتخاب این دسته‌بندی‌ها."
          },
          suggestedCategories: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "لیست نام‌های انگلیسی دسته‌بندی‌های مطابقت داده شده."
          }
        },
        required: ["reasoning", "suggestedCategories"]
      }
    }
  });

  try {
    return JSON.parse(response.text || '{}');
  } catch (e) {
    console.error("Failed to parse Gemini response", e);
    return null;
  }
};
