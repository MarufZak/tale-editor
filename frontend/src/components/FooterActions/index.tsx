interface Props {
  taleText: string;
  loading: "suggest" | "apply" | null;
  rounds: number;
  onGetSuggestions: () => void;
  onSubmit: () => void;
}

export function FooterActions({
  taleText,
  loading,
  rounds,
  onGetSuggestions,
  onSubmit,
}: Props) {
  return (
    <div className="flex items-center gap-3 mt-2">
      <button
        className="bg-indigo-500 text-white hover:not-disabled:bg-indigo-600"
        disabled={taleText.length === 0 || loading !== null}
        onClick={onGetSuggestions}
      >
        Get AI Suggestions
      </button>
      {rounds > 0 && (
        <span className="bg-indigo-100 text-indigo-700 text-xs font-medium px-2 py-0.5 rounded-full">
          {rounds} {rounds === 1 ? "round" : "rounds"}
        </span>
      )}
      <button
        className="bg-gray-100 text-gray-900 hover:not-disabled:bg-gray-200"
        disabled={rounds < 1 || loading !== null}
        onClick={onSubmit}
      >
        Submit
      </button>
    </div>
  );
}
