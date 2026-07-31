/**
 * Splits a measurement into its numeral and its unit.
 *
 * IBM Plex Mono has no Hangul, so setting "0.15초" in mono renders the digits
 * in Plex Mono and the 초 in whatever the system falls back to. Splitting keeps
 * tabular numerals on the number, where they matter, and keeps Korean units in
 * the page's own sans. ASCII units (%, x) stay in mono since Plex Mono has them.
 */
const SPLIT = /^([\d.,+-]+)(.*)$/;
const HAS_HANGUL = /[ㄱ-힝]/;

export default function Value({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  const match = SPLIT.exec(children);

  if (!match || !HAS_HANGUL.test(match[2])) {
    return <span className={`font-mono tnum ${className}`}>{children}</span>;
  }

  const [, numeral, unit] = match;
  return (
    <span className={className}>
      <span className="font-mono tnum">{numeral}</span>
      <span className="ml-[0.08em] text-[0.82em] font-normal">{unit}</span>
    </span>
  );
}
