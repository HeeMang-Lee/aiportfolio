"use client";

import Image from "next/image";
import { forwardRef, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Diagram from "@/components/Diagram";
import { works, type Work } from "@/content/works";

/** 판 하나가 화면을 옮겨 오는 데 쓰는 시간. */
const MOVE = 0.8;
/** 상세가 짧아도 최소한 이만큼은 머문다. */
const MIN_DWELL = 1.2;
/** 상세가 다 흐른 뒤 멈춰 서는 시간. 마지막 블록을 읽을 자리다.
 *  이게 없으면 마지막 블록은 체류가 끝나는 순간에야 제자리에 오고
 *  곧바로 다음 판으로 밀려나서 한 번도 읽히지 않는다. */
const HOLD = 1.2;
/** 타임라인 1단위를 몇 픽셀 스크롤로 환산할지. */
const unitPx = () => window.innerHeight * 0.7;

/**
 * 이 사이트의 중심.
 *
 * 판이 화면 가운데로 들어오면 거기서 멈춰 서고, 그 동안 스크롤이 상세를
 * 위로 흘려보낸다. 상세가 다 흐르면 다음 판으로 넘어간다. 이동과 체류를
 * 번갈아 넣은 하나의 타임라인을 스크롤에 물려서 만든다.
 *
 * 사진은 타임라인이 아니라 매 프레임 화면 중앙과의 거리로 크기를 정한다.
 * 타임라인에 넣으면 이동 구간마다 트윈을 따로 잡아야 하는데, 거리로
 * 계산하면 구조가 바뀌어도 알아서 맞는다.
 *
 * 모바일과 reduced-motion 에서는 핀을 걸지 않는다. 터치 기기에서 핀 + 가로
 * 스크럽은 스크롤을 빼앗기는 느낌이라 세로 목록으로 접는다.
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
        stacked: "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
      },
      (ctx) => {
        const el = track.current;
        const wrap = section.current;
        if (!el || !wrap) return;
        const list = panels.current.filter((p): p is HTMLElement => !!p);

        // 세로로 접힌 화면에서는 판이 스스로 화면에 들어올 때 글이 떠오른다.
        if (ctx.conditions?.stacked) {
          list.forEach((panel) => {
            panel.querySelectorAll<HTMLElement>("[data-block]").forEach((b) => {
              gsap.fromTo(
                b,
                { opacity: 0, y: 16 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.7,
                  ease: "power2.out",
                  scrollTrigger: { trigger: b, start: "top 88%", once: true },
                }
              );
            });
          });
          return;
        }
        if (!ctx.conditions?.pinned) return;

        const images = list.map((p) => p.querySelector<HTMLElement>("[data-img]"));
        // quickSetter 는 매 프레임 트윈을 새로 만들지 않는다. onUpdate 에서
        // gsap.to 를 부르면 트윈이 쌓여 끊긴다.
        const setScale = images.map((img) =>
          img ? gsap.quickSetter(img, "scale") : null
        );
        const setFade = list.map((p) => gsap.quickSetter(p, "opacity"));

        const tl = gsap.timeline({ defaults: { ease: "none" } });
        // 각 판의 체류가 타임라인 어디서 시작하는지. 포커스 이동이 이걸 쓴다.
        const dwellStarts: number[] = [];

        list.forEach((panel) => {
          const inner = panel.querySelector<HTMLElement>("[data-stream]");
          const port = panel.querySelector<HTMLElement>("[data-port]");
          const blocks = Array.from(
            panel.querySelectorAll<HTMLElement>("[data-block]")
          );

          // 이동 - 판이 화면 왼쪽 끝에 맞춰 선다. 판 폭이 100vw 라
          // 왼쪽 끝 정렬이 곧 화면 가운데 정렬이다.
          tl.to(el, {
            x: () => -(panel.offsetLeft - el.offsetLeft),
            duration: MOVE,
          });

          const at = tl.duration();
          dwellStarts.push(at);

          if (!inner || !port) {
            tl.to({}, { duration: MIN_DWELL + HOLD });
            return;
          }

          const portH = port.clientHeight;
          const overflow = Math.max(0, inner.scrollHeight - portH);

          // 블록이 스트림 안에서 어디쯤 있는지 미리 잰다. 초기 상태를 걸기
          // 전에 재야 y 이동값이 섞이지 않는다.
          const streamTop = inner.getBoundingClientRect().top;
          const offsets = blocks.map(
            (b) => b.getBoundingClientRect().top - streamTop
          );

          // 상세는 처음엔 없다. 스크롤이 하나씩 꺼내 놓는다.
          gsap.set(blocks, { opacity: 0, y: 24 });

          // 체류 길이를 글 길이에 맞춘다. 고정값으로 두면 긴 글은 날아가고
          // 짧은 글은 늘어진다. 넘치는 픽셀만큼 스크롤을 쓰면 일반 페이지를
          // 읽는 것과 같은 속도가 된다.
          const dwell = Math.max(MIN_DWELL, overflow / unitPx());

          tl.to(inner, { y: () => -overflow, duration: dwell }, at);

          // 블록은 각자 창 아래로 들어오는 시점에 뜬다. 일괄 stagger 로 두면
          // 블록 높이가 제각각이라 이미 화면에 있는 글이 나중에 뜬다.
          blocks.forEach((b, i) => {
            const p =
              overflow > 0
                ? Math.min(1, Math.max(0, (offsets[i] - portH * 0.85) / overflow))
                : 0;
            tl.to(b, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, at + p * dwell);
          });

          // 다 흐른 자리에서 멈춘다. 다음 판으로 넘어가기 전의 숨이기도 하다.
          tl.to({}, { duration: HOLD }, at + dwell);
        });

        ScrollTrigger.create({
          trigger: wrap,
          start: "top top",
          end: () => `+=${tl.duration() * unitPx()}`,
          pin: true,
          // scrub:1 은 1초 지연 추종. true 는 스크롤에 딱 붙어 딱딱하다.
          scrub: 1,
          animation: tl,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`;

            const vw = window.innerWidth;
            let best = 0;
            let bestGap = Infinity;

            list.forEach((panel, i) => {
              const r = panel.getBoundingClientRect();
              const gap = Math.abs(r.left + r.width / 2 - vw / 2);
              // 화면 하나만큼 떨어지면 0, 정중앙이면 1.
              const near = Math.max(0, 1 - gap / vw);
              setScale[i]?.(0.84 + 0.16 * near);
              setFade[i](0.25 + 0.75 * near);
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
        // 으로 움직이고 있어서 그 스크롤이 정렬을 깨뜨린다. 대신 그 판이 화면에
        // 들어오는 세로 위치를 직접 계산해서 그리로 보낸다.
        const st = ScrollTrigger.getAll().find((t) => t.trigger === wrap);
        const onFocusIn = (e: FocusEvent) => {
          const target = e.target;
          if (!(target instanceof Element)) return;
          const panel = target.closest("[data-panel]");
          if (!(panel instanceof HTMLElement) || !st) return;

          el.scrollLeft = 0;
          wrap.scrollLeft = 0;

          const i = list.indexOf(panel);
          if (i < 0) return;
          // 그 판의 체류가 시작되는 시점. 이동이 막 끝난 자리다.
          const p = dwellStarts[i] / tl.duration();
          window.scrollTo({ top: st.start + p * (st.end - st.start), behavior: "auto" });
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
        className="flex flex-col gap-30 py-30 md:h-screen md:flex-row md:items-stretch md:gap-0 md:py-0"
      >
        {/* 여는 판. 가로 트랙이 곧바로 첫 작업으로 시작하면 들어서는 느낌이 없다. */}
        <div className="shrink-0 px-6 md:flex md:w-screen md:flex-col md:justify-center md:px-16">
          <p className="max-w-measure text-body text-dim">
            세 건 모두{" "}
            <span className="text-text">부하 테스트나 계측으로 문제를 먼저 확인하고</span>{" "}
            구조를 바꾼 뒤 같은 방법으로 다시 잰 기록입니다. 아래 숫자는 전부
            실측값입니다.
          </p>
          <p className="mt-10 max-w-measure text-caption text-dim">
            판이 가운데 서면 그 프로젝트의 트러블슈팅이 차례로 흘러나옵니다.
            계속 내리면 다음 프로젝트로 넘어갑니다.
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
      className="shrink-0 border-t border-line px-6 pt-10 md:flex md:w-screen md:flex-col md:justify-center md:border-l md:border-t-0 md:px-16 md:pb-16 md:pt-0"
    >
      {/* grid-template-rows 를 명시하지 않으면 단일 행이 auto 로 잡혀 내용만큼
          늘어난다. 그러면 컨테이너는 78vh 인데 행은 그보다 커져서 자식의
          h-full 이 78vh 가 아닌 내용 높이를 가리키고 사진이 판 밖으로 넘친다.
          minmax(0,1fr) 로 행을 컨테이너에 묶고 자식이 줄어들 수 있게 한다. */}
      <div className="grid gap-10 md:h-[82vh] md:grid-cols-12 md:gap-16 md:[grid-template-rows:minmax(0,1fr)]">
        {/* 왼쪽 기둥은 신원이다. 무엇을, 언제, 어떤 결과로. 스크롤해도 그대로 있다. */}
        <div className="flex flex-col justify-center md:col-span-5 md:h-full">
          {/* 메타와 스택을 한 덩어리로 흘린다. 줄을 나누면 그만큼이 그대로
              사진 높이에서 빠진다. */}
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-caption text-dim">
            <span className="font-mono">{work.index}</span>
            <span className="font-mono">{work.period}</span>
            <span>{work.role}</span>
            <span aria-hidden className="text-line">
              /
            </span>
            {work.stack.map((t) => (
              <span key={t} className="font-mono">
                {t}
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

          {/* 5열(약 520px) 안에 서야 해서 display-l(72px)이 아니라 display-m 이다. */}
          <h3 className="mt-4 font-display text-display-m">{work.title}</h3>
          <p className="mt-2 text-caption text-dim">{work.kind}</p>


          {/* min-w-0 이 없으면 그리드 항목이 콘텐츠 폭만큼 밀려나 옆 칸을 침범한다.
              그리드 항목의 기본 min-width 는 0 이 아니라 auto 다. */}
          <dl className="mt-6 grid grid-cols-1 gap-4 border-t border-line pt-6 sm:grid-cols-3">
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

          {/* 고정 비율 상자에 object-cover 로 채우지 않는다. 세 장이 1.5:1 과
              3:1 로 섞여 있어서 넓은 쪽이 절반 넘게 잘려 나갔다. 원본 비율은
              지키되 남는 높이에 맞춰 줄어들게 둔다 - flex-1 없이 두면 세로가
              짧은 화면에서 사진이 판 밖으로 넘친다. 크기의 미세 조정은
              화면 중앙과의 거리가 맡는다. */}
          <div className="mt-6 flex md:min-h-0 md:flex-1 md:items-start">
            <Image
              data-img
              src={work.image}
              alt={`${work.title} 화면`}
              width={work.imageWidth}
              height={work.imageHeight}
              sizes="(max-width: 768px) 100vw, 42vw"
              className="h-auto w-full origin-left object-contain object-left-top will-change-transform md:max-h-full"
            />
          </div>

        </div>

        {/* 오른쪽 기둥은 전부 내용이다. 데스크톱에서는 여기만 잘라 위로 민다.
            모바일에서는 그냥 이어지는 글이다. */}
        <div
          data-port
          className="md:col-span-6 md:col-start-7 md:min-h-0 md:overflow-hidden md:[mask-image:linear-gradient(to_bottom,transparent,#000_28px,#000_calc(100%-48px),transparent)]"
        >
          <div data-stream className="space-y-16 md:pb-16 md:will-change-transform">
            {/* 요약도 흐르는 쪽에 둔다. 고정 영역에 두면 창이 좁아진다. */}
            <p data-block className="max-w-measure text-body">
              {work.summary}
            </p>

            {work.details.map((d) => (
              <div key={d.tag} data-block className="max-w-measure">
                {/* 액센트를 쓰지 않는다. 20개가 전부 액센트면 신호가 아니라 배경이 된다. */}
                <p className="font-mono text-caption text-dim">{d.tag}</p>
                <h4 className="mt-3 text-heading">{d.heading}</h4>
                {/* 본문은 text-dim(5.46:1)이 아니라 text 다. 긴 글을 흐린 색으로
                    두면 읽히지 않는다. 흐린 색은 메타에만 쓴다. */}
                <p className="mt-4 text-body">{d.body}</p>
                {d.diagram && <Diagram spec={d.diagram} />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
});
