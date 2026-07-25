import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer" | "main";
};

export function Container({
  children,
  className = "",
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag className={`mx-auto w-full max-w-5xl px-4 sm:px-6 ${className}`}>
      {children}
    </Tag>
  );
}
