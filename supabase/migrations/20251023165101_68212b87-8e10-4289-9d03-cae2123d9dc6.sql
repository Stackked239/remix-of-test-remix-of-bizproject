-- Create email_subscribers table
CREATE TABLE public.email_subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  source TEXT,
  subscribed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Create index for faster email lookups
CREATE INDEX idx_email_subscribers_email ON public.email_subscribers(email);
CREATE INDEX idx_email_subscribers_subscribed_at ON public.email_subscribers(subscribed_at DESC);

-- Enable Row Level Security
ALTER TABLE public.email_subscribers ENABLE ROW LEVEL SECURITY;

-- Policy: Only authenticated users can view subscribers (you can restrict to admin later)
CREATE POLICY "Authenticated users can view subscribers"
ON public.email_subscribers
FOR SELECT
TO authenticated
USING (true);

-- Policy: Service role can insert (edge functions use service role by default)
-- No explicit policy needed for service role as it bypasses RLS