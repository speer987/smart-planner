import PillShapedButton from "./PillShapedButton";

const SuggestionsBlock = ({ onClick, goalList, loadState, setInput }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-2">
        <p className="font-bold text-lg">Suggestions</p>
        {!loadState ? (
          <button onClick={onClick}>
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
        {!loadState ? (
          goalList.map((goal, index) => (
            <PillShapedButton
              key={index}
              onClick={() => setInput(goal)}
              text={goal}
            />
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default SuggestionsBlock;
