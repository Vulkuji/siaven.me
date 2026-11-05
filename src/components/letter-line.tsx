import type { CSSProperties } from "react";

/** A display line split into letters, so each can respond to the mouse. */
export function LetterLine({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <span className={className} data-prox="" aria-hidden="true">
      {[...text].map((char, index) => (
        <span key={index} style={{ "--i": index } as CSSProperties}>
          {char === " " ? " " : char}
        </span>
      ))}
    </span>
  );
}
