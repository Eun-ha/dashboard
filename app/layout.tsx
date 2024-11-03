import type { Metadata } from "next";
import "./globals.css";
import { notoSansKR } from "@/ui/fonts";

export const metadata: Metadata = {
  title: {
    template: "%s | Dashboard",
    default: "Dashboard by Levelup Next.js",
  },
  description: "대시보드 프로젝트",
  metadataBase: new URL("https://levelup-dashboard.vercel.app/"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${notoSansKR.className} antialiased`}>{children}</body>
    </html>
  );
}
