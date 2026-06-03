'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Course } from '@/types';
import Sidebar from '../sidebar/Sidebar';
import HeroCard from './HeroCard';
import CourseList from './CourseList';
import CourseCard from './CourseCard';
import ActivityCard from './ActivityCard';
import AnalyticsCard from './AnalyticsCard';
import InsightsCard from './InsightsCard';
import { BentoCard } from '../ui/BentoCard';
import { Shield, User } from 'lucide-react';
import { clsx } from 'clsx';

interface DashboardWrapperProps {
  initialCourses: Course[];
}

export function DashboardWrapper({ initialCourses }: DashboardWrapperProps) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Staggered page transitions
  const tabVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring" as const, 
        stiffness: 260, 
        damping: 22,
      } 
    },
    exit: { opacity: 0, y: -15, transition: { duration: 0.15 } }
  };

  return (
    <div className="flex min-h-screen w-full relative">
      {/* Sidebar Navigation */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />

      {/* Main Content Area */}
      <main 
        className={clsx(
          "flex-1 transition-all duration-300 ease-out pb-28 md:pb-12 min-w-0 w-full",
          isSidebarCollapsed ? "md:pl-20" : "md:pl-64"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-20 md:pt-10 space-y-6">
          
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <motion.div
                key="dashboard"
                variants={tabVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-6"
              >
                {/* Header title */}
                <div className="space-y-1 select-none">
                  <span className="text-[10px] uppercase font-bold text-brand-purple tracking-widest">
                    Operational Control
                  </span>
                  <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">
                    Overview Telemetry
                  </h2>
                </div>

                {/* 4 Column Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Hero Bento Spans 4 Columns */}
                  <HeroCard />

                  {/* Course list spans 2 columns */}
                  <div className="lg:col-span-2">
                    <CourseList courses={initialCourses} />
                  </div>

                  {/* Analytics Card spans 2 columns */}
                  <AnalyticsCard />

                  {/* Heatmap Card spans 2 columns */}
                  <ActivityCard />

                  {/* Insights Card spans 2 columns */}
                  <InsightsCard />
                </div>
              </motion.div>
            )}

            {activeTab === 'courses' && (
              <motion.div
                key="courses"
                variants={tabVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-6"
              >
                <div className="space-y-1 select-none">
                  <span className="text-[10px] uppercase font-bold text-brand-purple tracking-widest">
                    Academic Matrix
                  </span>
                  <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">
                    Curriculum Inventory
                  </h2>
                </div>

                {initialCourses.length === 0 ? (
                  <div className="flex flex-col items-center justify-center p-16 rounded-2xl border border-dashed border-white/5 bg-[#0a0a0a]/30 text-center">
                    <p className="text-sm text-slate-400">No courses loaded from Supabase.</p>
                    <p className="text-xs text-slate-500 mt-1">Make sure database is seeded.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {initialCourses.map((course) => (
                      <CourseCard key={course.id} course={course} />
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'analytics' && (
              <motion.div
                key="analytics"
                variants={tabVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-6"
              >
                <div className="space-y-1 select-none">
                  <span className="text-[10px] uppercase font-bold text-brand-cyan tracking-widest">
                    Telemetry Stream
                  </span>
                  <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">
                    Deep Performance Analytics
                  </h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  <AnalyticsCard />
                  <ActivityCard />
                </div>
              </motion.div>
            )}

            {activeTab === 'activity' && (
              <motion.div
                key="activity"
                variants={tabVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-6"
              >
                <div className="space-y-1 select-none">
                  <span className="text-[10px] uppercase font-bold text-brand-purple tracking-widest">
                    Temporal Log
                  </span>
                  <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">
                    Activity Heatmap
                  </h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <ActivityCard />
                  </div>
                  <div className="lg:col-span-1">
                    <BentoCard hoverable={false} className="p-6 border border-white/5 bg-[#0a0a0a]/50 h-full flex flex-col justify-start gap-4">
                      <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wide border-b border-white/5 pb-2">Heatmap Metrics</h4>
                      <div className="space-y-2.5 text-xs text-slate-400">
                        <div className="flex justify-between">
                          <span>Focus Window</span>
                          <span className="text-white font-semibold">126 Days</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Optimal Study Day</span>
                          <span className="text-white font-semibold">Tuesday</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Consolidated Hours</span>
                          <span className="text-white font-semibold">184 hrs</span>
                        </div>
                      </div>
                    </BentoCard>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div
                key="settings"
                variants={tabVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-6"
              >
                <div className="space-y-1 select-none">
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">
                    System Params
                  </span>
                  <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">
                    Dashboard Settings
                  </h2>
                </div>

                <div className="max-w-2xl grid grid-cols-1 gap-6">
                  <BentoCard hoverable={false} className="p-6 border border-white/5 bg-[#0a0a0a]/50 flex flex-col gap-6">
                    <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2 pb-4 border-b border-white/5">
                      <User className="h-4.5 w-4.5 text-brand-purple" />
                      Student Profile
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-semibold">
                      <div className="space-y-2">
                        <label className="text-slate-500 uppercase tracking-wider text-[10px]">Student Name</label>
                        <p className="p-3 bg-white/[0.01] border border-white/5 rounded-xl text-white">Mohammed</p>
                      </div>
                      <div className="space-y-2">
                        <label className="text-slate-500 uppercase tracking-wider text-[10px]">Academic Identifier</label>
                        <p className="p-3 bg-white/[0.01] border border-white/5 rounded-xl text-white">AETHER-7889-M</p>
                      </div>
                    </div>
                  </BentoCard>

                  <BentoCard hoverable={false} className="p-6 border border-white/5 bg-[#0a0a0a]/50 flex flex-col gap-6">
                    <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2 pb-4 border-b border-white/5">
                      <Shield className="h-4.5 w-4.5 text-brand-cyan" />
                      Database Sync Status
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400 font-medium">Supabase Handshake</span>
                        <span className="text-brand-cyan font-bold bg-brand-cyan/10 border border-brand-cyan/20 px-2.5 py-0.5 rounded-full select-none">
                          CONNECTED
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400 font-medium">Data Fetch Mechanism</span>
                        <span className="text-slate-400 font-mono">Async Server Components (@supabase/ssr)</span>
                      </div>
                    </div>
                  </BentoCard>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </main>
    </div>
  );
}

export default DashboardWrapper;
