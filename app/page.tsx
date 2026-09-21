import Image from "next/image";
import { BrainCircuit, CloudUpload, Database, MonitorSmartphone, Server, ShieldCheck, ArrowRight, BookOpen, Building2, ChartNoAxesColumnIncreasing, Code2, Download, ExternalLink, GraduationCap, Heart, Mail, MapPin, Phone, Target, Trophy, UserRound, Users, Zap } from "lucide-react";
import { siteConfig } from "./site-config";
import PortfolioNavigation from "./components/PortfolioNavigation";
import GitHubActivity from "./components/GitHubActivity";
const projects = [
  {
    name: "College Rage",
    eyebrow: "Digital memory vault",
    description:
      "A place for preserving and reliving college photos and videos through an interactive gallery with music, with a secure admin dashboard for Dropbox backed media management and visitor analytics.",
    stack: ["TypeScript", "React", "ExpressJS", "NodeJS", "Prisma", "Docker", "Azure", "PostgreSQL"],
    variant: "gallery",
    liveDemo: "https://collegerage-fzahg5ekarathpf3.southeastasia-01.azurewebsites.net/",
    previewImage: {
      src: "/rage.png",
      width: 1900,
      height: 937,
      alt: "College Rage interactive memory gallery preview",
    },
    sourceCode: "https://github.com/kingsmark16/CollegeRage",
  },
  {
    name: "MC.AI",
    eyebrow: "AI document assistant",
    description:
      "MC.AI is a full stack Retrieval Augmented Generation (RAG) application that converts PDF, DOCX, and TXT files into searchable knowledge bases, then provides grounded answers from the uploaded documents.",
    stack: ["React", "TypeScript", "NestJS", "NodeJS", "LangChain", "Vector Database"],
    variant: "ai",
    liveDemo: "https://mc.ai.mcanghel.fun/",
    previewImage: {
      src: "/mc.ai.png",
      width: 1917,
      height: 943,
      alt: "MC.AI document assistant preview",
    },
    sourceCode: "https://github.com/kingsmark16/mc.ai",
  },
  {
    name: "Redis Caching Rate Limiter with NestJS, Docker, and Nginx",
    eyebrow: "Scalable backend API",
    description:
      "Built a production-style backend API using NestJS, PostgreSQL (Prisma), Redis, Docker Compose, and Nginx. Implemented full CRUD task management with cache-aside Redis caching (TTL + invalidation), distributed rate limiting across multiple API replicas, health/readiness checks, request correlation IDs, centralized error handling, and HTTPS reverse proxying.",
    stack: ["TypeScript", "NestJS", "NodeJS", "Redis", "PostgreSQL", "Docker", "Nginx", "Prisma"],
    variant: "redis",
    liveDemo: null,
    previewImage: null,
    sourceCode: "https://github.com/kingsmark16/Redis-caching-rate-limiter-with-nestjs-docker-and-nginx",
  },
  {
    name: "Heuristic Evaluation & Web Reporting Site",
    eyebrow: "Reporting site",
    description:
      "A single page report viewer that organizes evaluated systems, usability problems, task lists, a heuristic workbook, conclusions, and proposed interface improvements.",
    stack: ["JavaScript", "React", "TailwindCSS", "Vercel"],
    variant: "report",
    liveDemo: "https://hewrs.vercel.app",
    previewImage: {
      src: "/hue.png",
      width: 1897,
      height: 931,
      alt: "Heuristic evaluation reporting site preview",
    },
    sourceCode: "https://github.com/kingsmark16/heuristic-evaluation-web-reporting-site",
  },
  {
    name: "ParsuWISE",
    eyebrow: "Integrated learning platform",
    description:
      "A unified learning platform that gives administrators, faculty members, and students the tools they need to manage, teach, learn, collaborate, and issue verifiable certificates.",
    stack: ["JavaScript", "React", "ExpressJS", "NodeJS", "Prisma", "PostgreSQL", "TailwindCSS", "Clerk", "Render"],
    variant: "capstone",
    liveDemo: "https://parsuwise.onrender.com/",
    previewImage: {
      src: "/cap6.png",
      width: 1904,
      height: 935,
      alt: "ParsuWISE student dashboard preview",
    },
    sourceCode: "https://github.com/kingsmark16/PARSUWise",
  },
  {
    name: "Letterly",
    eyebrow: "Personalized message pages",
    description:
      "A platform for creating personalized webpages for heartfelt messages, celebrations, confessions, and meaningful occasions, then sharing them through a unique link.",
    stack: ["TypeScript", "NextJS", "NestJS", "NodeJS", "TailwindCSS", "PostgreSQL", "Better Auth", "Prisma", "Docker", "GitHub Actions"],
    variant: "message",
    liveDemo: null,
    previewImage: null,
    sourceCode: "https://github.com/kingsmark16/Letterly",
  },
] as const;

