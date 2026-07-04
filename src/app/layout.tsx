import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Imtius Ahmad | Full Stack Developer",
  description:
    "Portfolio of Imtius Ahmad - Full Stack Developer specializing in Next.js, TypeScript, PostgreSQL, and modern web applications. View my projects and get in touch.",
  keywords: [
    "Imtius Ahmad",
    "Full Stack Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Portfolio",
  ],
  openGraph: {
    title: "Imtius Ahmad | Full Stack Developer",
    description:
      "Portfolio of Imtius Ahmad - Building modern web applications with Next.js, TypeScript, and PostgreSQL.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-slate-950 dark:bg-slate-950 text-slate-200 light:bg-slate-50 light:text-slate-800 transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
