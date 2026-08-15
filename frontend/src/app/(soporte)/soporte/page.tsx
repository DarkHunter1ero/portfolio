import { HeroSection } from "@/components/sections/hero/hero-section";
import { SpecialtiesSection } from "@/components/sections/specialties/specialties-section";
import { ProfessionalProfileSection } from "@/components/sections/professional-profile/professional-profile-section";
import { ExperienceSection } from "@/components/sections/experience/experience-section";
import { TechStackSection } from "@/components/sections/tech-stack/tech-stack-section";
import { ContactSection } from "@/components/sections/contact/contact-section";
import { profile } from "@/data/soporte/profile";
import { specialties } from "@/data/soporte/specialties";
import { experience } from "@/data/soporte/experience";
import { techStack } from "@/data/soporte/tech-stack";
import { professionalProfileSummary } from "@/data/soporte/professional-profile";

export default async function SoportePage() {
  return (
    <>
      <HeroSection profile={profile} />
      <SpecialtiesSection items={specialties} />
      <ProfessionalProfileSection summary={professionalProfileSummary} />
      <ExperienceSection items={experience} />
      <TechStackSection categories={techStack} />
      <ContactSection />
    </>
  );
}
