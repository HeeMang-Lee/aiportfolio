import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
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
    description:
      "문제를 정의하고, AI에게 방향을 제시하고, 결과를 검수합니다.",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "이희망 | AI와 협업하는 백엔드 개발자",
    description:
      "문제를 정의하고, AI에게 방향을 제시하고, 결과를 검수합니다.",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
