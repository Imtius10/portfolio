import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Imtius Ahmad - Lecturer in Computer Science",
  description:
    "Academic profile of Imtius Ahmad — BSc CSE graduate seeking a lecturer position. Teaching areas, research interests, mentoring experience and academic projects.",
  keywords: [
    "Imtius Ahmad",
    "Lecturer Computer Science",
    "CSE Lecturer",
    "Teaching Portfolio",
    "Bangladesh",
  ],
  openGraph: {
    title: "Imtius Ahmad - Lecturer in Computer Science",
    description:
      "Academic profile, teaching areas and research interests of Imtius Ahmad, BSc CSE graduate.",
    type: "profile",
  },
};

export default function LecturerLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
