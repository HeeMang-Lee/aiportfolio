# 이희망 포트폴리오

백엔드 엔지니어 이희망의 개인 포트폴리오. 단일 페이지, 한국어, Next.js 14 App Router, Vercel 배포.

**Eladio Dieste의 벽돌 곡면**에서 온 어두운 단일체 편집 조판입니다. 작업 섹션은 뷰포트에 고정된 채 세로 스크롤이 가로 이동으로 번역되는 핀 고정 스크럽입니다.

템플릿을 쓰지 않았습니다. 디자인 기준은 [DESIGN.md](./DESIGN.md), 제품 기준은 [PRODUCT.md](./PRODUCT.md)에 있고, 화면을 만들 때마다 이 둘을 먼저 읽습니다.

## 이 사이트가 하는 일

방문자는 국내 백엔드 채용 담당자와 팀 리드입니다. 대개 이력서를 먼저 보고 링크를 타고 들어와, **2분 안에 면접을 볼지 판단**합니다.

그래서 페이지를 닫을 때 세 가지가 남게 설계했습니다.

1. 문제를 계측으로 먼저 확인하고 구조를 바꾼 뒤 같은 방법으로 다시 잰다
2. 그 결과가 숫자로 있다 (처리량 1,900건 → 26,000건, 락 대기 60분 → 0.15초, N+1 1,001회 → 2회)
3. 연락처를 어디서 찾는지 안다

## 구조

```
app/
  layout.tsx            서체 4종, 메타데이터, 모션 부트스트랩
  page.tsx              섹션 조립
  globals.css           디자인 토큰 (다크 단일)
  fonts/plex-kr.css     본문 한글 @font-face 188개
  fonts/noto-serif-kr.css  한글 디스플레이 @font-face 124개
  fonts/young-serif.css    영문 디스플레이 @font-face 2개

content/
  works.ts              작업 3건. 수치의 정본

components/
  SmoothScroll.tsx      Lenis + ScrollTrigger 연결. 스크롤 진실 하나
  Cursor.tsx            커서 팔로워
  Navigation.tsx        상단 내비게이션
  Hero.tsx              이름 슬라이스 리빌
  Works.tsx             이동/체류 가로 스크럽. 이 사이트의 중심
  About.tsx             3열 오프셋 소개
  Skills.tsx            2열 정의 목록
  Contact.tsx           이메일 복사 + 외부 링크
  Reveal.tsx            진입 모션 하나로 통일
```

## 디자인 기준 요약

전문은 [DESIGN.md](./DESIGN.md)에 있습니다. 자주 어기게 되는 것만 옮깁니다.

| 항목 | 규칙 |
|---|---|
| 세계관 | 어두운 단일체. 배경 하나, 괘선 하나, 액센트 하나 |
| 테마 | **다크 단일.** 라이트 모드와 토글 없음 |
| 서체 | Young Serif(영문 디스플레이) + Noto Serif KR(한글 디스플레이) + IBM Plex Sans KR(본문) + IBM Plex Mono(숫자·라틴) |
| 액센트 | `#CC5330` 하나. 호버, 시점 카운터, 화살표, 커서에만 |
| 반경 | **0.** `rounded-*` 유틸을 전부 0으로 잠가 둠 |
| 스페이싱 | `4 / 8 / 16 / 24 / 40 / 64 / 120 / 200` 여덟 값. Tailwind 기본 스케일을 교체 |
| 모션 | GSAP + ScrollTrigger + Lenis. **`scroll` 이벤트 직접 리스닝 금지** |
| 깊이 | 없음. 그림자와 카드 금지 |

### Mono는 한글에 쓰지 않습니다

IBM Plex Mono에 한글 글립이 없습니다. 한글에 `font-mono`를 걸면 **한글만 시스템 폰트로 대체되고, 공백이 고정폭이라 `측정된  결과`처럼 벌어집니다.**

Mono는 숫자, 기간, 기술 스택, 이메일처럼 라틴과 숫자에만 씁니다. `0.15초` 같은 값은 `Value` 컴포넌트가 숫자와 단위를 나눠 조판합니다.

### 액센트는 네 곳에만

링크와 작업 행의 **호버**, 타임라인 **시점 카운터**, **화살표 글리프**, **커서 팔로워**. 이 넷뿐입니다. 제목이나 테두리에 칠하면 액센트가 신호가 아니라 장식이 됩니다.

원안의 `#C4502E` 는 대비가 4.27:1 이라 13px 캡션에서 WCAG AA(4.5:1)에 못 미쳤습니다. 색상과 채도는 그대로 두고 명도만 2% 올려 4.57:1 로 맞춘 값이 `#CC5330` 입니다.

### 스크롤 진실은 하나

Lenis가 스크롤 위치를 자체 루프에서 보간하므로, 네이티브 `scroll` 이벤트로 읽은 값은 실제 렌더 위치와 어긋납니다. 두 개의 진실이 생기면 핀과 스크럽이 미끄러집니다. `SmoothScroll.tsx` 가 Lenis를 `gsap.ticker` 에 물리고 `ScrollTrigger.update` 를 Lenis의 scroll 이벤트에 연결합니다.

