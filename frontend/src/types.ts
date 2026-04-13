export interface Suggestion {
  sid: string;
  original: string;
  proposed: string;
  rationale: string;
}

export interface Evaluation {
  clarity: number;
  tone: number;
  originality: number;
  comments: string[];
}

export interface SuggestResponse {
  evaluation: Evaluation;
  suggestions: Suggestion[];
}

export type Decision = "approve" | "reject";

export interface OnDecisionOpts {
  sid: string;
  decision: Decision;
}

export interface ApplyDecision {
  sid: string;
  action: Decision;
  original: string;
  proposed: string;
}

export interface ApplyResponse {
  text: string;
}
