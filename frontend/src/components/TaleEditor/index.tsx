import { useCallback, useReducer } from "react";
import { useDebounceCallback } from "usehooks-ts";
import type { OnDecisionOpts } from "../../types";
import { fetchSuggestions, applyDecisions } from "../../lib/api";
import { wait } from "../../lib/wait";
import SuggestionsPanel from "../SuggestionsPanel";
import { FooterActions } from "../FooterActions";
import { CharCounter } from "./CharCounter";
import { ErrorBanner } from "./ErrorBanner";
import { Spinner } from "./Spinner";
import { reducer, initialState } from "./reducer";

const MAX_CHARS = 1000;

interface Props {
  onSubmit: (text: string) => void;
}

export function TaleEditor({ onSubmit }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    taleText,
    evaluation,
    suggestions,
    decisions,
    focusedIndex,
    isStale,
    loading,
    error,
  } = state;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const cleaned = e.target.value.replace(/\n/g, " ");

    if (cleaned.length <= MAX_CHARS) {
      dispatch({ type: "SET_TEXT", text: cleaned });
    }
  };

  const handleGetSuggestions = useDebounceCallback(async () => {
    dispatch({ type: "START_SUGGEST" });

    try {
      const [data] = await Promise.all([
        fetchSuggestions(taleText),
        wait(1000),
      ]);
      dispatch({ type: "SUGGEST_SUCCESS", data });
    } catch (err) {
      dispatch({
        type: "SET_ERROR",
        error: err instanceof Error ? err.message : "Something went wrong",
      });
    }
  }, 300);

  const handleApply = async () => {
    dispatch({ type: "START_APPLY" });

    try {
      const applyList = suggestions.map((s) => ({
        sid: s.sid,
        action: decisions[s.sid] ?? ("reject" as const),
        original: s.original,
        proposed: s.proposed,
      }));
      const [data] = await Promise.all([
        applyDecisions({ text: taleText, decisions: applyList }),
        wait(1000),
      ]);
      dispatch({ type: "APPLY_SUCCESS", text: data.text });
    } catch (err) {
      dispatch({
        type: "SET_ERROR",
        error: err instanceof Error ? err.message : "Failed to apply decisions",
      });
    }
  };

  const handleDecision = useCallback(({ sid, decision }: OnDecisionOpts) => {
    dispatch({ type: "SET_DECISION", sid, decision });
  }, []);

  const handleFocusChange = useCallback((index: number) => {
    dispatch({ type: "SET_FOCUSED", index });
  }, []);

  const hasSuggestions = suggestions.length > 0;
  const allDecided =
    hasSuggestions && suggestions.every((s) => decisions[s.sid] !== undefined);

  return (
    <div className="flex flex-col gap-3">
      <textarea
        className="w-full min-h-50 p-4 font-[inherit] border border-gray-200 rounded-lg resize-y outline-none transition-colors focus:border-indigo-500"
        value={taleText}
        onChange={handleChange}
        placeholder="Write your tale here..."
      />
      <CharCounter count={taleText.length} max={MAX_CHARS} />
      {error && <ErrorBanner message={error} onRetry={handleGetSuggestions} />}
      {loading === "suggest" && <Spinner message="Generating suggestions…" />}
      {loading === "apply" && <Spinner message="Applying decisions…" />}
      {!loading && !hasSuggestions && !error && (
        <div className="text-center py-8 px-4 text-gray-400 text-sm">
          Write your tale above, then click "Get AI Suggestions" to receive
          feedback.
        </div>
      )}
      {!loading && hasSuggestions && evaluation && (
        <SuggestionsPanel
          evaluation={evaluation}
          suggestions={suggestions}
          decisions={decisions}
          focusedIndex={focusedIndex}
          isStale={isStale}
          allDecided={allDecided}
          applyLoading={loading === "apply"}
          onDecision={handleDecision}
          onFocusChange={handleFocusChange}
          onApply={handleApply}
        />
      )}
      <FooterActions
        taleText={taleText}
        loading={loading}
        rounds={state.rounds}
        onGetSuggestions={handleGetSuggestions}
        onSubmit={() => onSubmit(taleText)}
      />
    </div>
  );
}
