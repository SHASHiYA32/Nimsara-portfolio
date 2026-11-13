"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent, MouseEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Scene from "./Scene";
import LiquidCursor from "./LiquidCursor";
import Split from "./Split";
import { profile, capabilities, projects, experience, nav } from "../data";
import styles from "../v3.module.css";

export default function V3Portfolio() {
  const rootRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      // Loader: 000% -> 100%, then the panel slides away
      const counter = { v: 0 };
      gsap
        .timeline()
        .to(counter, {
          v: 100,
          duration: 1.6,
          ease: "power2.inOut",
          onUpdate: () => {
            if (countRef.current) countRef.current.textContent = String(Math.round(counter.v)).padStart(3, "0") + "%";
            if (barRef.current) barRef.current.style.transform = `scaleX(${counter.v / 100})`;
          },
        })
        .to(loaderRef.current, { yPercent: -100, duration: 1, ease: "power4.inOut" })
        .set(loaderRef.current, { display: "none" });

      // Character reveals
      gsap.utils.toArray<HTMLElement>("[data-split='chars']").forEach((el) => {
        gsap.from(el.querySelectorAll("[data-char]"), {
          yPercent: 115,
          rotate: 5,
          duration: 1.15,
          ease: "power4.out",
          stagger: 0.022,
          delay: Number(el.dataset.delay || 0),
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      // Scroll-scrubbed word reveal
      gsap.utils.toArray<HTMLElement>("[data-split='words']").forEach((el) => {
        gsap.fromTo(
          el.querySelectorAll("[data-word]"),
          { opacity: 0.12 },
          {
            opacity: 1,
            stagger: 0.12,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: true },
          }
        );
      });

      // Generic fade-up
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          delay: Number(el.dataset.delay || 0),
          scrollTrigger: { trigger: el, start: "top 90%" },
        });
      });

      // Horizontal scroll for projects (pinned)
      const track = trackRef.current;
      const wrap = wrapRef.current;
      if (track && wrap) {
        const dist = () => Math.max(track.scrollWidth - window.innerWidth, 0);
        gsap.to(track, {
          x: () => -dist(),
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => "+=" + dist(),
            invalidateOnRefresh: true,
          },
        });
      }

      // Experience line fill
      gsap.to("[data-expfill]", {
        scaleY: 1,
        ease: "none",
        scrollTrigger: { trigger: "[data-explist]", start: "top 70%", end: "bottom 60%", scrub: true },
      });

      // Page progress bar
      gsap.to("[data-progress]", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { trigger: root, start: "top top", end: "bottom bottom", scrub: 0.3 },
      });

      // Dark / light theme per section (created after the pin so positions are right)
      gsap.utils.toArray<HTMLElement>("[data-theme-section]").forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => {
            if (self.isActive) root.dataset.theme = el.dataset.themeSection;
          },
        });
      });
    }, root);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    if (document.fonts?.ready) document.fonts.ready.then(refresh);

    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (id: string) => (e: MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const send = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`Project enquiry from ${f.get("name")}`);
    const body = encodeURIComponent(`${f.get("project")}\n\n— ${f.get("name")} (${f.get("email")})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div ref={rootRef} className={styles.root} data-theme="dark">
      <div ref={loaderRef} className={styles.loader}>
        <div className={styles.loaderTop}>
          <span>{profile.name}</span>
          <span>Loading the scene</span>
        </div>
        <div>
          <div className={styles.loaderCount}>
            <span ref={countRef}>000%</span>
          </div>
          <div className={styles.loaderBar}>
            <div ref={barRef} className={styles.loaderBarFill} />
          </div>
        </div>
      </div>

      <div data-progress className={styles.progress} />
      <LiquidCursor />
      <Scene />

      <header className={styles.nav}>
        <a href="#top" className={styles.brand} onClick={go("top")}>
          {/* {profile.first.toUpperCase()} */}
          SN.
        </a>
        <nav className={styles.navLinks}>
          {nav.map((n) => (
            <a key={n.id} href={`#${n.id}`} onClick={go(n.id)}>
              {n.label}
            </a>
          ))}
          <a href="#contact" className={styles.navCta} onClick={go("contact")}>
            Hire me
          </a>
        </nav>
      </header>

      {/* 1 · HERO (dark) */}
      <section id="top" data-v3-section data-theme-section="dark" className={`${styles.sec} ${styles.hero}`}>
        <h1 className={styles.heroTitle}>
          <Split text={profile.first} delay={2.4} />
          <br />
          <Split text={`${profile.last}.`} delay={2.55} />
        </h1>
        <div className={styles.heroRow}>
          <p className={styles.heroSub} data-reveal data-delay={2.9}>
            {profile.role}. {profile.intro}
          </p>
          <div className={styles.avail} data-reveal data-delay={3}>
            <span className={styles.dot} /> Available for new projects
          </div>
        </div>
        <div className={styles.cue}>
          Scroll to explore
          <span className={styles.cueLine} />
        </div>
      </section>

      {/* 2 · ABOUT (dark) */}
      <section id="about" data-v3-section data-theme-section="dark" className={styles.sec}>
        <div className={styles.eyebrow}>(01) About</div>
        <Split as="p" mode="words" className={styles.statement} text={profile.about} />
        <div className={styles.stats}>
          {profile.stats.map((s) => (
            <div key={s.label} className={styles.stat} data-reveal>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3 · SERVICES (light) */}
      <section id="capabilities" data-v3-section data-theme-section="light" className={styles.sec} style={{ paddingTop: "12vh", paddingBottom: "12vh" }}>
        <div className={styles.eyebrow}>(02) Services</div>
        <h2 className={`${styles.heading} mix-blend-difference text-black`}>
          <Split emClass={styles.em} text="Ideas that (move)," />
          <br />
          <Split emClass={styles.em} text="built to (last)." />
        </h2>
        <div className={`${styles.capList} mix-blend-difference text-black`}>
          {capabilities.map((c) => (
            <div key={c.no} className={styles.cap} data-reveal data-cursor>
              <span className={styles.capNo}>{c.no}</span>
              <h3 className={styles.capTitle}>{c.title}</h3>
              <p className={`${styles.capText} mix-blend-difference text-black`}>{c.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4 · WORK (light, pinned horizontal) */}
      <section id="work" data-v3-section data-theme-section="light" className={styles.workSec}>
        <div ref={wrapRef} className={styles.workWrap}>
          <div className={styles.workHead}>
            <div className={styles.eyebrow}>(03) Selected work</div>
            <h2 className={styles.heading}>
              <Split emClass={styles.em} text="Things I've (made)." />
            </h2>
          </div>
          <div ref={trackRef} className={styles.track}>
            {projects.map((p) => {
              const inner = (
                <>
                  <div className={styles.cardTop}>
                    <span>{p.category}</span>
                    <span className={styles.cardNo}>{p.no}</span>
                  </div>
                  <div>
                    <h3 className={styles.cardTitle}>{p.title}</h3>
                    <span className={styles.cardStack}>{p.stack}</span>
                    <p className={styles.cardText}>{p.text}</p>
                    {p.href && <span className={styles.watch}>Visit ↗</span>}
                  </div>
                </>
              );
              return p.href ? (
                <a key={p.no} className={styles.card} data-cursor href={p.href} target="_blank" rel="noreferrer">
                  {inner}
                </a>
              ) : (
                <div key={p.no} className={styles.card} data-cursor>
                  {inner}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5 · EXPERIENCE (dark) */}
      <section id="experience" data-v3-section data-theme-section="dark" className={styles.sec} style={{ paddingTop: "14vh", paddingBottom: "10vh" }}>
        <div className={styles.eyebrow}>(04) Experience</div>
        <h2 className={styles.heading}>
          <Split emClass={styles.em} text="Where I've (worked)." />
        </h2>
        <div data-explist className={styles.expList}>
          <div className={styles.expLine} />
          <div data-expfill className={styles.expLineFill} />
          {experience.map((e) => (
            <div key={e.role + e.org} className={styles.exp} data-reveal>
              <div className={styles.expPeriod}>{e.period}</div>
              <h3 className={styles.expRole}>
                {e.role} <span>@ {e.org}</span>
              </h3>
              <p className={styles.expText}>{e.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6 · RESUME (light) */}
      <section id="resume" data-v3-section data-theme-section="light" className={styles.sec}>
        <div className={styles.resumeGrid}>
          <div className={styles.resumeCopy}>
            <div className={styles.eyebrow}>(05) Resume</div>
            <h2 className={styles.heading}>
              <Split emClass={styles.em} text="The (short) version." />
            </h2>
            <div className={styles.btnRow} data-reveal>
              <button type="button" className={`${styles.btn} ${styles.btnAcc}`} onClick={() => setOpen(true)}>
                View full size
              </button>
              <a className={styles.btn} href="/resume/resume.jpg" download="Shashintha-Nimsara-Resume.jpg">
                Download
              </a>
            </div>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/resume/resume.jpg"
            alt={`${profile.name} resume`}
            className={styles.resumeImg}
            data-reveal
            data-cursor
            onClick={() => setOpen(true)}
          />
        </div>
      </section>

      {/* 7 · CONTACT (dark) */}
      <section id="contact" data-v3-section data-theme-section="dark" className={`${styles.sec} ${styles.contact}`}>
        <div className={styles.eyebrow}>(06) Contact</div>
        <h2 className={styles.heading}>
          <Split emClass={styles.em} text="Got a project?" />
          <br />
          <Split emClass={styles.em} text="Let's (talk)." />
        </h2>
        <form className={styles.form} onSubmit={send} data-reveal>
          <div className={styles.field}>
            <label htmlFor="v3-name">Name</label>
            <input id="v3-name" name="name" required autoComplete="name" />
          </div>
          <div className={styles.field}>
            <label htmlFor="v3-email">Email</label>
            <input id="v3-email" name="email" type="email" required autoComplete="email" />
          </div>
          <div className={styles.field}>
            <label htmlFor="v3-project">The project</label>
            <textarea id="v3-project" name="project" rows={3} required />
          </div>
          <div className={styles.formRow}>
            <button type="submit" className={`${styles.btn} ${styles.btnAcc}`}>
              Send it over ↗
            </button>
            <a className={styles.mailLink} href={`mailto:${profile.email}`}>
              or {profile.email}
            </a>
          </div>
        </form>
        <div className={styles.socials}>
          {profile.socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
              {s.label} ↗
            </a>
          ))}
        </div>
      </section>

      <footer className={styles.foot}>
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <span>Portfolio v3</span>
      </footer>

      {open && (
        <div className={styles.lightbox} onClick={() => setOpen(false)} role="dialog" aria-label="Resume">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/resume/resume.jpg" alt={`${profile.name} resume`} />
        </div>
      )}
    </div>
  );
}
