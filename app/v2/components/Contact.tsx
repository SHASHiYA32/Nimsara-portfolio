"use client";
import { useRef } from "react";
import { useReveals } from "@/lib/useReveals";
import { scrollToId } from "@/lib/lenis";
import { profile } from "@/data/portfolio";

export default function Contact() {
  const root = useRef<HTMLElement>(null);
  useReveals(root);

  // No backend needed: the form opens the visitor's mail app with the message pre-filled.
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`Project inquiry from ${f.get("name")}`);
    const body = encodeURIComponent(`${f.get("message")}\n\n— ${f.get("name")} (${f.get("email")})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section className="section contact" ref={root}>
      <p className="label mono reveal-lines">
        <span className="line">
          <span className="inner">
            <b>(05)</b> Contact
          </span>
        </span>
      </p>

      <h2 className="h1 reveal-lines">
        <span className="line">
          <span className="inner">Let&apos;s build</span>
        </span>
        <span className="line">
          <span className="inner">
            something <em>great</em>.
          </span>
        </span>
      </h2>

      <div className="contact-grid">
        <form className="form" onSubmit={submit} data-fade>
          <label>
            <span className="mono">Name</span>
            <input name="name" required placeholder="Your name" autoComplete="name" />
          </label>
          <label>
            <span className="mono">Email</span>
            <input name="email" type="email" required placeholder="you@company.com" autoComplete="email" />
          </label>
          <label>
            <span className="mono">Project details</span>
            <textarea name="message" required rows={4} placeholder="Tell me about your project…" />
          </label>
          <button className="btn" type="submit" data-magnetic data-cursor-link>
            Send inquiry <span aria-hidden>→</span>
          </button>
        </form>

        <div className="details" data-stagger>
          <a href={`mailto:${profile.email}`} data-cursor-link>
            <span className="mono">Email</span>
            {profile.email}
          </a>
          <a href={`tel:${profile.phone.replace(/\s/g, "")}`} data-cursor-link>
            <span className="mono">Phone</span>
            {profile.phone}
          </a>
          <div>
            <span className="mono">Location</span>
            {profile.location}
          </div>
          <a href={profile.github} target="_blank" rel="noreferrer" data-cursor-link>
            <span className="mono">GitHub</span>
            {profile.githubHandle} ↗
          </a>
        </div>
      </div>

      <footer className="footer mono">
        <span>© 2026 {profile.name}</span>
        <span className="status">
          <i className="dot" /> Available for work · replies within 24h
        </span>
        <button onClick={() => scrollToId("top")} data-cursor-link>
          Back to top ↑
        </button>
      </footer>
    </section>
  );
}
