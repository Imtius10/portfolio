import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import UniversitySection from "@/components/UniversitySection";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import StatsSection from "@/components/StatsSection";
import ServicesSection from "@/components/ServicesSection";
import BackToTop from "@/components/BackToTop";
import ScrollReveal from "@/components/ScrollReveal";
import { mockProfile } from "@/lib/mockData";

export const dynamic = "force-dynamic";

async function getProfile() {
  try {
    const { prisma } = await import("@/lib/prisma");
    const profile = await prisma.profile.findFirst({
      include: {
        socialLinks: true,
        skills: { include: { category: true } },
        education: true,
        experience: true,
        projects: { include: { images: true } },
      },
    });
    return profile;
  } catch (error) {
    console.log("Database not available, using mock data");
    return null;
  }
}

export default async function Home() {
  const profile = await getProfile();
  const data = profile || mockProfile;

  return (
    <main className="min-h-screen bg-slate-950 dark:bg-slate-950 light:bg-slate-50 transition-colors">
      <Navbar />
      <Hero profile={data} />
      <StatsSection />
      <About profile={data} />
      <ServicesSection />
      <ScrollReveal>
        <Skills skills={data.skills} />
      </ScrollReveal>
      <ScrollReveal>
        <UniversitySection />
      </ScrollReveal>
      <ScrollReveal>
        <Education education={data.education} />
      </ScrollReveal>
      {data.experience.length > 0 && (
        <ScrollReveal>
          <Experience experience={data.experience} />
        </ScrollReveal>
      )}
      <ScrollReveal>
        <Projects projects={data.projects} />
      </ScrollReveal>
      <ScrollReveal>
        <Contact profile={data} />
      </ScrollReveal>
      <Footer profile={data} />
      <BackToTop />
    </main>
  );
}
