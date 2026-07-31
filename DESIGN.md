---
name: 이희망 포트폴리오
description: 측정된 결과를 사양서처럼 읽히게 만든 백엔드 개발자 포트폴리오
colors:
  paper: "#FBFBFA"
  ink: "#16161A"
  ink-body: "#43434B"
  ink-meta: "#6E6E78"
  rule: "#E3E3E0"
  rule-strong: "#C9C9C4"
  accent: "#D14424"
  accent-hover: "#A83519"
  paper-dark: "#111112"
  ink-dark: "#F2F2F0"
  ink-body-dark: "#B4B4BC"
  ink-meta-dark: "#84848E"
  rule-dark: "#28282C"
  rule-strong-dark: "#3D3D43"
  accent-dark: "#FF6A45"
  accent-hover-dark: "#FF8A6B"
typography:
  display:
    fontFamily: "'IBM Plex Sans KR', 'Apple SD Gothic Neo', sans-serif"
    fontSize: "clamp(2.75rem, 7vw, 4.5rem)"
    fontWeight: 600
    lineHeight: 1.06
    letterSpacing: "-0.035em"
  heading:
    fontFamily: "'IBM Plex Sans KR', 'Apple SD Gothic Neo', sans-serif"
    fontSize: "clamp(1.5rem, 3vw, 2rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  lead:
    fontFamily: "'IBM Plex Sans KR', 'Apple SD Gothic Neo', sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "-0.01em"
  body:
    fontFamily: "'IBM Plex Sans KR', 'Apple SD Gothic Neo', sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: "-0.005em"
  small:
    fontFamily: "'IBM Plex Sans KR', 'Apple SD Gothic Neo', sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "var(--font-plex-mono), 'IBM Plex Mono', ui-monospace, monospace"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.08em"
  figure:
    fontFamily: "var(--font-plex-mono), 'IBM Plex Mono', ui-monospace, monospace"
    fontSize: "22px"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  figure-lg:
    fontFamily: "var(--font-plex-mono), 'IBM Plex Mono', ui-monospace, monospace"
    fontSize: "28px"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.02em"
rounded:
  base: "2px"
spacing:
  hairline: "1px"
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "32px"
  xl: "64px"
  section: "112px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.base}"
    padding: "12px 20px"
    typography: "{typography.label}"
  button-primary-hover:
    backgroundColor: "{colors.accent-hover}"
    textColor: "{colors.paper}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.base}"
    padding: "12px 20px"
    typography: "{typography.label}"
  figure-value:
    textColor: "{colors.ink}"
    typography: "{typography.figure}"
  figure-label:
    textColor: "{colors.ink-meta}"
    typography: "{typography.label}"
---

## Overview

이 사이트는 **사양서**처럼 읽힌다. 잘 조판된 기술 문서, 계측 리포트, 변경 이력. 마케팅 랜딩이 아니다.

근거: 이 포트폴리오의 핵심 주장은 "AI 산출물을 검수한다"이고, 그 증거는 전부 측정된 숫자다. 숫자를 카드에 담아 장식하면 주장이 약해진다. 괘선과 여백으로만 나눈 문서 조판이 숫자를 가장 신뢰하게 만든다.

세 개의 다이얼: **variance 6 / motion 4 / density 4.** 비대칭은 쓰되 기교로 가지 않고, 모션은 읽기를 방해하지 않으며, 밀도는 문서에 가깝다.

## Colors

한 개의 액센트만 쓴다. **버밀리언 `#D14424`.**

왜 이 색인가. 이 사이트의 서사는 "AI가 낸 결과에 빨간 펜을 대고 방향을 고친다"이다. 버밀리언은 교정 표시와 사양서 주석의 색이다. 이전에 쓰던 `#0064FF`는 토스의 브랜드 색이었고 본인의 색이 아니었다.

| 역할 | 라이트 | 다크 | 비고 |
|---|---|---|---|
| 배경 | `#FBFBFA` | `#111112` | 순백과 순검정을 쓰지 않는다 |
| 제목 | `#16161A` | `#F2F2F0` | |
| 본문 | `#43434B` | `#B4B4BC` | 대비 9.4:1 / 9.5:1 |
| 메타 | `#6E6E78` | `#84848E` | 대비 4.9:1 / 5.2:1, 라벨과 기간에만 |
| 괘선 | `#E3E3E0` | `#28282C` | 1px, 이 사이트의 유일한 구획 장치 |
| 액센트 | `#D14424` | `#FF6A45` | 대비 4.6:1 / 6.7:1 |

**액센트 사용 규칙.** 페이지 전체에서 액센트가 칠해지는 곳은 세 종류뿐이다. 개선된 수치의 도착값(`85%`, `0.15초`, `2회`), 본문 안의 외부 링크, 진행 중 상태 표시. 그 밖의 아이콘, 제목, 테두리, 태그에는 절대 쓰지 않는다. 액센트가 흔해지면 숫자가 안 보인다.

