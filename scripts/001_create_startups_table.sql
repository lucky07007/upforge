-- Create startups table
CREATE TABLE IF NOT EXISTS public.startups (
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

-- Allow authenticated users (admins) to insert
CREATE POLICY "Allow authenticated insert" ON public.startups
  FOR INSERT TO authenticated WITH CHECK (true);

-- Allow authenticated users (admins) to update
CREATE POLICY "Allow authenticated update" ON public.startups
  FOR UPDATE TO authenticated USING (true);

-- Allow authenticated users (admins) to delete
CREATE POLICY "Allow authenticated delete" ON public.startups
  FOR DELETE TO authenticated USING (true);

-- Create index on slug for fast lookups
CREATE INDEX IF NOT EXISTS idx_startups_slug ON public.startups (slug);

-- Create index on is_featured for featured startup queries
CREATE INDEX IF NOT EXISTS idx_startups_featured ON public.startups (is_featured) WHERE is_featured = true;

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_startups_created_at ON public.startups (created_at DESC);
