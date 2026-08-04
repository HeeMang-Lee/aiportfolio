

======================================================================
# MONEST AI
======================================================================


![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/4f329c9e-2f86-448f-8ec2-e4fc0227ca13/1f3e988e-4cb8-4190-a7ec-dbe25a85046a/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZGNFGXR6%2F20260803%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260803T073644Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECgaCXVzLXdlc3QtMiJHMEUCIAxvdIb6frPFvrmdXTvPiHGtpUxQUI97AdJmuB44JACQAiEA46P9bu%2FbGOcGwW9B4DQYdpDV8%2FOvlUv6JlunYKa%2BkCcqiAQI8f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEag2SouyqYW3%2BEweCrcA2zei9QXA6yr9Y3G%2BbSqHCWK5cuYVgl3eurIpsTADOlTmwS2DZVOXAjqq3UWYW3NUuk1lWC0c8%2FaAS9NFnLx%2FbNc%2B%2B0RBaFqkDF8SQvH%2FwyZGU41w6d6UvTQyRD%2B1VP8%2F7mtvE6IkoHdcoXxoDKh2gO88KpN8F2tG%2FOiyAUHjULSd3p46msq4wjqO7fm2JgysLRVSYcK%2FRYDnUbF2HNrhkudxiIwmaSzDHkPRfKdGcA1j4lf5YuuO94m5nD7HxQvklqL7L%2FuaRPWIgwY6eIuoiA0ckhfLZW4%2BZJS6bGKmcFStXgP6mhU6NK8AhVD8dTKiOqWrLvlLRWICMzElOPgJa7PSLeYvzcO4CIiHrNxbw989tP193IztTw%2FwRanSkKgTb3nGqiajQ82kltNKeMkfe3qb2CCHjbVoQ3yQIB4XoINNUnmuxOgxY7TEA1BXA56taEkDcjjNQRHYy8gYzjYbo7EGf4Wxa35u400t%2B8fixxabSj3q72PFW5eYLy8Au9VTqWVtWIgO%2BbGPblMf24KAhNyIhyeRU%2FcYTNFyVXQ1T3rLKzp7M3CVf3pOcm5Iq%2BWz6z6XHfw5%2FiSi1YRzYdFhy5zfZJPrc2vDQ9WO67yl2uotDX9yb1ApcbM%2BdB9MMmIwdMGOqUBS%2FwQGer0lgCP5bFhvZaOkr88JP%2BdLGf8cYDDJVSxcxyKA41kOeMH5rJ9wVjVEGV2wb7iJfYsQ5g341aUB8XneG4CCx38kFscWSbsg74SbF4dn1CezHDmtcnYeOPdohIzIOmVJIxOwgqYggG9xnsZTguBsHJ8Yp0zcj0k5UUA7XkSSNvO2SSDkhx4SHpn3ju9nAjPdy8PRcdXR0mWXzdB9KfpDGGq&X-Amz-Signature=90e3bef70bf40cc7728800233d3a77adc836a130e6073eb10c35a44e62216a87&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


# AI Trade Server (MonestAI 인턴)

    > 국내 선물·옵션 실시간 시세 수신 + 자동 주문 체결 시스템 — 외부 증권사 API 연동의 안정성·정확성 설계
>
>     **기간** 2025.11 ~ 2025.12 · **역할** Backend Developer (인턴)
>     **기술** Python, FastAPI, asyncio, TimescaleDB, httpx · **연동** 증권사 Open API (실시간 WebSocket + REST 주문)
>
>

    ---


    ## 담당 작업


    백엔드 개발자(인턴)로서 외부 증권사(KIS) API 연동을 담당했습니다. 아래 트러블슈팅은 모두 제가 직접 구현한 영역입니다.

    - API 호출 제한 대응 (Token Bucket Rate Limiter)
    - 외부 API 의존성의 신뢰성 설계 (토큰 사전 갱신, HTTP 재시도, graceful shutdown)
    - 실시간 시세 데이터 배치 저장 (비동기 버퍼링 + TimescaleDB)
    - 개발 과정 Claude Code AI Agent 활용 (테스트 커버리지 0→85%, 731개 케이스)

    ---


    ## 트러블슈팅 1. API 호출 제한(Rate Limit) 


        ### 문제


        증권사 API는 초당 호출 횟수 제한이 있고, 토큰 발급 API는 분당 1회로 더 엄격합니다. 실제로 통합 테스트를 반복 실행하던 중 **토큰 발급 제한(403)에 걸려 테스트가 깨지는 일**을 겪었습니다.


        ### 해결책


        단순히 호출 사이에 `sleep`을 넣는 방법도 있지만, 그러면 한가할 때도 불필요하게 느려집니다. **여유가 있을 땐 빠르게 통과시키고, 몰릴 때만 정확히 대기시키는** 방식이 필요. 그래서 Token Bucket 알고리즘을 선택했습니다. 버킷에 토큰을 일정 속도로 채우고, 요청은 토큰을 소비하며, 토큰이 없으면 **부족한 만큼만 정확히 계산해 대기**합니다.


        여기서 두 가지를 의도적으로 결정했습니다.


        **① 안전 마진** — API 허용치가 초당 20회인데, 구현은 **초당 15회**로 잡았습니다. 네트워크 지연이나 시계 오차로 경계에서 초과 호출이 나가는 걸 막기 위한 여유분입니다.


        **②** **`time.monotonic()`** **사용** — 토큰 보충량은 "경과 시간 × 속도"로 계산하는데, 경과 시간 측정에 `time.time()`이 아니라 `time.monotonic()`을 썼습니다. `time.time()` 은 NTP 동기화 같은 시스템 시각 보정이 들어오면 **순간적으로 시간이 거꾸로 흐를 수 있고**, 그러면 음수 경과 시간이 나와 토큰 계산이 깨져 제한을 초과할 수 있습니다. 금융 시스템에서 이건 실제 위험이라 `time.monotonic()`를 선택했습니다.


        ### 동시 요청 통제 방법


        여러 요청이 동시에 토큰을 소비하면 카운트가 어긋날 수 있어, `asyncio.Lock`으로 **토큰 획득 자체를 직렬화**. 한 루틴이 "토큰 확인 → 차감"하는 동안 다른 루틴은 Lock 앞에서 대기. 대기가 필요한 경우엔 부족분을 채움 속도로 나눠(`deficit / rate`) **정확한 대기 시간을 계산**해 그만큼만 쉬고, 깨어난 뒤 한 번 더 토큰을 확인합니다(스케줄러 오차 방어).


        ```python
        # 토큰 획득 — Lock으로 직렬화, 대기는 정확히 계산
        async def acquire(self, tokens=1.0):
            async with self._lock:
                await self._wait_for_tokens(tokens)
                self._tokens -= tokens
        
        def _refill(self):
            now = time.monotonic()                      # 벽시계 아님 — 시각 보정에 안전
            self._tokens = min(self.capacity,
                               self._tokens + (now - self._last_refill) * self.rate)
            self._last_refill = now
        ```


        이 Rate Limiter는 HTTP 요청 파이프라인의 **가장 앞단**에 둬서, 토큰 갱신 호출까지 포함한 모든 외부 호출이 제한을 거치도록 했습니다.


        ### 결과 / 검증

        - 통합 테스트에서 겪던 토큰 발급 제한 문제를, 호출 통제 + 클라이언트 재사용으로 해소
        - 단위 테스트로 동작 검증: "초당 15회 초과 시 대기", "시간 경과에 따른 토큰 리필", "여유 시 즉시 통과" 등 4개 시나리오
        - 한가할 땐 지연 없이 통과, 몰릴 때만 정확히 대기 — 고정 sleep 대비 처리량 손실 최소화

    ---


    ## 트러블슈팅 2. 외부 API에 의존하는 시스템을 안 죽게 만들기 


        외부 증권사 API에 전적으로 의존하는 구조라, **외부가 흔들려도 내 서비스는 버티게** 만드는 게 중요했습니다. 세 겹의 안전장치를 뒀습니다.


        ### 1. HTTP 재시도 — 재시도할 것과 안 할 것의 구분

        - `429, 500, 502, 503, 504` (일시적 혼잡·서버 오류) → 지수 백오프 재시도 (1초 → 2초 → 4초)
        - `400, 401, 403` 등 4xx (잘못된 요청·권한 문제) → **즉시 실패**. 재시도해도 같은 결과라 리소스만 낭비
        - 타임아웃 → 고정 간격 재시도

         "재시도하면 풀리는 문제"와 "재시도해도 안 풀리는 문제"를 구분


        ### 2. Graceful Shutdown — 종료 시 데이터 손실 방지


        이 시스템은 실시간 데이터를 인메모리 버퍼에 모았다가 배치로 DB에 씁니다. 서버가 그냥 종료되면 **버퍼에 남은 데이터가 증발**합니다. 그래서 종료 순서를 보장했습니다: 주기적 flush 태스크를 먼저 멈추고 → 진행 중이던 flush 완료를 기다리고 → 버퍼에 남은 마지막 데이터를 flush하고 → 그 다음에 DB 커넥션을 닫습니다. 커넥션을 닫기 전에 반드시 flush가 끝나도록 순서를 잡은 게 포인트입니다.


    ---


    ## 트러블슈팅 3. 실시간 데이터 배치 저장


        실시간 시세는 초당 다량으로 쏟아져서, 한 건씩 DB에 쓰면 부하를 감당 못 합니다. 그래서 인메모리 버퍼에 모았다가 **100건이 쌓이거나 30초가 지나면 배치로 한 번에** 씁니다.


        여기서 비동기 환경 특유의 함정을 피한 부분이 있습니다. 버퍼는 공유 자원이라 Lock으로 보호해야 하는데, **Lock을 잡은 채로 DB I/O(****`await`****)를 호출하면 이벤트 루프 전체가 막힙니다.** 그래서 Lock 안에서는 "버퍼에 추가 + flush 필요 여부 플래그 체크"만 하고, 실제 flush(`await`)는 **Lock을 푼 뒤에** 실행했습니다.


        ```python
        with self.lock:
            self.memory_buffer[table].append(data)
            should_flush = len(self.memory_buffer[table]) >= self.batch_size  # 플래그만 체크
        if should_flush:               # Lock 해제 후 I/O
            await self._flush_table_buffer(table)
        ```


        asyncio에서 자주 나오는 실수인데, Lock 범위를 최소로 잡아 이벤트 루프 블로킹을 피했습니다.


    ---



======================================================================
# CS25
======================================================================


![ChatGPT_Image_2026%EB%85%84_5%EC%9B%94_27%EC%9D%BC_%EC%98%A4%ED%9B%84_05_05_36.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/4f329c9e-2f86-448f-8ec2-e4fc0227ca13/010717b5-1fa9-4dff-8762-d8d978e0bedb/ChatGPT_Image_2026%EB%85%84_5%EC%9B%94_27%EC%9D%BC_%EC%98%A4%ED%9B%84_05_05_36.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666NWZ6GWB%2F20260803%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260803T073646Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECgaCXVzLXdlc3QtMiJGMEQCICO2G2HQnhBAu5RQxEThQVASJLSiuBV7fddIoFxQuXl1AiArWI72e%2FU8MVs6MY4gacWjCCeQr%2FCC5a72xEKeIGvFcSqIBAjx%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMTTDJ2%2F50sN5v4MbuKtwDnZLOMYdocX3JtW6UcRv3rskzAUcIVXJP5ax2pSDGl5sJYxK%2B7MIeWiNaaQ%2F5nEOs5HeVzmkHlcjGa%2F1lCJFW6kIwRDZvZtTpr7alRt%2Bzw1pm%2Ftvv0X4qndsMWnFm6tts99KvtFtjol4zpNjYZXpOW7pSdNgVGWh3TmW%2BbwsNqTApvLT4BPM%2FFini4GQIuapg0ZEWqrM0kolqMKX8MSG8RNUc8jwFkCqF2eH8DgHZf65uA0%2FFZCOFiq1HHQKPp%2F7tzhbR%2BUi6ZeeGEPmX8SEJYerO5ntDG%2FwSSd8xdCJH3ZsZ2lZh0KBNylXiC09v74lLFf4Un6rZqEQBmUM1OAMZQw1g5dibc12VAAxh027UoT0C7GuZfyE9xYQ9E1JXCxucpkHar9pXwceRdZ0ig3Bkh5iNKnJu0L6b7ZsAU1nd4yUZdVoZUYWp%2FmMyOZvhmRP84g%2Fk5FU3gg6%2BiUsMpN%2Fb5bqcJ5JyLKXBpdlO7YCiAvH7%2BiYC%2B5qjfFnPnA5xzSHAxfAo8MsbB5PQhjelNICPWqOXIaHrMlyTzdZRrUiHmmPMCOFrazQ%2FY2p9znO1fgMiFfNtBoBVb%2B5HZwvDCVAjQiIPnZd37e9HMPtxCZyl2r0MLmeyhD0yMyAOZUEwnYjB0wY6pgERW4ir2dbPa4Iu2duJlrdDIjeqWA6z7UUogAtHNlSi6aMbdKmHLBA6qnMvKIaPRcsShwuV6ttowfcqzvMnjF8bfzMbsxbGa7HjKWipK8uIwYMWRzyAMF63AcmX5Tgm4X4lAtJ29T5LxKdRUPEv3szAkQP1eRq7BYLqQtxBIVwvnjZfl5n2XFTNeH7KWhdf3GGaV3d3iPDwtw38wrblBGJh0Xk3lNZz&X-Amz-Signature=781baa67e9f9cb72610fa09c68994e01cb7892d1292eb1fd70f5648c66b519dc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


# CS25 — AI 기반 CS 학습 플랫폼

    > 매일 CS 면접 문제를 메일로 보내고, 서술형 답안을 AI가 채점·피드백하는 서비스
>
>     **기간** 2025.05 ~ 2025.07 · **인원** 6명 · **사용자** 100명+ · **KDT 과정 최우수 프로젝트**
>
>
>     **기술** Spring Boot, Spring AI, Redis(Streams·캐싱), Resilience4j, Chroma VectorDB, SSE
>     **GitHub** github.com/NBC-finalProject/CS25-BE (멀티모듈: service / batch / entity / common)
>
>

    ---


    ## 담당 역할


    6명 팀 프로젝트에서 **AI 도메인 전반**을 담당했습니다. 아래 트러블슈팅은 모두 제가 직접 설계·구현한 영역입니다.

    - AI 피드백 파이프라인 (Spring AI + RAG 기반 채점/피드백, SSE 실시간 스트리밍)
    - 비동기 처리 구조 (BlockingQueue → Redis Streams 전환, 워커 오토스케일링)
    - 외부 AI API 장애 대응 (OpenAI→Claude Fallback, Resilience4j Circuit Breaker/Retry)
    - 동적 문제 생성 (Chroma VectorDB + 외부 검색 MCP 결합)

    ---


    ## 트러블슈팅 1. AI 피드백 처리

        > 실제로 받은 질문: "OpenAI는 안정적인데 왜 굳이 큐를 뒀나?"  
        > 이 트러블슈팅은 그 답을 구조로 보여주기 위해 3단(동기→비동기 큐→Redis Streams)으로 구성했습니다.

        ### 1단계 — 동기 직접 호출의 문제


        AI 채점은 SSE로 결과를 스트리밍하는데, 요청 하나가 AI 응답까지 길게는 수 초씩 걸리는 **느린 I/O 작업**입니다. 처음엔 이 작업을 단일 서버의 인메모리 큐(BlockingQueue)에 적재해 처리했습니다.


        문제는 부하 테스트에서 드러났습니다. K6로 동시 사용자를 늘리자, 느린 AI 호출들이 한정된 처리 용량을 동시에 오래 점유하면서 큐가 길어졌고, 뒤따라온 요청이 줄줄이 타임아웃 났습니다. **500 VU 환경에서 실패율이 60%까지** 올라갔습니다.


        여기서 중요한 진단: **병목은 OpenAI가 아니라 우리 서버였습니다.** OpenAI는 안정적이고 요청도 잘 받았습니다. 문제는 "느린 응답을 기다리는 동안 우리 서버가 동시 요청을 못 버틴 것"입니다. 외부 API의 안정성과, 내 서버가 느린 I/O를 견디는 능력은 다른 레이어의 문제였습니다.


        ### 2단계 — 비동기 큐로 분리


        큐를 도입한 이유는 OpenAI 장애 대비가 아니라, **느린 외부 I/O를 사용자 요청 스레드에서 떼어내기** 위해서입니다. 사용자에겐 "접수됐다"를 즉시 응답(SSE 연결 유지)하고, 무거운 AI 호출은 뒤에서 워커가 자기 속도로 처리합니다. 들어오는 트래픽 속도와 처리 속도를 분리(decoupling)했습니다. 동시에, 매일 아침 문제 메일 발송 후 몰리는 순간 트래픽을 큐가 흡수하는 **부하 평탄화** 효과도 얻었습니다.


        ### 3단계 — Redis Streams  선택 이유


        인메모리 큐(BlockingQueue)로도 버퍼링은 됩니다. 그런데 세 가지 한계가 있었습니다.

        - **수평 확장**: 인메모리 큐는 서버 프로세스에 묶여 공유되지 않음 → Redis Streams는 Consumer Group으로 여러 워커가 한 큐를 분담
        - **중복 제거**: answerId 단위로 한 번만 처리

        **왜 Kafka가 아니라 Redis Streams였나** : 이미 인증·JWT 리프레시 토큰·캐싱에 Redis를 쓰고 있어 **추가 인프라 운영 부담이 없었습니다**, AI 피드백 큐 규모가 Kafka의 분산 로그·고내구성까지 요구하는 수준은 아니었고 Kafka는 러닝커브가 높은 편이었습니다. 필요한 기능(Consumer Group 병렬 처리, 메시지 보존, ACK)은 Redis Streams로 충분했습니다.


        ### 구현 디테일


        **중복 방지 + 실패 롤백**: enqueue 시 Redis Set으로 answerId 중복을 막고, 자정까지 TTL을 부여해 매일 초기화합니다. 그리고 Stream 적재가 실패하면 Set·emitter를 되돌리는 **롤백 처리**를 넣어, 중복 방지 상태와 실제 큐 상태가 어긋나지 않게 했습니다.


        ```java
        // 중복 방지 — Set add 결과로 판정, 실패 시 롤백 (AiFeedbackQueueService)
        Long added = redisTemplate.opsForSet().add(DEDUPLICATION_SET_KEY, String.valueOf(answerId));
        if (added == null || added == 0) {     // 이미 처리 중
            completeWithError(emitter, new IllegalStateException("이미 처리중인 요청입니다."));
            return;
        }
        // ... Stream 적재 ...
        // 실패 시 catch에서 Set/emitter 제거로 롤백
        ```


        ### 결과 (K6 부하 테스트, 리팩토링 전후 비교)


        | 지표      | BlockingQueue | Redis Streams | 개선    |
        | ------- | ------------- | ------------- | ----- |
        | 총 처리 요청 | 약 1,900건      | 약 26,000건     | 약 13배 |
        | 평균 응답시간 | 3,500 ms      | 200 ms        | 약 17배 |
        | 실패율     | 60%           | 4.5%          | 대폭 감소 |


    ---


    ## 트러블슈팅 2. Redis Stream 워커 오토스케일링 


        ### 문제


        Consumer 워커 수를 고정값으로 두면 두 방향 모두 손해였습니다. 너무 적으면 트래픽 몰릴 때 처리가 밀리고, 너무 많으면 한가할 때 idle 스레드가 CPU·메모리를 놀게 합니다. 모니터링(Grafana)에서 자원 대비 처리 효율이 낮은 구간이 관찰됐습니다.


        ### 해결책


        **큐에 쌓인 메시지 수를 기준으로 워커 수를 동적으로 조절**하기로 했습니다. 부하의 실제 신호(큐 길이)에 반응하게 한 거죠. `ScheduledExecutorService`로 5초마다 큐 크기를 확인해, `ThreadPoolExecutor`의 corePoolSize를 2~16개 범위에서 조절합니다.


        ```java
        // 큐 크기 기반 목표 워커 수 — 단계별 스케일링 (AiFeedbackStreamWorker)
        private int calculateTargetWorkerCount(long queueSize) {
            if (queueSize > 1000) return 16;
            else if (queueSize > 500) return 8;
            else if (queueSize > 100) return 4;
            else return CORE_WORKER;   // 2
        }
        ```


        핵심 디테일은 `allowCoreThreadTimeOut(true)`로 **core 스레드도 idle 시 종료**되게 한 점입니다. 보통 core 스레드는 안 죽는데, 이 설정으로 한가할 때 자원을 실제로 반납하게 했습니다. 워커는 자신의 인덱스가 현재 목표 수를 넘으면 스스로 종료해, 축소도 자연스럽게 동작


        ### 결과

        - CPU 사용률 약 50% 개선, 메모리 사용량 약 74% 절감 (Grafana 모니터링, 도입 전후 비교)
        - 트래픽 몰릴 땐 최대 16워커로 처리량 확보, 한가할 땐 2워커로 자원 반납

    ---


    ## 트러블슈팅 3. 외부 AI API 장애 대응 — Fallback + Circuit Breaker


        ### 문제


        AI 채점은 외부 LLM API에 전적으로 의존합니다. 이 API가 실패하거나 지연되면 서비스 전체가 불안정해지는 **단일 장애점(SPOF)**이었습니다. 초기 호출 실패 시 500 에러를 던지고 끝 대처 로직이 부재


        ### 해결책


        **① Fallback (공급자 다중화)**: 공통 인터페이스(`AiChatClient`)를 두고, OpenAI 1차 호출이 실패하면 Claude로 자동 폴백하는 `FallbackAiChatClient`를 `@Primary`로 구현했습니다. 한 공급자가 죽어도 다른 공급자로 무중단 처리됩니다.


        ```java
        // OpenAI 실패 시 Claude로 폴백 (FallbackAiChatClient)
        try {
            return openAiClient.call(systemPrompt, userPrompt);
        } catch (Exception e) {
            log.warn("OpenAI 호출 실패. Claude로 폴백합니다.", e);
            return claudeClient.call(systemPrompt, userPrompt);
        }
        ```


        **② Circuit Breaker + Retry (Resilience4j)**: 실제 LLM 호출 코드는 건드리지 않고 바깥에서 데코레이터로 감쌌습니다. 일시적 실패는 Retry가 흡수하고(지수 백오프), 지속적 장애는 Circuit Breaker가 차단해 빠른 실패로 우회한 뒤 일정 시간 후 자동 복구(Half-Open)합니다.


        ```java
        // 데코레이팅 순서: Retry를 먼저, 그 위에 CircuitBreaker (AiResilience)
        Supplier<T> withRetry = Retry.decorateSupplier(retry, supplier);
        Supplier<T> withCb = CircuitBreaker.decorateSupplier(cb, withRetry);
        return withCb.get();
        ```


        **Retry → CircuitBreaker 순서를 의도했습니다.** 이 순서면 일시적 오류는 Retry 단계에서 먼저 흡수되고, Retry로도 안 되는 진짜 지속적 장애만 CB의 실패 카운트에 반영. 일시적 깜빡임으로 서킷이 너무 쉽게 열리는 걸 막는 구성


        ### 결과

        - 한 AI 공급자 장애 시에도 다른 공급자로 무중단 피드백 처리
        - 지속 장애 시 빠른 실패로 우회 + 자동 복구로 외부 API SPOF 해소

    ---


    ## 링크

    - **서비스** [cs25.co.kr](http://cs25.co.kr/) (현재 배포 운영 중단, 사용자 100명+)
    - **GitHub** [github.com/NBC-finalProject/CS25-BE](http://github.com/NBC-finalProject/CS25-BE)
    - 시연 영상

    [video](https://www.youtube.com/watch?v=O9aF_nkTQK8&t=204s)



======================================================================
# 항해99 플러스 백엔드 10기
======================================================================


![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/4f329c9e-2f86-448f-8ec2-e4fc0227ca13/91d2c090-c7b0-49c6-b156-d9b38fca5052/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UGBH5ZNB%2F20260803%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260803T073651Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECgaCXVzLXdlc3QtMiJHMEUCIAGNhd6VLvtEv8pGmqYU9H1k0q6ESdtmaXD4ZgCz3iE8AiEAg%2FUyiREqeQK7Xyhx%2Bb%2B6JRzIEVAzqE1Xuhr62zdfhHYqiAQI8f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDA92DNaIY5hosEShaCrcA2%2FWnrFfPAKH5boEs4m%2Fada5cNAyYJHdCPS%2FnlVX6F7aKD5wEQLYAymS8qe1RFB1r%2FUXeNELrhzUHSP3tFb4nyvQII9MWKu0pxqewJ9FbP6QiWI8DHMo0Jinsqru0C9ldkmyHv7CRdmeQq%2BtCl4WCG6lKUsNuqJ%2B6PWN0MubnRR10SPAdX4BQsbPO4qQol7J9GqhIRp4OHkFnFvy3mkvfcj0MgqwL5cISb12cZFeK62ZCRrLZeFCVlMlV8p%2B661ET5j22K8BRCRgpoT49okzB013EPN32JMGdbT2k4IP%2BKFfPy1irO3cyta7X8M2VqvIHtZ2dRk0G7ox677SaIO14iwnitzzhj7AzHwsxFgTTAXxZlFXFL5VYrzQ2kb2%2FdQ9zchtXHs8aRYoLrzvmFXGz6x6xUfWKLA4fu3gzXeXzVDjKKi4pL%2FDbu1Eo0id9MxJy9bW5u70RI%2FTLMnSmO1tu1az7Jl2%2B%2BFrZUmZ2sJePjBKv8Iu2LidosDoqt1UlP0KJln1f1YCWaM8skfhE63IW4EKmOJDHKCOL4mTqirW%2F%2BjMdZJnnkfIFMngQfBCv1Txv%2Bfk6X8ZWlXR3juZ%2BRd0dh95xGmVNz4qpku3z8yDriKJ5TUCYa%2FBBCHkDRMWMJyIwdMGOqUBco%2BUY%2BdjgUXyaiAT%2FtK04kyVs6Lc3FPndWbTsN4RmiXKkQ8gqEeFlc8EdQAkUKXloMBV8a9PMTlFrQuJMicEF0SMcItiOGD1BzHmqP5nIXLwOk1U8Acn76cPKKDbYe9ra4UPOzhrwBDqp%2F1BR1RnSTfS8VsxT09q8NNgIoTtpH05eZ7ug2Ih2SEuJfPzDLB3FEeFXjO3EKTkaBByA3bPzs1tilLR&X-Amz-Signature=eef4ff43587f3ca1cb72f29269f239d004e8195a3b1694dc55db90a504203c50&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


# 이커머스 서버 (항해99 플러스 백엔드)

    > 현업 시나리오 기반 이커머스 서버 — 동시성 제어 · 이벤트 기반 메시징 · 쿼리 최적화
>
>     **기간** 2025.10 ~ 2025.12 · **진행** 개인 (단독 설계·구현)
>     **기술** Java 17, Spring Boot 3.4, JPA, Redis, Kafka, MySQL
>     **GitHub** [github.com/HeeMang-Lee/e-commerce-server](http://github.com/HeeMang-Lee/e-commerce-server)
>
>
>     선착순 쿠폰·재고처럼 **트래픽이 한 점에 몰리는 상황**에서 데이터 정합성을 어떻게 지키는가, 그리고 결제 이후 부가 작업(랭킹 집계·외부 전송)을 **어떻게 본 트랜잭션에서 떼어내 안정적으로 처리하는가**. 이 두 질문을 중심으로 동시성·메시징·쿼리 최적화를 직접 구현하고 비교하며 만든 서버입니다.
>
>

    ---


    ## 트러블슈팅 1. 선착순 쿠폰 발급 — DB 락 병목을 어떻게 걷어냈나


        ### 문제


        쿠폰 발급에 처음엔 DB 비관적 락을 사용. 단일 사용자 테스트는 정상, "선착순 100장"을 가정하고 동시 요청을 부하 테스트로 던지자 문제가 발생. 


        모든 요청이 쿠폰 한 행(row)의 락을 두고 줄을 서면서, 뒤 순번 사용자는 락 대기시간이 비현실적으로 길어졌습니다. 락 대기가 수십 분 단위까지 치솟는 걸 보고 "이건 DB 락으로 풀 문제가 아니다"라고 판단했습니다.


        ---


        ### 해결책


        원인은 **모든 동시 요청이 같은 자원(쿠폰 행) 하나에 직렬화**되는 것. 정합성 판단 자체를 DB 밖으로, 충돌 비용이 싼 곳으로 옮기기


        선택지를 두 단계로

        - **정합성 판정**은 Redis **Lua Script**로. `SISMEMBER`(중복 발급 확인) → `SCARD`(현재 발급 수량 확인) → `SADD`(발급 확정)를 하나의 원자적 연산으로 묶었습니다. Lua는 Redis에서 단일 스레드로 끝까지 실행되므로, 세 연산 사이에 다른 요청이 끼어들 수 없어 **race condition이 원천 차단**됩니다. "발급 가능 여부"라는 가장 빈번하고 충돌이 잦은 판단을 여기서 끝냅니다.
        - **DB 영속화**는 큐 + 배치로. 발급이 확정된 요청만 Redis List 큐에 넣고, 스케줄러가 5초마다 최대 100건씩 꺼내 쿠폰별로 묶어 `saveAll`로 한 번에 저장합니다. 사용자 응답은 큐에 넣는 순간 즉시 반환되고, 무거운 DB 쓰기는 뒤에서 모아 처리.

        ---


        ### 핵심 코드


        ```java
        // Lua Script — 원자적 발급 판정 (CouponRedisRepository)
        private static final String ISSUE_SCRIPT = """
                local issuedKey = KEYS[1]
                local userId = ARGV[1]
                local maxQuantity = tonumber(ARGV[2])
        
                if redis.call('SISMEMBER', issuedKey, userId) == 1 then
                    return 'ALREADY_ISSUED'
                end
                if redis.call('SCARD', issuedKey) >= maxQuantity then
                    return 'SOLD_OUT'
                end
                redis.call('SADD', issuedKey, userId)
                return 'SUCCESS'
                """;
        ```


        ```java
        // 배치 영속화 — 5초마다 큐에서 꺼내 쿠폰별 그룹핑 후 saveAll (CouponQueueProcessor)
        @Scheduled(fixedDelay = 5000)
        @Transactional
        public void processQueue() {
            List<String> queueItems = couponRedisRepository.popFromQueue(BATCH_SIZE); // 최대 100건
            // couponId로 그룹핑 → 이미 발급된 userId는 IN절 조회로 한 번에 걸러냄 → saveAll
        }
        ```


        ---


        ### 결과

        - 락 대기시간 **약 60분 → 0.15초** 수준으로 개선
        - 정합성 판정과 DB 영속화를 분리해 **응답 지연과 DB 부하를 동시에 해소**
        - 중복 발급은 Redis `SISMEMBER` 단계에서 1차 차단, 배치 저장 시 `findByCouponIdAndUserIdIn`으로 2차 확인 → **이중 방어**

    ---


    ## 트러블슈팅 2. 결제 후속 처리 — 같은 문제를 세 가지 메시징으로 풀어보고 Kafka를 택한 이유


        ### 문제


        결제가 완료되면 인기상품 랭킹 갱신, 외부 데이터 플랫폼 전송 같은 후속 작업이 따라붙습니다. 처음엔 이걸 결제 트랜잭션 안에서 같이 처리했는데, **후속 작업 하나가 느려지거나 실패하면 결제 전체가 영향을 받는** 구조였습니다. 결제라는 핵심 흐름이 부가 작업에 영향을 받음.


        ---


        ### 해결책


        "이벤트로 분리한다"는 방향은 정했지만, 어떤 메커니즘이 맞는지는 단정하지 않고 **세 가지를 직접 구현해 비교**. 발행 계층을 `DomainEventPublisher` 인터페이스로 추상화하고, 구현체를 프로파일로 갈아끼울 수 있게 설계.


        | 방식                    | 장점                 | 한계                              | 적합한 상황              |
        | --------------------- | ------------------ | ------------------------------- | ------------------- |
        | **Spring Event**      | 구현 단순, 인프라 불필요     | 같은 JVM 내 한정, 영속성 없음 → 서버 죽으면 유실 | 단일 서버, 가벼운 후속 처리    |
        | **Redis (Pub/Sub·큐)** | 빠름, 프로세스 분리        | 메시지 영속·재처리 보장이 약함               | 빠른 처리, 유실 일부 감수 가능  |
        | **Kafka**             | 영속성·순서보장·소비자 독립 확장 | 인프라 운영 부담                       | 정합성·내구성이 중요한 핵심 이벤트 |


        결제 완료 이벤트는 **유실되면 안 되고**, 소비자(랭킹·외부전송)가 서로 독립적으로 확장·실패할 수 있어야 했습니다. 그래서 핵심 이벤트는 Kafka로 결정했습니다.


        ---


        ### 구현 — 파티션 키 설계


        Kafka는 같은 키의 메시지를 같은 파티션으로 보내 **순서를 보장**합니다. 이걸 정합성 도구로 활용했습니다.

        - 결제 완료 이벤트 → **Key = orderId**: 같은 주문의 이벤트가 순서대로 처리됨
        - 쿠폰 발급 이벤트 → **Key = couponId**: 같은 쿠폰 요청이 한 파티션에서 순차 처리되어 수량 정합성 보장

        ```java
        // 결제 완료 이벤트 — orderId를 키로 발행해 주문 단위 순서 보장 (KafkaEventPublisher)
        private void publishPaymentCompletedEvent(PaymentCompletedEvent event) {
            String key = event.orderId().toString();
            kafkaTemplate.send(KafkaConfig.TOPIC_PAYMENT_COMPLETED, key, event)
                .whenComplete((result, ex) -> { /* 발행 성공/실패 로깅 */ });
        }
        ```


        ### 장애 복구 — DLT 재시도 스케줄러


        참고 링크 : 


        [video](https://youtu.be/xpwRTu47fqY?si=3yCooIgX3y-sbRaK)


        Kafka 소비 중 실패한 메시지는 DLT(Dead Letter Topic)로 보내고 DB에 적재한 뒤, 스케줄러가 **지수 백오프로 재시도**하도록 했습니다.

        - 10초마다 재시도 대상 점검
        - 지수 백오프: 30초 → 1분 → 2분 → 4분
        - **최대 3회 재시도 후 ABANDONED** 처리 (무한 재시도로 인한 리소스 낭비 방지)

        여기에 더해 발행 단계 유실을 막기 위해 **Outbox 패턴**(이벤트를 DB에 먼저 기록 → 별도 스케줄러가 발행)도 함께 적용해, 발행과 소비 양쪽에 안전장치를 뒀습니다.


        ### 직접 측정한 수치 — 비교를 추측이 아니라 데이터로

        > 측정 환경: Testcontainers (MySQL 8.0 / Redis 7.0 / Kafka 7.4.0), 로컬. 단일 Consumer · 단일 파티션 기준.

        **쿠폰 발급 — 동시 5000명 / 500개 한정**


        | 지표               | Redis 큐     | Kafka       |
        | ---------------- | ----------- | ----------- |
        | 전체 처리 시간         | 3,037 ms    | 14,237 ms   |
        | TPS              | 3,093 /sec  | 2,243 /sec  |
        | 평균 / P99 Latency | 57 / 278 ms | 85 / 547 ms |
        | 실제 DB 발급 수       | 500 ✅       | 500 ✅       |


        **결제 이벤트 — 순차 1000건**


        | 지표               | Spring Event | Kafka       |
        | ---------------- | ------------ | ----------- |
        | TPS              | 16.05 /sec   | 11.21 /sec  |
        | 동기 처리 시간         | 62.3 sec     | 89.2 sec    |
        | 평균 / P99 Latency | 20 / 69 ms   | 28 / 113 ms |


        ### 측정 결과— Kafka는 느렸지만, 그걸 알고도 택했다


        데이터는 명확했습니다. **속도만 보면 Redis·Spring Event가 모든 지표에서 앞섭니다.** Kafka는 처리량도 낮고 지연도 큽니다. 특히 Kafka의 DB 저장 단계가 5000명 시나리오에서 12초까지 걸렸는데, 이는 단일 Consumer·단일 파티션 환경에서 메시지가 순차 처리되며 쌓였기 때문입니다. (운영 환경에선 파티션 수와 Consumer 수를 늘려 병렬화하면 해소되는 부분입니다.)


        그럼에도 핵심 이벤트에 Kafka를 택한 이유는 **선택 기준이 속도가 아니었기 때문**입니다. 세 방식 모두 정합성(발급 수 = 한정 수량)은 지켰으므로, 정합성도 변별점이 아니었습니다. 결제 완료 이벤트처럼 **유실되면 안 되고, 후속 소비자가 독립적으로 확장·실패할 수 있어야 하는** 이벤트에는 다음이 더 중요했습니다.

        - **내구성**: 브로커가 메시지를 영속화 → Consumer가 죽어도 재처리 가능 (인메모리·Spring Event는 유실)
        - **소비자 독립 확장**: Consumer Group 추가만으로 후속 로직을 따로 확장
        - **DLT 재처리**: 실패 메시지를 분리해 운영 가시성 확보
        - **순서 보장**: 파티션 키 기반으로 주문·쿠폰 단위 순서 유지
        > **정리하면**: "Kafka는 응답이 약간 느리지만, 그 대가로 내구성·재처리·확장성을 얻는다." 빠른 처리만 필요한 가벼운 후속 작업이라면 Spring Event로 충분합니다. 측정을 통해 "무엇을 얻고 무엇을 포기하는지"를 수치로 확인하고 선택했다는 게 이 작업의 핵심입니다.

        ### 결과

        - 결제 핵심 흐름과 후속 작업을 분리해 **부가 작업 실패가 결제에 전파되지 않음**
        - 파티션 키 설계로 분산 환경에서도 **주문·쿠폰 단위 순서·정합성 유지**
        - DLT + Outbox 이중 안전장치로 **메시지 유실 없이 재처리 가능**

    ---


    ## 트러블슈팅 3. 주문 내역 조회 N+1 — 1,001번 쿼리를 2번으로


        ### 문제


        주문 내역 조회 API에서 주문 목록을 가져온 뒤 각 주문의 상품(OrderItem)을 조회하는데, **주문 N개마다 OrderItem 쿼리가 따로 나가는** 전형적인 N+1이 발생. 주문 1,000건이면 주문 조회 1번 + 상품 조회 1,000번 = **1,001번** 쿼리였습니다. Hibernate Statistics로 실제 쿼리 수를 찍어 확인.


        ### 해결책


        쿼리를 두 번으로 나누되 각각을 배치화하는 방식을 택했습니다.

        1. 주문 목록 조회 (1번)
        2. 주문 ID들을 모아 **IN절로 OrderItem 한 번에 조회** (1번)
        3. 메모리에서 `groupingBy(orderId)`로 묶어 매핑

        ```java
        // N+1 해결 — IN절 배치 조회 + 메모리 그룹핑 (OrderService)
        List<Long> orderIds = orders.stream().map(Order::getId).toList();
        List<OrderItem> allOrderItems = orderItemRepository.findByOrderIdIn(orderIds); // 쿼리 1번
        var orderItemsMap = allOrderItems.stream()
                .collect(Collectors.groupingBy(OrderItem::getOrderId));
        ```


        ### 결과

        - 쿼리 수 **1,001번 → 2번 (약 99.8% 감소)**
        - `Fetch Join`의 페이징 문제를 피하면서 N+1 해소
        - Hibernate Statistics 기반 테스트로 **쿼리 수를 회귀 검증** (재발 방지)

    ---


    ## 트러블슈팅 4. Redis 캐싱 — 인기상품 조회 부하 분산


        ### 요약


        자주 조회되지만 자주 바뀌지 않는 인기상품 목록에 **Look-Aside 캐싱**을 적용했습니다. `@Cacheable`로 조회 결과를 캐시하고, 주문 완료로 판매량이 바뀌면 해당 캐시를 무효화하는 전략입니다.

        - 캐시 히트율 **70.8%** _(이력서 기재 수치)_ → DB 직접 조회를 그만큼 줄임
        - 랭킹은 Redis 기반으로 별도 관리(ProductRankingService)하여 실시간 집계와 조회 부하를 분리

    ---

    - 참고 링크
        - N PLUS ONE PROBLEM RESOLUTION : [https://github.com/HeeMang-Lee/e-commerce-server/blob/main/docs/06_N_PLUS_ONE_PROBLEM_RESOLUTION.md](https://github.com/HeeMang-Lee/e-commerce-server/blob/main/docs/06_N_PLUS_ONE_PROBLEM_RESOLUTION.md)
        - KAFKA : [https://github.com/HeeMang-Lee/e-commerce-server/blob/main/docs/11_KAFKA_FUNDAMENTALS.md](https://github.com/HeeMang-Lee/e-commerce-server/blob/main/docs/11_KAFKA_FUNDAMENTALS.md), [https://github.com/HeeMang-Lee/e-commerce-server/blob/main/docs/12_KAFKA_MIGRATION_REPORT.md](https://github.com/HeeMang-Lee/e-commerce-server/blob/main/docs/12_KAFKA_MIGRATION_REPORT.md)
        - REDIS : [https://github.com/HeeMang-Lee/e-commerce-server/blob/main/docs/08_DISTRIBUTED_LOCK_AND_CACHING_REPORT.md](https://github.com/HeeMang-Lee/e-commerce-server/blob/main/docs/08_DISTRIBUTED_LOCK_AND_CACHING_REPORT.md), [https://github.com/HeeMang-Lee/e-commerce-server/blob/main/docs/09_REDIS_SYSTEM_DESIGN_REPORT.md](https://github.com/HeeMang-Lee/e-commerce-server/blob/main/docs/09_REDIS_SYSTEM_DESIGN_REPORT.md)
