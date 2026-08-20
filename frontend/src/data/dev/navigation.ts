export interface NavLink {
  label: string;
  href: string;
  /** If true, this is a full page navigation (not an anchor on the home page) */
  isPage?: boolean;
}

export const navLinks: NavLink[] = [
  { label: "Perfil Profesional", href: "/developer/professional-profile", isPage: true },
  { label: "Servicios", href: "/developer#specialties" },
  { label: "Experiencia", href: "/developer#experience" },
  { label: "Herramientas", href: "/developer#tech-stack" },
  { label: "Formación", href: "/developer/education", isPage: true },
  { label: "Contacto", href: "/developer/contact", isPage: true },
];
