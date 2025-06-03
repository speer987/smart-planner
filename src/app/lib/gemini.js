"use server";
import { GoogleGenAI } from "@google/genai";

const currentDate = new Date();
const thisYear = new Date().getFullYear();
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function suggestSmartGoals(enteredGoal) {
  const response = await ai.models.generateContent({
    model: "gemini-1.5-flash",
    contents: `Return a single JSON array of 10 string literals showing how the goal of ${enteredGoal} can be reformatted as specific, measurable, achievable, relevant, and time-bound goal that has an end date of December ${thisYear}. Keep changes minimal, and try to add words to the goal I gave you instead of rephrasing it completely. Make sure that the goals are not vague. Each goal should clearly specify what exactly will be done, include measurable progress, be realistic, align with the overall objective, and have a firm deadline. Keep each SMART goal brief, clear, and within 15 words. `,
  });
  const text = response.text;
  console.log(response.text);

  const cleanedText = text
    .trim()
    // Remove opening fence with optional "json"
    .replace(/^```json\s*\n?/, "")
    // Remove closing fence
    .replace(/```$/, "")
    .trim();

  try {
    console.log("Raw text before JSON.parse:", cleanedText);
    const goal = JSON.parse(cleanedText);
    console.log("goals json", goal);
    return goal;
  } catch (error) {
    console.error("Failed to parse JSON:", error);
    return [];
  }
}

export async function generateSingleGoal() {
  const response = await ai.models.generateContent({
    model: "gemini-1.5-flash",
    contents: `Return ONLY a JSON string literal representing one unique yearly goal in the categories: health, fitness, career, education, personal finance, relationships, personal growth, creativity, travel, home, community, or spirituality that is 5-8 words long. Make sure the goal is completely different from commonly repeated ones. Do not repeat yourself. Do not include the category name or any extra text.`,
  });
  const text = response.text;
  console.log(response.text);

  const cleanedText = text
    .trim()
    // Remove opening fence with optional "json"
    .replace(/^```json\s*\n?/, "")
    // Remove closing fence
    .replace(/```$/, "")
    .trim();

  try {
    console.log("Raw text before JSON.parse:", cleanedText);
    const goal = JSON.parse(cleanedText);
    console.log("goals json", goal);
    return goal;
  } catch (error) {
    console.error("Failed to parse JSON:", error);
    return [];
  }
}

export async function generateGoalSuggestions() {
  console.log("generateGoalSuggestions called");
  const response = await ai.models.generateContent({
    model: "gemini-1.5-flash",
    contents:
      "Return ONLY a JSON array of exactly seven yearly goals in the categories health, fitness, career, education, personal finance, relationships, personal growth, creativity, travel, home, community, spirituality as five to seven word strings, with no markdown code blocks, no variable declarations, and no extra text—just pure JSON. Make sure each goal is in different categories every time and that it is a completely different goal each time. Don't mention which category each goal is in.",
  });
  const text = response.text;
  console.log(response.text);

  const cleanedText = text
    .trim()
    // Remove opening fence with optional "json"
    .replace(/^```json\s*\n?/, "")
    // Remove closing fence
    .replace(/```$/, "")
    .trim();

  try {
    console.log("Raw text before JSON.parse:", cleanedText);
    const goals = JSON.parse(cleanedText);
    console.log("goals json", goals);
    return goals;
  } catch (error) {
    console.error("Failed to parse JSON:", error);
    return [];
  }
}
