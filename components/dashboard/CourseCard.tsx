'use client';

import * as LucideIcons from 'lucide-react';
import { Course } from '@/types';
import { BentoCard } from '../ui/BentoCard';
import { ProgressBar } from '../ui/ProgressBar';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const { icon_name, title, progress } = course;
  
  // Safe dynamic lucide icons resolution
  const LucideIcon = (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[icon_name] || LucideIcons.BookOpen;

  // Determine accent color and badge text based on progress
  let colorTheme: 'blue' | 'purple' | 'cyan' = 'blue';
  let badgeText = 'Enrolled';
  let badgeColor = 'bg-brand-blue/10 text-brand-blue border-brand-blue/20';

  if (progress === 100) {
    colorTheme = 'cyan';
    badgeText = 'Completed';
    badgeColor = 'bg-brand-cyan/15 text-brand-cyan border-brand-cyan/30';
  } else if (progress > 60) {
    colorTheme = 'cyan';
    badgeText = 'Near Finish';
    badgeColor = 'bg-brand-cyan/10 text-brand-cyan border-brand-cyan/20';
  } else if (progress >= 15) {
    colorTheme = 'purple';
    badgeText = 'In Progress';
    badgeColor = 'bg-brand-purple/10 text-brand-purple border-brand-purple/20';
  } else {
    colorTheme = 'blue';
    badgeText = 'Getting Started';
    badgeColor = 'bg-brand-blue/10 text-brand-blue border-brand-blue/20';
  }

  return (
    <BentoCard 
      glowColor={colorTheme}
      className="p-5 flex flex-col justify-between h-52 border border-white/5 bg-card-bg relative"
    >
      <div className="flex justify-between items-start w-full">
        {/* Dynamic Icon Box */}
        <div className="p-3 rounded-xl bg-white/[0.01] border border-white/5 text-slate-400 group-hover:text-white transition-colors duration-300">
          <LucideIcon className="h-6 w-6" />
        </div>
        {/* Status Badge */}
        <span className={`text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full border ${badgeColor} select-none`}>
          {badgeText}
        </span>
      </div>

      <div className="space-y-4">
        {/* Course Title */}
        <h3 className="font-bold text-sm md:text-base text-white tracking-tight line-clamp-2 leading-snug group-hover:text-slate-100 transition-colors duration-300">
          {title}
        </h3>
        {/* Animated Progress Bar */}
        <ProgressBar value={progress} color={colorTheme} showText={true} />
      </div>
    </BentoCard>
  );
}

export default CourseCard;
