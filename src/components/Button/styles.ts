import { twMerge } from "tailwind-merge";
import clsx from "clsx";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "info"
  | "warning"
  | "transparent"
  | "icon";

export type ButtonSize = "sm" | "md" | "lg";

export const BASE =
  "inline-flex items-center justify-center gap-2 font-body font-medium tracking-ui rounded-md transition-all duration-150 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 " +
  "disabled:pointer-events-none disabled:opacity-60 cursor-pointer select-none";

export const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary:     "bg-accent text-white hover:opacity-90",
  secondary:   "bg-surface text-ink border border-line hover:bg-bg",
  danger:      "bg-danger text-white hover:opacity-90",
  info:        "bg-info text-white hover:opacity-90",
  warning:     "bg-warning text-white hover:opacity-90",
  transparent: "bg-transparent text-muted hover:text-ink hover:bg-line-2",
  icon:        "bg-transparent text-ink hover:bg-line-2",
};

export const SIZE_STYLES: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-5 text-base",
};

export const ICON_SIZE_STYLES: Record<ButtonSize, string> = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
};

export function buttonClass(
  variant: ButtonVariant,
  size: ButtonSize,
  fullWidth?: boolean,
  className?: string
): string {
  const isIcon = variant === "icon";
  return twMerge(
    clsx(
      BASE,
      VARIANT_STYLES[variant],
      isIcon ? ICON_SIZE_STYLES[size] : SIZE_STYLES[size],
      fullWidth && !isIcon && "w-full",
      className
    )
  );
}
