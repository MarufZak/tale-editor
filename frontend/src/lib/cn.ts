import classNames from "classnames";
import { twMerge } from "tailwind-merge";

export function cn(...args: Parameters<typeof classNames>) {
  return twMerge(classNames(...args));
}
