"use client";
import { useState, useEffect } from "react";
import { generateGoalSuggestions, generateSingleGoal } from "./lib/gemini";

export default function Home() {
  const [goalsSuggestions, setGoalSuggestions] = useState([]);
  const [singleGoal, setSingleGoal] = useState();
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");
  const year = new Date().getFullYear();

  async function handleGeneration() {
    const goals = await generateGoalSuggestions();
    setGoalSuggestions(goals);
    console.log("goals", goals);
    setLoading(false);
  }

  async function handleSingleGoal() {
    const singleGoal = await generateSingleGoal();
    setSingleGoal(singleGoal);
    console.log("goal", singleGoal);
    setInput(singleGoal);
  }

  useEffect(() => {
    handleGeneration();
  }, []);

  return (
    <div>
      <div className="flex items-start pt-30 justify-center gap-36 h-[calc(100vh-320px)]">
        <div className="flex flex-col font-dm gap-2">
          <h1 className="text-4xl font-black text-indigo-900">SmartPlanner</h1>
          <p className="text-lg">
            What's a goal you would like to achieve one year from now?
          </p>
          <div className="flex flex-col">
            <div className="flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="border-1 border-indigo-800 border-r-0 rounded-l-md p-2 w-full focus:outline focus:outline-indigo-300 "
              ></input>

              <button className="bg-indigo-900 rounded-r-md p-2 text-white hover:bg-indigo-600 transition ease-in-out">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-row gap-1">
              <p className="text-sm">Not your style?</p>
              <button
                onClick={handleSingleGoal}
                className="text-indigo-900 text-sm underline hover:font-bold transition ease-in-out"
              >
                Surprise me! (AI)
              </button>
            </div>
          </div>
          <div className="z-10 flex flex-col bg-gray-50 rounded-md border-1 border-gray-200 p-5 gap-5">
            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-2">
                <p className="font-bold text-lg">Suggestions</p>
                {!loading ? (
                  <button onClick={handleGeneration}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-5 hover:rotate-45 transition ease-in-out"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                      />
                    </svg>
                  </button>
                ) : (
                  <></>
                )}
              </div>
              <div className="flex flex-col">
                {!loading ? (
                  goalsSuggestions.map((goal, index) => (
                    <button
                      key={index}
                      onClick={() => setInput(goal)}
                      className="rounded-full bg-indigo-200 text-indigo-900 px-3 p-1 m-1 w-max hover:bg-indigo-900 hover:text-white transition ease-in-out"
                    >
                      {goal}
                    </button>
                  ))
                ) : (
                  <div>Loading...</div>
                )}
              </div>
            </div>
          </div>
        </div>
        <img
          src="undraw_brainstorming_gny9.svg"
          alt="Illustration"
          className="w-135 h-auto"
        />
      </div>
      <svg
        className="z-0 bottom-0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#eef2ff"
          fillOpacity="1"
          d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
      <div className="bg-indigo-50 h-screen p-20 flex flex-col gap-5">
        <div>
          <h1 className="font-black text-3xl">
            First, let's make your goal into a SMART goal!
          </h1>
          <p className="font-dm text-lg">
            A SMART goal is a goal that is Specific, Measurable, Achievable,
            Realistic, and Time Bound.
          </p>
        </div>
        <div className="font-dm text-lg">
          <p>The goal you entered above:</p>
        </div>
        <div className="flex flex-row justify-around font-dm text-lg">
          <p>Pick one of these suggested SMART goals</p>
          <p className="font-bold">or</p>
          <div className="flex flex-col gap-3">
            <p className="font-black">
              Write your own SMART goal with guided questions
            </p>
            <div>
              <label className="font-bold">What do you want to achieve?</label>
              <p>enter user input from above</p>
            </div>
            <div>
              <label className="font-bold">How will you measure success?</label>
              <input type="text" />
            </div>
            <div>
              <label className="font-bold">What is your deadline?</label>
              <p>One year from now.</p>
            </div>
            <div>
              <label className="font-bold">Why is this important?</label>
              <input type="text" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
