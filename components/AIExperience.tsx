"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

function FadeInSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const timelineItems = [
  {
    period: "2025.11 - 2025.12",
    title: "모네스트AI 인턴십",
    situation:
      "금융 트레이딩 시스템의 테스트 커버리지가 0%인 상태에서 실서비스 투입이 예정되어 있었다. 주문 실행, 계좌 관리, 포트폴리오 생성, 서비스 간 E2E 테스트까지 필요했고, 인턴 기간 내에 수동으로 처리하기엔 현실적으로 불가능한 규모였다.",
    whyAI: null,
    whyAINode: (
      <>
        테스트 코드 작성은 AI에게 위임하기 적합한 작업이라 판단했다. 다만 처음 맡겼을 때 파라미터 검증, null 체크 같은 의미 없는 테스트가 과도하게 생성되는 문제가 있었다.{" "}
        <a href="https://toss.tech/article/test-strategy-server" target="_blank" rel="noopener noreferrer" className="text-toss-blue underline underline-offset-2 hover:text-toss-blue-light transition-colors">toss.tech의 서버 테스트 전략 글</a>
        을 참고하여 &ldquo;구현 상세가 아닌 행위를 검증하라&rdquo;는 기준을 세우고, &ldquo;잔고 부족 시 주문 실패&rdquo;, &ldquo;중복 종목 포트폴리오 생성&rdquo; 등 실제 비즈니스 로직을 검증하는 시나리오를 명시하여 AI에게 재지시했다.
      </>
    ),
    result:
      "커버리지 0%에서 85%까지 달성(731개 테스트 케이스). AI의 산출물을 그대로 사용한 것이 아니라 검수, 방향 수정, 재생성 사이클을 반복하며 품질을 관리한 결과다.",
    tags: ["실무", "Claude Code", "테스트자동화"],
  },
  {
    period: "2025.10 - 2025.12",
    title: "항해99 이커머스 서버",
    situation:
      "동시 주문이 집중될 때 재고 정합성이 깨지는 문제가 있었다. 동시성 제어 방식은 수업과 멘토링에서 개념을 배웠지만, 실제 프로젝트에 어떤 방식이 적합한지는 직접 비교 검증이 필요했다.",
    whyAI:
      "멘토링에서 정리한 락 종류별 트레이드오프 문서를 Claude Code에 전달하고, 프로젝트 제약사항(Redis 단일 인스턴스, JPA 기반)에 맞는 설계 방향을 함께 정리했다. 비관적 락, Redisson 분산락, 스핀락 세 가지를 모두 구현한 뒤 성능 테스트로 비교하여 최종안을 선택했다.",
    result:
      "전체 주문에 걸리던 락 범위를 개별 주문 단위로 조정하여 대기시간 60분 → 0.15초로 개선. 캐시 히트율 70.8%, N+1 쿼리 1,001회 → 2회. 학습한 지식을 AI와 함께 프로젝트에 맞게 적용하고, 실측 데이터 기반으로 의사결정한 경험이다.",
    tags: ["프로젝트", "Claude Code", "아키텍처설계"],
  },
  {
    period: "2026.03 - 현재",
    title: "AI 에이전트 역할 분리",
    situation:
      "하나의 AI 에이전트에 모든 작업을 맡기면 대화가 길어질수록 맥락이 흐려졌다. 에이전트가 재시작될 때마다 아키텍처 규칙, 네이밍 컨벤션, 금지사항을 처음부터 다시 설명해야 하는 비효율이 반복됐다.",
    whyAI:
      "프로젝트의 아키텍처 원칙, 패키지 구조, 구현 순서, 금지사항(@Setter 금지, 순환 의존 금지 등)을 skills.md라는 지시서에 문서화했다. 에이전트가 재시작되어도 이 파일을 읽으면 동일한 맥락에서 작업을 이어갈 수 있고, 팀 협업 시에도 이 지시서를 공유하면 AI 활용 규칙을 통일할 수 있다.",
    result:
      "반복 설명 없이 일관된 결과물을 얻을 수 있게 됐다. 현재 개인 블로그 프로젝트에 적용 중이며, 에이전트가 교체되어도 지시서 기반으로 동일한 품질 기준을 유지하고 있다.",
    tags: ["에이전트분리", "워크플로우최적화", "현재진행형"],
    current: true,
  },
];

