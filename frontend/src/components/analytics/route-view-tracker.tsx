"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { track } from "@/lib/analytics/tracker";

/**
 * Fires a `page_view` event on every pathname change. Mounted once in the
 * root layout. Admin traffic is excluded — the owner's own browsing must
 * never pollute the stats.
 */
export function RouteViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;
    track("page_view", { page: pathname });
  }, [pathname]);

  return null;
}
