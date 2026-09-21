"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function PortfolioMotion({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);
  const introduced = useRef(false);
  const initialEntrance = useRef<boolean | null>(null);

  useGSAP(() => {
    const root = scope.current;
    if (!root) return;
    // Capture once so Strict Mode can recreate setup without changing boot behavior.
    initialEntrance.current ??= document.documentElement.dataset.motionBoot === "pending";
    const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    const restoring = navigation?.type === "reload" || navigation?.type === "back_forward";
    const media = gsap.matchMedia();
    const select = gsap.utils.selector(root);

    media.add({
      all: "all",
      compact: "(max-width: 900px)",
      reduce: "(prefers-reduced-motion: reduce)",
      print: "print",
    }, (context) => {
      if (context.conditions?.reduce || context.conditions?.print) return;
      const compact = context.conditions?.compact;
      const distance = compact ? 16 : 32;
      const entrances: { element: Element; animation: gsap.core.Animation }[] = [];

      // Resizing rebuilds scroll effects without replaying the first-load intro.
      if (initialEntrance.current && !introduced.current && !restoring && window.scrollY < 40 && !window.location.hash) {
        const intro = gsap.timeline({ defaults: { duration: 0.7, ease: "power3.out", clearProps: "transform,opacity,visibility" } });
        intro.addLabel("welcome")
          .from(select(".availability"), { opacity: 0, y: 12 }, "welcome")
          .from(select("#hero-title span"), { opacity: 0, y: distance, scale: 0.97 }, "welcome+=0.12")
          .from(select(".hero-description"), { opacity: 0, y: distance }, "welcome+=0.26")
          .from(select(".hero-actions .button"), { opacity: 0, y: 14, stagger: 0.1 }, "welcome+=0.4")
          .from(select(".hero-fact"), { opacity: 0, y: 12, stagger: 0.09 }, "welcome+=0.55")
          .from(select(".portrait"), { opacity: 0, y: distance, scale: 0.96, duration: 1 }, "welcome+=0.1")
          .from(select(".portrait-glow"), { opacity: 0, scale: 0.75, duration: 1 }, "welcome+=0.15")
          .from(select(".orb"), { opacity: 0, stagger: 0.08, duration: 1, clearProps: "opacity" }, "welcome+=0.15")

          .from(select(".developer-card, .stats-card"), { opacity: 0, y: distance, rotation: compact ? 0 : 3, stagger: 0.15 }, "welcome+=0.65");
        // React Strict Mode may tear down setup before playback begins.
        intro.eventCallback("onStart", () => { introduced.current = true; });
        entrances.push({ element: root.querySelector(".hero")!, animation: intro });
      }

      // Reveal the handwritten message when it actually enters view on phones.
      // Animate children so the parent's handwritten angle stays CSS-owned.
      const handwritingElement = root.querySelector<HTMLElement>(".handwriting");
      if (!restoring && handwritingElement && (initialEntrance.current || handwritingElement.getBoundingClientRect().top >= window.innerHeight)) {
        const handwriting = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: root.querySelector(".handwriting"), start: "top 94%", toggleActions: "play none none none" },
      });
      handwriting.from(select(".handwriting-word"), {
        opacity: 0, x: compact ? -8 : -16, y: compact ? 6 : 12,
        rotation: -7, scale: 0.94, transformOrigin: "left center",
        duration: 0.65, stagger: 0.16, ease: "back.out(1.35)",
        clearProps: "transform,transformOrigin,opacity",
      }, 0.3)
        .from(select(".handwriting-underline"), {
          scaleX: 0, transformOrigin: "left center", duration: 0.65,
          ease: "power2.inOut", clearProps: "transform,transformOrigin",
        }, 1.05);
      }

      // Keep completed triggers registered until matchMedia cleanup. Removing once
      // triggers during initial refresh can mutate GSAP's list on restored scroll.
      select(".about-copy, .section-heading, .quality-card, .toolkit-group, .project-card, .github-stat, .github-calendar-card, .github-highlights > article, .contact-copy, .contact-tile, .contact-social-block").forEach((element: HTMLElement) => {
        // Already painted or restored content must never disappear during hydration.
        if (restoring || element.getBoundingClientRect().top < window.innerHeight) return;
        const animation = gsap.from(element, {
          opacity: 0.15, y: distance, duration: 0.75, ease: "power3.out",
          clearProps: "transform,opacity",
          scrollTrigger: { trigger: element, start: "top 94%", toggleActions: "play none none none" },
        });
        entrances.push({ element, animation });
      });

      // Independent timelines let stacked mobile milestones reveal on arrival.
      select(".experience-card").forEach((element: HTMLElement) => {
        if (restoring || element.getBoundingClientRect().top < window.innerHeight) return;
        const timeline = gsap.timeline({
          defaults: { ease: "power3.out", clearProps: "transform,opacity" },
          scrollTrigger: { trigger: element, start: "top 92%", toggleActions: "play none none none" },
        });
        timeline.from(element, { opacity: 0.2, y: distance, duration: 0.65 })
          .from(element.querySelector(".icon-circle"), { scale: 0.65, rotation: -20, duration: 0.55, ease: "back.out(1.5)" }, 0.12)
          .from(element.querySelectorAll("h3, small, p"), { opacity: 0, y: 10, stagger: 0.09, duration: 0.5 }, 0.2);
        entrances.push({ element, animation: timeline });
      });

      // Parallax never changes the portrait's responsive centering transform.
      gsap.to(select(".orb"), {
        y: (index) => (index % 2 ? -1 : 1) * (compact ? 18 : 65),
        rotation: compact ? 8 : 25, ease: "none",
        scrollTrigger: { trigger: root.querySelector(".hero"), start: "top top", end: "bottom top", scrub: 0.7, invalidateOnRefresh: true },
      });
      gsap.fromTo(select(".scroll-progress span"), { scaleX: 0 }, {
        scaleX: 1, ease: "none",
        scrollTrigger: { trigger: root, start: "top top", end: "bottom bottom", scrub: 0.2 },
      });

      // Keyboard navigation never waits for an entrance animation.
      const revealFocused = (event: FocusEvent) => {
        entrances.forEach(({ element, animation }) => {
          if (event.target instanceof Node && element.contains(event.target)) animation.progress(1);
        });
      };
      root.addEventListener("focusin", revealFocused);
      return () => root.removeEventListener("focusin", revealFocused);
    });

    // All starting styles are now installed; release the pre-paint visibility gate.
    delete document.documentElement.dataset.motionBoot;

    // Fonts, images, and asynchronous GitHub content can change scroll positions.
    let frame = 0;
    let active = true;
    const refresh = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => { if (active) ScrollTrigger.refresh(); });
    };
    const observer = new ResizeObserver(refresh);
    observer.observe(root);
    document.fonts.ready.then(() => { if (active) refresh(); });
    root.addEventListener("load", refresh, true);
    return () => {
      active = false;
      observer.disconnect();
      root.removeEventListener("load", refresh, true);
      cancelAnimationFrame(frame);
      media.revert();
    };
  }, { scope });

  return <div ref={scope} className="motion-scope">
    <div className="scroll-progress" aria-hidden="true"><span /></div>
    {children}
  </div>;
}
