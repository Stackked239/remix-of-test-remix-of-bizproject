-- Create table for storing idea submissions
CREATE TABLE public.idea_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  idea_number INTEGER NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  category TEXT NOT NULL,
  idea_title TEXT NOT NULL,
  description TEXT NOT NULL,
  problems_solved TEXT[] DEFAULT '{}',
  urgency TEXT,
  beta_testing TEXT,
  privacy_consent BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create sequence for idea numbers starting at 4001
CREATE SEQUENCE public.idea_number_seq START WITH 4001;

-- Enable RLS
ALTER TABLE public.idea_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (public form)
CREATE POLICY "Anyone can submit ideas"
ON public.idea_submissions
FOR INSERT
WITH CHECK (true);

-- Only admins can view all submissions
CREATE POLICY "Admins can view all submissions"
ON public.idea_submissions
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can update submissions
CREATE POLICY "Admins can update submissions"
ON public.idea_submissions
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for updated_at
CREATE TRIGGER update_idea_submissions_updated_at
BEFORE UPDATE ON public.idea_submissions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for faster lookups
CREATE INDEX idx_idea_submissions_email ON public.idea_submissions(email);
CREATE INDEX idx_idea_submissions_status ON public.idea_submissions(status);
CREATE INDEX idx_idea_submissions_created_at ON public.idea_submissions(created_at DESC);