import { Skeleton } from "./ui/skeleton";

const SkeletonCard = () => {
  return (
    <div className="flex items-center justify-center max-w-3xl mt-4 bg-gray-100 p-4 rounded-lg shadow animate-pulse w-full">
      <div className="flex flex-col gap-3 w-full">
        <Skeleton className="h-96 w-full bg-gray-300 rounded" />
        <Skeleton className="h-60 w-full bg-gray-300 rounded" />
      </div>
    </div>
  );
};

export default SkeletonCard;
