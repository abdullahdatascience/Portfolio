// Server-side data fetching using the Firebase client SDK.
// Called once in app/page.tsx (async Server Component) — eliminates the 4
// duplicate Firestore reads that previously happened per page load.
// Falls back to safe defaults on any network or Firestore error.

import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { ProfileData, Skill, Project, Certification, Education, Experience } from "@/lib/types";

// ─── Defaults ────────────────────────────────────────────────────────────────

const DEFAULT_PROFILE: ProfileData = {
  name: "Muhammad Abdullah",
  tagline: "Data Science & AI Enthusiast",
  subtitle: "A BS Computer Science graduate building practical data and machine learning projects.",
  aboutTitle: "Turning Data Into Decisions",
  aboutBio: [
    "New graduate from Government College University Faisalabad focused on Data Science, Machine Learning, and AI.",
    "Working hands-on with Python, R, SQL, Excel, and Power BI — cleaning and analyzing data, running statistical tests, and building predictive models.",
  ].join("\n\n"),
  projectsCount: 1,
  toolsCount: 5,
  experienceCount: 2,
};

// Verified credential/content defaults, shown only while the corresponding
// Firestore collections are empty or unreachable. Admin-published documents
// always take precedence once present.
const DEFAULT_EDUCATION: Education[] = [
  {
    id: "default-gcuf-bs-cs",
    degree: "BS Computer Science",
    institution: "Government College University Faisalabad",
    graduationDate: "June 2026",
    cgpa: "3.19 / 4.00",
  },
];

const DEFAULT_EXPERIENCE: Experience[] = [
  {
    id: "default-data-tech-solution",
    title: "Data Entry & Reporting",
    company: "Data Tech Solution",
    startDate: "February 2023",
    endDate: "October 2024",
    responsibilities: [
      "Performed Excel-based data entry and data cleaning",
      "Built formulas, VLOOKUPs, and Pivot Tables to organize and summarize data",
      "Created charts and reports",
    ].join("\n"),
  },
  {
    id: "default-analytics-internship",
    title: "Data Analytics / Data Science Intern",
    company: "Data Analytics / Data Science Internship",
    startDate: "November 2025",
    endDate: "March 2026",
    responsibilities: [
      "Performed data analytics using Python and R",
      "Conducted statistical testing in R",
      "Performed data modeling and evaluation",
      "Used Google Colab for data science work",
    ].join("\n"),
  },
];

// ─── Fetchers ─────────────────────────────────────────────────────────────────

export async function fetchProfile(): Promise<ProfileData> {
  try {
    const snap = await getDoc(doc(db, "settings", "profile"));
    if (!snap.exists()) return DEFAULT_PROFILE;
    const data = snap.data();
    const lines = data.typewriter as string[] | undefined;
    return {
      name:            data.heroTitle       || DEFAULT_PROFILE.name,
      tagline:         data.heroTagline     || DEFAULT_PROFILE.tagline,
      subtitle:        lines?.[0]           || DEFAULT_PROFILE.subtitle,
      aboutTitle:      data.aboutTitle      || DEFAULT_PROFILE.aboutTitle,
      aboutBio:        data.aboutBio        || DEFAULT_PROFILE.aboutBio,
      projectsCount:   data.projectsCount   ?? DEFAULT_PROFILE.projectsCount,
      toolsCount:      data.toolsCount      ?? DEFAULT_PROFILE.toolsCount,
      experienceCount: data.experienceCount ?? DEFAULT_PROFILE.experienceCount,
    };
  } catch {
    return DEFAULT_PROFILE;
  }
}

export async function fetchSkills(): Promise<Skill[]> {
  try {
    const snap = await getDocs(collection(db, "skills"));
    return snap.docs.map((d) => {
      const name = d.data().name || "";
      return {
        id:       d.id,
        name:     name.toLowerCase() === "power bi" ? "Power BI" : name,
        category: d.data().category || "",
        level:    d.data().level ?? 0,
      };
    });
  } catch {
    return [];
  }
}

export async function fetchProjects(): Promise<Project[]> {
  try {
    const snap = await getDocs(collection(db, "projects"));
    return snap.docs.map((d) => {
      const tools = (d.data().tools || []).map((t: string) =>
        t === "Matplotlip" ? "Matplotlib" : t === "Numpy" ? "NumPy" : t
      );
      const project: Project = {
        id:          d.id,
        title:       d.data().title       || "",
        tools,
        summary:     d.data().summary     || "",
        description: d.data().description || "",
        themeColor:  d.data().themeColor  || "emerald",
        image:       d.data().image       || undefined,
        link:        d.data().link,
      };
      // Verified content corrections for existing CMS records; these become
      // no-ops once the same fixes are saved via the admin portal.
      if (project.title === "Coustomer Churn Prediction") {
        project.title = "Customer Churn Prediction";
      }
      if (!project.summary.trim()) {
        project.summary =
          "Predicts whether a customer is likely to churn using machine learning — covering data cleaning, EDA, feature engineering, and predictive modeling.";
      }
      return project;
    });
  } catch {
    return [];
  }
}

export async function fetchCertifications(): Promise<Certification[]> {
  try {
    const snap = await getDocs(collection(db, "certifications"));
    const data: Certification[] = snap.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    } as Certification));

    // Sort: Credly-badged certs first, then newest by date
    data.sort((a, b) => {
      if (a.badgeId && !b.badgeId) return -1;
      if (!a.badgeId && b.badgeId) return 1;
      return (b.issueDate ?? "").localeCompare(a.issueDate ?? "");
    });

    return data;
  } catch {
    return [];
  }
}

export async function fetchEducation(): Promise<Education[]> {
  try {
    const snap = await getDocs(collection(db, "education"));
    const data: Education[] = snap.docs.map((d) => ({
      id: d.id,
      degree: d.data().degree || "",
      institution: d.data().institution || "",
      graduationDate: d.data().graduationDate || "",
      cgpa: d.data().cgpa || "",
    }));
    if (data.length === 0) return DEFAULT_EDUCATION;
    data.sort((a, b) => b.graduationDate.localeCompare(a.graduationDate));
    return data;
  } catch {
    return DEFAULT_EDUCATION;
  }
}

export async function fetchExperience(): Promise<Experience[]> {
  try {
    const snap = await getDocs(collection(db, "experience"));
    const data: Experience[] = snap.docs.map((d) => ({
      id: d.id,
      title: d.data().title || "",
      company: d.data().company || "",
      startDate: d.data().startDate || "",
      endDate: d.data().endDate || "",
      responsibilities: d.data().responsibilities || "",
    }));
    if (data.length === 0) return DEFAULT_EXPERIENCE;
    data.sort((a, b) => b.startDate.localeCompare(a.startDate));
    return data;
  } catch {
    return DEFAULT_EXPERIENCE;
  }
}
