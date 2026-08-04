"use client";

import { Menu } from "lucide-react";
import { useRef } from "react";

const navigationItems = [
  ["Projects", "projects"],
  ["Skills", "skills"],
  ["Services", "services"],
  ["Experience", "experience"],
  ["Activity", "activity"],
  ["Education", "education"],
  ["Contact", "contact"],
] as const;

export default function MobileNavigation() {
  const menuRef = useRef<HTMLDetailsElement>(null);

  function closeMenu() {
    menuRef.current?.removeAttribute("open");
  }

  return (
    <details ref={menuRef} className="mobile-menu">
      <summary aria-label="Open navigation menu">
        <Menu size={16} aria-hidden="true" />
        <span className="sr-only">Open navigation menu</span>
      </summary>
      <nav className="mobile-menu-nav" aria-label="Mobile navigation">
        {navigationItems.map(([label, id]) => (
          <a key={id} href={`#${id}`} onClick={closeMenu}>
            {label}
          </a>
        ))}
      </nav>
    </details>
  );
}
