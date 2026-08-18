export interface NavLink {
  label: string;
  href: string;
  /** If true, this is a full page navigation (not an anchor on the home page) */
  isPage?: boolean;
}

export const navLinks: NavLink[] = [
  { label: "Perfil Profesional", href: "/dev/perfil-profesional", isPage: true },
  { label: "Servicios", href: "/dev#specialties" },
  { label: "Experiencia", href: "/dev#experience" },
  { label: "Herramientas", href: "/dev#tech-stack" },
  { label: "Formación", href: "/dev/formacion", isPage: true },
  { label: "Contacto", href: "/dev/contacto", isPage: true },
];