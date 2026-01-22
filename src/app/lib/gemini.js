"use server";
import { GoogleGenAI } from "@google/genai";

const currentDate = new Date();
const thisYear = new Date().getFullYear();
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function getWeeklyAndDaily(monthlyPlans) {
  try {
    console.log("monthly", monthlyPlans);
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `I have an dictionary where the key is the quarter, and the values are arrays of four string literals, where each string literal. This is the dictionary: ${JSON.stringify(
        monthlyPlans,
      )}. For each string literal, break it down into:
    - 4 weekly goals that progress logically toward achieving the monthly objective.
    - For each week, generate 0-1 task for a day that are simple, beginner-friendly, and build up to the weekly goal. Make sure to write which day of the week it should take place.

    Keep the tasks short, clear, and instructional. Focus on helping a beginner stay motivated and consistent. Use a tone that’s encouraging and clear.
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

    const questions = JSON.parse(cleanedText);
    return questions;
  } catch (error) {
    console.error("Error generating weekly and daily plans:", error);

    if (error.statusCode === 429) {
      throw new Error("Rate limit exceeded. Please try again later.");
    }

    if (error instanceof SyntaxError) {
      throw new Error("Received bad JSON response from Gemini API.");
    }

    throw new Error("An unexpected error occurred.");
  }
}

export async function getMonthlyPlan(plan) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are given this quarterly plan that breaks a goal into 4 high-level quarterly objectives:
"${plan}".

Your task is to break down each quarterly objective into:
    - 3 monthly goals (one per month)
    - Each monthly goal should then be broken down into:
        - 4 weekly goals, one for each week of the month
        - Each weekly goal should then be broken down into:
            - Daily goals for every other day of the week, beginning on Monday (e.g., Mon, Wed, Fri, Sun)

When breaking the yearly goal into quarterly goals, divide any numerical targets (like number of books, miles, lessons, etc.) so that the sum across all quarters equals the original target.

Guidelines:
    Monthly goals should:
      - Not begin with the name of the month (e.g., "January: ...")
      - Be specific, action-oriented, and build progressively toward the quarterly objective
      - Distribute the numerical target of the quarterly goal evenly (or logically) across the three months in that quarter (e.g., if the quarterly objective is "Read 5 books", the monthly goals should add up to 5 books — like "Read 2 books", "Read 2 books", and "Read 1 book").
      - Assume a full year to reach the main goal, and break it down accordingly.

    Weekly goals should:
      - Directly support the monthly goal
      - Be clear and measurable (e.g., “Practice drawing 3 times this week for 20 minutes”)

    Daily goals should:
      - Occur every other day, starting with Monday
      - Align with the weekly goal (e.g., if the weekly goal says “3 runs,” then daily goals should specify which days those runs happen)
      - Use “Rest” or leave blank on off days

    Return Format:
    Return a single JSON object structured exactly like this:

    {
      "Q1": {
        "January": {
          "monthly_goal": "January: ...",
          "weekly_goals": [
            {
              "weekly_goal": "...",
              "daily_goals": {
                "Monday": "...",
                "Tuesday": "",
                "Wednesday": "...",
                "Thursday": "",
                "Friday": "...",
                "Saturday": "",
                "Sunday": "..."
              }
            },
            { ... }, 
            { ... }, 
            { ... }
          ]
        },
        "February": { ... },
        "March": { ... }
      },
      "Q2": { ... },
      "Q3": { ... },
      "Q4": { ... }
    }

    Only return the JSON object. Do not include any explanations or extra text.`,
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

    const questions = JSON.parse(cleanedText);
    return questions;
  } catch (error) {
    console.error("Error generating monthly plan:", error);

    if (error.statusCode === 429) {
      throw new Error("Rate limit exceeded. Please try again later.");
    }
    if (error instanceof SyntaxError) {
      throw new Error("Received bad JSON response from Gemini API.");
    }

    throw new Error("An unexpected error occurred.");
  }
}

