"use client";
import { useCallback, useState } from "react";

/** <img> that fades in once loaded and stays invisible if it fails (the gradient behind it remains). */
export default function SafeImg({ className = "", ...props }: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [ok, setOk] = useState(false);
  const ref = useCallback((el: HTMLImageElement | null) => {
    if (el && el.complete && el.naturalWidth > 0) setOk(true);
  }, []);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...props}
      ref={ref}
      alt={props.alt ?? ""}
      crossOrigin="anonymous"
      className={`${className} fade-img${ok ? " is-loaded" : ""}`}
      onLoad={() => setOk(true)}
    />
  );
}
