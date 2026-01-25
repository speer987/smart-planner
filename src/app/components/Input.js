export default function Input({ value, onChange, isEmpty }) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      className={
        isEmpty
          ? "border-2 border-red-800 border-r-0 rounded-l-md p-2 w-full focus:outline focus:outline-indigo-300"
          : "border-1 border-indigo-800 border-r-0 rounded-l-md p-2 w-full focus:outline focus:outline-indigo-300"
      }
    ></input>
  );
}
