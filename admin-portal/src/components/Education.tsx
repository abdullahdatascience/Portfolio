import React, { useState, useEffect, useCallback, memo } from "react";
import { motion } from "framer-motion";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { Education as EducationType } from "./types";
import { Field, inputCls, SaveBtn, CancelBtn, EditBtn, DeleteBtn, LoadingDots, EmptyState } from "./Common";
import { revalidatePortfolioWithNotify } from "../utils/revalidatePortfolio";

interface EducationProps {
  notify: (text: string, type: "success" | "error") => void;
  setConfirmDialog: (dialog: { message: string; onConfirm: () => void } | null) => void;
}

const Education: React.FC<EducationProps> = ({ notify, setConfirmDialog }) => {
  const [education, setEducation] = useState<EducationType[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editEdu, setEditEdu] = useState<Partial<EducationType>>({});
  const [newEdu, setNewEdu] = useState<Omit<EducationType, "id">>({
    degree: "", institution: "", graduationDate: "", cgpa: ""
  });

  const fetchEducation = useCallback(async () => {
    setLoading(true);
    try {
      const s = await getDocs(collection(db, "education"));
      setEducation(s.docs.map(d => ({ id: d.id, ...d.data() } as EducationType)));
    } catch (err) {
      console.error("Failed to fetch education:", err);
      notify("Failed to fetch education", "error");
    } finally {
      setLoading(false);
    }
  }, [notify]);

  useEffect(() => {
    fetchEducation();
  }, [fetchEducation]);

  const addEdu = async () => {
    if (!newEdu.degree.trim() || !newEdu.institution.trim())
      return notify("Degree and institution are required", "error");
    try {
      await addDoc(collection(db, "education"), { ...newEdu, createdAt: serverTimestamp() });
      setNewEdu({ degree: "", institution: "", graduationDate: "", cgpa: "" });
      fetchEducation();
      revalidatePortfolioWithNotify(notify, "Education added successfully");
    } catch (err) {
      console.error("Failed to add education:", err);
      notify("Failed to add education", "error");
    }
  };

  const startEdit = (edu: EducationType) => {
    setEditingId(edu.id);
    setEditEdu({
      degree: edu.degree,
      institution: edu.institution,
      graduationDate: edu.graduationDate ?? "",
      cgpa: edu.cgpa ?? "",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditEdu({});
  };

  const saveEdu = async (id: string) => {
    if (!editEdu.degree?.trim() || !editEdu.institution?.trim())
      return notify("Degree and institution are required", "error");
    try {
      await updateDoc(doc(db, "education", id), {
        degree: editEdu.degree,
        institution: editEdu.institution,
        graduationDate: editEdu.graduationDate ?? "",
        cgpa: editEdu.cgpa ?? "",
        updatedAt: serverTimestamp(),
      });
      cancelEdit();
      fetchEducation();
      revalidatePortfolioWithNotify(notify, "Education updated successfully");
    } catch (err) {
      console.error("Failed to update education:", err);
      notify("Failed to update education", "error");
    }
  };

  const deleteEdu = async (id: string) => {
    setConfirmDialog({
      message: "Are you sure you want to delete this education record? This cannot be undone.",
      onConfirm: async () => {
        try {
          await deleteDoc(doc(db, "education", id));
          fetchEducation();
          revalidatePortfolioWithNotify(notify, "Education deleted");
        } catch (err) {
          console.error("Failed to delete education:", err);
          notify("Failed to delete education", "error");
        }
        setConfirmDialog(null);
      },
    });
  };

  if (loading && education.length === 0) return <LoadingDots />;

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="bg-card/70 border border-border/60 rounded-2xl p-6 backdrop-blur-xl">
        <h2 className="text-base font-bold text-foreground mb-5">Add New Education</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Degree *">
            <input className={inputCls} placeholder="e.g. BS Computer Science"
              value={newEdu.degree}
              onChange={e => setNewEdu({ ...newEdu, degree: e.target.value })} />
          </Field>
          <Field label="Institution *">
            <input className={inputCls} placeholder="e.g. Government College University Faisalabad"
              value={newEdu.institution}
              onChange={e => setNewEdu({ ...newEdu, institution: e.target.value })} />
          </Field>
          <Field label="Graduation Date">
            <input className={inputCls} placeholder="e.g. June 2026"
              value={newEdu.graduationDate}
              onChange={e => setNewEdu({ ...newEdu, graduationDate: e.target.value })} />
          </Field>
          <Field label="CGPA">
            <input className={inputCls} placeholder="e.g. 3.19 / 4.00"
              value={newEdu.cgpa}
              onChange={e => setNewEdu({ ...newEdu, cgpa: e.target.value })} />
          </Field>
        </div>
        <button onClick={addEdu}
          className="mt-5 px-6 py-2.5 bg-primary hover:bg-primary/90 text-slate-950 font-bold rounded-xl text-sm transition-colors">
          + Add Education
        </button>
      </div>

      <div className="bg-card/70 border border-border/60 rounded-2xl p-6 backdrop-blur-xl">
        <h2 className="text-base font-bold text-foreground mb-5">
          Manage Education
          <span className="ml-2 text-xs font-normal text-muted-foreground">({education.length})</span>
        </h2>
        {education.length === 0 ? (
          <EmptyState title="No education records yet." />
        ) : (
          <div className="space-y-3">
            {education.map(edu => (
              <div key={edu.id} className="bg-card/60 rounded-xl border border-border/60 overflow-hidden">
                {editingId !== edu.id ? (
                  <div className="flex items-center justify-between px-4 py-3 gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{edu.degree}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {edu.institution}
                        {edu.graduationDate && <span className="ml-2 text-muted-foreground/70">{edu.graduationDate}</span>}
                        {edu.cgpa && <span className="ml-2 text-muted-foreground/70">{edu.cgpa}</span>}
                      </p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <EditBtn onClick={() => startEdit(edu)} />
                      <DeleteBtn onClick={() => deleteEdu(edu.id)} />
                    </div>
                  </div>
                ) : (
                  <div className="p-4 border-t border-primary/30 bg-muted/40">
                    <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-4">
                      Editing: {edu.degree}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <Field label="Degree *">
                        <input className={inputCls} value={editEdu.degree ?? ""}
                          onChange={e => setEditEdu({ ...editEdu, degree: e.target.value })} />
                      </Field>
                      <Field label="Institution *">
                        <input className={inputCls} value={editEdu.institution ?? ""}
                          onChange={e => setEditEdu({ ...editEdu, institution: e.target.value })} />
                      </Field>
                      <Field label="Graduation Date">
                        <input className={inputCls} value={editEdu.graduationDate ?? ""}
                          onChange={e => setEditEdu({ ...editEdu, graduationDate: e.target.value })} />
                      </Field>
                      <Field label="CGPA">
                        <input className={inputCls} value={editEdu.cgpa ?? ""}
                          onChange={e => setEditEdu({ ...editEdu, cgpa: e.target.value })} />
                      </Field>
                    </div>
                    <div className="flex gap-2">
                      <SaveBtn onClick={() => saveEdu(edu.id)} />
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

export default memo(Education);