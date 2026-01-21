import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import Calendar from "./Calendar";

export default function MonthlyPlan({ month, data }) {
  const monthData = data?.[month];
  return (
    <div className="flex flex-col gap-2 p-5 bg-white rounded-b-md text-indigo-900">
      <div className="flex flex-row gap-1 text-lg items-center">
        <p className="font-bold ">Goal:</p>
        {monthData?.monthly_goal}
      </div>
      {monthData?.weekly_goals?.map((week, index) => (
        <Disclosure key={index}>
          <DisclosureButton className="bg-indigo-50 rounded-sm p-2 my-1 items-center flex flex-row justify-between">
            Week {index + 1}: {week.weekly_goal}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </DisclosureButton>
          <DisclosurePanel className="flex flex-row gap-2 items-stretch h-full">
            {Object.entries(week.daily_goals).map(([day, goal], index) =>
              goal ? (
                <div
                  className="flex flex-col flex-1 justify-between p-3 h-full border-indigo-200 border-2 bg-white rounded-md"
                  key={index}
                >
                  <p className="text-sm tracking-wider uppercase ">{day}</p>
                  <p>{goal}</p>
                </div>
              ) : (
                ""
              ),
            )}
          </DisclosurePanel>
        </Disclosure>
      ))}
    </div>
  );
}
