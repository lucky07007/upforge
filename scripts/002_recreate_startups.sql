-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public read access" ON public.startups;
DROP POLICY IF EXISTS "Allow authenticated insert" ON public.startups;
DROP POLICY IF EXISTS "Allow authenticated update" ON public.startups;
DROP POLICY IF EXISTS "Allow authenticated delete" ON public.startups;

-- Drop table if exists and recreate
DROP TABLE IF EXISTS public.startups;

-- Create startups table
CREATE TABLE public.startups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  logo_url TEXT,
  website TEXT,
  founders TEXT NOT NULL,
  founded_year INTEGER,
  category TEXT NOT NULL,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.startups ENABLE ROW LEVEL SECURITY;

-- Allow public read access to all startups
CREATE POLICY "Allow public read access" ON public.startups
  FOR SELECT USING (true);

-- Allow authenticated users to insert
CREATE POLICY "Allow authenticated insert" ON public.startups
  FOR INSERT TO authenticated WITH CHECK (true);

-- Allow authenticated users to update
CREATE POLICY "Allow authenticated update" ON public.startups
  FOR UPDATE TO authenticated USING (true);

-- Allow authenticated users to delete
CREATE POLICY "Allow authenticated delete" ON public.startups
  FOR DELETE TO authenticated USING (true);
