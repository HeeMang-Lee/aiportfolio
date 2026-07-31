import Value from "@/components/Value";

/**
 * The signature component of this site: a measured before/after pair.
 * Only the arrived-at value carries the accent, so the eye lands on the result.
 */
export default function Figure({
  label,
  from,
  to,
  note,
}: {
  label: string;
  from?: string;
  to: string;
  note?: string;
}) {
  return (
    <div>
      <dt className="text-[11px] font-medium tracking-meta text-meta">
        {label}
      </dt>
      <dd className="mt-2 flex flex-wrap items-baseline gap-x-2">
        {from && (
          <>
            <Value className="text-[15px] text-meta">{from}</Value>
            <span aria-hidden className="font-mono text-[13px] text-rule-strong">
              →
            </span>
          </>
        )}
        <Value className="text-[22px] leading-none tracking-[-0.02em] text-accent">
          {to}
        </Value>
      </dd>
      {note && <p className="mt-1.5 text-[13px] text-meta">{note}</p>}
    </div>
  );
}
