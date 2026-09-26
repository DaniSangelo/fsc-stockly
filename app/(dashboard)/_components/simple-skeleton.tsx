import { Skeleton } from "@/app/_components/ui/skeleton";

const SimpleSkeleton = () => {
  return (
    <div className="rounded-xl bg-white p-6">
      <Skeleton className="mb-2 h-9 w-9 rounded-md" />
      <Skeleton className="mb-1 h-4 w-24" />
      <Skeleton className="h-8 w-32" />
    </div>
  );
};

export default SimpleSkeleton;
