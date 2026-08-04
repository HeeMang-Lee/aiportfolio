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

/** 판이 화면 가운데 머무는 동안 스크롤에 따라 차례로 흘러나오는 상세.
 *  노션 원본의 트러블슈팅 구조를 그대로 옮긴 것이라 지어낸 내용이 없다. */
export type Detail = {
  /** 라틴/숫자 라벨. Mono 로 나가므로 한글을 넣지 않는다. */
  tag: string;
  heading: string;
  body: string;
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
  details: Detail[];
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
    details: [
      {
        tag: "01 / DIAGNOSIS",
        heading: "병목은 OpenAI가 아니라 우리 서버였다",
        body: "AI 채점은 요청 하나가 응답까지 길게는 수 초씩 걸리는 느린 I/O다. 처음엔 단일 서버의 인메모리 큐(BlockingQueue)에 쌓아 처리했는데, K6로 동시 사용자를 늘리자 느린 호출들이 한정된 처리 용량을 오래 점유하면서 뒤따라온 요청이 줄줄이 타임아웃 났다. 500 VU 환경에서 실패율이 60%까지 올라갔다. 외부 API의 안정성과 내 서버가 느린 I/O를 견디는 능력은 다른 레이어의 문제였다.",
      },
      {
        tag: "02 / DECOUPLING",
        heading: "큐를 둔 이유는 장애 대비가 아니라 분리였다",
        body: "사용자에겐 접수됐다를 즉시 응답하고(SSE 연결 유지) 무거운 AI 호출은 뒤에서 워커가 자기 속도로 처리한다. 들어오는 트래픽 속도와 처리 속도를 떼어냈다. 매일 아침 문제 메일 발송 후 몰리는 순간 트래픽을 큐가 흡수하는 부하 평탄화 효과도 함께 얻었다.",
      },
      {
        tag: "03 / WHY NOT KAFKA",
        heading: "Redis Streams 를 고른 근거",
        body: "인메모리 큐는 서버 프로세스에 묶여 공유되지 않는다. Redis Streams 는 Consumer Group 으로 여러 워커가 한 큐를 분담한다. Kafka 를 쓰지 않은 건 이미 인증과 캐싱에 Redis 를 쓰고 있어 추가 인프라 운영 부담이 없었고, 이 큐 규모가 분산 로그와 고내구성까지 요구하지 않았기 때문이다. 필요한 기능은 Redis Streams 로 충분했다.",
      },
      {
        tag: "04 / INTEGRITY",
        heading: "중복 방지 상태와 실제 큐 상태를 어긋나지 않게",
        body: "적재할 때 Redis Set 으로 answerId 중복을 막고 자정까지 TTL 을 줘 매일 초기화한다. Stream 적재가 실패하면 Set 과 emitter 를 되돌리는 롤백을 넣었다. 이게 없으면 큐에는 없는데 중복 방지 목록에는 남아 다시 요청해도 처리되지 않는 상태가 생긴다.",
      },
      {
        tag: "05 / AUTOSCALING",
        heading: "워커 수를 큐 길이에 반응시켰다",
        body: "고정값은 두 방향 모두 손해였다. 적으면 밀리고 많으면 idle 스레드가 자원을 놀린다. ScheduledExecutorService 로 5초마다 큐 크기를 확인해 corePoolSize 를 2에서 16 사이로 조절한다. 핵심은 allowCoreThreadTimeOut(true) 로 core 스레드도 idle 시 종료되게 한 것이다. 보통 core 스레드는 죽지 않는데, 이 설정으로 한가할 때 자원을 실제로 반납한다. CPU 약 50% 개선, 메모리 약 74% 절감.",
      },
      {
        tag: "06 / SPOF",
        heading: "Retry 를 먼저, 그 위에 CircuitBreaker",
        body: "공통 인터페이스를 두고 OpenAI 1차 호출이 실패하면 Claude 로 자동 폴백한다. 그 위에 Resilience4j 를 데코레이터로 감쌌는데, 순서를 의도했다. Retry 가 안쪽이면 일시적 오류는 Retry 단계에서 먼저 흡수되고 Retry 로도 안 되는 진짜 지속적 장애만 서킷의 실패 카운트에 반영된다. 일시적 깜빡임으로 서킷이 너무 쉽게 열리는 걸 막는 구성이다.",
      },
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
    details: [
      {
        tag: "01 / LOCK",
        heading: "모든 요청이 쿠폰 한 행에 줄을 섰다",
        body: "쿠폰 발급에 처음엔 DB 비관적 락을 썼다. 단일 사용자 테스트는 정상이었지만 선착순 100장을 가정하고 동시 요청을 던지자, 모든 요청이 쿠폰 한 행의 락을 두고 직렬화되면서 뒤 순번의 대기가 수십 분 단위까지 치솟았다. 이건 DB 락으로 풀 문제가 아니라고 판단했다.",
      },
      {
        tag: "02 / LUA",
        heading: "정합성 판정을 충돌 비용이 싼 곳으로 옮겼다",
        body: "SISMEMBER 로 중복 확인, SCARD 로 현재 수량 확인, SADD 로 발급 확정. 이 셋을 Redis Lua Script 하나의 원자적 연산으로 묶었다. Lua 는 Redis 에서 단일 스레드로 끝까지 실행되므로 세 연산 사이에 다른 요청이 끼어들 수 없어 race condition 이 원천 차단된다. 가장 빈번하고 충돌이 잦은 판단을 여기서 끝낸다.",
      },
      {
        tag: "03 / BATCH",
        heading: "무거운 DB 쓰기는 뒤로 미뤘다",
        body: "발급이 확정된 요청만 Redis List 큐에 넣고, 스케줄러가 5초마다 최대 100건씩 꺼내 쿠폰별로 묶어 한 번에 저장한다. 사용자 응답은 큐에 넣는 순간 즉시 반환된다. 중복은 Redis 단계에서 1차로 막고 배치 저장 시 IN 절 조회로 2차 확인해 이중으로 방어했다. 락 대기가 약 60분에서 0.15초 수준으로 내려갔다.",
      },
      {
        tag: "04 / BENCHMARK",
        heading: "느린 걸 알고도 Kafka 를 택했다",
        body: "결제 후속 작업을 트랜잭션 안에서 처리하니 부가 작업 하나가 느려지면 결제 전체가 영향을 받았다. 이벤트로 분리한다는 방향은 정했지만 어떤 메커니즘이 맞는지는 단정하지 않고 Spring Event, Redis, Kafka 셋을 직접 구현해 비교했다. 발행 계층을 인터페이스로 추상화해 프로파일로 갈아끼웠다. Kafka 는 전체 처리 시간이 3,037ms 대 14,237ms 로 가장 느렸지만, 결제 완료 이벤트는 유실되면 안 되고 소비자가 서로 독립적으로 확장 실패할 수 있어야 했다.",
      },
      {
        tag: "05 / PARTITION KEY",
        heading: "파티션 키를 정합성 도구로 썼다",
        body: "Kafka 는 같은 키의 메시지를 같은 파티션으로 보내 순서를 보장한다. 결제 완료 이벤트는 orderId 를 키로 써서 같은 주문의 이벤트가 순서대로 처리되게 하고, 쿠폰 발급 이벤트는 couponId 를 키로 써서 같은 쿠폰 요청이 한 파티션에서 순차 처리되도록 수량 정합성을 보장했다.",
      },
      {
        tag: "06 / DURABILITY",
        heading: "발행과 소비 양쪽에 안전장치",
        body: "소비 실패는 DLT 로 보내 10초마다 재시도 대상을 점검하고 지수 백오프로 30초, 1분, 2분, 4분 간격을 둔다. 발행 단계 유실은 Outbox 패턴으로 막았다. 이벤트를 DB 에 먼저 기록하고 별도 스케줄러가 발행한다.",
      },
      {
        tag: "07 / N+1",
        heading: "쿼리 1,001번을 2번으로",
        body: "주문 목록을 가져온 뒤 각 주문의 상품을 조회하는데 주문 N개마다 쿼리가 따로 나가는 전형적인 N+1 이었다. 주문 1,000건이면 1,001번이다. Hibernate Statistics 로 실제 쿼리 수를 찍어 확인했다. Fetch Join 은 페이징 문제가 있어서, 쿼리를 두 번으로 나누되 각각을 IN 절로 배치화하고 메모리에서 그룹핑했다. 쿼리 수를 회귀 검증하는 테스트로 재발을 막았다.",
      },
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
    details: [
      {
        tag: "01 / RATE LIMIT",
        heading: "테스트가 토큰 발급 제한에 걸려 깨졌다",
        body: "증권사 API 는 초당 호출 제한이 있고 토큰 발급은 분당 1회로 더 엄격하다. 통합 테스트를 반복 실행하다 403 에 걸렸다. 호출 사이에 고정 sleep 을 넣으면 한가할 때도 불필요하게 느려진다. 여유가 있을 땐 빠르게 통과시키고 몰릴 때만 정확히 대기시키는 방식이 필요했다.",
      },
      {
        tag: "02 / TOKEN BUCKET",
        heading: "부족한 만큼만 정확히 기다린다",
        body: "버킷에 토큰을 일정 속도로 채우고 요청은 토큰을 소비한다. 토큰이 없으면 부족분을 채움 속도로 나눠 정확한 대기 시간을 계산해 그만큼만 쉬고, 깨어난 뒤 한 번 더 확인한다. 스케줄러 오차 방어다. API 허용치가 초당 20회인데 구현은 15회로 잡았다. 네트워크 지연이나 시계 오차로 경계에서 초과 호출이 나가는 걸 막는 여유분이다.",
      },
      {
        tag: "03 / MONOTONIC",
        heading: "벽시계로 경과 시간을 재지 않았다",
        body: "토큰 보충량은 경과 시간 곱하기 속도로 계산한다. 여기에 time.time() 이 아니라 time.monotonic() 을 썼다. time.time() 은 NTP 동기화 같은 시스템 시각 보정이 들어오면 순간적으로 시간이 거꾸로 흐를 수 있고, 그러면 음수 경과 시간이 나와 토큰 계산이 깨져 제한을 초과한다. 금융 시스템에서 이건 실제 위험이다.",
      },
      {
        tag: "04 / SERIALIZE",
        heading: "토큰 획득 자체를 직렬화했다",
        body: "여러 요청이 동시에 토큰을 소비하면 카운트가 어긋난다. asyncio.Lock 으로 토큰 확인과 차감을 한 덩어리로 묶어, 한 루틴이 그걸 하는 동안 다른 루틴은 Lock 앞에서 대기하게 했다. 이 Rate Limiter 는 HTTP 파이프라인의 가장 앞단에 둬서 토큰 갱신 호출까지 포함한 모든 외부 호출이 제한을 거치게 했다.",
      },
      {
        tag: "05 / RETRY",
        heading: "재시도해서 풀리는 문제와 아닌 문제",
        body: "429 와 5xx 같은 일시적 혼잡과 서버 오류는 지수 백오프로 재시도한다. 400, 401, 403 처럼 잘못된 요청이나 권한 문제는 즉시 실패시킨다. 재시도해도 같은 결과라 리소스만 낭비한다. 타임아웃은 고정 간격으로 재시도한다.",
      },
      {
        tag: "06 / SHUTDOWN",
        heading: "종료 순서를 보장해 버퍼를 지켰다",
        body: "실시간 데이터를 인메모리 버퍼에 모았다가 배치로 쓰는 구조라, 서버가 그냥 종료되면 버퍼에 남은 데이터가 증발한다. 주기적 flush 태스크를 먼저 멈추고, 진행 중이던 flush 완료를 기다리고, 남은 마지막 데이터를 flush 하고, 그 다음에 DB 커넥션을 닫는다. 커넥션을 닫기 전에 반드시 flush 가 끝나도록 순서를 잡은 게 포인트다.",
      },
      {
        tag: "07 / EVENT LOOP",
        heading: "Lock 을 잡은 채로 await 하지 않는다",
        body: "버퍼는 공유 자원이라 Lock 으로 보호해야 하는데, Lock 을 잡은 채 DB I/O 를 호출하면 이벤트 루프 전체가 막힌다. Lock 안에서는 버퍼에 추가하고 flush 필요 여부 플래그만 확인하고, 실제 flush 는 Lock 을 푼 뒤에 실행했다. asyncio 에서 자주 나오는 실수라 Lock 범위를 최소로 잡았다.",
      },
    ],
    stack: ["Python", "FastAPI", "asyncio", "TimescaleDB", "httpx", "WebSocket"],
  },
];
