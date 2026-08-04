"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type PortfolioMotionProps = {
  children: ReactNode;
};

export default function PortfolioMotion({ children }: PortfolioMotionProps) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const root = scope.current;
    if (!root) return;

    const header = root.querySelector<HTMLElement>(".site-header");
    const heroCopy = root.querySelectorAll<HTMLElement>(".hero-copy > *");
    const hero = root.querySelector<HTMLElement>(".hero");
    const heroPortrait = root.querySelector<HTMLElement>(".hero-portrait");
    const heroImage = root.querySelector<HTMLElement>(".hero-portrait > img");
    const factItems = root.querySelectorAll<HTMLElement>(".facts-strip > div");
    const progressTrack = root.querySelector<HTMLElement>(".scroll-progress");
    const progressBar = root.querySelector<HTMLElement>(".scroll-progress > span");
    const media = gsap.matchMedia();

    media.add(
      {
        reduceMotion: "(prefers-reduced-motion: reduce)",
        compact: "(max-width: 46rem)",
        desktop: "(min-width: 63rem)",
      },
      ({ conditions }, mediaContextSafe) => {
        const makeContextSafe = <T extends (...args: never[]) => unknown>(callback: T): T =>
          mediaContextSafe ? (mediaContextSafe(callback) as T) : callback;
        const reduceMotion = conditions?.reduceMotion ?? false;
        const compact = conditions?.compact ?? false;
        const desktop = conditions?.desktop ?? false;

        if (reduceMotion) {
          if (progressTrack) gsap.set(progressTrack, { autoAlpha: 0 });
          return;
        }

        if (!header || !hero || !heroPortrait || !heroCopy.length || !factItems.length) return;

        const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

        intro
          .fromTo(header, { autoAlpha: 0, y: -12 }, { autoAlpha: 1, y: 0, duration: 0.45 })
          .fromTo(
            heroCopy,
            { autoAlpha: 0, y: compact ? 10 : 18 },
            { autoAlpha: 1, y: 0, duration: 0.42, stagger: 0.06 },
            "-=0.2",
          )
          .fromTo(
            heroPortrait,
            { autoAlpha: 0, x: compact ? 0 : 18 },
            { autoAlpha: 1, x: 0, duration: 0.55 },
            "<",
          )
          .fromTo(
            factItems,
            { autoAlpha: 0, y: 8 },
            { autoAlpha: 1, y: 0, duration: 0.32, stagger: 0.06 },
            "-=0.25",
          );

        const sections = Array.from(
          root.querySelectorAll<HTMLElement>(
            ".framed-section, .section-block, .about-experience, .education-achievements, .contact-band",
          ),
        );

        sections.forEach((section, index) => {
          const directionalTargets: Array<{ element: HTMLElement; x: number; y: number }> = [];
          const addDirectionalTarget = (selector: string, x: number, y = 0) => {
            const element = section.querySelector<HTMLElement>(selector);
            if (element) directionalTargets.push({ element, x, y });
          };

          if (section.matches(".case-study")) {
            addDirectionalTarget(".case-copy", -46);
            addDirectionalTarget(".wise-dashboard", 46);
            addDirectionalTarget(".case-footer", 0, 18);
          } else if (section.matches(".about-experience")) {
            addDirectionalTarget(".services-card", -36);
            addDirectionalTarget(".experience-card", 36);
          } else if (section.matches(".education-achievements")) {
            addDirectionalTarget("article:first-child", -30);
            addDirectionalTarget("article:last-child", 30);
          } else if (section.matches(".contact-band")) {
            addDirectionalTarget(".contact-icon", -28);
            addDirectionalTarget(":scope > div:nth-child(2)", 0, 18);
            addDirectionalTarget(".contact-details", 28);
          } else {
            addDirectionalTarget(
              ".github-activity-heading, .section-heading",
              index % 2 === 0 ? -24 : 24,
            );
          }

          const directionalElements = directionalTargets.map(({ element }) => element);
          const reveal = gsap.timeline({
            scrollTrigger: {
              id: `section-reveal-${index}`,
              trigger: section,
              start: "top 86%",
              toggleActions: "play none none reverse",
            },
          });

          reveal.fromTo(
            section,
            { autoAlpha: 0, y: 28 },
            { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out" },
          );

          if (directionalElements.length) {
            reveal.fromTo(
              directionalElements,
              {
                autoAlpha: 0,
                x: (targetIndex) => directionalTargets[targetIndex]?.x ?? 0,
                y: (targetIndex) => directionalTargets[targetIndex]?.y ?? 0,
              },
              { autoAlpha: 1, x: 0, y: 0, duration: 0.58, stagger: 0.08 },
              "-=0.42",
            );
          }
        });

        const revealItems = Array.from(
          root.querySelectorAll<HTMLElement>(
            ".case-points > article, .project-card, .toolkit-grid > article, .services-list > li, .experience-list > li, .achievement-grid > div, .github-calendar-card",
          ),
        );

        if (revealItems.length) {
          revealItems.forEach((item) => {
            const siblingIndex = item.parentElement
              ? Array.from(item.parentElement.children).indexOf(item)
              : 0;
            const isRightToLeft = siblingIndex % 2 === 1;
            const x = item.matches(".project-card, .case-points > article, .achievement-grid > div")
              ? isRightToLeft ? 34 : -34
              : item.matches(".toolkit-grid > article")
                ? isRightToLeft ? -28 : 28
                : item.matches(".github-calendar-card")
                  ? 30
                  : isRightToLeft ? 18 : -18;
            item.dataset.motionX = String(x);
          });

          gsap.set(revealItems, {
            autoAlpha: 0,
            x: (targetIndex, target) => Number((target as HTMLElement).dataset.motionX ?? 0),
            y: 22,
          });
          const revealIn = (elements: Element[]) => {
            gsap.to(elements, {
              autoAlpha: 1,
              x: 0,
              y: 0,
              duration: 0.55,
              ease: "power3.out",
              stagger: 0.07,
              overwrite: "auto",
            });
          };
          const revealOut = (elements: Element[]) => {
            gsap.to(elements, {
              autoAlpha: 0,
              x: (_, target) => Number((target as HTMLElement).dataset.motionX ?? 0),
              y: 22,
              duration: 0.3,
              ease: "power2.out",
              stagger: 0.03,
              overwrite: "auto",
            });
          };
          const safeRevealIn = makeContextSafe(revealIn);
          const safeRevealOut = makeContextSafe(revealOut);

          ScrollTrigger.batch(revealItems, {
            start: "top 90%",
            interval: 0.08,
            batchMax: compact ? 3 : 6,
            onEnter: safeRevealIn,
            onLeaveBack: safeRevealOut,
          });
        }

        if (progressBar) {
          gsap.fromTo(
            progressBar,
            { scaleX: 0 },
            {
              scaleX: 1,
              ease: "none",
              scrollTrigger: {
                id: "page-progress",
                trigger: root,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.2,
              },
            },
          );
        }

        if (desktop && heroImage) {
          gsap.to(heroImage, {
            y: 24,
            ease: "none",
            scrollTrigger: {
              id: "hero-parallax",
              trigger: hero,
              start: "top top",
              end: "bottom top",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          });
        }

        const sectionIds = ["projects", "skills", "services", "experience", "activity", "education", "contact"];
        const navLinks = Array.from(root.querySelectorAll<HTMLAnchorElement>(".site-nav a, .mobile-menu-nav a"));

        sectionIds.forEach((id) => {
          const section = root.querySelector<HTMLElement>(`#${id}`);
          if (!section) return;

          ScrollTrigger.create({
            id: `nav-section-${id}`,
            trigger: section,
            start: "top 42%",
            end: "bottom 42%",
            onToggle: (self) => {
              if (!self.isActive) return;
              navLinks.forEach((link) => {
                link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
              });
            },
          });
        });

        const cleanupInteractions: Array<() => void> = [];
        const wrapEvent = (callback: (event: Event) => void) => makeContextSafe(callback);
        const wrapAction = (callback: () => void) => makeContextSafe(callback);

        if (!compact) {
          const interactiveCards = Array.from(
            root.querySelectorAll<HTMLElement>(
              ".project-card, .toolkit-grid > article, .services-card, .experience-card, .education-achievements > article, .github-calendar-card",
            ),
          );

          gsap.set(interactiveCards, {
            transformPerspective: 900,
            transformOrigin: "center center",
          });

          interactiveCards.forEach((card) => {
            const rotateX = gsap.quickTo(card, "rotationX", { duration: 0.35, ease: "power2.out" });
            const rotateY = gsap.quickTo(card, "rotationY", { duration: 0.35, ease: "power2.out" });

            const handlePointerMove = wrapEvent((event: Event) => {
              const pointerEvent = event as PointerEvent;
              if (pointerEvent.pointerType === "touch") return;

              const bounds = card.getBoundingClientRect();
              if (!bounds.width || !bounds.height) return;

              const x = (pointerEvent.clientX - bounds.left) / bounds.width - 0.5;
              const y = (pointerEvent.clientY - bounds.top) / bounds.height - 0.5;
              rotateX(y * -3.5);
              rotateY(x * 3.5);
            });

            const handlePointerLeave = wrapAction(() => {
              rotateX(0);
              rotateY(0);
            });

            card.addEventListener("pointermove", handlePointerMove);
            card.addEventListener("pointerleave", handlePointerLeave);
            cleanupInteractions.push(() => {
              card.removeEventListener("pointermove", handlePointerMove);
              card.removeEventListener("pointerleave", handlePointerLeave);
              gsap.killTweensOf(card);
            });
          });

          const hoverRows = Array.from(
            root.querySelectorAll<HTMLElement>(
              ".case-points > article, .toolkit-grid li, .services-list li, .experience-list li, .achievement-grid > div",
            ),
          );

          hoverRows.forEach((row) => {
            const moveX = gsap.quickTo(row, "x", { duration: 0.24, ease: "power2.out" });
            const handleEnter = wrapAction(() => moveX(4));
            const handleLeave = wrapAction(() => moveX(0));

            row.addEventListener("pointerenter", handleEnter);
            row.addEventListener("pointerleave", handleLeave);
            cleanupInteractions.push(() => {
              row.removeEventListener("pointerenter", handleEnter);
              row.removeEventListener("pointerleave", handleLeave);
              gsap.killTweensOf(row);
            });
          });

          const buttons = Array.from(root.querySelectorAll<HTMLElement>(".button"));
          buttons.forEach((button) => {
            const arrow = button.querySelector<SVGElement>("svg");
            if (!arrow) return;

            const moveArrow = gsap.quickTo(arrow, "x", { duration: 0.22, ease: "power2.out" });
            const handleEnter = wrapAction(() => moveArrow(4));
            const handleLeave = wrapAction(() => moveArrow(0));

            button.addEventListener("pointerenter", handleEnter);
            button.addEventListener("pointerleave", handleLeave);
            button.addEventListener("focus", handleEnter);
            button.addEventListener("blur", handleLeave);
            cleanupInteractions.push(() => {
              button.removeEventListener("pointerenter", handleEnter);
              button.removeEventListener("pointerleave", handleLeave);
              button.removeEventListener("focus", handleEnter);
              button.removeEventListener("blur", handleLeave);
              gsap.killTweensOf(arrow);
            });
          });

          const skillIcons = Array.from(root.querySelectorAll<HTMLElement>(".toolkit-skill-icon"));
          skillIcons.forEach((icon) => {
            const rotate = gsap.quickTo(icon, "rotation", { duration: 0.24, ease: "back.out(1.4)" });
            const scale = gsap.quickTo(icon, "scale", { duration: 0.24, ease: "back.out(1.4)" });
            const handleEnter = wrapAction(() => {
              rotate(8);
              scale(1.08);
            });
            const handleLeave = wrapAction(() => {
              rotate(0);
              scale(1);
            });

            icon.addEventListener("pointerenter", handleEnter);
            icon.addEventListener("pointerleave", handleLeave);
            cleanupInteractions.push(() => {
              icon.removeEventListener("pointerenter", handleEnter);
              icon.removeEventListener("pointerleave", handleLeave);
              gsap.killTweensOf(icon);
            });
          });

          const socialIcons = Array.from(root.querySelectorAll<HTMLElement>(".footer-social-icon"));
          socialIcons.forEach((icon) => {
            const scale = gsap.quickTo(icon, "scale", { duration: 0.24, ease: "back.out(1.4)" });
            const rotate = gsap.quickTo(icon, "rotation", { duration: 0.24, ease: "back.out(1.4)" });
            const handleEnter = wrapAction(() => {
              scale(1.08);
              rotate(4);
            });
            const handleLeave = wrapAction(() => {
              scale(1);
              rotate(0);
            });

            icon.addEventListener("pointerenter", handleEnter);
            icon.addEventListener("pointerleave", handleLeave);
            cleanupInteractions.push(() => {
              icon.removeEventListener("pointerenter", handleEnter);
              icon.removeEventListener("pointerleave", handleLeave);
              gsap.killTweensOf(icon);
            });
          });
        }

        const refresh = () => ScrollTrigger.refresh();
        if (document.readyState === "complete") {
          const refreshFrame = requestAnimationFrame(refresh);
          cleanupInteractions.push(() => cancelAnimationFrame(refreshFrame));
        } else {
          window.addEventListener("load", refresh, { once: true });
          cleanupInteractions.push(() => window.removeEventListener("load", refresh));
        }

        return () => cleanupInteractions.forEach((cleanup) => cleanup());
      },
    );

  }, { scope });

  return (
    <div ref={scope} className="motion-scope">
      <div className="scroll-progress" aria-hidden="true"><span /></div>
      {children}
    </div>
  );
}
