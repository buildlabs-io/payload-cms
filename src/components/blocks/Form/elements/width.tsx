import type { ReactNode } from "react";

type WidthProps = {
  children: ReactNode;
  className?: string;
  width?: number | string | null;
};

export default function Width({ children, className, width }: WidthProps) {
  return (
    <div
      className={className}
      style={{ maxWidth: width ? `${width}%` : undefined }}
    >
      {children}
    </div>
  );
}
