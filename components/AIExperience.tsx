"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  ArrowRight,
  Bot,
  Code2,
  Search,
  FileCheck,
  Workflow,
} from "lucide-react";

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

const processSteps = [
  { icon: Search, label: "문제 정의", desc: "As-Is / To-Be 분석" },
  { icon: FileCheck, label: "제약사항 정의", desc: "기술적 제약과 요구사항" },
  { icon: Bot, label: "AI에게 지시", desc: "명확한 컨텍스트 전달" },
  { icon: Code2, label: "결과 검수", desc: "코드 리뷰 및 품질 확인" },
];

const timelineItems = [
  {
    period: "2025.11 - 2025.12",
    title: "모네스트AI 인턴십",
    situation:
      "금융 트레이딩 시스템의 테스트 커버리지가 0%인 상태에서 실서비스 투입이 예정되어 있었습니다. 주문 실행, 계좌 관리, 포트폴리오 생성, 그리고 각 서비스 간 연결을 검증하는 E2E 테스트까지 작성해야 했고, 한정된 인턴십 기간 내에 수동으로 처리하기엔 현실적으로 불가능한 규모였습니다.",
    whyAI:
      "반복적인 테스트 코드 작성은 AI가 효율적으로 처리할 수 있는 영역이라 판단했습니다. 다만 처음 AI에게 맡겼을 때 파라미터 검증이나 입력값 체크 같은 의미 없는 테스트가 과도하게 생성되는 문제가 있었습니다. 이를 검수 과정에서 발견하고, \"실제 비즈니스 로직을 검증하는 테스트에 집중하라\"는 피드백을 반영하여 프롬프트를 수정했습니다.",
    result:
      "테스트 커버리지 0% → 85% (731개 테스트 케이스). AI가 만든 결과물을 그대로 쓴 게 아니라, 검수 → 피드백 → 재생성 사이클을 반복하며 품질을 직접 관리한 결과입니다. 이 경험에서 'AI는 시키는 대로 하지만, 방향을 잡는 건 사람의 몫'이라는 확신을 얻었습니다.",
    tags: ["실무", "Claude Code", "테스트자동화"],
  },
  {
    period: "2025.10 - 2025.12",
    title: "항해99 이커머스 서버",
    situation:
      "동시에 수백 건의 주문이 몰리는 상황에서 재고 정합성을 보장해야 했습니다. 동시성 제어 방식에 대해 수업과 멘토링에서 배운 내용은 있었지만, 실제 프로젝트에 어떤 방식이 최적인지 직접 비교 검증이 필요했습니다.",
    whyAI:
      "수업에서 배운 락 종류별 개념과 멘토링에서 정리한 각 방식의 트레이드오프를 문서로 정리한 뒤, Claude Code에게 현재 프로젝트의 제약사항과 함께 전달하여 \"이 맥락에서 어떤 방향이 적합한지\" 설계 방향을 함께 정리했습니다. 비관적 락, 분산락(Redisson), 스핀락 세 가지를 모두 구현한 뒤 성능 테스트로 비교하여 최종안을 직접 선택했습니다.",
    result:
      "락 대기시간 60분 → 0.15초(24,000배 개선), 캐시 히트율 70.8%, N+1 쿼리 99.8% 감소(1,001회 → 2회). 학습한 지식을 AI와 함께 프로젝트에 맞게 적용하고, 실측 데이터로 의사결정한 경험입니다.",
    tags: ["프로젝트", "Claude Code", "아키텍처설계"],
  },
  {
    period: "2026.03 - 현재",
    title: "에이전트 워크플로우 고도화",
    situation:
      "하나의 AI 에이전트에게 모든 작업을 시키면 대화가 길어질수록 컨텍스트가 섞이고, 에이전트가 재시작되거나 같은 지시를 반복해야 하는 비효율이 발생했습니다. 매번 프로젝트의 아키텍처 규칙, 네이밍 컨벤션, 금지사항 등을 다시 설명해야 하는 반복 작업이 생산성을 크게 떨어뜨렸습니다.",
    whyAI:
      "에이전트별로 역할을 분리하고, 각 에이전트에게 전용 skills.md(지시서)를 작성하여 아키텍처 원칙, 패키지 구조, 구현 순서, 금지사항까지 문서화했습니다. 에이전트가 재시작되어도 지시서를 읽으면 동일한 맥락에서 작업을 이어갈 수 있고, 팀 협업 시에도 이 지시서를 공유하면 AI 활용 규칙을 통일할 수 있습니다.",
    result:
      "반복 설명 없이 일관된 품질의 결과물을 얻을 수 있게 되었고, 이 포트폴리오 사이트 자체가 이 워크플로우의 결과물입니다. 프론트엔드 경험 없이 Claude Code만으로 제작했으며, AI를 '어떻게 지휘하느냐'가 핵심임을 증명합니다.",
    tags: ["에이전트분리", "워크플로우최적화", "현재진행형"],
    current: true,
  },
];

