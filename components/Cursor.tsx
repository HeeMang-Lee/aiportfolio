"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * 액센트가 칠해지는 네 곳 중 하나. 지금 손이 어디 있는지만 알린다.
 *
 * 포인터가 없는 기기에서는 아예 마운트하지 않는다. globals.css 가
 * hover/pointer 미디어 쿼리 안에서만 기본 커서를 숨기므로, 여기서도 같은
 * 조건을 걸어야 터치 기기에 유령 점이 남지 않는다.
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = dot.current;
    if (!fine || reduced || !el) return;

    // quickTo 는 매 프레임 트윈을 새로 만들지 않는다. mousemove 마다 gsap.to 를
    // 부르면 트윈이 쌓여서 끊긴다.
    const x = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
    const y = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });

    const move = (e: PointerEvent) => {
      x(e.clientX);
      y(e.clientY);
      if (el.style.opacity !== "1") gsap.to(el, { opacity: 1, duration: 0.3 });
    };

    // 링크와 버튼 위에서 커진다. 개별 리스너 대신 위임으로 붙여서
    // 나중에 추가되는 요소도 자동으로 잡히게 한다.
    const isInteractive = (t: EventTarget | null) =>
      t instanceof Element && !!t.closest("a, button, [data-cursor]");

    const over = (e: PointerEvent) => {
      if (isInteractive(e.target)) gsap.to(el, { scale: 3.2, duration: 0.35, ease: "power3.out" });
    };
    const out = (e: PointerEvent) => {
      if (isInteractive(e.target)) gsap.to(el, { scale: 1, duration: 0.35, ease: "power3.out" });
    };
    const leave = () => gsap.to(el, { opacity: 0, duration: 0.2 });

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    window.addEventListener("pointerout", out);
    document.addEventListener("pointerleave", leave);

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      window.removeEventListener("pointerout", out);
      document.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div
      ref={dot}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-50 h-2 w-2 rounded-full bg-accent opacity-0 mix-blend-difference"
      style={{ translate: "-50% -50%" }}
    />
  );
}
