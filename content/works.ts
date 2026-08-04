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

/**
 * 상세 하나에 딸리는 그림. 이미지가 아니라 괘선과 글자로 그린다.
 * 다크 토큰을 그대로 쓰고, 확대해도 깨지지 않고, 용량이 없다.
 *
 * 네 가지로 제한한다. 종류가 늘어나면 그림마다 다른 문법이 생겨서
 * 읽는 사람이 매번 새로 해석해야 한다.
 */
export type Diagram =
  | { kind: "flow"; nodes: string[]; note?: string }
  | { kind: "nest"; layers: string[]; core: string; aside?: string; note?: string }
  | {
      kind: "bars";
      items: { label: string; display: string; ratio: number }[];
      note?: string;
    }
  | { kind: "steps"; items: string[]; note?: string };

/** 판이 화면 가운데 머무는 동안 스크롤에 따라 차례로 흘러나오는 상세.
 *  노션 원본의 트러블슈팅 구조를 그대로 옮긴 것이라 지어낸 내용이 없다. */
export type Detail = {
  /** 라틴/숫자 라벨. Mono 로 나가므로 한글을 넣지 않는다. */
  tag: string;
  heading: string;
  body: string;
  diagram?: Diagram;
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
  /** 무엇을 풀었는지. 상세가 흐르기 시작하는 첫 블록이다. */
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
      "매일 CS 면접 문제를 메일로 보내고 서술형 답안을 AI가 채점해 피드백하는 서비스입니다. 6명 팀에서 AI 도메인 전반을 맡아 피드백 파이프라인, 비동기 처리 구조, 외부 AI API 장애 대응을 설계하고 구현했습니다. 사용자 100명 이상이 썼고 KDT 과정 최우수 프로젝트로 뽑혔습니다.",
    metrics: [
      { from: "1,900", to: "26,000", unit: "건", label: "총 처리 요청 (K6)" },
      { from: "3,500", to: "200", unit: "ms", label: "평균 응답 시간" },
      { from: "60", to: "4.5", unit: "%", label: "실패율" },
    ],
    details: [
      {
        tag: "01 / DIAGNOSIS",
        heading: "병목은 OpenAI가 아니라 우리 서버였다",
        body: "실제로 받은 질문이 있습니다. OpenAI는 안정적인데 왜 굳이 큐를 뒀냐는 것이었습니다. AI 채점은 SSE로 결과를 스트리밍하는데 요청 하나가 응답까지 길게는 수 초씩 걸리는 느린 I/O입니다. 처음엔 이 작업을 단일 서버의 인메모리 큐에 적재해 처리했습니다. 문제는 부하 테스트에서 드러났습니다. K6로 동시 사용자를 늘리자 느린 AI 호출들이 한정된 처리 용량을 동시에 오래 점유하면서 큐가 길어졌고, 뒤따라온 요청이 줄줄이 타임아웃 났습니다. 500 VU 환경에서 실패율이 60%까지 올라갔습니다. 여기서 중요한 진단이 나왔습니다. OpenAI는 안정적이었고 요청도 잘 받았습니다. 문제는 느린 응답을 기다리는 동안 우리 서버가 동시 요청을 못 버틴 것이었습니다. 외부 API의 안정성과 내 서버가 느린 I/O를 견디는 능력은 다른 레이어의 문제였습니다.",
      },
      {
        tag: "02 / DECOUPLING",
        heading: "큐를 둔 이유는 장애 대비가 아니라 분리였다",
        body: "사용자에겐 접수됐다를 즉시 응답하고 SSE 연결을 유지한 채, 무거운 AI 호출은 뒤에서 워커가 자기 속도로 처리하게 했습니다. 들어오는 트래픽 속도와 처리 속도를 떼어낸 것입니다. 동시에 매일 아침 문제 메일을 발송한 직후 몰리는 순간 트래픽을 큐가 흡수하는 부하 평탄화 효과도 함께 얻었습니다.",
        diagram: {
          kind: "flow",
          nodes: ["사용자 요청", "즉시 접수 응답", "큐 적재", "워커가 AI 호출", "SSE로 결과 푸시"],
          note: "요청 스레드가 AI 응답을 기다리지 않는다",
        },
      },
      {
        tag: "03 / WHY NOT KAFKA",
        heading: "Redis Streams 를 고른 근거",
        body: "인메모리 큐는 서버 프로세스에 묶여 공유되지 않습니다. Redis Streams 는 Consumer Group 으로 여러 워커가 한 큐를 분담해 수평 확장이 됩니다. Kafka 를 쓰지 않은 이유는 세 가지였습니다. 이미 인증과 JWT 리프레시 토큰, 캐싱에 Redis 를 쓰고 있어 추가 인프라 운영 부담이 없었고, AI 피드백 큐 규모가 Kafka 의 분산 로그와 고내구성까지 요구하는 수준은 아니었으며, Kafka 는 러닝커브가 높은 편이었습니다. 필요한 기능인 Consumer Group 병렬 처리, 메시지 보존, ACK 는 Redis Streams 로 충분했습니다.",
        diagram: {
          kind: "flow",
          nodes: ["Redis Stream", "Consumer Group", "Worker 1 ... N", "ACK"],
          note: "인메모리 큐는 프로세스에 묶여 이 분담이 불가능하다",
        },
      },
      {
        tag: "04 / INTEGRITY",
        heading: "중복 방지 상태와 실제 큐 상태를 어긋나지 않게",
        body: "적재할 때 Redis Set 으로 answerId 중복을 막고 자정까지 TTL 을 부여해 매일 초기화합니다. 여기에 Stream 적재가 실패하면 Set 과 emitter 를 되돌리는 롤백 처리를 넣었습니다. 이게 없으면 큐에는 없는데 중복 방지 목록에는 남아 있는 상태가 생깁니다. 사용자가 다시 요청해도 이미 처리했다고 판단해 영원히 채점되지 않습니다. 중복 방지 상태와 실제 큐 상태가 어긋나지 않게 만드는 것이 요점이었습니다.",
      },
      {
        tag: "05 / AUTOSCALING",
        heading: "워커 수를 큐 길이에 반응시켰다",
        body: "Consumer 워커 수를 고정값으로 두면 두 방향 모두 손해였습니다. 너무 적으면 트래픽 몰릴 때 처리가 밀리고, 너무 많으면 한가할 때 idle 스레드가 CPU와 메모리를 놀립니다. Grafana 에서 자원 대비 처리 효율이 낮은 구간이 실제로 관찰됐습니다. 그래서 부하의 실제 신호인 큐 길이에 반응하게 만들었습니다. ScheduledExecutorService 로 5초마다 큐 크기를 확인해 ThreadPoolExecutor 의 corePoolSize 를 조절합니다. 핵심 디테일은 allowCoreThreadTimeOut 을 켜서 core 스레드도 idle 시 종료되게 한 점입니다. 보통 core 스레드는 죽지 않는데, 이 설정으로 한가할 때 자원을 실제로 반납하게 했습니다. 워커는 자신의 인덱스가 현재 목표 수를 넘으면 스스로 종료해 축소도 자연스럽게 동작합니다.",
        diagram: {
          kind: "steps",
          items: [
            "큐 1,000건 초과 → 워커 16",
            "큐 500건 초과 → 워커 8",
            "큐 100건 초과 → 워커 4",
            "그 외 → 워커 2 (core)",
          ],
          note: "CPU 약 50% 개선, 메모리 약 74% 절감. Grafana 도입 전후 비교",
        },
      },
      {
        tag: "06 / SPOF",
        heading: "Retry 를 안쪽에, CircuitBreaker 를 바깥에",
        body: "AI 채점은 외부 LLM API 에 전적으로 의존합니다. 이 API 가 실패하거나 지연되면 서비스 전체가 불안정해지는 단일 장애점이었고, 초기엔 호출 실패 시 500 을 던지고 끝이었습니다. 두 겹으로 막았습니다. 먼저 공통 인터페이스를 두고 OpenAI 1차 호출이 실패하면 Claude 로 자동 폴백하는 구현을 기본 빈으로 올려, 한 공급자가 죽어도 다른 공급자로 무중단 처리되게 했습니다. 그 위에 Resilience4j 를 데코레이터로 감쌌는데 순서를 의도했습니다. Retry 가 안쪽이면 일시적 오류는 Retry 단계에서 먼저 흡수되고, Retry 로도 안 되는 진짜 지속적 장애만 CircuitBreaker 의 실패 카운트에 반영됩니다. 일시적인 깜빡임으로 서킷이 너무 쉽게 열리는 걸 막는 구성입니다. 실제 LLM 호출 코드는 건드리지 않고 바깥에서만 감쌌습니다.",
        diagram: {
          kind: "nest",
          layers: [
            "CircuitBreaker  지속 장애면 차단, Half-Open 으로 자동 복구",
            "Retry  지수 백오프로 일시적 실패 흡수",
          ],
          core: "OpenAI 호출",
          aside: "실패하면 Claude 로 폴백",
          note: "순서를 뒤집으면 일시적 깜빡임이 서킷을 열어 버린다",
        },
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
      "선착순 쿠폰이나 재고처럼 트래픽이 한 점에 몰리는 상황에서 데이터 정합성을 어떻게 지키는가, 그리고 결제 이후의 부가 작업을 어떻게 본 트랜잭션에서 떼어내 안정적으로 처리하는가. 이 두 질문을 중심으로 동시성, 메시징, 쿼리 최적화를 직접 구현하고 비교하며 만든 서버입니다.",
    metrics: [
      { from: "60", to: "0.15", unit: "초", label: "쿠폰 락 대기 시간" },
      { from: "1,001", to: "2", unit: "회", label: "주문 조회 쿼리 수" },
      { to: "70.8", unit: "%", label: "인기상품 캐시 히트율" },
    ],
    details: [
      {
        tag: "01 / LOCK",
        heading: "모든 요청이 쿠폰 한 행에 줄을 섰다",
        body: "쿠폰 발급에 처음엔 DB 비관적 락을 사용했습니다. 단일 사용자 테스트는 정상이었지만 선착순 100장을 가정하고 동시 요청을 부하 테스트로 던지자 문제가 드러났습니다. 모든 요청이 쿠폰 한 행의 락을 두고 줄을 서면서, 뒤 순번 사용자는 락 대기 시간이 비현실적으로 길어졌습니다. 대기가 수십 분 단위까지 치솟는 걸 보고 이건 DB 락으로 풀 문제가 아니라고 판단했습니다. 원인은 명확했습니다. 모든 동시 요청이 같은 자원 하나에 직렬화되는 구조 자체였습니다.",
      },
      {
        tag: "02 / LUA",
        heading: "정합성 판정을 충돌 비용이 싼 곳으로 옮겼다",
        body: "가장 빈번하고 충돌이 잦은 판단인 발급 가능 여부를 DB 밖으로 옮겼습니다. 중복 발급 확인, 현재 발급 수량 확인, 발급 확정. 이 셋을 Redis Lua Script 하나의 원자적 연산으로 묶었습니다. Lua 는 Redis 에서 단일 스레드로 끝까지 실행되므로 세 연산 사이에 다른 요청이 끼어들 수 없어 race condition 이 원천 차단됩니다.",
        diagram: {
          kind: "nest",
          layers: ["Redis Lua Script  단일 스레드로 끝까지 실행"],
          core: "SISMEMBER → SCARD → SADD",
          note: "세 연산이 하나의 원자 단위라 사이에 다른 요청이 끼어들 수 없다",
        },
      },
      {
        tag: "03 / BATCH",
        heading: "무거운 DB 쓰기는 뒤로 미뤘다",
        body: "발급이 확정된 요청만 Redis List 큐에 넣고, 스케줄러가 5초마다 최대 100건씩 꺼내 쿠폰별로 묶어 한 번에 저장합니다. 사용자 응답은 큐에 넣는 순간 즉시 반환되고 무거운 DB 쓰기는 뒤에서 모아 처리합니다. 중복은 두 겹으로 막았습니다. Redis 단계에서 1차로 차단하고, 배치 저장 시 이미 발급된 사용자를 IN 절 조회로 한 번에 걸러내 2차로 확인합니다. 정합성 판정과 DB 영속화를 분리해 응답 지연과 DB 부하를 동시에 해소했습니다.",
        diagram: {
          kind: "flow",
          nodes: ["Lua 원자 판정", "Redis List 큐", "5초마다 100건", "쿠폰별 그룹핑", "saveAll"],
          note: "락 대기 약 60분에서 0.15초로",
        },
      },
      {
        tag: "04 / BENCHMARK",
        heading: "느린 걸 알고도 Kafka 를 택했다",
        body: "결제가 완료되면 인기상품 랭킹 갱신, 외부 데이터 플랫폼 전송 같은 후속 작업이 따라붙습니다. 처음엔 이걸 결제 트랜잭션 안에서 같이 처리했는데, 후속 작업 하나가 느려지거나 실패하면 결제 전체가 영향을 받는 구조였습니다. 이벤트로 분리한다는 방향은 정했지만 어떤 메커니즘이 맞는지는 단정하지 않고 세 가지를 직접 구현해 비교했습니다. 발행 계층을 인터페이스로 추상화해 구현체를 프로파일로 갈아끼울 수 있게 설계했습니다. Spring Event 는 구현이 단순하고 인프라가 필요 없지만 같은 JVM 안으로 한정되고 영속성이 없어 서버가 죽으면 유실됩니다. Redis 는 빠르고 프로세스 분리가 되지만 메시지 영속과 재처리 보장이 약합니다. Kafka 는 영속성과 순서 보장, 소비자 독립 확장을 주는 대신 인프라 운영 부담이 있습니다. 결제 완료 이벤트는 유실되면 안 되고 소비자가 서로 독립적으로 확장하고 실패할 수 있어야 했습니다. 그래서 가장 느린 걸 알면서도 Kafka 를 택했습니다.",
        diagram: {
          kind: "bars",
          items: [
            { label: "Spring Event", display: "3,037 ms", ratio: 0.21 },
            { label: "Kafka", display: "14,237 ms", ratio: 1 },
          ],
          note: "전체 처리 시간. 느린 쪽을 고른 이유는 속도가 아니라 내구성이었다",
        },
      },
      {
        tag: "05 / PARTITION KEY",
        heading: "파티션 키를 정합성 도구로 썼다",
        body: "Kafka 는 같은 키의 메시지를 같은 파티션으로 보내 순서를 보장합니다. 이걸 성능 옵션이 아니라 정합성 도구로 활용했습니다. 결제 완료 이벤트는 orderId 를 키로 써서 같은 주문의 이벤트가 순서대로 처리되게 하고, 쿠폰 발급 이벤트는 couponId 를 키로 써서 같은 쿠폰에 대한 요청이 한 파티션에서 순차 처리되도록 수량 정합성을 보장했습니다.",
        diagram: {
          kind: "flow",
          nodes: ["Key = orderId", "같은 파티션", "순차 소비", "순서 보장"],
        },
      },
      {
        tag: "06 / DURABILITY",
        heading: "발행과 소비 양쪽에 안전장치",
        body: "소비 단계의 실패는 DLT 로 보내 10초마다 재시도 대상을 점검하고 지수 백오프로 간격을 벌립니다. 발행 단계의 유실은 Outbox 패턴으로 막았습니다. 이벤트를 DB 에 먼저 기록하고 별도 스케줄러가 발행하는 구조라, 발행 직전에 프로세스가 죽어도 기록이 남아 있습니다. 한쪽만 막으면 반대쪽에서 새기 때문에 양쪽에 다 뒀습니다.",
        diagram: {
          kind: "steps",
          items: ["1차 재시도 30초 후", "2차 1분 후", "3차 2분 후", "4차 4분 후"],
          note: "DLT 재시도 간격. 10초마다 대상을 점검한다",
        },
      },
      {
        tag: "07 / N+1",
        heading: "쿼리 1,001번을 2번으로",
        body: "주문 내역 조회 API 에서 주문 목록을 가져온 뒤 각 주문의 상품을 조회하는데, 주문 N개마다 쿼리가 따로 나가는 전형적인 N+1 이 발생했습니다. 주문 1,000건이면 주문 조회 1번에 상품 조회 1,000번을 더해 1,001번입니다. Hibernate Statistics 로 실제 쿼리 수를 찍어 확인했습니다. Fetch Join 은 페이징 문제가 있어서, 쿼리를 두 번으로 나누되 각각을 배치화하는 방식을 택했습니다. 주문 ID 목록으로 상품을 IN 절 한 번에 가져와 메모리에서 그룹핑합니다. 그리고 Hibernate Statistics 기반 테스트로 쿼리 수 자체를 회귀 검증해 재발을 막았습니다.",
        diagram: {
          kind: "bars",
          items: [
            { label: "개선 전", display: "1,001 회", ratio: 1 },
            { label: "개선 후", display: "2 회", ratio: 0.02 },
          ],
          note: "약 99.8% 감소. 쿼리 수를 세는 테스트로 재발을 막았다",
        },
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
      "국내 선물과 옵션의 실시간 시세를 받아 자동으로 주문을 체결하는 시스템입니다. 백엔드 인턴으로 외부 증권사 API 연동을 담당했습니다. 외부에 전적으로 의존하는 구조라 외부가 흔들려도 내 서비스는 버티게 만드는 것이 일이었습니다. 실무 프로젝트라 코드는 비공개이며 설계 의도 중심으로 정리했습니다.",
    metrics: [
      { from: "0", to: "85", unit: "%", label: "테스트 커버리지" },
      { to: "731", unit: "개", label: "테스트 케이스" },
      { to: "15", unit: "req/s", label: "안전 마진 (허용 20)" },
    ],
    details: [
      {
        tag: "01 / RATE LIMIT",
        heading: "테스트가 토큰 발급 제한에 걸려 깨졌다",
        body: "증권사 API 는 초당 호출 횟수 제한이 있고, 토큰 발급 API 는 분당 1회로 더 엄격합니다. 실제로 통합 테스트를 반복 실행하던 중 토큰 발급 제한에 걸려 테스트가 깨지는 일을 겪었습니다. 단순히 호출 사이에 sleep 을 넣는 방법도 있지만 그러면 한가할 때도 불필요하게 느려집니다. 여유가 있을 땐 빠르게 통과시키고 몰릴 때만 정확히 대기시키는 방식이 필요했습니다.",
      },
      {
        tag: "02 / TOKEN BUCKET",
        heading: "부족한 만큼만 정확히 기다린다",
        body: "Token Bucket 알고리즘을 선택했습니다. 버킷에 토큰을 일정 속도로 채우고 요청은 토큰을 소비하며, 토큰이 없으면 부족한 만큼만 정확히 계산해 대기합니다. 부족분을 채움 속도로 나눠 대기 시간을 구하고 그만큼만 쉰 뒤, 깨어나서 한 번 더 토큰을 확인합니다. 스케줄러 오차 방어입니다. 여기서 의도적으로 정한 것이 안전 마진입니다. API 허용치가 초당 20회인데 구현은 15회로 잡았습니다. 네트워크 지연이나 시계 오차로 경계에서 초과 호출이 나가는 걸 막기 위한 여유분입니다. 이 Rate Limiter 는 HTTP 요청 파이프라인의 가장 앞단에 둬서 토큰 갱신 호출까지 포함한 모든 외부 호출이 제한을 거치도록 했습니다.",
        diagram: {
          kind: "flow",
          nodes: ["요청", "토큰 확인", "여유 있으면 즉시 통과", "없으면 부족분만큼 대기", "재확인 후 소비"],
          note: "고정 sleep 과 달리 한가할 때는 지연이 0이다",
        },
      },
      {
        tag: "03 / MONOTONIC",
        heading: "벽시계로 경과 시간을 재지 않았다",
        body: "토큰 보충량은 경과 시간에 속도를 곱해 계산합니다. 이 경과 시간 측정에 time.time() 이 아니라 time.monotonic() 을 썼습니다. time.time() 은 NTP 동기화 같은 시스템 시각 보정이 들어오면 순간적으로 시간이 거꾸로 흐를 수 있고, 그러면 음수 경과 시간이 나와 토큰 계산이 깨져 제한을 초과할 수 있습니다. 금융 시스템에서 이건 실제 위험이라 monotonic 을 선택했습니다.",
        diagram: {
          kind: "steps",
          items: [
            "time.time()  시스템 시각 보정에 역행할 수 있다",
            "음수 경과 시간  토큰 계산이 깨진다",
            "제한 초과 호출  금융 시스템에서는 실제 위험",
            "time.monotonic()  단조 증가가 보장된다",
          ],
        },
      },
      {
        tag: "04 / SERIALIZE",
        heading: "토큰 획득 자체를 직렬화했다",
        body: "여러 요청이 동시에 토큰을 소비하면 카운트가 어긋날 수 있습니다. asyncio.Lock 으로 토큰 확인과 차감을 한 덩어리로 묶어, 한 루틴이 그 일을 하는 동안 다른 루틴은 Lock 앞에서 대기하게 했습니다. 검증은 단위 테스트로 했습니다. 초당 15회를 넘으면 대기하는가, 시간이 지나면 토큰이 리필되는가, 여유가 있으면 즉시 통과하는가 등 네 개 시나리오를 확인했습니다.",
      },
      {
        tag: "05 / RETRY",
        heading: "재시도해서 풀리는 문제와 아닌 문제",
        body: "재시도를 일괄로 걸지 않고 원인별로 나눴습니다. 429 와 500번대 같은 일시적 혼잡이나 서버 오류는 지수 백오프로 재시도합니다. 400, 401, 403 처럼 잘못된 요청이나 권한 문제는 즉시 실패시킵니다. 재시도해도 같은 결과라 리소스만 낭비하기 때문입니다. 타임아웃은 고정 간격으로 재시도합니다. 재시도하면 풀리는 문제와 재시도해도 안 풀리는 문제를 구분한 것이 핵심입니다.",
        diagram: {
          kind: "steps",
          items: [
            "429, 5xx  지수 백오프 1초, 2초, 4초",
            "400, 401, 403  즉시 실패",
            "타임아웃  고정 간격 재시도",
          ],
        },
      },
      {
        tag: "06 / SHUTDOWN",
        heading: "종료 순서를 보장해 버퍼를 지켰다",
        body: "이 시스템은 실시간 데이터를 인메모리 버퍼에 모았다가 배치로 DB 에 씁니다. 서버가 그냥 종료되면 버퍼에 남은 데이터가 증발합니다. 그래서 종료 순서를 보장했습니다. 커넥션을 닫기 전에 반드시 flush 가 끝나도록 순서를 잡은 것이 요점입니다.",
        diagram: {
          kind: "steps",
          items: [
            "주기적 flush 태스크 정지",
            "진행 중이던 flush 완료 대기",
            "버퍼에 남은 마지막 데이터 flush",
            "DB 커넥션 close",
          ],
          note: "순서를 바꾸면 마지막 데이터가 증발한다",
        },
      },
      {
        tag: "07 / EVENT LOOP",
        heading: "Lock 을 잡은 채로 await 하지 않는다",
        body: "실시간 시세는 초당 다량으로 쏟아져서 한 건씩 DB 에 쓰면 부하를 감당하지 못합니다. 인메모리 버퍼에 모았다가 100건이 쌓이거나 30초가 지나면 배치로 한 번에 씁니다. 여기서 비동기 환경 특유의 함정을 피했습니다. 버퍼는 공유 자원이라 Lock 으로 보호해야 하는데, Lock 을 잡은 채로 DB I/O 를 호출하면 이벤트 루프 전체가 막힙니다. 그래서 Lock 안에서는 버퍼에 추가하고 flush 필요 여부 플래그만 확인하고, 실제 flush 는 Lock 을 푼 뒤에 실행했습니다. asyncio 에서 자주 나오는 실수라 Lock 범위를 최소로 잡았습니다.",
        diagram: {
          kind: "nest",
          layers: ["asyncio.Lock  버퍼 추가와 플래그 확인만"],
          core: "여기서는 await 하지 않는다",
          aside: "Lock 해제 후 flush",
          note: "Lock 안에서 await 하면 이벤트 루프 전체가 멈춘다",
        },
      },
    ],
    stack: ["Python", "FastAPI", "asyncio", "TimescaleDB", "httpx", "WebSocket"],
  },
];
