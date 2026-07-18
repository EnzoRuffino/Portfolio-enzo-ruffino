export const site = {
  name: "Enzo Ruffino",
  title: "Full Stack Developer",
  email: "enzoruffino.pro@gmail.com",
  cv: "/CV_Part_Time_ENZO2026-1.pdf",
  github: "https://github.com/EnzoRuffino",
  linkedin: "https://www.linkedin.com/in/enzo-ruffino-06a80b2a8/",
  profileImage: "/profile.png",
  pocUrl: "https://poc-innovation.fr/",
  epitechUrl: "https://www.epitech.eu/",
  roleLine: [
    { type: "text", value: "R&D Developer @ " },
    { type: "link", label: "PoC Innovation", href: "https://poc-innovation.fr/" },
    { type: "text", value: " | Full Stack Developer | Second-year Computer Science Student @ " },
    { type: "link", label: "Epitech Lyon", href: "https://www.epitech.eu/" },
  ],
} as const;

export const navItems = [
  { id: "home", label: "Home" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "passions", label: "Passions" },
] as const;

export const skillGroups = [
  {
    label: "Languages",
    items: ["C", "C++", "Rust", "Python"],
  },
  {
    label: "Frontend",
    items: ["Vue.js", "React", "TypeScript", "GSAP"],
  },
  {
    label: "Backend",
    items: ["Node.js", "NestJS"],
  },
  {
    label: "Database",
    items: ["PostgreSQL", "Redis", "Prisma"],
  },
  {
    label: "DevOps",
    items: ["Docker", "GitHub Actions"],
  },
  {
    label: "Tools",
    items: ["Linear", "Notion", "GitHub"],
  },
] as const;

export type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image?: string;
  video?: string;
  siteUrl?: string;
  githubUrl?: string;
};

export const projects: Project[] = [
  {
    id: "01",
    title: "OptiCatalog",
    description:
      "Platform that helps e-commerce businesses automatically improve their product listings. (currently under development)",
    tags: ["TypeScript", "Vue", "Node"],
    image: "/opti_logo.png",
  },
  {
    id: "02",
    title: "DebtLint",
    description: "Debtlint is a technical debt detection tool focused on duplicated logic, built for the era of AI code generation.",
    tags: ["Rust"],
    image: "/logo.png",
    githubUrl: "https://github.com/PoCInnovation/Debtlint",
  },
  {
    id: "03",
    title: "RayTracer",
    description: "A modular C++ ray tracer that parses scenes, renders 3D objects with lighting, and outputs images using an extensible plugin-based architecture.",
    tags: ["C++"],
    image: "/box_8k.png",
    githubUrl: "https://github.com/EpitechPGE2-2025/G-OOP-400-LYN-4-1-raytracer-6",
  },
  {
    id: "04",
    title: "Zappy",
    description:
      "Zappy is a networked multiplayer game where AIs evolve on a map, gather resources, communicate, perform rituals to level up, and try to win for their team. I built the 2D isometric GUI in C++/SFML: it connects to the server, interprets the network protocol in real time, and renders the world state (map, players, resources, animations, HUD, and visual effects).",
    tags: ["C++", "SFML", "Network"],
    image: "/zappy.png",
    githubUrl: "https://github.com/EpitechPGE2-2025/G-YEP-400-LYN-4-1-zappy-8",
  },
  {
    id: "05",
    title: "Arcade",
    description:
      "Arcade is a modular C++ game engine where games and graphical libraries are loaded dynamically as shared libraries (.so) via dlopen/dlsym. The Core orchestrates execution and lets you hot-swap games or display backends without restarting, while each module implements a common interface (IGame, IDisplayLibrary, IMenu).",
    tags: ["C++", "dlopen", "OOP"],
    image: "/arcade.png",
    githubUrl: "https://github.com/EpitechPGE2-2025/G-OOP-400-LYN-4-1-arcade-13",
  },
  {
    id: "06",
    title: "CV.IA",
    description: "We built an AI-powered recruitment assistant that analyzes CVs, understands company needs in natural language, and instantly matches the most relevant candidates.",
    tags: ["Python", "JS", "OpenHosta"],
    image: "/portfolio-analyseur.png",
  },
  {
    id: "07",
    title: "Start Trek RL",
    description: "A PyTorch DQN agent learns to land a lunar module in Gymnasium’s LunarLander environment through reinforcement learning.",
    tags: ["Python"],
    video: "/portfolio-startrek.mp4",
  },
  {
    id: "08",
    title: "CVRIE",
    description: "Two ML pipelines applied to medical data: supervised classification (KNN, Logistic Regression, LinearSVC) to detect pneumonia from X-ray images, and unsupervised clustering (K-Means) to group patients by symptom.",
    tags: ["Python"],
    image: "/pneu.jpg",
  },
  {
    id: "09",
    title: "Top Chrono !",
    description: "Top Chrono is a gamified VS Code productivity extension that rewards developers for staying focused, managing breaks, and building discipline through ranks, medals, and customizable work modes..",
    tags: ["Typescript"],
    image: "/top1.png",
  },
  {
    id: "10",
    title: "Project in progress ... 🤫",
    description: "coming soon...",
    tags: ["???", "???"],
    image:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80",
  },
];

