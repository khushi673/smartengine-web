import { ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger-line";
type Size = "md" | "sm";

const base =
  "inline-flex items-center justify-center gap-1.5 rounded-[9px] font-display font-bold transition-all active:scale-[0.98] disabled:opacity-40 disabled:active:scale-100 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--t-primary,var(--brand))]";

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--t-primary,var(--brand))] text-white shadow-[0_8px_18px_-8px_color-mix(in_srgb,var(--t-primary,var(--brand))_55%,transparent)] hover:bg-[var(--t-primary-strong,var(--brand-strong))]",
  secondary:
    "bg-transparent text-[var(--t-primary,var(--brand))] border-[1.5px] border-[var(--border-strong)] hover:bg-[var(--surface)]",
  ghost: "bg-transparent text-[var(--muted)] hover:text-[var(--ink-strong)] font-semibold",
  "danger-line": "bg-transparent text-[var(--danger-text)] border-[1.5px] border-[var(--danger-solid)]",
};

const sizes: Record<Size, string> = {
  md: "px-4.5 py-2.5 text-[13.5px]",
  sm: "px-3 py-1.5 text-[12.5px] rounded-[7px]",
};

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  block?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ variant = "primary", size = "md", block, className = "", ...rest }, ref) => (
    <button
      ref={ref}
      className={`${base} ${variants[variant]} ${sizes[size]} ${block ? "w-full" : ""} ${className}`}
      {...rest}
    />
  )
);
Button.displayName = "Button";
