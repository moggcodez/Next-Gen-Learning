'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, ChevronRight } from 'lucide-react';
import { BentoCard } from '../ui/BentoCard';
import { useMounted } from '@/hooks/use-mounted';

interface ActivityCell {
  date: Date;
  hours: number;
  level: 0 | 1 | 2 | 3 | 4;
}

// Pure deterministic pseudo-random generator based on index to avoid react-hooks/purity errors.
function getDeterministicValue(index: number): number {
  const x = Math.sin(index + 1) * 10000;
  return x - Math.floor(x);
}

export function ActivityCard() {
  const mounted = useMounted();
  const [hoveredDay, setHoveredDay] = useState<ActivityCell | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  // Generate mock activity data for 18 weeks (126 days)
  const activityData = useMemo(() => {
    const days: ActivityCell[] = [];
    const now = new Date();
    // Start from Sunday 18 weeks ago
    const startDate = new Date();
    startDate.setDate(now.getDate() - 126 - now.getDay());

    for (let i = 0; i < 126; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);

      // Generate a realistic pattern of study hours
      const dayOfWeek = currentDate.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      
      let hours = 0;
      // High likelihood of studying on weekdays, lower on weekends
      const rand1 = getDeterministicValue(i * 12 + 3);
      const rand2 = getDeterministicValue(i * 45 + 7);
      if (rand1 > (isWeekend ? 0.6 : 0.25)) {
        // Random study duration (0.5 to 7 hours)
        hours = parseFloat((rand2 * (isWeekend ? 3 : 6) + 0.5).toFixed(1));
      }

      // Assign activity level
      let level: 0 | 1 | 2 | 3 | 4 = 0;
      if (hours > 5) level = 4;
      else if (hours > 3) level = 3;
      else if (hours > 1.5) level = 2;
      else if (hours > 0) level = 1;

      days.push({
        date: currentDate,
        hours,
        level
      });
    }
    return days;
  }, []);

  const totalActiveDays = useMemo(() => {
    return activityData.filter(d => d.hours > 0).length;
  }, [activityData]);

  const levelColorMap = {
    0: 'bg-white/[0.03] border border-white/[0.01]',
    1: 'bg-brand-purple/20 border border-brand-purple/10 shadow-[0_0_4px_rgba(139,92,246,0.1)]',
    2: 'bg-brand-purple/40 border border-brand-purple/20 shadow-[0_0_8px_rgba(139,92,246,0.2)]',
    3: 'bg-brand-purple/70 border border-brand-purple/35 shadow-[0_0_12px_rgba(139,92,246,0.35)]',
    4: 'bg-brand-purple border border-brand-purple/50 shadow-[0_0_16px_rgba(139,92,246,0.5)]',
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPos({
      x: e.clientX - rect.left + 10,
      y: e.clientY - rect.top - 40,
    });
  };

  if (!mounted) {
    return (
      <BentoCard hoverable={false} className="lg:col-span-2 h-[312px] border border-white/5 bg-card-bg">
        <div className="h-6 w-32 bg-white/5 rounded animate-pulse" />
        <div className="flex-1 mt-6 bg-white/5 rounded animate-pulse" />
      </BentoCard>
    );
  }

  // Format date for tooltip display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <BentoCard 
      hoverable={false} 
      className="lg:col-span-2 min-h-[312px] border border-white/5 bg-card-bg p-6 relative flex flex-col justify-between"
    >
      {/* Header section with live summary info */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2 select-none">
            <Activity className="h-4.5 w-4.5 text-brand-purple" />
            Learning Rhythm
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            Active days: <span className="text-slate-300 font-semibold">{totalActiveDays}</span> / 126
          </p>
        </div>

        {/* Hover info label */}
        <div className="text-right h-8 flex items-center">
          <AnimatePresence mode="wait">
            {hoveredDay ? (
              <motion.div
                key={hoveredDay.date.toISOString()}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.15 }}
                className="text-xs"
              >
                <span className="text-brand-purple font-bold">{hoveredDay.hours} hrs</span>
                <span className="text-slate-500 font-medium ml-1">on {formatDate(hoveredDay.date)}</span>
              </motion.div>
            ) : (
              <motion.div
                key="default"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[11px] text-slate-500 font-medium flex items-center gap-1 select-none"
              >
                Hover to view hours <ChevronRight className="h-3 w-3" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* GitHub Heatmap Grid */}
      <div 
        className="relative my-4 overflow-x-auto select-none no-scrollbar flex items-center justify-center"
        onMouseMove={handleMouseMove}
      >
        <div className="grid grid-flow-col grid-rows-7 gap-1.5 min-w-[280px]">
          {activityData.map((day, idx) => (
            <motion.div
              key={idx}
              onMouseEnter={() => setHoveredDay(day)}
              onMouseLeave={() => setHoveredDay(null)}
              whileHover={{ 
                scale: 1.25, 
                zIndex: 20, 
                transition: { duration: 0.12, ease: "easeOut" } 
              }}
              className={`h-3 w-3 rounded-[3px] cursor-pointer transition-all duration-300 ${levelColorMap[day.level]}`}
              style={{
                willChange: 'transform',
                transform: 'translateZ(0)',
              }}
            />
          ))}
        </div>

        {/* Tooltip Overlay */}
        {hoveredDay && (
          <div 
            className="absolute z-30 pointer-events-none hidden md:block"
            style={{ 
              left: `${tooltipPos.x}px`, 
              top: `${tooltipPos.y}px` 
            }}
          >
            <div className="bg-[#0f0f11]/95 border border-white/10 px-2.5 py-1.5 rounded-lg shadow-2xl text-[10px] text-slate-200 backdrop-blur-md">
              <p className="font-bold text-white">{hoveredDay.hours} hours studied</p>
              <p className="text-[9px] text-slate-400 mt-0.5">{formatDate(hoveredDay.date)}</p>
            </div>
          </div>
        )}
      </div>

      {/* Heatmap Legend */}
      <div className="flex items-center justify-between text-[10px] text-slate-500 font-semibold select-none border-t border-white/[0.03] pt-4">
        <span>Less</span>
        <div className="flex items-center gap-1">
          <div className="h-2.5 w-2.5 rounded-[2px] bg-white/[0.03] border border-white/[0.01]" />
          <div className="h-2.5 w-2.5 rounded-[2px] bg-brand-purple/20 border border-brand-purple/10" />
          <div className="h-2.5 w-2.5 rounded-[2px] bg-brand-purple/40 border border-brand-purple/20" />
          <div className="h-2.5 w-2.5 rounded-[2px] bg-brand-purple/70 border border-brand-purple/35" />
          <div className="h-2.5 w-2.5 rounded-[2px] bg-brand-purple border border-brand-purple/50" />
        </div>
        <span>More</span>
      </div>
    </BentoCard>
  );
}

export default ActivityCard;
