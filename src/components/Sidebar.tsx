import { site, navItems } from "@/data/site";

type SidebarProps = {
  activeSection: string;
  onNavigate: (id: string) => void;
};

export function Sidebar({ activeSection, onNavigate }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 z-50 hidden h-screen w-56 flex-col justify-between border-r border-border bg-surface/80 p-8 backdrop-blur-md lg:flex">
      <div>
        <p className="section-label mb-6">Social</p>
        <ul className="space-y-3 font-mono text-sm">
          <li>
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="text-white/70 transition-colors hover:text-accent"
            >
              github
            </a>
          </li>
          <li>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-white/70 transition-colors hover:text-accent"
            >
              linkedin
            </a>
          </li>
          <li>
            <a
              href={`mailto:${site.email}`}
              className="text-white/70 transition-colors hover:text-accent"
            >
              email
            </a>
          </li>
          <li>
            <a
              href={site.cv}
              target="_blank"
              rel="noreferrer"
              className="text-white/70 transition-colors hover:text-accent"
            >
              cv
            </a>
          </li>
        </ul>
      </div>

      <nav>
        <p className="section-label mb-6">Menu</p>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`font-mono text-sm transition-colors ${
                  activeSection === item.id
                    ? "text-accent"
                    : "text-white/50 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div>
        <p className="section-label mb-2">Hire me</p>
        <a
          href={`mailto:${site.email}`}
          className="font-mono text-xs text-white/60 transition-colors hover:text-accent"
        >
          {site.email}
        </a>
      </div>
    </aside>
  );
}
