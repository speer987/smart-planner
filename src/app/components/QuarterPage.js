export default function QuarterPage() {
  return (
    <div>
      <div className="relative z-0 bg-indigo-200 h-screen p-20 flex flex-col gap-5 justify-center items-center font-dm border-2">
        <div className="flex flex-col justify-center items-center text-center">
          <p className="font-black text-3xl">
            Now, let&apos;s break your goal down into quarterly goals!
          </p>
          <p className="text-lg">
            Choose one of the following quarterly plans:
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 relative z-20">
          {quarterlyPlans?.map((plan, index) => (
            <button
              className="bg-white text-left p-3 rounded-md font-dm text-base hover:ring-2 hover:ring-indigo-800"
              key={index}
              onClick={() => handleSelectedQPlan(plan)}
            >
              <p className="font-black">Plan {index + 1}</p>
              {plan?.map((item, index) => (
                <ul key={index} className="">
                  <li>
                    Q{index + 1}: {item}
                  </li>
                </ul>
              ))}
            </button>
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
      <div className="relative z-0 bg-indigo-400 h-screen p-20 flex flex-col gap-5 justify-center items-center font-dm border-2">
        <p className="font-black text-3xl">
          Now, let&apos;s see your monthly goals based on the quarterly plan you
          chose!
        </p>
        <div className="relative z-20 flex flex-col gap-1">
          {Object.entries(monthlyPlan).map(([quarter, goals], index) => (
            <div className="bg-gray-50 rounded-md p-3 w-full" key={index}>
              <div>{quarter}</div>
              <ul className="flex flex-col">
                {goals.map((goal, index) => (
                  <li key={index}>{goal}</li>
                ))}
              </ul>
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
    </div>
  );
}
