import { getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/shared/section-heading";
import { Container } from "@/components/shared/container";
import { ContactForm } from "./contact-form";
import { profile } from "@/data/profile";
import { Mail, MapPin, Linkedin, Github } from "lucide-react";

interface ContactInfoItemProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
}

function ContactInfoItem({ icon: Icon, label, value, href }: ContactInfoItemProps) {
  const content = (
    <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-card/50 transition-colors">
      <div className="p-2 rounded-lg bg-accent/10 text-accent shrink-0">
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
        <p className="text-sm font-medium text-foreground truncate">{value}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {content}
      </a>
    );
  }

  return content;
}

export async function ContactSection() {
  const t = await getTranslations("Contact");

  return (
    <section
      id="contact"
      className="py-24 sm:py-32"
      aria-labelledby="contact-heading"
    >
      <Container>
        <SectionHeading
          id="contact-heading"
          title={t("heading")}
          subtitle={t("subheading")}
        />

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left: contact info */}
          <div className="lg:col-span-2 space-y-2">
            <ContactInfoItem
              icon={Mail}
              label={t("emailLabel")}
              value={profile.email}
              href={`mailto:${profile.email}`}
            />
            <ContactInfoItem
              icon={Linkedin}
              label={t("linkedinLabel")}
              value="Diego Silva"
              href={profile.linkedin}
            />
            <ContactInfoItem
              icon={Github}
              label={t("githubLabel")}
              value="DarkHunter1ero"
              href={profile.github}
            />
            <ContactInfoItem
              icon={MapPin}
              label={t("locationLabel")}
              value={t("locationValue")}
            />
          </div>

          {/* Right: form */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
