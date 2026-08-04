import { Skeleton } from "@/components/ui/skeleton";
import { Container } from "@/components/shared/container";

export default function Loading() {
  return (
    <div className="min-h-screen">
      {/* Hero skeleton */}
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center space-y-6 max-w-2xl w-full">
          <Skeleton className="h-4 w-48 mx-auto" />
          <Skeleton className="h-16 w-full max-w-lg mx-auto" />
          <Skeleton className="h-6 w-96 mx-auto" />
          <div className="flex gap-4 justify-center pt-4">
            <Skeleton className="h-12 w-36 rounded-full" />
            <Skeleton className="h-12 w-28 rounded-full" />
            <Skeleton className="h-12 w-28 rounded-full" />
          </div>
        </div>
      </div>

      {/* Sections skeleton */}
      <Container className="py-24 space-y-12">
        <div className="text-center space-y-4 mb-16">
          <Skeleton className="h-10 w-64 mx-auto" />
          <Skeleton className="h-5 w-96 mx-auto" />
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          <Skeleton className="lg:col-span-2 h-64 rounded-2xl" />
          <Skeleton className="h-48 rounded-2xl" />
        </div>
      </Container>
    </div>
  );
}
