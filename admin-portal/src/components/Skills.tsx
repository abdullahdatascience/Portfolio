import React, { useState, useEffect, useCallback, memo } from "react";
import { motion } from "framer-motion";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "../firebase";
import { Skill } from "./types";
import {
  Field,
  inputCls,
  selectCls,
  SaveBtn,
  CancelBtn,
  EditBtn,
  DeleteBtn,
  LoadingDots,
  EmptyState,
} from "./Common";
import { normalizeSkillName } from "../utils/normalize";
import { revalidatePortfolioWithNotify } from "../utils/revalidatePortfolio";

const ADMIN_EMAIL = "drabdullahumer@gmail.com";

function getErrorInfo(err: unknown): {
  code?: string;
  message?: string;
  name?: string;
  stack?: string;
} {
  const maybe =
    typeof err === "object" && err !== null
      ? (err as { code?: unknown; message?: unknown; name?: unknown })
      : {};
  const code = typeof maybe.code === "string" ? maybe.code : undefined;
  const message =
    err instanceof Error
      ? err.message
      : typeof maybe.message === "string"
        ? maybe.message
        : undefined;
  const name = typeof maybe.name === "string" ? maybe.name : undefined;
  const stack = err instanceof Error ? err.stack : undefined;
  return { code, message, name, stack };
}

interface SkillsProps {
  notify: (text: string, type: "success" | "error") => void;
  setConfirmDialog: (
    dialog: { message: string; onConfirm: () => void } | null
  ) => void;
}

const CATEGORIES = [
  "Software Engineering",
  "Data & Analytics",
  "Machine Learning",
  "Databases & Infrastructure",
];

const categoryColor: Record<string, string> = {
  "Software Engineering":
    "bg-teal-500/10 text-teal-400 border-teal-500/30",
  "Data & Analytics":
    "bg-amber-500/10 text-amber-400 border-amber-500/30",
  "Machine Learning":
    "bg-blue-500/10 text-blue-400 border-blue-500/30",
  "Databases & Infrastructure":
    "bg-rose-500/10 text-rose-400 border-rose-500/30",
};

const Skills: React.FC<SkillsProps> = (props) => {
  if (
    auth.currentUser?.email !== ADMIN_EMAIL ||
    !auth.currentUser?.emailVerified
  ) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-foreground mb-2">Access Denied</h2>
          <p className="text-sm text-muted-foreground max-w-sm">
            You must be signed in as the admin with a verified email to manage skills.
          </p>
        </div>
      </div>
    );
  }

  return <SkillsManager {...props} />;
};

