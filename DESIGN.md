---
name: 이희망 포트폴리오
description: Eladio Dieste의 벽돌 곡면에서 온 어두운 단일체 편집 조판. 스크롤이 시간을 밀어내는 포트폴리오
colors:
  bg: "#0A0A0A"
  bg-elev: "#111111"
  text: "#EDEAE4"
  text-dim: "#8A867E"
  line: "#2A2A28"
  accent: "#CC5330"
typography:
  display-xl:
    fontFamily: "'Young Serif', 'Noto Serif KR', serif"
    fontSize: "clamp(72px, 14vw, 200px)"
    fontWeight: 400
    lineHeight: 0.92
    letterSpacing: "-0.02em"
  display-l:
    fontFamily: "'Young Serif', 'Noto Serif KR', serif"
    fontSize: "clamp(40px, 5vw, 72px)"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.015em"
  display-ko:
    fontFamily: "'Noto Serif KR', serif"
    fontSize: "clamp(28px, 3.6vw, 52px)"
    fontWeight: 400
    lineHeight: 1.35
    letterSpacing: "-0.02em"
  heading:
    fontFamily: "'IBM Plex Sans KR', 'Apple SD Gothic Neo', sans-serif"
    fontSize: "clamp(24px, 2.6vw, 32px)"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  body:
    fontFamily: "'IBM Plex Sans KR', 'Apple SD Gothic Neo', sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "-0.005em"
  caption:
    fontFamily: "'IBM Plex Sans KR', 'Apple SD Gothic Neo', sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0.02em"
  mono:
    fontFamily: "var(--font-plex-mono), 'IBM Plex Mono', ui-monospace, monospace"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.06em"
rounded:
  base: "0"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  xxl: "64px"
  section: "120px"
  section-lg: "200px"
components:
  work-row:
    backgroundColor: "transparent"
    borderColor: "{colors.line}"
    rounded: "{rounded.base}"
    textColor: "{colors.text}"
    typography: "{typography.display-l}"
  work-row-hover:
    textColor: "{colors.accent}"
  meta-label:
    textColor: "{colors.text-dim}"
    typography: "{typography.mono}"
  link-inline:
    textColor: "{colors.text}"
    typography: "{typography.body}"
  link-inline-hover:
    textColor: "{colors.accent}"
---

## Overview

**Eladio Dieste의 벽돌 곡면.** 무겁고 단일한 재료 하나가 곡선으로 하중을 견디는 구조. 그 인상을 웹으로 옮긴다.

이 사이트는 어두운 단일체다. 배경 하나, 괘선 하나, 액센트 하나. 표면을 나누지 않고 **하나의 연속된 재료 위에 조판**한다. 화면이 바뀌는 게 아니라 같은 벽이 계속 이어진다.

세 개의 다이얼: **variance 7 / motion 7 / density 3.** 레이아웃은 과감하게 비대칭이고, 모션은 스크롤과 한 몸이며, 밀도는 낮다 - 여백이 재료의 무게를 만든다.

**이전 버전(밝은 사양서 조판)은 폐기됐다.** 라이트 모드가 없다. 테마 토글도 없다. 단일 재료라는 전제와 충돌하기 때문이다.

## Colors

| 역할 | 값 | 규칙 |
|---|---|---|
| 배경 | `#0A0A0A` | 순흑이 아니다. 페이지 전체에서 이 색 하나 |
| 융기 | `#111111` | 이미지 자리와 스크럽 트랙 바닥에만 |
| 글자 | `#EDEAE4` | 순백이 아니다. 따뜻한 회백 |
| 흐린 글자 | `#8A867E` | 대비 5.46:1. 메타와 캡션 전용 |
| 괘선 | `#2A2A28` | 1px. 유일한 구획 장치 |
| 액센트 | `#CC5330` | 대비 4.57:1. 아래 네 곳 밖에서는 쓰지 않는다 |

**액센트는 네 곳에만 칠한다.**

