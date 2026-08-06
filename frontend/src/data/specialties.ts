export interface Specialty {
  name: string;
  icon: string;
  description: string;
}

export const specialties: Specialty[] = [
  {
    name: "Java & Spring Boot",
    icon: "Server",
    description:
      "Core backend stack — Spring MVC, Spring Data JPA, Spring Security, Hibernate. Building enterprise APIs and microservices.",
  },
  {
    name: "Microservices",
    icon: "Cpu",
    description:
      "Designing and implementing distributed architectures with independent services, service discovery via Eureka, and inter-service communication.",
  },
  {
    name: "APIs REST & SOAP",
    icon: "Globe",
    description:
      "Designing, building, and documenting RESTful and SOAP web services with Swagger/OpenAPI for seamless system integration.",
  },
  {
    name: "OAuth2 / JWT",
    icon: "Key",
    description:
      "Implementing token-based authentication, multi-factor authentication (MFA), and centralized auth services for enterprise applications.",
  },
  {
    name: "PKI & Digital Certificates",
    icon: "Shield",
    description:
      "Public Key Infrastructure — certificate issuance, revocation, HSM integration, digital signatures, and certificate lifecycle management.",
  },
  {
    name: "PostgreSQL",
    icon: "Database",
    description:
      "Relational database design, complex SQL queries, query optimization, and schema modeling for transactional systems.",
  },
  {
    name: "Docker",
    icon: "Container",
    description:
      "Application containerization, Docker Compose for local development, and multi-service orchestration.",
  },
  {
    name: "Jenkins",
    icon: "Zap",
    description:
      "Continuous Integration and Continuous Deployment pipelines — automated builds, testing, and deployment to production.",
  },
  {
    name: "Linux",
    icon: "Terminal",
    description:
      "Server administration, systemd service management (systemctl), and application deployment on Linux environments.",
  },
  {
    name: "Nginx",
    icon: "Cloud",
    description:
      "Reverse proxy configuration, load balancing, and serving static assets in production environments.",
  },
  {
    name: "React",
    icon: "Layout",
    description:
      "Building responsive single-page applications with React, TypeScript, and component-based architecture.",
  },
  {
    name: "Angular",
    icon: "Monitor",
    description:
      "Enterprise frontend development with Angular, TypeScript, and reactive programming patterns.",
  },
];
