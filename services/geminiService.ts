import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateBirthdayStory = async (name: string, age: number): Promise<string> => {
  try {
    const prompt = `
      Write a short, exciting, and magical birthday story (max 150 words) for a kid named ${name} who is turning ${age} years old. 
      The story should be about ${name} being a brave hero having a birthday adventure. 
      Use simple language, lots of emojis, and make it sound super enthusiastic!
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || `Happy Birthday ${name}! Have a magical day!`;
  } catch (error) {
    console.error("Error generating story:", error);
    return `Oops! The birthday wizard is taking a nap. But he says: HAVE A GREAT BIRTHDAY ${name}!`;
  }
};

export const generateMysteryGift = async (name: string): Promise<string> => {
  try {
    const prompt = `
      Invent a fun, imaginary, magical "virtual vehicle birthday gift" for a kid named ${name} who loves vehicles.
      The gift MUST be a type of vehicle like a train, car, bus, truck, plane, or rocket.
      Examples: "A rainbow-colored monster truck that jumps over clouds", "A super-fast train that delivers endless ice cream", "A school bus that transforms into a submarine".
      Keep it short (1 sentence), funny, and exciting.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "A super cool race car! 🏎️";
  } catch (error) {
    console.error("Error generating gift:", error);
    return "A giant golden monster truck! 🚚";
  }
};