"use client";
import { useState, useEffect } from "react";
import {
  clarifyGoal,
  generateGoalSuggestions,
  generateQuarterlyPlans,
  generateSingleGoal,
  suggestSmartGoals,
  getMonthlyPlan,
  getWeeklyAndDaily,
} from "./lib/gemini";
import MonthlyPlan from "./components/MonthlyPlan";
import Input from "./components/Input";
import MagicButton from "./components/MagicButton";
import SurpriseButton from "./components/SurpriseButton";
import SuggestionsBlock from "./components/SuggestionsBlock";
import Svg from "./components/Svg";

export default function Home() {
  const [goalsSuggestions, setGoalSuggestions] = useState([]);
  const [singleGoal, setSingleGoal] = useState();
  const [smartGoalList, setSmartGoalList] = useState([]);
  const [submit, setSubmit] = useState("");
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");
  const [questions, setQuestions] = useState([]);
  const [qAnswers, setQAnswers] = useState(Array(3).fill(""));
  const [quarterlyPlans, setQuarterlyPlans] = useState([]);
  const [selectedQPlan, setSelectedQPlan] = useState([]);
  const [monthlyPlan, setMonthlyPlan] = useState([]);
  const [weeklyPlan, setWeeklyPlan] = useState();
  const [flatMonthlyPlans, setFlatMonthlyPlans] = useState();
  const [selectedMonth, setSelectedMonth] = useState();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleTextAreaChange = (index, value) => {
    const newAnswers = [...qAnswers];
    newAnswers[index] = value;
    setQAnswers(newAnswers);
  };

  const destructureGoal = (goal) => {
    const [month, goalText] = goal.split(":");
    return [month, goalText];
  };

  async function handleSelectedQPlan(plan) {
    console.log(plan);
    setSelectedQPlan(plan);
    const tempMonthlyPlan = await getMonthlyPlan(plan);
    setMonthlyPlan(tempMonthlyPlan);
    console.log(tempMonthlyPlan);

    const tempFlatPlans = {};
    for (const [quarter, months] of Object.entries(tempMonthlyPlan)) {
      for (const [month, details] of Object.entries(months)) {
        tempFlatPlans[month] = details;
      }
    }

    setFlatMonthlyPlans(tempFlatPlans);

    console.log("flatplans", tempFlatPlans);
  }

  async function handleFormSubmit() {
    const planObject = await generateQuarterlyPlans(submit, qAnswers);
    setQuarterlyPlans(planObject);
  }

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

  async function getSmartGoals(input) {
    const smartGoals = await suggestSmartGoals(input);
    setSmartGoalList(smartGoals);
  }

  async function getQuestions(input) {
    const questions = await clarifyGoal(input);
    setQuestions(questions);
  }

  const handleSubmit = () => {
    setSubmit(input);
    // getSmartGoals(input);
    getQuestions(input);
  };

  useEffect(() => {
    handleGeneration();
  }, []);

  return (
    <div>
      <div className="h-screen relative z-0 border-2">
        <div className="flex items-start pt-25 justify-center gap-25 ">
          <div className="flex flex-col font-dm gap-2">
            <h1 className="text-4xl font-black text-indigo-900">
              SmartPlanner
            </h1>
            <p className="text-lg">
              What's a goal you would like to achieve one year from now?
            </p>
            <div className="flex flex-col">
              <div className="flex">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <MagicButton onClick={handleSubmit} />
              </div>
              <div className="flex flex-row gap-1">
                <p className="text-sm">Not your style?</p>
                <SurpriseButton onClick={handleSingleGoal} />
              </div>
            </div>
            <div className="z-20 flex flex-col bg-gray-50 rounded-md border-1 border-gray-200 p-5 gap-5">
              <div className="flex flex-col gap-2">
                <SuggestionsBlock
                  onClick={handleGeneration}
                  goalList={goalsSuggestions}
                  loadState={loading}
                  setInput={setInput}
                />
              </div>
            </div>
          </div>
          <img
            src="undraw_brainstorming_gny9.svg"
            alt="Illustration"
            className="w-150 h-auto my-15"
          />
        </div>
        <Svg
          fill="#eef2ff"
          d={
            "M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          }
        />
      </div>
      <div className="bg-indigo-50 z-0 min-h-screen relative font-dm flex justify-center items-start py-25  border-2">
        <div className="flex flex-col relative z-20 gap-0 w-5/6">
          <div>
            <h1 className="text-3xl font-black">
              Let's learn more about your goal.
            </h1>
            <div className="text-lg flex flex-row gap-1">
              <p className="uppercase tracking-wide font-bold">Goal:</p>
              <p>{submit}</p>
            </div>
          </div>
          <div>
            {questions?.map((question, index) => (
              <div className="flex flex-col gap-1 py-2" key={index}>
                <label className="text-lg">{question}</label>
                <textarea
                  value={qAnswers[index]}
                  onChange={(e) => handleTextAreaChange(index, e.target.value)}
                  className="resize-y bg-white rounded-md p-2 text-base"
                  type="text"
                />
              </div>
            ))}
          </div>
          <button
            onClick={handleFormSubmit}
            className="rounded-md bg-indigo-900 text-white tracking-wide uppercase p-2 mt-2 float-right hover:bg-indigo-600 transition ease-in-out"
          >
            Submit
          </button>
        </div>
        <svg
          className="absolute bottom-0 w-full z-10"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#c6d2ff"
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,197.3C384,235,480,277,576,277.3C672,277,768,235,864,192C960,149,1056,107,1152,80C1248,53,1344,43,1392,37.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      <div className="relative z-0 bg-indigo-200 h-screen p-20 py-15 flex flex-col gap-5 justify-center items-center font-dm border-2">
        <div className="flex flex-col justify-center items-center text-center">
          <p className="font-black text-3xl">
            Now, let's break your goal down into quarterly goals!
          </p>
          <p className="text-lg">
            Choose one of the following quarterly plans:
          </p>
        </div>

        <div className="grid grid-cols-4 gap-4 relative z-20 h-screen">
          {quarterlyPlans?.map((plan, index) => (
            <div className="flex flex-col gap-1 text-center" key={index}>
              <p className="font-black">Plan {index + 1}</p>
              <button
                className="flex flex-col gap-3 bg-white text-left p-3 rounded-md font-dm text-base hover:ring-2 hover:ring-indigo-800 h-full"
                onClick={() => handleSelectedQPlan(plan)}
              >
                {plan?.map((item, index) => (
                  <ul key={index} className="h-1/4 flex flex-col">
                    <li className="relative bg-indigo-50 rounded-md p-2 flex-grow flex flex-col">
                      <p className="mr-4">{item}</p>
                      <p className="text-xs uppercase tracking-wide rounded-tl-md rounded-br-md bg-indigo-100  p-1 w-max absolute bottom-0 right-0">
                        Q{index + 1}
                      </p>
                    </li>
                  </ul>
                ))}
              </button>
            </div>
          ))}
        </div>
        {/* SVG goes here */}
        <svg
          className="absolute bottom-0 w-full z-10"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#7c86ff"
            fillOpacity="1"
            d="M0,160L48,149.3C96,139,192,117,288,144C384,171,480,245,576,277.3C672,309,768,299,864,272C960,245,1056,203,1152,197.3C1248,192,1344,224,1392,240L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
      <div className="relative z-0 bg-indigo-400 h-screen w-screen p-20 flex flex-col gap-5 justify-center items-center font-dm">
        <p className="font-black text-3xl">
          Now, let's see your monthly goals based on the quarterly plan you
          chose!
        </p>
        <div className="relative z-20 flex flex-col gap-1 h-full">
          {Object.entries(monthlyPlan).map(([quarter, months], index) => (
            <div className="flex flex-row h-1/4 items-center" key={index}>
              <div className="absolute z-10 flex justify-center items-center font-black rounded-full bg-indigo-900 border-1 border-indigo-500 text-white w-12 h-12">
                {quarter}
              </div>
              <div className="flex flex-row rounded-md p-1 gap-2 relative z-0 ml-6 pl-8 border-1 border-indigo-500 w-full h-full">
                {Object.entries(months).map(([month, details], index) => (
                  <div key={index} className="w-1/3 flex">
                    <ul className="rounded-md bg-white p-3 w-full">
                      <p className="text-sm tracking-wider uppercase">
                        {month}
                      </p>
                      <li>{details.monthly_goal}</li>
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* svg goes here */}
        <svg
          className="absolute bottom-0 w-full z-10"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#4f39f6"
            fillOpacity="1"
            d="M0,224L48,208C96,192,192,160,288,160C384,160,480,192,576,181.3C672,171,768,117,864,112C960,107,1056,149,1152,181.3C1248,213,1344,235,1392,245.3L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      <div className="relative z-0 bg-indigo-600 h-screen w-screen p-20 flex flex-col gap-5 justify-center items-center font-dm border-2 text-white">
        <p className="font-black  text-3xl">
          Now, let's see your weekly and daily goals.
        </p>
        <div className="text-lg">
          {months.map((month, index) => (
            <button
              key={index}
              className="rounded-md bg-indigo-500 p-3 py-2 m-2 hover:bg-indigo-300 transition ease-in-out"
              onClick={() => setSelectedMonth(month)}
            >
              {month}
            </button>
          ))}
        </div>
        {selectedMonth && (
          <MonthlyPlan month={selectedMonth} data={flatMonthlyPlans} />
        )}
        {/* <div>{console.log(flatMonthlyPlans?.["January"]?.monthly_goal)}</div> */}
      </div>
    </div>
  );
}