const SkillsManager: React.FC<SkillsProps> = ({ notify, setConfirmDialog }) => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editSkill, setEditSkill] = useState<Partial<Skill>>({});
  const [newSkill, setNewSkill] = useState<Omit<Skill, "id">>({
    name: "",
    category: CATEGORIES[0],
    level: 50,
  });

  const fetchSkills = useCallback(async () => {
    setLoading(true);

    try {
      const s = await getDocs(collection(db, "skills"));

      setSkills(
        s.docs.map(
          (d) =>
            ({
              id: d.id,
              ...d.data(),
            }) as Skill
        )
      );
    } catch (err) {
      console.error("Failed to fetch skills:", err);
      notify("Failed to fetch skills", "error");
    } finally {
      setLoading(false);
    }
  }, [notify]);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  const addSkill = async () => {
    if (!newSkill.name.trim()) {
      return notify("Skill name is required", "error");
    }

    if (newSkill.level < 0 || newSkill.level > 100) {
      return notify("Level must be 0-100", "error");
    }

    try {
      console.log("[Skills] Attempting to add skill:", {
        name: normalizeSkillName(newSkill.name),
        category: newSkill.category,
        level: newSkill.level,
      });
      const docRef = await addDoc(collection(db, "skills"), {
        ...newSkill,
        name: normalizeSkillName(newSkill.name),
        createdAt: serverTimestamp(),
      });
      console.log("[Skills] Skill added successfully with ID:", docRef.id);

      setNewSkill({
        name: "",
        category: CATEGORIES[0],
        level: 50,
      });

      await fetchSkills();

      revalidatePortfolioWithNotify(notify, "Skill added successfully");
    } catch (err: unknown) {
      const error = getErrorInfo(err);
      console.error("[Skills] Failed to add skill:", {
        code: error.code,
        message: error.message,
        name: error.name,
        stack: error.stack,
      });
      notify(
        `Failed to add skill: ${error.code ?? error.message ?? "Unknown error"}`,
        "error"
      );
    }
  };

  const startEditSkill = (skill: Skill) => {
    setEditingId(skill.id);
    setEditSkill({
      name: skill.name,
      category: skill.category,
      level: skill.level,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditSkill({});
  };

  const saveSkill = async (id: string) => {
    if (!editSkill.name?.trim()) {
      return notify("Skill name is required", "error");
    }

    if (
      (editSkill.level ?? 0) < 0 ||
      (editSkill.level ?? 0) > 100
    ) {
      return notify("Level must be 0-100", "error");
    }

    try {
      console.log("[Skills] Attempting to update skill:", {
        id,
        name: normalizeSkillName(editSkill.name ?? ""),
        category: editSkill.category,
        level: Number(editSkill.level),
      });
      await updateDoc(doc(db, "skills", id), {
        name: normalizeSkillName(editSkill.name ?? ""),
        category: editSkill.category,
        level: Number(editSkill.level),
        updatedAt: serverTimestamp(),
      });
      console.log("[Skills] Skill updated successfully:", id);

      cancelEdit();

      await fetchSkills();

      revalidatePortfolioWithNotify(notify, "Skill updated successfully");
    } catch (err: unknown) {
      const error = getErrorInfo(err);
      console.error("[Skills] Failed to update skill:", {
        id,
        code: error.code,
        message: error.message,
        name: error.name,
        stack: error.stack,
      });
      notify(
        `Failed to update skill: ${error.code ?? error.message ?? "Unknown error"}`,
        "error"
      );
    }
  };

  const deleteSkill = async (id: string) => {
    setConfirmDialog({
      message:
        "Are you sure you want to delete this skill? This cannot be undone.",

      onConfirm: async () => {
        try {
          console.log("[Skills] Attempting to delete skill:", { id });
          await deleteDoc(doc(db, "skills", id));
          console.log("[Skills] Skill deleted successfully:", id);

          await fetchSkills();

          revalidatePortfolioWithNotify(notify, "Skill deleted");
        } catch (err: unknown) {
          const error = getErrorInfo(err);
          console.error("[Skills] Failed to delete skill:", {
            id,
            code: error.code,
            message: error.message,
            name: error.name,
            stack: error.stack,
          });
          notify(
            `Failed to delete skill: ${error.code ?? error.message ?? "Unknown error"}`,
            "error"
          );
        }

        setConfirmDialog(null);
      },
    });
  };

  if (loading && skills.length === 0) {
    return <LoadingDots />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="bg-card/70 border border-border/60 rounded-2xl p-6 backdrop-blur-xl">
        <h2 className="text-base font-bold text-foreground mb-5">
          Add New Skill
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Field label="Skill Name">
            <input
              className={inputCls}
              placeholder="e.g. Python"
              value={newSkill.name}
              onChange={(e) =>
                setNewSkill({
                  ...newSkill,
                  name: e.target.value,
                })
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addSkill();
                }
              }}
            />
          </Field>

          <Field label="Category">
            <select
              className={selectCls}
              value={newSkill.category}
              onChange={(e) =>
                setNewSkill({
                  ...newSkill,
                  category: e.target.value,
                })
              }
            >
              {CATEGORIES.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </Field>

          <Field label={`Level — ${newSkill.level}%`}>
            <input
              type="range"
              min={0}
              max={100}
              step={1}
              value={newSkill.level}
              onChange={(e) =>
                setNewSkill({
                  ...newSkill,
                  level: parseInt(e.target.value, 10),
                })
              }
              className="accent-teal-400 w-full mt-1"
            />
          </Field>

          <Field label="&nbsp;">
            <button
              onClick={addSkill}
              className="h-[42px] w-full bg-primary hover:bg-primary/90 text-slate-950 font-bold rounded-xl text-sm transition-colors"
            >
              + Add Skill
            </button>
          </Field>
        </div>
      </div>

      <div className="bg-card/70 border border-border/60 rounded-2xl p-6 backdrop-blur-xl">
        <h2 className="text-base font-bold text-foreground mb-5">
          Manage Skills
          <span className="ml-2 text-xs font-normal text-muted-foreground">
            ({skills.length})
          </span>
        </h2>

        {skills.length === 0 ? (
          <EmptyState
            title="No skills yet."
            description="Add your first skill above to populate the public Skills section."
          />
        ) : (
          <div className="space-y-3">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="bg-card/60 rounded-xl border border-border/60 overflow-hidden"
              >
                {editingId !== skill.id ? (
                  <div className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-sm font-semibold text-foreground truncate">
                        {skill.name}
                      </span>

                      <span
                        className={`text-xs font-medium px-2.5 py-0.5 rounded-full border flex-shrink-0 ${
                          categoryColor[skill.category] ??
                          "bg-muted/60 text-muted-foreground border-border"
                        }`}
                      >
                        {skill.category}
                      </span>

                      <span className="text-xs text-muted-foreground flex-shrink-0">
                        {skill.level}%
                      </span>
                    </div>

                    <div className="flex gap-2 flex-shrink-0 ml-3">
                      <EditBtn
                        onClick={() => startEditSkill(skill)}
                      />
                      <DeleteBtn
                        onClick={() => deleteSkill(skill.id)}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="p-4 border-t border-primary/30 bg-muted/40">
                    <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-4">
                      Editing: {skill.name}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                      <Field label="Skill Name">
                        <input
                          className={inputCls}
                          value={editSkill.name ?? ""}
                          onChange={(e) =>
                            setEditSkill({
                              ...editSkill,
                              name: e.target.value,
                            })
                          }
                        />
                      </Field>

                      <Field label="Category">
                        <select
                          className={selectCls}
                          value={
                            editSkill.category ?? CATEGORIES[0]
                          }
                          onChange={(e) =>
                            setEditSkill({
                              ...editSkill,
                              category: e.target.value,
                            })
                          }
                        >
                          {CATEGORIES.map((category) => (
                            <option key={category}>{category}</option>
                          ))}
                        </select>
                      </Field>

                      <Field
                        label={`Level — ${
                          editSkill.level ?? 50
                        }%`}
                      >
                        <input
                          type="range"
                          min={0}
                          max={100}
                          step={1}
                          value={editSkill.level ?? 50}
                          onChange={(e) =>
                            setEditSkill({
                              ...editSkill,
                              level: parseInt(
                                e.target.value,
                                10
                              ),
                            })
                          }
                          className="accent-teal-400 w-full mt-1"
                        />
                      </Field>
                    </div>

                    <div className="flex gap-2">
                      <SaveBtn
                        onClick={() => saveSkill(skill.id)}
                      />
                      <CancelBtn onClick={cancelEdit} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default memo(Skills);

