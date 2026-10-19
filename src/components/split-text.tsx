import { Fragment, type CSSProperties } from "react";

export function SplitText({ text }: { text: string }) {
  let count = 0;
  const words = text
    .split(" ")
    .reduce<string[]>(
      (list, word) =>
        word === "·" && list.length
          ? [...list.slice(0, -1), `${list[list.length - 1]}\u00a0·`]
          : [...list, word],
      [],
    );
  return words.map((word, wordIndex) => (
    <Fragment key={wordIndex}>
      {wordIndex > 0 && " "}
      <span className="split-word">
        {[...word].map((char) => {
          const index = count++;
          return (
            <span
              key={index}
              className="split-char"
              style={{ "--i": index } as CSSProperties}
            >
              {char}
            </span>
          );
        })}
      </span>
    </Fragment>
  ));
}
