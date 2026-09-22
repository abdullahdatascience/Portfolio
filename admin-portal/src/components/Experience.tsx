import React, { useState, useEffect, useCallback, memo } from "react";
import { motion } from "framer-motion";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { Experience as ExperienceType } from "./types";
import { Field, inputCls, SaveBtn, CancelBtn, EditBtn, DeleteBtn, LoadingDots, EmptyState } from "./Common";
import { revalidatePortfolioWithNotify } from "../utils/revalidatePortfolio";

interface ExperienceProps {
  notify: (text: string, type: "success" | "error") => void;
  setConfirmDialog: (dialog: { message: string; onConfirm: () => void } | null) => void;
}

const Experience: React.FC<ExperienceProps> = ({ notify, setConfirmDialog }) => {
  const [experience, setExperience] = useState<ExperienceType[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editExp, setEditExp] = useState<Partial<ExperienceType>>({});
  const [newExp, setNewExp] = useState<Omit<ExperienceType, "id">>({
    title: "", company: "", startDate: "", endDate: "", responsibilities: ""
  });

  const fetchExperience = useCallback(async () => {
    setLoading(true);
    try {
      const s = await getDocs(collection(db, "experience"));
      setExperience(s.docs.map(d => ({ id: d.id, ...d.data() } as ExperienceType)));
    } catch (err) {
      console.error("Failed to fetch experience:", err);
      notify("Failed to fetch experience", "error");
    } finally {
      setLoading(false);
    }
  }, [notify]);

  useEffect(() => {
    fetchExperience();
  }, [fetchExperience]);

  const addExp = async () => {
    if (!newExp.title.trim() || !newExp.company.trim())
      return notify("Title and company are required", "error");
    try {
      await addDoc(collection(db, "experience"), { ...newExp, createdAt: serverTimestamp() });
      setNewExp({ title: "", company: "", startDate: "", endDate: "", responsibilities: "" });
      fetchExperience();
      revalidatePortfolioWithNotify(notify, "Experience added successfully");
    } catch (err) {
      console.error("Failed to add experience:", err);
      notify("Failed to add experience", "error");
    }
  };

  const startEdit = (exp: ExperienceType) => {
    setEditingId(exp.id);
    setEditExp({
      title: exp.title,
      company: exp.company,
      startDate: exp.startDate ?? "",
      endDate: exp.endDate ?? "",
      responsibilities: exp.responsibilities ?? "",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditExp({});
  };

  const saveExp = async (id: string) => {
    if (!editExp.title?.trim() || !editExp.company?.trim())
      return notify("Title and company are required", "error");
    try {
      await updateDoc(doc(db, "experience", id), {
        title: editExp.title,
        company: editExp.company,
        startDate: editExp.startDate ?? "",
        endDate: editExp.endDate ?? "",
        responsibilities: editExp.responsibilities ?? "",
        updatedAt: serverTimestamp(),
      });
      cancelEdit();
      fetchExperience();
      revalidatePortfolioWithNotify(notify, "Experience updated successfully");
    } catch (err) {
      console.error("Failed to update experience:", err);
      notify("Failed to update experience", "error");
    }
  };

  const deleteExp = async (id: string) => {
    setConfirmDialog({
      message: "Are you sure you want to delete this experience record? This cannot be undone.",
      onConfirm: async () => {
        try {
          await deleteDoc(doc(db, "experience", id));
          fetchExperience();
          revalidatePortfolioWithNotify(notify, "Experience deleted");
        } catch (err) {
          console.error("Failed to delete experience:", err);
          notify("Failed to delete experience", "error");
        }
        setConfirmDialog(null);
      },
    });
  };

  if (loading && experience.length === 0) return <LoadingDots />;

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="bg-card/70 border border-border/60 rounded-2xl p-6 backdrop-blur-xl">
        <h2 className="text-base font-bold text-foreground mb-5">Add New Experience</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Job Title *">
            <input className={inputCls} placeholder="e.g. Data Analyst"
              value={newExp.title}
              onChange={e => setNewExp({ ...newExp, title: e.target.value })} />
          </Field>
          <Field label="Company *">
            <input className={inputCls} placeholder="e.g. Data Tech Solution"
              value={newExp.company}
              onChange={e => setNewExp({ ...newExp, company: e.target.value })} />
          </Field>
          <Field label="Start Date">
            <input className={inputCls} placeholder="e.g. February 2023"
              value={newExp.startDate}
              onChange={e => setNewExp({ ...newExp, startDate: e.target.value })} />
          </Field>
          <Field label="End Date">
            <input className={inputCls} placeholder="e.g. October 2024"
              value={newExp.endDate}
              onChange={e => setNewExp({ ...newExp, endDate: e.target.value })} />
          </Field>
          <div className="col-span-1 sm:col-span-2">
            <Field label="Responsibilities (one per line)">
              <textarea className={`${inputCls} min-h-[120px] resize-y`}
                placeholder={"Worked on Excel-based data entry and cleaning.\nUsed formulas, VLOOKUP, and Pivot Tables for reporting."}
                value={newExp.responsibilities}
                onChange={e => setNewExp({ ...newExp, responsibilities: e.target.value })} />
            </Field>
          </div>
        </div>
        <button onClick={addExp}
          className="mt-5 px-6 py-2.5 bg-primary hover:bg-primary/90 text-slate-950 font-bold rounded-xl text-sm transition-colors">
          + Add Experience
        </button>
      </div>

      <div className="bg-card/70 border border-border/60 rounded-2xl p-6 backdrop-blur-xl">
        <h2 className="text-base font-bold text-foreground mb-5">
          Manage Experience
          <span className="ml-2 text-xs font-normal text-muted-foreground">({experience.length})</span>
        </h2>
        {experience.length === 0 ? (
          <EmptyState title="No experience records yet." />
        ) : (
          <div className="space-y-3">
            {experience.map(exp => (
              <div key={exp.id} className="bg-card/60 rounded-xl border border-border/60 overflow-hidden">
                {editingId !== exp.id ? (
                  <div className="flex items-center justify-between px-4 py-3 gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{exp.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {exp.company}
                        {exp.startDate && <span className="ml-2 text-muted-foreground/70">{exp.startDate} — {exp.endDate}</span>}
                      </p>
                      {exp.responsibilities && (
                        <p className="text-xs text-muted-foreground/70 mt-1 line-clamp-2">{(exp.responsibilities ?? "").split("\n").filter(r => r.trim()).length} responsibility items</p>
                      )}
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <EditBtn onClick={() => startEdit(exp)} />
                      <DeleteBtn onClick={() => deleteExp(exp.id)} />
                    </div>
                  </div>
                ) : (
                  <div className="p-4 border-t border-primary/30 bg-muted/40">
                    <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-4">
                      Editing: {exp.title}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <Field label="Job Title *">
                        <input className={inputCls} value={editExp.title ?? ""}
                          onChange={e => setEditExp({ ...editExp, title: e.target.value })} />
                      </Field>
                      <Field label="Company *">
                        <input className={inputCls} value={editExp.company ?? ""}
                          onChange={e => setEditExp({ ...editExp, company: e.target.value })} />
                      </Field>
                      <Field label="Start Date">
                        <input className={inputCls} value={editExp.startDate ?? ""}
                          onChange={e => setEditExp({ ...editExp, startDate: e.target.value })} />
                      </Field>
                      <Field label="End Date">
                        <input className={inputCls} value={editExp.endDate ?? ""}
                          onChange={e => setEditExp({ ...editExp, endDate: e.target.value })} />
                      </Field>
                      <div className="col-span-1 sm:col-span-2">
                        <Field label="Responsibilities (one per line)">
                          <textarea className={`${inputCls} min-h-[120px] resize-y`}
                            value={editExp.responsibilities ?? ""}
                            onChange={e => setEditExp({ ...editExp, responsibilities: e.target.value })} />
                        </Field>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <SaveBtn onClick={() => saveExp(exp.id)} />
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

export default memo(Experience);