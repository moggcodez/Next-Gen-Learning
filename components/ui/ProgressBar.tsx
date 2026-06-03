'use client';

import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface ProgressBarProps {
  value: number;
  color?: 'blue' | 'purple' | 'cyan';
  className?: string;
  showText?: boolean;
}

export function ProgressBar({
  value,
  color = 'blue',
  className,
  showText = false,
}: ProgressBarProps) {
  // Clamp value between 0 and 100
  const clampedValue = Math.min(Math.max(value, 0), 100);

  const colorMap = {
    blue: 'bg-brand-blue shadow-[0_0_10px_rgba(0,112,243,0.6)]',
    purple: 'bg-brand-purple shadow-[0_0_10px_rgba(139,92,246,0.6)]',
    cyan: 'bg-brand-cyan shadow-[0_0_10px_rgba(6,182,212,0.6)]',
  };

  const bgTrackMap = {
    blue: 'bg-brand-blue/10 border border-brand-blue/5',
    purple: 'bg-brand-purple/10 border border-brand-purple/5',
    cyan: 'bg-brand-cyan/10 border border-brand-cyan/5',
  };

  return (
    <div className={clsx("w-full", className)}>
      {showText && (
        <div className="flex justify-between items-center mb-1.5 text-xs text-slate-400 font-medium">
          <span>Progress</span>
          <span className="text-white font-semibold">{clampedValue}%</span>
        </div>
      )}
      <div 
        className={clsx("h-2.5 w-full rounded-full overflow-hidden relative", bgTrackMap[color])}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${clampedValue}%` }}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 18,
            delay: 0.2,
          }}
          className={clsx("h-full rounded-full", colorMap[color])}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
