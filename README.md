# 이희망 포트폴리오

AI와 협업하는 백엔드 개발자 이희망의 개인 포트폴리오. 단일 페이지, 한국어, Next.js 14 App Router, Vercel 배포.

템플릿을 쓰지 않았습니다. 디자인 기준은 [DESIGN.md](./DESIGN.md), 제품 기준은 [PRODUCT.md](./PRODUCT.md)에 있고, 화면을 만들 때마다 이 둘을 먼저 읽습니다.

## 이 사이트가 하는 일

방문자는 국내 백엔드 채용 담당자와 팀 리드입니다. 대개 이력서를 먼저 보고 링크를 타고 들어와, **2분 안에 면접을 볼지 판단**합니다.

그래서 페이지를 닫을 때 세 가지가 남게 설계했습니다.

1. 이 사람은 AI에게 위임하되 산출물을 검수하고 방향을 수정한다
2. 그 방식으로 낸 결과가 숫자로 있다 (커버리지 0% → 85%, 락 대기 60분 → 0.15초, N+1 1,001회 → 2회)
3. 연락처를 어디서 찾는지 안다

## 구조

```
app/
  layout.tsx          폰트, 메타데이터, 테마 프로바이더
  page.tsx            섹션 조립
  globals.css         디자인 토큰 (라이트/다크)
  fonts/plex-kr.css   한글 웹폰트 @font-face 188개

components/
  Navigation.tsx      상단 내비게이션
  Hero.tsx            이름 + 측정된 결과 사양표
  About.tsx           소개 + 자격증
  AIExperience.tsx    AI 협업 타임라인 (원칙이 곧 제목)
  Projects.tsx        프로젝트별 수치와 서술
  Skills.tsx          기술 분류
  Footer.tsx
  Figure.tsx          before -> after 수치쌍
  Value.tsx           숫자와 단위를 분리해 조판
  Reveal.tsx          8px 등장 모션
```

## 디자인 기준 요약

전문은 [DESIGN.md](./DESIGN.md)에 있습니다. 자주 어기게 되는 것만 옮깁니다.

| 항목 | 규칙 |
|---|---|
| 세계관 | 사양서. 카드가 아니라 1px 괘선과 여백으로 구획 |
| 서체 | IBM Plex Sans KR + IBM Plex Mono. **Geist·Inter·Pretendard 금지** |
| 액센트 | 버밀리언 `#D14424` / 다크 `#FF6A45` 하나 |
| 반경 | 2px 하나. `rounded-2xl`까지 2px로 잠가 둠 |
| 깊이 | 없음. 그림자와 카드 금지 |

### Mono는 한글에 쓰지 않습니다

IBM Plex Mono에 한글 글립이 없습니다. 한글에 `font-mono`를 걸면 **한글만 시스템 폰트로 대체되고, 공백이 고정폭이라 `측정된  결과`처럼 벌어집니다.**

Mono는 숫자, 기간, 기술 스택, 이메일처럼 라틴과 숫자에만 씁니다. `0.15초` 같은 값은 `Value` 컴포넌트가 숫자와 단위를 나눠 조판합니다.

### 액센트는 도착값에만

개선된 수치의 **도착값**(`85%`, `0.15초`, `2회`), 본문 링크, 진행중 표시. 이 셋뿐입니다. 아이콘이나 제목에 칠하면 정작 숫자가 안 보입니다.

## 한글 웹폰트를 직접 호스팅하는 이유

`next/font/google`이 쓰는 css2 엔드포인트는 **IBM Plex Sans KR을 한글 글립 없이 내려줍니다.** 그대로 두면 본문 한글이 전부 시스템 폰트로 나옵니다.

그래서 css1의 한글 서브셋 **188개 청크**를 `public/fonts/plex-kr/`에 넣고 `app/fonts/plex-kr.css`에서 unicode-range로 선언합니다. 전체는 1.9MB지만 **브라우저는 실제로 쓰는 청크만 내려받습니다.**

폰트를 바꾸려면 이 두 곳을 함께 바꿔야 합니다.

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
npx impeccable detect app components
```

조용히 끝나면 통과입니다. 렌더된 화면까지 보려면 puppeteer가 필요합니다.

```bash
npm i -D puppeteer
npm run build && npm start
npx impeccable detect http://localhost:3000
```

## 알아둘 것

**`og-image.png`는 이전 디자인 기준입니다.** 링크를 공유하면 썸네일만 옛날 모습으로 나옵니다. 바꾸려면 `public/og-image.png`를 교체하면 됩니다.

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
