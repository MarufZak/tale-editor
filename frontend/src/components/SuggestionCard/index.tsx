import type { OnDecisionOpts, Suggestion } from "../../types";
import { cn } from "../../lib/cn";

interface Props {
  suggestion: Suggestion;
  decision?: OnDecisionOpts["decision"];
  isFocused: boolean;
  onFocus: () => void;
  onDecision: (opts: OnDecisionOpts) => void;
}

export function SuggestionCard({
  suggestion: sg,
  decision,
  isFocused,
  onFocus,
  onDecision,
}: Props) {
  const cardClass = cn(
    "border-2 rounded-lg px-4 py-3 mb-2 cursor-pointer transition-[border-color,background-color] duration-150",
    !decision && !isFocused && "border-gray-200",
    isFocused && !decision && "border-indigo-500",
    decision === "approve" && !isFocused && "bg-green-50 border-green-300",
    decision === "approve" && isFocused && "bg-green-50 border-green-500",
    decision === "reject" && !isFocused && "bg-red-50 border-red-200",
    decision === "reject" && isFocused && "bg-red-50 border-red-500",
  );

  return (
    <div className={cardClass} onClick={onFocus}>
      <div className="flex items-baseline gap-2 flex-wrap mb-1.5">
        <span className="line-through text-red-500 text-sm">{sg.original}</span>
        <span className="text-gray-400 text-sm">&rarr;</span>
        <span className="text-emerald-600 font-medium text-sm">
          {sg.proposed}
        </span>
      </div>
      <p className="text-[13px] text-gray-400 italic">{sg.rationale}</p>
      <div className="flex gap-2 mt-2">
        <button
          className={cn(
            "text-[13px] px-3.5 py-1 rounded border transition-all duration-150",
            decision === "approve"
              ? "bg-green-500 border-green-500 text-white"
              : "border-gray-200 bg-white text-gray-700 hover:border-green-500 hover:text-green-600",
          )}
          onClick={(e) => {
            e.stopPropagation();
            onDecision({ sid: sg.sid, decision: "approve" });
          }}
        >
          Approve
        </button>
        <button
          className={cn(
            "text-[13px] px-3.5 py-1 rounded border transition-all duration-150",
            decision === "reject"
              ? "bg-red-500 border-red-500 text-white"
              : "border-gray-200 bg-white text-gray-700 hover:border-red-500 hover:text-red-500",
          )}
          onClick={(e) => {
            e.stopPropagation();
            onDecision({ sid: sg.sid, decision: "reject" });
          }}
        >
          Reject
        </button>
      </div>
    </div>
  );
}
