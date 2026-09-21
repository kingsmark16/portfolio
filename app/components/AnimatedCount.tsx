"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function AnimatedCount({ value }: { value: number }) {
  const scope = useRef<HTMLSpanElement>(null);
  const number = useRef<HTMLSpanElement>(null);
  const formatted = value.toLocaleString("en-US");

  useGSAP(() => {
    const element = number.current;
    if (!element) return;
    const media = gsap.matchMedia();
    media.add({ all: "all", reduce: "(prefers-reduced-motion: reduce)", print: "print" }, context => {
      element.textContent = formatted;
      if (context.conditions?.reduce || context.conditions?.print) return;
      const count = { value: 0 };
      element.textContent = "0";
      gsap.to(count, {
        value, duration: 1.4, ease: "power2.out",
        onUpdate: () => { element.textContent = Math.round(count.value).toLocaleString("en-US"); },
        onComplete: () => { element.textContent = formatted; },
        // Keep the trigger until cleanup, including when loading at restored scroll.
        scrollTrigger: { trigger: scope.current, start: "top 95%", toggleActions: "play none none none" },
      });
      return () => { element.textContent = formatted; };
    });
    return () => media.revert();
  }, { scope, dependencies: [value, formatted], revertOnUpdate: true });

  return <span ref={scope} className="animated-count" data-count={value}>
    <span className="count-accessible">{formatted}</span>
    <span ref={number} aria-hidden="true" style={{ display: "inline-block", minWidth: `${formatted.length}ch`, fontVariantNumeric: "tabular-nums" }}>{formatted}</span>
  </span>;
}