const concreteUseCases = [
  {
    emoji: "🧪",
    title: "AI 산출물의 품질을 검수하고 방향을 수정한 경험",
    context: "모네스트AI | 금융 트레이딩 시스템",
    detail:
      "AI에게 테스트 작성을 맡겼더니 파라미터 타입 체크, null 검증 같은 의미 없는 테스트가 대량 생성되었습니다. 이를 검수에서 걸러내고, \"주문 실행 시 잔고 부족 케이스\", \"포트폴리오 생성 시 중복 종목 처리\" 등 실제 비즈니스 로직을 검증하는 시나리오를 구체적으로 명시하여 재지시했습니다. AI는 코드를 생성하고, 저는 '무엇을 테스트해야 하는가'를 판단했습니다.",
  },
  {
    emoji: "🏗️",
    title: "학습한 지식 + AI를 결합한 아키텍처 의사결정",
    context: "이커머스 서버 | 동시성 제어",
    detail:
      "멘토링에서 정리한 락 종류별 트레이드오프 문서를 Claude Code에게 전달하고, 현재 프로젝트 맥락(Redis 단일 인스턴스, JPA 기반)에서 적합한 방향을 함께 정리했습니다. 비관적 락 / 분산락(Redisson) / 스핀락을 모두 구현하고 성능 테스트로 비교한 뒤, 실측 데이터를 기반으로 Redisson 분산락을 최종 선택했습니다.",
  },
  {
    emoji: "📋",
    title: "AI 에이전트에게 지시서(skills.md)를 작성하여 맥락 유지",
    context: "블로그 프로젝트 | 에이전트 워크플로우",
    detail:
      "아키텍처 원칙(실용적 헥사고날), 패키지 구조, 네이밍 컨벤션, 구현 순서, 금지사항(@Setter 금지, 순환 의존 금지 등)을 skills.md에 문서화했습니다. 에이전트가 재시작되어도 이 지시서를 통해 동일한 품질 기준을 유지하고, 팀원과 공유하면 AI 활용 규칙을 통일할 수 있는 구조입니다.",
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
          <p className="text-gray-500 dark:text-gray-400 mb-20 text-lg">
            AI를 도구가 아닌 협업 파트너로 활용합니다.
          </p>
        </FadeInSection>

        {/* Process Flow */}
        <FadeInSection className="mb-24">
          <h3 className="text-xl font-semibold mb-8 text-gray-300">
            나의 AI 협업 프로세스
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {processSteps.map((step, i) => (
              <div key={i} className="relative flex items-center">
                <div className="flex-1 p-6 rounded-2xl border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card hover:border-toss-blue/30 transition-colors">
                  <step.icon
                    size={28}
                    className="text-toss-blue mb-4"
                  />
                  <p className="font-semibold mb-1">{step.label}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {step.desc}
                  </p>
                </div>
                {i < processSteps.length - 1 && (
                  <ArrowRight
                    size={20}
                    className="hidden md:block text-gray-400 dark:text-gray-600 mx-2 flex-shrink-0"
                  />
                )}
              </div>
            ))}
          </div>
          <p className="mt-8 text-gray-500 dark:text-gray-400 leading-relaxed max-w-3xl">
            단순히 AI에게 코드를 생성해달라고 하지 않습니다.
            문제의 맥락, 현재 상태와 목표 상태, 제약사항, 검수 기준을 명확히
            정의한 뒤 AI에게 전달합니다. AI는 제 지시 아래 움직이는 주니어
            개발자와 같습니다.
          </p>
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
                        상황 (Problem)
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                        {item.situation}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-toss-blue uppercase tracking-wider mb-2">
                        왜 AI를 선택했는가
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                        {item.whyAI}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-toss-blue uppercase tracking-wider mb-2">
                        결과 (Result)
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
        <FadeInSection className="mb-24">
          <h3 className="text-xl font-semibold mb-3 text-gray-300">
            AI를 활용한 구체적 사례
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
            어떤 상황에서, 왜, 어떻게 AI를 활용했는지
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

        {/* Agent Workflow Visualization */}
        <FadeInSection>
          <h3 className="text-xl font-semibold mb-8 text-gray-300">
            에이전트 워크플로우
          </h3>
          <div className="p-8 md:p-12 rounded-2xl border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card">
            <div className="flex flex-col items-center gap-6">
              {/* Controller */}
              <div className="w-full max-w-md p-6 rounded-2xl border-2 border-toss-blue/50 bg-toss-blue/5 text-center">
                <Workflow size={24} className="text-toss-blue mx-auto mb-2" />
                <p className="font-bold text-lg">나 (지휘자)</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  문제 정의 / 설계 방향 / 검수 기준
                </p>
              </div>

              {/* Arrow down */}
              <div className="w-px h-8 bg-gray-300 dark:bg-gray-600" />

              {/* Agents */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl">
                {[
                  { name: "Refactor Agent", desc: "코드 리팩토링 전담", color: "from-purple-500/20 to-purple-500/5" },
                  { name: "Dev Agent", desc: "기능 구현 전담", color: "from-toss-blue/20 to-toss-blue/5" },
                  { name: "Review Agent", desc: "코드 리뷰 전담", color: "from-green-500/20 to-green-500/5" },
                ].map((agent) => (
                  <motion.div
                    key={agent.name}
                    whileHover={{ scale: 1.03 }}
                    className={`p-5 rounded-xl border border-gray-200 dark:border-dark-border bg-gradient-to-b ${agent.color} text-center`}
                  >
                    <Bot size={20} className="mx-auto mb-2 text-toss-blue" />
                    <p className="font-semibold text-sm">{agent.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {agent.desc}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Arrow down */}
              <div className="w-px h-8 bg-gray-300 dark:bg-gray-600" />

              {/* Result */}
              <div className="px-6 py-3 rounded-xl border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card">
                <p className="text-sm font-medium">최종 결과물 + 검수</p>
              </div>
            </div>

            <p className="mt-10 text-gray-500 dark:text-gray-400 leading-relaxed text-center max-w-2xl mx-auto">
              &ldquo;지휘자가 바이올린을 잘 켜서 지휘하는 게 아니듯,
              <br />
              AI 시대의 개발자는 코드를 직접 치는 능력보다
              <br />
              <span className="text-foreground font-medium">
                올바른 방향을 제시하고 결과를 검수하는 능력
              </span>
              이 중요합니다.&rdquo;
            </p>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
