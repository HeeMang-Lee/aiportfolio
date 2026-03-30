"use client";

import { motion } from "framer-motion";
import { Mail, ChevronDown } from "lucide-react";

function GithubIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

function LinkedinIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-3xl text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-block mb-6 px-4 py-2 rounded-full border border-toss-blue/30 bg-toss-blue/5"
        >
          <span className="text-sm text-toss-blue font-medium">
            Backend Developer
          </span>
        </motion.div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
          이희망
        </h1>

        <p className="text-xl md:text-2xl text-toss-blue font-semibold mb-8">
          AI와 협업하는 백엔드 개발자
        </p>

        <div className="text-base md:text-lg text-gray-500 dark:text-gray-400 leading-relaxed mb-12 space-y-2">
          <p>문제를 정의하고, AI에게 방향을 제시하고, 결과를 검수합니다.</p>
        </div>

        <div className="flex items-center justify-center gap-4">
          <a
            href="https://github.com/HeeMang-Lee"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl border border-gray-200 dark:border-dark-border hover:border-toss-blue/50 hover:bg-toss-blue/5 transition-all"
            aria-label="GitHub"
          >
            <GithubIcon size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/%ED%9D%AC%EB%A7%9D-%EC%9D%B4-777127377/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl border border-gray-200 dark:border-dark-border hover:border-toss-blue/50 hover:bg-toss-blue/5 transition-all"
            aria-label="LinkedIn"
          >
            <LinkedinIcon size={20} />
          </a>
          <a
            href="mailto:hemsej018@naver.com"
            className="p-3 rounded-xl border border-gray-200 dark:border-dark-border hover:border-toss-blue/50 hover:bg-toss-blue/5 transition-all"
            aria-label="이메일"
          >
            <Mail size={20} />
          </a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown size={24} className="text-gray-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
