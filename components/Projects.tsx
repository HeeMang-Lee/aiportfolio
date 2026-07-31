import Reveal from "@/components/Reveal";
import Figure from "@/components/Figure";
import { GithubIcon } from "@/components/icons";

const projects = [
  {
    title: "이커머스 서버",
    period: "2025.10 - 2025.12",
    github: "https://github.com/HeeMang-Lee/e-commerce-server",
    stack: ["Spring Boot", "JPA", "Redis", "Redisson"],
    figures: [
      { label: "락 대기", from: "60분", to: "0.15초" },
      { label: "캐시 히트율", to: "70.8%" },
      { label: "N+1 쿼리", from: "1,001회", to: "2회" },
    ],
    // The three-lock comparison lives in the AI 협업 timeline. This section
    // keeps only what the timeline does not already say.
    notes: [
      "올리브영 테크블로그의 다중 레이어 캐시 전략을 학습한 뒤 Look-Aside 캐싱에 적용했다.",
      "전체 주문에 걸려 있던 락 범위를 개별 주문 단위로 좁힌 것이 대기시간 개선의 핵심이었다.",
    ],
  },
  {
    title: "금융 트레이딩 시스템",
    period: "2025.11 - 2025.12",
    org: "모네스트AI",
    github: null,
    stack: ["Python", "FastAPI", "TimescaleDB", "KIS API"],
    figures: [
      { label: "테스트 커버리지", from: "0%", to: "85%" },
      { label: "테스트 케이스", to: "731개" },
    ],
    notes: [
      "WebSocket 기반 실시간 시세 수신 파이프라인을 Claude Code와 함께 설계하고 구현했다.",
      "KIS API의 요청 제한으로 테스트 빌드가 1분씩 블로킹되던 문제를 Rate Limiting으로 해결했다.",
      "버터플라이 등 금융 트레이딩 전략을 요구사항으로 문서화해 전달하고, 구현 후 테스트 코드로 정합성을 검증했다.",
      "구현 에이전트와 테스트 에이전트를 분리해 구현체를 독립적으로 검증하는 워크플로우를 만들었다.",
    ],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="border-b border-rule">
      <div className="mx-auto max-w-page px-6 py-20 md:px-10 md:py-28">
        <Reveal>
          <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-ink">
            프로젝트
          </h2>
        </Reveal>

        <div className="mt-12">
          {projects.map((project, i) => (
            <Reveal key={project.title} delay={i * 0.05}>
              <article className="border-t border-rule py-10">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                  <h3 className="text-[clamp(1.5rem,3vw,2rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-ink">
                    {project.title}
                  </h3>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-mono text-[11px] font-medium tracking-label text-meta transition-colors hover:text-ink"
                    >
                      <GithubIcon size={14} />
                      GitHub
                    </a>
                  )}
                </div>

                <p className="mt-2 text-[13px] tracking-meta text-meta">
                  <span className="font-mono tnum">{project.period}</span>
                  {project.org && <span className="ml-3">{project.org}</span>}
                </p>

                <p className="mt-1.5 font-mono text-[13px] tracking-meta text-meta">
                  {project.stack.join("  /  ")}
                </p>

                <dl className="mt-9 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {project.figures.map((f) => (
                    <Figure key={f.label} {...f} />
                  ))}
                </dl>

                <div className="mt-9 max-w-measure space-y-3.5">
                  {project.notes.map((note) => (
                    <p
                      key={note}
                      className="text-[15px] leading-[1.75] tracking-[-0.005em] text-body"
                    >
                      {note}
                    </p>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
