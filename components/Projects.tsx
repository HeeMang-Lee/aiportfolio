"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, TrendingUp } from "lucide-react";

function GithubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

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

const projects = [
  {
    title: "이커머스 서버",
    period: "2025.10 - 2025.12",
    link: null,
    github: "https://github.com/HeeMang-Lee/e-commerce-server",
    stack: ["Spring Boot", "JPA", "Redis", "Redisson"],
    achievements: [
      { label: "락 대기시간 60분 → 0.15초 (24,000배 개선)", highlight: true },
      { label: "Redis Look-Aside 캐싱, 캐시 히트율 70.8%", highlight: true },
      { label: "N+1 쿼리 99.8% 감소 (1,001회 → 2회)", highlight: true },
    ],
    experiences: [
      "올리브영 테크블로그의 다중 레이어 캐시 전략 학습 후 적용",
      "Claude Code와 협업하여 동시성 제어 설계",
    ],
  },
  {
    title: "금융 트레이딩 시스템 (모네스트AI)",
    period: "2025.11 - 2025.12",
    link: null,
    github: null,
    stack: ["Python", "FastAPI", "TimescaleDB", "KIS API"],
    achievements: [
      { label: "Claude Code로 테스트 커버리지 0% → 85%", highlight: true },
    ],
    experiences: [
      "WebSocket 기반 실시간 시세 수신 + REST API 주문 실행 파이프라인",
      "API Rate Limiting 및 에러 핸들링 설계",
      "Claude Code로 테스트 커버리지 0% → 85%",
    ],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <FadeInSection>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Projects</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-16 text-lg">
            문제를 정의하고 해결한 경험들
          </p>
        </FadeInSection>

        <div className="space-y-8">
          {projects.map((project, i) => (
            <FadeInSection key={i} delay={i * 0.1}>
              <div className="p-8 rounded-2xl border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card hover:border-toss-blue/20 transition-colors">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-xl font-bold mb-1">{project.title}</h3>
                    <p className="text-sm text-toss-blue">{project.period}</p>
                  </div>
                  <div className="flex gap-3">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-toss-blue transition-colors"
                      >
                        <ExternalLink size={14} />
                        Live
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-toss-blue transition-colors"
                      >
                        <GithubIcon size={14} />
                        GitHub
                      </a>
                    )}
                  </div>
                </div>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-3 py-1 rounded-lg bg-toss-blue/10 text-toss-blue font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Achievements */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp size={16} className="text-toss-blue" />
                    <span className="text-sm font-semibold">성과</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {project.achievements.map((ach, j) => (
                      <div
                        key={j}
                        className={`text-sm px-3 py-2 rounded-lg ${
                          ach.highlight
                            ? "bg-toss-blue/5 text-toss-blue font-medium"
                            : "text-gray-500 dark:text-gray-400"
                        }`}
                      >
                        {ach.label}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Experiences */}
                <div>
                  <span className="text-sm font-semibold mb-3 block">
                    주요 경험
                  </span>
                  <ul className="space-y-2">
                    {project.experiences.map((exp, j) => (
                      <li
                        key={j}
                        className="text-sm text-gray-500 dark:text-gray-400 flex items-start gap-2"
                      >
                        <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
                        {exp}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}
