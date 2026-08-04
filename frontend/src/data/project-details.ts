import type { ProjectDetail } from "@/types";

export const projectDetails: ProjectDetail[] = [
  {
    slug: "mirecibo",
    name: "MiRecibo",
    subtitle:
      "Digital payroll receipt management platform with electronic and digital signatures",
    shortDescription:
      "Enterprise platform for completely digitizing the delivery and signing of payroll receipts. Eliminates paper, integrates with any payroll system, and deploys Cloud or On-Premise.",
    heroImage: "/images/mirecibo-uy.jpg",
    role: "Backend Software Engineer",
    duration: "Enterprise Project",
    instances: [
      {
        country: "Uruguay",
        flag: "🇺🇾",
        description:
          "Pioneer platform for electronic payroll receipt management in Uruguay, integrating with the country's largest payroll systems. Supports electronic signature, digital signature, and timestamping for legal validity.",
        highlights: [
          "Firma electrónica",
          "Firma digital",
          "Sellado de tiempo",
          "Integración con sistemas de liquidación",
          "HSM",
          "CI Electrónica",
        ],
        videoUrl: "https://www.youtube.com/watch?v=w2G8tXRKwhk",
        image: "/images/mirecibo-uy.jpg",
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
          "Tarjetas criptográficas",
          "Custodia en la nube",
        ],
        videoUrl: "https://www.youtube.com/watch?v=snnrY5ExBdM",
        image: "/images/mirecibo-py.jpg",
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
        title: "Gestión electrónica de recibos",
        description:
          "Complete digital lifecycle for payroll receipts — generation, distribution, signing, and archival without a single sheet of paper.",
      },
      {
        icon: "FileSignature",
        title: "Firma electrónica",
        description:
          "Legally valid electronic signatures that authenticate the employer's identity and the document's integrity.",
      },
      {
        icon: "Key",
        title: "Firma digital",
        description:
          "Cryptographic digital signatures backed by HSM, providing the highest level of legal validity and non-repudiation.",
      },
      {
        icon: "Clock",
        title: "Sellado de tiempo",
        description:
          "Timestamp authority integration that certifies exactly when each document was signed, ensuring long-term verifiability.",
      },
      {
        icon: "Database",
        title: "Integración con sistemas de liquidación",
        description:
          "Standardized APIs that connect with any payroll system, receiving receipt data automatically each pay cycle.",
      },
      {
        icon: "Users",
        title: "Portal para empleados",
        description:
          "Secure web portal where employees can view, download, and verify their signed receipts at any time.",
      },
      {
        icon: "Globe",
        title: "Gestión multiempresa",
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
        title: "CI Electrónica",
        description:
          "Integration with Uruguay's national electronic identity card for strong citizen authentication.",
      },
      {
        icon: "HardDrive",
        title: "Repositorio seguro",
        description:
          "Encrypted document repository ensuring signed receipts remain protected, immutable, and always available.",
      },
    ],
    participation: [
      "Diseño de APIs REST para la integración con sistemas de liquidación de sueldos y portales de empleados",
      "Implementación de funcionalidades core de la plataforma: gestión de recibos, flujos de firma y notificaciones",
      "Integración con módulos de firma electrónica y digital, incluyendo HSM y sellado de tiempo",
      "Lógica de negocio para flujos de aprobación multiempresa con control de acceso basado en roles",
      "Persistencia de datos con PostgreSQL: esquemas relacionales, consultas optimizadas y migraciones",
      "Integración con otros sistemas: CI Electrónica (Uruguay), tokens criptográficos y tarjetas inteligentes (Paraguay)",
      "Optimización de rendimiento para operaciones de firma masiva de miles de recibos por ciclo",
      "Corrección de incidencias en entornos productivos con seguimiento de errores y despliegue de hotfixes",
      "Trabajo colaborativo con equipos de frontend, QA, infraestructura y producto para entregas iterativas",
    ],
    technicalChallenges: [
      {
        title: "Integración con distintos sistemas",
        description:
          "Connecting MiRecibo with diverse payroll systems — each with its own data format, schedule, and authentication — required building a flexible integration layer that normalizes input without losing fidelity.",
      },
      {
        title: "Seguridad",
        description:
          "Handling sensitive payroll data and cryptographic keys demanded defense-in-depth: encrypted storage, HSM for key operations, TLS everywhere, and strict access controls at every layer.",
      },
      {
        title: "Procesamiento de documentos",
        description:
          "Generating, signing, and delivering thousands of receipts per pay cycle required efficient PDF generation pipelines and asynchronous processing to maintain throughput.",
      },
      {
        title: "Compatibilidad con diferentes mecanismos de firma",
        description:
          "Uruguay and Paraguay have different legal frameworks and certification mechanisms — the platform had to abstract signature operations to support both electronic signatures, digital signatures, smart cards, and cryptographic tokens uniformly.",
      },
      {
        title: "Escalabilidad",
        description:
          "The platform needed to handle peak loads during pay cycles — when thousands of employees access their receipts simultaneously — without degradation in response times or signing throughput.",
      },
    ],
    security: {
      description:
        "MiRecibo was designed with security as a foundational requirement, not an afterthought. Handling sensitive payroll data and cryptographic signing operations demanded a comprehensive security architecture.",
      items: [
        {
          title: "Firma Digital",
          description:
            "Cryptographic signatures backed by asymmetric key pairs stored in HSM, providing the highest level of legal validity under Uruguayan and Paraguayan law.",
        },
        {
          title: "Firma Electrónica",
          description:
            "Electronic signatures that authenticate identity and intent, with audit trails that meet regulatory requirements for payroll documentation.",
        },
        {
          title: "No Repudio",
          description:
            "Every signature is cryptographically bound to the signer's identity, making it impossible to deny having signed a document — critical for legal validity.",
        },
        {
          title: "Sellado de Tiempo",
          description:
            "RFC 3161-compliant timestamps from a trusted Time Stamp Authority (TSA) certify exactly when each document was signed, ensuring long-term verifiability even after certificates expire.",
        },
        {
          title: "Protección de documentos",
          description:
            "Signed documents are stored in an encrypted repository with integrity checks that detect any tampering. PDF/A format ensures long-term archival compatibility.",
        },
        {
          title: "Integridad",
          description:
            "Cryptographic hashes of every document are stored alongside the signatures, allowing independent verification that the document has not been altered since signing.",
        },
        {
          title: "Autenticación",
          description:
            "Multi-factor authentication with OAuth2 and JWT tokens, integrated with national identity systems (CI Electrónica in Uruguay) for strong citizen authentication.",
        },
      ],
    },
    impact: [
      {
        label: "Usuarios",
        value: "80.000+",
        icon: "Users",
      },
      {
        label: "Reducción de papel",
        value: "100%",
        icon: "FileText",
      },
      {
        label: "Automatización",
        value: "Total",
        icon: "Zap",
      },
      {
        label: "Optimización RRHH",
        value: "Significativa",
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
      link: "/#projects",
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
    heroImage: "/images/ISCERT.jpg",
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
        title: "Autoridad Certificadora",
        description:
          "Full Certification Authority functionality — issue, manage, and revoke X.509 digital certificates with configurable policies and templates.",
      },
      {
        icon: "FileSignature",
        title: "Firma Digital",
        description:
          "Cryptographic digital signatures backed by HSM, providing legal validity and non-repudiation for electronic documents and transactions.",
      },
      {
        icon: "FileText",
        title: "Firma Electrónica",
        description:
          "Electronic signature workflows with identity verification and audit trails, suitable for internal approvals and less formal processes.",
      },
      {
        icon: "CheckCircle",
        title: "Validación de certificados",
        description:
          "OCSP and CRL services for real-time certificate status checking, ensuring revoked or expired certificates are detected immediately.",
      },
      {
        icon: "Users",
        title: "Gestión de identidades",
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
        title: "Autenticación",
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
        title: "Custodia criptográfica",
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
        title: "Autenticación Multifactor",
        description:
          "Multi-factor authentication combining certificates with biometrics, OTP, or push notifications for defense-in-depth.",
      },
    ],
    participation: [
      "Diseño de APIs REST para los servicios de certificación, validación y firma digital",
      "Implementación de flujos de emisión, renovación y revocación de certificados X.509",
      "Integración con HSM para la protección de claves privadas de la Autoridad Certificadora",
      "Desarrollo de servicios OCSP y CRL para validación de estado de certificados en tiempo real",
      "Lógica de negocio para políticas de certificación: plantillas, restricciones de uso y períodos de validez",
      "Persistencia de certificados, solicitudes y registros de auditoría en PostgreSQL",
      "Integración con directorios corporativos (LDAP/Active Directory) para la gestión de identidades",
      "Optimización de rendimiento para validaciones masivas de certificados en entornos de alta concurrencia",
      "Trabajo colaborativo con equipos de seguridad, infraestructura y producto para alinear la PKI con los requisitos regulatorios",
    ],
    technicalChallenges: [
      {
        title: "Seguridad",
        description:
          "As a Certification Authority, ISCERT is a high-value target — protecting root keys in HSM, enforcing strict access controls, and maintaining tamper-evident audit trails were non-negotiable requirements.",
      },
      {
        title: "Criptografía",
        description:
          "Implementing certificate issuance, signature verification, and revocation required deep understanding of X.509, PKCS standards, OCSP, CRLs, and cryptographic algorithms (RSA, ECDSA, SHA-2/3).",
      },
      {
        title: "Escalabilidad",
        description:
          "Certificate validation services (OCSP) must respond in milliseconds even under thousands of concurrent requests — requiring aggressive caching, optimized database queries, and horizontal scaling.",
      },
      {
        title: "Alta disponibilidad",
        description:
          "The Certification Authority must be available 24/7 — certificate issuance delays can block critical business processes. This required redundant HSM deployment and database replication.",
      },
      {
        title: "Integración con dispositivos seguros",
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
          title: "Firma Digital",
          description:
            "Cryptographic signatures using asymmetric key pairs generated and stored in FIPS 140-2 Level 3 certified HSMs.",
        },
        {
          title: "Criptografía",
          description:
            "Industry-standard algorithms (RSA 2048/4096, ECDSA P-256/P-384, SHA-256/384/512) with algorithm agility to migrate as cryptographic standards evolve.",
        },
        {
          title: "No Repudio",
          description:
            "Every signature and certificate issuance is cryptographically attributable to a specific identity, with audit trails that provide legal evidence of who did what and when.",
        },
        {
          title: "Integridad",
          description:
            "All certificates, CRLs, and signed documents include cryptographic hashes that enable independent verification of data integrity at any point in the future.",
        },
        {
          title: "Confidencialidad",
          description:
            "Certificate private keys are generated inside HSMs and never leave the secure hardware boundary — even administrators cannot extract them.",
        },
        {
          title: "Certificados X509",
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
        label: "Transformación Digital",
        value: "Habilitada",
        icon: "Zap",
      },
      {
        label: "Automatización",
        value: "End-to-End",
        icon: "CheckCircle",
      },
      {
        label: "Procesos Paperless",
        value: "Completos",
        icon: "FileText",
      },
      {
        label: "Seguridad Empresarial",
        value: "Grado PKI",
        icon: "Shield",
      },
      {
        label: "Validez Legal",
        value: "Garantizada",
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
        "ISCERT follows a layered architecture with clear separation between the presentation, application, cryptographic, and persistence layers. Client applications authenticate through the API gateway, which routes requests to the appropriate service. Cryptographic operations are delegated to a dedicated cryptographic engine backed by HSMs, ensuring that sensitive key material never leaves the secure hardware boundary.",
      mermaidCode: `graph TD
    A[Client Applications] --> B[API Gateway]
    B --> C[Authentication Service]
    B --> D[Certificate Service]
    B --> E[Signature Service]
    B --> F[Validation Service]
    C --> G[HSM]
    D --> G
    E --> G
    D --> H[(PostgreSQL)]
    E --> H
    F --> H
    C --> H
    D --> I[Certification Authority]
    I --> G
    F --> J[OCSP Responder]
    F --> K[CRL Service]`,
    },
    useCases: [
      {
        title: "Gobierno Digital",
        description:
          "National and local government agencies use ISCERT to issue digital certificates to citizens and public servants, enabling legally valid electronic procedures, digital signatures on official documents, and secure access to government services.",
      },
      {
        title: "Documentos electrónicos",
        description:
          "Organizations sign contracts, agreements, and official documents with digital signatures that carry the same legal weight as handwritten signatures — eliminating printing, courier costs, and processing delays.",
      },
      {
        title: "Firma de contratos",
        description:
          "Legal and procurement departments execute contracts digitally, with cryptographic proof of each party's identity and the exact time of signing — enforceable in court.",
      },
      {
        title: "Identidad Digital",
        description:
          "The platform serves as the identity provider for enterprise SSO, replacing passwords with certificate-based authentication that is resistant to phishing, credential stuffing, and replay attacks.",
      },
      {
        title: "Autenticación",
        description:
          "Applications across the organization consume ISCERT's authentication services through standard protocols (OAuth2, SAML, RADIUS), enabling strong, centralized authentication without each app managing its own credential store.",
      },
      {
        title: "Automatización de procesos",
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
      link: "/#projects",
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
    subtitle:
      "Mass PDF digital signing platform with external identity provider integration",
    shortDescription:
      "High-throughput platform for applying legally valid digital signatures to PDF documents at scale. Integrates with OAuth2 identity providers and processes thousands of documents asynchronously.",
    heroImage: "/images/tuid-firma.jpg",
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
        title: "Firma masiva PDF",
        description:
          "Sign hundreds or thousands of PDFs in a single batch operation with progress tracking and partial failure handling.",
      },
      {
        icon: "Fingerprint",
        title: "Integración OAuth2",
        description:
          "Connect with any OAuth2 identity provider — corporate directories, social logins, or government identity systems — for user authentication and authorization.",
      },
      {
        icon: "Zap",
        title: "Procesamiento asíncrono",
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
        title: "Validación de firma",
        description:
          "Built-in signature validation that verifies the cryptographic integrity, certificate chain, and timestamp of every signed PDF.",
      },
      {
        icon: "Server",
        title: "API REST",
        description:
          "Clean REST API for submitting PDFs, checking job status, and retrieving signed documents — easily integrated into existing workflows and applications.",
      },
      {
        icon: "Key",
        title: "Gestión de certificados",
        description:
          "Centralized certificate management with automatic renewal reminders, expiration monitoring, and multi-certificate support for different signing profiles.",
      },
      {
        icon: "Database",
        title: "Auditoría",
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
      "Diseño de la API REST para el envío de documentos, consulta de estado y descarga de PDFs firmados",
      "Implementación del pipeline de firma: recepción de PDFs, encolado, firma criptográfica y notificación de resultados",
      "Integración con proveedores de identidad OAuth2 para la autenticación y autorización de operaciones de firma",
      "Desarrollo de la lógica de firma PAdES: inserción de firmas en la estructura PDF con cadenas de certificados y timestamps",
      "Persistencia de trabajos de firma y registros de auditoría en PostgreSQL",
      "Optimización del procesamiento asíncrono para manejar picos de demanda sin degradación",
      "Implementación de reintentos y manejo de fallos parciales en lotes de firma masiva",
      "Corrección de incidencias en producción: análisis de fallos de firma, certificados expirados y timeouts de HSM",
      "Trabajo colaborativo con equipos de integración para conectar FirmaPDF con los sistemas generadores de documentos",
    ],
    technicalChallenges: [
      {
        title: "Procesamiento de alto volumen",
        description:
          "Handling thousands of concurrent signing requests requires careful queue management, connection pooling to the HSM, and backpressure mechanisms to prevent resource exhaustion.",
      },
      {
        title: "Cumplimiento PAdES",
        description:
          "PAdES has multiple levels (B-B, B-T, B-LT, B-LTA) with increasing requirements for timestamps, revocation data, and long-term validation material — each level required precise PDF structure manipulation.",
      },
      {
        title: "Integración con múltiples IdPs",
        description:
          "Each identity provider has its own OAuth2 implementation nuances — token formats, scopes, refresh behaviors — requiring a flexible authentication layer that adapts to each provider.",
      },
      {
        title: "Manejo de fallos parciales",
        description:
          "In a batch of 5000 PDFs, if 3 fail due to corrupted input and 2 fail due to HSM timeouts, the platform must report failures precisely without blocking the 4995 successful signatures.",
      },
      {
        title: "Rendimiento del HSM",
        description:
          "HSMs have finite signing throughput — typically hundreds of operations per second. Optimizing connection pooling, request batching, and key caching was essential to avoid the HSM becoming the bottleneck.",
      },
    ],
    security: {
      description:
        "FirmaPDF operates at the intersection of document integrity and identity trust. Every signed PDF must be independently verifiable — by recipients, auditors, and courts — without relying on the platform's availability.",
      items: [
        {
          title: "Firma Digital PAdES",
          description:
            "Signatures follow the PAdES standard, embedding the full certificate chain and revocation data (OCSP/CRL) directly into the PDF for offline validation.",
        },
        {
          title: "Integridad de documentos",
          description:
            "The digital signature covers the entire PDF content — any modification after signing invalidates the signature, providing tamper-evident protection.",
        },
        {
          title: "HSM",
          description:
            "Private signing keys are generated and stored inside FIPS 140-2 certified HSMs. They never exist in application memory or on disk.",
        },
        {
          title: "Autenticación OAuth2",
          description:
            "Every signing operation is authenticated through OAuth2 identity providers, ensuring that only authorized users can initiate signatures with specific certificates.",
        },
        {
          title: "No Repudio",
          description:
            "The combination of OAuth2 authentication, HSM-backed signatures, and embedded timestamps creates a non-repudiable record of who signed what and when.",
        },
        {
          title: "Auditoría",
          description:
            "All signing operations are logged with cryptographic hashes — the audit trail itself is verifiable and can demonstrate the chain of custody for every signed document.",
        },
      ],
    },
    impact: [
      {
        label: "Documentos firmados",
        value: "Miles/día",
        icon: "FileText",
      },
      {
        label: "Reducción de tiempo",
        value: "90%+",
        icon: "Clock",
      },
      {
        label: "Validez Legal",
        value: "PAdES",
        icon: "Shield",
      },
      {
        label: "Automatización",
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
      { src: "/images/tuid-firma.jpg", alt: "FirmaPDF — TuID digital signing interface" },
      { src: "/images/tuid.jpg", alt: "TuID digital identity platform" },
      { src: "/images/tuid2.jpg", alt: "TuID authentication and identity verification" },
      { src: "/projects/placeholder.svg", alt: "FirmaPDF batch signing dashboard" },
    ],
    useCases: [
      {
        title: "TuID — Identidad Digital",
        description:
          "FirmaPDF powers the document signing capabilities of TuID (Tu Identidad Digital), ANTEL's digital identity platform for Uruguay. TuID users register, verify their identity, authenticate with multiple security levels (password, OTP, biometrics), and sign PDF documents electronically with full legal validity — all through FirmaPDF's signing engine.",
      },
      {
        title: "Firma de contratos",
        description:
          "Organizations sign thousands of contracts digitally per month — employment agreements, vendor contracts, NDAs — with PAdES-compliant signatures that are independently verifiable.",
      },
      {
        title: "Documentos de compliance",
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
      link: "/#projects",
    },
    metadata: {
      title: "FirmaPDF — Mass PDF Digital Signing Platform",
      description:
        "High-throughput platform for PAdES-compliant PDF digital signatures. Asynchronous processing, OAuth2 integration, and HSM-backed cryptographic operations.",
    },
  },
];
