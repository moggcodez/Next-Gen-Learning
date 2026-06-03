'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
  glowColor?: 'blue' | 'purple' | 'cyan' | 'none';
  onClick?: () => void;
}

export function BentoCard({
  children,
  className,
  hoverable = true,
  glowColor = 'none',
  onClick,
}: BentoCardProps) {
  const glowClasses = {
    none: '',
    blue: 'hover:shadow-glow-blue hover:border-brand-blue/30',
    purple: 'hover:shadow-glow-purple hover:border-brand-purple/30',
    cyan: 'hover:shadow-glow-cyan hover:border-brand-cyan/30',
  };

  return (
    <motion.div
      onClick={onClick}
      whileHover={hoverable ? { 
        y: -4,
        scale: 1.02,
        transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } 
      } : undefined}
      style={{
        transform: "translateZ(0)",
      }}
      className={clsx(
        "glass-card p-6 flex flex-col justify-between overflow-hidden relative gpu-trans group",
        hoverable && "cursor-pointer select-none",
        glowColor !== 'none' && glowClasses[glowColor],
        className
      )}
    >
      {/* Dynamic corner gradient shine */}
      {glowColor !== 'none' && (
        <div 
          className={clsx(
            "absolute -right-20 -top-20 w-40 h-40 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none select-none",
            glowColor === 'blue' && 'bg-brand-blue/15',
            glowColor === 'purple' && 'bg-brand-purple/15',
            glowColor === 'cyan' && 'bg-brand-cyan/15'
          )}
        />
      )}
      <div className="relative z-10 flex flex-col h-full justify-between">
        {children}
      </div>
    </motion.div>
  );
}

export default BentoCard;
