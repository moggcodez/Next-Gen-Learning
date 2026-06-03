'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Proactively log errors in developers terminal
    console.error('Next-Gen Dashboard Error Boundary caught error:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 relative select-none">
      {/* Background glow meshes in red/amber for warning aesthetic */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-red-500/10 rounded-full blur-[90px]" />
        <div className="absolute top-1/3 left-1/3 w-[30vw] h-[30vw] bg-orange-500/5 rounded-full blur-[60px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className="glass-card max-w-md w-full p-8 border border-red-500/15 bg-card-bg text-center space-y-6 shadow-2xl"
      >
        {/* Mock log tab header */}
        <div className="flex items-center gap-1.5 border-b border-white/5 pb-4 text-xs font-mono text-slate-500 select-none">
          <div className="h-2.5 w-2.5 rounded-full bg-red-500/40 animate-pulse" />
          <div className="h-2.5 w-2.5 rounded-full bg-orange-500/40" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-500/40" />
          <span className="ml-2 font-semibold">sync_exception.log</span>
        </div>

        {/* Flashing Warning Icon */}
        <div className="mx-auto h-16 w-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 shadow-lg shadow-red-500/5">
          <AlertTriangle className="h-8 w-8" />
        </div>

        {/* Error descriptions */}
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-white tracking-tight">Telemetry Sync Failed</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            The app could not connect to the database. Make sure you configured your Supabase environment variables in `.env.local` and created the `courses` table.
          </p>
          
          <div className="p-3.5 bg-red-950/20 border border-red-900/30 rounded-xl text-left text-xs font-mono text-red-300 mt-4 overflow-x-auto whitespace-pre max-h-24">
            {error.message || 'Error: ECONNREFUSED - Connection timed out.'}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="flex-grow flex items-center justify-center gap-2 h-11 px-4 rounded-xl bg-gradient-to-tr from-brand-purple to-brand-blue hover:from-brand-purple/90 hover:to-brand-blue/90 text-white text-sm font-semibold transition-all duration-300 cursor-pointer shadow-lg shadow-brand-purple/10 active:scale-[0.98]"
          >
            <RefreshCw className="h-4 w-4" />
            Retry Link
          </button>
          
          <button
            onClick={() => window.location.reload()}
            className="flex-grow flex items-center justify-center gap-2 h-11 px-4 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.04] text-slate-300 hover:text-white text-sm font-semibold transition-all duration-300 cursor-pointer"
          >
            <Home className="h-4 w-4" />
            Reload Page
          </button>
        </div>
      </motion.div>
    </div>
  );
}
