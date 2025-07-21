const UserQuestions = ({ questionList, onChange, qAnswers, onClick }) => {
  return (
    <div>
      {questionList?.map((question, index) => (
        <div className="flex flex-col gap-1 py-2" key={index}>
          <label className="text-lg">{question}</label>
          <textarea
            value={qAnswers?.[index] || ""}
            onChange={onChange}
            className="resize-y bg-white rounded-md p-2 text-base"
            type="text"
          />
        </div>
      ))}
      <button
        onClick={onClick}
        className="rounded-md bg-indigo-900 text-white tracking-wide uppercase p-2 mt-2 float-right hover:bg-indigo-600 transition ease-in-out"
      >
        Submit
      </button>
    </div>
  );
};
export default UserQuestions;
