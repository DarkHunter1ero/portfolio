import type { ProjectDetail } from "@/types";

export const projectDetailsEs: ProjectDetail[] = [
  {
    slug: "mirecibo",
    name: "MiRecibo",
    subtitle: "Plataforma de gestión digital de recibos de sueldo con firma electrónica y digital",
    shortDescription:
      "Plataforma empresarial para digitalizar completamente la entrega y firma de recibos de sueldo. Elimina el papel, se integra con cualquier sistema de liquidación y se despliega en Cloud u On-Premise.",
    heroImage: "/images/empresas/isa-interfase/mirecibo/mirecibo-uy.jpg",
    role: "Ingeniero de Software Backend",
    duration: "Proyecto Empresarial",
    instances: [
      {
        country: "Uruguay",
        flag: "🇺🇾",
        description:
          "Plataforma pionera para la gestión electrónica de recibos de sueldo en Uruguay, integrándose con los principales sistemas de liquidación del país. Soporta firma electrónica, firma digital y sellado de tiempo con validez legal.",
        highlights: [
          "Firma electrónica",
          "Firma digital",
          "Sellado de tiempo",
          "Integración con sistemas de liquidación",
          "HSM",
          "CI Electrónica",
        ],
        videoUrl: "https://www.youtube.com/watch?v=w2G8tXRKwhk",
        image: "/images/empresas/isa-interfase/mirecibo/mirecibo-uy.jpg",
      },
      {
        country: "Paraguay",
        flag: "🇵🇾",
        description:
          "Extensión de la plataforma a Paraguay como pioneros en el país. Soporta múltiples mecanismos de certificación digital con plena validez legal — PDF/A, PAdES, HSM, tokens criptográficos, tarjetas inteligentes y custodia en la nube.",
        highlights: [
          "PDF/A",
          "PAdES",
          "HSM",
          "Tokens",
          "Tarjetas criptográficas",
          "Custodia en la nube",
        ],
        videoUrl: "https://www.youtube.com/watch?v=snnrY5ExBdM",
        image: "/images/empresas/isa-interfase/mirecibo/mirecibo-py.jpg",
      },
    ],
    about:
      "MiRecibo es una plataforma de nivel empresarial que transforma completamente la forma en que las empresas gestionan los recibos de sueldo. En lugar de imprimir, distribuir y archivar documentos físicos, la plataforma digitaliza el ciclo de vida completo — desde la generación hasta la firma digital con validez legal y el archivo seguro.\n\nConstruida sobre un robusto backend Spring Boot con PostgreSQL para integridad transaccional, la plataforma se integra sin fricción con cualquier sistema de liquidación existente a través de APIs estandarizadas. Las empresas pueden configurar su jerarquía organizacional, definir flujos de firma basados en roles y personalizar las plantillas de documentos según sus necesidades exactas.\n\nLa plataforma soporta tanto firma electrónica como digital, respaldada por Módulos de Seguridad Hardware (HSM) para operaciones criptográficas. Cada documento firmado tiene validez legal mediante servicios de sellado de tiempo, garantizando el no repudio y la verificabilidad a largo plazo. Los empleados acceden a sus recibos a través de un portal web seguro, eliminando por completo la necesidad de distribución física.",
    problem:
      "Las empresas que gestionan recibos de sueldo físicos enfrentan una carga operativa significativa. Cada ciclo de pago implica imprimir miles de documentos, distribuirlos a los empleados, atender consultas de RRHH sobre recibos extraviados y mantener archivos físicos para cumplimiento legal — un proceso que consume tiempo, dinero y espacio de almacenamiento. Para organizaciones multiempresa, esta complejidad se multiplica entre diferentes entidades legales, cada una con su propia jerarquía, flujos de aprobación y plantillas de documentos. La carga administrativa, combinada con el riesgo de documentos perdidos y brechas de cumplimiento, hace que la gestión tradicional de recibos sea insostenible a escala empresarial.",
    solution:
      "MiRecibo resuelve estos desafíos mediante una plataforma completamente digital que automatiza cada paso. Los sistemas de liquidación envían los datos de recibos vía API, la plataforma genera documentos formateados, los enruta a través de flujos de firma configurables, aplica firmas digitales con validez legal mediante HSM y los entrega a los empleados a través de un portal seguro. Todo el proceso es auditable, con garantías de integridad criptográfica y sellos de tiempo que aseguran que los documentos sean verificables durante años. El soporte multiempresa permite que cada entidad legal tenga su propia configuración, flujos de trabajo y gestión de usuarios — todo desde un único despliegue.",
    features: [
      {
        icon: "FileText",
        title: "Gestión electrónica de recibos",
        description:
          "Ciclo de vida digital completo para recibos de sueldo — generación, distribución, firma y archivo sin una sola hoja de papel.",
      },
      {
        icon: "FileSignature",
        title: "Firma electrónica",
        description:
          "Firmas electrónicas con validez legal que autentican la identidad del empleador y la integridad del documento.",
      },
      {
        icon: "Key",
        title: "Firma digital",
        description:
          "Firmas digitales criptográficas respaldadas por HSM, proporcionando el más alto nivel de validez legal y no repudio.",
      },
      {
        icon: "Clock",
        title: "Sellado de tiempo",
        description:
          "Integración con autoridad de sellado de tiempo que certifica exactamente cuándo se firmó cada documento, garantizando verificabilidad a largo plazo.",
      },
      {
        icon: "Database",
        title: "Integración con sistemas de liquidación",
        description:
          "APIs estandarizadas que se conectan con cualquier sistema de liquidación, recibiendo datos de recibos automáticamente en cada ciclo de pago.",
      },
      {
        icon: "Users",
        title: "Portal para empleados",
        description:
          "Portal web seguro donde los empleados pueden ver, descargar y verificar sus recibos firmados en cualquier momento.",
      },
      {
        icon: "Globe",
        title: "Gestión multiempresa",
        description:
          "Arquitectura multi-tenant que soporta múltiples entidades legales, cada una con configuración, flujos de trabajo y usuarios independientes.",
      },
      {
        icon: "Cloud",
        title: "Cloud",
        description:
          "Opción de despliegue en la nube para organizaciones que prefieren infraestructura gestionada con escalado automático y actualizaciones.",
      },
      {
        icon: "Server",
        title: "On Premise",
        description:
          "Despliegue on-premise para organizaciones con requisitos estrictos de soberanía de datos o regulatorios.",
      },
      {
        icon: "Shield",
        title: "HSM",
        description:
          "Integración con Módulo de Seguridad Hardware para proteger las claves privadas usadas en operaciones de firma digital.",
      },
      {
        icon: "CreditCard",
        title: "CI Electrónica",
        description:
          "Integración con la cédula de identidad electrónica nacional de Uruguay para autenticación fuerte de ciudadanos.",
      },
      {
        icon: "HardDrive",
        title: "Repositorio seguro",
        description:
          "Repositorio de documentos encriptado que garantiza que los recibos firmados permanezcan protegidos, inmutables y siempre disponibles.",
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
          "Conectar MiRecibo con diversos sistemas de liquidación — cada uno con su propio formato de datos, calendario y autenticación — requirió construir una capa de integración flexible que normalice la entrada sin perder fidelidad.",
      },
      {
        title: "Seguridad",
        description:
          "Manejar datos sensibles de nómina y claves criptográficas exigió defensa en profundidad: almacenamiento encriptado, HSM para operaciones de clave, TLS en todas partes y controles de acceso estrictos en cada capa.",
      },
      {
        title: "Procesamiento de documentos",
        description:
          "Generar, firmar y entregar miles de recibos por ciclo de pago requirió pipelines eficientes de generación de PDF y procesamiento asíncrono para mantener el rendimiento.",
      },
      {
        title: "Compatibilidad con diferentes mecanismos de firma",
        description:
          "Uruguay y Paraguay tienen marcos legales y mecanismos de certificación diferentes — la plataforma tuvo que abstraer las operaciones de firma para soportar de manera uniforme firmas electrónicas, firmas digitales, tarjetas inteligentes y tokens criptográficos.",
      },
      {
        title: "Escalabilidad",
        description:
          "La plataforma necesitaba manejar picos de carga durante los ciclos de pago — cuando miles de empleados acceden a sus recibos simultáneamente — sin degradación en los tiempos de respuesta ni en el rendimiento de firma.",
      },
    ],
    security: {
      description:
        "MiRecibo fue diseñado con la seguridad como requisito fundacional, no como una idea tardía. Manejar datos sensibles de nómina y operaciones de firma criptográfica exigió una arquitectura de seguridad integral.",
      items: [
        {
          title: "Firma Digital",
          description:
            "Firmas criptográficas respaldadas por pares de claves asimétricas almacenadas en HSM, proporcionando el más alto nivel de validez legal bajo la legislación uruguaya y paraguaya.",
        },
        {
          title: "Firma Electrónica",
          description:
            "Firmas electrónicas que autentican identidad e intención, con registros de auditoría que cumplen con los requisitos regulatorios para documentación de nómina.",
        },
        {
          title: "No Repudio",
          description:
            "Cada firma está criptográficamente vinculada a la identidad del firmante, haciendo imposible negar haber firmado un documento — crítico para la validez legal.",
        },
        {
          title: "Sellado de Tiempo",
          description:
            "Sellos de tiempo compatibles con RFC 3161 de una Autoridad de Sellado de Tiempo (TSA) confiable certifican exactamente cuándo se firmó cada documento, garantizando verificabilidad a largo plazo incluso después de que los certificados expiren.",
        },
        {
          title: "Protección de documentos",
          description:
            "Los documentos firmados se almacenan en un repositorio encriptado con verificaciones de integridad que detectan cualquier alteración. El formato PDF/A garantiza compatibilidad de archivo a largo plazo.",
        },
        {
          title: "Integridad",
          description:
            "Los hashes criptográficos de cada documento se almacenan junto a las firmas, permitiendo la verificación independiente de que el documento no ha sido alterado desde su firma.",
        },
        {
          title: "Autenticación",
          description:
            "Autenticación multifactor con OAuth2 y tokens JWT, integrada con sistemas de identidad nacional (CI Electrónica en Uruguay) para autenticación fuerte de ciudadanos.",
        },
      ],
    },
    architecture: {
      description:
        "MiRecibo es una aplicación monolítica Groovy/Grails que centraliza autenticación, procesamiento batch de nómina, generación de recibos electrónicos, flujos de firma digital y notificaciones en una sola unidad desplegable respaldada por MySQL.",
      mermaidCode: `graph TB
    User["👤 Empleado"]
    Admin["👨‍💼 Administrador de Empresa"]

    Frontend["Frontend Angular"]

    subgraph MIRECIBO["MiRecibo - Aplicación Monolítica"]
        Monolith["Groovy / Grails"]

        Auth["Autenticación y Autorización"]
        Payroll["Procesamiento Batch de Nómina"]
        Documents["Recibos Electrónicos"]
        Signature["Flujo de Firma Digital"]
        Notifications["Notificaciones<br/>Web + Email"]

        Monolith --> Auth
        Monolith --> Payroll
        Monolith --> Documents
        Monolith --> Signature
        Monolith --> Notifications
    end

    DB[("Base de Datos MySQL")]
    Mail["Servidor de Correo"]

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
        value: "Completa",
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
      "Los marcos legales de múltiples países requieren una abstracción cuidadosa — lo que funciona en Uruguay puede necesitar adaptación para Paraguay, pero la plataforma central puede permanecer compartida.",
      "La integración con HSM es crítica para la validez legal: las firmas solo por software no tienen el mismo peso que las operaciones respaldadas por hardware en entornos regulados.",
      "El procesamiento asíncrono para operaciones masivas es innegociable — los usuarios necesitan retroalimentación de progreso, no esperas bloqueantes.",
      "El control de acceso basado en roles con soporte multiempresa exige un modelo de permisos flexible — los roles hardcodeados se vuelven inmantenibles en cuestión de meses.",
      "Los estándares PDF/A y PAdES son esenciales para el archivo a largo plazo: los documentos firmados hoy deben seguir siendo verificables dentro de una década.",
    ],
    gallery: [
      { src: "/projects/placeholder.svg", alt: "Dashboard de MiRecibo" },
      { src: "/projects/placeholder.svg", alt: "Portal de recibos para empleados" },
      { src: "/projects/placeholder.svg", alt: "Panel de configuración de empresa" },
      { src: "/projects/placeholder.svg", alt: "Vista de flujo de firma" },
    ],
    callToAction: {
      text: "Explorar otros proyectos",
      link: "/dev#experience",
    },
    metadata: {
      title: "MiRecibo — Plataforma de Recibos de Sueldo Digitales",
      description:
        "Plataforma empresarial para digitalizar completamente la entrega y firma de recibos de sueldo. Despliegue multipaís con firma electrónica y digital.",
    },
  },
  {
    slug: "iscert",
    name: "ISCERT",
    subtitle:
      "Infraestructura de Certificación Digital para autenticación, firma electrónica y firma digital",
    shortDescription:
      "Plataforma PKI empresarial especializada en certificación digital — garantiza identidad, autenticidad, integridad y no repudio en procesos electrónicos.",
    heroImage: "/images/empresas/isa-interfase/iscert/ISCERT.jpg",
    videoUrl: "https://www.youtube.com/watch?v=w0v_YcHbtCY",
    role: "Ingeniero de Software Backend",
    duration: "Proyecto Empresarial",
    about:
      "ISCERT es una plataforma integral de Infraestructura de Clave Pública (PKI) que proporciona la capa de confianza fundacional para identidad digital y firmas electrónicas en entornos empresariales. Opera como Autoridad Certificadora (CA), emitiendo, gestionando y revocando certificados digitales X.509 que autentican usuarios, dispositivos y servicios en toda la organización.\n\nLa plataforma maneja el ciclo de vida completo del certificado: inscripción, emisión, renovación, suspensión y revocación — todo mediante flujos de trabajo automatizados que se integran con los sistemas de identidad existentes. Los Módulos de Seguridad Hardware (HSM) protegen las claves de firma raíz e intermedias, garantizando que el ancla de confianza de toda la jerarquía PKI permanezca físicamente segura y resistente a manipulaciones.\n\nMás allá de la gestión de certificados, ISCERT impulsa las operaciones criptográficas detrás de las firmas digitales, la autenticación segura y el sellado de tiempo de documentos. Su arquitectura soporta alta disponibilidad y escalado horizontal, lo que la hace adecuada para organizaciones con miles de usuarios y millones de validaciones de certificados por día.",
    problem:
      "Las organizaciones que operan en industrias reguladas enfrentan un desafío fundamental: cómo demostrar, con certeza criptográfica, que una acción digital fue realizada por una persona específica en un momento específico y no ha sido alterada desde entonces. Sin una infraestructura PKI confiable, las firmas digitales carecen de peso legal, la autenticación es susceptible de suplantación y los documentos electrónicos no tienen verificabilidad a largo plazo. Construir esta infraestructura desde cero requiere experiencia criptográfica profunda, integración con HSM, cumplimiento de estándares en evolución y la capacidad operativa para gestionar ciclos de vida de certificados a escala — una tarea prohibitivamente compleja para la mayoría de las organizaciones.",
    solution:
      "ISCERT proporciona una plataforma PKI llave en mano que abstrae esta complejidad. Opera como una Autoridad Certificadora empresarial, emitiendo certificados X.509 a través de flujos de inscripción automatizados. La plataforma se integra con Módulos de Seguridad Hardware para proteger las claves de firma, implementa servicios OCSP y CRL para validación de certificados en tiempo real, y proporciona APIs REST que las aplicaciones consumen para autenticación, firma digital y sellado de tiempo. El resultado es una capa de identidad confiable que cualquier aplicación puede aprovechar — sin requerir que cada equipo de desarrollo se convierta en experto en criptografía.",
    features: [
      {
        icon: "Shield",
        title: "Autoridad Certificadora",
        description:
          "Funcionalidad completa de Autoridad Certificadora — emitir, gestionar y revocar certificados digitales X.509 con políticas y plantillas configurables.",
      },
      {
        icon: "FileSignature",
        title: "Firma Digital",
        description:
          "Firmas digitales criptográficas respaldadas por HSM, proporcionando validez legal y no repudio para documentos y transacciones electrónicas.",
      },
      {
        icon: "FileText",
        title: "Firma Electrónica",
        description:
          "Flujos de firma electrónica con verificación de identidad y registros de auditoría, adecuados para aprobaciones internas y procesos menos formales.",
      },
      {
        icon: "CheckCircle",
        title: "Validación de certificados",
        description:
          "Servicios OCSP y CRL para verificación del estado de certificados en tiempo real, asegurando que los certificados revocados o expirados se detecten de inmediato.",
      },
      {
        icon: "Users",
        title: "Gestión de identidades",
        description:
          "Gestión de identidades centralizada con integración a directorios existentes (LDAP, Active Directory) y proveedores de identidad externos.",
      },
      {
        icon: "Lock",
        title: "HSM",
        description:
          "Integración con Módulo de Seguridad Hardware para proteger las claves privadas de la CA raíz e intermedias con hardware certificado FIPS 140-2.",
      },
      {
        icon: "Fingerprint",
        title: "Autenticación",
        description:
          "Autenticación fuerte basada en certificados que reemplaza las contraseñas con prueba criptográfica de identidad — resistente a phishing y robo de credenciales.",
      },
      {
        icon: "Clock",
        title: "Timestamp",
        description:
          "Autoridad de sellado de tiempo compatible con RFC 3161 que certifica cuándo se firmaron los documentos, garantizando verificabilidad a largo plazo.",
      },
      {
        icon: "HardDrive",
        title: "Custodia criptográfica",
        description:
          "Custodia segura de material criptográfico con controles de acceso basados en roles, registro de auditoría y almacenamiento a prueba de manipulaciones.",
      },
      {
        icon: "Cloud",
        title: "Cloud Certificates",
        description:
          "Emisión y gestión de certificados para cargas de trabajo en la nube — VMs, contenedores y servicios que necesitan identidades de máquina.",
      },
      {
        icon: "CreditCard",
        title: "Smart Cards",
        description:
          "Integración con tecnologías de tarjetas inteligentes para autenticación y firma basada en tokens físicos en entornos de alta seguridad.",
      },
      {
        icon: "Key",
        title: "Tokens",
        description:
          "Soporte para tokens USB criptográficos y tokens hardware como portadores seguros de credenciales para trabajadores de campo y remotos.",
      },
      {
        icon: "Smartphone",
        title: "Autenticación Multifactor",
        description:
          "Autenticación multifactor que combina certificados con biometría, OTP o notificaciones push para defensa en profundidad.",
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
          "Como Autoridad Certificadora, ISCERT es un objetivo de alto valor — proteger las claves raíz en HSM, aplicar controles de acceso estrictos y mantener registros de auditoría a prueba de manipulaciones fueron requisitos innegociables.",
      },
      {
        title: "Criptografía",
        description:
          "Implementar emisión de certificados, verificación de firmas y revocación requirió comprensión profunda de X.509, estándares PKCS, OCSP, CRLs y algoritmos criptográficos (RSA, ECDSA, SHA-2/3).",
      },
      {
        title: "Escalabilidad",
        description:
          "Los servicios de validación de certificados (OCSP) deben responder en milisegundos incluso bajo miles de solicitudes concurrentes — requiriendo caché agresivo, consultas de base de datos optimizadas y escalado horizontal.",
      },
      {
        title: "Alta disponibilidad",
        description:
          "La Autoridad Certificadora debe estar disponible 24/7 — los retrasos en la emisión de certificados pueden bloquear procesos de negocio críticos. Esto requirió despliegue redundante de HSM y replicación de base de datos.",
      },
      {
        title: "Integración con dispositivos seguros",
        description:
          "Soportar tarjetas inteligentes, tokens USB y HSM de diferentes fabricantes requirió abstraer los protocolos específicos de cada dispositivo detrás de una interfaz unificada de servicio criptográfico.",
      },
    ],
    security: {
      description:
        "Como ancla de confianza de todo el ecosistema de identidad digital, la arquitectura de seguridad de ISCERT fue diseñada para cumplir con los más altos estándares — comparables a las Autoridades Certificadoras de nivel nacional.",
      items: [
        {
          title: "PKI",
          description:
            "Infraestructura de Clave Pública completa con jerarquía de CA de múltiples niveles — CA Raíz (offline, aislada) y CAs Emisoras (online, respaldadas por HSM) siguiendo las mejores prácticas de separación de claves.",
        },
        {
          title: "Firma Digital",
          description:
            "Firmas criptográficas usando pares de claves asimétricas generadas y almacenadas en HSMs certificados FIPS 140-2 Nivel 3.",
        },
        {
          title: "Criptografía",
          description:
            "Algoritmos estándar de la industria (RSA 2048/4096, ECDSA P-256/P-384, SHA-256/384/512) con agilidad de algoritmo para migrar a medida que evolucionan los estándares criptográficos.",
        },
        {
          title: "No Repudio",
          description:
            "Cada firma y emisión de certificado es criptográficamente atribuible a una identidad específica, con registros de auditoría que proporcionan evidencia legal de quién hizo qué y cuándo.",
        },
        {
          title: "Integridad",
          description:
            "Todos los certificados, CRLs y documentos firmados incluyen hashes criptográficos que permiten la verificación independiente de la integridad de los datos en cualquier momento futuro.",
        },
        {
          title: "Confidencialidad",
          description:
            "Las claves privadas de los certificados se generan dentro de los HSMs y nunca abandonan el perímetro seguro del hardware — ni siquiera los administradores pueden extraerlas.",
        },
        {
          title: "Certificados X509",
          description:
            "Soporte completo para el estándar X.509 v3 con extensiones personalizadas, políticas de certificado, restricciones de uso de clave y subject alternative names.",
        },
        {
          title: "Timestamp",
          description:
            "Autoridad de sellado de tiempo RFC 3161 integrada con el flujo de firma, proporcionando prueba criptográfica de cuándo ocurrió cada operación.",
        },
        {
          title: "HSM",
          description:
            "Los Módulos de Seguridad Hardware proporcionan protección física para claves criptográficas con recintos resistentes a manipulaciones, controles de acceso y certificación FIPS 140-2.",
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
        "ISCERT está construido sobre una arquitectura de microservicios con tres capas centrales: el Servicio de Autenticación proporciona verificación de identidad centralizada basada en OAuth2/JWT; el Servicio de Gestión de Certificados orquesta la lógica de negocio de solicitudes de certificados, aprobaciones y coordinación del ciclo de vida; y el Servicio de Autoridad Certificadora se integra con proveedores de CA externos (KeyOne y CA Gateway/Manager System) para realizar la emisión y revocación criptográfica real de certificados digitales. Todo el stack corre sobre Java/Spring Boot, empaquetado como JARs, desplegado en Linux con Nginx como proxy inverso, orquestado con Docker y respaldado por PostgreSQL.",
      mermaidCode: `graph LR
    Client["👤 Usuario"]

    subgraph ISCERT["Plataforma ISCERT"]
        direction LR
        Auth["🔐 Servidor de Autenticación<br/>Spring Boot<br/>Embedded WildFly<br/>OAuth2<br/>JWT<br/>2FA / OTP<br/>Thymeleaf UI"]
        Crypto["🔑 Servicios Criptográficos<br/>Spring Boot<br/>Embedded WildFly<br/>Ciclo de Vida de Certificados<br/>Firma de Documentos"]
        CA["📜 Gestión de CA<br/>Spring Boot<br/>Embedded WildFly<br/>Emisión de Certificados<br/>Revocación de Certificados<br/>Enrutamiento Multi-CA"]
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
        title: "Gobierno Digital",
        description:
          "Agencias de gobierno nacional y local usan ISCERT para emitir certificados digitales a ciudadanos y funcionarios públicos, permitiendo trámites electrónicos con validez legal, firmas digitales en documentos oficiales y acceso seguro a servicios gubernamentales.",
      },
      {
        title: "Documentos electrónicos",
        description:
          "Las organizaciones firman contratos, acuerdos y documentos oficiales con firmas digitales que tienen el mismo peso legal que las firmas manuscritas — eliminando impresión, costos de mensajería y demoras de procesamiento.",
      },
      {
        title: "Firma de contratos",
        description:
          "Los departamentos legales y de compras ejecutan contratos digitalmente, con prueba criptográfica de la identidad de cada parte y la hora exacta de la firma — exigible judicialmente.",
      },
      {
        title: "Identidad Digital",
        description:
          "La plataforma funciona como proveedor de identidad para SSO empresarial, reemplazando contraseñas con autenticación basada en certificados resistente a phishing, credential stuffing y ataques de repetición.",
      },
      {
        title: "Autenticación",
        description:
          "Las aplicaciones de toda la organización consumen los servicios de autenticación de ISCERT a través de protocolos estándar (OAuth2, SAML, RADIUS), permitiendo autenticación fuerte y centralizada sin que cada aplicación gestione su propio almacén de credenciales.",
      },
      {
        title: "Automatización de procesos",
        description:
          "Los procesos de negocio que antes requerían firmas físicas — órdenes de compra, informes de gastos, documentos de RRHH — se digitalizan completamente con firma criptográfica, enrutamiento automatizado y registros de auditoría inmutables.",
      },
    ],
    lessonsLearned: [
      "Una PKI es un sistema de confianza, no solo un stack tecnológico — los procedimientos operativos (ceremonias de claves, controles de acceso, registro de auditoría) son tan críticos como los algoritmos criptográficos.",
      "La integración con HSM añade complejidad significativa: las ceremonias de generación de claves, los procedimientos de respaldo/recuperación y las APIs específicas de cada fabricante requieren conocimiento especializado que los desarrolladores generalistas típicamente no tienen.",
      "El rendimiento de validación de certificados es crítico: un respondedor OCSP que tarda 500ms hace que cada handshake TLS se sienta lento. El caché agresivo y las respuestas pre-firmadas son esenciales.",
      "Los perfiles de certificados X.509 deben diseñarse cuidadosamente — los certificados demasiado permisivos crean riesgos de seguridad, mientras que los demasiado restrictivos rompen integraciones.",
      "El soporte de dispositivos de múltiples fabricantes (tarjetas inteligentes, tokens USB) requiere una capa de abstracción bien diseñada: cada implementación PKCS#11 o CSP de cada fabricante tiene diferencias sutiles de comportamiento.",
    ],
    gallery: [
      { src: "/projects/placeholder.svg", alt: "Dashboard de gestión de certificados ISCERT" },
      { src: "/projects/placeholder.svg", alt: "Flujo de emisión de certificados" },
      { src: "/projects/placeholder.svg", alt: "Monitoreo de validación OCSP" },
      { src: "/projects/placeholder.svg", alt: "Interfaz de gestión de claves HSM" },
    ],
    callToAction: {
      text: "Explorar otros proyectos",
      link: "/dev#experience",
    },
    metadata: {
      title: "ISCERT — Infraestructura de Certificación Digital",
      description:
        "Plataforma PKI empresarial para certificación digital, firmas electrónicas y autenticación segura. Gestión completa del ciclo de vida de certificados con seguridad respaldada por HSM.",
    },
  },
  {
    slug: "firmapdf",
    name: "FirmaPDF",
    subtitle:
      "Plataforma de firma digital masiva de PDF con integración de proveedores de identidad externos",
    shortDescription:
      "Plataforma de alto rendimiento para aplicar firmas digitales con validez legal a documentos PDF a escala. Se integra con proveedores de identidad OAuth2 y procesa miles de documentos de forma asíncrona.",
    heroImage: "/images/empresas/isa-interfase/firmapdf/tuid-firma.jpg",
    videoUrl: "https://www.youtube.com/watch?v=5y17IzfdYNg",
    role: "Ingeniero de Software Backend",
    duration: "Proyecto Empresarial",
    about:
      "FirmaPDF es una plataforma especializada diseñada para organizaciones que necesitan aplicar firmas digitales a grandes volúmenes de documentos PDF — facturas, contratos, informes, certificados — con validez criptográfica y exigibilidad legal. Cierra la brecha entre los proveedores de identidad empresariales y el proceso de firma de PDF, haciendo posible firmar miles de documentos por hora sin intervención manual.\n\nLa plataforma utiliza el estándar PAdES (PDF Advanced Electronic Signatures), que incrusta la firma digital directamente en la estructura del archivo PDF, haciéndolo autónomo y verificable de forma independiente. Cada PDF firmado lleva su propia prueba criptográfica de integridad y origen, por lo que los destinatarios pueden validar la firma sin acceder a ningún servicio externo.\n\nConstruida sobre Spring Boot con procesamiento asíncrono mediante colas de mensajes, FirmaPDF maneja la intensidad computacional de la firma criptográfica sin bloquear la capa API. El resultado es una plataforma receptiva que escala horizontalmente para satisfacer los períodos de demanda pico.",
    problem:
      "Las empresas que generan altos volúmenes de documentos PDF — miles de facturas, extractos, contratos o certificados por día — enfrentan un cuello de botella cuando estos documentos necesitan firmas digitales. La firma manual es impracticable a escala, y las bibliotecas básicas de firma de PDF carecen de la integración con proveedores de identidad empresariales, almacenes de claves respaldados por HSM y el cumplimiento PAdES que las industrias reguladas requieren. La brecha entre 'tenemos un PDF' y 'tenemos un PDF firmado legalmente' implica operaciones criptográficas, verificación de identidad, cumplimiento de formato y registro de auditoría — un pipeline complejo que la mayoría de las organizaciones luchan por construir y operar de manera confiable.",
    solution:
      "FirmaPDF automatiza este pipeline de extremo a extremo. Los proveedores de identidad (OAuth2) autentican a los usuarios y autorizan las operaciones de firma. La plataforma recibe PDFs a través de una API REST, los encola para procesamiento, aplica firmas digitales compatibles con PAdES usando claves respaldadas por HSM y devuelve los documentos firmados. El procesamiento asíncrono significa que la API responde inmediatamente con un ID de trabajo, y los clientes consultan la finalización o reciben notificaciones por webhook. Cada operación se registra para fines de auditoría, y los PDFs firmados incluyen sellos de tiempo y cadenas de certificados incrustados para validación a largo plazo.",
    features: [
      {
        icon: "FileText",
        title: "Firma masiva PDF",
        description:
          "Firma cientos o miles de PDFs en una sola operación por lotes con seguimiento de progreso y manejo de fallos parciales.",
      },
      {
        icon: "Fingerprint",
        title: "Integración OAuth2",
        description:
          "Conéctese con cualquier proveedor de identidad OAuth2 — directorios corporativos, logins sociales o sistemas de identidad gubernamentales — para autenticación y autorización de usuarios.",
      },
      {
        icon: "Zap",
        title: "Procesamiento asíncrono",
        description:
          "Diseño de API no bloqueante: envíe trabajos de firma y continúe trabajando mientras la plataforma procesa documentos en segundo plano con actualizaciones de estado en tiempo real.",
      },
      {
        icon: "FileSignature",
        title: "PAdES",
        description:
          "Cumplimiento del estándar PAdES (PDF Advanced Electronic Signatures) — las firmas se incrustan en la estructura del PDF, haciendo cada documento autónomo y verificable de forma independiente.",
      },
      {
        icon: "CheckCircle",
        title: "Validación de firma",
        description:
          "Validación de firma integrada que verifica la integridad criptográfica, la cadena de certificados y el sello de tiempo de cada PDF firmado.",
      },
      {
        icon: "Server",
        title: "API REST",
        description:
          "API REST limpia para enviar PDFs, consultar el estado de los trabajos y recuperar documentos firmados — fácilmente integrable en flujos de trabajo y aplicaciones existentes.",
      },
      {
        icon: "Key",
        title: "Gestión de certificados",
        description:
          "Gestión centralizada de certificados con recordatorios automáticos de renovación, monitoreo de expiración y soporte multicertificado para diferentes perfiles de firma.",
      },
      {
        icon: "Database",
        title: "Auditoría",
        description:
          "Registro de auditoría completo de cada operación de firma: quién firmó, cuándo, con qué certificado y la huella criptográfica del documento resultante.",
      },
      {
        icon: "Lock",
        title: "HSM",
        description:
          "Integración con Módulo de Seguridad Hardware para proteger las claves de firma — las claves privadas nunca abandonan el perímetro seguro del hardware.",
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
          "Manejar miles de solicitudes de firma concurrentes requiere una gestión cuidadosa de colas, pooling de conexiones al HSM y mecanismos de contrapresión para prevenir el agotamiento de recursos.",
      },
      {
        title: "Cumplimiento PAdES",
        description:
          "PAdES tiene múltiples niveles (B-B, B-T, B-LT, B-LTA) con requisitos crecientes de sellos de tiempo, datos de revocación y material de validación a largo plazo — cada nivel requirió manipulación precisa de la estructura del PDF.",
      },
      {
        title: "Integración con múltiples IdPs",
        description:
          "Cada proveedor de identidad tiene sus propias particularidades de implementación OAuth2 — formatos de token, scopes, comportamientos de refresh — requiriendo una capa de autenticación flexible que se adapte a cada proveedor.",
      },
      {
        title: "Manejo de fallos parciales",
        description:
          "En un lote de 5000 PDFs, si 3 fallan por entrada corrupta y 2 fallan por timeouts del HSM, la plataforma debe reportar los fallos con precisión sin bloquear las 4995 firmas exitosas.",
      },
      {
        title: "Rendimiento del HSM",
        description:
          "Los HSMs tienen un rendimiento de firma finito — típicamente cientos de operaciones por segundo. Optimizar el pooling de conexiones, el procesamiento por lotes y el caché de claves fue esencial para evitar que el HSM se convirtiera en el cuello de botella.",
      },
    ],
    security: {
      description:
        "FirmaPDF opera en la intersección de la integridad documental y la confianza de identidad. Cada PDF firmado debe ser verificable de forma independiente — por destinatarios, auditores y tribunales — sin depender de la disponibilidad de la plataforma.",
      items: [
        {
          title: "Firma Digital PAdES",
          description:
            "Las firmas siguen el estándar PAdES, incrustando la cadena completa de certificados y los datos de revocación (OCSP/CRL) directamente en el PDF para validación offline.",
        },
        {
          title: "Integridad de documentos",
          description:
            "La firma digital cubre todo el contenido del PDF — cualquier modificación posterior a la firma invalida la firma, proporcionando protección a prueba de manipulaciones.",
        },
        {
          title: "HSM",
          description:
            "Las claves privadas de firma se generan y almacenan dentro de HSMs certificados FIPS 140-2. Nunca existen en memoria de aplicación ni en disco.",
        },
        {
          title: "Autenticación OAuth2",
          description:
            "Cada operación de firma se autentica a través de proveedores de identidad OAuth2, asegurando que solo usuarios autorizados puedan iniciar firmas con certificados específicos.",
        },
        {
          title: "No Repudio",
          description:
            "La combinación de autenticación OAuth2, firmas respaldadas por HSM y sellos de tiempo incrustados crea un registro no repudiable de quién firmó qué y cuándo.",
        },
        {
          title: "Auditoría",
          description:
            "Todas las operaciones de firma se registran con hashes criptográficos — el registro de auditoría en sí mismo es verificable y puede demostrar la cadena de custodia de cada documento firmado.",
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
      "El cumplimiento PAdES requiere manipulación meticulosa de la estructura del PDF — no se trata solo de 'agregar una firma', se trata de inyectar una estructura criptográfica que debe sobrevivir a lectores PDF, validadores y archivo a largo plazo.",
      "El procesamiento asíncrono es el único patrón viable para la firma de PDF de alto volumen — las APIs síncronas harían timeout o se bloquearían bajo carga.",
      "La planificación del rendimiento del HSM debe contemplar cargas pico, no promedios — firmar 50.000 PDFs a fin de mes requiere una capacidad diferente que 500 por día.",
      "La integración OAuth2 es engañosamente compleja: el refresh de tokens, la negociación de scopes y las peculiaridades específicas de cada proveedor consumen más tiempo de desarrollo que la lógica central de firma.",
      "Los registros de auditoría no son opcionales en industrias reguladas — los hashes criptográficos de cada operación deben almacenarse y ser recuperables, a veces años después.",
    ],
    gallery: [
      {
        src: "/images/empresas/isa-interfase/firmapdf/tuid-firma.jpg",
        alt: "FirmaPDF — Interfaz de firma digital TuID",
      },
      {
        src: "/images/empresas/isa-interfase/firmapdf/tuid.jpg",
        alt: "Plataforma de identidad digital TuID",
      },
      {
        src: "/images/empresas/isa-interfase/firmapdf/tuid2.jpg",
        alt: "Autenticación y verificación de identidad TuID",
      },
      { src: "/projects/placeholder.svg", alt: "Dashboard de firma por lotes FirmaPDF" },
    ],
    useCases: [
      {
        title: "TuID — Identidad Digital",
        description:
          "FirmaPDF impulsa las capacidades de firma de documentos de TuID (Tu Identidad Digital), la plataforma de identidad digital de ANTEL para Uruguay. Los usuarios de TuID se registran, verifican su identidad, se autentican con múltiples niveles de seguridad (contraseña, OTP, biometría) y firman documentos PDF electrónicamente con plena validez legal — todo a través del motor de firma de FirmaPDF.",
      },
      {
        title: "Firma de contratos",
        description:
          "Las organizaciones firman miles de contratos digitalmente por mes — acuerdos laborales, contratos de proveedores, NDAs — con firmas compatibles con PAdES que son verificables de forma independiente.",
      },
      {
        title: "Documentos de compliance",
        description:
          "Las industrias reguladas usan FirmaPDF para firmar y sellar temporalmente documentos de cumplimiento, asegurando prueba criptográfica de integridad y no repudio para auditorías y presentaciones regulatorias.",
      },
    ],
    demoVideos: [
      {
        title: "Cómo firmar documentos",
        url: "https://www.youtube.com/watch?v=5y17IzfdYNg",
      },
      {
        title: "Cómo validar documentos firmados",
        url: "https://www.youtube.com/watch?v=ApXqs9O3Q8k",
      },
    ],
    callToAction: {
      text: "Explorar otros proyectos",
      link: "/dev#experience",
    },
    metadata: {
      title: "FirmaPDF — Plataforma de Firma Digital Masiva de PDF",
      description:
        "Plataforma de alto rendimiento para firmas digitales PDF compatibles con PAdES. Procesamiento asíncrono, integración OAuth2 y operaciones criptográficas respaldadas por HSM.",
    },
  },
  // ─── Magento Billing Plugin ──────────────────────────────────
  {
    slug: "magento-billing-plugin",
    name: "Plugin de Facturación Magento",
    subtitle: "Plugin personalizado de automatización de facturación para eCommerce Magento",
    shortDescription:
      "Plugin Magento personalizado que automatizó la facturación recurrente, gestión de suscripciones e integración de pasarelas de pago para clientes de e-commerce, reduciendo la carga de facturación manual en un 60%.",
    heroImage: "/images/empresas/beacon42/beacon42.png",
    role: "Desarrollador Magento",
    duration: "2018 — 2019",
    about:
      "Durante mi tiempo en Beacon42, desarrollé un plugin Magento personalizado desde cero para gestionar flujos de facturación complejos para clientes de e-commerce. El plugin automatizaba la facturación recurrente, el manejo de suscripciones e integraba múltiples pasarelas de pago de terceros — todo sin requerir tiempo de inactividad durante el despliegue.\n\nEl proyecto requirió conocimiento profundo de la arquitectura de plugins de Magento, patrones de desarrollo PHP y lógica de negocio de eCommerce. Adquirí experiencia práctica con el ecosistema Magento mientras ayudaba a una startup en rápido crecimiento a entregar valor a sus clientes.",
    problem:
      "Los clientes de e-commerce que usaban Magento necesitaban facturación recurrente automatizada y gestión de suscripciones más allá de las capacidades integradas de la plataforma. La facturación manual consumía mucho tiempo, era propensa a errores y no escalaba con sus bases de clientes en crecimiento.",
    solution:
      "Construí un plugin Magento personalizado basado en PHP con backend MySQL que automatizaba todo el ciclo de vida de facturación — desde la generación de facturas recurrentes hasta la integración con pasarelas de pago y el seguimiento del estado de suscripciones. El plugin extendía el panel de administración de Magento con dashboards personalizados para reportes y gestión de inventario.",
    features: [
      {
        icon: "CreditCard",
        title: "Facturación Recurrente",
        description:
          "Generación y procesamiento automatizado de facturas recurrentes basado en ciclos de facturación configurables.",
      },
      {
        icon: "Server",
        title: "Integración de Pasarelas de Pago",
        description:
          "Integración sin fricción con múltiples pasarelas de pago de terceros y APIs de envío.",
      },
      {
        icon: "Monitor",
        title: "Extensión del Panel de Administración",
        description:
          "Dashboards de reportes personalizados y herramientas de gestión de inventario integrados en la interfaz de administración de Magento.",
      },
      {
        icon: "Zap",
        title: "Despliegues Sin Tiempo de Inactividad",
        description:
          "Todas las integraciones y actualizaciones desplegadas sin interrupción del servicio para tiendas e-commerce en producción.",
      },
    ],
    participation: [
      "Diseñé y desarrollé la arquitectura del plugin Magento desde cero",
      "Implementé flujos de trabajo de facturación recurrente automatizada",
      "Integré pasarelas de pago de terceros y APIs de envío",
      "Extendí el panel de administración de Magento con funcionalidades de reportes personalizados",
      "Garanticé despliegues sin tiempo de inactividad para tiendas e-commerce en producción",
    ],
    technicalChallenges: [
      {
        title: "Restricciones de la Arquitectura del Plugin",
        description:
          "Automatizar flujos de facturación recurrente dentro de las restricciones de la arquitectura de plugins de Magento requirió uso creativo de cron jobs y observadores de eventos.",
      },
      {
        title: "Integración Multi-Pasarela",
        description:
          "Cada pasarela de pago tenía diferentes formatos de API, métodos de autenticación y patrones de manejo de errores — requiriendo una capa de abstracción unificada.",
      },
    ],
    security: {
      description:
        "Manejar datos de pago requirió cumplimiento con las mejores prácticas de seguridad para plataformas e-commerce.",
      items: [
        {
          title: "Seguridad de Datos de Pago",
          description:
            "Manejo seguro de información de pago con encriptación adecuada y sin almacenar nunca datos de tarjetas de crédito en crudo.",
        },
        {
          title: "Gestión de Claves API",
          description:
            "Almacenamiento seguro y rotación de credenciales API de terceros para pasarelas de pago.",
        },
      ],
    },
    impact: [
      { label: "Trabajo Manual Reducido", value: "60%", icon: "Zap" },
      { label: "Pasarelas de Pago", value: "3+", icon: "CreditCard" },
      { label: "Despliegues Sin Downtime", value: "100%", icon: "Server" },
    ],
    technologies: ["PHP", "Magento", "MySQL", "JavaScript", "REST APIs"],
    architecture: {
      description:
        "Plugin Magento basado en PHP con backend MySQL, integrando pasarelas de pago de terceros y APIs de envío. Extendió el panel de administración de Magento para dashboards personalizados de reportes y gestión de inventario.",
    },
    lessonsLearned: [
      "Comprensión profunda de la arquitectura de plugins de Magento y ecosistemas de eCommerce",
      "Construir capas de abstracción para integraciones multi-proveedor ahorra un enorme esfuerzo de mantenimiento",
      "Los despliegues sin tiempo de inactividad en e-commerce requieren planificación cuidadosa en torno a las sesiones de usuario activas",
    ],
    gallery: [
      { src: "/images/empresas/beacon42/beacon42.png", alt: "Beacon42 — Desarrollo Magento" },
    ],
    callToAction: {
      text: "Explorar otros proyectos",
      link: "/dev#experience",
    },
    metadata: {
      title: "Plugin de Facturación Magento — Automatización eCommerce",
      description:
        "Plugin Magento personalizado para facturación automatizada, gestión de suscripciones e integración de pasarelas de pago. Redujo la facturación manual en un 60%.",
    },
  },
  // ─── Web Analytics & Tracking ────────────────────────────────
  {
    slug: "web-analytics-tracking",
    name: "Analítica y Seguimiento Web",
    subtitle: "Infraestructura de analítica para propiedades web de DIRECTV",
    shortDescription:
      "Implementación de Google Analytics y Google Tag Manager en las propiedades web de DIRECTV, permitiendo marketing basado en datos a través de dashboards personalizados y reportes Excel automatizados.",
    heroImage: "/images/empresas/portlike/portlike.png",
    role: "Analista Programador",
    duration: "2017 — 2018",
    about:
      "En Portlike, trabajé en la infraestructura de analítica y seguimiento para las propiedades web de DIRECTV. Mi rol combinaba desarrollo web con análisis de datos — implementando seguimiento con Google Analytics y Tag Manager en múltiples sitios web, construyendo dashboards personalizados y creando pipelines automatizados de reportes en Excel.\n\nEsta fue mi primera experiencia profesional, donde hice la transición de un rol de analista a desarrollo web demostrando sólidas habilidades en JavaScript y eventualmente manteniendo proyectos Lumen (Laravel) y sitios WordPress.",
    problem:
      "DIRECTV necesitaba seguimiento integral en múltiples sitios web diversos para entender el comportamiento de los usuarios, medir el rendimiento de campañas y generar inteligencia de negocio accionable. La entrada manual de datos para reportes semanales consumía más de 15 horas.",
    solution:
      "Desplegué Google Analytics y Tag Manager con seguimiento de eventos personalizados en todos los sitios web del cliente. Construí APIs Laravel (Lumen) para agregación de datos y creé pipelines automatizados de reportes Excel que eliminaron por completo la entrada manual de datos.",
    features: [
      {
        icon: "Globe",
        title: "Seguimiento Multi-Sitio",
        description:
          "Infraestructura de seguimiento consistente desplegada en múltiples propiedades web con diferentes arquitecturas.",
      },
      {
        icon: "Database",
        title: "APIs de Agregación de Datos",
        description:
          "APIs Laravel (Lumen) que consumen servicios externos y presentan insights a través de interfaces limpias.",
      },
      {
        icon: "FileText",
        title: "Reportes Automatizados",
        description:
          "Pipelines de reportes Excel que eliminaron más de 15 horas semanales de entrada manual de datos para los stakeholders de negocio.",
      },
      {
        icon: "Monitor",
        title: "Dashboards Personalizados",
        description:
          "Dashboards de marketing basados en datos que permiten medir el rendimiento de campañas en tiempo real.",
      },
    ],
    participation: [
      "Implementé Google Analytics y Tag Manager en múltiples sitios web de clientes",
      "Analicé métricas y estadísticas de comportamiento de usuarios",
      "Generé reportes y configuré seguimiento de comportamiento de usuarios",
      "Creé reportes gráficos en Excel para la toma de decisiones ejecutivas",
      "Desarrollé APIs Lumen (Laravel) para agregación de datos",
    ],
    technicalChallenges: [
      {
        title: "Arquitecturas Web Dispares",
        description:
          "Implementar seguimiento consistente en múltiples propiedades web construidas con diferentes tecnologías y arquitecturas.",
      },
      {
        title: "Automatización de Reportes",
        description:
          "Automatizar la generación de reportes Excel complejos para eliminar más de 15 horas semanales de entrada manual de datos manteniendo la precisión.",
      },
    ],
    security: {
      description:
        "La implementación de analítica requirió manejo cuidadoso de datos de usuario y cumplimiento con estándares de privacidad.",
      items: [
        {
          title: "Cumplimiento de Privacidad de Datos",
          description:
            "Asegurar que el seguimiento analítico respetara la privacidad del usuario y cumpliera con los estándares de protección de datos relevantes.",
        },
        {
          title: "Control de Acceso",
          description:
            "Gestión adecuada de acceso a cuentas de Google Analytics y Tag Manager entre múltiples stakeholders.",
        },
      ],
    },
    impact: [
      { label: "Trabajo Manual Semanal Ahorrado", value: "15+ hrs", icon: "Clock" },
      { label: "Sitios Web Monitoreados", value: "Múltiples", icon: "Globe" },
      { label: "Automatización de Reportes", value: "100%", icon: "Zap" },
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
        "Google Analytics y Tag Manager desplegados en múltiples sitios web de clientes con seguimiento de eventos personalizados. APIs Laravel (Lumen) para agregación de datos y pipelines de reportes automatizados basados en Excel.",
    },
    lessonsLearned: [
      "La toma de decisiones basada en datos requiere infraestructura de seguimiento limpia y consistente",
      "Automatizar procesos de reportes manuales entrega un ROI inmediato y tangible",
      "Combinar habilidades analíticas con desarrollo crea un valor único en cualquier equipo",
    ],
    gallery: [{ src: "/images/empresas/portlike/portlike.png", alt: "Portlike — Analítica Web" }],
    callToAction: {
      text: "Explorar otros proyectos",
      link: "/dev#experience",
    },
    metadata: {
      title: "Analítica y Seguimiento Web — DIRECTV",
      description:
        "Implementación de Google Analytics y Tag Manager en las propiedades web de DIRECTV. Pipelines de reportes automatizados que ahorran más de 15 horas semanales.",
    },
  },
  // ─── WordPress Corporate Site ────────────────────────────────
  {
    slug: "wordpress-corporate-site",
    name: "Sitio Corporativo WordPress",
    subtitle: "Mantenimiento y evolución de sitio web corporativo para DIRECTV",
    shortDescription:
      "Mantenimiento y evolución del sitio web corporativo WordPress de DIRECTV — nuevas páginas de campaña, mejoras de funcionalidades, optimización de rendimiento y gestión de plugins de terceros.",
    heroImage: "/images/empresas/portlike/takeoff.jpg",
    role: "Desarrollador Web",
    duration: "2017 — 2018",
    about:
      "Como parte de mi trabajo en Portlike (junto a Takeoff, una empresa socia que compartía la misma oficina), contribuí al mantenimiento y evolución del sitio web corporativo WordPress de DIRECTV. Esto implicó desarrollar nuevas páginas de campañas comerciales, corregir errores, optimizar el rendimiento e integrar plugins de terceros.\n\nEl rol requería equilibrar las demandas de despliegue rápido de campañas con la estabilidad en producción — asegurando que los equipos de marketing pudieran lanzar nuevas páginas rápidamente sin comprometer la confiabilidad del sitio.",
    problem:
      "El sitio corporativo de DIRECTV requería evolución continua — nuevas páginas de campaña, mejoras de funcionalidades, corrección de errores y optimización de rendimiento — mientras se mantenía la estabilidad en un entorno de producción de alto tráfico.",
    solution:
      "Desarrollé nuevas páginas y componentes WordPress usando PHP, HTML, CSS y JavaScript personalizados. Gestioné integraciones de plugins de terceros, realicé correcciones de errores y optimicé el rendimiento del sitio para tráfico en producción.",
    features: [
      {
        icon: "Layout",
        title: "Páginas de Campaña",
        description:
          "Landing pages de campañas comerciales personalizadas desarrolladas rápidamente para apoyar iniciativas de marketing.",
      },
      {
        icon: "Zap",
        title: "Optimización de Rendimiento",
        description:
          "Mejoras de velocidad del sitio y ajustes del entorno de producción para escenarios de alto tráfico.",
      },
      {
        icon: "CheckCircle",
        title: "Corrección de Errores y Mantenimiento",
        description:
          "Mantenimiento continuo asegurando estabilidad mientras se desplegaban nuevas funcionalidades de forma continua.",
      },
      {
        icon: "Server",
        title: "Gestión de Plugins",
        description:
          "Integración y mantenimiento de plugins WordPress de terceros con garantía de compatibilidad.",
      },
    ],
    participation: [
      "Desarrollé nuevas páginas y componentes de campañas comerciales",
      "Realicé correcciones de errores y mejoras de funcionalidades",
      "Integré y mantuve plugins WordPress de terceros",
      "Optimicé el rendimiento del sitio para entornos de producción",
      "Aseguré compatibilidad entre actualizaciones de plugins y versiones de WordPress",
    ],
    technicalChallenges: [
      {
        title: "Despliegues Rápidos vs Estabilidad",
        description:
          "Equilibrar la necesidad de despliegues rápidos de páginas de campaña con mantener la estabilidad y el rendimiento en producción.",
      },
      {
        title: "Compatibilidad de Plugins",
        description:
          "Asegurar que los plugins de terceros permanecieran compatibles y seguros durante las actualizaciones del core de WordPress.",
      },
    ],
    security: {
      description:
        "Mantener un sitio web corporativo requirió atención a las mejores prácticas de seguridad de WordPress.",
      items: [
        {
          title: "Seguridad de Plugins",
          description:
            "Auditorías de seguridad regulares de plugins de terceros y actualizaciones oportunas para parchar vulnerabilidades.",
        },
        {
          title: "Control de Acceso a Producción",
          description:
            "Acceso controlado a entornos de producción con procedimientos de despliegue adecuados.",
        },
      ],
    },
    impact: [
      { label: "Páginas de Campaña", value: "Múltiples", icon: "Layout" },
      { label: "Plugins Gestionados", value: "Múltiples", icon: "Server" },
      { label: "Estabilidad en Producción", value: "Mantenida", icon: "Shield" },
    ],
    technologies: ["WordPress", "PHP", "HTML", "CSS", "JavaScript", "MySQL"],
    architecture: {
      description:
        "CMS WordPress con desarrollo PHP personalizado para nuevas funcionalidades. HTML, CSS y JavaScript para componentes frontend. Integración y mantenimiento de plugins de terceros.",
    },
    lessonsLearned: [
      "Los sitios WordPress en producción requieren gestión disciplinada de plugins y estrategias de actualización",
      "Los despliegues rápidos de marketing necesitan flujos de desarrollo optimizados sin sacrificar calidad",
      "La colaboración entre equipos (Portlike + Takeoff) enseñó comunicación efectiva en entornos de oficina compartidos",
    ],
    gallery: [
      { src: "/images/empresas/portlike/takeoff.jpg", alt: "Takeoff — Desarrollo WordPress" },
    ],
    callToAction: {
      text: "Explorar otros proyectos",
      link: "/dev#experience",
    },
    metadata: {
      title: "Sitio Corporativo WordPress — DIRECTV",
      description:
        "Mantenimiento y evolución del sitio web corporativo WordPress de DIRECTV. Páginas de campaña, optimización de rendimiento y gestión de plugins.",
    },
  },
  // ─── Crowdfunding Platform ───────────────────────────────────
  {
    slug: "crowdfunding-platform",
    name: "Plataforma de Crowdfunding",
    subtitle: "Plataforma moderna de crowdfunding basada en microservicios",
    shortDescription:
      "Una plataforma moderna de crowdfunding inspirada en Kickstarter, construida con arquitectura de microservicios. Un proyecto personal que demuestra capacidades full-stack desde infraestructura hasta UI como parte de la iniciativa QR S.A.S.",
    heroImage: "/images/empresas/qr-sas/quierorealizarlo/qr_logo.webp",
    role: "Fundador y Desarrollador Full Stack",
    duration: "2026 — Presente",
    about:
      "QR S.A.S. es mi proyecto emprendedor personal — una plataforma moderna de crowdfunding que demuestra cómo un enfoque de microservicios puede resolver las limitaciones de escalado y flexibilidad de las plataformas monolíticas.\n\nLa plataforma está construida desde cero usando microservicios Spring Boot para campañas, usuarios, pagos y notificaciones, cada uno con bases de datos independientes. Los servicios se comunican vía APIs REST con autenticación basada en JWT, orquestados mediante Docker Compose para desarrollo local.\n\nEste proyecto es mi sandbox para explorar sistemas distribuidos, infraestructura cloud y desarrollo full-stack — aplicando todo lo que aprendí en entornos empresariales a un producto del que soy dueño de punta a punta.",
    problem:
      "La mayoría de las plataformas de crowdfunding son monolíticas, lo que dificulta escalar características específicas de forma independiente o experimentar con nuevas funcionalidades. Quería construir una plataforma que demuestre cómo un enfoque de microservicios puede resolver estos problemas mientras proporciona una experiencia de usuario limpia y moderna.",
    solution:
      "Diseñé una arquitectura de microservicios con servicios Spring Boot independientes para campañas, usuarios, pagos y notificaciones — cada uno con su propia base de datos PostgreSQL. Los servicios se comunican a través de APIs REST con autenticación JWT centralizada. El frontend React proporciona una interfaz responsiva y moderna.",
    features: [
      {
        icon: "Server",
        title: "Arquitectura de Microservicios",
        description:
          "Servicios independientes para campañas, usuarios, pagos y notificaciones, cada uno con bases de datos dedicadas.",
      },
      {
        icon: "Key",
        title: "Autenticación JWT",
        description:
          "Autenticación centralizada basada en tokens en todos los microservicios con comunicación API segura.",
      },
      {
        icon: "CreditCard",
        title: "Procesamiento de Pagos",
        description:
          "Servicio de pagos dedicado que maneja transacciones con aislamiento adecuado de la lógica de campañas.",
      },
      {
        icon: "Globe",
        title: "Frontend React Responsivo",
        description:
          "UI moderna y responsiva construida con React y TypeScript conectada al backend de microservicios.",
      },
      {
        icon: "Database",
        title: "Bases de Datos Independientes",
        description:
          "Cada servicio es dueño de sus datos — PostgreSQL para datos transaccionales con límites de dominio adecuados.",
      },
      {
        icon: "Container",
        title: "Orquestación con Docker",
        description:
          "Docker Compose para desarrollo local con inicio orquestado de servicios y health checks.",
      },
    ],
    participation: [
      "Diseñé la arquitectura completa de microservicios y los límites de los servicios",
      "Implementé todos los servicios backend (campañas, usuarios, pagos, notificaciones)",
      "Construí el frontend React con TypeScript",
      "Configuré Docker Compose para orquestación de desarrollo local",
      "Diseñé los esquemas de base de datos para cada servicio independiente",
    ],
    technicalChallenges: [
      {
        title: "Transacciones Distribuidas",
        description:
          "Gestionar transacciones distribuidas entre la creación de campañas, el procesamiento de pagos y los servicios de notificación sin un coordinador de transacciones distribuidas.",
      },
      {
        title: "Descomposición de Servicios",
        description:
          "Diseñar una descomposición de servicios que equilibre la autonomía de dominio con una velocidad de desarrollo práctica para un proyecto individual.",
      },
      {
        title: "Consistencia de Datos",
        description:
          "Mantener la consistencia de datos entre bases de datos independientes permitiendo que cada servicio evolucione de forma independiente.",
      },
    ],
    security: {
      description:
        "La plataforma implementa las mejores prácticas de seguridad desde los cimientos, aplicando patrones empresariales a un proyecto personal.",
      items: [
        {
          title: "Autenticación Basada en JWT",
          description:
            "Autenticación basada en tokens con expiración adecuada, tokens de refresco y almacenamiento seguro de tokens.",
        },
        {
          title: "Seguridad de API",
          description:
            "Toda la comunicación entre servicios asegurada con autenticación adecuada y validación de entrada.",
        },
        {
          title: "Aislamiento de Datos",
          description:
            "Las bases de datos independientes aseguran que un compromiso en un servicio no exponga los datos de los demás.",
        },
      ],
    },
    impact: [
      { label: "Microservicios", value: "4", icon: "Server" },
      { label: "BDs Independientes", value: "4", icon: "Database" },
      { label: "API Gateway", value: "Centralizado", icon: "Shield" },
      { label: "Servicios Docker", value: "5+", icon: "Container" },
    ],
    technologies: [
      "Java",
      "Spring Boot",
      "React",
      "TypeScript",
      "PostgreSQL",
      "Docker",
      "JWT",
      "Microservicios",
    ],
    architecture: {
      description:
        "Arquitectura de microservicios con servicios Spring Boot para campañas, usuarios, pagos y notificaciones — cada uno con su propia base de datos. Los servicios se comunican vía APIs REST con autenticación basada en JWT. PostgreSQL para datos transaccionales. Docker Compose para desarrollo local. Frontend React con un diseño limpio y responsivo.",
      mermaidCode: `graph TD
    AG[API Gateway] --> Auth
    AG --> CS[Servicio de Campañas]
    AG --> US[Servicio de Usuarios]
    AG --> PS[Servicio de Pagos]
    AG --> NS[Servicio de Notificaciones]
    Auth --> AuthDB[(BD Auth)]
    CS --> CSDB[(BD Campañas)]
    US --> USDB[(BD Usuarios)]
    PS --> PSDB[(BD Pagos)]
    NS --> NSDB[(BD Notificaciones)]
    style AG fill:#2563eb,stroke:#1d4ed8,color:#fff
    style Auth fill:#1e1e24,stroke:#2a2a35,color:#f0f0f5
    style CS fill:#1e1e24,stroke:#2a2a35,color:#f0f0f5
    style US fill:#1e1e24,stroke:#2a2a35,color:#f0f0f5
    style PS fill:#1e1e24,stroke:#2a2a35,color:#f0f0f5
    style NS fill:#1e1e24,stroke:#2a2a35,color:#f0f0f5`,
    },
    lessonsLearned: [
      "Las transacciones distribuidas son el problema más difícil en microservicios — los patrones de consistencia eventual son esenciales",
      "Los límites de los servicios deben trazarse alrededor de dominios de negocio, no de capas técnicas",
      "Para proyectos individuales, comenzar con menos servicios y dividir solo cuando la complejidad realmente lo exija",
    ],
    gallery: [
      { src: "/projects/placeholder.svg", alt: "Arquitectura de la Plataforma de Crowdfunding" },
    ],
    callToAction: {
      text: "Explorar otros proyectos",
      link: "/dev#experience",
    },
    metadata: {
      title: "Plataforma de Crowdfunding — QR S.A.S.",
      description:
        "Plataforma moderna de crowdfunding basada en microservicios. Spring Boot, React, PostgreSQL y Docker. Proyecto emprendedor personal.",
    },
  },
];