const personId = `${siteConfig.url}/#person`;
const websiteId = `${siteConfig.url}/#website`;
const profilePageId = `${siteConfig.url}/#profile`;
const profileImageUrl = `${siteConfig.url}/profile.png`;

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
      alumniOf: { "@type": "CollegeOrUniversity", name: "Partido State University" },
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
        width: 1086,
        height: 1448,
        caption: "Portrait of Mark Angel Concina",
      },
    },
  ],
};



const toolkit = [
 { title: "Languages", items: ["JavaScript", "TypeScript"] },
 { title: "Frontend", items: ["HTML", "CSS", "React", "Next.js", "Tailwind CSS"] },
 { title: "Backend & APIs", items: ["Node.js", "ExpressJS", "NestJS", "REST APIs"] },
 { title: "Databases & ORM", items: ["PostgreSQL", "MySQL", "MongoDB", "Prisma", "Redis"] },
 { title: "Deployment & Delivery", items: ["Docker", "Azure", "Render", "Vercel", "GitHub Actions", "Nginx", "Git"] },
 { title: "Authentication", items: ["Clerk", "Better Auth"] },
 { title: "AI Tools", items: ["GitHub Copilot", "OpenAI Codex"] },
 { title: "Currently Learning", items: ["Testing", "DevOps", "Cloud"] },
];
const skillImages: Record<string, string> = {
 "HTML": "/HTML5.png", "CSS": "/CSS3.png", "JavaScript": "/js.png", "TypeScript": "/typescript.png",
 "React": "/React (1).png", "Next.js": "/Next.js.png", "Tailwind CSS": "/Tailwind CSS.png",
 "Node.js": "/nodejs.png", "ExpressJS": "/icons8-express-js-50.png", "NestJS": "/icons8-nestjs-144.png",
 "REST APIs": "/icons8-rest-api-96.png", "PostgreSQL": "/icons8-postgresql-48.png",
 "MySQL": "/icons8-mysql-logo-48.png", "MongoDB": "/MongoDB.png", "Prisma": "/icons8-prisma-orm-100.png",
 "Docker": "/Docker.png", "Azure": "/Azure.png", "Vercel": "/Vercel.png", "GitHub Actions": "/GitHub Actions.png",
 "Redis": "/redis.png", "Render": "/Render.svg", "Nginx": "/Nginx.svg", "Git": "/Git.png",
 "Clerk": "/Clerk.svg", "Better Auth": "/better-auth.svg", "GitHub Copilot": "/github-copilot.svg",
 "OpenAI Codex": "/codex.svg", "Testing": "/test.png", "DevOps": "/devops.png", "Cloud": "/cloud.png",
};
const toolkitIcons: Record<string, typeof Code2> = {
 "Languages": Code2, "Frontend": MonitorSmartphone, "Backend & APIs": Server,
 "Databases & ORM": Database, "Deployment & Delivery": CloudUpload,
 "Authentication": ShieldCheck, "AI Tools": BrainCircuit, "Currently Learning": BookOpen,
};
const qualities = [
 {icon:UserRound,title:"Problem Solver",text:"I enjoy breaking down problems and finding simple, effective solutions."},
 {icon:BookOpen,title:"Continuous Learner",text:"Always exploring new technologies and improving my skills."},
 {icon:Target,title:"Goal Oriented",text:"Focused on building a successful career in software development."},
 {icon:Users,title:"Team Player",text:"I value collaboration and believe great things are built together."}
];
export default function Home() {
 return <>
 <a className="skip-link" href="#main-content">Skip to main content</a>
 <header className="site-header"><div className="header-inner">
 <a className="brand" href="#home" aria-label="Mark Angel Concina, home"><span className="monogram">MC</span><span><strong>Mark Angel Concina</strong><small>Full Stack Developer</small></span></a>
 <PortfolioNavigation/><a className="button resume-button" href="/Concina_Mark_Angel_Resume.pdf" target="_blank" rel="noreferrer"><Download aria-hidden="true"/>Resume</a>
 </div></header>
 <main id="main-content">
 <section className="hero" id="home" aria-labelledby="hero-title"><div className="hero-inner">
 <div className="hero-copy"><p className="availability"><span/>Open to Opportunities</p><h1 id="hero-title"><span>Mark Angel Concina</span></h1><p className="hero-description">A passionate full stack developer who builds real web applications<br className="desktop-break"/> and is eager to contribute, learn, and grow in a dynamic team.</p>
 <div className="hero-actions"><a className="button button-primary" href="#projects"><Code2 aria-hidden="true"/>View Projects<ArrowRight aria-hidden="true"/></a><a className="button button-outline" href={"mailto:"+siteConfig.email}><Mail aria-hidden="true"/>Contact Me</a></div>
 <div className="hero-facts">{[{icon:GraduationCap,title:"BSIT Graduate",text:"Information Technology"},{icon:ChartNoAxesColumnIncreasing,title:"Always Learning",text:"Better Every Day"},{icon:Zap,title:"Ready to Contribute",text:"Let’s Build Together"}].map(({icon:Icon,title,text})=><div className="hero-fact" key={title}><span className="icon-circle"><Icon aria-hidden="true"/></span><span><strong>{title}</strong><small>{text}</small></span></div>)}</div></div>
 <div className="hero-art"><div className="portrait-glow"/><span className="orb orb-one"/><span className="orb orb-two"/><span className="orb orb-three"/><Image className="portrait" src="/profile.png" alt="Mark Angel Concina in a cream Barong Tagalog" width={1086} height={1448} priority sizes="(max-width: 600px) 80vw, 370px"/>
 <p className="handwriting" aria-hidden="true"><span className="handwriting-word">Good</span><span className="handwriting-word">Code</span><span className="handwriting-word">Brighter</span><span className="handwriting-word">Tomorrow<i className="handwriting-underline"/></span></p>
 <div className="developer-card"><div className="code-title"><span className="window-dots"><i/><i/><i/></span><span>developer.ts</span></div><pre><code><span className="code-purple">const</span> <span className="code-blue">developer</span> = {'{'}<br/>{'  '}<span className="code-purple">name</span>: <span className="code-green">&quot;Mark Angel Concina&quot;</span>,<br/>{'  '}<span className="code-purple">role</span>: <span className="code-green">&quot;Full Stack Developer&quot;</span>,<br/>{'  '}<span className="code-purple">mindset</span>: <span className="code-green">&quot;Always Learning&quot;</span>,<br/>{'  '}<span className="code-purple">goal</span>: <span className="code-green">&quot;Build. Contribute. Grow.&quot;</span><br/>{'}'};</code></pre></div>
 <div className="stats-card"><div><Users aria-hidden="true"/><strong>100%</strong><small>Dedication</small></div><div><Heart aria-hidden="true"/><strong>∞</strong><small>Growth</small></div></div>
 </div></div></section>
 <section className="section about about-skills" id="about" aria-labelledby="about-title"><div className="container about-skills-inner"><div className="about-grid"><div className="about-copy"><p className="eyebrow">About Me & Skills</p><h2 id="about-title">Build. Learn. Grow.</h2><p>I’m a BSIT graduate and an aspiring full stack developer who is passionate about creating meaningful web applications. I enjoy both frontend and backend development, and I’m always excited to learn new technologies, take on challenges, and collaborate with others to build solutions that make an impact.</p></div><div className="qualities"><p className="section-note">“A curious mind, a stronger tomorrow.”</p><div className="quality-grid">{qualities.map(({icon:Icon,title,text})=><article className="quality-card" key={title}><Icon aria-hidden="true"/><h3>{title}</h3><p>{text}</p></article>)}</div></div></div>
<div className="about-toolkit" id="skills" role="region" aria-labelledby="skills-title">
 <div className="section-heading"><div><p className="eyebrow">My Toolkit</p><h2 id="skills-title">Technologies I Work With</h2></div><p className="section-note">From the first line of code to the final deployment.</p></div>
 <div className="toolkit-groups">{toolkit.map(group => {
  const GroupIcon = toolkitIcons[group.title];
  return <article className="toolkit-group" key={group.title}>
   <h3><GroupIcon aria-hidden="true"/>{group.title}</h3>
   <ul className="skill-list">{group.items.map(name => <li key={name}>{skillImages[name] ? <Image src={skillImages[name]} alt="" width={26} height={26}/> : <GroupIcon aria-hidden="true"/>}<span>{name}</span></li>)}</ul>
  </article>;
 })}</div>
</div>
</div></section>

<section className="section projects projects-showcase" id="projects" aria-labelledby="projects-title">
 <div className="container">
 <div className="section-heading"><div><p className="eyebrow">My Projects</p><h2 id="projects-title">Some Things I’ve Built</h2></div><p className="section-note">Real ideas. Thoughtful solutions. Always building.</p></div>
  <div className="project-grid" id="all-projects">{projects.map(project => {
   const preview = project.previewImage ?? (project.variant === "redis" ? {src: "/redis-caching.png", width: 1837, height: 850, alt: "Redis caching and rate limiting Task API documentation"} : null);
   const projectLink = project.liveDemo ?? project.sourceCode;
   return <article className="project-card" key={project.name}>
    {projectLink ? <a className="project-thumbnail" href={projectLink} target="_blank" rel="noreferrer" aria-label={"Explore " + project.name}>
     {preview ? <Image src={preview.src} alt={preview.alt} width={preview.width} height={preview.height} sizes="(max-width: 600px) calc(100vw - 32px), (max-width: 900px) calc(100vw - 48px), (max-width: 1100px) calc((100vw - 68px) / 2), (max-width: 1696px) calc((100vw - 128px) / 2), 784px"/> : <span className="project-placeholder"><Mail aria-hidden="true"/><strong>Letterly</strong><span>Personalized pages. Meaningful connections.</span><small>Currently in development</small></span>}
    </a> : <div className="project-thumbnail">
     {preview ? <Image src={preview.src} alt={preview.alt} width={preview.width} height={preview.height} sizes="(max-width: 600px) calc(100vw - 32px), (max-width: 900px) calc(100vw - 48px), (max-width: 1100px) calc((100vw - 68px) / 2), (max-width: 1696px) calc((100vw - 128px) / 2), 784px"/> : <span className="project-placeholder"><Mail aria-hidden="true"/><strong>Letterly</strong><span>Personalized pages. Meaningful connections.</span><small>Currently in development</small></span>}
    </div>}
    <div className="project-copy">
     <p className="project-eyebrow">{project.eyebrow}</p>
     <h3>{projectLink ? <a href={projectLink} target="_blank" rel="noreferrer">{project.name}<ExternalLink aria-hidden="true"/></a> : <span>{project.name}</span>}</h3>
     <p className="project-description">{project.description}</p>
     <ul className="chips" aria-label={project.name + " technologies"}>{project.stack.map(item => <li key={item}>{item}</li>)}</ul>
     <div className="project-links">{project.liveDemo ? <a className="button button-primary" href={project.liveDemo} target="_blank" rel="noreferrer">Live Demo <ExternalLink aria-hidden="true"/></a> : project.sourceCode ? <a className="button button-primary" href={project.sourceCode} target="_blank" rel="noreferrer">View Source <Code2 aria-hidden="true"/></a> : <span className="button button-outline project-fallback" aria-disabled="true">Coming Soon</span>}{project.liveDemo && project.sourceCode && <a className="button button-outline" href={project.sourceCode} target="_blank" rel="noreferrer">Source Code <Code2 aria-hidden="true"/></a>}</div>
    </div>
   </article>;
  })}</div>
 </div>
</section>
<GitHubActivity/>
<section className="section experience" id="experience" aria-labelledby="experience-title"><div className="container"><div className="section-heading"><div><p className="eyebrow">Experience & Achievements</p><h2 id="experience-title">Milestones Along the Way</h2></div><p className="section-note">Small steps. Real progress.</p></div><div className="experience-grid">{[
 {icon:Building2,title:"Full Stack Intern",label:"San Jose LGU · Feb–May 2026",text:"Built a municipal website, admin dashboard, real-time chat, and citizen reporting."},
 {icon:GraduationCap,title:"Capstone Project",label:"BSIT · Partido State University",text:"Developed ParsuWISE, a unified platform for learning, collaboration, and certificates."},
 {icon:Trophy,title:"Academic & Competition",label:"Recognition & achievements",text:"Two-time Dean’s Lister and 1st place at Gamefest 2025."},
 {icon:Users,title:"Team Collaboration",label:"Projects & development",text:"Building with others through clear communication, shared goals, and constructive feedback."}
 ].map(({icon:Icon,title,label,text})=><article className="experience-card" key={title}><span className="icon-circle"><Icon aria-hidden="true"/></span><div><h3>{title}</h3><small>{label}</small><p>{text}</p></div></article>)}</div></div></section>

<section className="section contact" id="contact" aria-labelledby="contact-title">
 <div className="container contact-inner">
  <div className="contact-copy"><p className="eyebrow">Get in Touch</p><h2 id="contact-title">Let’s Build<br/>Something Great</h2><p>I’m open to job opportunities, collaborations, or just a friendly chat about technology!</p>
   <div className="contact-actions"><a className="button button-primary" href={"mailto:"+siteConfig.email}><Mail aria-hidden="true"/>Let’s Talk <ArrowRight aria-hidden="true"/></a></div>
  </div>
  <div className="contact-info">
   <a className="contact-tile" href={"mailto:"+siteConfig.email}><span className="icon-circle"><Mail aria-hidden="true"/></span><span>Email<small>{siteConfig.email}</small></span><ArrowRight aria-hidden="true"/></a>
   <div className="contact-tile"><span className="icon-circle"><MapPin aria-hidden="true"/></span><span>Location<small>Philippines</small></span></div>
   <a className="contact-tile" href={"tel:"+siteConfig.telephone}><span className="icon-circle"><Phone aria-hidden="true"/></span><span>Phone<small>+63 969 445 1271</small></span><ArrowRight aria-hidden="true"/></a>
   <div className="contact-social-block"><h3>Connect with me</h3><div className="socials">{[["github","GitHub"],["linkedin","LinkedIn"],["facebook","Facebook"]].map(([key,label])=><a key={key} href={siteConfig.socialLinks[key as "github"|"linkedin"|"facebook"]} target="_blank" rel="noreferrer" aria-label={label}><Image src={"/"+key+".png"} alt="" width={28} height={28}/></a>)}<a href={"mailto:"+siteConfig.email} aria-label="Send email"><Mail aria-hidden="true"/></a></div></div>
  </div>
 </div>
</section>
</main><footer className="container footer"><a className="brand" href="#home"><span className="monogram">MC</span><span><strong>Mark Angel Concina</strong><small>Full Stack Developer</small></span></a><p>Build today.<br/>A better tomorrow.</p><div className="footer-end"><a href="#home" className="footer-top">Back to top <ArrowRight aria-hidden="true"/></a><small>© {new Date().getFullYear()} Mark Angel Concina. All rights reserved.</small></div></footer>
 <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structuredData).replace(/</g,"\\u003c")}}/>
 </>;
}
