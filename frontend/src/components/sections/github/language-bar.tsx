"use client";

import { motion, useReducedMotion } from "motion/react";

interface LanguageBarProps {
  languages: Record<string, number>;
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f7df1e",
  Java: "#b07219",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  SCSS: "#c6538c",
  Shell: "#89e051",
  Dockerfile: "#384d54",
  default: "#6e7681",
};

export function LanguageBar({ languages }: LanguageBarProps) {
  const prefersReduced = useReducedMotion();
  const total = Object.values(languages).reduce((a, b) => a + b, 0);

  if (total === 0) return null;

  return (
    <div className="flex h-1.5 rounded-full overflow-hidden bg-secondary/50">
      {Object.entries(languages)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([lang, bytes]) => {
          const pct = (bytes / total) * 100;
          if (pct < 2) return null;

          if (prefersReduced) {
            return (
              <div
                key={lang}
                className="h-full first:rounded-l-full last:rounded-r-full"
                style={{
                  width: `${pct}%`,
                  backgroundColor:
                    LANGUAGE_COLORS[lang] ?? LANGUAGE_COLORS.default,
                }}
                title={`${lang}: ${Math.round(pct)}%`}
              />
            );
          }

          return (
            <motion.div
              key={lang}
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-full first:rounded-l-full last:rounded-r-full"
              style={{
                backgroundColor:
                  LANGUAGE_COLORS[lang] ?? LANGUAGE_COLORS.default,
              }}
              title={`${lang}: ${Math.round(pct)}%`}
            />
          );
        })}
    </div>
  );
}
