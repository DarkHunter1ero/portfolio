"use client";

/**
 * Hero ambient background: subtle blue radial pulses for depth. The base
 * color behind them is set by HeroSection (it matches the working photo's
 * edge color so the masked photo dissolves into it).
 */
export function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0" aria-hidden="true">
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(37, 99, 235, 0.15) 0%, transparent 60%)",
          animation: "pulseOpacity 8s ease-in-out infinite alternate",
        }}
      />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(37, 99, 235, 0.08) 0%, transparent 70%)",
          animation: "pulseOpacitySlow 12s ease-in-out infinite alternate",
        }}
      />
    </div>
  );
}
