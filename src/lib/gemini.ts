import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function analyzeImage(base64Data: string, mimeType: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview", 
      contents: [
        {
          parts: [
            {
              inlineData: {
                data: base64Data,
                mimeType: mimeType,
              },
            },
            {
              text: `Analyze this image and extract structured information into a JSON prompt. 
              The JSON should include:
              - subject: The main subject of the image.
              - style: The artistic style (e.g., photographic, digital art, sketch).
              - lighting: Description of the lighting.
              - composition: How the elements are arranged.
              - color_palette: Dominant colors.
              - tags: A list of relevant keywords.
              - prompt: A high-quality AI image generation prompt based on this image.
              - metadata: Any other relevant details (e.g., mood, setting).
              
              Return ONLY the raw JSON object.`,
            },
          ],
        },
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            subject: { type: Type.STRING },
            style: { type: Type.STRING },
            lighting: { type: Type.STRING },
            composition: { type: Type.STRING },
            color_palette: { type: Type.ARRAY, items: { type: Type.STRING } },
            tags: { type: Type.ARRAY, items: { type: Type.STRING } },
            prompt: { type: Type.STRING },
            metadata: { type: Type.OBJECT, properties: { mood: { type: Type.STRING }, setting: { type: Type.STRING } } },
          },
          required: ["subject", "style", "prompt"],
        },
      },
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
}
