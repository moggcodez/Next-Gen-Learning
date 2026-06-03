'use client';

import { motion } from 'framer-motion';
import { Flame, BookOpen, Clock, Target } from 'lucide-react';
import { BentoCard } from '../ui/BentoCard';

export function HeroCard() {
  const stats = [
    { label: 'Streak', value: '18 Days', icon: Flame, color: 'text-orange-500 bg-orange-500/10' },
    { label: 'Active Courses', value: '5', icon: BookOpen, color: 'text-brand-purple bg-brand-purple/10' },
    { label: 'Hours Studied', value: '38.5h', icon: Clock, color: 'text-brand-blue bg-brand-blue/10' },
    { label: 'Weekly Progress', value: '82%', icon: Target, color: 'text-brand-cyan bg-brand-cyan/10' },
  ];

  return (
    <BentoCard hoverable={false} className="lg:col-span-4 min-h-[220px] bg-gradient-to-r from-brand-purple/10 via-[#0a0a0a]/50 to-[#050505]/20 border border-white/5 relative group overflow-hidden">
      {/* Decorative flowing meshes inside hero container */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand-purple/10 rounded-full blur-[80px] group-hover:bg-brand-purple/15 transition-all duration-700 pointer-events-none select-none" />
      <div className="absolute bottom-0 left-1/3 w-60 h-60 bg-brand-blue/10 rounded-full blur-[60px] pointer-events-none select-none" />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10 w-full h-full">
        {/* Welcome message section */}
        <div className="space-y-3 max-w-xl">
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl md:text-4xl font-extrabold tracking-tight text-white"
          >
            Welcome back,{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-purple via-brand-blue to-brand-cyan animate-pulse">
              Mohammed
            </span>{' '}
            👋
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-slate-400 text-sm md:text-base leading-relaxed"
          >
            {"\"The mind is not a vessel to be filled, but a fire to be kindled.\" You're in the top 2% of active learners this week. Keep up the momentum!"}
          </motion.p>
        </div>

        {/* Hero Statistics Mini-Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-4 flex-shrink-0 lg:max-w-md xl:max-w-none w-full lg:w-auto">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="p-4 rounded-2xl bg-white/[0.01] hover:bg-white/[0.03] border border-white/[0.03] hover:border-white/[0.06] flex items-center gap-3 transition-colors duration-300"
              >
                <div className={`p-2.5 rounded-xl ${stat.color} flex items-center justify-center flex-shrink-0`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase">{stat.label}</p>
                  <p className="text-base font-bold text-white tracking-tight mt-0.5">{stat.value}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </BentoCard>
  );
}

export default HeroCard;
