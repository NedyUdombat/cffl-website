import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export type InputSize = "sm" | "md" | "lg";

/** Base classes shared by every input regardless of size/state */
export const INPUT_BASE =
  "w-full rounded-md border bg-surface font-body text-ink transition-colors " +
  "placeholder:text-muted-2 " +
  "focus:outline-none focus:ring-2 " +
  "disabled:cursor-not-allowed disabled:opacity-60 disabled:bg-bg";

/** Height + horizontal padding + font size per size */
export const INPUT_SIZE: Record<InputSize, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-5 text-base",
};

/** Border + focus ring colours for default vs error states */
export const INPUT_STATE: Record<"default" | "error", string> = {
  default: "border-line focus:border-accent focus:ring-accent/20",
  error: "border-danger focus:border-danger focus:ring-danger/20",
};

/**
 * Left padding override when a startIcon is present.
 * Must be wide enough that text doesn't overlap the icon container.
 */
export const ICON_START_PAD: Record<InputSize, string> = {
  sm: "pl-8",
  md: "pl-10",
  lg: "pl-11",
};

/**
 * Right padding override when an endIcon or password toggle is present.
 */
export const ICON_END_PAD: Record<InputSize, string> = {
  sm: "pr-8",
  md: "pr-10",
  lg: "pr-11",
};

/**
 * Width of the absolutely-positioned icon containers.
 * Equals the input height at each size so the icon zone is square (touch-friendly).
 */
export const ICON_WRAPPER_SIZE: Record<InputSize, string> = {
  sm: "w-8",
  md: "w-10",
  lg: "w-11",
};

/** Label above the input */
export const LABEL_BASE = "block mb-1 text-sm font-medium text-ink";

/** Helper text below the input (no error) */
export const HELPER_BASE = "mt-1 text-xs text-muted";

/** Error message below the input */
export const ERROR_BASE = "mt-1 text-xs text-danger";

/**
 * Builds the full className for the <input> element.
 *
 * @param size       - sm | md | lg
 * @param hasError   - true when validationError is non-empty
 * @param hasStart   - true when startIcon is provided (adds left padding)
 * @param hasEnd     - true when endIcon or password toggle is present (adds right padding)
 * @param className  - consumer override, applied last via twMerge
 */
export function inputClass(
  size: InputSize,
  hasError: boolean,
  hasStart: boolean,
  hasEnd: boolean,
  className?: string
): string {
  return twMerge(
    clsx(
      INPUT_BASE,
      INPUT_SIZE[size],
      hasError ? INPUT_STATE.error : INPUT_STATE.default,
      hasStart && ICON_START_PAD[size],
      hasEnd && ICON_END_PAD[size],
      className
    )
  );
}
