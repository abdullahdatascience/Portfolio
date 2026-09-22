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
  tagline: "Software Engineer | Data & Machine Learning",
  subtitle: "A Computer Science graduate who builds practical software systems and applies data and machine learning where it matters.",
  aboutTitle: "Software Engineering + Data & ML",
  aboutBio: [
    "BS Computer Science graduate from Government College University Faisalabad. I build full-stack applications with React, TypeScript, and FastAPI, and work with data end to end — SQL, analysis, visualization, and applied machine learning.",
    "My strengths sit at the intersection of software engineering and data: turning requirements into working systems, and turning raw data into reliable models and reports.",
  ].join("\n\n"),
  typewriterLines: [
    "A Computer Science graduate who builds practical software systems and applies data and machine learning where it matters.",
  ],
};

// Verified credential/content defaults, shown only while the corresponding
// Firestore collections are empty or unreachable. Admin-published documents
// always take precedence once present.
const DEFAULT_PROJECTS: Project[] = [
  {
    id: "default-biz-ledger",
    title: "Biz Ledger",
    featured: true,
    themeColor: "teal",
    tools: ["React", "TypeScript", "Vite", "Tailwind CSS", "FastAPI", "SQLAlchemy", "PostgreSQL", "JWT", "RBAC"],
    summary:
      "Full-stack financial ERP with double-entry accounting, banking reconciliation workflows, role-based access, and reporting.",
    description:
      "A complete financial ERP system built as a REST API with FastAPI and a React/TypeScript client. Implements double-entry accounting, general ledger, receivable/payable management, and banking reconciliation workflows. Authentication uses JWT with role-based access control, and the API is backed by PostgreSQL via SQLAlchemy. Covers financial reporting and permissioned multi-role usage.",
    link: "",
  },
  {
    id: "default-churn-prediction",
    title: "Customer Churn Prediction",
    themeColor: "violet",
    tools: ["Python", "Pandas", "NumPy", "Scikit-learn", "Random Forest", "Streamlit"],
    summary:
      "An ML application that predicts customer churn with preprocessing pipelines, model evaluation, and an interactive Streamlit UI.",
    description:
      "End-to-end machine learning application: data cleaning, EDA, feature engineering, and a scikit-learn preprocessing pipeline feeding a Random Forest classifier. Model performance is assessed with rigorous evaluation metrics. Delivered as a Streamlit app so non-technical users can score customers interactively.",
  },
  {
    id: "default-fraud-detection",
    title: "Fraud Detection",
    themeColor: "rose",
    tools: ["Python", "Scikit-learn", "Random Forest", "SHAP"],
    summary:
      "Imbalanced-classification pipeline for transaction fraud, with threshold tuning, F1 evaluation, and SHAP explanations.",
    description:
      "Machine learning project handling imbalanced classification on transaction data. Uses Random Forest with class-weighting, probability threshold tuning, and F1-based evaluation to balance precision and recall. SHAP analysis explains individual predictions for auditability.",
  },
  {
    id: "default-salary-api",
    title: "Salary Prediction API",
    themeColor: "blue",
    tools: ["Python", "Scikit-learn", "FastAPI", "Docker", "REST API"],
    summary:
      "A practical ML-plus-backend service: a trained salary model served behind a FastAPI REST API, containerized with Docker.",
    description:
      "Trains a salary-prediction model with scikit-learn and serves it through a documented FastAPI REST API. The service handles request validation, returns predictions and confidence context, and ships as a Docker image for reproducible deployment. Demonstrates the full path from trained model to consumable API.",
  },
];

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
    company: "Internship Program",
    startDate: "November 2025",
    endDate: "March 2026",
    responsibilities: [
      "Analyzed and prepared data using Python and R for analytical workflows",
      "Applied statistical testing in R to evaluate patterns and relationships in data",
      "Worked with data modeling and evaluation workflows using Google Colab",
    ].join("\n"),
  },
];

// ─── Fetchers ─────────────────────────────────────────────────────────────────

export async function fetchProfile(): Promise<ProfileData> {
  try {
    const snap = await getDoc(doc(db, "settings", "profile"));
    if (!snap.exists()) return DEFAULT_PROFILE;
    const data = snap.data();
    const rawLines = data.typewriter;
    const typewriterLines = (Array.isArray(rawLines) ? rawLines : [])
      .map((line) => String(line).trim())
      .filter((line) => line.length > 0);
    return {
      name:            data.heroTitle       || DEFAULT_PROFILE.name,
      tagline:         data.heroTagline     || DEFAULT_PROFILE.tagline,
      subtitle:        typewriterLines[0]   || DEFAULT_PROFILE.subtitle,
      aboutTitle:      data.aboutTitle      || DEFAULT_PROFILE.aboutTitle,
      aboutBio:        data.aboutBio        || DEFAULT_PROFILE.aboutBio,
      typewriterLines: typewriterLines.length > 0 ? typewriterLines : DEFAULT_PROFILE.typewriterLines,
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
    if (snap.empty) return DEFAULT_PROJECTS;
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
        featured:    d.data().featured    || undefined,
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
