import { site, navItems } from "@/data/site";

type MobileNavProps = {
  activeSection: string;
  onNavigate: (id: string) => void;
};

export function MobileNav({ activeSection, onNavigate }: MobileNavProps) {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between border-b border-border bg-surface/90 px-4 py-3 backdrop-blur-md lg:hidden">
      <span className="font-display text-lg font-bold text-accent">ER</span>
      <nav className="flex gap-3 overflow-x-auto">
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onNavigate(item.id)}
            className={`shrink-0 font-mono text-[10px] uppercase tracking-wider ${
              activeSection === item.id ? "text-accent" : "text-white/50"
            }`}
          >
            {item.label.split(" ")[0]}
          </button>
        ))}
      </nav>
      <a
        href={site.github}
        target="_blank"
        rel="noreferrer"
        className="shrink-0 font-mono text-xs text-muted"
      >
        gh
      </a>
    </header>
  );
}
