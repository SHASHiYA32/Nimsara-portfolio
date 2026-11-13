"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { img, projects, profile } from "@/data/portfolio";
import ProjectModal from "./ProjectModal";
import SafeImg from "./SafeImg";

/** Vertical scroll drives a pinned horizontal track of project cards. */
export default function Projects() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const dist = () => Math.max(0, track.current!.scrollWidth - window.innerWidth);
      const tween = gsap.to(track.current, {
        x: () => -dist(),
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: () => `+=${dist()}`,
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`;
          },
        },
      });

      // parallax inside each card while it crosses the screen
      gsap.utils.toArray<HTMLElement>(".card").forEach((card) => {
        gsap.fromTo(
          card.querySelector("img"),
          { xPercent: 7 },
          {
            xPercent: -7,
            ease: "none",
            scrollTrigger: { trigger: card, containerAnimation: tween, start: "left right", end: "right left", scrub: true },
          }
        );
      });

      // intro heading
      gsap.set(".hintro .inner", { yPercent: 115, opacity: 1 });
      gsap.to(".hintro .inner", {
        yPercent: 0,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.1,
        scrollTrigger: { trigger: section.current, start: "top 70%", once: true },
      });
    }, section.current ?? undefined);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <section className="hscroll" ref={section}>
        <div className="htrack" ref={track}>
          <div className="hintro">
            <p className="label mono">
              <b>(02)</b> Project overviews
            </p>
            <h2 className="h2">
              <span className="line">
                <span className="inner">Selected</span>
              </span>
              <span className="line">
                <span className="inner">
                  <em>work</em> <sup className="mono">({String(projects.length).padStart(2, "0")})</sup>
                </span>
              </span>
            </h2>
            <p className="hint mono">
              Keep scrolling <span aria-hidden>→</span> click a project for the overview
            </p>
          </div>

          {projects.map((p, i) => (
            <article
              key={p.title}
              className="card"
              tabIndex={0}
              role="button"
              aria-label={`Open overview: ${p.title}`}
              data-cursor="View"
              onClick={() => setActive(i)}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setActive(i)}
            >
              <div className="card-media" style={{ background: `linear-gradient(135deg, ${p.colors[0]}, ${p.colors[1]})` }}>
                <SafeImg src={img(p.image, 1400)} alt="" loading="eager" />
                <span className="card-num mono">{p.index}</span>
                <span className="card-open" aria-hidden>
                  ↗
                </span>
              </div>
              <div className="card-meta">
                <h3>{p.title}</h3>
                <span className="mono">{p.category}</span>
              </div>
              <ul className="chips">
                {p.tech.slice(0, 4).map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </article>
          ))}

          <div className="hend">
            <p className="mono">More on GitHub</p>
            <a className="h3-link" href={profile.github} target="_blank" rel="noreferrer" data-cursor-link>
              {profile.githubHandle} <span aria-hidden>↗</span>
            </a>
          </div>
        </div>
        <div className="hprogress" aria-hidden>
          <div ref={bar} />
        </div>
      </section>

      {active !== null && <ProjectModal index={active} onChange={setActive} onClose={() => setActive(null)} />}
    </>
  );
}
