"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "motion/react";
import type { ArchitectureDiagram } from "@/types";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

const MermaidDiagram = dynamic(
  () => import("./mermaid-diagram").then((mod) => mod.MermaidDiagram),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full min-h-[400px] rounded-2xl" />,
  }
);

interface DiagramTabsProps {
  diagrams: ArchitectureDiagram[];
}

export function DiagramTabs({ diagrams }: DiagramTabsProps) {
  const [activeTab, setActiveTab] = useState(diagrams[0]?.id ?? "");
  const t = useTranslations("Architecture.diagrams");

  const activeDiagram = diagrams.find((d) => d.id === activeTab) ?? diagrams[0];

  const translatedLabel = (id: string) => {
    try {
      return t(`${id}.label`);
    } catch {
      return diagrams.find((d) => d.id === id)?.label ?? id;
    }
  };

  const translatedDescription = (id: string) => {
    try {
      return t(`${id}.description`);
    } catch {
      return diagrams.find((d) => d.id === id)?.description ?? "";
    }
  };

  return (
    <div className="mt-16">
      {/* Tab buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {diagrams.map((diagram) => (
          <button
            key={diagram.id}
            onClick={() => setActiveTab(diagram.id)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border",
              activeTab === diagram.id
                ? "bg-accent/10 text-accent border-accent/50"
                : "text-muted-foreground border-border hover:text-foreground hover:border-muted-foreground/30"
            )}
          >
            {translatedLabel(diagram.id)}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeDiagram.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <p className="text-sm text-muted-foreground text-center mb-6 max-w-2xl mx-auto">
            {translatedDescription(activeDiagram.id)}
          </p>

          <MermaidDiagram code={activeDiagram.mermaidCode} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
