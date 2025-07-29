export default function OverviewTabs({ selectedView, onChange }) {
  return (
    <div className="text-2xl flex flex-row gap-3">
      <button onClick={() => onChange("list")} className="border-2">
        List View
      </button>
      <button onClick={() => onChange("calendar")} className="border-2">
        Calendar View
      </button>
    </div>
  );
}
