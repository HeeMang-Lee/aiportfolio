import Reveal from "@/components/Reveal";

const credentials = [
  { name: "정보처리기사", year: "2023" },
  { name: "COS Pro Python 2급", year: "2022" },
];

export default function About() {
  return (
    <section id="about" className="border-b border-rule">
      <div className="mx-auto max-w-page px-6 py-20 md:px-10 md:py-28">
        <Reveal>
          <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-ink">
            개발자가 된 이유
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-10 md:grid-cols-[200px_1fr] md:gap-16">
          <Reveal>
            {/* TODO: drop a portrait at public/portrait.jpg (4:5, min 640x800),
                then replace this block with next/image. Until then the slot
                holds its space so the layout does not shift on the day it lands. */}
            <div className="flex aspect-[4/5] w-full max-w-[200px] items-end rounded border border-rule p-3">
              <span className="text-[11px] font-medium tracking-meta text-meta">
                사진 자리
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="max-w-measure space-y-6 text-[15px] leading-[1.75] tracking-[-0.005em] text-body">
              <p>
                <span className="text-ink">강원대학교 수학과</span>를 졸업했다.
                수학 전공이 개발에 꽤 도움이 된다. 문제를 쪼개고 논리적으로
                접근하는 습관이 거기서 왔다.
              </p>
              <p>
                처음엔 그냥 코딩을 배워보자는 거였는데, 직접 만든 서비스에 100명
                넘는 사용자가 생기고 피드백이 오기 시작하면서 확신이 생겼다.
              </p>
              <p className="text-ink">
                내가 만든 게 누군가한테 쓸모가 있다는 감각. 그게 개발을 계속하고
                싶은 이유다.
              </p>
            </div>

            {/* The credential list sits under the prose, not beside the portrait:
                two short columns of unequal height left a visible hole. */}
            <dl className="mt-10 border-t border-rule pt-5">
              <dt className="text-[11px] font-medium tracking-meta text-meta">
                자격증
              </dt>
              <dd className="mt-3 flex flex-wrap gap-x-10 gap-y-2">
                {credentials.map((c) => (
                  <span
                    key={c.name}
                    className="flex items-baseline gap-2.5 text-[13px] text-body"
                  >
                    {c.name}
                    <span className="font-mono tnum text-[11px] tracking-label text-meta">
                      {c.year}
                    </span>
                  </span>
                ))}
              </dd>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
