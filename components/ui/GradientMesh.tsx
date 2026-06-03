'use client';

import { motion } from 'framer-motion';

export function GradientMesh() {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none bg-[#050505] select-none">
      {/* Mesh Glow 1: Purple Sphere */}
      <motion.div
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -60, 40, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-[10%] -left-[10%] w-[60vw] h-[60vw] bg-mesh-purple rounded-full opacity-50 will-change-transform"
      />

      {/* Mesh Glow 2: Electric Blue Sphere */}
      <motion.div
        animate={{
          x: [0, -50, 40, 0],
          y: [0, 40, -50, 0],
          scale: [1, 0.9, 1.05, 1],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -bottom-[15%] -right-[10%] w-[70vw] h-[70vw] bg-mesh-blue rounded-full opacity-50 will-change-transform"
      />

      {/* Mesh Glow 3: Cyan Accent Sphere */}
      <motion.div
        animate={{
          x: [0, 30, -25, 0],
          y: [0, 35, 20, 0],
          scale: [1, 1.05, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[25%] right-[15%] w-[45vw] h-[45vw] bg-mesh-cyan rounded-full opacity-35 will-change-transform"
      />

      {/* Grid overlay for structure */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
    </div>
  );
}
export default GradientMesh;
