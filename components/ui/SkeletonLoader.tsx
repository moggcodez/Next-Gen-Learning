import { clsx } from 'clsx';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div 
      className={clsx(
        "bg-white/[0.02] animate-pulse rounded-xl relative overflow-hidden border border-white/[0.02]",
        // Shimmer gradient overlay
        "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/[0.03] before:to-transparent",
        className
      )}
    />
  );
}

export function SkeletonBentoGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Hero Bento Card Skeleton */}
      <div className="lg:col-span-4 glass-card p-6 flex flex-col gap-5 border border-white/5 bg-[#0a0a0a]/40 h-64 relative overflow-hidden">
        <Skeleton className="w-1/4 h-8" />
        <Skeleton className="w-1/2 h-5" />
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-auto">
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
        </div>
      </div>

      {/* Courses Bento Card Skeleton */}
      <div className="lg:col-span-2 glass-card p-6 flex flex-col gap-4 border border-white/5 bg-[#0a0a0a]/40 h-96 relative overflow-hidden">
        <Skeleton className="w-1/3 h-6" />
        <div className="flex flex-col gap-4 mt-4 h-full">
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
        </div>
      </div>

      {/* Analytics Bento Card Skeleton */}
      <div className="lg:col-span-2 glass-card p-6 flex flex-col gap-4 border border-white/5 bg-[#0a0a0a]/40 h-96 relative overflow-hidden">
        <Skeleton className="w-1/3 h-6" />
        <div className="grid grid-cols-2 gap-4 mt-4 h-full">
          <Skeleton className="h-full" />
          <Skeleton className="h-full" />
          <Skeleton className="h-full" />
          <Skeleton className="h-full" />
        </div>
      </div>

      {/* Activity Bento Card Skeleton */}
      <div className="lg:col-span-2 glass-card p-6 flex flex-col gap-4 border border-white/5 bg-[#0a0a0a]/40 h-80 relative overflow-hidden">
        <Skeleton className="w-1/4 h-6" />
        <div className="flex-1 mt-4">
          <Skeleton className="w-full h-full" />
        </div>
      </div>

      {/* Insights Bento Card Skeleton */}
      <div className="lg:col-span-2 glass-card p-6 flex flex-col gap-4 border border-white/5 bg-[#0a0a0a]/40 h-80 relative overflow-hidden">
        <Skeleton className="w-1/4 h-6" />
        <div className="flex flex-col gap-4 mt-4 h-full">
          <Skeleton className="h-12" />
          <Skeleton className="h-12" />
          <Skeleton className="h-12" />
        </div>
      </div>
    </div>
  );
}

export default Skeleton;
