import type { TechCategory } from "@/types";

export const techStack: TechCategory[] = [
  {
    name: "Backend",
    icon: "Server",
    skills: [
      { name: "Java", level: 5 },
      { name: "Spring Boot", level: 5 },
      { name: "Spring Security", level: 5 },
      { name: "Hibernate / JPA", level: 4 },
      { name: "Maven", level: 4 },
      { name: "Gradle", level: 3 },
      { name: "REST API Design", level: 5 },
      { name: "Microservices", level: 4 },
    ],
  },
  {
    name: "Frontend",
    icon: "Layout",
    skills: [
      { name: "React", level: 4 },
      { name: "Angular", level: 4 },
      { name: "TypeScript", level: 4 },
      { name: "JavaScript", level: 5 },
      { name: "HTML / CSS", level: 4 },
      { name: "Thymeleaf", level: 3 },
    ],
  },
  {
    name: "Databases",
    icon: "Database",
    skills: [
      { name: "PostgreSQL", level: 5 },
      { name: "MySQL", level: 4 },
      { name: "Database Design", level: 4 },
      { name: "Query Optimization", level: 4 },
    ],
  },
  {
    name: "DevOps & Infrastructure",
    icon: "Container",
    skills: [
      { name: "Docker", level: 4 },
      { name: "Jenkins", level: 4 },
      { name: "Git / GitLab", level: 5 },
      { name: "CI/CD Pipelines", level: 4 },
      { name: "WildFly / Tomcat", level: 4 },
      { name: "Linux", level: 4 },
    ],
  },
  {
    name: "Security",
    icon: "Shield",
    skills: [
      { name: "OAuth2 / JWT", level: 5 },
      { name: "Digital Certificates", level: 4 },
      { name: "HSM Integration", level: 4 },
      { name: "PKI", level: 4 },
      { name: "Electronic Signatures", level: 4 },
      { name: "Secure API Design", level: 5 },
    ],
  },
];
