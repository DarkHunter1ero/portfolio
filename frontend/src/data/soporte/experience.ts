import type { Experience } from "@/types";

export const experience: Experience[] = [
  {
    company: "ISA Interfase",
    role: "Full Stack Java Developer",
    period: "2019 — 2025",
    description:
      "Architected and developed enterprise digital identity and electronic signature platforms. Led full-stack initiatives from database design to React frontends, with strong emphasis on security, scalability, and production reliability.",
    highlights: [
      "Designed and implemented OAuth2 / JWT authentication services handling thousands of sessions daily, integrated with Hardware Security Modules (HSM) for cryptographic key protection.",
      "Built REST APIs consumed by multiple client applications (Angular and React SPAs) with comprehensive input validation, rate limiting, and audit logging.",
      "Led migration of legacy monolith components to a containerized microservices architecture with Docker and Jenkins CI/CD pipelines.",
    ],
    technologies: [
      "Java",
      "Spring Boot",
      "React",
      "TypeScript",
      "PostgreSQL",
      "Docker",
      "Jenkins",
      "OAuth2",
      "JWT",
      "HSM",
      "Microservices",
    ],
  },
  {
    company: "Beacon42",
    role: "Magento Developer",
    period: "2018 — 2019",
    description:
      "Developed custom Magento modules and backend integrations for eCommerce clients, automating billing workflows and extending platform capabilities.",
    highlights: [
      "Built custom Magento plugins that automated recurring billing and subscription management, reducing manual invoicing overhead by 60%.",
      "Integrated third-party payment gateways and shipping APIs into existing Magento stores with zero downtime deployments.",
      "Developed backend features in PHP that extended the Magento admin panel for custom reporting and inventory management dashboards.",
    ],
    technologies: ["PHP", "Magento", "MySQL", "JavaScript", "REST APIs", "Linux"],
  },
  {
    company: "Portlike",
    role: "Programmer Analyst",
    period: "2017 — 2018",
    description:
      "Built analytics dashboards and marketing automation tools using Google Analytics, Google Tag Manager, and Laravel APIs.",
    highlights: [
      "Implemented Google Analytics and Tag Manager tracking across multiple client websites, enabling data-driven marketing decisions.",
      "Developed lightweight Laravel (Lumen) APIs for data aggregation and reporting.",
      "Created automated Excel reporting pipelines that eliminated 15+ hours of manual data entry per week.",
    ],
    technologies: ["PHP", "Laravel", "Lumen", "JavaScript", "Google Analytics", "MySQL"],
  },
];
