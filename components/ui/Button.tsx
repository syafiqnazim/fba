import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "glass" | "glassDark";

const variantClass: Record<ButtonVariant, string> = {
  primary:
    "gradient-btn text-[var(--lp-on-accent,#ffffff)] shadow-lg shadow-[var(--lp-glow,rgba(0,173,239,0.25))]",
  secondary:
    "border border-[var(--lp-line,var(--color-line))] bg-[var(--lp-surface,var(--color-surface))]/80 text-[var(--lp-ink,var(--color-brand-deep))] hover:border-[var(--lp-brand,var(--brand))] hover:opacity-90",
  glass:
    "glass text-brand-deep hover:bg-white/70",
  glassDark:
    "border border-[var(--lp-glass-border,rgba(255,255,255,0.2))] bg-[var(--lp-glass,rgba(6,48,68,0.45))] text-[var(--lp-ink,#ffffff)] backdrop-blur-md hover:opacity-90",
};

type CommonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps & {
  href: string;
};

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const {
    children,
    variant = "primary",
    className = "",
  } = props;

  const classes = `group inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition active:scale-[0.98] ${variantClass[variant]} ${className}`;

  const content =
    variant === "primary" ? (
      <>
        {children}
        <span
          aria-hidden
          className="ml-2 inline-block transition-transform duration-300 ease-out group-hover:translate-x-1"
        >
          →
        </span>
      </>
    ) : (
      children
    );

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes}>
        {content}
      </Link>
    );
  }

  const { href: _href, ...buttonProps } = props as ButtonAsButton;
  void _href;

  return (
    <button {...buttonProps} className={classes}>
      {content}
    </button>
  );
}
