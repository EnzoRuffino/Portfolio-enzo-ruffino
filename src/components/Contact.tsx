import { site } from "@/data/site";

export function Contact() {
  return (
    <footer className="border-t border-border px-6 py-24 lg:pl-64 lg:pr-16">
      <p className="section-label">Contact</p>
      <h2 className="mt-4 font-display text-[clamp(2rem,6vw,4rem)] font-bold leading-tight">
        Have a project
        <br />
        <span className="text-accent">in mind?</span>
      </h2>

      <a
        href={`mailto:${site.email}`}
        className="mt-8 inline-block font-mono text-lg text-white/70 transition-colors hover:text-accent"
      >
        {site.email}
      </a>

      <div className="mt-16 flex flex-wrap gap-8 font-mono text-sm">
        <a
          href={site.github}
          target="_blank"
          rel="noreferrer"
          className="text-muted transition-colors hover:text-accent"
        >
          GitHub →
        </a>
        <a
          href={site.linkedin}
          target="_blank"
          rel="noreferrer"
          className="text-muted transition-colors hover:text-accent"
        >
          LinkedIn →
        </a>
      </div>

      <p className="mt-20 font-mono text-xs text-muted">
        © {new Date().getFullYear()} {site.name.toUpperCase()}
      </p>
    </footer>
  );
}