export const experiences = [
  {
    company: "PoC Innovation",
    role: "R&D Developer",
    period: "Avril 2026 — Present",
    description:
      "Contributing to R&D initiatives and innovative open-source projects at PoC, a student innovation center.",
  },
  {
    company: "EPITECH / TEK2",
    role: "Étudiant développeur",
    period: "Septembre 2024 — Present",
    description:
      "Technical projects, C/C++ bootcamps, web development, and systems programming.",
  },
  {
    company: "iLevel",
    role: "Full Stack Developer / Stage",
    period: "Août 2025 — Décembre 2025",
    description:
      "Developed internal tools to improve productivity and automate business workflows (complete ERP).",
  },
  {
    company: "Junior Conseil Taker",
    role: "National Sales Manager",
    period: "Juillet 2025 — Novembre 2025",
    description:
      "Structured, coordinated, and led commercial operations to uncover new opportunities, build an ambitious team, and drive sustainable revenue growth.",
  },
  {
    company: "Junior Conseil Taker",
    role: "Business Developer",
    period: "mai 2025 — juillet 2025",
    description:
      "Connected company needs with tomorrow's tech talent, from prospecting and scoping missions to delivering student-led consulting projects.",
  },
  {
    company: "Le Carré d'Herbe",
    role: "Kitchen Assistant",
    period: "juin 2024 — septembre 2024",
    description:
      "Learned the fundamentals of cooking, pastry, and customer service in a fast-paced environment.",
  },
] as const;

export const passions = [
  {
    title: "Développement",
    stat: "∞",
    statLabel: "lignes de code",
    description:
      "J'aime construire des produits de A à Z, expérimenter avec de nouvelles technos et pousser mes projets jusqu'au déploiement.",
  },
  {
    title: "Rap, R&B, Pop, Hip-Hop",
    stat: "Music",
    statLabel: "Genres",
    description:
      "I love listening to rap, R&B, pop, and hip-hop music. Every friday i listen all the new single and albums.",
  },
  {
    title: "multiplayer or solo",
    stat: "Video Games",
    statLabel: "curiosity",
    description:
      "I love playing video games. I'm a big fan of multiplayer games and solo games. (favorite games: Rainbow Six Siege, Cyberpunk 2077, Resident Evil, etc.)",
  },
] as const;

export const heroStats = [
  { value: "2+", label: "Années d'expérience" },
  { value: "10+", label: "Projets réalisés" },
  { value: "10+", label: "Technologies" },
  { value: "5+", label: "Hackathons" },
] as const;
