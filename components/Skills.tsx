"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Server,
  Database,
  Brain,
  Cloud,
  TestTube,
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

const skillCategories = [
  {
    icon: Server,
    title: "Backend",
    skills: ["Java", "Spring Boot", "Spring AI", "JPA/Hibernate", "Python", "FastAPI"],
  },
  {
    icon: Database,
    title: "Database & Cache",
    skills: ["MySQL", "TimescaleDB", "Redis (Streams, Caching, Redisson)"],
  },
  {
    icon: Brain,
    title: "AI/ML Integration",
    skills: ["Spring AI", "RAG (Chroma VectorDB)", "Claude API", "OpenAI API", "SSE Streaming"],
  },
  {
    icon: Cloud,
    title: "Infra & DevOps",
    skills: ["Docker", "Jenkins", "Grafana", "Prometheus", "Loki"],
  },
  {
    icon: TestTube,
    title: "Testing",
    skills: ["JUnit5", "pytest", "K6"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <FadeInSection>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-16 text-lg">
            문제 해결에 사용하는 기술들
          </p>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, i) => (
            <FadeInSection key={i} delay={i * 0.1}>
              <div className="h-full p-6 rounded-2xl border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card hover:border-toss-blue/20 transition-colors">
                <category.icon size={24} className="text-toss-blue mb-4" />
                <h3 className="font-semibold mb-4">{category.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-sm px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}
