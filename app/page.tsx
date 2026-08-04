import Image from "next/image";
import {
  ArrowDown,
  ArrowRight,
  Award,
  Boxes,
  BriefcaseBusiness,
  CircleDot,
  CloudUpload,
  Code2,
  Gauge,
  Gamepad2,
  GraduationCap,
  Layers3,
  Menu,
  MapPin,
  MonitorSmartphone,
  Triangle,
  Users,
  Wifi,
  Cloud,
  Database,
  GitBranch,
  Server,
} from "lucide-react";
import GitHubActivity from "./components/GitHubActivity";
import CapstoneCarousel from "./components/CapstoneCarousel";
import CollegeRageCarousel from "./components/CollegeRageCarousel";
import PortfolioMotion from "./components/PortfolioMotion";
import { siteConfig } from "./site-config";

const capstoneStack = [
  "JavaScript",
  "React",
  "ExpressJS",
  "NodeJS",
  "Prisma",
  "PostgreSQL",
  "TailwindCSS",
  "Clerk",
  "Render",
];

const projects = [
  {
    name: "College Rage",
    eyebrow: "Digital memory vault",
    description:
      "A place for preserving and reliving college photos and videos through an interactive gallery with music, with a secure admin dashboard for Dropbox backed media management and visitor analytics.",
    stack: ["TypeScript", "React", "ExpressJS", "NodeJS", "Prisma", "Docker", "Azure", "PostgreSQL", "Neon Auth"],
    variant: "gallery",
    liveDemo: "https://collegerage-fzahg5ekarathpf3.southeastasia-01.azurewebsites.net/",
    sourceCode: "https://github.com/kingsmark16/CollegeRage",
  },
  {
    name: "Heuristic Evaluation & Web Reporting Site",
    eyebrow: "Reporting site",
    description:
      "A single page report viewer that organizes evaluated systems, usability problems, task lists, a heuristic workbook, conclusions, and proposed interface improvements.",
    stack: ["JavaScript", "React", "TailwindCSS", "Vercel"],
    variant: "report",
    liveDemo: 'https://hewrs.vercel.app',
    sourceCode: 'https://github.com/kingsmark16/heuristic-evaluation-web-reporting-site',
  },
  {
    name: "Dearly",
    eyebrow: "Personalized message pages",
    description:
      "A platform for creating personalized webpages for heartfelt messages, celebrations, confessions, and meaningful occasions, then sharing them through a unique link.",
    stack: ["TypeScript", "NextJS", "NestJS", "NodeJS", "TailwindCSS", "PostgreSQL", "Better Auth", "Prisma", "Docker", "Azure", "Vercel", "GitHub Actions"],
    variant: "message",
    liveDemo: null,
    sourceCode: null,
  },
] as const;

const toolkit = [
  { title: "Languages", items: ["JavaScript", "TypeScript"] },
  { title: "Frontend", items: ["HTML", "CSS", "React", "Next.js", "Tailwind CSS"] },
  { title: "Backend", items: ["Node.js", "ExpressJS", "NestJS", "REST APIs"] },
  { title: "Data", items: ["PostgreSQL", "MySQL", "MongoDB", "Prisma"] },
  { title: "Delivery", items: ["Docker", "Azure", "Render", "Vercel", "GitHub Actions"] },
  { title: "Currently learning", items: ["Testing", "DevOps", "Cloud"] },
];

const skillIcons = {
  HTML: Code2,
  CSS: Code2,
  JavaScript: Code2,
  TypeScript: Code2,
  React: Boxes,
  "Next.js": Layers3,
  "Tailwind CSS": Code2,
  "Node.js": Server,
  ExpressJS: Server,
  NestJS: Boxes,
  "REST APIs": Wifi,
  PostgreSQL: Database,
  MySQL: Database,
  MongoDB: Database,
  Prisma: Database,
  Testing: Gauge,
  DevOps: GitBranch,
  Cloud: CloudUpload,
  "Cloud deployment": CloudUpload,
  Docker: Boxes,
  Azure: Cloud,
  Render: Cloud,
  Vercel: Triangle,
  "GitHub Actions": GitBranch,
} satisfies Record<string, typeof Code2>;

