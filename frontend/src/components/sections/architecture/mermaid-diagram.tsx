"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { AlertTriangle } from "lucide-react";

interface MermaidDiagramProps {
  code: string;
}

export function MermaidDiagram({ code }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const t = useTranslations("Architecture");

  useEffect(() => {
    let cancelled = false;

    async function render() {
      try {
        const mermaid = (await import("mermaid")).default;

        if (cancelled) return;

        mermaid.initialize({
          startOnLoad: false,
          theme: "dark",
          themeVariables: {
            primaryColor: "#2563eb",
            primaryTextColor: "#f0f0f5",
            primaryBorderColor: "#2a2a35",
            lineColor: "#2a2a35",
            secondaryColor: "#1a1a1f",
            tertiaryColor: "#0a0a0b",
            background: "#0a0a0b",
            mainBkg: "#1a1a1f",
            nodeBorder: "#2a2a35",
            clusterBkg: "#1a1a1f",
            clusterBorder: "#2a2a35",
            titleColor: "#f0f0f5",
            edgeLabelBackground: "#1a1a1f",
          },
        });

        if (containerRef.current) {
          // Clear previous render
          containerRef.current.innerHTML = "";

          const { svg } = await mermaid.render(`mermaid-${Date.now()}`, code);

          if (!cancelled) {
            containerRef.current.innerHTML = svg;
          }
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Rendering failed");
        }
      }
    }

    setError(null);
    render();

    return () => {
      cancelled = true;
    };
  }, [code]);

  if (error) {
    return (
      <div className="rounded-2xl border border-border bg-card p-8">
        <div className="flex items-center gap-3 mb-4 text-amber-400">
          <AlertTriangle className="h-5 w-5" />
          <span className="font-medium text-sm">{t("renderError")}</span>
        </div>
        <details className="mt-2">
          <summary className="text-xs text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
            {t("viewSource")}
          </summary>
          <pre className="mt-3 p-4 rounded-lg bg-secondary/50 text-xs font-[family-name:var(--font-mono)] text-muted-foreground overflow-x-auto">
            {code}
          </pre>
        </details>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label={t("diagramAlt")}
      className="rounded-2xl border border-border bg-card p-4 sm:p-6 overflow-x-auto flex justify-center"
    />
  );
}
