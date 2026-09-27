import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Imtius Ahmad - Lecturer CV",
  description:
    "One-page, ATS-friendly lecturer CV for Imtius Ahmad — teaching areas, research interests, academic projects and contact details. Printable, saves as PDF.",
  robots: { index: false },
};

export default function LecturerCvLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
