import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: "div" | "section";
}

export function Container({ className, as: Component = "div", ...props }: ContainerProps) {
  return (
    <Component className={cn("max-w-6xl mx-auto px-4 sm:px-6 lg:px-8", className)} {...props} />
  );
}