1. 링크와 작업 행의 **호버**
2. 타임라인의 **연도 카운터**
3. **화살표 글리프** (`↓` `→`)
4. **커서 팔로워**

제목, 아이콘, 테두리, 태그, 배지에는 절대 쓰지 않는다. 액센트는 지금 손이 닿아 있는 곳을 가리키는 신호이지 장식이 아니다.

원안의 `#C4502E` 는 대비가 4.27:1 이라 13px 캡션에서 WCAG AA(4.5:1)에 못 미쳤다.
색상(hue 13.6)과 채도는 그대로 두고 명도만 2% 올려 4.57:1 로 맞춘 값이 `#CC5330` 이다.
액센트가 닿는 자리가 전부 13px 캡션이라 큰 글자 예외(3:1)를 쓸 수 없었다.

**금지.** 파랑, 보라 계열 전부. 그라데이션. 글로우. 배경색으로 영역 구분하기. 두 번째 액센트 색.

## Typography

세 서체가 각자 하나의 일만 한다. **모두 자체 호스팅한다** (OFL 라이선스).

| 서체 | 라이선스 | 담당 |
|---|---|---|
| **Young Serif** | OFL | 영문 디스플레이. 대형 사이즈에서만 |
| **Noto Serif KR** | OFL | 한글 디스플레이. Young Serif와 짝 |
| **IBM Plex Sans KR** | OFL | 본문, 제목, 캡션 전부 |
| **IBM Plex Mono** | OFL | 라틴/숫자 메타 전용 |

**왜 Young Serif인가.** Playfair, Instrument, Fraunces는 지금 웹에서 상위 빈도라 즉시 "요즘 템플릿"으로 읽힌다. Young Serif는 슬랩에 가까운 두꺼운 세리프에 낮은 대비를 가져서, 200px로 키우면 글자가 얇아지지 않고 **덩어리로 남는다.** 벽돌이라는 전제와 맞는 유일한 성질이다.

**한글 디스플레이는 Noto Serif KR.** 한글이 디스플레이 크기로 나오는 자리에서 Sans를 쓰면 영문 세리프와 짝이 안 맞는다. 400 한 굵기만 받는다 - 디스플레이에서 굵기 대비를 만들 이유가 없고, 청크 124개가 이미 무겁다.

### 타입 스케일은 다섯 단이 전부다

| 단 | 지정 | 쓰는 곳 |
|---|---|---|
| display-xl | Young Serif / `clamp(72px, 14vw, 200px)` / lh 0.92 | 히어로 이름 |
| display-l | Young Serif / `clamp(40px, 5vw, 72px)` / lh 1.02 | 작업 제목, 이메일 |
| display-m | Young Serif / `clamp(32px, 3.6vw, 52px)` / lh 1.05 | 좁은 열의 작업 제목 |
| display-ko | Noto Serif KR / `clamp(28px, 3.6vw, 52px)` / lh 1.35 | 한글 디스플레이 |
| heading | Plex Sans 500 / `clamp(24px, 2.6vw, 32px)` | 문단 제목, 수치 도착값 |
| body | Plex Sans 400 / **17px** / lh 1.7 / 최대 `34em` | 모든 본문 |
| caption | Plex Sans 400 / **13px** | 메타, 각주, 수치 출발값 |

여기 없는 크기는 쓰지 않는다. 본문 measure는 `34em`을 넘지 않는다 - 낮은 밀도를 유지하려면 줄이 짧아야 한다.

**한글 디스플레이는 영문보다 작은 단을 쓴다.** 한글 글립은 전각이라 같은 px 에서 라틴보다 훨씬 넓게 나간다. `display-l`(72px)을 한글에 그대로 걸면 한 줄이 열 폭을 넘겨 아무 데서나 접힌다. 행간도 1.02가 아니라 1.35다 - 받침이 있는 글자와 없는 글자가 섞이면 1.0 근처에서 줄이 서로 닿는다.

