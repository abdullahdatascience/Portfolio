import {
  normalizeSkillName,
  normalizeToolName,
  normalizeProjectTitle,
  normalizeProjectSummary,
} from "./normalize";

describe("normalize — canonical content values", () => {
  it("normalizes skill names to canonical casing (Power BI)", () => {
    expect(normalizeSkillName("Power BI")).toBe("Power BI");
    expect(normalizeSkillName("power bi")).toBe("Power BI");
    expect(normalizeSkillName("POWER BI")).toBe("Power BI");
    expect(normalizeSkillName("  Power BI  ")).toBe("Power BI");
    expect(normalizeSkillName("Python")).toBe("Python");
  });

  it("normalizes tools to canonical values (Matplotlib, NumPy)", () => {
    expect(normalizeToolName("Matplotlib")).toBe("Matplotlib");
    expect(normalizeToolName("matplotlib")).toBe("Matplotlib");
    expect(normalizeToolName("Matplotlip")).toBe("Matplotlib");
    expect(normalizeToolName("matplotlip")).toBe("Matplotlib");
    expect(normalizeToolName("NumPy")).toBe("NumPy");
    expect(normalizeToolName("numpy")).toBe("NumPy");
    expect(normalizeToolName("Numpy")).toBe("NumPy");
    expect(normalizeToolName("Pandas")).toBe("Pandas");
  });

  it("normalizes the churn project title to the canonical spelling", () => {
    expect(normalizeProjectTitle("Customer Churn Prediction")).toBe("Customer Churn Prediction");
    expect(normalizeProjectTitle("Coustomer Churn Prediction")).toBe("Customer Churn Prediction");
    expect(normalizeProjectTitle("coustomer churn prediction")).toBe("Customer Churn Prediction");
  });

  it("fills the canonical summary only for the churn project when blank", () => {
    expect(normalizeProjectSummary("", "Customer Churn Prediction")).toContain("churn");
    expect(normalizeProjectSummary("", "Some other project")).toBe("");
    expect(normalizeProjectSummary("Existing summary", "Customer Churn Prediction")).toBe("Existing summary");
  });
});