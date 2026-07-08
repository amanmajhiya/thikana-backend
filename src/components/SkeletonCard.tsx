export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="h-48 bg-gray-200" />

      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        {/* Price */}
        <div className="h-5 bg-gray-200 rounded w-1/3" />

        {/* Title */}
        <div className="h-4 bg-gray-200 rounded w-3/4" />

        {/* Location */}
        <div className="h-3 bg-gray-200 rounded w-2/3" />

        {/* Details Row */}
        <div className="flex gap-3">
          <div className="h-3 bg-gray-200 rounded w-12" />
          <div className="h-3 bg-gray-200 rounded w-12" />
          <div className="h-3 bg-gray-200 rounded w-16" />
        </div>

        {/* Button */}
        <div className="h-10 bg-gray-200 rounded-xl w-full" />
      </div>
    </div>
  );
}

export function SkeletonCardGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
