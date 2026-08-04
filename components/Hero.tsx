"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * 전폭 디스플레이. 히어로만 스크롤 트리거 없이 로드 직후 재생한다 -
 * 이미 뷰포트 안에 있으므로 트리거를 걸면 오히려 한 박자 늦는다.
 */
export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.to("[data-slice]", {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.3,
        stagger: 0.12,
      })
        .to("[data-line] > *", { y: 0, duration: 0.9, stagger: 0.08 }, "-=0.8")
        .to("[data-fade]", { opacity: 1, duration: 0.8, stagger: 0.1 }, "-=0.6");
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="flex min-h-screen flex-col justify-between px-6 pb-16 pt-30 md:px-16"
    >
      {/* 이름이 이 페이지에서 가장 큰 덩어리다. Young Serif 가 200px 에서도
          얇아지지 않는다는 성질이 여기서 값을 한다. */}
      <h1 className="font-display text-display-xl">
        <span className="line-mask">
          <span data-slice className="pre-slice block">
            Lee
          </span>
        </span>
        <span className="line-mask">
          <span data-slice className="pre-slice block pl-[8vw]">
            Heemang
          </span>
        </span>
      </h1>

      <div className="mt-16 grid grid-cols-1 gap-10 border-t border-line pt-10 md:grid-cols-12">
        <p className="col-span-1 text-caption text-dim md:col-span-3">
          <span className="font-mono">Backend Engineer</span>
        </p>

        <div
          data-line
          className="pre-line col-span-1 max-w-measure text-body md:col-span-5"
        >
          <span className="line-mask">
            <span className="block">검증된 백엔드 위에 AI를 얹습니다.</span>
          </span>
          <span className="line-mask">
            <span className="block text-dim">
              트래픽이 한 점에 몰릴 때 정합성을 지키는 문제, 외부 API가 흔들려도
              버티는 구조, 메시지가 유실되지 않는 설계를 다뤄 왔습니다.
            </span>
          </span>
        </div>

        <div
          data-fade
          className="pre-reveal col-span-1 flex items-end md:col-span-3 md:col-start-11 md:justify-end"
        >
          <a
            href="#works"
            className="inline-flex items-center gap-2 text-caption transition-colors hover:text-accent"
          >
            작업 보기
            <span aria-hidden className="text-accent">
              ↓
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
