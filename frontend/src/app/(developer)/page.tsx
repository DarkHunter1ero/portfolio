import { HeroSection } from "@/components/sections/hero/hero-section";
import { ProjectsSection } from "@/components/sections/projects/projects-section";
import { SpecialtiesSection } from "@/components/sections/specialties/specialties-section";
import { TechStackSection } from "@/components/sections/tech-stack/tech-stack-section";

export default async function HomePage() {
  return (
    <>
      <HeroSection />
      <ProjectsSection />
      <SpecialtiesSection />
      <TechStackSection />
    </>
  );
}