가로 스크럽은 **모바일(<768px)과 `prefers-reduced-motion`에서 핀을 걸지 않고** 세로 목록으로 접힙니다.

### 작업 섹션은 이동과 체류를 번갈아 둡니다

판이 화면 가운데로 들어오면 거기서 멈춰 서고(체류), 그 동안 스크롤이 그 프로젝트의 트러블슈팅을 위로 흘려보냅니다. 다 흐르면 다음 판으로 넘어갑니다(이동).

균일한 선형 스크럽으로 두지 않는 이유는 단순합니다. **판이 계속 움직이면 글을 읽을 수 없습니다.** 읽을 시간을 주려면 멈춰야 하고, 멈춘 동안에도 스크롤이 무언가를 해야 합니다.

- 판 하나가 `100vw`. 왼쪽 끝 정렬이 곧 화면 가운데 정렬이라 위치 계산이 단순해지고 사진을 크게 놓을 자리가 생깁니다.
- **사진 크기는 타임라인이 아니라 화면 중앙과의 거리가 정합니다.** 정중앙에서 `1.0`, 화면 하나만큼 떨어지면 `0.84`. 매 프레임 `getBoundingClientRect` 로 재고 `quickSetter` 로 씁니다. 타임라인에 넣으면 이동 구간마다 트윈을 따로 잡아야 하는데 거리로 계산하면 구조가 바뀌어도 알아서 맞습니다.
- 상세가 흐르는 창은 이동 거리를 **함수로** 넘깁니다. 내용 길이가 달라져도 같은 스크롤 구간 안에 다 흐릅니다.

## 한글 웹폰트를 직접 호스팅하는 이유

`next/font/google`이 쓰는 css2 엔드포인트는 **IBM Plex Sans KR을 한글 글립 없이 내려줍니다.** 그대로 두면 본문 한글이 전부 시스템 폰트로 나옵니다.

그래서 css1의 한글 서브셋 청크를 `public/fonts/` 아래에 넣고 `app/fonts/*.css`에서 unicode-range로 선언합니다. 본문 IBM Plex Sans KR이 188개, 한글 디스플레이 Noto Serif KR이 124개입니다. 합치면 무겁지만 **브라우저는 실제로 쓰는 청크만 내려받습니다.**

영문 디스플레이 Young Serif도 같은 방식으로 자체 호스팅합니다(청크 2개, 32KB). 네 서체 모두 OFL 라이선스입니다.

폰트를 바꾸려면 CSS 파일과 `public/fonts/` 를 함께 바꿔야 합니다.

## 로컬 실행

```bash
npm install
npm run dev
```

환경변수는 필수가 아닙니다. `NEXT_PUBLIC_SITE_URL`을 넣으면 OG 태그의 절대 경로에 쓰입니다.

## 배포

Vercel에 GitHub 연동으로 배포됩니다. `main`에 push하면 자동입니다.

**팀 계정에 Deployment Protection이 걸려 있어 `*-projects.vercel.app` 주소는 로그인해야 열립니다.** 외부에 공개하려면 Vercel 프로젝트 설정에서 보호를 끄거나, 보호 밖의 별칭 주소를 쓰면 됩니다.

## 검사

디자인 기준을 지켰는지 기계로 확인합니다.

```bash
npx impeccable detect app components content
```

조용히 끝나면 통과입니다. 렌더된 화면까지 보려면 puppeteer가 필요합니다.

```bash
npm i -D puppeteer
npm run build && npm start
npx impeccable detect http://localhost:3000
```

## 알아둘 것

**`og-image.png`는 이전 디자인 기준입니다.** 링크를 공유하면 썸네일만 옛날 모습으로 나옵니다. 바꾸려면 `public/og-image.png`를 교체하면 됩니다.

**회사 내부 시스템(MES, 탄소배출)은 싣지 않습니다.** 사내 화면 구성과 프로세스가 공개 사이트로 나가는 보안 문제입니다. `PRODUCT.md` 의 "하지 않을 것" 절에 적어 뒀습니다.

**`next build` 를 `next dev` 가 도는 중에 돌리지 마세요.** 같은 `.next` 를 덮어써서 개발 서버의 CSS가 통째로 사라집니다. 그렇게 됐으면 `rm -rf .next` 후 `npm run dev` 로 되살립니다.

**이 폴더가 동기화 폴더 안에 있으면 `node_modules`가 깨질 수 있습니다.** `package-lock 2.json` 같은 중복 파일이 생기고 일부 `package.json`이 잘려 `next dev`가 뜨지 않습니다. 그럴 때는 이렇게 복구합니다.

```bash
rm -rf node_modules && npm ci
```

## 관련 저장소

| 저장소 | 내용 |
|---|---|
| [aiblog-frontend](https://github.com/HeeMang-Lee/aiblog-frontend) | 기술 블로그. 노션을 CMS로 쓰는 에디터 UI |
| [aiblog-backend](https://github.com/HeeMang-Lee/aiblog-backend) | Spring Boot 블로그 API. 블로그가 노션 기반으로 바뀌어 현재는 쉬는 중 |

## 스크립트

```bash
npm run dev     # 개발 서버
npm run build   # 프로덕션 빌드
npm run start   # 빌드 결과 실행
npm run lint    # ESLint
```
