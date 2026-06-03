'use client';

import { Course } from '@/types';
import CourseCard from './CourseCard';

interface CourseListProps {
  courses: Course[];
}

export function CourseList({ courses }: CourseListProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
          Active Curriculum
          <span className="text-xs font-normal text-slate-500">
            ({courses.length} courses loaded)
          </span>
        </h2>
      </div>

      {courses.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 rounded-2xl border border-dashed border-white/5 bg-[#0a0a0a]/30 text-center">
          <p className="text-sm text-slate-400">No courses loaded from Supabase.</p>
          <p className="text-xs text-slate-500 mt-1">Make sure you ran the SQL script to seed the database.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CourseList;
