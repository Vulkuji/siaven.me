import type { CSSProperties } from "react";

export function SplitText({ text }: { text: string }) {
  return [...text].map((char, index) => (
    <span key={index} style={{ "--i": index } as CSSProperties}>
      {char === " " ? " " : char}
    </span>
  ));
}
