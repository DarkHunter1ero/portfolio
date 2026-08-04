// Animation presets for Framer Motion
// Enforce design constraints: y <= 24px, scale <= 1.02, no spring/bounce/rotate

export const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" as const },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.4, ease: "easeOut" as const },
};

export const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } },
};

export const cardHover = {
  whileHover: {
    scale: 1.02,
    y: -2,
    transition: { duration: 0.2, ease: "easeOut" as const },
  },
};

export const cardLift = {
  whileHover: {
    y: -4,
    boxShadow: "0 12px 40px rgba(0, 0, 0, 0.3)",
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
};

export const buttonTap = {
  whileTap: { scale: 0.98 },
};

// Reduced motion override — returns neutral animation values
export const prefersReducedMotion = {
  initial: { opacity: 1, y: 0 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0 },
};

// NEVER use: spring, bounce, rotate, y > 32px, duration > 0.6s
