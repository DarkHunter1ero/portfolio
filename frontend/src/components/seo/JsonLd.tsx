import { siteConfig } from "@/data/dev/site-config";

export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.author.name,
    jobTitle: siteConfig.author.jobTitle,
    url: siteConfig.url,
    email: siteConfig.author.email,
    sameAs: [siteConfig.author.github, siteConfig.author.linkedin],
    knowsAbout: [
      "Java",
      "Spring Boot",
      "React",
      "TypeScript",
      "Microservices",
      "Digital Identity",
      "OAuth2",
      "JWT",
      "PostgreSQL",
      "Docker",
      "Enterprise Software Architecture",
      "Electronic Signatures",
      "PKI",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
