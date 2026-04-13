import type { Decision, Evaluation, Suggestion, SuggestResponse } from "../../types";

export interface State {
  taleText: string;
  evaluation: Evaluation | null;
  suggestions: Suggestion[];
  decisions: Record<string, Decision>;
  focusedIndex: number;
  rounds: number;
  isStale: boolean;
  hasIterated: boolean;
  loading: "suggest" | "apply" | null;
  error: string | null;
}

export const initialState: State = {
  taleText: "",
  evaluation: null,
  suggestions: [],
  decisions: {},
  focusedIndex: 0,
  rounds: 0,
  isStale: false,
  hasIterated: false,
  loading: null,
  error: null,
};

export type Action =
  | { type: "SET_TEXT"; text: string }
  | { type: "START_SUGGEST" }
  | { type: "SUGGEST_SUCCESS"; data: SuggestResponse }
  | { type: "START_APPLY" }
  | { type: "APPLY_SUCCESS"; text: string }
  | { type: "SET_ERROR"; error: string }
  | { type: "CLEAR_LOADING" }
  | { type: "SET_DECISION"; sid: string; decision: Decision }
  | { type: "SET_FOCUSED"; index: number };

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_TEXT":
      return {
        ...state,
        taleText: action.text,
        isStale: state.suggestions.length > 0 ? true : state.isStale,
      };
    case "START_SUGGEST":
      return { ...state, loading: "suggest", error: null };
    case "SUGGEST_SUCCESS":
      return {
        ...state,
        loading: null,
        evaluation: action.data.evaluation,
        suggestions: action.data.suggestions,
        decisions: {},
        focusedIndex: 0,
        rounds: state.rounds + 1,
        isStale: false,
      };
    case "START_APPLY":
      return { ...state, loading: "apply", error: null };
    case "APPLY_SUCCESS":
      return {
        ...state,
        loading: null,
        taleText: action.text,
        hasIterated: true,
        suggestions: [],
        evaluation: null,
        decisions: {},
        isStale: false,
      };
    case "SET_ERROR":
      return { ...state, loading: null, error: action.error };
    case "CLEAR_LOADING":
      return { ...state, loading: null };
    case "SET_DECISION":
      return {
        ...state,
        decisions: { ...state.decisions, [action.sid]: action.decision },
      };
    case "SET_FOCUSED":
      return { ...state, focusedIndex: action.index };
  }
}
