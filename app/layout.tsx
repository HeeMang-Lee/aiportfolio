import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import "./globals.css";
// 세 서체 모두 자체 호스팅한다. next/font/google 이 쓰는 css2 엔드포인트는
// 한글 글립을 주지 않으므로 한글 계열은 css1 의 서브셋 청크를 받아
// unicode-range 로 선언한다. 브라우저는 실제로 쓰는 청크만 내려받는다.
import "./fonts/plex-kr.css";
import "./fonts/young-serif.css";
import "./fonts/noto-serif-kr.css";

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

const ogImage = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "이희망 | AI 통합 백엔드 엔지니어",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  title: "이희망 | AI 통합 백엔드 엔지니어",
  description:
    "검증된 백엔드 위에 AI를 얹습니다. 동시성 제어와 부하 처리, 외부 API 신뢰성 설계, 메시징과 이벤트 기반 아키텍처를 다룬 백엔드 엔지니어 이희망의 작업 아카이브입니다.",
  keywords: [
    "백엔드 개발자",
    "Spring Boot",
    "Java",
    "Kafka",
    "Redis",
    "동시성 제어",
    "AI 협업",
    "포트폴리오",
  ],
  openGraph: {
    title: "이희망 | AI 통합 백엔드 엔지니어",
    description: "검증된 백엔드 위에 AI를 얹습니다.",
    type: "website",
    locale: "ko_KR",
    url: siteUrl,
    siteName: "이희망",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "이희망 | AI 통합 백엔드 엔지니어",
    description: "검증된 백엔드 위에 AI를 얹습니다.",
    images: [ogImage],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="cursor-hidden" suppressHydrationWarning>
      <body className={`${plexMono.variable} font-body`}>
        <SmoothScroll />
        <Cursor />
        {children}
      </body>
    </html>
  );
}
