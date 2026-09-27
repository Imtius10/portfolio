import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Imtius Ahmad - Full Stack Developer CV",
  description:
    "One-page, ATS-friendly developer CV for Imtius Ahmad — skills, projects, education and contact details. Printable, saves as PDF.",
  robots: { index: false },
};

export default function ResumeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
