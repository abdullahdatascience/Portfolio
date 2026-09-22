import React, { useState, useEffect, useCallback, memo } from "react";
import { motion } from "framer-motion";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { ProfileData } from "./types";
import { Field, inputCls, LoadingDots } from "./Common";
import { revalidatePortfolioWithNotify } from "../utils/revalidatePortfolio";

interface ProfileSettingsProps {
  notify: (text: string, type: "success" | "error") => void;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ notify }) => {
  const [profile, setProfile] = useState<ProfileData>({
    heroTitle: "Muhammad Abdullah",
    heroTagline: "Software Engineer | Data & Machine Learning",
    aboutTitle: "Software Engineering + Data & ML",
    aboutBio: "BS Computer Science graduate from Government College University Faisalabad. I build full-stack applications with React, TypeScript, and FastAPI, and work with data end to end \u2014 SQL, analysis, visualization, and applied machine learning.\n\nMy strengths sit at the intersection of software engineering and data: turning requirements into working systems, and turning raw data into reliable models and reports.",
    typewriter: ["A Computer Science graduate who builds practical software systems and applies data and machine learning where it matters."],
  });
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    try {
      const d = await getDoc(doc(db, "settings", "profile"));
      if (d.exists()) {
        const data = d.data();
        setProfile((prev) => ({
          heroTitle:       data.heroTitle       ?? prev.heroTitle,
          heroTagline:     data.heroTagline     ?? prev.heroTagline,
          aboutTitle:      data.aboutTitle      ?? prev.aboutTitle,
          aboutBio:        data.aboutBio        ?? prev.aboutBio,
          typewriter:      Array.isArray(data.typewriter) ? data.typewriter : prev.typewriter,
        }));
      }
    } catch (err) {
      notify("Failed to fetch profile", "error");
    } finally {
      setLoading(false);
    }
  }, [notify]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const typewriterText = (profile.typewriter ?? []).join("\n");

  const saveProfileData = async () => {
    if (!profile.heroTitle.trim()) return notify("Hero name is required", "error");
    if (!profile.aboutTitle.trim()) return notify("About section title is required", "error");
    if (!profile.aboutBio.trim()) return notify("About bio is required", "error");
    const typewriter = typewriterText.split("\n").map(l => l.trim()).filter(Boolean);
    try {
      // setDoc(..., { merge: true }) prevents wiping fields not edited here
      // (e.g. legacy/extra settings fields) by merging instead of overwriting.
      await setDoc(
        doc(db, "settings", "profile"),
        {
          ...profile,
          typewriter: typewriter.length > 0 ? typewriter : [profile.heroTagline],
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
      revalidatePortfolioWithNotify(notify, "Profile updated successfully");
    } catch (err) {
      console.error("Failed to update profile:", err);
      notify("Failed to update profile", "error");
    }
  };

  if (loading) return <LoadingDots />;

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-2xl">
      <div className="bg-card/70 border border-border/60 rounded-2xl p-6 backdrop-blur-xl">
        <h2 className="text-base font-bold text-foreground mb-6">Profile & Hero Settings</h2>

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Hero Name (First + Last)">
              <input className={inputCls} value={profile.heroTitle}
                     onChange={e => setProfile({ ...profile, heroTitle: e.target.value })} />
            </Field>
            <Field label="Hero Tagline (Typewriter)">
              <input className={inputCls} value={profile.heroTagline}
                     onChange={e => setProfile({ ...profile, heroTagline: e.target.value })} />
            </Field>
          </div>

          <Field label="Typewriter Lines (One Per Line)">
            <textarea className={`${inputCls} min-h-[90px] resize-y`} value={typewriterText}
              onChange={e => setProfile({ ...profile, typewriter: e.target.value.split("\n") })}
              placeholder={"A Computer Science graduate who builds practical software systems and applies data and machine learning where it matters."} />
            <p className="text-[10px] text-muted-foreground mt-1">The first line is shown as the hero subtitle on the public site.</p>
          </Field>

          <Field label="About Section Title">
            <input className={inputCls} value={profile.aboutTitle}
                   onChange={e => setProfile({ ...profile, aboutTitle: e.target.value })} />
          </Field>

          <Field label="About Bio (Detailed Story)">
            <textarea className={`${inputCls} h-32 resize-none`} value={profile.aboutBio}
                      onChange={e => setProfile({ ...profile, aboutBio: e.target.value })} />
          </Field>

          <button onClick={saveProfileData}
            className="mt-4 w-full px-6 py-3 bg-primary hover:bg-primary/90 text-slate-950 font-bold rounded-xl transition-all duration-300 shadow-lg shadow-primary/20">
            Save Profile Changes
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default memo(ProfileSettings);