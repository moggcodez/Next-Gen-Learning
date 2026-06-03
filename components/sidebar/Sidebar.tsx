'use client';

import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  BookOpen, 
  BarChart3, 
  Activity, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  GraduationCap
} from 'lucide-react';
import { clsx } from 'clsx';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

export function Sidebar({ activeTab, setActiveTab, isCollapsed, setIsCollapsed }: SidebarProps) {

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'courses', label: 'Courses', icon: BookOpen, badge: '5' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'activity', label: 'Activity', icon: Activity },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* DESKTOP/TABLET SIDEBAR */}
      <aside 
        className={clsx(
          "hidden md:flex flex-col h-screen fixed left-0 top-0 z-40 border-r border-white/5 bg-[#050505]/60 backdrop-blur-xl transition-all duration-300 ease-out select-none",
          isCollapsed ? "w-20" : "w-64"
        )}
      >
        {/* Logo Section */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-white/5">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-brand-blue to-brand-purple flex items-center justify-center flex-shrink-0 shadow-lg shadow-brand-blue/20">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            {!isCollapsed && (
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400 tracking-tight whitespace-nowrap"
              >
                Aether Learn
              </motion.span>
            )}
          </div>

          {/* Toggle Button for Desktop */}
          {!isCollapsed && (
            <button 
              onClick={() => setIsCollapsed(true)}
              className="hidden lg:flex h-7 w-7 rounded-lg items-center justify-center border border-white/5 hover:border-white/10 hover:bg-white/[0.02] text-slate-400 hover:text-white transition-all duration-200 cursor-pointer"
              aria-label="Collapse sidebar"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Collapsed Toggle Trigger (Shown when collapsed) */}
        {isCollapsed && (
          <div className="px-6 py-4 flex justify-center border-b border-white/5 lg:block hidden">
            <button 
              onClick={() => setIsCollapsed(false)}
              className="h-8 w-8 rounded-lg flex items-center justify-center border border-white/5 hover:border-white/10 hover:bg-white/[0.02] text-slate-400 hover:text-white transition-all cursor-pointer"
              aria-label="Expand sidebar"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Navigation Items */}
        <nav className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={clsx(
                  "w-full flex items-center h-12 rounded-xl relative transition-colors duration-200 cursor-pointer group outline-none",
                  isCollapsed ? "justify-center" : "px-4 justify-start",
                  isActive ? "text-white font-medium" : "text-slate-400 hover:text-white"
                )}
              >
                {/* Active Indicator Sliding Background */}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute inset-0 bg-gradient-to-r from-white/[0.04] to-white/[0.01] border-l-2 border-brand-purple rounded-xl z-0"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}

                {/* Hover Glow Accent */}
                <div className="absolute inset-0 rounded-xl bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-0" />

                <div className="relative z-10 flex items-center gap-3">
                  <Icon className={clsx(
                    "h-5 w-5 transition-transform duration-200 group-hover:scale-105",
                    isActive ? "text-brand-purple" : "text-slate-400 group-hover:text-slate-200"
                  )} />
                  {!isCollapsed && (
                    <motion.span 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </div>

                {/* Badge (e.g. Course counts) */}
                {!isCollapsed && item.badge && (
                  <span className="relative z-10 ml-auto h-5 px-1.5 rounded-full bg-brand-purple/10 text-brand-purple border border-brand-purple/20 text-[10px] font-semibold flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Profile Summary Bottom */}
        <div className="p-4 border-t border-white/5 bg-black/[0.15]">
          <div className={clsx("flex items-center", isCollapsed ? "justify-center" : "gap-3")}>
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-brand-blue to-brand-cyan flex items-center justify-center font-bold text-sm text-white shadow-lg shadow-brand-cyan/15 flex-shrink-0">
              M
            </div>
            {!isCollapsed && (
              <div className="overflow-hidden">
                <p className="text-xs font-semibold text-slate-200 truncate">Mohammed</p>
                <p className="text-[10px] text-slate-500 truncate">mohammed@aether.io</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <nav className="md:hidden fixed bottom-6 left-4 right-4 h-16 rounded-2xl border border-white/5 bg-[#050505]/70 backdrop-blur-xl shadow-2xl shadow-black/80 z-40 flex items-center justify-around px-4 select-none">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="flex flex-col items-center justify-center h-12 w-12 rounded-xl relative cursor-pointer outline-none group"
              aria-label={item.label}
            >
              {isActive && (
                <motion.div
                  layoutId="activeIndicatorMobile"
                  className="absolute inset-0 bg-white/[0.04] border-t border-brand-purple rounded-xl z-0"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}

              <Icon className={clsx(
                "h-5.5 w-5.5 relative z-10 transition-all duration-200",
                isActive ? "text-brand-purple scale-110" : "text-slate-400 group-hover:text-slate-200"
              )} />
              <span className={clsx(
                "text-[9px] mt-0.5 relative z-10 font-medium",
                isActive ? "text-slate-200" : "text-slate-500"
              )}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
}

export default Sidebar;
