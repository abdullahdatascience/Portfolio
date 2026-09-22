import type { SimpleIcon } from "simple-icons";

type FileIcon = {
  title: string;
  hex: string;
  src: string;
};

type TextIcon = {
  title: string;
  hex: string;
  text: string;
};

type PathIcon = {
  title: string;
  hex: string;
  path: string;
};

type SkillIcon = {
  icon: SimpleIcon | FileIcon | TextIcon | PathIcon;
  aliases: string[];
};

import {
  siPython,
  siJavascript,
  siTypescript,
  siReact,
  siNextdotjs,
  siTailwindcss,
  siVite,
  siDocker,
  siGit,
  siGithub,
  siFirebase,
  siPostgresql,
  siMysql,
  siTensorflow,
  siPytorch,
  siKeras,
  siOpencv,
  siScikitlearn,
  siJupyter,
  siPandas,
  siNumpy,
  siApacheairflow,
  siApachespark,
  siApachehadoop,
  siApachekafka,
  siSnowflake,
  siGooglebigquery,
  siLooker,
  siFastapi,
  siR,
} from "simple-icons";

const SKILL_ICONS: SkillIcon[] = [
  { icon: siPython, aliases: ["python"] },
  { icon: siJavascript, aliases: ["javascript", "js"] },
  { icon: siTypescript, aliases: ["typescript", "ts"] },
  { icon: siReact, aliases: ["react"] },
  { icon: siNextdotjs, aliases: ["next.js", "nextjs", "next"] },
  { icon: siTailwindcss, aliases: ["tailwind css", "tailwindcss", "tailwind"] },
  { icon: siVite, aliases: ["vite"] },
  { icon: siDocker, aliases: ["docker"] },
  { icon: siGit, aliases: ["git"] },
  { icon: siGithub, aliases: ["github"] },
  { icon: siFirebase, aliases: ["firebase"] },
  { icon: siPostgresql, aliases: ["postgresql", "postgres"] },
  { icon: siMysql, aliases: ["mysql"] },
  { icon: siTensorflow, aliases: ["tensorflow"] },
  { icon: siPytorch, aliases: ["pytorch"] },
  { icon: siKeras, aliases: ["keras"] },
  { icon: siOpencv, aliases: ["opencv"] },
  { icon: siScikitlearn, aliases: ["scikit-learn", "scikit learn"] },
  { icon: siJupyter, aliases: ["jupyter", "jupyter notebook"] },
  { icon: siPandas, aliases: ["pandas"] },
  { icon: siNumpy, aliases: ["numpy"] },
  { icon: siApacheairflow, aliases: ["airflow", "apache airflow"] },
  { icon: siApachespark, aliases: ["spark", "pyspark", "apache spark"] },
  { icon: siApachehadoop, aliases: ["hadoop", "apache hadoop"] },
  { icon: siApachekafka, aliases: ["kafka", "apache kafka"] },
  { icon: siSnowflake, aliases: ["snowflake"] },
  { icon: siGooglebigquery, aliases: ["bigquery", "google bigquery"] },
  { icon: siLooker, aliases: ["looker", "looker studio"] },
  { icon: siFastapi, aliases: ["fastapi"] },
  { icon: siR, aliases: ["r", "r lang"] },
  {
    icon: {
      title: "Seaborn",
      hex: "5C7DA2",
      src: "/logos/seaborn.svg",
    },
    aliases: ["seaborn"],
  },
  {
    icon: {
      title: "Matplotlib",
      hex: "11557C",
      src: "/logos/matplotlib.svg",
    },
    aliases: ["matplotlib"],
  },
  {
    icon: {
      title: "Power BI",
      hex: "F6D751",
      src: "/logos/powerbi.svg",
    },
    aliases: ["power bi", "powerbi"],
  },
  {
    icon: {
      title: "Excel",
      hex: "107C41",
      src: "/logos/excel.svg",
    },
    aliases: ["excel"],
  },
  {
    icon: {
      title: "SQL",
      hex: "336791",
      path: "M12 2C6.48 2 2 3.34 2 5v14c0 1.66 4.48 3 10 3s10-1.34 10-3V5c0-1.66-4.48-3-10-3zm0 2c4.86 0 8 1.13 8 1.5S16.86 7 12 7 4 5.87 4 5.5 7.14 4 12 4zm8 15c0 .37-3.14 1.5-8 1.5s-8-1.13-8-1.5v-2.18c1.94 1.05 5.02 1.68 8 1.68s6.06-.63 8-1.68V19zm0-4c0 .37-3.14 1.5-8 1.5s-8-1.13-8-1.5v-2.18c1.94 1.05 5.02 1.68 8 1.68s6.06-.63 8-1.68V15zm0-4c0 .37-3.14 1.5-8 1.5s-8-1.13-8-1.5V8.82c1.94 1.05 5.02 1.68 8 1.68s6.06-.63 8-1.68V11z",
    },
    aliases: ["sql", "database"],
  },
  {
    icon: {
      title: "Natural Language Processing",
      hex: "3B82F6",
      path: "M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.2L4 17.2V4h16v12zM7 9h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z",
    },
    aliases: ["nlp", "natural language processing", "llm"],
  },
];

const skillIconMap = new Map<string, SimpleIcon | FileIcon | TextIcon | PathIcon>();

for (const entry of SKILL_ICONS) {
  for (const alias of entry.aliases) {
    skillIconMap.set(alias.toLowerCase().trim(), entry.icon);
  }
}

export function getSkillIcon(name: string): SimpleIcon | FileIcon | TextIcon | PathIcon | null {
  const key = name.toLowerCase().trim();
  return skillIconMap.get(key) ?? null;
}

export function SkillLogo({
  icon,
  className,
}: {
  icon: SimpleIcon | FileIcon | TextIcon | PathIcon;
  className?: string;
}) {
  const wrapperClass = className ?? "w-4 h-4 flex items-center justify-center flex-shrink-0 relative";

  if ("src" in icon && icon.src) {
    return (
      <span className={wrapperClass} aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={icon.src} alt={icon.title} className="w-full h-full object-contain" />
      </span>
    );
  }

  if ("text" in icon && icon.text) {
    return (
      <span className={wrapperClass} aria-hidden="true">
        <svg
          role="img"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          style={{ color: `#${icon.hex}` }}
        >
          <title>{icon.title}</title>
          <text x="12" y="16" textAnchor="middle" fontSize="7" fontWeight="bold" fill="currentColor" fontFamily="system-ui, sans-serif">
            {icon.text}
          </text>
        </svg>
      </span>
    );
  }

  const pathIcon = icon as SimpleIcon | PathIcon;
  return (
    <span className={wrapperClass} aria-hidden="true">
      <svg
        role="img"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        style={{ color: `#${pathIcon.hex}` }}
      >
        <title>{pathIcon.title}</title>
        <path d={pathIcon.path} fill="currentColor" />
      </svg>
    </span>
  );
}