"use client";
import { useEffect, useRef, useState } from "react";
const sections = ["home","about","projects","github","experience","contact"];
export default function PortfolioNavigation() {
 const [active,setActive] = useState("home");
 const pendingTarget = useRef<string | null>(null);
 const pendingTimer = useRef<number | null>(null);
 useEffect(() => {
 let frame = 0;
 const update = () => {
  cancelAnimationFrame(frame);
  frame = requestAnimationFrame(() => {
   if (pendingTarget.current) {
    const target = document.getElementById(pendingTarget.current);
    const headerHeight = document.querySelector(".site-header")?.getBoundingClientRect().height ?? 0;
    if (target && Math.abs(target.getBoundingClientRect().top - headerHeight) > 12) {
     setActive(current => current === pendingTarget.current ? current : pendingTarget.current ?? current);
     return;
    }
    pendingTarget.current = null;
   }
   const marker = Math.min(window.innerHeight * 0.25, 160);
   let current = "home";
   for (const id of sections) {
    const section = document.getElementById(id);
    if (section && section.getBoundingClientRect().top <= marker) current = id;
   }
   if (window.scrollY > 0 && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) current = "contact";
   setActive(previous => previous === current ? previous : current);
  });
 };
 update();
 window.addEventListener("scroll",update,{passive:true});
 window.addEventListener("resize",update);
 window.addEventListener("hashchange",update);
 return () => {cancelAnimationFrame(frame);window.removeEventListener("scroll",update);window.removeEventListener("resize",update);window.removeEventListener("hashchange",update);if (pendingTimer.current) window.clearTimeout(pendingTimer.current);};
 },[]);
 const selectSection = (id: string) => {
  pendingTarget.current = id;
  setActive(id);
  if (pendingTimer.current) window.clearTimeout(pendingTimer.current);
  pendingTimer.current = window.setTimeout(() => { pendingTarget.current = null; }, 1800);
 };
 return <nav aria-label="Main navigation">{sections.map(id=><a key={id} href={"#"+id} aria-current={active===id?"location":undefined} onClick={()=>selectSection(id)}>{id === "about" ? "About & Skills" : id === "github" ? "GitHub" : id[0].toUpperCase()+id.slice(1)}</a>)}</nav>;
}
