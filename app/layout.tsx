import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";
// IBM Plex Sans KR is self-hosted: Google's css2 endpoint (what next/font/google
// uses) serves this family without its Hangul ranges, so the Korean chunks are
// vendored under public/fonts/plex-kr and declared here by unicode-range.
import "./fonts/plex-kr.css";

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
  alt: "이희망 | AI와 협업하는 백엔드 개발자",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  title: "이희망 | AI와 협업하는 백엔드 개발자",
  description:
    "문제를 정의하고, AI에게 방향을 제시하고, 결과를 검수합니다. AI를 주니어 개발자처럼 협업하는 백엔드 개발자 이희망의 포트폴리오입니다.",
  keywords: [
    "백엔드 개발자",
    "Spring Boot",
    "Java",
    "AI 협업",
    "Claude Code",
    "토스뱅크",
    "포트폴리오",
  ],
  openGraph: {
    title: "이희망 | AI와 협업하는 백엔드 개발자",
    description: "문제를 정의하고, AI에게 방향을 제시하고, 결과를 검수합니다.",
    type: "website",
    locale: "ko_KR",
    url: siteUrl,
    siteName: "이희망 포트폴리오",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "이희망 | AI와 협업하는 백엔드 개발자",
    description: "문제를 정의하고, AI에게 방향을 제시하고, 결과를 검수합니다.",
    images: [ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`${plexMono.variable} font-sans antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
