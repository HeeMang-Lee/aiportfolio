"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Mode = "slice" | "line" | "fade";

/**
 * 진입 모션 하나로 통일한다. 섹션마다 다른 방식으로 등장하면 산만하다.
 * framer-motion 을 쓰던 이전 버전을 대체한다 - 스크롤 진실을 Lenis 하나로
 * 두려면 진입 모션도 ScrollTrigger 에 물려 있어야 한다.
 *
 * 초기 상태는 CSS 클래스(.pre-*)가 잡는다. JS 로만 잡으면 하이드레이션 전에
 * 한 프레임 번쩍인다. prefers-reduced-motion 에서는 globals.css 가 그 클래스를
 * 무력화하므로 여기서는 트리거를 걸지 않기만 하면 된다.
 */
export default function Reveal({
  as: Tag = "div",
  mode = "fade",
  delay = 0,
  className = "",
  children,
}: {
  as?: ElementType;
  mode?: Mode;
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const common = {
        delay,
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      };

      if (mode === "slice") {
        gsap.to(el, {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.1,
          ease: "expo.out",
          ...common,
        });
      } else if (mode === "line") {
        // 자식 하나하나가 마스크 안의 줄이다. 부모에 overflow:hidden 이 걸려 있다.
        gsap.to(el.children, {
          y: 0,
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.08,
          ...common,
        });
      } else {
        gsap.to(el, { opacity: 1, duration: 0.8, ease: "power2.out", ...common });
      }
    }, el);

    return () => ctx.revert();
  }, [mode, delay]);

  const initial =
    mode === "slice" ? "pre-slice" : mode === "line" ? "pre-line" : "pre-reveal";

  return (
    <Tag ref={ref} className={`${initial} ${className}`}>
      {children}
    </Tag>
  );
}
