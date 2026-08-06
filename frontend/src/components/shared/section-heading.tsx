interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  id?: string;
}

export function SectionHeading({ title, subtitle, id }: SectionHeadingProps) {
  return (
    <div className="text-center mb-16">
      <h2
        id={id}
        className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-bold text-foreground mb-4"
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
      )}
    </div>
  );
}
