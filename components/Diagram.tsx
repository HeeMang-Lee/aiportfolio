import type { Diagram as Spec } from "@/content/works";

/**
 * 구조를 글 대신 그림으로 보여준다. 이미지가 아니라 괘선과 글자로 그린다.
 *
 * 이미지를 쓰지 않는 이유. 다크 토큰이 바뀌면 같이 바뀌어야 하고, 확대해도
 * 깨지지 않아야 하고, 화면 낭독기가 읽을 수 있어야 한다. 이 세 가지를 다
 * 만족하는 건 결국 DOM 이다. 용량이 없다는 건 덤이다.
 *
 * 네 종류로 제한한다. 종류가 늘어나면 그림마다 다른 문법이 생겨서
 * 읽는 사람이 매번 새로 해석해야 한다.
 */
export default function Diagram({ spec }: { spec: Spec }) {
  return (
    <div className="mt-6 border-t border-line pt-6">
      {spec.kind === "flow" && <Flow spec={spec} />}
      {spec.kind === "nest" && <Nest spec={spec} />}
      {spec.kind === "bars" && <Bars spec={spec} />}
      {spec.kind === "steps" && <Steps spec={spec} />}
      {spec.note && <Note>{spec.note}</Note>}
    </div>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 text-caption text-dim">{children}</p>;
}

/** 왼쪽에서 오른쪽으로 흐르는 사슬. 좁아지면 세로로 접힌다. */
function Flow({ spec }: { spec: Extract<Spec, { kind: "flow" }> }) {
  return (
    <ol className="flex flex-wrap items-stretch gap-2">
      {spec.nodes.map((n, i) => (
        <li key={n} className="flex items-stretch gap-2">
          <span className="flex items-center border border-line px-4 py-2 text-caption">
            {n}
          </span>
          {i < spec.nodes.length - 1 && (
            <span aria-hidden className="flex items-center text-accent">
              →
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}

/**
 * 감싸는 순서를 보여준다. 서킷브레이커처럼 "무엇이 무엇을 감싸는가"가
 * 곧 설계 판단인 경우에 쓴다. 바깥 상자가 먼저 오는 계층이다.
 */
function Nest({ spec }: { spec: Extract<Spec, { kind: "nest" }> }) {
  // 안쪽부터 만들어서 바깥으로 감싼다.
  let node = (
    <div className="border border-line px-4 py-3 text-caption">{spec.core}</div>
  );

  for (let i = spec.layers.length - 1; i >= 0; i -= 1) {
    const layer = spec.layers[i];
    node = (
      <div className="border border-line p-4">
        <p className="mb-3 font-mono text-caption text-dim">{layer}</p>
        {node}
      </div>
    );
  }

  return (
    <div>
      {node}
      {spec.aside && (
        <p className="mt-3 flex items-center gap-2 text-caption text-dim">
          <span aria-hidden className="text-accent">
            →
          </span>
          {spec.aside}
        </p>
      )}
    </div>
  );
}

/**
 * 두 값을 나란히 재는 막대. 액센트를 칠하지 않는다 - 여기서 액센트를 쓰면
 * "어느 쪽이 좋다"는 뜻이 되는데, 이 사이트에서 막대가 나오는 자리는
 * 대부분 "느린 쪽을 골랐다" 같은 이야기라 그 함의가 틀린다.
 */
function Bars({ spec }: { spec: Extract<Spec, { kind: "bars" }> }) {
  return (
    <dl className="space-y-4">
      {spec.items.map((it) => (
        <div key={it.label}>
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-caption text-dim">{it.label}</dt>
            <dd className="font-mono text-caption">{it.display}</dd>
          </div>
          {/* 막대는 순수 장식이 아니라 값의 비율을 나타내지만, 값 자체가
              바로 위에 글자로 있으므로 화면 낭독기에는 숨긴다. */}
          <div aria-hidden className="mt-2 h-2 w-full border border-line">
            <div
              className="h-full bg-dim"
              style={{ width: `${Math.max(1, it.ratio * 100)}%` }}
            />
          </div>
        </div>
      ))}
    </dl>
  );
}

/** 순서가 있는 단계. 왼쪽 괘선 하나로 묶는다. */
function Steps({ spec }: { spec: Extract<Spec, { kind: "steps" }> }) {
  return (
    <ol className="space-y-3 border-l border-line pl-6">
      {spec.items.map((it, i) => (
        <li key={it} className="flex gap-4 text-caption">
          <span className="font-mono text-dim">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span>{it}</span>
        </li>
      ))}
    </ol>
  );
}
