"use client";

import { useEffect, useState } from "react";

export default function ThemeSwitch() {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(stored || (prefersDark ? "dark" : "light"));
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);

    const root = document.documentElement;
    if (next === "dark") {
      root.classList.add("dark");
      root.style.colorScheme = "dark";
    } else {
      root.classList.remove("dark");
      root.style.colorScheme = "light";
    }
  };

  const isDark = mounted && theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle dark mode"
      className={[
        "relative inline-flex items-center shrink-0",
        "w-11 h-6 rounded-full",
        "transition-colors duration-300",
        isDark ? "bg-primary" : "bg-foreground/20",
      ].join(" ")}
    >
      <span
        className={[
          "inline-flex items-center justify-center",
          "absolute top-0.5 left-0.5",
          "w-5 h-5 rounded-full",
          "bg-card shadow-sm",
          "transition-transform duration-300",
          isDark ? "translate-x-5" : "translate-x-0",
        ].join(" ")}
        aria-hidden="true"
      >
        {mounted ? (isDark ? <MoonIcon /> : <SunIcon />) : null}
      </span>
    </button>
  );
}

/* --------------------------------------------------------------- */

function Icon({ children, size = 11 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="text-foreground"
    >
      {children}
    </svg>
  );
}

function SunIcon() {
  return (
    <Icon>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </Icon>
  );
}

function MoonIcon() {
  return (
    <Icon>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </Icon>
  );
}