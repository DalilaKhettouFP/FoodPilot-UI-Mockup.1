
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const buildPrompt = (description: string): string => {
  return `
    You are an expert web developer specializing in Tailwind CSS.
    Your task is to create a web page mockup based on the following description.

    Instructions:
    1.  Generate a single block of HTML code that would be placed inside a <body> tag.
    2.  Use ONLY Tailwind CSS classes for all styling. Do not include any <style> tags, inline styles, or external CSS files.
    3.  Do not include <!DOCTYPE>, <html>, <head>, or <body> tags in your response.
    4.  Use placeholder images from https://picsum.photos if any images are needed (e.g., https://picsum.photos/400/300).
    5.  Ensure the generated code is clean, well-structured, and directly renderable.
    6.  The mockup should be visually appealing and modern.

    Description:
    ---
    ${description}
    ---
  `;
};

export const generateMockup = async (description: string): Promise<string> => {
    try {
        const fullPrompt = buildPrompt(description);

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: fullPrompt,
        });

        let text = response.text;

        // Clean up the response, removing markdown code block fences if they exist.
        if (text.startsWith('```html')) {
            text = text.substring(7);
        }
        if (text.endsWith('```')) {
            text = text.substring(0, text.length - 3);
        }

        return text.trim();

    } catch (error) {
        console.error("Error generating mockup with Gemini API:", error);
        throw new Error("Failed to generate mockup. Please check your API key and network connection.");
    }
};
