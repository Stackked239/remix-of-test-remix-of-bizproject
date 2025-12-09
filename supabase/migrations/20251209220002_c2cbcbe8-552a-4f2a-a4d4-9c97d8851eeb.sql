-- Drop the overly permissive SELECT policy
DROP POLICY IF EXISTS "Authenticated users can view 404 logs" ON public.page_not_found_logs;

-- Create a new policy that restricts SELECT to admins only
CREATE POLICY "Only admins can view 404 logs" 
ON public.page_not_found_logs 
FOR SELECT 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));