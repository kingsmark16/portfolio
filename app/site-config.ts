const configuredSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.VERCEL_PROJECT_PRODUCTION_URL ??
  process.env.VERCEL_URL ??
  "https://your-domain.example";

function normalizeSiteUrl(value: string) {
  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  return withProtocol.replace(/\/+$/, "");
}

export const siteConfig = {
  name: "Mark Angel Concina",
  title: "Mark Angel Concina | Full Stack Developer",
  description:
    "Mark Angel Concina is a full stack developer in Camarines Sur, Philippines, building accessible web applications with React, Next.js, Node.js, and cloud tools.",
  url: normalizeSiteUrl(configuredSiteUrl),
  email: "mrkconcina@gmail.com",
  telephone: "+639694451271",
  lastModified: "2026-08-04",
  keywords: [
    "Mark Angel Concina",
    "full stack developer Philippines",
    "React developer Philippines",
    "Next.js developer",
    "TypeScript developer",
    "Node.js developer",
    "accessible web applications",
    "responsive web design",
    "web developer Philippines",
    "software developer Philippines",
    "full stack web development",
    "frontend developer",
    "backend developer",
    "frontend development",
    "backend development",
    "REST API development",
    "React.js development",
    "Next.js development",
    "Node.js backend development",
    "PostgreSQL database",
    "MongoDB developer",
    "Prisma ORM",
    "Tailwind CSS development",
    "Docker deployment",
    "Azure deployment",
    "Vercel deployment",
    "GitHub Actions",
    "cloud deployment",
    "Camarines Sur developer",
    "Partido State University graduate",
  ],
  socialLinks: {
    github: "https://github.com/kingsmark16",
    facebook: "https://www.facebook.com/share/1DpPArN84v/",
    linkedin: "https://www.linkedin.com/in/mark-angel-concina-32a677354",
    instagram: "https://www.instagram.com/mc.anghel?igsh=YmJ2Nm9iejlpOHV0",
    tiktok: "https://www.tiktok.com/@kingsmark16?_r=1&_t=ZS-98bL5TpSdXB",
  },
} as const;
