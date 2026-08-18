import { cn } from "@/lib/utils";

type WaveColor = "dark" | "light";

interface WaveDividerProps {
  /** Background color the wave sits on (upper area). */
  from: WaveColor;
  /** Color the wave curves up into (lower area fill). */
  to: WaveColor;
  className?: string;
}

const bgClass: Record<WaveColor, string> = {
  dark: "bg-background",
  light: "bg-[#f8fafc]",
};

const fillColor: Record<WaveColor, string> = {
  // Matches --color-background (#09090b) from globals.css (Tailwind v4 token).
  dark: "#09090b",
  light: "#f8fafc",
};

/**
 * Gentle single-arc wave used to transition between the dark site chrome and
 * the light "projects" island. Renders a `from`-colored band whose bottom edge
 * is a curved `to`-colored fill, so the next section appears to rise into view.
 */
export function WaveDivider({ from, to, className }: WaveDividerProps) {
  return (
    <div className={cn("relative", bgClass[from], className)} aria-hidden="true">
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="block w-full h-16 sm:h-24"
        focusable="false"
      >
        <path
          d="M0,96 C360,16 1080,16 1440,96 L1440,120 L0,120 Z"
          fill={fillColor[to]}
        />
      </svg>
    </div>
  );
}
