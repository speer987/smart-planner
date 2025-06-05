export default function MonthlyPlan({ month, data }) {
  const monthData = data[month];
  return (
    <div className="bg-indigo-50 rounded-md p-3 text-black">
      <p className="font-black">Monthly Goal</p>
      <div>{monthData?.monthly_goal}</div>

      {monthData.weekly_goals.map((week, index) => (
        <div key={index}>
          <p>Week {index + 1}</p>
          <p>{week.weekly_goal}</p>
          {Object.entries(week.daily_goals).map(([day, goal], index) => (
            <div className="flex flex-row" key={index}>
              <p>{day}</p>
              <p>{goal}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