const concreteUseCases = [
  {
    emoji: "🧪",
    title: "AI 산출물을 검수하고 방향을 수정한 경험",
    context: "모네스트AI | 금융 트레이딩 시스템",
    detail: null,
    detailNode: (
      <>
        AI에게 테스트 작성을 맡겼을 때 파라미터 타입 체크, null 검증 같은 의미 없는 테스트가 대량 생성됐다.{" "}
        <a href="https://toss.tech/article/test-strategy-server" target="_blank" rel="noopener noreferrer" className="text-toss-blue underline underline-offset-2 hover:text-toss-blue-light transition-colors">toss.tech의 서버 테스트 전략 글</a>
        을 참고해 &ldquo;구현 상세가 아닌 행위를 검증하라&rdquo;는 기준을 세우고, &ldquo;잔고 부족 시 주문 실패&rdquo;, &ldquo;중복 종목 포트폴리오 생성&rdquo; 등 비즈니스 시나리오를 명시하여 재지시했다.
      </>
    ),
  },
  {
    emoji: "🏗️",
    title: "학습한 지식과 AI를 결합한 아키텍처 의사결정",
    context: "이커머스 서버 | 동시성 제어",
    detail:
      "멘토링에서 정리한 락 종류별 트레이드오프 문서를 Claude Code에 전달하고, 프로젝트 제약사항(Redis 단일 인스턴스, JPA 기반)에서 적합한 방향을 함께 정리했다. 비관적 락, 분산락(Redisson), 스핀락을 모두 구현하고 성능 테스트로 비교한 뒤, 실측 데이터를 기반으로 Redisson 분산락을 최종 선택했다.",
  },
  {
    emoji: "📋",
    title: "AI 에이전트에 지시서를 작성하여 반복 작업 제거",
    context: "블로그 프로젝트 | 에이전트 워크플로우",
    detail:
      "아키텍처 원칙(실용적 헥사고날), 패키지 구조, 네이밍 컨벤션, 구현 순서, 금지사항을 skills.md에 문서화했다. AI가 재시작되어도 이 파일을 읽으면 동일한 기준으로 작업할 수 있다. 팀 협업 시 이 지시서를 공유하면 AI 활용 규칙을 통일하는 것도 가능하다.",
  },
];

export default function AIExperience() {
  return (
    <section id="ai-experience" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <FadeInSection>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How I Work with AI
          </h2>
          <div className="mb-20" />
        </FadeInSection>

        {/* Timeline */}
        <FadeInSection className="mb-24">
          <h3 className="text-xl font-semibold mb-8 text-gray-300">
            AI 활용 타임라인
          </h3>
          <div className="space-y-6">
            {timelineItems.map((item, i) => (
              <FadeInSection key={i} delay={i * 0.1}>
                <div
                  className={`p-8 rounded-2xl border transition-colors ${
                    item.current
                      ? "border-toss-blue/50 bg-toss-blue/5"
                      : "border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-toss-blue font-medium">
                      {item.period}
                    </span>
                    {item.current && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-toss-blue/20 text-toss-blue">
                        진행중
                      </span>
                    )}
                  </div>
                  <h4 className="text-xl font-bold mb-6">{item.title}</h4>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <p className="text-xs font-semibold text-toss-blue uppercase tracking-wider mb-2">
                        상황
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                        {item.situation}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-toss-blue uppercase tracking-wider mb-2">
                        왜 AI를 썼나
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                        {item.whyAINode || item.whyAI}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-toss-blue uppercase tracking-wider mb-2">
                        결과
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                        {item.result}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-gray-100 dark:border-dark-border">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 rounded-lg bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </FadeInSection>

        {/* Concrete Use Cases */}
        <FadeInSection>
          <h3 className="text-xl font-semibold mb-3 text-gray-300">
            AI를 활용한 구체적 사례
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
            어떤 상황에서, 왜, 어떻게
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {concreteUseCases.map((useCase, i) => (
              <FadeInSection key={i} delay={i * 0.1}>
                <div className="h-full p-6 rounded-2xl border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card">
                  <div className="text-2xl mb-3">{useCase.emoji}</div>
                  <h4 className="font-semibold mb-1">{useCase.title}</h4>
                  <p className="text-xs text-toss-blue mb-4">
                    {useCase.context}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    {useCase.detailNode || useCase.detail}
                  </p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
