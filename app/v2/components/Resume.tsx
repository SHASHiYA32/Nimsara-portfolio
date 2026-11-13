"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useReveals } from "@/lib/useReveals";
import { profile, resume } from "@/data/portfolio";

export default function Resume() {
  const root = useRef<HTMLElement>(null);
  useReveals(root);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".tl-line-fill",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: ".timeline", start: "top 70%", end: "bottom 60%", scrub: true },
        }
      );
      gsap.utils.toArray<HTMLElement>(".tl-item").forEach((it) => {
        gsap.fromTo(
          it.querySelector(".tl-dot"),
          { scale: 0 },
          { scale: 1, duration: 0.6, ease: "back.out(2)", scrollTrigger: { trigger: it, start: "top 70%", once: true } }
        );
      });
    }, root.current ?? undefined);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section resume" ref={root}>
      <div className="resume-side">
        <p className="label mono reveal-lines">
          <span className="line">
            <span className="inner">
              <b>(04)</b> Resume
            </span>
          </span>
        </p>
        <h2 className="h2 reveal-lines">
          <span className="line">
            <span className="inner">
              Experience
            </span>
          </span>
          <span className="line">
            <span className="inner">
              &amp; <em>education</em>
            </span>
          </span>
        </h2>
        <p className="resume-role mono" data-fade>
          <span className="dot" /> {resume.title}
        </p>
        <div className="resume-actions" data-fade>
          <a className="btn" href={profile.resumeUrl} download data-magnetic data-cursor-link>
            Download PDF copy <span aria-hidden>↓</span>
          </a>
        </div>
      </div>

      <div className="resume-main">
        <div className="card-box" data-fade>
          <h3 className="box-title">Professional Summary</h3>
          <p>{resume.summary}</p>
        </div>

        <h4 className="sub mono" data-fade>
          Work experience
        </h4>
        <div className="timeline">
          <div className="tl-line">
            <div className="tl-line-fill" />
          </div>
          {resume.experience.map((e) => (
            <div className="tl-item" key={e.role}>
              <span className="tl-dot" />
              <div className="tl-head">
                <h3>
                  {e.role} <span className="org">— {e.org}</span>
                </h3>
                <span className="mono period">{e.period}</span>
              </div>
              <p>{e.text}</p>
            </div>
          ))}
        </div>

        <h4 className="sub mono" data-fade>
          Education &amp; certifications
        </h4>
        <ul className="edu" data-stagger>
          {resume.education.map((e) => (
            <li key={e.title}>
              <h3>{e.title}</h3>
              <span className="mono">{e.status}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
