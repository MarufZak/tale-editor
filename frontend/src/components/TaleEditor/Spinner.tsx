interface Props {
  message: string;
}

export function Spinner({ message }: Props) {
  return (
    <div className="flex items-center justify-center gap-2 p-6 text-gray-400 text-sm before:spinner-border">
      {message}
    </div>
  );
}
