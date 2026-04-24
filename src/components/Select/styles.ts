import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export type SelectSize = "sm" | "md" | "lg";

/** Base classes shared by every select regardless of size/state */
export const SELECT_BASE =
  "w-full rounded-md border bg-surface font-body text-ink appearance-none cursor-pointer transition-colors " +
  "focus:outline-none focus:ring-2 " +
  "disabled:cursor-not-allowed disabled:opacity-60 disabled:bg-bg";

/** Height + horizontal padding + font size per size */
export const SELECT_SIZE: Record<SelectSize, string> = {
  sm: "h-8 pl-3 pr-8 text-sm",
  md: "h-10 pl-4 pr-10 text-sm",
  lg: "h-12 pl-5 pr-11 text-base",
};

/** Border + focus ring colours for default vs error states */
export const SELECT_STATE: Record<"default" | "error", string> = {
  default: "border-line focus:border-accent focus:ring-accent/20",
  error: "border-danger focus:border-danger focus:ring-danger/20",
};

/**
 * Width of the absolutely-positioned chevron container.
 * Equals the select height at each size so the icon zone is square.
 */
export const CHEVRON_WRAPPER_SIZE: Record<SelectSize, string> = {
  sm: "w-8",
  md: "w-10",
  lg: "w-11",
};

/** Label above the select */
export const LABEL_BASE = "block mb-1 text-sm font-medium text-ink";

/** Helper text below the select (no error) */
export const HELPER_BASE = "mt-1 text-xs text-muted";

/** Error message below the select */
export const ERROR_BASE = "mt-1 text-xs text-danger";

/**
 * Builds the full className for the <select> element.
 *
 * @param size      - sm | md | lg
 * @param hasError  - true when validationError is non-empty
 * @param className - consumer override, applied last via twMerge
 */
export function selectClass(size: SelectSize, hasError: boolean, className?: string): string {
  return twMerge(
    clsx(
      SELECT_BASE,
      SELECT_SIZE[size],
      hasError ? SELECT_STATE.error : SELECT_STATE.default,
      className
    )
  );
}
