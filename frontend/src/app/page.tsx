import { HeroSection } from "@/components/sections/hero/hero-section";
import { ProfessionalProfileSection } from "@/components/sections/professional-profile/professional-profile-section";
import { SpecialtiesSection } from "@/components/sections/specialties/specialties-section";
import { ExperienceSection } from "@/components/sections/experience/experience-section";
import { TechStackSection } from "@/components/sections/tech-stack/tech-stack-section";
import { EducationSection } from "@/components/sections/education/education-section";
import { ContactSection } from "@/components/sections/contact/contact-section";

export const revalidate = 3600;

export default async function HomePage() {
  return (
    <>
      <HeroSection />
      <ProfessionalProfileSection />
      <SpecialtiesSection />
      <ExperienceSection />
      <TechStackSection />
      <EducationSection />
      <ContactSection />
    </>
  );
}
