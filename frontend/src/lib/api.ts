import { request } from "./request";
import type { ApplyDecision, ApplyResponse, SuggestResponse } from "../types";

const API_BASE = "http://localhost:8000";

export function fetchSuggestions(text: string) {
  return request<SuggestResponse>({
    url: `${API_BASE}/api/suggest`,
    method: "POST",
    body: { text },
  });
}

export interface ApplyDecisionsOpts {
  text: string;
  decisions: ApplyDecision[];
}

export function applyDecisions({ text, decisions }: ApplyDecisionsOpts) {
  return request<ApplyResponse>({
    url: `${API_BASE}/api/apply`,
    method: "POST",
    body: { text, decisions },
  });
}

export function submitTale(text: string) {
  return request<{ status: string }>({
    url: `${API_BASE}/api/submit`,
    method: "POST",
    body: { text },
  });
}
