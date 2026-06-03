import { SkeletonBentoGrid } from '@/components/ui/SkeletonLoader';

export default function Loading() {
  return (
    <div className="w-full space-y-6">
      {/* Page Title skeleton */}
      <div className="space-y-2 select-none">
        <div className="h-3 w-28 bg-white/5 rounded-full animate-pulse" />
        <div className="h-7 w-48 bg-white/5 rounded-full animate-pulse" />
      </div>
      
      {/* Bento Grid layout skeleton */}
      <SkeletonBentoGrid />
    </div>
  );
}
