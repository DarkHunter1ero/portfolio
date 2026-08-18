import type { ProjectDetail } from "@/types";

export const projectDetailsEn: ProjectDetail[] = [
  {
    slug: "mirecibo",
    name: "MiRecibo",
    subtitle: "Digital payroll receipt management platform with electronic and digital signatures",
    shortDescription:
      "Enterprise platform for completely digitizing the delivery and signing of payroll receipts. Eliminates paper, integrates with any payroll system, and deploys Cloud or On-Premise.",
    heroImage: "/images/isa-interfase/mirecibo-uy.jpg",
    role: "Backend Software Engineer",
    duration: "Enterprise Project",
    instances: [
      {
        country: "Uruguay",
        flag: "🇺🇾",
        description:
          "Pioneer platform for electronic payroll receipt management in Uruguay, integrating with the country's largest payroll systems. Supports electronic signature, digital signature, and timestamping for legal validity.",
        highlights: [
          "Electronic Signature",
          "Digital Signature",
          "Timestamping",
          "Payroll System Integration",
          "HSM",
          "Electronic ID Card",
        ],
        videoUrl: "https://www.youtube.com/watch?v=w2G8tXRKwhk",
        image: "/images/isa-interfase/mirecibo-uy.jpg",
      },
      {
        country: "Paraguay",
        flag: "🇵🇾",
        description:
          "Extended the platform to Paraguay as a pioneer in the country. Supports multiple digital certification mechanisms with full legal validity — PDF/A, PAdES, HSM, cryptographic tokens, smart cards, and cloud custody.",
        highlights: [
          "PDF/A",
          "PAdES",
          "HSM",
          "Tokens",
          "Cryptographic Smart Cards",
          "Cloud Custody",
        ],
        videoUrl: "https://www.youtube.com/watch?v=snnrY5ExBdM",
        image: "/images/isa-interfase/mirecibo-py.jpg",
      },
    ],
    about:
      "MiRecibo is an enterprise-grade platform that completely transforms how companies manage payroll receipts. Instead of printing, distributing, and archiving physical documents, the platform digitizes the entire lifecycle — from generation to legally binding digital signature to secure archival.\n\nBuilt on a robust Spring Boot backend with PostgreSQL for transactional integrity, the platform integrates seamlessly with any existing payroll system through standardized APIs. Companies can configure their organizational hierarchy, define role-based signing workflows, and customize document templates to match their exact needs.\n\nThe platform supports both electronic and digital signatures, backed by Hardware Security Modules (HSM) for cryptographic operations. Every signed document carries legal validity through timestamping services, ensuring non-repudiation and long-term verifiability. Employees access their receipts through a secure web portal, eliminating the need for physical distribution entirely.",
    problem:
      "Companies managing physical payroll receipts face significant operational overhead. Each pay cycle involves printing thousands of documents, distributing them to employees, handling questions from HR about lost or misplaced receipts, and maintaining physical archives for legal compliance — a process that consumes time, money, and storage space. For multi-company organizations, this complexity multiplies across different legal entities, each with its own hierarchy, approval workflows, and document templates. The administrative burden, combined with the risk of lost documents and compliance gaps, makes traditional receipt management unsustainable at enterprise scale.",
    solution:
      "MiRecibo solves these challenges through a fully digital platform that automates every step. Payroll systems push receipt data via API, the platform generates formatted documents, routes them through configurable signing workflows, applies legally valid digital signatures via HSM, and delivers them to employees through a secure portal. The entire process is auditable, with cryptographic integrity guarantees and timestamps that ensure documents remain verifiable for years. Multi-company support means each legal entity gets its own configuration, workflows, and user management — all from a single deployment.",
    features: [
      {
        icon: "FileText",
        title: "Electronic Receipt Management",
        description:
          "Complete digital lifecycle for payroll receipts — generation, distribution, signing, and archival without a single sheet of paper.",
      },
      {
        icon: "FileSignature",
        title: "Electronic Signature",
        description:
          "Legally valid electronic signatures that authenticate the employer's identity and the document's integrity.",
      },
      {
        icon: "Key",
        title: "Digital Signature",
        description:
          "Cryptographic digital signatures backed by HSM, providing the highest level of legal validity and non-repudiation.",
      },
      {
        icon: "Clock",
        title: "Timestamping",
        description:
          "Timestamp authority integration that certifies exactly when each document was signed, ensuring long-term verifiability.",
      },
      {
        icon: "Database",
        title: "Payroll System Integration",
        description:
          "Standardized APIs that connect with any payroll system, receiving receipt data automatically each pay cycle.",
      },
      {
        icon: "Users",
        title: "Employee Portal",
        description:
          "Secure web portal where employees can view, download, and verify their signed receipts at any time.",
      },
      {
        icon: "Globe",
        title: "Multi-Company Management",
        description:
          "Multi-tenant architecture supporting multiple legal entities, each with independent configuration, workflows, and users.",
      },
      {
        icon: "Cloud",
        title: "Cloud",
        description:
          "Cloud deployment option for organizations that prefer managed infrastructure with automatic scaling and updates.",
      },
      {
        icon: "Server",
        title: "On Premise",
        description:
          "On-premise deployment for organizations with strict data sovereignty or regulatory requirements.",
      },
      {
        icon: "Shield",
        title: "HSM",
        description:
          "Hardware Security Module integration for protecting private keys used in digital signature operations.",
      },
      {
        icon: "CreditCard",
        title: "Electronic ID Card",
        description:
          "Integration with Uruguay's national electronic identity card for strong citizen authentication.",
      },
      {
        icon: "HardDrive",
        title: "Secure Repository",
        description:
          "Encrypted document repository ensuring signed receipts remain protected, immutable, and always available.",
      },
    ],
    participation: [
      "Designed REST APIs for payroll system integration and employee portals",
      "Implemented core platform features: receipt management, signature workflows, and notifications",
      "Integrated electronic and digital signature modules, including HSM and timestamping",
      "Built business logic for multi-company approval workflows with role-based access control",
      "Implemented data persistence with PostgreSQL: relational schemas, optimized queries, and migrations",
      "Integrated with external systems: Electronic ID Card (Uruguay), cryptographic tokens, and smart cards (Paraguay)",
      "Optimized performance for bulk signing of thousands of receipts per pay cycle",
      "Resolved production incidents with error tracking and hotfix deployment",
      "Collaborated with frontend, QA, infrastructure, and product teams for iterative delivery",
    ],
    technicalChallenges: [
      {
        title: "Integration with Diverse Systems",
        description:
          "Connecting MiRecibo with diverse payroll systems — each with its own data format, schedule, and authentication — required building a flexible integration layer that normalizes input without losing fidelity.",
      },
      {
        title: "Security",
        description:
          "Handling sensitive payroll data and cryptographic keys demanded defense-in-depth: encrypted storage, HSM for key operations, TLS everywhere, and strict access controls at every layer.",
      },
      {
        title: "Document Processing",
        description:
          "Generating, signing, and delivering thousands of receipts per pay cycle required efficient PDF generation pipelines and asynchronous processing to maintain throughput.",
      },
      {
        title: "Signature Mechanism Compatibility",
        description:
          "Uruguay and Paraguay have different legal frameworks and certification mechanisms — the platform had to abstract signature operations to support both electronic signatures, digital signatures, smart cards, and cryptographic tokens uniformly.",
      },
      {
        title: "Scalability",
        description:
          "The platform needed to handle peak loads during pay cycles — when thousands of employees access their receipts simultaneously — without degradation in response times or signing throughput.",
      },
    ],
    security: {
      description:
        "MiRecibo was designed with security as a foundational requirement, not an afterthought. Handling sensitive payroll data and cryptographic signing operations demanded a comprehensive security architecture.",
      items: [
        {
          title: "Digital Signature",
          description:
            "Cryptographic signatures backed by asymmetric key pairs stored in HSM, providing the highest level of legal validity under Uruguayan and Paraguayan law.",
        },
        {
          title: "Electronic Signature",
          description:
            "Electronic signatures that authenticate identity and intent, with audit trails that meet regulatory requirements for payroll documentation.",
        },
        {
          title: "Non-Repudiation",
          description:
            "Every signature is cryptographically bound to the signer's identity, making it impossible to deny having signed a document — critical for legal validity.",
        },
        {
          title: "Timestamping",
          description:
            "RFC 3161-compliant timestamps from a trusted Time Stamp Authority (TSA) certify exactly when each document was signed, ensuring long-term verifiability even after certificates expire.",
        },
        {
          title: "Document Protection",
          description:
            "Signed documents are stored in an encrypted repository with integrity checks that detect any tampering. PDF/A format ensures long-term archival compatibility.",
        },
        {
          title: "Integrity",
          description:
            "Cryptographic hashes of every document are stored alongside the signatures, allowing independent verification that the document has not been altered since signing.",
        },
        {
          title: "Authentication",
          description:
            "Multi-factor authentication with OAuth2 and JWT tokens, integrated with national identity systems (Electronic ID Card in Uruguay) for strong citizen authentication.",
        },
      ],
    },
    architecture: {
      description:
        "MiRecibo is a monolithic Groovy/Grails application that centralizes authentication, payroll batch processing, electronic payslip generation, digital signature workflows, and notifications into a single deployable unit backed by MySQL.",
      mermaidCode: `graph TB
    User["👤 Employee"]
    Admin["👨‍💼 Company Administrator"]

    Frontend["Angular Frontend"]

    subgraph MIRECIBO["MiRecibo - Monolithic Application"]
        Monolith["Groovy / Grails"]

        Auth["Authentication & Authorization"]
        Payroll["Payroll Batch Processing"]
        Documents["Electronic Payslips"]
        Signature["Digital Signature Workflow"]
        Notifications["Notifications<br/>Web + Email"]

        Monolith --> Auth
        Monolith --> Payroll
        Monolith --> Documents
        Monolith --> Signature
        Monolith --> Notifications
    end

    DB[("MySQL Database")]
    Mail["Mail Server"]

    User --> Frontend
    Admin --> Frontend

    Frontend --> Monolith

    Monolith --> DB

    Notifications --> Mail

    Payroll --> Documents

    Documents --> Signature

    style Frontend fill:#2563eb,stroke:#1d4ed8,color:#fff
    style Monolith fill:#1e1e24,stroke:#2a2a35,color:#f0f0f5
    style Mail fill:#92400e,stroke:#78350f,color:#fff`,
    },
    impact: [
      {
        label: "Users",
        value: "80,000+",
        icon: "Users",
      },
      {
        label: "Paper Reduction",
        value: "100%",
        icon: "FileText",
      },
      {
        label: "Automation",
        value: "Complete",
        icon: "Zap",
      },
      {
        label: "HR Optimization",
        value: "Significant",
        icon: "Clock",
      },
    ],
    technologies: [
      "Java",
      "Spring Boot",
      "Spring Security",
      "PostgreSQL",
      "JWT",
      "OAuth2",
      "Docker",
      "Git",
      "REST APIs",
      "JPA",
      "Hibernate",
    ],
    lessonsLearned: [
      "Multi-country legal frameworks require careful abstraction — what works in Uruguay may need adaptation for Paraguay, but the core platform can remain shared.",
      "HSM integration is critical for legal validity: software-only signatures do not carry the same weight as hardware-backed operations in regulated environments.",
      "Asynchronous processing for bulk operations is non-negotiable — users need progress feedback, not blocking waits.",
      "Role-based access control with multi-company support demands a flexible permission model — hardcoded roles become unmaintainable within months.",
      "PDF/A and PAdES standards are essential for long-term archival: documents signed today must remain verifiable a decade from now.",
    ],
    gallery: [
      { src: "/projects/placeholder.svg", alt: "MiRecibo dashboard" },
      { src: "/projects/placeholder.svg", alt: "Employee receipt portal" },
      { src: "/projects/placeholder.svg", alt: "Company configuration panel" },
      { src: "/projects/placeholder.svg", alt: "Signature workflow view" },
    ],
    callToAction: {
      text: "Explore other projects",
      link: "/dev#experience",
    },
    metadata: {
      title: "MiRecibo — Digital Payroll Platform",
      description:
        "Enterprise platform for completely digitizing the delivery and signing of payroll receipts. Multi-country deployment with electronic and digital signatures.",
    },
  },
  {
    slug: "iscert",
    name: "ISCERT",
    subtitle:
      "Digital Certification Infrastructure for authentication, electronic signature, and digital signature",
    shortDescription:
      "Enterprise PKI platform specialized in digital certification — guarantees identity, authenticity, integrity, and non-repudiation in electronic processes.",
    heroImage: "/images/isa-interfase/ISCERT.jpg",
    videoUrl: "https://www.youtube.com/watch?v=w0v_YcHbtCY",
    role: "Backend Software Engineer",
    duration: "Enterprise Project",
    about:
      "ISCERT is a comprehensive Public Key Infrastructure (PKI) platform that provides the foundational trust layer for digital identity and electronic signatures in enterprise environments. It operates as a Certification Authority (CA), issuing, managing, and revoking X.509 digital certificates that authenticate users, devices, and services across the organization.\n\nThe platform handles the complete certificate lifecycle: enrollment, issuance, renewal, suspension, and revocation — all through automated workflows that integrate with existing identity systems. Hardware Security Modules (HSM) protect the root and intermediate signing keys, ensuring that the trust anchor of the entire PKI hierarchy remains physically secure and tamper-resistant.\n\nBeyond certificate management, ISCERT powers the cryptographic operations behind digital signatures, secure authentication, and document timestamping. Its architecture supports high availability and horizontal scaling, making it suitable for organizations with thousands of users and millions of certificate validations per day.",
    problem:
      "Organizations operating in regulated industries face a fundamental challenge: how to prove, with cryptographic certainty, that a digital action was performed by a specific person at a specific time and has not been altered since. Without a trusted PKI infrastructure, digital signatures lack legal weight, authentication is susceptible to impersonation, and electronic documents have no long-term verifiability. Building this infrastructure from scratch requires deep cryptographic expertise, HSM integration, compliance with evolving standards, and the operational capacity to manage certificate lifecycles at scale — a prohibitively complex undertaking for most organizations.",
    solution:
      "ISCERT provides a turnkey PKI platform that abstracts this complexity. It operates as an enterprise Certification Authority, issuing X.509 certificates through automated enrollment workflows. The platform integrates with Hardware Security Modules to protect signing keys, implements OCSP and CRL services for real-time certificate validation, and provides REST APIs that applications consume for authentication, digital signing, and timestamping. The result is a trusted identity layer that any application can leverage — without requiring each development team to become cryptography experts.",
    features: [
      {
        icon: "Shield",
        title: "Certification Authority",
        description:
          "Full Certification Authority functionality — issue, manage, and revoke X.509 digital certificates with configurable policies and templates.",
      },
      {
        icon: "FileSignature",
        title: "Digital Signature",
        description:
          "Cryptographic digital signatures backed by HSM, providing legal validity and non-repudiation for electronic documents and transactions.",
      },
      {
        icon: "FileText",
        title: "Electronic Signature",
        description:
          "Electronic signature workflows with identity verification and audit trails, suitable for internal approvals and less formal processes.",
      },
      {
        icon: "CheckCircle",
        title: "Certificate Validation",
        description:
          "OCSP and CRL services for real-time certificate status checking, ensuring revoked or expired certificates are detected immediately.",
      },
      {
        icon: "Users",
        title: "Identity Management",
        description:
          "Centralized identity management with integration to existing directories (LDAP, Active Directory) and external identity providers.",
      },
      {
        icon: "Lock",
        title: "HSM",
        description:
          "Hardware Security Module integration for protecting root and intermediate CA private keys with FIPS 140-2 certified hardware.",
      },
      {
        icon: "Fingerprint",
        title: "Authentication",
        description:
          "Strong, certificate-based authentication that replaces passwords with cryptographic proof of identity — resistant to phishing and credential theft.",
      },
      {
        icon: "Clock",
        title: "Timestamp",
        description:
          "RFC 3161-compliant timestamp authority that certifies when documents were signed, ensuring long-term verifiability.",
      },
      {
        icon: "HardDrive",
        title: "Cryptographic Custody",
        description:
          "Secure custody of cryptographic material with role-based access controls, audit logging, and tamper-evident storage.",
      },
      {
        icon: "Cloud",
        title: "Cloud Certificates",
        description:
          "Certificate issuance and management for cloud workloads — VMs, containers, and services that need machine identities.",
      },
      {
        icon: "CreditCard",
        title: "Smart Cards",
        description:
          "Integration with smart card technologies for physical token-based authentication and signing in high-security environments.",
      },
      {
        icon: "Key",
        title: "Tokens",
        description:
          "Support for cryptographic USB tokens and hardware tokens as secure credential carriers for field and remote workers.",
      },
      {
        icon: "Smartphone",
        title: "Multi-Factor Authentication",
        description:
          "Multi-factor authentication combining certificates with biometrics, OTP, or push notifications for defense-in-depth.",
      },
    ],
    participation: [
      "Designed REST APIs for certification, validation, and digital signature services",
      "Implemented certificate issuance, renewal, and revocation workflows for X.509 certificates",
      "Integrated HSM for protecting Certification Authority private keys",
      "Developed OCSP and CRL services for real-time certificate status validation",
      "Built business logic for certification policies: templates, usage restrictions, and validity periods",
      "Implemented persistence of certificates, requests, and audit logs in PostgreSQL",
      "Integrated with corporate directories (LDAP/Active Directory) for identity management",
      "Optimized performance for bulk certificate validations in high-concurrency environments",
      "Collaborated with security, infrastructure, and product teams to align PKI with regulatory requirements",
    ],
    technicalChallenges: [
      {
        title: "Security",
        description:
          "As a Certification Authority, ISCERT is a high-value target — protecting root keys in HSM, enforcing strict access controls, and maintaining tamper-evident audit trails were non-negotiable requirements.",
      },
      {
        title: "Cryptography",
        description:
          "Implementing certificate issuance, signature verification, and revocation required deep understanding of X.509, PKCS standards, OCSP, CRLs, and cryptographic algorithms (RSA, ECDSA, SHA-2/3).",
      },
      {
        title: "Scalability",
        description:
          "Certificate validation services (OCSP) must respond in milliseconds even under thousands of concurrent requests — requiring aggressive caching, optimized database queries, and horizontal scaling.",
      },
      {
        title: "High Availability",
        description:
          "The Certification Authority must be available 24/7 — certificate issuance delays can block critical business processes. This required redundant HSM deployment and database replication.",
      },
      {
        title: "Secure Device Integration",
        description:
          "Supporting smart cards, USB tokens, and HSM from different vendors required abstracting device-specific protocols behind a unified cryptographic service interface.",
      },
    ],
    security: {
      description:
        "As the trust anchor for the entire digital identity ecosystem, ISCERT's security architecture was designed to meet the highest standards — comparable to national-level Certification Authorities.",
      items: [
        {
          title: "PKI",
          description:
            "Full Public Key Infrastructure with a multi-tier CA hierarchy — Root CA (offline, air-gapped) and Issuing CAs (online, HSM-backed) following best practices for key separation.",
        },
        {
          title: "Digital Signature",
          description:
            "Cryptographic signatures using asymmetric key pairs generated and stored in FIPS 140-2 Level 3 certified HSMs.",
        },
        {
          title: "Cryptography",
          description:
            "Industry-standard algorithms (RSA 2048/4096, ECDSA P-256/P-384, SHA-256/384/512) with algorithm agility to migrate as cryptographic standards evolve.",
        },
        {
          title: "Non-Repudiation",
          description:
            "Every signature and certificate issuance is cryptographically attributable to a specific identity, with audit trails that provide legal evidence of who did what and when.",
        },
        {
          title: "Integrity",
          description:
            "All certificates, CRLs, and signed documents include cryptographic hashes that enable independent verification of data integrity at any point in the future.",
        },
        {
          title: "Confidentiality",
          description:
            "Certificate private keys are generated inside HSMs and never leave the secure hardware boundary — even administrators cannot extract them.",
        },
        {
          title: "X.509 Certificates",
          description:
            "Full support for the X.509 v3 standard with custom extensions, certificate policies, key usage constraints, and subject alternative names.",
        },
        {
          title: "Timestamp",
          description:
            "RFC 3161 timestamp authority integrated with the signing workflow, providing cryptographic proof of when each operation occurred.",
        },
        {
          title: "HSM",
          description:
            "Hardware Security Modules provide physical protection for cryptographic keys with tamper-resistant enclosures, access controls, and FIPS 140-2 certification.",
        },
      ],
    },
    impact: [
      {
        label: "Digital Transformation",
        value: "Enabled",
        icon: "Zap",
      },
      {
        label: "Automation",
        value: "End-to-End",
        icon: "CheckCircle",
      },
      {
        label: "Paperless Processes",
        value: "Complete",
        icon: "FileText",
      },
      {
        label: "Enterprise Security",
        value: "PKI Grade",
        icon: "Shield",
      },
      {
        label: "Legal Validity",
        value: "Guaranteed",
        icon: "Lock",
      },
    ],
    technologies: [
      "Java",
      "Spring Boot",
      "Spring Security",
      "REST",
      "OAuth2",
      "JWT",
      "PostgreSQL",
      "Docker",
      "Git",
      "Maven",
      "HSM",
      "PKI",
      "X509",
    ],
    architecture: {
      description:
        "ISCERT is built on a microservices architecture with three core layers: the Authentication Service provides centralized OAuth2/JWT-based identity verification; the Certificate Management Service orchestrates the business logic of certificate requests, approvals, and lifecycle coordination; and the Certificate Authority Service integrates with external CA providers (KeyOne and CA Gateway/Manager System) to perform the actual cryptographic issuance and revocation of digital certificates. The entire stack runs on Java/Spring Boot, packaged as JARs, deployed on Linux with Nginx as reverse proxy, orchestrated with Docker, and backed by PostgreSQL.",
      mermaidCode: `graph LR
    Client["👤 User"]

    subgraph ISCERT["ISCERT Platform"]
        direction LR
        Auth["🔐 Auth Server<br/>Spring Boot<br/>Embedded WildFly<br/>OAuth2<br/>JWT<br/>2FA / OTP<br/>Thymeleaf UI"]
        Crypto["🔑 Crypto Services<br/>Spring Boot<br/>Embedded WildFly<br/>Certificate Lifecycle<br/>Document Signing"]
        CA["📜 CA Management<br/>Spring Boot<br/>Embedded WildFly<br/>Certificate Issuance<br/>Certificate Revocation<br/>Multi-CA Routing"]
    end

    AuthDB[("PostgreSQL")]
    CryptoDB[("PostgreSQL")]

    HSM["🏛 HSM"]
    KeyOne["KeyOne CA"]
    Gateway["CA Gateway"]

    Client --> Auth

    Auth -->|"JWT"| Crypto
    Auth -->|"JWT"| CA

    Crypto -->|"HTTP"| CA

    Crypto -->|"PKCS#11"| HSM

    CA --> KeyOne
    CA --> Gateway

    Auth --> AuthDB
    Crypto --> CryptoDB

    style Client fill:#2563eb,stroke:#1d4ed8,color:#fff
    style Auth fill:#1e1e24,stroke:#2a2a35,color:#f0f0f5
    style Crypto fill:#1e1e24,stroke:#2a2a35,color:#f0f0f5
    style CA fill:#1e1e24,stroke:#2a2a35,color:#f0f0f5
    style HSM fill:#7c3aed,stroke:#5b21b6,color:#fff
    style KeyOne fill:#92400e,stroke:#78350f,color:#fff
    style Gateway fill:#92400e,stroke:#78350f,color:#fff`,
    },
    useCases: [
      {
        title: "Digital Government",
        description:
          "National and local government agencies use ISCERT to issue digital certificates to citizens and public servants, enabling legally valid electronic procedures, digital signatures on official documents, and secure access to government services.",
      },
      {
        title: "Electronic Documents",
        description:
          "Organizations sign contracts, agreements, and official documents with digital signatures that carry the same legal weight as handwritten signatures — eliminating printing, courier costs, and processing delays.",
      },
      {
        title: "Contract Signing",
        description:
          "Legal and procurement departments execute contracts digitally, with cryptographic proof of each party's identity and the exact time of signing — enforceable in court.",
      },
      {
        title: "Digital Identity",
        description:
          "The platform serves as the identity provider for enterprise SSO, replacing passwords with certificate-based authentication that is resistant to phishing, credential stuffing, and replay attacks.",
      },
      {
        title: "Authentication",
        description:
          "Applications across the organization consume ISCERT's authentication services through standard protocols (OAuth2, SAML, RADIUS), enabling strong, centralized authentication without each app managing its own credential store.",
      },
      {
        title: "Process Automation",
        description:
          "Business processes that previously required physical signatures — purchase orders, expense reports, HR documents — are fully digitized with cryptographic signing, automated routing, and immutable audit trails.",
      },
    ],
    lessonsLearned: [
      "A PKI is a trust system, not just a technology stack — the operational procedures (key ceremonies, access controls, audit logging) are as critical as the cryptographic algorithms.",
      "HSM integration adds significant complexity: key generation ceremonies, backup/recovery procedures, and vendor-specific APIs require specialized knowledge that generalist developers don't typically have.",
      "Certificate validation performance is critical: an OCSP responder that takes 500ms makes every TLS handshake feel slow. Aggressive caching and pre-signed responses are essential.",
      "X.509 certificate profiles must be designed carefully — overly permissive certificates create security risks, while overly restrictive ones break integrations.",
      "Multi-vendor device support (smart cards, USB tokens) requires a well-designed abstraction layer: each vendor's PKCS#11 or CSP implementation has subtle behavioral differences.",
    ],
    gallery: [
      { src: "/projects/placeholder.svg", alt: "ISCERT certificate management dashboard" },
      { src: "/projects/placeholder.svg", alt: "Certificate issuance workflow" },
      { src: "/projects/placeholder.svg", alt: "OCSP validation monitoring" },
      { src: "/projects/placeholder.svg", alt: "HSM key management interface" },
    ],
    callToAction: {
      text: "Explore other projects",
      link: "/dev#experience",
    },
    metadata: {
      title: "ISCERT — Digital Certification Infrastructure",
      description:
        "Enterprise PKI platform for digital certification, electronic signatures, and secure authentication. Full certificate lifecycle management with HSM-backed security.",
    },
  },
  {
    slug: "firmapdf",
    name: "FirmaPDF",
    subtitle: "Mass PDF digital signing platform with external identity provider integration",
    shortDescription:
      "High-throughput platform for applying legally valid digital signatures to PDF documents at scale. Integrates with OAuth2 identity providers and processes thousands of documents asynchronously.",
    heroImage: "/images/isa-interfase/tuid-firma.jpg",
    videoUrl: "https://www.youtube.com/watch?v=5y17IzfdYNg",
    role: "Backend Software Engineer",
    duration: "Enterprise Project",
    about:
      "FirmaPDF is a specialized platform designed for organizations that need to apply digital signatures to large volumes of PDF documents — invoices, contracts, reports, certificates — with cryptographic validity and legal enforceability. It bridges the gap between enterprise identity providers and the PDF signing process, making it possible to sign thousands of documents per hour without manual intervention.\n\nThe platform uses the PAdES (PDF Advanced Electronic Signatures) standard, which embeds the digital signature directly into the PDF file structure, making it self-contained and independently verifiable. Each signed PDF carries its own cryptographic proof of integrity and origin, so recipients can validate the signature without accessing any external service.\n\nBuilt on Spring Boot with asynchronous processing via message queues, FirmaPDF handles the computational intensity of cryptographic signing without blocking the API layer. The result is a responsive platform that scales horizontally to meet peak demand periods.",
    problem:
      "Enterprises that generate high volumes of PDF documents — thousands of invoices, statements, contracts, or certificates per day — face a bottleneck when these documents need digital signatures. Manual signing is impractical at scale, and basic PDF signing libraries lack the integration with enterprise identity providers, HSM-backed key stores, and PAdES compliance that regulated industries require. The gap between 'we have a PDF' and 'we have a legally signed PDF' involves cryptographic operations, identity verification, format compliance, and audit logging — a complex pipeline that most organizations struggle to build and operate reliably.",
    solution:
      "FirmaPDF automates this pipeline end-to-end. Identity providers (OAuth2) authenticate users and authorize signing operations. The platform receives PDFs through a REST API, queues them for processing, applies PAdES-compliant digital signatures using HSM-backed keys, and returns the signed documents. Asynchronous processing means the API responds immediately with a job ID, and clients poll for completion or receive webhook notifications. Every operation is logged for audit purposes, and signed PDFs include embedded timestamps and certificate chains for long-term validation.",
    features: [
      {
        icon: "FileText",
        title: "Mass PDF Signing",
        description:
          "Sign hundreds or thousands of PDFs in a single batch operation with progress tracking and partial failure handling.",
      },
      {
        icon: "Fingerprint",
        title: "OAuth2 Integration",
        description:
          "Connect with any OAuth2 identity provider — corporate directories, social logins, or government identity systems — for user authentication and authorization.",
      },
      {
        icon: "Zap",
        title: "Asynchronous Processing",
        description:
          "Non-blocking API design: submit signing jobs and continue working while the platform processes documents in the background with real-time status updates.",
      },
      {
        icon: "FileSignature",
        title: "PAdES",
        description:
          "PDF Advanced Electronic Signatures (PAdES) standard compliance — signatures are embedded in the PDF structure, making each document self-contained and independently verifiable.",
      },
      {
        icon: "CheckCircle",
        title: "Signature Validation",
        description:
          "Built-in signature validation that verifies the cryptographic integrity, certificate chain, and timestamp of every signed PDF.",
      },
      {
        icon: "Server",
        title: "REST API",
        description:
          "Clean REST API for submitting PDFs, checking job status, and retrieving signed documents — easily integrated into existing workflows and applications.",
      },
      {
        icon: "Key",
        title: "Certificate Management",
        description:
          "Centralized certificate management with automatic renewal reminders, expiration monitoring, and multi-certificate support for different signing profiles.",
      },
      {
        icon: "Database",
        title: "Audit Trail",
        description:
          "Complete audit trail of every signing operation: who signed, when, with which certificate, and the cryptographic fingerprint of the resulting document.",
      },
      {
        icon: "Lock",
        title: "HSM",
        description:
          "Hardware Security Module integration for protecting signing keys — private keys never leave the secure hardware boundary.",
      },
    ],
    participation: [
      "Designed the REST API for document submission, status checking, and signed PDF download",
      "Implemented the signing pipeline: PDF reception, queuing, cryptographic signing, and result notification",
      "Integrated with OAuth2 identity providers for signing operation authentication and authorization",
      "Developed PAdES signing logic: embedding signatures in the PDF structure with certificate chains and timestamps",
      "Implemented persistence for signing jobs and audit logs in PostgreSQL",
      "Optimized asynchronous processing to handle demand peaks without degradation",
      "Implemented retries and partial failure handling for bulk signing batches",
      "Resolved production incidents: signing failures, expired certificates, and HSM timeouts",
      "Collaborated with integration teams to connect FirmaPDF with document-generating systems",
    ],
    technicalChallenges: [
      {
        title: "High-Volume Processing",
        description:
          "Handling thousands of concurrent signing requests requires careful queue management, connection pooling to the HSM, and backpressure mechanisms to prevent resource exhaustion.",
      },
      {
        title: "PAdES Compliance",
        description:
          "PAdES has multiple levels (B-B, B-T, B-LT, B-LTA) with increasing requirements for timestamps, revocation data, and long-term validation material — each level required precise PDF structure manipulation.",
      },
      {
        title: "Multi-IdP Integration",
        description:
          "Each identity provider has its own OAuth2 implementation nuances — token formats, scopes, refresh behaviors — requiring a flexible authentication layer that adapts to each provider.",
      },
      {
        title: "Partial Failure Handling",
        description:
          "In a batch of 5000 PDFs, if 3 fail due to corrupted input and 2 fail due to HSM timeouts, the platform must report failures precisely without blocking the 4995 successful signatures.",
      },
      {
        title: "HSM Throughput",
        description:
          "HSMs have finite signing throughput — typically hundreds of operations per second. Optimizing connection pooling, request batching, and key caching was essential to avoid the HSM becoming the bottleneck.",
      },
    ],
    security: {
      description:
        "FirmaPDF operates at the intersection of document integrity and identity trust. Every signed PDF must be independently verifiable — by recipients, auditors, and courts — without relying on the platform's availability.",
      items: [
        {
          title: "PAdES Digital Signature",
          description:
            "Signatures follow the PAdES standard, embedding the full certificate chain and revocation data (OCSP/CRL) directly into the PDF for offline validation.",
        },
        {
          title: "Document Integrity",
          description:
            "The digital signature covers the entire PDF content — any modification after signing invalidates the signature, providing tamper-evident protection.",
        },
        {
          title: "HSM",
          description:
            "Private signing keys are generated and stored inside FIPS 140-2 certified HSMs. They never exist in application memory or on disk.",
        },
        {
          title: "OAuth2 Authentication",
          description:
            "Every signing operation is authenticated through OAuth2 identity providers, ensuring that only authorized users can initiate signatures with specific certificates.",
        },
        {
          title: "Non-Repudiation",
          description:
            "The combination of OAuth2 authentication, HSM-backed signatures, and embedded timestamps creates a non-repudiable record of who signed what and when.",
        },
        {
          title: "Audit Trail",
          description:
            "All signing operations are logged with cryptographic hashes — the audit trail itself is verifiable and can demonstrate the chain of custody for every signed document.",
        },
      ],
    },
    impact: [
      {
        label: "Documents Signed",
        value: "Thousands/day",
        icon: "FileText",
      },
      {
        label: "Time Reduction",
        value: "90%+",
        icon: "Clock",
      },
      {
        label: "Legal Validity",
        value: "PAdES",
        icon: "Shield",
      },
      {
        label: "Automation",
        value: "End-to-End",
        icon: "Zap",
      },
    ],
    technologies: [
      "Java",
      "Spring Boot",
      "Spring Security",
      "PostgreSQL",
      "OAuth2",
      "JWT",
      "Docker",
      "Git",
      "REST APIs",
      "HSM",
      "PDF/A",
      "PAdES",
    ],
    lessonsLearned: [
      "PAdES compliance requires meticulous PDF structure manipulation — you are not just 'adding a signature,' you are injecting a cryptographic structure that must survive PDF readers, validators, and long-term archival.",
      "Asynchronous processing is the only viable pattern for high-volume PDF signing — synchronous APIs would timeout or block under load.",
      "HSM throughput planning must account for peak loads, not averages — signing 50,000 PDFs at month-end requires different capacity than 500 per day.",
      "OAuth2 integration is deceptively complex: token refresh, scope negotiation, and provider-specific quirks consume more development time than the core signing logic.",
      "Audit trails are not optional in regulated industries — cryptographic hashes of every operation must be stored and retrievable, sometimes years later.",
    ],
    gallery: [
      { src: "/images/isa-interfase/tuid-firma.jpg", alt: "FirmaPDF — TuID digital signing interface" },
      { src: "/images/isa-interfase/tuid.jpg", alt: "TuID digital identity platform" },
      { src: "/images/isa-interfase/tuid2.jpg", alt: "TuID authentication and identity verification" },
      { src: "/projects/placeholder.svg", alt: "FirmaPDF batch signing dashboard" },
    ],
    useCases: [
      {
        title: "TuID — Digital Identity",
        description:
          "FirmaPDF powers the document signing capabilities of TuID (Your Digital Identity), ANTEL's digital identity platform for Uruguay. TuID users register, verify their identity, authenticate with multiple security levels (password, OTP, biometrics), and sign PDF documents electronically with full legal validity — all through FirmaPDF's signing engine.",
      },
      {
        title: "Contract Signing",
        description:
          "Organizations sign thousands of contracts digitally per month — employment agreements, vendor contracts, NDAs — with PAdES-compliant signatures that are independently verifiable.",
      },
      {
        title: "Compliance Documents",
        description:
          "Regulated industries use FirmaPDF to sign and timestamp compliance documents, ensuring cryptographic proof of integrity and non-repudiation for audits and regulatory submissions.",
      },
    ],
    demoVideos: [
      {
        title: "How to sign documents",
        url: "https://www.youtube.com/watch?v=5y17IzfdYNg",
      },
      {
        title: "How to validate signed documents",
        url: "https://www.youtube.com/watch?v=ApXqs9O3Q8k",
      },
    ],
    callToAction: {
      text: "Explore other projects",
      link: "/dev#experience",
    },
    metadata: {
      title: "FirmaPDF — Mass PDF Digital Signing Platform",
      description:
        "High-throughput platform for PAdES-compliant PDF digital signatures. Asynchronous processing, OAuth2 integration, and HSM-backed cryptographic operations.",
    },
  },
  // ─── Magento Billing Plugin ──────────────────────────────────
  {
    slug: "magento-billing-plugin",
    name: "Magento Billing Plugin",
    subtitle: "Custom billing automation plugin for Magento eCommerce",
    shortDescription:
      "Custom Magento plugin that automated recurring billing, subscription management, and payment gateway integration for e-commerce clients, reducing manual invoicing overhead by 60%.",
    heroImage: "/images/beacon42/beacon42.png",
    role: "Magento Developer",
    duration: "2018 — 2019",
    about:
      "During my time at Beacon42, I developed a custom Magento plugin from scratch to manage complex billing workflows for e-commerce clients. The plugin automated recurring invoicing, subscription handling, and integrated multiple third-party payment gateways — all without requiring downtime during deployment.\n\nThe project required deep knowledge of Magento's plugin architecture, PHP development patterns, and eCommerce business logic. I gained hands-on experience with the Magento ecosystem while helping a fast-scaling startup deliver value to its clients.",
    problem:
      "E-commerce clients using Magento needed automated recurring billing and subscription management beyond the platform's built-in capabilities. Manual invoicing was time-consuming, error-prone, and didn't scale with their growing customer bases.",
    solution:
      "Built a custom PHP-based Magento plugin with MySQL backend that automated the entire billing lifecycle — from recurring invoice generation to payment gateway integration and subscription status tracking. The plugin extended Magento's admin panel with custom dashboards for reporting and inventory management.",
    features: [
      {
        icon: "CreditCard",
        title: "Recurring Billing",
        description:
          "Automated generation and processing of recurring invoices based on configurable billing cycles.",
      },
      {
        icon: "Server",
        title: "Payment Gateway Integration",
        description:
          "Seamless integration with multiple third-party payment gateways and shipping APIs.",
      },
      {
        icon: "Monitor",
        title: "Admin Panel Extension",
        description:
          "Custom reporting dashboards and inventory management tools integrated into Magento's admin interface.",
      },
      {
        icon: "Zap",
        title: "Zero-Downtime Deployments",
        description:
          "All integrations and updates deployed without service interruption for live e-commerce stores.",
      },
    ],
    participation: [
      "Designed and developed the Magento plugin architecture from scratch",
      "Implemented recurring billing automation workflows",
      "Integrated third-party payment gateways and shipping APIs",
      "Extended Magento admin panel with custom reporting features",
      "Ensured zero-downtime deployments for production e-commerce stores",
    ],
    technicalChallenges: [
      {
        title: "Plugin Architecture Constraints",
        description:
          "Automating recurring billing workflows within Magento's plugin architecture constraints required creative use of cron jobs and event observers.",
      },
      {
        title: "Multi-Gateway Integration",
        description:
          "Each payment gateway had different API formats, authentication methods, and error handling patterns — requiring a unified abstraction layer.",
      },
    ],
    security: {
      description:
        "Handling payment data required compliance with security best practices for e-commerce platforms.",
      items: [
        {
          title: "Payment Data Security",
          description:
            "Secure handling of payment information with proper encryption and never storing raw credit card data.",
        },
        {
          title: "API Key Management",
          description:
            "Secure storage and rotation of third-party API credentials for payment gateways.",
        },
      ],
    },
    impact: [
      { label: "Manual Work Reduced", value: "60%", icon: "Zap" },
      { label: "Payment Gateways", value: "3+", icon: "CreditCard" },
      { label: "Zero-Downtime Deploys", value: "100%", icon: "Server" },
    ],
    technologies: ["PHP", "Magento", "MySQL", "JavaScript", "REST APIs"],
    architecture: {
      description:
        "PHP-based Magento plugin with MySQL backend, integrating third-party payment gateways and shipping APIs. Extended the Magento admin panel for custom reporting and inventory management dashboards.",
    },
    lessonsLearned: [
      "Deep understanding of Magento's plugin architecture and eCommerce ecosystems",
      "Building abstraction layers for multi-provider integrations saves enormous maintenance effort",
      "Zero-downtime deployments in e-commerce require careful planning around active user sessions",
    ],
    gallery: [{ src: "/images/beacon42/beacon42.png", alt: "Beacon42 — Magento Development" }],
    callToAction: {
      text: "Explore other projects",
      link: "/dev#experience",
    },
    metadata: {
      title: "Magento Billing Plugin — eCommerce Automation",
      description:
        "Custom Magento plugin for automated billing, subscription management, and payment gateway integration. Reduced manual invoicing by 60%.",
    },
  },
  // ─── Web Analytics & Tracking ────────────────────────────────
  {
    slug: "web-analytics-tracking",
    name: "Web Analytics & Tracking",
    subtitle: "Analytics infrastructure for DIRECTV web properties",
    shortDescription:
      "Implementation of Google Analytics and Google Tag Manager across DIRECTV's web properties, enabling data-driven marketing through custom dashboards and automated Excel reporting.",
    heroImage: "/images/portlike/portlike.png",
    role: "Programmer Analyst",
    duration: "2017 — 2018",
    about:
      "At Portlike, I worked on analytics and tracking infrastructure for DIRECTV's web properties. My role combined web development with data analysis — implementing Google Analytics and Tag Manager tracking across multiple websites, building custom dashboards, and creating automated Excel reporting pipelines.\n\nThis was my first professional experience, where I transitioned from an analyst role into web development by demonstrating strong JavaScript skills and eventually maintaining Lumen (Laravel) projects and WordPress sites.",
    problem:
      "DIRECTV needed comprehensive tracking across multiple disparate websites to understand user behavior, measure campaign performance, and generate actionable business intelligence. Manual data entry for weekly reports consumed 15+ hours.",
    solution:
      "Deployed Google Analytics and Tag Manager with custom event tracking across all client websites. Built Laravel (Lumen) APIs for data aggregation and created automated Excel reporting pipelines that eliminated manual data entry entirely.",
    features: [
      {
        icon: "Globe",
        title: "Cross-Site Tracking",
        description:
          "Consistent tracking infrastructure deployed across multiple web properties with different architectures.",
      },
      {
        icon: "Database",
        title: "Data Aggregation APIs",
        description:
          "Laravel (Lumen) APIs consuming external services and presenting insights through clean interfaces.",
      },
      {
        icon: "FileText",
        title: "Automated Reporting",
        description:
          "Excel reporting pipelines that eliminated 15+ hours of weekly manual data entry for business stakeholders.",
      },
      {
        icon: "Monitor",
        title: "Custom Dashboards",
        description:
          "Data-driven marketing dashboards enabling real-time campaign performance measurement.",
      },
    ],
    participation: [
      "Implemented Google Analytics and Tag Manager across multiple client websites",
      "Analyzed metrics and user behavior statistics",
      "Generated reports and configured user behavior tracking",
      "Created graphical Excel reports for executive decision-making",
      "Developed Lumen (Laravel) APIs for data aggregation",
    ],
    technicalChallenges: [
      {
        title: "Disparate Web Architectures",
        description:
          "Implementing consistent tracking across multiple web properties built with different technologies and architectures.",
      },
      {
        title: "Report Automation",
        description:
          "Automating complex Excel report generation to eliminate 15+ hours of weekly manual data entry while maintaining accuracy.",
      },
    ],
    security: {
      description:
        "Analytics implementation required careful handling of user data and compliance with privacy standards.",
      items: [
        {
          title: "Data Privacy Compliance",
          description:
            "Ensuring analytics tracking respected user privacy and complied with relevant data protection standards.",
        },
        {
          title: "Access Control",
          description:
            "Proper access management for Google Analytics and Tag Manager accounts across multiple stakeholders.",
        },
      ],
    },
    impact: [
      { label: "Weekly Manual Work Saved", value: "15+ hrs", icon: "Clock" },
      { label: "Websites Tracked", value: "Multiple", icon: "Globe" },
      { label: "Report Automation", value: "100%", icon: "Zap" },
    ],
    technologies: [
      "Google Analytics",
      "Google Tag Manager",
      "Laravel",
      "PHP",
      "JavaScript",
      "Excel",
    ],
    architecture: {
      description:
        "Google Analytics and Tag Manager deployed across multiple client websites with custom event tracking. Laravel (Lumen) APIs for data aggregation and Excel-based automated reporting pipelines.",
    },
    lessonsLearned: [
      "Data-driven decision making requires clean, consistent tracking infrastructure",
      "Automating manual reporting processes delivers immediate tangible ROI",
      "Combining analytical skills with development creates unique value in any team",
    ],
    gallery: [{ src: "/images/portlike/portlike.png", alt: "Portlike — Web Analytics" }],
    callToAction: {
      text: "Explore other projects",
      link: "/dev#experience",
    },
    metadata: {
      title: "Web Analytics & Tracking — DIRECTV",
      description:
        "Google Analytics and Tag Manager implementation across DIRECTV web properties. Automated reporting pipelines saving 15+ hours weekly.",
    },
  },
  // ─── WordPress Corporate Site ────────────────────────────────
  {
    slug: "wordpress-corporate-site",
    name: "WordPress Corporate Site",
    subtitle: "Corporate website maintenance and evolution for DIRECTV",
    shortDescription:
      "Maintenance and evolution of DIRECTV's corporate WordPress website — new campaign pages, feature enhancements, performance optimization, and third-party plugin management.",
    heroImage: "/images/portlike/takeoff.jpg",
    role: "Web Developer",
    duration: "2017 — 2018",
    about:
      "As part of my work at Portlike (alongside Takeoff, a partner company sharing the same office), I contributed to the maintenance and evolution of DIRECTV's corporate WordPress website. This involved developing new commercial campaign pages, fixing bugs, optimizing performance, and integrating third-party plugins.\n\nThe role required balancing rapid campaign deployment demands with production stability — ensuring that marketing teams could launch new pages quickly without compromising the site's reliability.",
    problem:
      "DIRECTV's corporate site required ongoing evolution — new campaign pages, feature enhancements, bug fixes, and performance optimization — while maintaining stability in a high-traffic production environment.",
    solution:
      "Developed new WordPress pages and components using custom PHP, HTML, CSS, and JavaScript. Managed third-party plugin integrations, performed bug fixes, and optimized site performance for production traffic.",
    features: [
      {
        icon: "Layout",
        title: "Campaign Pages",
        description:
          "Custom commercial campaign landing pages developed rapidly to support marketing initiatives.",
      },
      {
        icon: "Zap",
        title: "Performance Optimization",
        description:
          "Site speed improvements and production environment tuning for high-traffic scenarios.",
      },
      {
        icon: "CheckCircle",
        title: "Bug Fixes & Maintenance",
        description:
          "Ongoing maintenance ensuring stability while new features were continuously deployed.",
      },
      {
        icon: "Server",
        title: "Plugin Management",
        description:
          "Integration and maintenance of third-party WordPress plugins with compatibility assurance.",
      },
    ],
    participation: [
      "Developed new commercial campaign pages and components",
      "Performed bug fixes and feature enhancements",
      "Integrated and maintained third-party WordPress plugins",
      "Optimized site performance for production environments",
      "Ensured compatibility across plugin updates and WordPress versions",
    ],
    technicalChallenges: [
      {
        title: "Rapid Deployments vs Stability",
        description:
          "Balancing the need for fast campaign page deployments with maintaining production stability and performance.",
      },
      {
        title: "Plugin Compatibility",
        description:
          "Ensuring third-party plugins remained compatible and secure across WordPress core updates.",
      },
    ],
    security: {
      description:
        "Maintaining a corporate website required attention to WordPress security best practices.",
      items: [
        {
          title: "Plugin Security",
          description:
            "Regular security audits of third-party plugins and timely updates to patch vulnerabilities.",
        },
        {
          title: "Production Access Control",
          description:
            "Controlled access to production environments with proper deployment procedures.",
        },
      ],
    },
    impact: [
      { label: "Campaign Pages", value: "Multiple", icon: "Layout" },
      { label: "Plugins Managed", value: "Multiple", icon: "Server" },
      { label: "Production Stability", value: "Maintained", icon: "Shield" },
    ],
    technologies: ["WordPress", "PHP", "HTML", "CSS", "JavaScript", "MySQL"],
    architecture: {
      description:
        "WordPress CMS with custom PHP development for new functionality. HTML, CSS, and JavaScript for frontend components. Third-party plugin integration and maintenance.",
    },
    lessonsLearned: [
      "Production WordPress sites require disciplined plugin management and update strategies",
      "Rapid marketing deployments need streamlined development workflows without sacrificing quality",
      "Cross-team collaboration (Portlike + Takeoff) taught effective communication in shared office environments",
    ],
    gallery: [{ src: "/images/portlike/takeoff.jpg", alt: "Takeoff — WordPress Development" }],
    callToAction: {
      text: "Explore other projects",
      link: "/dev#experience",
    },
    metadata: {
      title: "WordPress Corporate Site — DIRECTV",
      description:
        "Maintenance and evolution of DIRECTV's corporate WordPress website. Campaign pages, performance optimization, and plugin management.",
    },
  },
  // ─── Crowdfunding Platform ───────────────────────────────────
  {
    slug: "crowdfunding-platform",
    name: "Crowdfunding Platform",
    subtitle: "Modern microservices-based crowdfunding platform",
    shortDescription:
      "A modern crowdfunding platform inspired by Kickstarter, built with a microservices architecture. A personal project showcasing full-stack capabilities from infrastructure to UI as part of the QR S.A.S. initiative.",
    heroImage: "/images/qr-sas/qr_logo.webp",
    role: "Founder & Full Stack Developer",
    duration: "2026 — Present",
    about:
      "QR S.A.S. is my personal entrepreneurial project — a modern crowdfunding platform that demonstrates how a microservices approach can solve the scaling and flexibility limitations of monolithic platforms.\n\nThe platform is built from the ground up using Spring Boot microservices for campaigns, users, payments, and notifications, each with independent databases. Services communicate via REST APIs with JWT-based authentication, orchestrated through Docker Compose for local development.\n\nThis project is my sandbox for exploring distributed systems, cloud infrastructure, and full-stack development — applying everything I've learned in enterprise environments to a product I own end-to-end.",
    problem:
      "Most crowdfunding platforms are monolithic, making it difficult to scale specific features independently or experiment with new functionality. I wanted to build a platform that demonstrates how a microservices approach can solve these problems while providing a clean, modern user experience.",
    solution:
      "Designed a microservices architecture with independent Spring Boot services for campaigns, users, payments, and notifications — each with its own PostgreSQL database. Services communicate through REST APIs with centralized JWT authentication. The React frontend provides a responsive, modern interface.",
    features: [
      {
        icon: "Server",
        title: "Microservices Architecture",
        description:
          "Independent services for campaigns, users, payments, and notifications, each with dedicated databases.",
      },
      {
        icon: "Key",
        title: "JWT Authentication",
        description:
          "Centralized token-based authentication across all microservices with secure API communication.",
      },
      {
        icon: "CreditCard",
        title: "Payment Processing",
        description:
          "Dedicated payment service handling transactions with proper isolation from campaign logic.",
      },
      {
        icon: "Globe",
        title: "Responsive React Frontend",
        description:
          "Modern, responsive UI built with React and TypeScript connected to the microservices backend.",
      },
      {
        icon: "Database",
        title: "Independent Databases",
        description:
          "Each service owns its data — PostgreSQL for transactional data with proper domain boundaries.",
      },
      {
        icon: "Container",
        title: "Docker Orchestration",
        description:
          "Docker Compose for local development with orchestrated service startup and health checks.",
      },
    ],
    participation: [
      "Designed the complete microservices architecture and service boundaries",
      "Implemented all backend services (campaigns, users, payments, notifications)",
      "Built the React frontend with TypeScript",
      "Configured Docker Compose for local development orchestration",
      "Designed database schemas for each independent service",
    ],
    technicalChallenges: [
      {
        title: "Distributed Transactions",
        description:
          "Managing distributed transactions across campaign creation, payment processing, and notification services without a distributed transaction coordinator.",
      },
      {
        title: "Service Decomposition",
        description:
          "Designing a service decomposition that balances domain autonomy with practical development velocity for a solo project.",
      },
      {
        title: "Data Consistency",
        description:
          "Maintaining data consistency across independent databases while allowing each service to evolve independently.",
      },
    ],
    security: {
      description:
        "The platform implements security best practices from the ground up, applying enterprise patterns to a personal project.",
      items: [
        {
          title: "JWT-Based Auth",
          description:
            "Token-based authentication with proper expiration, refresh tokens, and secure token storage.",
        },
        {
          title: "API Security",
          description:
            "All inter-service communication secured with proper authentication and input validation.",
        },
        {
          title: "Data Isolation",
          description:
            "Independent databases ensure that a compromise in one service doesn't expose data from others.",
        },
      ],
    },
    impact: [
      { label: "Microservices", value: "4", icon: "Server" },
      { label: "Independent DBs", value: "4", icon: "Database" },
      { label: "API Gateway", value: "Centralized", icon: "Shield" },
      { label: "Docker Services", value: "5+", icon: "Container" },
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
    architecture: {
      description:
        "Microservices architecture with Spring Boot services for campaigns, users, payments, and notifications — each with its own database. Services communicate via REST APIs with JWT-based authentication. PostgreSQL for transactional data. Docker Compose for local development. React frontend with a clean, responsive design.",
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
    style AG fill:#2563eb,stroke:#1d4ed8,color:#fff
    style Auth fill:#1e1e24,stroke:#2a2a35,color:#f0f0f5
    style CS fill:#1e1e24,stroke:#2a2a35,color:#f0f0f5
    style US fill:#1e1e24,stroke:#2a2a35,color:#f0f0f5
    style PS fill:#1e1e24,stroke:#2a2a35,color:#f0f0f5
    style NS fill:#1e1e24,stroke:#2a2a35,color:#f0f0f5`,
    },
    lessonsLearned: [
      "Distributed transactions are the hardest problem in microservices — eventual consistency patterns are essential",
      "Service boundaries should be drawn around business domains, not technical layers",
      "For solo projects, start with fewer services and split as complexity genuinely demands it",
    ],
    gallery: [{ src: "/projects/placeholder.svg", alt: "Crowdfunding Platform Architecture" }],
    callToAction: {
      text: "Explore other projects",
      link: "/dev#experience",
    },
    metadata: {
      title: "Crowdfunding Platform — QR S.A.S.",
      description:
        "Modern microservices-based crowdfunding platform. Spring Boot, React, PostgreSQL, and Docker. Personal entrepreneurial project.",
    },
  },
];
