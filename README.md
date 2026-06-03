# Aether Learn | Next-Gen Learning Dashboard

A futuristic, ultra-premium edtech student learning dashboard built to exceed modern SaaS UI/UX standards. Designed with high-fidelity dark aesthetics, layout-shift-free Framer Motion transitions, responsive layouts, and secure server-side fetching using Supabase SSR.

---

## 🚀 Key Features

- **Modern Bento Grid**: Beautiful responsive grid layout showcasing all widgets in a unified operational deck.
- **Dynamic Cursor-Safe Hover Glows**: Glassmorphic cards with custom neon gradients that illuminate borders on hover using GPU-accelerated transforms.
- **GitHub-Style Heatmap**: Displays study consistency over 126 days with tooltip indicators.
- **Reactive Sidebar & Bottom Nav**: Fluid transitions on desktop and tablet, converting to mobile bottom action links with zero layout shift.
- **Server Component Architecture (RSC)**: Data is securely requested server-side using `@supabase/ssr` to respect database access patterns.
- **Zero CLS Hydration**: Standardized skeleton loader blocks shimmer during hydration to prevent visual page adjustments.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15 App Router
- **Database Backend**: Supabase PostgreSQL
- **Security & Session**: `@supabase/ssr` Cookies Integration
- **Styling & Theme**: Tailwind CSS v4 (Dark Theme Custom Tokens)
- **Fluid Motion Engine**: Framer Motion v12
- **Lucide Iconography**: Lucide React

---

## ⚙️ Supabase Database Schema

To initialize your data layer, open your **Supabase SQL Editor** and execute the following queries:

```sql
-- 1. Create courses table
CREATE TABLE IF NOT EXISTS courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    progress INTEGER NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    icon_name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- 3. Create access policy to allow public select reading
CREATE POLICY "Allow public read access" ON courses
    FOR SELECT USING (true);

-- 4. Seed premium mock curriculum rows
INSERT INTO courses (title, progress, icon_name) VALUES
('Quantum Computing & Algorithmic Design', 68, 'Atom'),
('Advanced Neural Architectures & LLMs', 45, 'Brain'),
('Next.js 15 Production-Scale Engineering', 90, 'Terminal'),
('Reactive UI Systems with Framer Motion', 12, 'Sparkles'),
('Distributed Systems & Cloud Scale Architecture', 30, 'Cpu');
```

---

## 💻 Local Quickstart

### 1. Set Up Environment Keys
Copy the template variables file to local:
```bash
cp .env.example .env.local
```
Then, update the variables inside `.env.local` with your actual Supabase details:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```
*Note: If default placeholder keys are detected, the app automatically serves local fallback metrics so you can review the layouts without setting up Supabase right away.*

### 2. Run the Development Server
Install dependencies and run:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) inside your browser to view the dashboard in action.

---

## 📂 Project Anatomy

```text
app/
 ├── layout.tsx         # Google Fonts (Outfit & Inter), metadata, background meshes
 ├── page.tsx           # Server side data fetches, fallback resolvers
 ├── loading.tsx        # Hydration Bento shimmer skeleton page
 ├── error.tsx          # Network / Database sync error fallback page
 └── globals.css        # Tailwind v4 directives, mesh-blurs, glass-card classes
components/
 ├── dashboard/
 │    ├── HeroCard.tsx       # Welcomes user, stats panels
 │    ├── CourseCard.tsx     # Card component with custom progress and dynamic icons
 │    ├── CourseList.tsx     # Curriculum cards container
 │    ├── ActivityCard.tsx   # Github heatmap study activity tracker
 │    ├── AnalyticsCard.tsx  # Telemetry cards with animated digit counters
 │    └── InsightsCard.tsx   # AI Advisory recommendation listings
 ├── sidebar/
 │    └── Sidebar.tsx        # Toggleable nav & bottom navigation
 └── ui/
      ├── BentoCard.tsx      # Premium glass container with hover triggers
      ├── ProgressBar.tsx    # WAI-ARIA accessible animated progress
      ├── SkeletonLoader.tsx # Custom skeleton blocks for layout hydration
      └── GradientMesh.tsx   # Moving background glow spheres
hooks/
 └── use-mounted.ts     # Client mounting helper
lib/
 └── supabase/
      ├── client.ts         # Supabase client connector
      └── server.ts         # Supabase server headers cookie connector
types/
 └── index.ts           # Typescript typings directory
```

---

## 🏛️ Architectural Choices

1. **Aesthetics & Theme**: Built with a strict **dark-mode-only** theme using Tailwind v4 CSS variables. The UI references premium design systems (like Vercel and Stripe) utilizing glassmorphic background blurs (`backdrop-filter`), thin semi-translucent borders (`rgba(255,255,255,0.05)`), and moving radial-gradients (`GradientMesh.tsx`) to create an atmospheric, high-end feel.
2. **Dynamic Bento Layout**: Structured as a 4-column Bento grid on desktop that collapses responsively to 2 columns on tablet and 1 column on mobile.
3. **GPU-Accelerated Animations**: Cards implement Framer Motion hover animations focusing purely on `scale` and `y-translation` while utilizing `will-change: transform; transform: translateZ(0);` (GPU layer promotion). This guarantees a constant 60fps rendering speed and zero layout shifts.

---

## 🌗 Server / Client Component Split

To satisfy the strict security rule **"DO NOT FETCH COURSE DATA ON CLIENT SIDE"** and enable snappy interactive states, the data-fetching and interactive nodes were split:

1. **Server Component Context (`app/page.tsx`)**:
   - Acts as the secure entry page.
   - Instantiates the Supabase server client using `@supabase/ssr` cookies.
   - Fetches the active courses database list asynchronously. Since this happens server-side, database connection logs, credentials, and API paths remain private.
   - Passes the queried data directly to the client wrapper as page props.

2. **Client Component Context (`DashboardWrapper.tsx`, Cards, Sidebar)**:
   - Houses all interactive elements that require user events or state tracking (like active sidebar tabs, collapsible panel animations, GitHub hover tooltips, and spring progress loaders).
   - Prevents database sync delays by immediately updating UI panels client-side while rendering the fetched database telemetry.

---

## ⚡ Challenges Faced & Resolutions

- **Challenge: Next.js 15 Cookie Async Breaking Changes**:
  - *Problem*: In Next.js 15, headers and cookie methods (like `cookies()`) return Promises. Standard cookie retrieval methods from Next.js 14 trigger runtime errors.
  - *Resolution*: Updated `lib/supabase/server.ts` to asynchronously await the cookie store: `const cookieStore = await cookies();` before passing it to the `@supabase/ssr` client setup.
- **Challenge: React 19 Client Hydration Mismatches**:
  - *Problem*: Thermic grids (like the GitHub heatmap dates) or initial motion calculations depend on client-side viewport sizes, causing mismatch warnings when pre-rendering HTML on the server.
  - *Resolution*: Implemented a custom `useMounted` hook to ensure client-only motion features and tooltip metrics defer rendering until the page is fully hydrated.
- **Challenge: Local Environment Variable Compilation Safety**:
  - *Problem*: If standard build checks run during automated deployment pipelines without a live database URL, the project compilation crashes.
  - *Resolution*: Implemented a fallback data-layer loop in `app/page.tsx` that serves structured mock data if default credentials (`mockproject.supabase.co`) are present, ensuring seamless static page generation during build pipelines.

