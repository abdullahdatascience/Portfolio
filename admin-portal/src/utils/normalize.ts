// Name-normalization helpers.
// Keeps admin-written Firestore documents identical to the canonical names the
// public portfolio renders (see lib/fetchData.ts), so the read-layer fixes in
// the public app become permanent once a record is saved from this portal.

export function normalizeSkillName(name: string): string {
  const n = (name ?? "").trim();
  return n.toLowerCase() === "power bi" ? "Power BI" : n;
}

export function normalizeToolName(tool: string): string {
  const t = (tool ?? "").trim();
  const lower = t.toLowerCase();
  if (t === "Matplotlip" || lower === "matplotlib" || lower === "matplotlip") return "Matplotlib";
  if (t === "Numpy" || lower === "numpy") return "NumPy";
  return t;
}

export function normalizeProjectTitle(title: string): string {
  const t = (title ?? "").trim();
  return t.toLowerCase() === "coustomer churn prediction" ? "Customer Churn Prediction" : t;
}

export function normalizeProjectSummary(summary: string, title: string): string {
  const s = (summary ?? "").trim();
  if (s) return s;
  // Target the known empty-summary record so the public-layer default becomes
  // permanent only for that specific project.
  if (normalizeProjectTitle(title) === "Customer Churn Prediction") {
    return "Predicts whether a customer is likely to churn using machine learning \u2014 covering data cleaning, EDA, feature engineering, and predictive modeling.";
  }
  return "";
}

export function isSafeUrl(value: string): boolean {
  return /^https?:\/\//i.test((value ?? "").trim());
}