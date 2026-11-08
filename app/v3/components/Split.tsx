import type { ElementType } from "react";

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
  /** Class applied to words written in parentheses, e.g. "(move)". */
  emClass?: string;
  /** chars: slide-up reveal. words: scroll-scrubbed opacity reveal. */
  mode?: "chars" | "words";
  delay?: number;
};

/**
 * Splits text into words/characters. V3Portfolio's effect finds [data-split] and animates it.
 * Words that start with "(" get emClass (serif italic accent).
 */
export default function Split({ text, as: Tag = "span", className, emClass, mode = "chars", delay = 0 }: Props) {
  return (
    <Tag className={className} data-split={mode} data-delay={delay} aria-label={text}>
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          aria-hidden
          className={word.startsWith("(") ? emClass : undefined}
          style={
            mode === "chars"
              ? { display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: "0.14em", marginBottom: "-0.14em" }
              : { display: "inline-block" }
          }
        >
          {mode === "chars" ? (
            [...word].map((c, j) => (
              <span key={j} data-char style={{ display: "inline-block", willChange: "transform" }}>
                {c}
              </span>
            ))
          ) : (
            <span data-word>{word}</span>
          )}
          {" "}
        </span>
      ))}
    </Tag>
  );
}
