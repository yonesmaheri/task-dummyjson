import { Skeleton } from "@/components/ui/skeleton";

export default function CustomSkeleton() {
  return (
    <div className="border rounded-xl p-3 shadow">
      <Skeleton className="w-full h-40 rounded-lg mb-2" />
      <Skeleton className="h-4 w-3/4 rounded mb-1" />
      <Skeleton className="h-4 w-1/2 rounded" />
    </div>
  );
}
