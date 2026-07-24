import { GoogleGenerativeAI } from '@google/generative-ai';
// wen can use it in the backend to generate product descriptions with the API call//

export const generateProductDescription = async (name, brand) => {


  try {
    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `
     Write a professional and engaging product description for a product named "${name}" from the brand "${brand}".

     Focus on:
     - Highlighting the key features and benefits
     - Using a clean, concise marketing tone
     - Avoiding filler text or AI notes like "specify material" or "mention if..."
     - Do not include any instructions or placeholders—only output the final polished description
     `;
    const result = await model.generateContent({
      contents: [{ parts: [{ text: prompt }] }],
    });

    const response = result.response;
    const text = response.candidates?.[0]?.content?.parts?.[0]?.text || '';

    return text;

    return response;
  } catch (error) {
    console.error("error", error);
    console.error("Gemini API error:", error.response?.data || error.message);
    throw new Error('Failed to generate description');
  }
}