export async function getMonthlyPlanOld(plan) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are given this quarterly plan that breaks a goal into 4 high-level quarterly objectives: ${plan}.

  Your task is to break down each quarterly objective into 3 specific monthly goals — one for each month in that quarter.

  Each monthly goal should:
  - Begin with the name of the month (e.g., "January: ...")
  - Be specific, action-oriented, and build progressively toward the quarterly objective
  - Be suitable for someone with no prior experience

  Return a JSON object where each key is the quarter ("Q1", "Q2", "Q3", "Q4"), and the value is an array of 3 string literals representing the goals for each month.

  Only return the JSON object. Do not include explanations or extra text.
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

    const questions = JSON.parse(cleanedText);
    return questions;
  } catch (error) {
    console.error("Error generating monthly plan:", error);

    if (error.statusCode === 429) {
      throw new Error("Rate limit exceeded. Please try again later.");
    }
    if (error instanceof SyntaxError) {
      throw new Error("Received bad JSON response from Gemini API.");
    }

    throw new Error("An unexpected error occurred.");
  }
}

export async function generateQuarterlyPlans(goal, userAnswers) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Based on the following goal and the user's responses, break the goal into four high-level quarterly outcomes.
    Each quarter should include one sentence about what should be accomplished during that period to make meaningful progress.
    Keep the plans focused, realistic, and build momentum over time.

    Goal: "${goal}"
    Describing the goal: "${userAnswers}"

    Return a JSON array containing exactly four arrays. There should not be five or three. 
    Each of these four arrays represents a distinct plan with four string literals, one for each quarter (Q1 to Q4).  
    Each plan should reflect a different strategy or approach to achieving the goal.  
    Each quarterly outcome should be broad enough to be broken down into monthly goals but still clear and directional. Assume the user has no prior experience with this goal.  
    Do not include any explanations, labels, or extra text — only return the raw JSON array. Do not include the name of the quarter in the string literals, and make sure each string literal is around 15 words maximum.
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

    const questions = JSON.parse(cleanedText);
    return questions;
  } catch (error) {
    console.error("Error generating quarterly plans:", error);

    if (error.statusCode === 429) {
      throw new Error("Rate limit exceeded. Please try again later.");
    }
    if (error instanceof SyntaxError) {
      throw new Error("Received bad JSON response from Gemini API.");
    }

    throw new Error("An unexpected error occurred.");
  }
}

export async function clarifyGoal(enteredGoal) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
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
    const questions = JSON.parse(cleanedText);
    return questions;
  } catch (error) {
    console.error("Error clarifying goal:", error);

    if (error.statusCode === 429) {
      throw new Error("Rate limit exceeded. Please try again later.");
    }
    if (error instanceof SyntaxError) {
      throw new Error("Received bad JSON response from Gemini API.");
    }

    throw new Error("An unexpected error occurred.");
  }
}

export async function suggestSmartGoals(enteredGoal) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
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
    const goal = JSON.parse(cleanedText);
    return goal;
  } catch (error) {
    console.error("Error suggesting SMART goals:", error);

    if (error.statusCode === 429) {
      throw new Error("Rate limit exceeded. Please try again later.");
    }
    if (error instanceof SyntaxError) {
      throw new Error("Received bad JSON response from Gemini API.");
    }

    throw new Error("An unexpected error occurred.");
  }
}

export async function generateSingleGoal() {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
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

    const goal = JSON.parse(cleanedText);
    return goal;
  } catch (error) {
    console.error("Error generating single goal:", error);

    if (error.statusCode === 429) {
      throw new Error("Rate limit exceeded. Please try again later.");
    }
    if (error instanceof SyntaxError) {
      throw new Error("Received bad JSON response from Gemini API.");
    }

    throw new Error("An unexpected error occurred.");
  }
}

export async function generateGoalSuggestions() {
  try {
    console.log("generateGoalSuggestions called");
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
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
    const goals = JSON.parse(cleanedText);
    return goals;
  } catch (error) {
    console.error("Error generating goal suggestions:", error);

    if (error.statusCode === 429) {
      throw new Error("Rate limit exceeded. Please try again later.");
    }
    if (error instanceof SyntaxError) {
      throw new Error("Received bad JSON response from Gemini API.");
    }

    throw new Error("An unexpected error occurred.");
  }
}
