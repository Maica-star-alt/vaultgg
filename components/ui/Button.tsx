import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const base = "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none text-sm";

const variants = {
  primary: "bg-accent text-black hover:bg-accent-dark active:scale-95",
  secondary: "border border-border bg-bg-elevated text-ink hover:border-accent/50 hover:bg-bg-elevated",
  ghost: "text-ink-muted hover:text-ink",
  danger: "bg-negative/10 text-negative border border-negative/30 hover:bg-negative/20",
  success: "bg-positive/10 text-positive border border-positive/30 hover:bg-positive/20",
};

const sizes = { sm: "h-8 px-3 text-xs", md: "h-10 px-5", lg: "h-12 px-7 text-base" };

type V = keyof typeof variants;
type S = keyof typeof sizes;

interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> { variant?: V; size?: S; }
export const Button = forwardRef<HTMLButtonElement, BtnProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => (
    <button ref={ref} className={cn(base, variants[variant], sizes[size], className)} {...props} />
  )
);
Button.displayName = "Button";

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> { variant?: V; size?: S; }
export const ButtonLink = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => (
    <a ref={ref} className={cn(base, variants[variant], sizes[size], className)} {...props} />
  )
);
ButtonLink.displayName = "ButtonLink";
