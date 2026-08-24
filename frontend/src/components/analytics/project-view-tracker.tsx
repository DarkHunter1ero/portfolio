"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics/tracker";

interface ProjectViewTrackerProps {
  slug: string;
}

/**
 * Fires a `project_view` event with metadata `{ slug }` when a project
 * detail page is viewed. Rendered by /projects/[slug].
 */
export function ProjectViewTracker({ slug }: ProjectViewTrackerProps) {
  useEffect(() => {
    track("project_view", { page: `/projects/${slug}`, metadata: { slug } });
  }, [slug]);

  return null;
}
