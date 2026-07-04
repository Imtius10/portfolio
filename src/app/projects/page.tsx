import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectsComponent from "@/components/Projects";
import BackToTop from "@/components/BackToTop";
import { mockProfile } from "@/lib/mockData";
import { ProfileData } from "@/lib/types";

export const dynamic = "force-dynamic";

async function getData(): Promise<ProfileData> {
  try {
    const { prisma } = await import("@/lib/prisma");
    const profile = await prisma.profile.findFirst({
      include: {
        socialLinks: true,
        projects: { include: { images: true } },
        skills: { include: { category: true } },
        education: true,
        experience: true,
      },
    });
    if (profile) return profile as ProfileData;
  } catch {
    // fallback
  }
  return mockProfile;
}

export default async function ProjectsPage() {
  const data = await getData();

  return (
    <main className="min-h-screen bg-slate-950">
      <Navbar />
      <div className="pt-24 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            All <span className="text-emerald-400">Projects</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Here are all the projects I&apos;ve worked on. Each one taught me something new.
          </p>
        </div>
      </div>
      <ProjectsComponent projects={data.projects} showAll />
      <Footer profile={data} />
      <BackToTop />
    </main>
  );
}
