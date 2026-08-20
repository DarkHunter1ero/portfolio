import { HeroSection } from "@/components/sections/hero/hero-section";
import { SpecialtiesSection } from "@/components/sections/specialties/specialties-section";
import { TechStackSection } from "@/components/sections/tech-stack/tech-stack-section";
import { specialties } from "@/data/soporte/specialties";
import { techStack } from "@/data/soporte/tech-stack";

export default async function SoportePage() {
  return (
    <>
      <HeroSection workingImage="/images/working_on_TI_sopport.jpg" />
      <SpecialtiesSection items={specialties} />
      <TechStackSection categories={techStack} />
    </>
  );
}
