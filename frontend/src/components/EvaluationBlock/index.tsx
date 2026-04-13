import type { Evaluation } from "../../types";
import { ScoreBadge } from "../ScoreBadge";

interface Props {
  evaluation: Evaluation;
}

export function EvaluationBlock({ evaluation }: Props) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">Evaluation</h3>
      <div className="flex gap-4">
        <ScoreBadge label="Clarity" value={evaluation.clarity} />
        <ScoreBadge label="Tone" value={evaluation.tone} />
        <ScoreBadge label="Originality" value={evaluation.originality} />
      </div>
      {evaluation.comments.length > 0 && (
        <ul className="mt-3 pl-4.5 flex flex-col gap-1">
          {evaluation.comments.map((c, i) => (
            <li key={i} className="text-sm text-gray-700">
              {c}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
