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
    description: [
      "업무에서 Claude Code 실무 도입",
      '"문제 정의 → 설계 → 검수" 프로세스 확립',
      "테스트 커버리지 0% → 85% 달성 (731개 테스트 케이스)",
      "요구사항 정의 → 설계 → 구현 → 코드 리뷰 → 테스트 전 과정 AI 활용",
    ],
    tags: ["실무", "Claude Code", "테스트자동화"],
  },
  {
    period: "2025.10 - 2025.12",
    title: "항해99 이커머스 서버",
    description: [
      "Claude Code로 과제 수행",
      "AI에게 문제 정의(As-Is/To-Be), 제약사항, 검수 기준 명시 후 설계 방향 제시",
      "분산락, 캐싱 전략 등 복잡한 문제도 AI와 협업하여 해결",
    ],
    tags: ["프로젝트", "Claude Code", "아키텍처설계"],
  },
  {
    period: "2026.03 - 현재",
    title: "에이전트 워크플로우 고도화",
    description: [
      "Claude Code 에이전트를 역할별로 분리",
      "Refactor / Dev / Review 에이전트 전담 운영",
      "병렬 실행으로 개발 생산성 극대화",
    ],
    tags: ["에이전트분리", "워크플로우최적화", "현재진행형"],
    current: true,
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {timelineItems.map((item, i) => (
              <FadeInSection key={i} delay={i * 0.15}>
                <div
                  className={`h-full p-6 rounded-2xl border transition-colors ${
                    item.current
                      ? "border-toss-blue/50 bg-toss-blue/5"
                      : "border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm text-toss-blue font-medium">
                      {item.period}
                    </span>
                    {item.current && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-toss-blue/20 text-toss-blue">
                        진행중
                      </span>
                    )}
                  </div>
                  <h4 className="text-lg font-semibold mb-4">{item.title}</h4>
                  <ul className="space-y-2 mb-6">
                    {item.description.map((desc, j) => (
                      <li
                        key={j}
                        className="text-sm text-gray-500 dark:text-gray-400 flex items-start gap-2"
                      >
                        <span className="text-toss-blue mt-1.5 w-1 h-1 rounded-full bg-toss-blue flex-shrink-0" />
                        {desc}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
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
