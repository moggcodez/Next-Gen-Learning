'use client';

import { motion } from 'framer-motion';
import { Sparkles, BrainCircuit, Target, Lightbulb, ChevronRight } from 'lucide-react';
import { BentoCard } from '../ui/BentoCard';

export function InsightsCard() {
  const insights = [
    {
      id: '1',
      type: 'recommendation',
      title: 'AI Advisory',
      description: 'Prioritize "Quantum Computing" today. Your recall is highest in the evening.',
      icon: BrainCircuit,
      color: 'text-brand-purple bg-brand-purple/10 border-brand-purple/20',
    },
    {
      id: '2',
      type: 'goal',
      title: 'Active Target',
      description: 'Complete 2 modules of "Next.js Production Scale Engineering" to hit your Weekly Goal.',
      icon: Target,
      color: 'text-brand-cyan bg-brand-cyan/10 border-brand-cyan/20',
    },
    {
      id: '3',
      type: 'suggestion',
      title: 'Cognitive Optimization',
      description: 'Take the distributed systems mini-quiz. Spaced repetition scheduled for 3 PM.',
      icon: Lightbulb,
      color: 'text-brand-blue bg-brand-blue/10 border-brand-blue/20',
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const item = {
    hidden: { opacity: 0, x: -12 },
    show: { 
      opacity: 1, 
      x: 0,
      transition: { type: "spring" as const, stiffness: 300, damping: 22 }
    }
  };

  return (
    <BentoCard 
      hoverable={false} 
      className="lg:col-span-2 min-h-[312px] border border-white/5 bg-card-bg p-6 flex flex-col justify-between"
    >
      <div className="space-y-1">
        <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2 select-none">
          <Sparkles className="h-4.5 w-4.5 text-brand-purple animate-pulse" />
          Aether AI Insights
        </h3>
        <p className="text-xs text-slate-500 font-medium">Cognitive scheduling engine recommendations</p>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-3.5 my-4 flex-1 flex flex-col justify-center"
      >
        {insights.map((ins) => {
          const Icon = ins.icon;
          return (
            <motion.div
              key={ins.id}
              variants={item}
              className="p-3 rounded-xl bg-white/[0.01] hover:bg-white/[0.03] border border-white/[0.02] hover:border-white/[0.05] transition-all duration-300 flex items-start gap-3.5 group/insight cursor-pointer"
            >
              <div className={`p-2.5 rounded-lg border flex items-center justify-center flex-shrink-0 mt-0.5 ${ins.color}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="space-y-0.5 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-200 group-hover/insight:text-white transition-colors duration-200">
                    {ins.title}
                  </h4>
                  <ChevronRight className="h-3 w-3 text-slate-600 group-hover/insight:text-slate-400 group-hover/insight:translate-x-0.5 transition-all duration-200" />
                </div>
                <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                  {ins.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="text-[10px] text-slate-500 font-semibold select-none border-t border-white/[0.03] pt-4 flex items-center justify-between">
        <span>Insight precision: 98%</span>
        <span>Updated 5m ago</span>
      </div>
    </BentoCard>
  );
}

export default InsightsCard;
