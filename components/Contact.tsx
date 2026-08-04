"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";

const EMAIL = "hemsej018@naver.com";

const elsewhere = [
  { label: "GitHub", href: "https://github.com/HeeMang-Lee" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/%ED%9D%AC%EB%A7%9D-%EC%9D%B4-777127377",
  },
];

/**
 * 전폭 디스플레이 링크. 이 페이지의 성공 정의가 이메일 복사와 GitHub 방문이므로
 * 마지막 화면이 그 둘만 남긴다.
 */
export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // 클립보드 권한이 없으면 mailto 로 넘긴다. 복사가 조용히 실패하는 게 최악이다.
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <footer id="contact" className="border-t border-line px-6 py-30 md:px-16">
      <h2 className="text-caption text-dim">
        <span className="font-mono">Contact</span>
      </h2>

      <Reveal as="div" mode="fade" className="mt-16">
        {/* 색을 명시한다. button 은 상속이 아니라 buttontext 시스템 색을 받아서
            그냥 두면 본문보다 흐리게 나온다. */}
        <button
          type="button"
          onClick={copy}
          className="block text-left font-display text-display-l text-text transition-colors hover:text-accent"
        >
          {EMAIL}
        </button>
        {/* 복사 결과는 aria-live 로 알린다. 색만 바꾸면 화면을 못 보는 사람에게
            아무 일도 일어나지 않은 것과 같다. */}
        <p aria-live="polite" className="mt-4 h-6 text-caption text-accent">
          {copied ? "복사했습니다" : ""}
        </p>
      </Reveal>

      <div className="mt-30 flex flex-col gap-6 border-t border-line pt-6 md:flex-row md:items-baseline md:justify-between">
        <div className="flex gap-10">
          {elsewhere.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-caption transition-colors hover:text-accent"
            >
              <span className="font-mono">{l.label}</span>
              <span aria-hidden className="text-accent">
                →
              </span>
            </a>
          ))}
        </div>
        <p className="text-caption text-dim">
          <span className="font-mono">2026</span> 이희망
        </p>
      </div>
    </footer>
  );
}
