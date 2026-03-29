"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Award, Copy, Check, Mail } from "lucide-react";

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

export default function About() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("hemsej018@naver.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <FadeInSection>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-16 text-lg">
            개발자가 된 이유
          </p>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FadeInSection>
            <div className="p-8 rounded-2xl border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card h-full">
              <div className="text-gray-500 dark:text-gray-400 leading-relaxed space-y-4">
                <p>
                  <span className="text-foreground font-medium">
                    강원대학교 수학과
                  </span>
                  를 졸업했습니다. 수학과에서 배운 논리적 사고와 문제 해결
                  능력이 개발에 큰 도움이 됩니다.
                </p>
                <p>
                  처음엔 &ldquo;코딩을 배워보자&rdquo;였는데, 직접 만든
                  서비스에 100명이 넘는 사용자가 생기고 피드백이 오는 경험을
                  하면서 개발자가 되겠다는 확신이 생겼습니다.
                </p>
                <p className="text-foreground">
                  내가 만든 게 누군가의 문제를 해결한다는 감각,
                  <br />
                  그게 개발자를 계속하고 싶은 이유입니다.
                </p>
              </div>
            </div>
          </FadeInSection>

          <div className="space-y-8">
            <FadeInSection delay={0.1}>
              <div className="p-8 rounded-2xl border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card">
                <div className="flex items-center gap-2 mb-4">
                  <Award size={20} className="text-toss-blue" />
                  <h3 className="font-semibold">자격증</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center justify-between">
                    <span className="text-sm">정보처리기사</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      2023
                    </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-sm">COS Pro Python 2급</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      2022
                    </span>
                  </li>
                </ul>
              </div>
            </FadeInSection>

            <FadeInSection delay={0.2}>
              <div className="p-8 rounded-2xl border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card">
                <div className="flex items-center gap-2 mb-4">
                  <Mail size={20} className="text-toss-blue" />
                  <h3 className="font-semibold">Contact</h3>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    hemsej018@naver.com
                  </span>
                  <button
                    onClick={copyEmail}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-toss-blue/10 text-toss-blue hover:bg-toss-blue/20 transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check size={12} /> 복사됨
                      </>
                    ) : (
                      <>
                        <Copy size={12} /> 복사
                      </>
                    )}
                  </button>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </div>
    </section>
  );
}
