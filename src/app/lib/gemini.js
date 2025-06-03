"use server";
import { GoogleGenAI } from "@google/genai";

const currentDate = new Date();
const thisYear = new Date().getFullYear();
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function generateQuarterlyPlans(goal, userAnswers) {
  const response = await ai.models.generateContent({
    model: "gemini-1.5-flash",
    contents: `Based on the following goal and the user's responses, break the goal into four high-level quarterly outcomes.
    Each quarter should include one sentence about what should be accomplished during that period to make meaningful progress.
    Keep the plans focused, realistic, and build momentum over time.

    Goal: "${goal}"
    Describing the goal: "${userAnswers}"

    Return a JSON array containing exactly four arrays.  
    Each of these four arrays represents a distinct plan with four string literals, one for each quarter (Q1 to Q4).  
    Each plan should reflect a different strategy or approach to achieving the goal.  
    Each quarterly outcome should be broad enough to be broken down into monthly goals but still clear and directional. Assume the user has no prior experience with this goal.  
    Do not include any explanations, labels, or extra text — only return the raw JSON array.
`,
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
    const questions = JSON.parse(cleanedText);
    console.log("goals for quarters", questions);
    return questions;
  } catch (error) {
    console.error("Failed to parse JSON:", error);
    return [];
  }
}

export async function clarifyGoal(enteredGoal) {
  const response = await ai.models.generateContent({
    model: "gemini-1.5-flash",
    contents: `The user entered the following goal: "${enteredGoal}".
                Generate 2–3 clarifying questions in a JSON array of string literals. These questions should help the user provide more detailed input to refine their goal, so it can later be broken down into specific quarterly steps. Focus on:
                - What success looks like for them (specific outcome or result)
                - Why this goal is important to them (motivation or purpose)
                - How they might want to achieve it (methods, resources, or preferences)
              Make the questions simple, relevant, and specific to their goal. Do not suggest next steps or perform the breakdown yet. Only return the questions.
 
`,
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
    const questions = JSON.parse(cleanedText);
    console.log("goals json", questions);
    return questions;
  } catch (error) {
    console.error("Failed to parse JSON:", error);
    return [];
  }
}

export async function suggestSmartGoals(enteredGoal) {
  const response = await ai.models.generateContent({
    model: "gemini-1.5-flash",
    contents: `Return a single JSON array of 10 string literals that reformat the goal "${enteredGoal}" into SMART goals—specific, measurable, achievable, relevant, and time-bound with a deadline of December ${thisYear}. Goals should not have an end date before December of ${thisYear}. Keep each SMART goal clear, concise (within 15 words), and closely tied to the original goal by adding to it rather than rephrasing it completely. Ensure each goal is broad enough to break into quarterly tasks later, but still specific enough to measure progress and define success. Return only the JSON array, with no explanation or extra text.`,
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
