"use client";

import Image from "next/image";
import { forwardRef, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { works, type Work } from "@/content/works";

/**
 * 이 사이트의 중심. 섹션이 뷰포트에 고정된 채로 세로 스크롤이 가로 이동으로
 * 번역된다. 시간이 왼쪽에서 오른쪽으로 밀려간다.
 *
 * 모바일에서는 핀을 걸지 않는다. 터치 기기에서 핀 + 가로 스크럽은 스크롤을
 * 빼앗기는 느낌이라 세로 목록으로 접는다. gsap.matchMedia 가 리사이즈 시
 * 자동으로 되돌린다.
 */
export default function Works() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const stamp = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const panels = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    mm.add(
      {
        pinned: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
      },
      (ctx) => {
        if (!ctx.conditions?.pinned) return;
        const el = track.current;
        const wrap = section.current;
        if (!el || !wrap) return;

        // 이동 거리는 트랙이 뷰포트보다 얼마나 넘치는지다. 리사이즈로 폭이
        // 바뀌면 값이 달라지므로 함수로 넘겨 invalidateOnRefresh 가 다시 재게 한다.
        const distance = () => el.scrollWidth - window.innerWidth;

        const tween = gsap.to(el, { x: () => -distance(), ease: "none" });

        const st = ScrollTrigger.create({
          trigger: wrap,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          // scrub:1 은 1초 지연 추종. true 는 스크롤에 딱 붙어 딱딱하다.
          scrub: 1,
          animation: tween,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`;

            // 진행도를 3등분해서 인덱스를 뽑으면 여는 판의 폭이 무시돼
            // 첫 작업이 아직 화면 가운데 있는데도 카운터가 넘어간다. 화면
            // 중앙에 가장 가까운 판을 직접 재서 고른다. 세 개뿐이라 싸다.
            const mid = window.innerWidth / 2;
            let best = 0;
            let bestGap = Infinity;
            panels.current.forEach((p, i) => {
              if (!p) return;
              const r = p.getBoundingClientRect();
              const gap = Math.abs(r.left + r.width / 2 - mid);
              if (gap < bestGap) {
                bestGap = gap;
                best = i;
              }
            });

            // React 상태로 두면 프레임마다 리렌더가 돈다.
            const next = works[best].stamp;
            if (stamp.current && stamp.current.textContent !== next) {
              stamp.current.textContent = next;
            }
          },
        });

        // 키보드로 Tab 을 누르면 아직 화면 밖에 있는 판의 링크로 포커스가 간다.
        // 브라우저는 그걸 보여주려고 조상 요소를 스크롤하는데, 트랙은 transform
        // 으로 움직이고 있어서 그 스크롤이 정렬을 깨뜨린다. 대신 포커스가 들어온
        // 판이 화면에 들어오는 세로 스크롤 위치를 직접 계산해서 그리로 보낸다.
        const onFocusIn = (e: FocusEvent) => {
          const target = e.target;
          if (!(target instanceof Element)) return;
          const panel = target.closest("[data-panel]");
          if (!(panel instanceof HTMLElement)) return;

          // 브라우저가 이미 밀어 놓은 스크롤을 되돌린다.
          el.scrollLeft = 0;
          wrap.scrollLeft = 0;

          const d = distance();
          if (d <= 0) return;
          // offsetLeft 는 transform 의 영향을 받지 않는 레이아웃 좌표라
          // 스크럽이 어디까지 갔든 같은 값이 나온다.
          const progress = Math.min(1, Math.max(0, panel.offsetLeft / d));
          window.scrollTo({
            top: st.start + progress * (st.end - st.start),
            behavior: "auto",
          });
        };
        wrap.addEventListener("focusin", onFocusIn);

        // 창을 모바일 폭으로 줄이면 matchMedia 가 이 분기를 되돌린다. 하지만
        // 카운터와 진행 막대는 GSAP 이 아니라 우리가 직접 쓴 값이라 revert 가
        // 건드리지 못한다. 손으로 되돌려야 마지막 작업의 시점이 눌러붙지 않는다.
        return () => {
          wrap.removeEventListener("focusin", onFocusIn);
          if (stamp.current) stamp.current.textContent = works[0].stamp;
          if (bar.current) bar.current.style.transform = "scaleX(0)";
        };
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section id="works" ref={section} className="relative overflow-hidden">
      <div
        ref={track}
        className="flex flex-col gap-30 px-6 py-30 md:h-screen md:flex-row md:items-center md:gap-0 md:px-0 md:py-0"
      >
        {/* 여는 판. 가로 트랙이 곧바로 첫 작업으로 시작하면 머리글과 겹친다. */}
        <div className="shrink-0 md:flex md:h-full md:w-[46vw] md:flex-col md:justify-center md:pl-16 md:pr-10">
          <p className="max-w-measure text-body text-dim">
            세 건 모두 <span className="text-text">부하 테스트나 계측으로 문제를 먼저 확인하고</span>{" "}
            구조를 바꾼 뒤 같은 방법으로 다시 잰 기록입니다. 아래 숫자는 전부
            실측값입니다.
          </p>
        </div>

        {works.map((w, i) => (
          <Panel
            key={w.id}
            work={w}
            ref={(el) => {
              panels.current[i] = el;
            }}
          />
        ))}

        {/* 닫는 판. 이게 없으면 마지막 작업이 화면 오른쪽 끝에 붙은 채로
            트랙이 끝나 한 번도 가운데에 서지 못한다. */}
        <div className="hidden shrink-0 md:block md:w-[30vw]" aria-hidden />
      </div>

      {/* 상태 띠. 섹션 제목과 시점 카운터, 진행 막대를 화면 아래에 모은다.
          위에 두면 판마다 큰 제목이 올라오는 자리와 겹친다. */}
      <div className="pointer-events-none absolute bottom-0 left-0 w-full">
        <div className="flex items-baseline gap-4 px-6 pb-4 md:px-16">
          <h2 className="font-display text-caption">Works</h2>
          <span ref={stamp} className="font-mono text-caption text-accent">
            {works[0].stamp}
          </span>
        </div>
        {/* 진행 막대는 핀이 걸린 데스크톱에서만 의미가 있다. */}
        <div className="hidden h-px w-full bg-line md:block">
          <div
            ref={bar}
            className="h-full w-full origin-left scale-x-0 bg-accent"
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
}

const Panel = forwardRef<HTMLElement, { work: Work }>(function Panel({ work }, ref) {
  return (
    // pb-16 은 아래 상태 띠가 차지하는 자리다. 없으면 마지막 줄이 띠에 깔린다.
    <article
      ref={ref}
      data-panel
      className="shrink-0 border-t border-line pt-6 md:flex md:h-full md:w-[76vw] md:flex-col md:justify-center md:border-l md:border-t-0 md:px-16 md:pb-16 md:pt-0"
    >
      <div className="grid gap-10 md:grid-cols-12 md:items-center">
        <div className="md:col-span-5">
          {/* 고정 비율 상자에 object-cover 로 채우지 않는다. 세 장이 1.5:1 과
              3:1 로 섞여 있어서 넓은 쪽이 절반 넘게 잘려 나갔다. 원본 비율대로
              열 폭에 맞춰 놓는다. 판이 세로 가운데 정렬이라 높이가 달라도 된다. */}
          <Image
            src={work.image}
            alt={`${work.title} 화면`}
            width={work.imageWidth}
            height={work.imageHeight}
            sizes="(max-width: 768px) 100vw, 32vw"
            className="h-auto w-full bg-elev"
          />
        </div>

        <div className="md:col-span-7">
          <div className="flex items-baseline gap-4 text-caption text-dim">
            <span className="font-mono">{work.index}</span>
            <span className="font-mono">{work.period}</span>
            <span>{work.role}</span>
          </div>

          <h3 className="mt-4 font-display text-display-l">{work.title}</h3>
          <p className="mt-2 text-caption text-dim">{work.kind}</p>

          <p className="mt-6 max-w-measure text-body text-dim">{work.summary}</p>

          {/* min-w-0 이 없으면 그리드 항목이 콘텐츠 폭만큼 밀려나 옆 칸을 침범한다.
              그리드 항목의 기본 min-width 는 0 이 아니라 auto 다. */}
          <dl className="mt-10 grid grid-cols-1 gap-6 border-t border-line pt-6 sm:grid-cols-3">
            {work.metrics.map((m) => (
              <div key={m.label} className="min-w-0">
                <dd className="flex flex-wrap items-baseline gap-x-2">
                  {/* 출발값은 캡션 크기로 둔다. 세 칸이 나란히 서는 자리라
                      양쪽을 다 크게 두면 서로 넘어간다. 강조할 값은 도착값이다. */}
                  {m.from && (
                    <span className="whitespace-nowrap text-caption text-dim">
                      <span className="font-mono">{m.from}</span>
                      <span aria-hidden> →</span>
                    </span>
                  )}
                  {/* 숫자와 단위는 한 덩어리로 묶는다. 떼어 두면 좁은 칸에서
                      단위만 다음 줄로 떨어져 "26,000" 과 "건" 이 갈라진다.
                      숫자만 Mono 다 - 한글 단위에 Mono 를 걸면 서체가 갈린다. */}
                  <span className="whitespace-nowrap">
                    <span className="font-mono text-heading">{m.to}</span>
                    {m.unit && <span className="text-caption">{m.unit}</span>}
                  </span>
                </dd>
                <dt className="mt-2 text-caption text-dim">{m.label}</dt>
              </div>
            ))}
          </dl>

          {/* 스택과 링크를 한 줄에 둔다. 따로 쌓으면 판이 세로로 넘친다. */}
          <div className="mt-6 flex flex-wrap items-baseline gap-x-6 gap-y-2 text-caption text-dim">
            {work.stack.map((s) => (
              <span key={s} className="font-mono">
                {s}
              </span>
            ))}
            {work.link && (
              <a
                href={work.link.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-text transition-colors hover:text-accent"
              >
                <span className="font-mono">{work.link.label}</span>
                <span aria-hidden className="text-accent">
                  →
                </span>
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
});
