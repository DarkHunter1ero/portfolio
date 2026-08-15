import type { ArchitectureDiagram } from "@/types";

export const architectureDiagrams: ArchitectureDiagram[] = [
  {
    id: "microservices",
    label: "Microservices Architecture",
    description:
      "Service-oriented architecture used in ISCERT and Crowdfunding Platform. Each service owns its domain and data, communicating through REST APIs with centralized authentication.",
    mermaidCode: `graph TD
    AG[API Gateway] --> Auth
    AG --> CS[Campaign Service]
    AG --> US[User Service]
    AG --> PS[Payment Service]
    AG --> NS[Notification Service]
    Auth --> AuthDB[(Auth DB)]
    CS --> CSDB[(Campaign DB)]
    US --> USDB[(User DB)]
    PS --> PSDB[(Payment DB)]
    NS --> NSDB[(Notification DB)]
    Auth --> HS[HSM]
    style AG fill:#2563eb,stroke:#1d4ed8,color:#fff
    style Auth fill:#1e1e24,stroke:#2a2a35,color:#f0f0f5
    style CS fill:#1e1e24,stroke:#2a2a35,color:#f0f0f5
    style US fill:#1e1e24,stroke:#2a2a35,color:#f0f0f5
    style PS fill:#1e1e24,stroke:#2a2a35,color:#f0f0f5
    style NS fill:#1e1e24,stroke:#2a2a35,color:#f0f0f5`,
  },
  {
    id: "docker",
    label: "Docker Orchestration",
    description:
      "Multi-container Docker environment for development and production. Each service runs in its own container with orchestrated startup order and health checks.",
    mermaidCode: `graph TB
    subgraph "Docker Compose"
        FE[Frontend<br/>Next.js :3000]
        BE[Backend<br/>Express :4000]
    end
    FE -->|API calls| BE
    BE -->|Health check| BE
    subgraph "External"
        GH[GitHub API]
        RE[Resend Email]
    end
    FE -->|ISR fetch| GH
    BE -->|Send email| RE
    style FE fill:#2563eb,stroke:#1d4ed8,color:#fff
    style BE fill:#1e1e24,stroke:#2a2a35,color:#f0f0f5`,
  },
  {
    id: "cicd",
    label: "CI/CD Pipeline",
    description:
      "Jenkins-based continuous integration and deployment pipeline. Automated testing, building, and deployment to production with Docker containers.",
    mermaidCode: `graph LR
    GC[Git Commit] --> J[Jenkins Trigger]
    J --> T[Run Tests]
    T --> B[Build Docker Image]
    B --> S[Security Scan]
    S --> D{Deploy}
    D -->|Staging| ST[Staging Env]
    D -->|Production| PR[Production Env]
    ST -->|Approval| PR
    style GC fill:#1e1e24,stroke:#2a2a35,color:#f0f0f5
    style J fill:#2563eb,stroke:#1d4ed8,color:#fff
    style D fill:#2563eb,stroke:#1d4ed8,color:#fff`,
  },
  {
    id: "auth",
    label: "Authentication Flow",
    description:
      "OAuth2 / JWT authentication flow used across digital identity platforms. Integrates with HSM for cryptographic operations and supports multiple client types.",
    mermaidCode: `sequenceDiagram
    participant C as Client (SPA)
    participant AG as API Gateway
    participant AS as Auth Service
    participant HSM as HSM
    participant RS as Resource Server
    C->>AG: POST /auth/login
    AG->>AS: Validate credentials
    AS->>HSM: Verify certificate
    HSM-->>AS: Valid
    AS-->>AG: JWT Token
    AG-->>C: Access + Refresh Token
    C->>AG: GET /api/resource (Bearer token)
    AG->>AS: Validate JWT
    AS-->>AG: Token valid
    AG->>RS: Forward request
    RS-->>C: Resource data`,
  },
  {
    id: "cloud",
    label: "Cloud Infrastructure",
    description:
      "Planned cloud deployment architecture using containerized services with load balancing, auto-scaling, and managed database services.",
    mermaidCode: `graph TB
    subgraph "Load Balancer"
        LB[Traffic Router]
    end
    subgraph "Compute"
        FE1[Frontend Instance 1]
        FE2[Frontend Instance 2]
        BE1[Backend Instance 1]
        BE2[Backend Instance 2]
    end
    subgraph "Data Layer"
        DB[(Managed PostgreSQL)]
        CACHE[(Redis Cache)]
    end
    LB --> FE1
    LB --> FE2
    FE1 --> BE1
    FE2 --> BE2
    BE1 --> DB
    BE2 --> DB
    BE1 --> CACHE
    BE2 --> CACHE
    style LB fill:#2563eb,stroke:#1d4ed8,color:#fff
    style DB fill:#1e1e24,stroke:#2a2a35,color:#f0f0f5`,
  },
];
