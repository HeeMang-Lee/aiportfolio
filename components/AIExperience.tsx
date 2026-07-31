import Reveal from "@/components/Reveal";

type Entry = {
  period: string;
  /** The transferable rule. It leads the entry because it is the takeaway. */
  rule: string;
  where: string;
  current?: boolean;
  blocks: { label: string; body: React.ReactNode }[];
};

const TossTestArticle = () => (
  <a
    href="https://toss.tech/article/test-strategy-server"
    target="_blank"
    rel="noopener noreferrer"
    className="text-accent underline underline-offset-4 decoration-1 transition-colors hover:text-accent-hover"
  >
    toss.tech의 서버 테스트 전략 글
  </a>
);

/**
 * Figures live in the hero and in Projects. This section owns the method, so
 * the 결과 blocks say what the working style produced, not what the number was.
 */
const entries: Entry[] = [
  {
    period: "2025.11 - 2025.12",
    rule: "AI 산출물을 그대로 쓰지 않는다",
    where: "모네스트AI 인턴십",
    blocks: [
      {
        label: "상황",
        body: "금융 트레이딩 시스템의 테스트 커버리지가 0%인 상태에서 실서비스 투입이 예정되어 있었다. 주문 실행, 계좌 관리, 포트폴리오 생성, 서비스 간 E2E 테스트까지 필요했고, 인턴 기간 내에 수동으로 처리하기엔 현실적으로 불가능한 규모였다.",
      },
      {
        label: "어떻게 했나",
        body: (
          <>
            테스트 코드 작성은 AI에게 위임하기 적합한 작업이라 판단했다. 다만
            처음 맡겼을 때 파라미터 검증, null 체크 같은 의미 없는 테스트가
            과도하게 생성되는 문제가 있었다. <TossTestArticle />을 참고하여
            &ldquo;구현 상세가 아닌 행위를 검증하라&rdquo;는 기준을 세우고,
            &ldquo;잔고 부족 시 주문 실패&rdquo;, &ldquo;중복 종목 포트폴리오
            생성&rdquo; 등 실제 비즈니스 로직을 검증하는 시나리오를 명시하여
            AI에게 재지시했다.
          </>
        ),
      },
      {
        label: "결과",
        body: "AI의 산출물을 그대로 사용한 것이 아니라 검수, 방향 수정, 재생성 사이클을 반복하며 품질을 관리했다. 기준을 먼저 세우면 같은 도구로도 결과가 달라진다는 걸 확인한 작업이다.",
      },
    ],
  },
  {
    period: "2025.10 - 2025.12",
    rule: "학습한 지식을 먼저 정리해서 넘긴다",
    where: "항해99 이커머스 서버",
    blocks: [
      {
        label: "상황",
        body: "동시 주문이 집중될 때 재고 정합성이 깨지는 문제가 있었다. 동시성 제어 방식은 수업과 멘토링에서 개념을 배웠지만, 실제 프로젝트에 어떤 방식이 적합한지는 직접 비교 검증이 필요했다.",
      },
      {
        label: "어떻게 했나",
        body: "멘토링에서 정리한 락 종류별 트레이드오프 문서를 Claude Code에 먼저 전달하고, 프로젝트 제약사항(Redis 단일 인스턴스, JPA 기반)에 맞는 설계 방향을 함께 정리했다. 비관적 락, Redisson 분산락, 스핀락 세 가지를 모두 구현한 뒤 성능 테스트로 비교했다.",
      },
      {
        label: "결과",
        body: "실측 데이터를 근거로 최종안을 선택했다. 아는 것을 먼저 문서로 정리해서 넘기면 AI가 내는 선택지의 품질이 달라진다.",
      },
    ],
  },
  {
    period: "2026.03 - 현재",
    rule: "품질은 프롬프트가 아니라 문서로 방어한다",
    where: "블로그 프로젝트",
    current: true,
    blocks: [
      {
        label: "상황",
        body: "하나의 AI 에이전트에 모든 작업을 맡기면 대화가 길어질수록 맥락이 흐려졌다. 에이전트가 재시작될 때마다 아키텍처 규칙, 네이밍 컨벤션, 금지사항을 처음부터 다시 설명해야 하는 비효율이 반복됐다. AI의 성능 차이는 도구 자체보다 사용 방법의 편차에서 온다고 판단했다.",
      },
      {
        label: "어떻게 했나",
        body: "개인의 프롬프트 역량에 의존하지 않고, 시스템으로 품질의 저점을 방어하는 방식을 택했다. 아키텍처 원칙, 패키지 구조, 구현 순서, 금지사항(@Setter 금지, 순환 의존 금지 등)을 skills.md에 문서화하여 누가 에이전트를 실행해도 동일한 컨텍스트에서 시작하도록 설계했다.",
      },
      {
        label: "결과",
        body: "반복 설명 없이 일관된 결과물을 얻을 수 있게 됐다. 에이전트가 교체되어도 지시서 기반으로 품질 기준이 유지되고, 발견한 규칙은 대화와 함께 사라지지 않고 Git에 남아 다음 세션의 컨텍스트가 된다.",
      },
    ],
  },
];

export default function AIExperience() {
  return (
    <section id="ai-experience" className="border-b border-rule">
      <div className="mx-auto max-w-page px-6 py-20 md:px-10 md:py-28">
        <Reveal>
          <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-ink">
            AI와 어떻게 일했나
          </h2>
        </Reveal>

        <div className="mt-12">
          {entries.map((entry, i) => (
            <Reveal key={entry.rule} delay={i * 0.05}>
              <article
                className={`grid gap-6 border-t border-rule py-10 md:grid-cols-[150px_1fr] md:gap-10 ${
                  entry.current ? "border-l-2 border-l-accent pl-5 md:pl-6" : ""
                }`}
              >
                <div className="md:pt-1">
                  <p className="font-mono tnum text-[13px] font-medium tracking-meta text-meta">
                    {entry.period}
                  </p>
                  {entry.current && (
                    <p className="mt-2 text-[11px] font-medium tracking-meta text-accent">
                      진행중
                    </p>
                  )}
                </div>

                <div>
                  <h3 className="text-[18px] font-semibold leading-[1.45] tracking-[-0.01em] text-ink">
                    {entry.rule}
                  </h3>
                  <p className="mt-1.5 text-[13px] tracking-meta text-meta">
                    {entry.where}
                  </p>

                  <div className="mt-6 space-y-6">
                    {entry.blocks.map((b) => (
                      <div key={b.label}>
                        <p className="text-[11px] font-medium tracking-meta text-meta">
                          {b.label}
                        </p>
                        <p className="mt-2 max-w-measure text-[15px] leading-[1.75] tracking-[-0.005em] text-body">
                          {b.body}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
