import type { Metadata } from 'next';
import { Outfit, Inter } from 'next/font/google';
import './globals.css';
import GradientMesh from '@/components/ui/GradientMesh';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Aether | Next-Gen Learning Dashboard',
  description: 'A futuristic edtech SaaS dashboard featuring real-time telemetry, automated schedules, and cognitive AI insights.',
  keywords: ['nextjs', 'typescript', 'supabase', 'framer-motion', 'learning-dashboard', 'saas'],
  authors: [{ name: 'Mohammed' }],
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable} h-full antialiased dark`}>
      <body className="min-h-full bg-[#050505] text-[#f8fafc] flex flex-col relative font-sans">
        {/* Glowing background meshes */}
        <GradientMesh />
        
        {/* Main layout contents */}
        {children}
      </body>
    </html>
  );
}