const skillIconSources: Record<string, string> = {
  HTML: "/HTML5.png",
  CSS: "/CSS3.png",
  JavaScript: "/js.png",
  TypeScript: "/typescript.png",
  React: "/React (1).png",
  "Next.js": "/Next.js.png",
  "Tailwind CSS": "/Tailwind CSS.png",
  "Node.js": "/nodejs.png",
  ExpressJS: "/icons8-express-js-50.png",
  NestJS: "/icons8-nestjs-144.png",
  "REST APIs": "/icons8-rest-api-96.png",
  PostgreSQL: "/icons8-postgresql-48.png",
  MySQL: "/icons8-mysql-logo-48.png",
  MongoDB: "/MongoDB.png",
  Prisma: "/icons8-prisma-orm-100.png",
  Docker: "/Docker.png",
  Azure: "/Azure.png",
  Vercel: "/Vercel.png",
  "GitHub Actions": "/GitHub Actions.png",
};

function SkillIcon({ name }: { name: string }) {
  const source = skillIconSources[name];
  if (source) {
    return <Image src={source} alt="" width={24} height={24} />;
  }

  const Icon = skillIcons[name as keyof typeof skillIcons] ?? Code2;
  return <Icon aria-hidden="true" />;
}

const personId = `${siteConfig.url}/#person`;
const websiteId = `${siteConfig.url}/#website`;
const profilePageId = `${siteConfig.url}/#profile`;
const profileImageUrl = `${siteConfig.url}/mark-angel.png`;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": personId,
      name: "Mark Angel Concina",
      jobTitle: "Full Stack Developer",
      url: siteConfig.url,
      description: siteConfig.description,
      image: profileImageUrl,
      email: siteConfig.email,
      telephone: siteConfig.telephone,
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Partido State University",
      },
      sameAs: Object.values(siteConfig.socialLinks),
      knowsAbout: [
        "Full stack development",
        "Accessible web applications",
        "JavaScript",
        "TypeScript",
        "React",
        "Next.js",
        "Node.js",
        "PostgreSQL",
        "Prisma",
        "Docker",
        "Azure",
      ],
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: siteConfig.url,
      name: siteConfig.title,
      description: siteConfig.description,
      inLanguage: "en-PH",
      publisher: { "@id": personId },
    },
    {
      "@type": "ProfilePage",
      "@id": profilePageId,
      url: siteConfig.url,
      name: siteConfig.title,
      description: siteConfig.description,
      inLanguage: "en-PH",
      dateModified: siteConfig.lastModified,
      isPartOf: { "@id": websiteId },
      about: { "@id": personId },
      mainEntity: { "@id": personId },
      primaryImageOfPage: {
        "@type": "ImageObject",
        "@id": `${siteConfig.url}/#primary-image`,
        url: profileImageUrl,
        width: 971,
        height: 1619,
        caption: "Portrait of Mark Angel Concina",
      },
    },
  ],
};