**금지.** 파랑과 보라 계열 전부. 그라데이션 배경. 네온 글로우. 색 있는 배경 위의 회색 본문.

## Typography

**IBM Plex Sans KR** + **IBM Plex Mono.**

왜 이 조합인가. Plex는 IBM이 기술 문서를 위해 만든 서체다. 사양서 세계관과 출신이 같다. Plex Sans KR은 한글 글립을 완전히 갖고 있어 한국어 본문의 품질이 유지되고, Plex Mono와 같은 가족이라 숫자와 라벨을 섞어도 조판이 흐트러지지 않는다.

**금지 서체.** Inter, Roboto, Geist, Pretendard, 시스템 기본 스택. 앞의 셋은 AI 산출물의 표식이고 Pretendard는 한국 웹의 기본값이라 개성이 남지 않는다.

**타입 램프는 여섯 단이 전부다.** 여기 없는 크기는 쓰지 않는다.

| 단 | 지정 | 쓰는 곳 |
|---|---|---|
| display | Sans 600 / `clamp(2.75rem, 7vw, 4.5rem)` / `-0.035em` / lh 1.06 | 히어로의 이름 |
| heading | Sans 600 / `clamp(1.5rem, 3vw, 2rem)` / `-0.02em` | 섹션 제목, 프로젝트 제목 |
| lead | Sans 400 / **18px** / lh 1.6 | 히어로 도입 문장 |
| body | Sans 400 / **15px** / lh 1.75 / 최대 `68ch` | 모든 본문 |
| small | Sans 400 / **13px** / lh 1.6 | 내비게이션, 부가 설명, 푸터 |
| label | **Mono** 500 / **11px** / `tracking 0.08em` | 라벨, 기간, 태그, 분류 |
| figure | **Mono** 400 / **22px** / `-0.02em` | 수치의 도착값 |
| figure-lg | **Mono** 400 / **28px** / `-0.02em` | 히어로 수치 |

### Mono는 한글에 절대 쓰지 않는다

이 규칙이 이 사이트에서 가장 자주 어겨지고 가장 눈에 띈다. **IBM Plex Mono에는 한글 글립이 없다.** `font-mono`를 한글에 걸면 두 가지가 동시에 망가진다. 한글만 시스템 폰트로 대체되어 본문과 다른 서체가 되고, 공백은 Mono의 고정폭이라 `측정된  결과`처럼 두 칸 띄운 것처럼 벌어진다.

- **Mono는 숫자와 라틴 문자 전용이다.** 수치, 기간, 기술 스택, 이메일 주소, 연도, `GitHub`.
- **한글이 한 글자라도 섞이면 Sans다.** 라벨이든 태그든 예외 없다.
- 한 줄에 기간과 한글 조직명이 같이 오면 `<span>`을 나눠서 기간만 Mono로 둔다.

### 라벨과 메타

| 역할 | 지정 | 쓰는 곳 |
|---|---|---|
| label | 11px / 0.02em / 500 | 열두 글자 이내의 짧은 표식. `상황`, `결과`, `자격증`, `진행중`, 태그 |
| label-mono | 11px / 0.08em / 500 / **Mono** | 라틴 전용 짧은 표식. `GitHub`, 연도 |
| meta | 13px / 0.02em | 훑어 읽는 문자열. 기간, 조직명, 기술 스택, 이메일 |

0.08em은 라틴 대문자 라벨에서만 제 역할을 한다. 한글은 자간이 벌어지면 어절 경계가 흐려져 읽는 속도가 떨어지므로 0.02em을 넘기지 않는다. 기술 스택을 11px 좁은 라벨로 두면 표식처럼 보이지만, 실제로는 채용 담당자가 제일 먼저 읽는 줄이라 13px meta로 둔다.

**모든 숫자는 Mono다.** 기간, 커버리지, 대기 시간, 쿼리 횟수, 연도. 예외 없다. 이게 이 사이트의 서명이다.

**강조는 같은 가족 안에서.** 굵기나 색으로 강조하고, 다른 서체를 끼워 넣지 않는다.

## Layout

- 콘텐츠 폭 `max-w-[1080px]`, 좌우 패딩 `24px`(모바일) / `40px`(데스크톱).
- 섹션 간격 `112px`(데스크톱) / `72px`(모바일). 이전의 `py-32` 균일 리듬은 폐기됐다.
- 본문 measure는 `68ch`를 넘지 않는다.
- **섹션마다 다른 레이아웃 계열을 쓴다.** 같은 계열이 두 번 나오면 템플릿으로 읽힌다.

