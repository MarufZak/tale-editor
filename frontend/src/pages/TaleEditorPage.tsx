import { useState } from "react";
import { TaleEditor } from "../components/TaleEditor";
import { submitTale } from "../lib/api";

export function TaleEditorPage() {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (text: string) => {
    setError(null);

    try {
      await submitTale(text);
      window.location.href = "/submitted";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit tale");
    }
  };

  return (
    <div>
      <h1 className="text-gray-900 text-2xl font-semibold mb-6">Tale Editor</h1>
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-3.5 py-2 text-sm text-red-700 mb-3">
          {error}
        </div>
      )}
      <TaleEditor onSubmit={handleSubmit} />
    </div>
  );
}