### Mono는 한글에 절대 쓰지 않는다

**IBM Plex Mono에는 한글 글립이 없다.** `font-mono`를 한글에 걸면 두 가지가 동시에 망가진다. 한글만 시스템 폰트로 대체되어 본문과 다른 서체가 되고, 공백은 Mono의 고정폭이라 `측정된  결과`처럼 두 칸 띄운 것처럼 벌어진다.

- **Mono는 숫자와 라틴 문자 전용.** 연도, 인덱스(`01`), 기술 스택, 이메일.
- **한글이 한 글자라도 섞이면 Plex Sans다.** 예외 없다.
- 숫자에 한글 단위가 붙으면(`0.15초`) 숫자만 `<span>`으로 떼어 Mono로 둔다.
- 날짜는 `2025년 5월` 대신 `2025.05` - 숫자만 남아 해결된다.

## Layout

- 12열 그리드. 좌우 패딩 `24px`(모바일) / `64px`(데스크톱).
- **섹션 세로 간격 `120px` 이상.** 히어로 다음은 `200px`.
- 스페이싱은 `4 / 8 / 16 / 24 / 40 / 64 / 120 / 200` 여덟 값이 전부다. Tailwind 기본 스케일을 확장이 아니라 **교체**해서 이 밖의 값은 아예 쓸 수 없게 잠갔다.
- **섹션마다 다른 레이아웃 계열.** 같은 계열이 두 번 나오면 템플릿으로 읽힌다.

| 섹션 | 계열 |
|---|---|
| 히어로 | 전폭 디스플레이. 좌하단에 메타 한 줄 |
| 소개 | 3열 오프셋. 좌측 라벨, 우측 본문이 5열부터 시작 |
| 작업 | **핀 고정 가로 스크럽.** 아래 참조 |
| 역량 | 2열 정의 목록 |
| 연락 | 전폭 디스플레이 링크 |

### 작업 섹션 - 핀 고정 가로 스크럽

이 사이트의 중심이다. 섹션이 뷰포트에 고정(pin)된 상태에서 **세로 스크롤이 가로 이동으로 번역**된다. 시간이 왼쪽에서 오른쪽으로 밀려간다.

**이동과 체류를 번갈아 둔다.** 판이 화면 가운데로 들어오면 거기서 멈춰 서고(체류), 그 동안 스크롤이 그 프로젝트의 트러블슈팅을 위로 흘려보낸다. 다 흐르면 다음 판으로 넘어간다(이동). 이동 `0.8`, 체류 `2.2` 단위이고 1단위는 `0.7vh` 다.

균일한 선형 스크럽으로 두지 않는 이유: 판이 계속 움직이면 글을 읽을 수 없다. 읽을 시간을 주려면 멈춰야 하고, 멈춘 동안에도 스크롤이 무언가를 해야 한다.

- **판 하나가 `100vw`.** 왼쪽 끝 정렬이 곧 화면 가운데 정렬이라 위치 계산이 단순해지고, 사진을 크게 놓을 자리가 생긴다.
- **사진은 화면 중앙과의 거리로 크기가 정해진다.** 정중앙에서 `1.0`, 화면 하나만큼 떨어지면 `0.84`. 판 전체 불투명도도 `1.0`에서 `0.25` 로 함께 떨어진다. 타임라인에 넣지 않고 매 프레임 거리로 계산한다 - 구조가 바뀌어도 알아서 맞는다.
- 트랙은 여는 판 + 프로젝트 3건.
- 좌상단 **시점 카운터**가 스크럽 진행도에 물려 `2025.05 → 2025.11`로 바뀐다. 액센트.
  연도만 찍지 않는 이유: 작업 3건이 전부 2025년이라 연도로는 숫자가 움직이지 않는다.
  움직이는 숫자를 만들려고 없는 연도를 지어내지 않는다.
- 하단에 진행 막대 1px.
- **모바일(<768px)에서는 핀을 걸지 않는다.** 세로 목록으로 접힌다. 터치 기기에서 핀+가로 스크럽은 스크롤을 뺏는 것처럼 느껴진다.

