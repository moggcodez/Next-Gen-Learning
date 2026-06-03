'use client';

import { useEffect, useRef } from 'react';
import { motion, animate } from 'framer-motion';
import { Clock, Award, Flame, Calendar, TrendingUp } from 'lucide-react';
import { BentoCard } from '../ui/BentoCard';

// Hook-based animated counter to run inside client components
function AnimatedCounter({ value, decimals = 0 }: { value: number; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1], // easeOutExpo
      onUpdate(currentValue) {
        node.textContent = currentValue.toFixed(decimals);
      },
    });

    return () => controls.stop();
  }, [value, decimals]);

  return <span ref={ref}>0</span>;
}

export function AnalyticsCard() {
  const metrics = [
    {
      label: 'Learning Hours',
      value: 124.8,
      decimals: 1,
      suffix: 'h',
      target: '+12.4% this week',
      icon: Clock,
      color: 'brand-blue',
      glow: 'blue',
      description: 'Total active screen & coding time.'
    },
    {
      label: 'Courses Completed',
      value: 3,
      decimals: 0,
      suffix: '',
      target: 'Goal: 5 courses',
      icon: Award,
      color: 'brand-cyan',
      glow: 'cyan',
      description: 'Verified certificates earned.'
    },
    {
      label: 'Current Streak',
      value: 18,
      decimals: 0,
      suffix: ' Days',
      target: 'Personal best: 24d',
      icon: Flame,
      color: 'orange-500',
      glow: 'purple', // purple mapping since orange is custom
      description: 'Consecutive study days logged.'
    },
    {
      label: 'Weekly Goal Progress',
      value: 82,
      decimals: 0,
      suffix: '%',
      target: '12h of 15h goal',
      icon: Calendar,
      color: 'brand-purple',
      glow: 'purple',
      description: 'Weekly study target threshold.'
    }
  ];

  return (
    <BentoCard 
      hoverable={false} 
      className="lg:col-span-2 min-h-[312px] border border-white/5 bg-card-bg p-6 flex flex-col justify-between"
    >
      <div className="space-y-1">
        <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2 select-none">
          <TrendingUp className="h-4.5 w-4.5 text-brand-cyan" />
          Metrics & Progress
        </h3>
        <p className="text-xs text-slate-500 font-medium">Real-time educational telemetry</p>
      </div>

      {/* Grid of micro cards */}
      <div className="grid grid-cols-2 gap-4 my-4 flex-1">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="p-3.5 rounded-xl bg-white/[0.01] hover:bg-white/[0.02] border border-white/[0.02] hover:border-white/[0.04] transition-all duration-300 flex flex-col justify-between group/metric"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider select-none">{m.label}</span>
                <Icon className={`h-4.5 w-4.5 text-slate-400 group-hover/metric:text-white transition-colors duration-300`} />
              </div>
              
              <div className="my-2">
                <span className="text-xl md:text-2xl font-black text-white tracking-tight">
                  <AnimatedCounter value={m.value} decimals={m.decimals} />
                  <span className="text-sm font-semibold text-slate-400">{m.suffix}</span>
                </span>
              </div>

              <span className="text-[9px] text-slate-400 font-semibold bg-white/[0.02] border border-white/5 py-0.5 px-2 rounded-full w-max">
                {m.target}
              </span>
            </motion.div>
          );
        })}
      </div>

      <div className="text-[10px] text-slate-500 font-semibold select-none border-t border-white/[0.03] pt-4 flex items-center justify-between">
        <span>System status: Optimal</span>
        <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan animate-pulse" />
      </div>
    </BentoCard>
  );
}

export default AnalyticsCard;