function ProjectVisual({ variant }: { variant: (typeof projects)[number]["variant"] }) {
  if (variant === "gallery") {
    return <CollegeRageCarousel />;
  }

  if (variant === "report") {
    return (
      <div className="project-visual single-project-image" aria-label="Heuristic Evaluation reporting site">
        <Image src="/hue.png" alt="Heuristic Evaluation reporting site" width={1897} height={931} />
      </div>
    );
  }

  return (
    <div className="project-visual project-status-visual" aria-label="Dearly is currently in development">
      <div className="project-status-content">
        <span>Currently in development</span>
        <strong>Dearly is still taking shape.</strong>
        <p>Project details and a live preview will be added when it is ready.</p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <PortfolioMotion>
        <div className="page-shell">
          <header className="site-header">
          <a className="brand" href="#top" aria-label="Mark Angel Concina, back to top">
            <span>MAC</span><b>{"{ }"}</b>
          </a>
          <nav className="site-nav" aria-label="Primary navigation">
            <a href="#projects">Projects</a>
            <a href="#skills">Skills</a>
            <a href="#services">Services</a>
            <a href="#experience">Experience</a>
            <a href="#activity">Activity</a>
            <a href="#education">Education</a>
            <a href="#contact">Contact</a>
          </nav>
          <details className="mobile-menu">
            <summary aria-label="Open navigation menu"><Menu size={16} aria-hidden="true" /><span className="sr-only">Open navigation menu</span></summary>
            <nav className="mobile-menu-nav" aria-label="Mobile navigation">
              <a href="#projects">Projects</a>
              <a href="#skills">Skills</a>
              <a href="#services">Services</a>
              <a href="#experience">Experience</a>
              <a href="#activity">Activity</a>
              <a href="#education">Education</a>
              <a href="#contact">Contact</a>
            </nav>
          </details>
          </header>

          <main id="main-content">
          <section className="hero" id="top" aria-labelledby="hero-title">
            <div className="hero-copy">
              <p className="eyebrow orange">Hi, I&apos;m Mark Angel Concina.</p>
              <h1 id="hero-title">Full-stack solutions<br />built for real-world problems.</h1>
              <p className="hero-summary">Information Technology graduate and full-stack developer who creates software that delivers real value. I am passionate about building scalable digital solutions while continuously expanding my technical growth.</p>
              <p className="availability"><span aria-hidden="true" /> Open to full stack developer opportunities</p>
              <div className="hero-actions">
                <a className="button button-solid" href="#projects">Explore my work <ArrowDown size={16} aria-hidden="true" /></a>
                <a className="button button-outline" href="#experience">Résumé <ArrowRight size={16} aria-hidden="true" /></a>
              </div>
            </div>

            <div className="hero-portrait" aria-label="Portrait and developer status">
              <Image src="/mark-angel.png" alt="Mark Angel Concina wearing a cream Barong Tagalog" width={971} height={1619} priority sizes="(max-width: 767px) 82vw, 42vw" />
              <div className="status-card design-card status-one" role="img" aria-label="Backend development code preview">
                <div className="backend-design">
                  <div className="code-window-bar"><span className="code-dots"><i /><i /><i /></span><span>server.ts</span></div>
                  <pre><code><span className="code-keyword">const</span> build = <span className="code-function">(idea)</span> <span className="code-arrow">=&gt;</span> <span className="code-brace">&#123;</span>{"\n"}<span className="code-indent">plan(idea);</span>{"\n"}<span className="code-indent">code();</span>{"\n"}<span className="code-indent">test();</span>{"\n"}<span className="code-indent">ship();</span>{"\n"}<span className="code-brace">&#125;</span>;</code></pre>
                </div>
              </div>
              <div className="status-card design-card status-two" role="img" aria-label="API response preview">
                <div className="api-design">
                  <div className="api-header"><strong>API Response</strong><span>200 OK</span></div>
                  <pre><code><span className="api-brace">&#123;</span>{"\n"}<span className="api-key">id:</span> 1287,{"\n"}<span className="api-key">status:</span> <span className="api-string">&quot;approved&quot;</span>,{"\n"}<span className="api-key">updated:</span> <span className="api-string">&quot;06-05-12&quot;</span>{"\n"}<span className="api-brace">&#125;</span></code></pre>
                </div>
              </div>
            </div>
          </section>

          <section className="facts-strip" aria-label="Profile highlights">
            <div><GraduationCap aria-hidden="true" /><span><small>Education</small><strong>BS Information Technology · 2026</strong></span></div>
            <div><Code2 aria-hidden="true" /><span><small>Role</small><strong>Full Stack Developer</strong></span></div>
            <div><MapPin aria-hidden="true" /><span><small>Location</small><strong>Camarines Sur, Philippines</strong></span></div>
            <div><Wifi aria-hidden="true" /><span><small>Availability</small><strong>Open to on site, hybrid, and remote</strong></span></div>
          </section>

          <section className="case-study framed-section" id="projects" aria-labelledby="capstone-title">
            <span className="section-ribbon">Capstone project</span>
            <div className="case-copy">
              <p className="section-kicker">Featured case study</p>
              <h2 id="capstone-title">ParsuWISE</h2>
              <p className="case-lead">A unified learning platform that gives administrators, faculty members, and students the tools they need to manage, teach, learn, collaborate, and issue verifiable certificates.</p>

              <div className="case-points">
                <article>
                  <span className="point-icon green"><CircleDot aria-hidden="true" /></span>
                  <p><strong>The challenge</strong> Educational institutions often use separate platforms for materials, assessments, discussions, progress monitoring, and certificates, making learning and oversight fragmented.</p>
                </article>
                <article>
                  <span className="point-icon amber"><Users aria-hidden="true" /></span>
                  <p><strong>Our approach</strong> We designed dedicated, secure experiences for administrators, faculty, and students inside one integrated system.</p>
                </article>
                <article>
                  <span className="point-icon forest"><Code2 aria-hidden="true" /></span>
                  <p><strong>My contribution</strong> Lead full stack developer and system integrator across authentication, user and course management, quizzes, progress tracking, analytics, responsive interfaces, debugging, and deployment.</p>
                </article>
                <article>
                  <span className="point-icon orange-bg"><Award aria-hidden="true" /></span>
                  <p><strong>Core outcome</strong> One role aware platform for self paced learning, multimedia content, course forums, progress visibility, and verifiable completion certificates.</p>
                </article>
              </div>
            </div>

            <CapstoneCarousel />
            <div className="case-footer">
              <ul className="chip-list" aria-label="ParsuWISE technologies">{capstoneStack.map((item) => <li key={item}>{item}</li>)}</ul>
              <div className="case-actions" aria-label="ParsuWISE project links">
                <a className="button button-solid" href="https://parsuwise.onrender.com/" target="_blank" rel="noreferrer">
                  Live demo <ArrowRight size={16} aria-hidden="true" />
                </a>
                <a className="button button-outline" href="https://github.com/kingsmark16/PARSUWise" target="_blank" rel="noreferrer">
                  Source code <ArrowRight size={16} aria-hidden="true" />
                </a>
              </div>
            </div>
          </section>

          <section className="section-block" aria-labelledby="more-projects-title">
            <div className="section-heading"><div><p>Selected builds</p><h2 id="more-projects-title">More projects</h2></div></div>
            <div className="project-grid">
              {projects.map((project, index) => (
                <article className="project-card" key={project.name}>
                  <div className="project-title-row"><span className="project-number">0{index + 1}</span><div><h3>{project.name}</h3><p>{project.eyebrow}</p></div></div>
                  <ProjectVisual variant={project.variant} />
                  <p className="project-description">{project.description}</p>
                  <ul className="chip-list compact" aria-label={`${project.name} technologies`}>{project.stack.map((item) => <li key={item}>{item}</li>)}</ul>
                  {(project.liveDemo || project.sourceCode) && (
                    <div className="project-actions" aria-label={`${project.name} project links`}>
                      {project.liveDemo && <a className="button button-solid" href={project.liveDemo} target="_blank" rel="noreferrer">Live demo <ArrowRight size={14} aria-hidden="true" /></a>}
                      {project.sourceCode && <a className="button button-outline" href={project.sourceCode} target="_blank" rel="noreferrer">Source code <ArrowRight size={14} aria-hidden="true" /></a>}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </section>

          <section className="section-block" id="skills" aria-labelledby="skills-title">
            <div className="section-heading"><div><p>Tools I use</p><h2 id="skills-title">Technical toolkit</h2></div><span>Across the full stack</span></div>
            <div className="toolkit-grid">
              {toolkit.map((group) => (
                <article key={group.title}>
                  <div className="toolkit-title"><span aria-hidden="true" /><strong>{group.title}</strong></div>
                  <ul>{group.items.map((item) => <li key={item}><span className="toolkit-skill-icon"><SkillIcon name={item} /></span><span>{item}</span></li>)}</ul>
                </article>
              ))}
            </div>
          </section>

          <section className="about-experience" id="services" aria-label="Services and internship experience">
            <article className="services-card">
              <div className="section-heading compact-heading"><div><p>What I offer</p><h2>Services</h2></div></div>
              <ul className="services-list">
                <li><MonitorSmartphone aria-hidden="true" /><span><strong>Frontend development</strong><small>Responsive and accessible interfaces for the web.</small></span></li>
                <li><Server aria-hidden="true" /><span><strong>Backend and API development</strong><small>Connected services and REST APIs for practical products.</small></span></li>
                <li><Database aria-hidden="true" /><span><strong>Database integration</strong><small>Reliable data connections with clear, maintainable models.</small></span></li>
                <li><Cloud aria-hidden="true" /><span><strong>Deployment setup</strong><small>Applications prepared for containerized and cloud hosting.</small></span></li>
              </ul>
            </article>

            <article className="experience-card" id="experience">
              <div className="section-heading compact-heading"><div><p>Internship experience</p><h2>Full Stack Development Intern</h2></div></div>
              <p className="experience-meta"><strong>Local Government of San Jose, Camarines Sur</strong><span>February to May 2026</span></p>
              <ul className="experience-list">
                <li>Developed a responsive municipal landing page for local information, services, and community highlights.</li>
                <li>Designed and implemented an administrative dashboard with real time chat and citizen concern reporting.</li>
                <li>Improved the visibility and accessibility of municipal information for residents and visitors.</li>
                <li>Supported faster responses through clearer issue tracking and resident to administrator communication.</li>
              </ul>
              <ul className="chip-list compact" aria-label="Internship technologies">
                {["JavaScript", "React", "NodeJS", "ExpressJS", "Prisma", "MySQL", "TailwindCSS"].map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
          </section>

          <div id="activity"><GitHubActivity /></div>

          <section className="education-achievements" id="education" aria-label="Education and achievements">
            <article>
              <div className="section-heading compact-heading"><div><p>Foundation</p><h2>Education</h2></div></div>
              <div className="education-row"><GraduationCap aria-hidden="true" /><time dateTime="2022/2026">2022 to 2026</time><span><strong>Bachelor of Science in Information Technology</strong><small>Partido State University</small><small>Goa, Camarines Sur, Philippines</small></span></div>
            </article>
            <article>
              <div className="section-heading compact-heading"><div><p>Recognition</p><h2>Achievements</h2></div></div>
              <div className="achievement-grid"><div><Award aria-hidden="true" /><span><strong>Dean&apos;s Lister</strong><small>Two time awardee</small></span></div><div><Gamepad2 aria-hidden="true" /><span><strong>Gamefest 2025</strong><small>First place</small></span></div></div>
            </article>
          </section>

          <section className="contact-band" id="contact" aria-labelledby="contact-title">
            <div className="contact-icon"><BriefcaseBusiness aria-hidden="true" /></div>
            <div><p>Ready for the next challenge</p><h2 id="contact-title">Let&apos;s build useful products together.</h2><span>I&apos;m open to a full stack role where I can contribute across interfaces, services, data, and deployment.</span></div>
            <div className="contact-details" aria-label="Contact details"><a className="button contact-email-button" href={`mailto:${siteConfig.email}`}>Email me <ArrowRight size={16} aria-hidden="true" /></a><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a><a href={`tel:${siteConfig.telephone}`}>{siteConfig.telephone}</a></div>
          </section>
          </main>

          <footer>
          <span>Mark Angel Concina © {new Date().getFullYear()}</span>
          <div className="footer-social-links" role="group" aria-label="Social links">
            <a className="footer-social-link" href={siteConfig.socialLinks.github} target="_blank" rel="noreferrer" aria-label="GitHub profile"><span className="footer-social-icon"><Image src="/github.png" alt="" width={24} height={24} /></span></a>
            <a className="footer-social-link" href={siteConfig.socialLinks.facebook} target="_blank" rel="noreferrer" aria-label="Facebook profile"><span className="footer-social-icon"><Image src="/facebook.png" alt="" width={24} height={24} /></span></a>
            <a className="footer-social-link" href={siteConfig.socialLinks.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile"><span className="footer-social-icon"><Image src="/linkedin.png" alt="" width={24} height={24} /></span></a>
            <a className="footer-social-link" href={siteConfig.socialLinks.instagram} target="_blank" rel="noreferrer" aria-label="Instagram profile"><span className="footer-social-icon"><Image src="/instagram.png" alt="" width={24} height={24} /></span></a>
            <a className="footer-social-link" href={siteConfig.socialLinks.tiktok} target="_blank" rel="noreferrer" aria-label="TikTok profile"><span className="footer-social-icon"><Image src="/tik-tok.png" alt="" width={24} height={24} /></span></a>
          </div>
          <a href="#top">Back to top <ArrowRight size={14} aria-hidden="true" /></a>
          </footer>
        </div>
      </PortfolioMotion>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    </>
  );
}
