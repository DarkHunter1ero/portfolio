import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin({
  requestConfig: "./src/i18n/request.ts",
});

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 768, 1024, 1280, 1536],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "@radix-ui/react-dialog"],
  },
  // Permanent 301 redirects from the legacy dev URLs (served at the root
  // before the /dev rebase) to their new /dev/* homes. Edge-level redirects
  // run BEFORE middleware, so these resolve without being labelled
  // x-portfolio-route. The root "/" is intentionally NOT redirected — it
  // serves the landing chooser.
  async redirects() {
    return [
      {
        source: "/projects/:slug*",
        destination: "/dev/projects/:slug*",
        permanent: true,
      },
      {
        source: "/companies/:company*",
        destination: "/dev/companies/:company*",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
