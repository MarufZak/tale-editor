import { useEffect, useRef } from "react";
import type { Decision, Evaluation, OnDecisionOpts, Suggestion } from "../../types";
import { EvaluationBlock } from "../EvaluationBlock";
import { SuggestionCard } from "../SuggestionCard";

interface Props {
  evaluation: Evaluation;
  suggestions: Suggestion[];
  decisions: Record<string, Decision>;
  focusedIndex: number;
  isStale: boolean;
  allDecided: boolean;
  applyLoading: boolean;
  onDecision: (opts: OnDecisionOpts) => void;
  onFocusChange: (index: number) => void;
  onApply: () => void;
}

export default function SuggestionsPanel({
  evaluation,
  suggestions,
  decisions,
  focusedIndex,
  isStale,
  allDecided,
  applyLoading,
  onDecision,
  onFocusChange,
  onApply,
}: Props) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (suggestions.length === 0) {
        return;
      }

      e.preventDefault();

      if (e.key === "ArrowDown") {
        onFocusChange(Math.min(focusedIndex + 1, suggestions.length - 1));
      } else if (e.key === "ArrowUp") {
        onFocusChange(Math.max(focusedIndex - 1, 0));
      } else if (e.key === "Enter") {
        onDecision({ sid: suggestions[focusedIndex].sid, decision: "approve" });
      } else if (e.key === "Escape") {
        onDecision({ sid: suggestions[focusedIndex].sid, decision: "reject" });
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [suggestions, focusedIndex, onDecision, onFocusChange]);

  return (
    <div className="flex flex-col gap-5" ref={panelRef}>
      {isStale && (
        <div className="bg-yellow-50 border border-amber-200 rounded-lg px-3.5 py-2 text-[13px] font-medium text-amber-800 text-center">
          Suggestions may be stale
        </div>
      )}
      <EvaluationBlock evaluation={evaluation} />
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-2">
          Suggestions
        </h3>
        {suggestions.map((sg, i) => (
          <SuggestionCard
            key={sg.sid}
            suggestion={sg}
            decision={decisions[sg.sid]}
            isFocused={i === focusedIndex}
            onFocus={() => onFocusChange(i)}
            onDecision={onDecision}
          />
        ))}
      </div>
      <button
        className="bg-indigo-500 text-white w-full py-2.5 px-5 font-medium hover:not-disabled:bg-indigo-600"
        disabled={!allDecided || applyLoading}
        onClick={onApply}
      >
        Apply Decisions
      </button>
    </div>
  );
}