| 섹션 | 계열 |
|---|---|
| 히어로 | 비대칭 2열. 좌측 이름과 문장, 우측 결과 사양표 |
| 소개 | 사진 슬롯 + 산문 2열 |
| AI 협업 | 좌측 거터에 기간, 우측에 원칙 제목과 3단 라벨 문단이 걸리는 세로 목록 |
| 프로젝트 | 전폭 행. 헤더 + 수치표 + 서술 |
| 기술 | 2열 정의 목록. 좌측 분류, 우측 나열 |

### 같은 사실은 한 곳에서만 말한다

섹션마다 담당이 다르다. 이 경계를 넘으면 같은 문장이 두 번 나온다.

- **히어로** 대표 수치 세 개. 요약이므로 아래와 겹치는 게 정상이다.
- **AI 협업** 방법. 어떤 기준을 세웠고 어떻게 다시 지시했는지. **수치를 다시 적지 않는다.**
- **프로젝트** 엔지니어링. 스택, 프로젝트별 수치, 기술적 판단. **AI 활용 방법을 다시 설명하지 않는다.**

원칙을 따로 모은 섹션은 두지 않는다. 타임라인 항목의 제목이 곧 원칙이다. 별도 섹션으로 빼면 같은 이야기의 요약본이 되어 읽는 사람이 두 번 읽게 된다.

**모바일.** 모든 2열은 768px 미만에서 단일 열로 접힌다. 좌측 거터의 기간은 항목 위로 올라간다.

## Elevation & Depth

**깊이가 없다.** 그림자, 카드, 떠 있는 표면을 쓰지 않는다.

이전 버전은 `rounded-2xl border bg-white` 카드가 15개 이상이었고 AI 협업 섹션은 카드 안에 카드가 들어 있었다. 전부 제거됐다.

위계는 세 가지로만 만든다. **1px 괘선**, **여백**, **타이포 굵기와 크기.** 배경색을 바꿔 영역을 구분하지 않는다. 유일한 예외는 진행 중 항목의 좌측 2px 액센트 세로선이다.

## Shapes

**반경은 2px 하나뿐이다.** 버튼, 사진 슬롯, 태그, 포커스 링 전부 동일하다.

알약(`rounded-full`)과 큰 반경(`rounded-2xl`)은 금지다. 사양서에 둥근 모서리는 없다. 2px는 완전한 직각의 날카로움만 덜어내는 값이다.

## Components

**괘선 구분 행.** 이 사이트의 기본 단위. 항목 사이에 `border-t` 하나만 둔다. 위아래 양쪽에 두지 않는다. 마지막 항목 아래에 닫는 선을 넣지 않는다.

**수치쌍.** `이전 → 이후` 형태. 이전 값은 메타 색, 화살표는 괘선 색, 이후 값은 액센트. 아래에 Mono 라벨. 이 컴포넌트가 히어로와 프로젝트 섹션의 주인공이다.

**라벨.** Mono 11px 대문자. 문단 위에 붙어 그 문단이 무엇인지 알린다(`상황`, `왜 AI를 썼나`, `결과`). 섹션 제목 위에 붙이는 장식용 eyebrow가 아니다. 페이지 전체에서 장식용 eyebrow는 쓰지 않는다.

**버튼.** 기본은 잉크색 채움 + 종이색 글자. 호버에서 액센트로 넘어간다. 유령 버튼은 1px 괘선 테두리. 라벨은 세 단어 이내이고 데스크톱에서 절대 두 줄로 넘어가지 않는다.

**포커스.** `outline: 2px solid accent; outline-offset: 2px`. 제거하지 않는다.

## Do's and Don'ts

**한다**

- 숫자는 Mono로. 예외 없이.
- 구획은 1px 괘선과 여백으로.
- 본문은 `#43434B` / `#B4B4BC`. 대비를 확보한 색이다.
- 모션은 opacity와 8px 이내의 translate만. `prefers-reduced-motion`에서 즉시 정지.
- 섹션마다 다른 레이아웃 계열.

**하지 않는다**

- 카드. `rounded-2xl border bg-white` 블록을 다시 만들지 않는다. 카드 안의 카드는 더더욱.
- 알약 배지. 특히 히어로 제목 위의 `rounded-full` 라벨.
- 이모지를 아이콘 자리에 쓰기.
- 튕기는 모션, 무한 반복 모션, 스크롤 유도 화살표.
- 파랑·보라 그라데이션. `#0064FF`. Inter / Roboto / Geist / Pretendard.
- 섹션 번호 eyebrow(`01 / INDEX`), 가운뎃점 나열, 버전 라벨, 지역·시각 스트립.
- 줄표(`—`, `–`). 하이픈만 쓴다.
- 3등분 카드 그리드.
- 없는 수치를 그럴듯하게 만들기. PRODUCT.md의 실측값만 쓴다.
