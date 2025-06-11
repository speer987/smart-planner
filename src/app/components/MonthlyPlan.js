export default function MonthlyPlan({ month, data }) {
  const monthData = data[month];
  return (
    <div className="flex flex-col gap-2">
      <div className="bg-indigo-50 rounded-md p-3 text-black">
        <p className="font-black">Monthly Goal</p>
        <div>{monthData?.monthly_goal}</div>
      </div>
      <div className="flex flex-wrap w-full gap-2">
        {monthData.weekly_goals.map((week, index) => (
          <div
            className="w-[49.68%] bg-indigo-50 rounded-md text-black p-3"
            key={index}
          >
            <div className="flex flex-row gap-1">
              <p>Week {index + 1}:</p>
              <p>{week.weekly_goal}</p>
            </div>
            {Object.entries(week.daily_goals).map(([day, goal], index) => (
              <div
                className="flex flex-row gap-1 grid-cols-3 justify-between"
                key={index}
              >
                <p>{day}</p>
                <p>{goal}</p>
                <p>Done?</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
