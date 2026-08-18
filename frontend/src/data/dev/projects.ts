import type { Project } from "@/types";

export const projects: Project[] = [
  // ─── ISA Interfase (current job) ───
  {
    name: "ISCERT",
    company: "ISA Interfase",
    slug: "iscert",
    date: "2025-06",

    description:
      "Enterprise platform for digital identity management, authentication, certificate lifecycle, and electronic signatures. A comprehensive solution that enables organizations to issue, manage, and verify digital certificates at scale.",
    problem:
      "Organizations in regulated industries needed a centralized platform to manage digital identities, issue cryptographic certificates, and execute legally binding electronic signatures — all while maintaining compliance with strict security standards and providing a seamless user experience across web and mobile interfaces.",
    architecture:
      "Built on a Spring Boot microservices backbone with PostgreSQL for transactional data. Authentication flows use OAuth2 with JWT tokens, backed by Hardware Security Modules (HSM) for cryptographic operations. The React frontend communicates through a secured API gateway with request validation at every layer.",
    technologies: [
      "Java",
      "Spring Boot",
      "PostgreSQL",
      "HSM",
      "OAuth2",
      "JWT",
      "React",
      "Docker",
      "Microservices",
    ],
    challenges: [
      "Ensuring cryptographic operations comply with FIPS 140-2 standards while maintaining sub-second response times.",
      "Designing certificate revocation lists (CRLs) that propagate across distributed services without compromising security.",
      "Building an intuitive UI for complex PKI workflows that non-technical users can navigate confidently.",
    ],
    image: "/images/empresas/isa-interfase/iscert/ISCERT.jpg",
  },
  {
    name: "MiRecibo",
    company: "ISA Interfase",
    slug: "mirecibo",
    date: "2023-06",

    description:
      "Digital payroll signing platform with role-based access control and multi-tenant company configuration. Enables organizations to digitally sign and securely store payroll documents at scale.",
    problem:
      "Companies needed a secure, auditable way to digitally sign payroll documents in bulk while managing complex organizational hierarchies — different roles have different signing and viewing permissions, and each company has its own configuration requirements for document templates and approval workflows.",
    architecture:
      "Spring Boot backend with role-based authorization using Spring Security. Digital signatures are applied via HSM-backed cryptographic operations. PostgreSQL stores document metadata and audit trails, while the actual signed documents are stored in encrypted object storage. React frontend with dynamic form generation based on company-specific configurations.",
    technologies: [
      "Java",
      "Spring Boot",
      "Spring Security",
      "React",
      "PostgreSQL",
      "HSM",
      "Docker",
    ],
    challenges: [
      "Implementing granular role-based access that supports custom permission matrices per company without performance degradation.",
      "Handling bulk signing operations for thousands of documents while providing real-time progress feedback to users.",
    ],
    image: "/images/empresas/isa-interfase/mirecibo/mirecibo-uy.jpg",
  },
  {
    name: "FirmaPDF",
    company: "ISA Interfase",
    slug: "firmapdf",
    date: "2021-06",

    description:
      "Mass PDF digital signing platform with external authentication service integration. Designed for high-throughput environments where thousands of PDFs need to be signed with legally valid digital signatures.",
    problem:
      "Enterprises generating large volumes of PDF documents needed a solution to apply digital signatures at scale — think thousands of invoices, contracts, or reports per day — while integrating with existing identity providers and ensuring each signature is cryptographically verifiable and legally binding.",
    architecture:
      "The platform integrates with external OAuth2 identity providers for user authentication. PDF signing operations are queued and processed asynchronously using a message queue pattern, allowing the system to handle spikes in demand. Spring Boot services handle the actual cryptographic signing, and PostgreSQL tracks the status and metadata of every operation.",
    technologies: ["Java", "Spring Boot", "PostgreSQL", "OAuth2", "JWT", "React", "Docker"],
    challenges: [
      "Processing thousands of concurrent signing requests without overwhelming HSM resources through intelligent queuing and batching.",
      "Integrating with multiple external authentication providers, each with different token formats and validation requirements.",
    ],
    image: "/images/empresas/isa-interfase/firmapdf/tuid-firma.jpg",
  },
  // ─── Beacon42 ───
  {
    name: "Magento Billing Plugin",
    company: "Beacon42",
    slug: "magento-billing-plugin",
    date: "2018-09",

    description:
      "Custom Magento plugin for automated billing process management. Streamlined recurring invoicing, subscription handling, and payment gateway integration for e-commerce clients.",
    problem:
      "E-commerce clients using Magento needed automated recurring billing and subscription management beyond the platform's built-in capabilities.",
    architecture:
      "PHP-based Magento plugin with MySQL backend, integrating third-party payment gateways and shipping APIs.",
    technologies: ["PHP", "Magento", "MySQL", "JavaScript", "REST APIs"],
    challenges: [
      "Automating recurring billing workflows within Magento's plugin architecture constraints.",
      "Integrating multiple third-party payment gateways with zero-downtime deployments.",
    ],
    image: "/images/empresas/beacon42/beacon42.png",
  },
  // ─── Portlike (Client: DIRECTV) ───
  {
    name: "Web Analytics & Tracking",
    company: "Portlike · DIRECTV",
    slug: "web-analytics-tracking",
    date: "2017-09",

    description:
      "Implementation of Google Analytics and Google Tag Manager tracking infrastructure across DIRECTV's web properties, enabling data-driven marketing decisions through custom dashboards and automated reporting.",
    problem:
      "DIRECTV needed comprehensive tracking across multiple websites to understand user behavior, measure campaign performance, and generate actionable business intelligence.",
    architecture:
      "Google Analytics and Tag Manager deployed across multiple client websites with custom event tracking. Laravel (Lumen) APIs for data aggregation and Excel-based automated reporting pipelines.",
    technologies: [
      "Google Analytics",
      "Google Tag Manager",
      "Laravel",
      "PHP",
      "JavaScript",
      "Excel",
    ],
    challenges: [
      "Implementing consistent tracking across multiple disparate web properties with different architectures.",
      "Automating report generation to eliminate 15+ hours of weekly manual data entry.",
    ],
    image: "/images/empresas/portlike/portlike.png",
  },
  {
    name: "WordPress Corporate Site",
    company: "Portlike · DIRECTV",
    slug: "wordpress-corporate-site",
    date: "2018-03",

    description:
      "Maintenance and evolution of DIRECTV's corporate WordPress website — developed at Portlike alongside Takeoff (partner company sharing the same office). New pages, commercial campaign components, and performance optimization for production environments.",
    problem:
      "DIRECTV's corporate site required ongoing evolution — new campaign pages, feature enhancements, bug fixes, and performance optimization — while maintaining stability in production.",
    architecture:
      "WordPress CMS with custom PHP development for new functionality. HTML, CSS, and JavaScript for frontend components. Third-party plugin integration and maintenance.",
    technologies: ["WordPress", "PHP", "HTML", "CSS", "JavaScript", "MySQL"],
    challenges: [
      "Balancing rapid campaign deployments with production stability and performance.",
      "Integrating and maintaining third-party plugins while ensuring compatibility across updates.",
    ],
    image: "/images/empresas/portlike/takeoff.jpg",
  },
  // ─── Personal ───
  {
    name: "Crowdfunding Platform",
    company: "QR S.A.S.",
    slug: "crowdfunding-platform",
    date: "2026-02",

    description:
      "Modern crowdfunding platform inspired by Kickstarter, built with a microservices architecture. A personal project that showcases full-stack capabilities from infrastructure to UI.",
    problem:
      "Most crowdfunding platforms are monolithic, making it difficult to scale specific features independently or experiment with new functionality. I wanted to build a platform that demonstrates how a microservices approach can solve these problems while providing a clean, modern user experience.",
    architecture:
      "Microservices architecture with Spring Boot services for campaigns, users, payments, and notifications — each with its own database. Services communicate via REST APIs with JWT-based authentication. PostgreSQL for transactional data. Docker Compose for local development. React frontend with a clean, responsive design.",
    technologies: [
      "Java",
      "Spring Boot",
      "React",
      "PostgreSQL",
      "Docker",
      "JWT",
      "Microservices",
      "TypeScript",
    ],
    challenges: [
      "Managing distributed transactions across campaign creation, payment processing, and notification services without a distributed transaction coordinator.",
      "Designing a service decomposition that balances autonomy with practical development velocity for a solo project.",
    ],
    image: "/projects/placeholder.svg",
    githubUrl: "https://github.com/DarkHunter1ero",
  },
];
