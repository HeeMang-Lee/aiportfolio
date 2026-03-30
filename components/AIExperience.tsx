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
      "금융 트레이딩 시스템에 테스트가 하나도 없었다. 주문 실행, 계좌 관리, 포트폴리오 생성, 서비스 간 E2E 테스트까지 전부 만들어야 했는데, 인턴 기간 안에 손으로 다 짜기엔 양이 너무 많았다.",
    whyAI:
      "테스트 코드 작성은 AI한테 맡기기 좋은 작업이라 판단했다. 근데 처음 맡겼더니 null 체크, 타입 검증 같은 뻔한 테스트만 잔뜩 만들어냈다. 검수하면서 걸러내고, \"잔고 부족 시 주문 실패\", \"중복 종목 포트폴리오 생성\" 같은 실제 비즈니스 시나리오를 구체적으로 짚어줬더니 결과가 확 달라졌다.",
    result:
      "커버리지 0%에서 85%까지 올렸다 (731개). AI가 뽑아준 걸 그대로 쓴 게 아니라, 검수하고 방향 수정하고 다시 돌리는 걸 반복하면서 품질을 잡았다.",
    tags: ["실무", "Claude Code", "테스트자동화"],
  },
  {
    period: "2025.10 - 2025.12",
    title: "항해99 이커머스 서버",
    situation:
      "동시 주문이 몰릴 때 재고가 꼬이는 문제가 있었다. 동시성 제어 방식은 수업이랑 멘토링에서 개념은 배웠는데, 내 프로젝트에 뭘 쓸지는 직접 비교해봐야 했다.",
    whyAI:
      "멘토링에서 정리한 락 종류별 트레이드오프 문서를 Claude Code한테 넘기고, 내 프로젝트 상황(Redis 단일 인스턴스, JPA 기반)이랑 같이 정리했다. 비관적 락, Redisson 분산락, 스핀락 세 개를 다 구현해보고 성능 테스트 돌려서 비교한 다음에 골랐다.",
    result:
      "락 대기시간 60분에서 0.15초로 줄었고(24,000배), 캐시 히트율 70.8%, N+1 쿼리는 1,001회에서 2회로 줄었다. 배운 걸 AI랑 같이 프로젝트에 맞게 적용하고, 숫자로 확인하고 결정한 경험이었다.",
    tags: ["프로젝트", "Claude Code", "아키텍처설계"],
  },
  {
    period: "2026.03 - 현재",
    title: "AI 에이전트 역할 분리",
    situation:
      "하나의 AI한테 이것저것 다 시키니까 대화가 길어질수록 맥락이 흐려졌다. 에이전트가 재시작되면 아키텍처 규칙, 네이밍 규칙, 금지사항을 매번 처음부터 다시 설명해야 했다.",
    whyAI:
      "프로젝트의 아키텍처 원칙, 패키지 구조, 구현 순서, 금지사항(@Setter 금지, 순환 의존 금지 등)을 skills.md라는 지시서에 문서화했다. 에이전트가 재시작돼도 이 파일만 읽으면 같은 맥락에서 이어갈 수 있고, 팀원이 있다면 이 지시서를 공유해서 AI 활용 규칙을 맞출 수도 있다.",
    result:
      "반복 설명 없이 일관된 결과물을 뽑을 수 있게 됐다. 이 포트폴리오 사이트 자체가 그 방식으로 만든 결과물이다. 프론트엔드를 해본 적 없는데 Claude Code로 만들었다.",
    tags: ["에이전트분리", "워크플로우최적화", "현재진행형"],
    current: true,
  },
];

const concreteUseCases = [
  {
    emoji: "🧪",
    title: "AI가 만든 테스트를 검수하고 방향을 바꾼 경험",
    context: "모네스트AI | 금융 트레이딩 시스템",
    detail:
      "AI한테 테스트를 맡겼더니 파라미터 타입 체크, null 검증 같은 것만 대량으로 찍어냈다. 검수하면서 의미 없는 테스트를 걸러내고, \"주문 실행 시 잔고 부족\", \"포트폴리오 생성 시 중복 종목\" 같은 진짜 비즈니스 로직을 검증하는 시나리오를 콕 집어서 다시 시켰다. AI가 코드를 짜고, 나는 뭘 테스트할지를 판단했다.",
  },
  {
    emoji: "🏗️",
    title: "배운 지식을 AI랑 같이 프로젝트에 적용한 경험",
    context: "이커머스 서버 | 동시성 제어",
    detail:
      "멘토링에서 정리한 락 트레이드오프 문서를 Claude Code한테 넘기고, 지금 프로젝트 상황(Redis 단일 인스턴스, JPA 기반)에서 어떤 방향이 맞을지 같이 정리했다. 비관적 락, 분산락, 스핀락 세 가지를 다 구현하고 성능 테스트로 비교한 다음, 숫자를 보고 Redisson 분산락을 골랐다.",
  },
  {
    emoji: "📋",
    title: "AI한테 지시서를 써서 반복 작업을 없앤 경험",
    context: "블로그 프로젝트 | 에이전트 워크플로우",
    detail:
      "아키텍처 원칙(실용적 헥사고날), 패키지 구조, 네이밍 규칙, 구현 순서, 금지사항을 skills.md에 정리했다. AI가 재시작돼도 이 파일만 읽으면 같은 기준으로 작업할 수 있다. 팀이라면 이걸 공유해서 AI 활용 규칙을 통일할 수도 있다.",
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
                        {item.whyAI}
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
                    {useCase.detail}
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
