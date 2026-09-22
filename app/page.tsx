// Async Server Component — fetches all Firestore data once here and passes
// it as props to child components. This:
//   • Fixes SEO (Googlebot now sees real content in the initial HTML)
//   • Eliminates 4 duplicate Firestore reads (skills ×2, settings/profile ×2)
//   • Keeps client-only components (SideNav, MobileBottomNav, ScrollToTop, Contact)
//     loaded via dynamic() with ssr:false from a "use client" boundary.

import Hero from "@/components/Hero";
import BentoGrid from "@/components/BentoGrid";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Certifications from "@/components/Certifications";
import { fetchProfile, fetchSkills, fetchProjects, fetchCertifications, fetchEducation, fetchExperience } from "@/lib/fetchData";
import { LazySideNav, LazyMobileBottomNav, LazyScrollToTop, LazyContact } from "@/components/ClientLoaders";

// ISR: revalidate cached page data once per hour so content updates from the
// admin portal are reflected on the live site without a full redeploy.
export const revalidate = 60;

export default async function Home() {
  // Single parallel fetch — replaces 4 individual component-level fetches
  const [profile, skills, projects, certifications, education, experience] = await Promise.all([
    fetchProfile(),
    fetchSkills(),
    fetchProjects(),
    fetchCertifications(),
    fetchEducation(),
    fetchExperience(),
  ]);

  return (
    <main className="min-h-screen bg-background font-sans selection:bg-primary/30">
      <LazySideNav />
      <Hero heroData={profile} />
      <BentoGrid aboutData={profile} />
      <Skills skills={skills} />
      <Projects projects={projects} />
      <Experience experience={experience} />
      <Education education={education} />
      <Certifications certs={certifications} />
      <LazyContact />
      <LazyScrollToTop />
      <LazyMobileBottomNav />
    </main>
  );
}
