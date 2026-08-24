import type { Metadata } from "next";

/**
 * Admin area layout. Server component so the (client) admin pages can still
 * get route metadata — client components cannot export `metadata`.
 * Personal admin tool: English-only, always noindex.
 */
export const metadata: Metadata = {
  title: "Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-background">{children}</div>;
}
