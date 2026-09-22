import React, { useState, useEffect, useCallback, memo } from "react";
import { motion } from "framer-motion";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { Certification } from "./types";
import { Field, inputCls, SaveBtn, CancelBtn, EditBtn, DeleteBtn, LoadingDots, EmptyState } from "./Common";
import { isSafeUrl } from "../utils/normalize";

interface CertificationsProps {
  notify: (text: string, type: "success" | "error") => void;
  setConfirmDialog: (dialog: { message: string; onConfirm: () => void } | null) => void;
}

const Certifications: React.FC<CertificationsProps> = ({ notify, setConfirmDialog }) => {
  const [certifications, setCerts] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editCert, setEditCert] = useState<Partial<Certification>>({});
  const [newCert, setNewCert] = useState<Omit<Certification, "id">>({
    title: "", issuer: "", badgeId: "", certificateUrl: "", issueDate: ""
  });

  const fetchCerts = useCallback(async () => {
    setLoading(true);
    try {
      const s = await getDocs(collection(db, "certifications"));
      setCerts(s.docs.map(d => ({ id: d.id, ...d.data() } as Certification)));
    } catch (err) {
      notify("Failed to fetch certifications", "error");
    } finally {
      setLoading(false);
    }
  }, [notify]);

  useEffect(() => {
    fetchCerts();
  }, [fetchCerts]);

  const addCert = async () => {
    if (!newCert.title.trim() || !newCert.issuer.trim())
      return notify("Title and issuer are required", "error");
    if (!(newCert.badgeId ?? "").trim() && !(newCert.certificateUrl ?? "").trim())
      return notify("Provide a Credly Badge ID or a Certification URL", "error");
    if ((newCert.certificateUrl ?? "").trim() && !isSafeUrl(newCert.certificateUrl ?? ""))
      return notify("Certification URL must start with http(s)://", "error");
    try {
      await addDoc(collection(db, "certifications"), { ...newCert, createdAt: serverTimestamp() });
      setNewCert({ title: "", issuer: "", badgeId: "", certificateUrl: "", issueDate: "" });
      fetchCerts();
      notify("Certification added successfully", "success");
    } catch { notify("Failed to add certification", "error"); }
  };

  const startEditCert = (cert: Certification) => {
    setEditingId(cert.id);
    setEditCert({
      title: cert.title,
      issuer: cert.issuer,
      badgeId: cert.badgeId ?? "",
      certificateUrl: cert.certificateUrl ?? "",
      issueDate: cert.issueDate ?? "",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditCert({});
  };

  const saveCert = async (id: string) => {
    if (!editCert.title?.trim() || !editCert.issuer?.trim())
      return notify("Title and issuer are required", "error");
    if (!(editCert.badgeId ?? "").trim() && !(editCert.certificateUrl ?? "").trim())
      return notify("Provide a Credly Badge ID or a Certification URL", "error");
    if ((editCert.certificateUrl ?? "").trim() && !isSafeUrl(editCert.certificateUrl ?? ""))
      return notify("Certification URL must start with http(s)://", "error");
    try {
      await updateDoc(doc(db, "certifications", id), {
        title: editCert.title,
        issuer: editCert.issuer,
        badgeId: editCert.badgeId ?? "",
        certificateUrl: editCert.certificateUrl ?? "",
        issueDate: editCert.issueDate ?? "",
        updatedAt: serverTimestamp(),
      });
      cancelEdit();
      fetchCerts();
      notify("Certification updated successfully", "success");
    } catch { notify("Failed to update certification", "error"); }
  };

  const deleteCert = async (id: string) => {
    setConfirmDialog({
      message: "Are you sure you want to delete this certification? This cannot be undone.",
      onConfirm: async () => {
        try {
          await deleteDoc(doc(db, "certifications", id));
          fetchCerts();
          notify("Certification deleted", "success");
        } catch { notify("Failed to delete certification", "error"); }
        setConfirmDialog(null);
      },
    });
  };

  if (loading && certifications.length === 0) return <LoadingDots />;

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="bg-card/70 border border-border/60 rounded-2xl p-6 backdrop-blur-xl">
        <h2 className="text-base font-bold text-foreground mb-5">Add New Certification</h2>
        <div className="mb-4 p-3 bg-muted/60 rounded-xl border border-primary/20">
          <p className="text-xs text-primary flex items-center gap-2">
            <span className="font-bold">&#9432;</span>
            <span>Provide a Credly Badge ID and/or the online link to the certification or badge.</span>
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Title *">
            <input className={inputCls} placeholder="e.g. AWS Solutions Architect"
              value={newCert.title}
              onChange={e => setNewCert({ ...newCert, title: e.target.value })} />
          </Field>
          <Field label="Issuer *">
            <input className={inputCls} placeholder="e.g. Amazon Web Services"
              value={newCert.issuer}
              onChange={e => setNewCert({ ...newCert, issuer: e.target.value })} />
          </Field>
          <Field label="Issue Date">
            <input className={inputCls} placeholder="e.g. February 7, 2026"
              value={newCert.issueDate}
              onChange={e => setNewCert({ ...newCert, issueDate: e.target.value })} />
          </Field>
          <div className="col-span-2">
            <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Certificate Media (provide at least one)</p>
          </div>
          <Field label="Credly Badge ID (optional)">
            <input className={inputCls} placeholder="e.g. 6f3a2c1d..."
              value={newCert.badgeId}
              onChange={e => setNewCert({ ...newCert, badgeId: e.target.value })} />
          </Field>
          <Field label="Certification URL (optional)">
            <input className={inputCls} placeholder="https://..."
              value={newCert.certificateUrl}
              onChange={e => setNewCert({ ...newCert, certificateUrl: e.target.value })} />
            <p className="text-[10px] text-muted-foreground mt-1">For Credly, Coursera, LinkedIn, Google Drive, etc.</p>
          </Field>
        </div>
        <button onClick={addCert}
          className="mt-5 w-full sm:w-auto px-6 py-2.5 bg-primary hover:bg-primary/90 text-slate-950 font-bold rounded-xl text-sm transition-colors">
          + Add Certification
        </button>
      </div>

      <div className="bg-card/70 border border-border/60 rounded-2xl p-6 backdrop-blur-xl">
        <h2 className="text-base font-bold text-foreground mb-5">
          Manage Certifications
          <span className="ml-2 text-xs font-normal text-muted-foreground">({certifications.length})</span>
        </h2>
        {certifications.length === 0 ? (
          <EmptyState title="No certifications yet." />
        ) : (
          <div className="space-y-3">
            {certifications.map(cert => (
              <div key={cert.id} className="bg-card/60 rounded-xl border border-border/60 overflow-hidden">
                {editingId !== cert.id ? (
                  <div className="flex items-center justify-between px-4 py-3 gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{cert.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {cert.issuer}
                        {cert.issueDate && <span className="ml-2 text-muted-foreground/70">{cert.issueDate}</span>}
                      </p>
                      <div className="flex gap-1 mt-1.5 flex-wrap">
                        {cert.badgeId && (
                          <span className="text-[10px] bg-teal-500/10 text-teal-400 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-teal-400 rounded-full" />Credly Badge
                          </span>
                        )}
                        {cert.certificateUrl && (
                          <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />Online Link
                          </span>
                        )}
                        {!cert.badgeId && !cert.certificateUrl && (
                          <span className="text-[10px] bg-muted/60 text-muted-foreground px-2 py-0.5 rounded-full">
                            No Media
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <EditBtn onClick={() => startEditCert(cert)} />
                      <DeleteBtn onClick={() => deleteCert(cert.id)} />
                    </div>
                  </div>
                ) : (
                  <div className="p-4 border-t border-primary/30 bg-muted/40">
                    <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-4">
                      Editing: {cert.title}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <Field label="Title *">
                        <input className={inputCls} value={editCert.title ?? ""}
                          onChange={e => setEditCert({ ...editCert, title: e.target.value })} />
                      </Field>
                      <Field label="Issuer *">
                        <input className={inputCls} value={editCert.issuer ?? ""}
                          onChange={e => setEditCert({ ...editCert, issuer: e.target.value })} />
                      </Field>
                      <Field label="Issue Date">
                        <input className={inputCls} value={editCert.issueDate ?? ""}
                          onChange={e => setEditCert({ ...editCert, issueDate: e.target.value })} />
                      </Field>
                      <Field label="Credly Badge ID">
                        <input className={inputCls} value={editCert.badgeId ?? ""}
                          onChange={e => setEditCert({ ...editCert, badgeId: e.target.value })} />
                      </Field>
                      <Field label="Certification URL">
                        <input className={inputCls} value={editCert.certificateUrl ?? ""}
                          onChange={e => setEditCert({ ...editCert, certificateUrl: e.target.value })} />
                      </Field>
                    </div>
                    <div className="flex gap-2">
                      <SaveBtn onClick={() => saveCert(cert.id)} />
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

export default memo(Certifications);