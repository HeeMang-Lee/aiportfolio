"use client";

const links = [
  { label: "Works", href: "#works" },
  { label: "About", href: "#about" },
  { label: "Stack", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

/**
 * 배경도 테두리도 없이 재료 위에 얹힌다. 스크롤에 따라 나타났다 사라지는
 * 헤더는 두지 않는다 - 작업 섹션이 핀으로 고정된 동안 헤더까지 움직이면
 * 화면에 두 개의 고정 층이 생긴다.
 *
 * 앵커는 Lenis 가 아니라 브라우저가 처리한다. globals.css 에서 scroll-behavior
 * 를 auto 로 두었으므로 즉시 점프하고, Lenis 가 그 위치부터 다시 보간한다.
 */
export default function Navigation() {
  return (
    <nav className="absolute left-0 top-0 z-40 flex w-full items-baseline justify-between px-6 pt-10 md:px-16">
      <a href="#" className="text-caption transition-colors hover:text-accent">
        이희망
      </a>
      <ul className="flex gap-6 md:gap-10">
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className="font-mono text-caption text-dim transition-colors hover:text-accent"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
