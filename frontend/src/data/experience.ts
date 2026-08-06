import type { Experience } from "@/types";

export const experience: Experience[] = [
  {
    company: "QR S.A.S.",
    role: "Founder & Full Stack Developer",
    period: "2026 — Present",
    description:
      "Personal entrepreneurial project — a modern crowdfunding platform inspired by Kickstarter, built with a microservices architecture. Showcases full-stack capabilities from infrastructure to UI, demonstrating how a microservices approach enables independent scaling of specific features.",
    highlights: [
      "Built a complete crowdfunding platform from scratch using Spring Boot microservices for campaigns, users, payments, and notifications — each with its own database.",
      "Designed a service decomposition that balances autonomy with practical development velocity for a solo project.",
      "Implemented JWT-based authentication across services with REST API communication.",
    ],
    technologies: [
      "Java",
      "Spring Boot",
      "React",
      "TypeScript",
      "PostgreSQL",
      "Docker",
      "JWT",
      "Microservices",
    ],
  },
  {
    company: "ISA Interfase",
    role: "Full Stack Java Developer",
    period: "2019 — Sept 2025",
    logo: "/images/isa interfase.jpg",
    description:
      "Architecting and developing enterprise digital identity and electronic signature platforms serving thousands of users across regulated industries. Leading full-stack initiatives from database design to React frontends, with a strong emphasis on security, scalability, and production reliability.",
    highlights: [
      "Designed and implemented OAuth2 / JWT authentication services handling thousands of authenticated sessions daily, integrated with Hardware Security Modules (HSM) for cryptographic key protection.",
      "Built REST APIs consumed by multiple client applications (Angular and React SPAs) with comprehensive input validation, rate limiting, and audit logging.",
      "Led migration of legacy monolith components to a containerized microservices architecture, reducing deployment cycles from hours to minutes with Docker and Jenkins CI/CD pipelines.",
      "Developed electronic signature workflows with certificate lifecycle management — generation, validation, revocation — compliant with regulatory standards for digital identity.",
    ],
    technologies: [
      "Java",
      "Spring Boot",
      "Spring Security",
      "Hibernate",
      "JPA",
      "React",
      "Angular",
      "TypeScript",
      "PostgreSQL",
      "Docker",
      "Jenkins",
      "OAuth2",
      "JWT",
      "HSM",
      "REST APIs",
      "Microservices",
      "WildFly",
    ],
  },
  {
    company: "Beacon42",
    role: "Magento Developer",
    period: "2018 — 2019",
    logo: "/images/beacon42.png",
    description:
      "Developed custom Magento modules and backend integrations for eCommerce clients, automating billing workflows and extending platform capabilities beyond out-of-the-box features.",
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
    logo: "/images/portlike.png",
    description:
      "Built analytics dashboards and marketing automation tools using Google Analytics, Google Tag Manager, and Laravel APIs. Contributed to WordPress sites and Excel-based reporting for business intelligence.",
    highlights: [
      "Implemented Google Analytics and Tag Manager tracking across multiple client websites, enabling data-driven marketing decisions through custom dashboards and reports.",
      "Developed lightweight Laravel (Lumen) APIs for data aggregation and reporting, consuming external services and presenting insights through clean interfaces.",
      "Created automated Excel reporting pipelines that eliminated 15+ hours of manual data entry per week for business stakeholders.",
    ],
    technologies: ["PHP", "Laravel", "Lumen", "JavaScript", "WordPress", "Google Analytics", "Google Tag Manager", "MySQL"],
  },
];
