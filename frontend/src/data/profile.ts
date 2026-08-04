import type { Profile } from "@/types";

export const profile: Profile = {
  name: "Diego Silva",
  title: "Senior Full Stack Developer",
  tagline:
    "I build secure, scalable and high-performance enterprise applications. Specialized in digital identity, authentication systems, and microservices architecture.",
  bio: [
    "I'm a Software Engineer with over six years of experience designing and delivering enterprise-grade applications. My focus has been on the intersection of security and scalability — building systems that handle millions of transactions while protecting sensitive data through digital signatures, certificate management, and multi-layered authentication.",
    "At ISA Interfase, I've led the development of digital identity platforms from the ground up. I architected authentication services powered by OAuth2 and JWT, integrated Hardware Security Modules for cryptographic operations, and designed REST APIs that serve thousands of concurrent users. The work involves deep understanding of PKI, certificate lifecycle management, and secure communication protocols — the kind of challenges where getting it wrong isn't an option.",
    "I'm equally comfortable on the frontend, building responsive interfaces with React and Angular that make complex security workflows intuitive for end users. My full-stack perspective means I design APIs with the UI in mind, and I build UIs that respect the constraints of distributed systems.",
    "Beyond the code, I care about developer experience and team efficiency. I've set up CI/CD pipelines with Jenkins and Docker that reduced deployment time by 70%, and I advocate for clean architecture patterns that make codebases maintainable as teams grow. Currently, I'm deepening my expertise in cloud infrastructure and distributed systems, with a long-term interest in game development as a creative outlet that sharpens my systems thinking.",
  ].join("\n\n"),
  github: "https://github.com/DarkHunter1ero",
  linkedin: "https://www.linkedin.com/in/diego-silva-b258ba17a/",
  email: "diego1silva2@gmail.com",
  location: "Remote — Latin America",
  photoUrl: "/images/yoCirculo.png",
  cvUrlEn: "/Diego_Silva_CV_EN.pdf",
  cvUrlEs: "/Diego_Silva_CV_ES.pdf",
};
