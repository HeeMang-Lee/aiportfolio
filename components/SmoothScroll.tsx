"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * 스크롤 진실을 하나로 만든다.
 *
 * Lenis 가 스크롤 위치를 자체 루프에서 보간하므로, 네이티브 scroll 이벤트로
 * 읽은 값은 실제 렌더 위치와 어긋난다. ScrollTrigger 를 Lenis 의 프레임에
 * 물려서 두 개의 진실이 생기지 않게 한다. 그래서 이 프로젝트 어디에서도
 * scroll 이벤트를 직접 듣지 않는다.
 */
export default function SmoothScroll() {
  useEffect(() => {
    // 모션을 끈 사용자에게 관성 스크롤은 그 자체로 방해다. Lenis 를 아예 켜지 않는다.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      // 터치에서는 관성을 브라우저에 맡긴다. 겹치면 스크롤이 무겁게 느껴진다.
      smoothWheel: true,
      syncTouch: false,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => {
      // GSAP 은 초, Lenis 는 밀리초를 쓴다.
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
