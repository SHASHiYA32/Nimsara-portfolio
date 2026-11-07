"use client";

import { useEffect, useRef, type FormEvent } from "react";
import { gsap } from "@/lib/gsap";
import { useSceneTarget } from "@/hooks/useSceneTarget";
import { TARGETS } from "@/lib/store";
import { lenisStore } from "@/lib/store";
import { profile } from "@/data/content";
import Words from "./Words";

export default function Contact() {
  const root = useRef<HTMLElement>(null);
  useSceneTarget(root, TARGETS.contact);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cta-title .w",
        { opacity: 0.12, yPercent: 40 },
        {
          opacity: 1,
          yPercent: 0,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: ".cta-title",
            start: "top 85%",
            end: "top 40%",
            scrub: true,
          },
        }
      );
      gsap.from(".contact-grid > *", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ".contact-grid", start: "top 85%", once: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`Project inquiry from ${f.get("name")}`);
    const body = encodeURIComponent(`${f.get("message")}\n\n— ${f.get("name")} (${f.get("email")})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  const toTop = () => {
    const lenis = lenisStore.current;
    if (lenis) lenis.scrollTo(0, { duration: 2 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section ref={root} id="contact" className="contact">
      <p className="eyebrow">( 04 ) Contact</p>
      <Words as="h2" className="cta-title" text="Let's build something great together." accent={["great"]} />

      <div className="contact-grid">
        <form className="form" onSubmit={submit}>
          <label>
            <span>Your name</span>
            <input name="name" required placeholder="Jane Doe" autoComplete="name" />
          </label>
          <label>
            <span>Email address</span>
            <input name="email" type="email" required placeholder="jane@company.com" autoComplete="email" />
          </label>
          <label>
            <span>Project details</span>
            <textarea name="message" required rows={4} placeholder="Tell me about your idea…" />
          </label>
          <button type="submit" className="btn btn-solid">
            Send inquiry ↗
          </button>
        </form>

        <div className="channels">
          <div>
            <span className="label">Email</span>
            <a href={`mailto:${profile.email}`} className="big-link">
              {profile.email}
            </a>
          </div>
          <div>
            <span className="label">Location</span>
            <p>{profile.location}</p>
          </div>
          <div>
            <span className="label">Elsewhere</span>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="big-link">
              GitHub ↗
            </a>
          </div>
        </div>
      </div>

      <footer className="footer">
        <span>© 2026 {profile.name}</span>
        <span>Built with Next.js · Three.js · GSAP</span>
        <button type="button" onClick={toTop}>
          Back to top ↑
        </button>
      </footer>
    </section>
  );
}
