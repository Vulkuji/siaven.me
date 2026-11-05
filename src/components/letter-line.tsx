import type { CSSProperties } from "react";

/** A display line split into letters, so each can respond to the mouse. */
export function LetterLine({
  text,
  className,
  start = 0,
  serif = false,
}: {
  text: string;
  className?: string;
  start?: number;
  serif?: boolean;
}) {
  return (
    <span
      className={className}
      data-prox={serif ? "serif" : "sans"}
      aria-hidden="true"
    >
      {[...text].map((char, index) => (
        <span key={index} style={{ "--i": start + index } as CSSProperties}>
          {char === " " ? " " : char}
        </span>
      ))}
    </span>
  );
}
