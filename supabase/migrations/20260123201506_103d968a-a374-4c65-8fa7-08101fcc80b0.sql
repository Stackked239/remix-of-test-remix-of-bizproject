-- Create table for BizGuides coaching inquiries (Tier 2 - Schedule Session)
CREATE TABLE public.bizguides_inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  company_name TEXT,
  industry TEXT NOT NULL,
  revenue_stage TEXT NOT NULL,
  primary_challenge TEXT NOT NULL,
  session_length TEXT NOT NULL,
  referral_source TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.bizguides_inquiries ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (form submissions are anonymous)
CREATE POLICY "Anyone can submit BizGuides inquiries"
ON public.bizguides_inquiries
FOR INSERT
WITH CHECK (true);

-- Only admins can view inquiries
CREATE POLICY "Only admins can view BizGuides inquiries"
ON public.bizguides_inquiries
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can update inquiries
CREATE POLICY "Only admins can update BizGuides inquiries"
ON public.bizguides_inquiries
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_bizguides_inquiries_updated_at
BEFORE UPDATE ON public.bizguides_inquiries
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();