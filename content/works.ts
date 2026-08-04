/**
 * 작업 3건. 출처는 노션 원본(docs/notion-source-projects.md)이고 수치는 전부 실측값이다.
 * 보기 좋게 반올림하지 않는다.
 *
 * 회사 내부 시스템(MES, 탄소배출)은 여기에 넣지 않는다. 사내 화면 구성과 프로세스가
 * 공개 사이트로 나가는 보안 문제라 본인이 제외를 지시했다. 도메인 경험 한 줄은
 * About 에만 둔다.
 */

export type Metric = {
  /** 숫자만. 한글 단위는 unit 으로 뺀다 - Mono 에 한글 글립이 없다. */
  from?: string;
  to: string;
  /** 한글이 섞여도 되는 자리. Mono 를 걸지 않는다. */
  unit?: string;
  label: string;
};

export type Work = {
  id: string;
  index: string;
  title: string;
  /** 한 줄 정체. 디스플레이 크기로 나가지 않으므로 한글이어도 된다. */
  kind: string;
  period: string;
  /** 스크럽 진행도에 물리는 카운터가 읽는 값. 세 건이 모두 2025년이라
   *  연도만 쓰면 숫자가 움직이지 않는다. 월까지 찍는다. */
  stamp: string;
  role: string;
  image: string;
  /** 원본 픽셀 크기. 세 장의 비율이 1.5:1 과 3:1 로 제각각이라 하나의
   *  고정 비율 상자에 넣으면 넓은 쪽이 절반 넘게 잘린다. 원본 비율대로 둔다. */
  imageWidth: number;
  imageHeight: number;
  /** 무엇을 풀었는지. 34em 안에 들어가는 길이로 유지한다. */
  summary: string;
  metrics: Metric[];
  stack: string[];
  link?: { label: string; href: string };
};

export const works: Work[] = [
  {
    id: "cs25",
    index: "01",
    title: "CS25",
    kind: "AI 기반 CS 학습 플랫폼",
    period: "2025.05 - 2025.07",
    stamp: "2025.05",
    role: "AI 도메인 설계와 구현 / 6명",
    image: "/projects/cs25.png",
    imageWidth: 1536,
    imageHeight: 1024,
    summary:
      "부하 테스트에서 병목이 OpenAI가 아니라 우리 서버라는 걸 확인했다. 느린 외부 I/O가 요청 스레드를 오래 붙잡고 있었다. 인메모리 큐를 Redis Streams로 바꿔 트래픽 속도와 처리 속도를 떼어냈고, 큐 길이를 신호로 워커 수를 2~16개 사이에서 조절했다.",
    metrics: [
      { from: "1,900", to: "26,000", unit: "건", label: "총 처리 요청 (K6)" },
      { from: "3,500", to: "200", unit: "ms", label: "평균 응답 시간" },
      { from: "60", to: "4.5", unit: "%", label: "실패율" },
    ],
    stack: [
      "Spring Boot",
      "Spring AI",
      "Redis Streams",
      "Resilience4j",
      "Chroma VectorDB",
      "SSE",
      "K6",
    ],
    link: {
      label: "GitHub",
      href: "https://github.com/NBC-finalProject/CS25-BE",
    },
  },
  {
    id: "hanghae99",
    index: "02",
    title: "E-commerce",
    kind: "동시성 제어와 이벤트 기반 메시징",
    period: "2025.10 - 2025.12",
    stamp: "2025.10",
    role: "단독 설계와 구현",
    image: "/projects/hanghae99.png",
    imageWidth: 1072,
    imageHeight: 355,
    summary:
      "DB 비관적 락은 모든 요청을 쿠폰 한 행에 직렬화시켜 대기가 수십 분까지 올라갔다. 정합성 판정을 Redis Lua Script의 원자 연산으로 옮기고 영속화는 큐와 배치로 미뤘다. 메시징은 세 가지를 직접 구현해 재보고, 느린 걸 알면서도 내구성 때문에 Kafka를 택했다.",
    metrics: [
      { from: "60", to: "0.15", unit: "초", label: "쿠폰 락 대기 시간" },
      { from: "1,001", to: "2", unit: "회", label: "주문 조회 쿼리 수" },
      { to: "70.8", unit: "%", label: "인기상품 캐시 히트율" },
    ],
    stack: [
      "Java 17",
      "Spring Boot 3.4",
      "JPA",
      "Kafka",
      "Redis",
      "MySQL",
      "Outbox",
    ],
    link: {
      label: "GitHub",
      href: "https://github.com/HeeMang-Lee/e-commerce-server",
    },
  },
  {
    id: "monest-ai",
    index: "03",
    title: "AI Trade Server",
    kind: "증권사 Open API 연동, 모네스트AI 인턴",
    period: "2025.11 - 2025.12",
    stamp: "2025.11",
    role: "Backend Developer (인턴)",
    image: "/projects/monest-ai.png",
    imageWidth: 1074,
    imageHeight: 355,
    summary:
      "외부 증권사 API에 전적으로 의존하는 구조라 외부가 흔들려도 버티게 만드는 게 일이었다. Token Bucket으로 호출을 통제하되 경과 시간은 time.monotonic()으로 쟀다. 시스템 시각 보정이 들어오면 시간이 거꾸로 흘러 토큰 계산이 깨지는데, 금융 시스템에서 그건 실제 위험이다.",
    metrics: [
      { from: "0", to: "85", unit: "%", label: "테스트 커버리지" },
      { to: "731", unit: "개", label: "테스트 케이스" },
      { to: "15", unit: "req/s", label: "Rate Limit 안전 마진 (허용 20)" },
    ],
    stack: ["Python", "FastAPI", "asyncio", "TimescaleDB", "httpx", "WebSocket"],
  },
];
