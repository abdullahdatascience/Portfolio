import React, { useState, useEffect, useCallback, memo } from "react";
import { motion } from "framer-motion";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { Project } from "./types";
import { Field, inputCls, selectCls, SaveBtn, CancelBtn, EditBtn, DeleteBtn, LoadingDots, EmptyState } from "./Common";
import { normalizeToolName, normalizeProjectTitle, normalizeProjectSummary, isSafeUrl } from "../utils/normalize";

interface ProjectsProps {
  notify: (text: string, type: "success" | "error") => void;
  setConfirmDialog: (dialog: { message: string; onConfirm: () => void } | null) => void;
}

const themeColors = ["teal", "violet", "rose", "blue", "amber"];

const Projects: React.FC<ProjectsProps> = ({ notify, setConfirmDialog }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editProject, setEditProject] = useState<Partial<Project>>({});
  const [newProject, setNewProject] = useState<Omit<Project, "id">>({
    title: "", description: "", summary: "", tools: [], themeColor: "emerald", image: "", link: "", featured: false
  });
  const [toolInput, setToolInput] = useState("");
  const [editToolInput, setEditToolInput] = useState("");

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const s = await getDocs(collection(db, "projects"));
      setProjects(s.docs.map(d => ({ id: d.id, ...d.data() } as Project)));
    } catch (err) {
      notify("Failed to fetch projects", "error");
    } finally {
      setLoading(false);
    }
  }, [notify]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const addToolTag = () => {
    const t = toolInput.trim();
    const normalized = normalizeToolName(t);
    if (t && !(newProject.tools ?? []).some(tool => normalizeToolName(tool) === normalized)) {
      setNewProject({ ...newProject, tools: [...(newProject.tools ?? []), normalized] });
    }
    setToolInput("");
  };

  const removeToolTag = (tool: string) =>
    setNewProject({ ...newProject, tools: newProject.tools?.filter(t => t !== tool) });

  const addEditToolTag = () => {
    const t = editToolInput.trim();
    const normalized = normalizeToolName(t);
    if (t && !(editProject.tools ?? []).some(tool => normalizeToolName(tool) === normalized)) {
      setEditProject({ ...editProject, tools: [...(editProject.tools ?? []), normalized] });
    }
    setEditToolInput("");
  };

  const removeEditToolTag = (tool: string) =>
    setEditProject({ ...editProject, tools: editProject.tools?.filter(t => t !== tool) });

  const addProject = async () => {
    if (!newProject.title.trim()) return notify("Project title is required", "error");
    if (newProject.image && !isSafeUrl(newProject.image)) return notify("Image URL must start with http(s)://", "error");
    if (newProject.link && !isSafeUrl(newProject.link)) return notify("Project link must start with http(s)://", "error");
    const normalizedTitle = normalizeProjectTitle(newProject.title);
    const clean = {
      title: normalizedTitle,
      description: newProject.description,
      summary: normalizeProjectSummary(newProject.summary ?? "", normalizedTitle),
      tools: (newProject.tools ?? []).map(normalizeToolName),
      themeColor: newProject.themeColor,
      image: newProject.image,
      link: newProject.link,
      featured: newProject.featured ?? false,
    };
    try {
      await addDoc(collection(db, "projects"), { ...clean, createdAt: serverTimestamp() });
      setNewProject({ title: "", description: "", summary: "", tools: [], themeColor: "emerald", image: "", link: "", featured: false });
      setToolInput("");
      fetchProjects();
      notify("Project added successfully", "success");
    } catch { notify("Failed to add project", "error"); }
  };

  const startEditProject = (project: Project) => {
    setEditingId(project.id);
    setEditProject({
      title: project.title,
      description: project.description,
      summary: project.summary ?? "",
      tools: project.tools ?? [],
      themeColor: project.themeColor ?? "emerald",
      image: project.image ?? "",
      link: project.link ?? "",
      featured: project.featured ?? false,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditProject({});
    setEditToolInput("");
  };

  const saveProject = async (id: string) => {
    if (!editProject.title?.trim()) return notify("Project title is required", "error");
    if (editProject.image && !isSafeUrl(editProject.image)) return notify("Image URL must start with http(s)://", "error");
    if (editProject.link && !isSafeUrl(editProject.link)) return notify("Project link must start with http(s)://", "error");
    const normalizedTitle = normalizeProjectTitle(editProject.title ?? "");
    try {
      await updateDoc(doc(db, "projects", id), {
        title: normalizedTitle,
        description: editProject.description ?? "",
        summary: normalizeProjectSummary(editProject.summary ?? "", normalizedTitle),
        tools: (editProject.tools ?? []).map(normalizeToolName),
        themeColor: editProject.themeColor ?? "emerald",
        image: editProject.image ?? "",
        link: editProject.link ?? "",
        featured: editProject.featured ?? false,
        updatedAt: serverTimestamp(),
      });
      cancelEdit();
      fetchProjects();
      notify("Project updated successfully", "success");
    } catch { notify("Failed to update project", "error"); }
  };

  const deleteProject = async (id: string) => {
    setConfirmDialog({
      message: "Are you sure you want to delete this project? This cannot be undone.",
      onConfirm: async () => {
        try {
          await deleteDoc(doc(db, "projects", id));
          fetchProjects();
          notify("Project deleted", "success");
        } catch { notify("Failed to delete project", "error"); }
        setConfirmDialog(null);
      },
    });
  };

  if (loading && projects.length === 0) return <LoadingDots />;

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="bg-card/70 border border-border/60 rounded-2xl p-6 backdrop-blur-xl">
        <h2 className="text-base font-bold text-foreground mb-5">Add New Project</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <Field label="Title">
            <input className={inputCls} placeholder="Project title"
              value={newProject.title}
              onChange={e => setNewProject({ ...newProject, title: e.target.value })} />
          </Field>
          <Field label="Theme Color">
            <select className={selectCls} value={newProject.themeColor}
              onChange={e => setNewProject({ ...newProject, themeColor: e.target.value })}>
              <option value="emerald">Emerald</option>
              {themeColors.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Short Summary (shown on card)">
            <input className={inputCls} placeholder="One-line summary"
              value={newProject.summary}
              onChange={e => setNewProject({ ...newProject, summary: e.target.value })} />
          </Field>
          <Field label="Image URL (optional)">
            <input className={inputCls} placeholder="https://..."
              value={newProject.image}
              onChange={e => setNewProject({ ...newProject, image: e.target.value })} />
          </Field>
          <Field label="Project Link (optional)">
            <input className={inputCls} placeholder="https://..."
              value={newProject.link}
              onChange={e => setNewProject({ ...newProject, link: e.target.value })} />
          </Field>
          <Field label="Featured">
            <label className="flex items-center gap-2 mt-1 cursor-pointer select-none">
              <input type="checkbox"
                checked={newProject.featured ?? false}
                onChange={e => setNewProject({ ...newProject, featured: e.target.checked })}
                className="w-4 h-4 accent-teal-400" />
              <span className="text-sm text-muted-foreground">Show as the wide showcase project</span>
            </label>
          </Field>
        </div>
        <Field label="Full Description (shown on expand)">
          <textarea className={`${inputCls} resize-none`} rows={3} placeholder="Detailed description..."
            value={newProject.description}
            onChange={e => setNewProject({ ...newProject, description: e.target.value })} />
        </Field>
        <div className="mt-4">
          <Field label="Tools / Technologies">
            <div className="flex gap-2">
              <input className={inputCls} placeholder="e.g. Python — press Enter to add"
                value={toolInput}
                onChange={e => setToolInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addToolTag(); } }} />
              <button onClick={addToolTag}
                className="px-4 py-2.5 bg-muted/60 hover:bg-muted text-foreground rounded-xl text-sm font-medium transition-colors flex-shrink-0">
                Add
              </button>
            </div>
            {(newProject.tools ?? []).length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {newProject.tools?.map(t => (
                  <span key={t} className="flex items-center gap-1.5 bg-muted/60 text-primary text-xs font-medium px-3 py-1 rounded-full border border-border">
                    {t}
                    <button onClick={() => removeToolTag(t)} aria-label={`Remove ${t}`} className="text-muted-foreground hover:text-red-400 transition-colors">×</button>
                  </span>
                ))}
              </div>
            )}
          </Field>
        </div>
        <button onClick={addProject}
          className="mt-5 w-full sm:w-auto px-6 py-2.5 bg-primary hover:bg-primary/90 text-slate-950 font-bold rounded-xl text-sm transition-colors">
          + Add Project
        </button>
      </div>

      <div className="bg-card/70 border border-border/60 rounded-2xl p-6 backdrop-blur-xl">
        <h2 className="text-base font-bold text-foreground mb-5">
          Manage Projects
          <span className="ml-2 text-xs font-normal text-muted-foreground">({projects.length})</span>
        </h2>

        {projects.length === 0 ? (
          <EmptyState title="No projects yet." description="Add your first project above to populate the public Projects section." />
        ) : (
          <div className="space-y-3">
            {projects.map(project => (
              <div key={project.id} className="bg-card/60 rounded-xl border border-border/60 overflow-hidden">
                {editingId !== project.id ? (
                  <div className="flex items-start justify-between px-4 py-3 gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">
                        {project.title}
                        {project.featured && (
                          <span className="ml-2 align-middle inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full px-2 py-0.5">
                            ★ Featured
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{project.summary || project.description}</p>
                      {(project.tools ?? []).length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {project.tools?.slice(0, 4).map(t => (
                            <span key={t} className="text-xs bg-muted/50 text-muted-foreground px-2 py-0.5 rounded-full">{t}</span>
                          ))}
                          {(project.tools?.length ?? 0) > 4 && (
                            <span className="text-xs text-muted-foreground">+{(project.tools?.length ?? 0) - 4} more</span>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <EditBtn onClick={() => startEditProject(project)} />
                      <DeleteBtn onClick={() => deleteProject(project.id)} />
                    </div>
                  </div>
                ) : (
                  <div className="p-4 border-t border-primary/30 bg-muted/40">
                    <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-4">
                      Editing: {project.title}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <Field label="Title">
                        <input className={inputCls} value={editProject.title ?? ""}
                          onChange={e => setEditProject({ ...editProject, title: e.target.value })} />
                      </Field>
                      <Field label="Theme Color">
                        <select className={selectCls} value={editProject.themeColor ?? "emerald"}
                          onChange={e => setEditProject({ ...editProject, themeColor: e.target.value })}>
                          <option value="emerald">Emerald</option>
                          {themeColors.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </Field>
                      <Field label="Short Summary">
                        <input className={inputCls} value={editProject.summary ?? ""}
                          onChange={e => setEditProject({ ...editProject, summary: e.target.value })} />
                      </Field>
                      <Field label="Image URL">
                        <input className={inputCls} value={editProject.image ?? ""}
                          onChange={e => setEditProject({ ...editProject, image: e.target.value })} />
                      </Field>
                      <Field label="Project Link">
                        <input className={inputCls} value={editProject.link ?? ""}
                          onChange={e => setEditProject({ ...editProject, link: e.target.value })} />
                      </Field>
                    </div>
                    <Field label="Featured">
                      <label className="flex items-center gap-2 mt-1 cursor-pointer select-none">
                        <input type="checkbox"
                          checked={editProject.featured ?? false}
                          onChange={e => setEditProject({ ...editProject, featured: e.target.checked })}
                          className="w-4 h-4 accent-teal-400" />
                        <span className="text-sm text-muted-foreground">Show as the wide showcase project</span>
                      </label>
                    </Field>
                    <Field label="Full Description">
                      <textarea className={`${inputCls} resize-none`} rows={3}
                        value={editProject.description ?? ""}
                        onChange={e => setEditProject({ ...editProject, description: e.target.value })} />
                    </Field>
                    <div className="mt-4">
                      <Field label="Tools">
                        <div className="flex gap-2">
                          <input className={inputCls} placeholder="Add tool — press Enter"
                            value={editToolInput}
                            onChange={e => setEditToolInput(e.target.value)}
                            onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addEditToolTag(); } }} />
                          <button onClick={addEditToolTag}
                            className="px-4 py-2.5 bg-muted/60 hover:bg-muted text-foreground rounded-xl text-sm font-medium transition-colors flex-shrink-0">
                            Add
                          </button>
                        </div>
                        {(editProject.tools ?? []).length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {editProject.tools?.map(t => (
                              <span key={t} className="flex items-center gap-1.5 bg-muted/60 text-primary text-xs font-medium px-3 py-1 rounded-full border border-border">
                                {t}
                                <button onClick={() => removeEditToolTag(t)} aria-label={`Remove ${t}`} className="text-muted-foreground hover:text-red-400 transition-colors">×</button>
                              </span>
                            ))}
                          </div>
                        )}
                      </Field>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <SaveBtn onClick={() => saveProject(project.id)} />
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

export default memo(Projects);