import Reveal from "@/components/Reveal";

const credentials = [
  { name: "정보처리기사", year: "2023" },
  { name: "COS Pro Python 2급", year: "2022" },
];

/**
 * 3열 오프셋. 좌측에 라벨만 두고 본문은 5열부터 시작한다.
 * 히어로(전폭)와도, 작업(가로 트랙)과도 다른 계열이어야 템플릿으로 읽히지 않는다.
 */
export default function About() {
  return (
    <section id="about" className="px-6 py-50 md:px-16">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
        <h2 className="text-caption text-dim md:col-span-3">
          <span className="font-mono">About</span>
        </h2>

        <div className="md:col-span-7 md:col-start-5">
          <Reveal as="div" mode="fade">
            {/* 한글이 디스플레이 크기로 나오는 유일한 자리다. 영문 세리프와
                짝을 맞추려고 여기만 Noto Serif KR 을 건다. */}
            <p className="font-display-ko text-display-ko">
              왜 이 방법이어야 하는가를
              <br />
              설명할 수 있는 코드
            </p>
          </Reveal>

          <Reveal as="div" mode="fade" delay={0.1}>
            <div className="mt-16 max-w-measure space-y-6 text-body text-dim">
              <p>
                기능을 동작하게 만드는 것을 넘어, 같은 문제라도 여러 방식으로
                구현하고 비교해 본 뒤{" "}
                <span className="text-text">트레이드오프를 근거로 선택하는 과정</span>을
                중요하게 생각합니다. 메시지 처리 방식을 정할 때도 세 가지를 직접
                구현하고 벤치마크로 재본 뒤에 골랐습니다.
              </p>
              <p>
                검증은 추측이 아니라 데이터로 합니다. 부하 테스트와 벤치마크,
                단위 테스트로 &ldquo;구현했다&rdquo;가 아니라 &ldquo;이렇게
                동작한다&rdquo;를 확인하는 습관을 들였습니다.
              </p>
              <p>
                요즘은 분산 환경에서의 정합성과 메시징에 가장 관심이 많습니다.
                여러 서버와 여러 소비자가 같은 데이터를 다룰 때 순서를 어떻게
                보장하고 장애가 났을 때 어떻게 복구하는지가 백엔드의 본질적인
                어려움이라고 생각합니다.
              </p>
              <p>
                AI는 협업 도구로 씁니다. 제약사항과 검수 기준을 먼저 정의해
                에이전트에게 구현을 맡기고 결과를 직접 리뷰합니다.{" "}
                <span className="text-text">
                  설계 판단과 검증의 책임은 개발자에게 있다고 생각합니다.
                </span>
              </p>
              <p>강원대학교 수학과를 졸업했고, 제조 MES 도메인 경험이 있습니다.</p>
            </div>
          </Reveal>

          <Reveal as="dl" mode="fade" delay={0.15}>
            <div className="mt-16 border-t border-line pt-6">
              <dt className="text-caption text-dim">
                <span className="font-mono">Certifications</span>
              </dt>
              <dd className="mt-4 flex flex-wrap gap-x-10 gap-y-2">
                {credentials.map((c) => (
                  <span key={c.name} className="flex items-baseline gap-2 text-caption">
                    {c.name}
                    <span className="font-mono text-dim">{c.year}</span>
                  </span>
                ))}
              </dd>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
