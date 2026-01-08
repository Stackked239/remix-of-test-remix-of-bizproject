-- Create table for 404 error logging
CREATE TABLE IF NOT EXISTS public.page_not_found_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  attempted_url TEXT NOT NULL,
  referrer TEXT,
  user_agent TEXT,
  ip_address TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT now(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_page_not_found_logs_timestamp ON public.page_not_found_logs(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_page_not_found_logs_attempted_url ON public.page_not_found_logs(attempted_url);

-- Enable RLS
ALTER TABLE public.page_not_found_logs ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert (for logging)
CREATE POLICY "Anyone can log 404 errors"
  ON public.page_not_found_logs
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create policy to allow authenticated users to view logs (for admin dashboard)
CREATE POLICY "Authenticated users can view 404 logs"
  ON public.page_not_found_logs
  FOR SELECT
  TO authenticated
  USING (true);

-- Add comment
COMMENT ON TABLE public.page_not_found_logs IS 'Logs 404 page not found errors for analytics and reporting';