## Motion

**모션 스택은 GSAP + ScrollTrigger + Lenis로 통일한다.** `scroll` 이벤트를 직접 리스닝하지 않는다.

이유: Lenis가 스크롤 위치를 자체 루프에서 보간하므로, 네이티브 `scroll` 이벤트로 읽은 값은 실제 렌더 위치와 한 프레임 이상 어긋난다. 두 개의 스크롤 진실이 생기면 핀과 스크럽이 미끄러진다. ScrollTrigger에 Lenis를 물려 **하나의 진실**만 둔다.

| 모션 | 지정 |
|---|---|
| 슬라이스 리빌 | `clip-path: inset(0 0 100% 0)` → `inset(0)`, 1.1s, `expo.out` |
| 줄 마스크 | `overflow:hidden` 래퍼 + `y: 110% → 0`, 0.9s, stagger 0.08 |
| 스크럽 | `scrub: 1` (1초 지연 추종). `scrub: true`는 너무 딱딱하다 |
| 커서 | `quickTo` 로 0.4s 추종. 링크 위에서 확대 |

**초기 상태는 CSS로 잡는다** (`.pre-reveal`, `.pre-slice`, `.pre-line`). JS로만 잡으면 하이드레이션 전에 한 번 번쩍인다.

`prefers-reduced-motion: reduce`에서 **초기 상태 클래스까지 함께 푼다.** 트랜지션만 끄면 화면이 빈 채로 남는다. 가로 스크럽은 세로 목록으로 대체한다.

## Elevation & Depth

**깊이가 없다.** 그림자, 카드, 떠 있는 표면, 블러 배경을 쓰지 않는다.

**예외 하나.** 상세가 흐르는 창의 위아래 끝에 `mask-image` 페이드를 건다. 글이 창 경계에서 한 줄 중간에 잘려 나가는 걸 막는 기능이지 표면을 칠하는 그라데이션이 아니다. 배경색은 여전히 `--bg` 하나다.

위계는 세 가지로만 만든다. **1px 괘선**, **여백**, **타입 크기.** `--bg-elev`는 이미지 자리의 빈 바닥을 채우는 용도이지 표면을 띄우는 용도가 아니다.

## Shapes

**반경은 0이다.** 벽돌에 둥근 모서리는 없다.

Tailwind의 `borderRadius`를 교체해서 `rounded-*` 유틸이 전부 `0`을 내도록 잠갔다. 유일한 예외는 커서 팔로워의 `rounded-full` - 원이어야 하는 단 하나의 요소다.

## Do's and Don'ts

**한다**

- 배경 하나, 괘선 하나, 액센트 하나로 끝낸다.
- 큰 타이포와 큰 여백으로 무게를 만든다.
- 스크롤 진실은 Lenis 하나. ScrollTrigger에 물린다.
- 숫자와 라틴은 Mono, 한글은 Plex Sans.
- 모바일에서 핀을 풀고 세로로 접는다.

**하지 않는다**

- 라이트 모드, 테마 토글. 단일 재료라는 전제와 충돌한다.
- 카드, 그림자, 알약 배지, 3등분 카드 그리드.
- `scroll` 이벤트 직접 리스닝. `window.scrollY` 읽기.
- 액센트를 제목이나 테두리에 칠하기.
- 이모지를 아이콘 자리에 쓰기.
- 줄표(`-`, `–`). 하이픈만 쓴다.
- 섹션 번호 eyebrow, 가운뎃점 나열, 스크롤 유도 화살표의 무한 반복.
- 없는 수치를 그럴듯하게 만들기. PRODUCT.md의 실측값만 쓴다.
- **회사 내부 시스템(MES, 탄소배출 등)의 화면 구성이나 프로세스를 싣기.** 보안 문제다. 필요하면 "제조 MES 도메인 경험" 한 줄까지만.
