import { createClient } from '@/lib/supabase/server';
import DashboardWrapper from '@/components/dashboard/DashboardWrapper';

// Disable caching to ensure real-time dashboard telemetry
export const revalidate = 0;

const fallbackCourses = [
  { id: '1', title: 'Quantum Computing & Algorithmic Design', progress: 68, icon_name: 'Atom', created_at: new Date().toISOString() },
  { id: '2', title: 'Advanced Neural Architectures & LLMs', progress: 45, icon_name: 'Brain', created_at: new Date().toISOString() },
  { id: '3', title: 'Next.js 15 Production-Scale Engineering', progress: 90, icon_name: 'Terminal', created_at: new Date().toISOString() },
  { id: '4', title: 'Reactive UI Systems with Framer Motion', progress: 12, icon_name: 'Sparkles', created_at: new Date().toISOString() },
  { id: '5', title: 'Distributed Systems & Cloud Scale Architecture', progress: 30, icon_name: 'Cpu', created_at: new Date().toISOString() },
];

export default async function DashboardPage() {
  let courses = [];
  const isMock = process.env.NEXT_PUBLIC_SUPABASE_URL?.includes('mockproject.supabase.co');

  if (isMock) {
    // Return pre-seeded mockup data out of the box for immediate demonstration
    courses = fallbackCourses;
  } else {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        throw new Error(error.message);
      }
      courses = data || [];
    } catch (e) {
      console.error('Telemetry Sync Error (Supabase):', e);
      // Propagate the database/network error to Next.js error.tsx boundary
      throw new Error(
        e instanceof Error ? e.message : 'Database connection rejected. Make sure the table "courses" exists in your Supabase schema.'
      );
    }
  }

  return <DashboardWrapper initialCourses={courses} />;
}
