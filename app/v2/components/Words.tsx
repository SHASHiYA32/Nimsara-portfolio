import { Fragment, type ElementType } from "react";

type Props = {
  text: string;
  accent?: string[];
  as?: ElementType;
  className?: string;
};

/** Splits text into word spans (`.w`) so GSAP can reveal them one by one. */
export default function Words({ text, accent = [], as: Tag = "p", className }: Props) {
  return (
    <Tag className={className}>
      {text.split(" ").map((word, i) => (
        <Fragment key={i}>
          <span className={`w${accent.includes(word) ? " accent" : ""}`}>{word}</span>{" "}
        </Fragment>
      ))}
    </Tag>
  );
}
