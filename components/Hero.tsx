"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import Value from "@/components/Value";

const EMAIL = "hemsej018@naver.com";

const headline = [
  { key: "name", node: <>이희망</> },
  { key: "role", node: <>AI와 협업하는 백엔드 개발자</> },
];

// Values come from PRODUCT.md. They are measured, not rounded for looks.
const results = [
  { label: "테스트 커버리지", from: "0%", to: "85%", note: "731개 케이스" },
  { label: "락 대기 시간", from: "60분", to: "0.15초", note: "주문 단위 락" },
  { label: "N+1 쿼리", from: "1,001회", to: "2회", note: "Look-Aside 캐싱" },
];

export default function Hero() {
  const reduce = useReducedMotion();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked by permissions. The address stays visible
      // next to the button, so the visitor is never stuck.
      setCopied(false);
    }
  };

  return (
    <section className="border-b border-rule pt-32 md:pt-36">
      <div className="mx-auto max-w-page px-6 pb-16 md:px-10 md:pb-24">
        <div className="grid gap-14 md:grid-cols-[1.05fr_0.95fr] md:gap-16 lg:gap-24">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-[clamp(2.75rem,7vw,4.5rem)] font-semibold leading-[1.06] tracking-display text-ink">
              {headline[0].node}
            </h1>
            <p className="mt-4 text-[clamp(1.5rem,3vw,2rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-ink">
              {headline[1].node}
            </p>
            <p className="mt-6 max-w-measure text-[18px] leading-[1.6] tracking-[-0.01em] text-body">
              문제를 정의하고, AI에게 방향을 제시하고, 결과를 검수합니다.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex items-center gap-2 whitespace-nowrap rounded bg-ink px-5 py-3 text-[13px] font-medium tracking-meta text-paper transition-colors hover:bg-accent-hover"
              >
                {copied ? (
                  <Check size={13} strokeWidth={1.5} />
                ) : (
                  <Copy size={13} strokeWidth={1.5} />
                )}
                {copied ? "복사됨" : "이메일 복사"}
              </button>
              <a
                href={`mailto:${EMAIL}`}
                className="hidden font-mono text-[13px] tracking-meta text-meta transition-colors hover:text-ink sm:inline"
              >
                {EMAIL}
              </a>
              <span className="ml-auto flex items-center gap-1">
                <a
                  href="https://github.com/HeeMang-Lee"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 text-meta transition-colors hover:text-ink"
                  aria-label="GitHub"
                >
                  <GithubIcon size={17} />
                </a>
                <a
                  href="https://www.linkedin.com/in/%ED%9D%AC%EB%A7%9D-%EC%9D%B4-777127377/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 text-meta transition-colors hover:text-ink"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon size={17} />
                </a>
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="md:pt-3"
          >
            <p className="text-[11px] font-medium tracking-meta text-meta">
              측정된 결과
            </p>
            <dl className="mt-5">
              {results.map((r) => (
                <div
                  key={r.label}
                  className="border-t border-rule py-5 first:border-t-0 first:pt-0"
                >
                  <dt className="text-[13px] text-meta">{r.label}</dt>
                  <dd className="mt-2.5 flex flex-wrap items-baseline gap-x-2.5">
                    <Value className="text-[15px] text-meta">{r.from}</Value>
                    <span
                      aria-hidden
                      className="font-mono text-[13px] text-rule-strong"
                    >
                      →
                    </span>
                    <Value className="text-[28px] leading-none tracking-[-0.02em] text-accent">
                      {r.to}
                    </Value>
                    <span className="ml-1 text-[13px] tracking-meta text-meta">
                      {r.note}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
