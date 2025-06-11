export default function SurpriseButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-indigo-900 text-sm underline hover:font-bold transition ease-in-out"
    >
      Surprise me! (AI)
    </button>
  );
}
