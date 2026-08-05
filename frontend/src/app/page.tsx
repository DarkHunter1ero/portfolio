import { HeroSection } from "@/components/sections/hero/hero-section";
import { ProfessionalProfileSection } from "@/components/sections/professional-profile/professional-profile-section";
import { AboutSection } from "@/components/sections/about/about-section";
import { TechStackSection } from "@/components/sections/tech-stack/tech-stack-section";
import { ExperienceSection } from "@/components/sections/experience/experience-section";
import { ArchitectureSection } from "@/components/sections/architecture/architecture-section";
import { GitHubSection } from "@/components/sections/github/github-section";
import { ContactSection } from "@/components/sections/contact/contact-section";

export const revalidate = 3600;

export default async function HomePage() {
  return (
    <>
      <HeroSection />
      <ProfessionalProfileSection />
      <AboutSection />
      <ExperienceSection />
      <TechStackSection />
      <ArchitectureSection />
      <GitHubSection />
      <ContactSection />
    </>
  );
}
