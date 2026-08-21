import { Header } from "./header";
import { Footer } from "./footer";

// Shared layout for global detail pages (/companies/* and /projects/*).
// These pages belong to no single portfolio, so they render the standard
// header/footer chrome without a portfolio-scoped message provider (the
// root layout + middleware already resolve the dev messages for them).
export function DetailLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
