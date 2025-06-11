export default function PillShapedButton({ index, onClick, text }) {
  return (
    <button
      key={index}
      onClick={onClick}
      className="rounded-full bg-indigo-200 text-indigo-900 px-3 p-1 m-1 w-max hover:bg-indigo-900 hover:text-white transition ease-in-out"
    >
      {text}
    </button>
  );
}
