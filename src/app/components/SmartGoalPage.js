export default function SmartGoalPage() {
  return (
    <div>
      <div className="p-20 flex flex-col gap-5">
        <div>
          <h1 className="font-black text-3xl">
            First, let&apos;s make your goal into a SMART goal!
          </h1>
          <p className="font-dm text-lg">
            A SMART goal is a goal that is Specific, Measurable, Achievable,
            Realistic, and Time Bound.
          </p>
        </div>
        <div className="font-dm text-lg flex flex-row gap-1">
          <p className="font-bold">Your goal: </p>
          <p>{submit}</p>
        </div>
        <div className="flex flex-row justify-around font-dm text-lg relative z-20">
          <div className="w-10/21 flex flex-col gap-2">
            <p className="font-bold">Pick one of these suggested SMART goals</p>
            <div className="flex flex-col gap-1 pr-3 rounded-md bg-indigo-50 p-2">
              <div className="flex flex-col overflow-y-auto max-h-90  space-y-4">
                {smartGoalList?.map((goal, index) => (
                  <button
                    className="text-base text-left bg-white rounded-md m-1 p-3 hover:ring-2 hover:ring-indigo-900 hover:bg-indigo-100 transition"
                    key={index}
                  >
                    {goal}
                  </button>
                ))}
              </div>
              <p className="uppercase text-xs text-center tracking-wide">
                Scroll for more
              </p>
            </div>
          </div>
          <p className="font-bold">or</p>
          <div className="flex flex-col gap-3 w-10/21">
            <p className="font-black">
              Write your own SMART goal with guided questions
            </p>
            <div>
              <label className="font-bold">What do you want to achieve?</label>
              <p>{submit}</p>
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
