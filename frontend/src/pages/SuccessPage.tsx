import { useNavigate } from "react-router-dom";

export function SuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="text-center pt-20">
      <h1 className="text-gray-900 text-2xl font-semibold mb-6">
        Tale Submitted!
      </h1>
      <p className="text-gray-400 mb-8">
        Your tale has been submitted successfully.
      </p>
      <button
        className="bg-indigo-500 text-white hover:not-disabled:bg-indigo-600"
        onClick={() => navigate("/")}
      >
        Start New Tale
      </button>
    </div>
  );
}
