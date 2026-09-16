// Async Server Component — fetches all Firestore data once here and passes
// it as props to child components. This:
//   • Fixes SEO (Googlebot now sees real content in the initial HTML)
//   • Eliminates 4 duplicate Firestore reads (skills ×2, settings/profile ×2)
//   • Keeps client-only components (SideNav, MobileBottomNav, ScrollToTop, Contact)
//     loaded via dynamic() with ssr:false so they don't run on the server

import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import BentoGrid from "@/components/BentoGrid";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import { fetchProfile, fetchSkills, fetchProjects, fetchCertifications, fetchEducation, fetchExperience } from "@/lib/fetchData";

// Client-only: rely on browser APIs (scroll-spy, form state, Credly scripts)
const SideNav        = dynamic(() => import("@/components/SideNav"),         { ssr: false });
const MobileBottomNav = dynamic(() => import("@/components/MobileBottomNav"), { ssr: false });
const ScrollToTop    = dynamic(() => import("@/components/ScrollToTop"),      { ssr: false });
const Contact        = dynamic(() => import("@/components/Contact"),          { ssr: false });

// ISR: revalidate cached page data once per hour so content updates from the
// admin portal are reflected on the live site without a full redeploy.
export const revalidate = 3600;

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
      <SideNav />
      <Hero heroData={profile} />
      <BentoGrid aboutData={profile} skills={skills} />
      <Education education={education} />
      <Experience experience={experience} />
      <Skills skills={skills} />
      <Projects projects={projects} />
      <Certifications certs={certifications} />
      <Contact />
      <ScrollToTop />
      <MobileBottomNav />
    </main>
  );
}
