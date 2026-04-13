interface Props {
  message: string;
  onRetry: () => void;
}

export function ErrorBanner({ message, onRetry }: Props) {
  return (
    <div className="flex items-center justify-between bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-red-500 text-sm">
      <span>{message}</span>
      <button
        className="bg-transparent text-red-500 font-semibold text-[13px] px-2 py-1 underline"
        onClick={onRetry}
      >
        Retry
      </button>
    </div>
  );
}
