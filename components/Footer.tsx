import { GithubIcon, LinkedinIcon } from "@/components/icons";

const EMAIL = "hemsej018@naver.com";

export default function Footer() {
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto flex max-w-page flex-col gap-8 px-6 py-14 md:flex-row md:items-end md:justify-between md:px-10">
        <div>
          <p className="text-[15px] font-semibold tracking-[-0.01em] text-ink">
            이희망
          </p>
          <a
            href={`mailto:${EMAIL}`}
            className="mt-2 inline-block font-mono text-[13px] tracking-meta text-meta transition-colors hover:text-ink"
          >
            {EMAIL}
          </a>
        </div>

        <div className="flex items-end gap-6">
          <a
            href="https://github.com/HeeMang-Lee"
            target="_blank"
            rel="noopener noreferrer"
            className="text-meta transition-colors hover:text-ink"
            aria-label="GitHub"
          >
            <GithubIcon size={17} />
          </a>
          <a
            href="https://www.linkedin.com/in/%ED%9D%AC%EB%A7%9D-%EC%9D%B4-777127377/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-meta transition-colors hover:text-ink"
            aria-label="LinkedIn"
          >
            <LinkedinIcon size={17} />
          </a>
          <p className="font-mono tnum text-[11px] tracking-label text-meta">
            2026
          </p>
        </div>
      </div>
    </footer>
  );
}
