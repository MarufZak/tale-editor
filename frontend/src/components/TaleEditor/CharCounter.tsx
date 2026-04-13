import { cn } from "../../lib/cn";

interface Props {
  count: number;
  max: number;
}

export function CharCounter({ count, max }: Props) {
  return (
    <div
      className={cn(
        "text-right text-sm",
        count >= max ? "text-red-500 font-medium" : "text-gray-400",
      )}
    >
      {count}/{max}
    </div>
  );
}
