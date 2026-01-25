export default function MonthlyBreakdown({ monthlyPlan }) {
  return (
    <div className="relative z-20 flex flex-col gap-1 h-full text-black">
      {Object.entries(monthlyPlan).map(([quarter, months], index) => (
        <div className="flex flex-row h-auto items-center" key={index}>
          <div className="absolute z-10 flex justify-center items-center font-black rounded-full bg-indigo-900 border-1 border-indigo-500 text-white w-12 h-12">
            {quarter}
          </div>
          <div className="flex flex-row rounded-md p-1 gap-2 relative z-0 ml-6 pl-8 border-1 border-indigo-500 w-full h-full">
            {Object.entries(months).map(([month, details], index) => (
              <div key={index} className="w-1/3 flex">
                <ul className="rounded-md bg-white p-3 w-full flex flex-col">
                  <p className="text-sm tracking-wider uppercase">{month}</p>
                  <li>{details.monthly_goal}</li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
