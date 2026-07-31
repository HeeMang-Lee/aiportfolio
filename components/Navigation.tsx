"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";

const navItems = [
  { label: "소개", href: "#about" },
  { label: "AI 협업", href: "#ai-experience" },
  { label: "프로젝트", href: "#projects" },
  { label: "기술", href: "#skills" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const reduce = useReducedMotion();

  // Scroll state comes from a motion value, never a scroll event listener.
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  useEffect(() => setMounted(true), []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-paper transition-colors duration-200 ${
        scrolled ? "border-b border-rule" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-page items-center justify-between px-6 md:px-10">
        <a
          href="#"
          className="text-[15px] font-semibold tracking-[-0.01em] text-ink"
        >
          이희망
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[13px] text-meta transition-colors hover:text-ink"
            >
              {item.label}
            </a>
          ))}
          <ThemeToggle
            mounted={mounted}
            resolvedTheme={resolvedTheme}
            setTheme={setTheme}
          />
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle
            mounted={mounted}
            resolvedTheme={resolvedTheme}
            setTheme={setTheme}
          />
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="p-2 text-ink"
            aria-label={mobileOpen ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X size={18} strokeWidth={1.5} />
            ) : (
              <Menu size={18} strokeWidth={1.5} />
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence initial={false}>
        {mobileOpen && (
          <motion.div
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-rule bg-paper md:hidden"
          >
            <div className="mx-auto flex max-w-page flex-col px-6 py-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="border-b border-rule py-3 text-[15px] text-body last:border-b-0"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function ThemeToggle({
  mounted,
  resolvedTheme,
  setTheme,
}: {
  mounted: boolean;
  resolvedTheme: string | undefined;
  setTheme: (t: string) => void;
}) {
  // Reserve the box before mount so the nav does not shift when the icon lands.
  if (!mounted) return <span className="block h-9 w-9" aria-hidden />;

  const isDark = resolvedTheme === "dark";
  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="p-2 text-meta transition-colors hover:text-ink"
      aria-label={isDark ? "밝은 테마로 전환" : "어두운 테마로 전환"}
    >
      {isDark ? (
        <Sun size={17} strokeWidth={1.5} />
      ) : (
        <Moon size={17} strokeWidth={1.5} />
      )}
    </button>
  );
}
