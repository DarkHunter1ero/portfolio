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
  async rewrites() {
    // En producción (Vercel) no usamos rewrite: NEXT_PUBLIC_API_URL apunta al backend externo
    // En desarrollo local, nginx hace el proxy /api/* → backend:4000
    // Este rewrite solo aplica si se corre Next.js directo sin nginx (p.ej. `npm run dev` fuera de Docker)
    if (process.env.NODE_ENV === "production") {
      return [];
    }
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:4000/api/:path*",
      },
    ];
  },
};

export default withNextIntl(nextConfig);
