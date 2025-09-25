-- Add missing RLS policies for orders table to prevent unauthorized payment data manipulation

-- Allow users to insert orders only for themselves
CREATE POLICY "Users can create their own orders" 
ON public.orders 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Allow users to update only their own orders
-- Note: In production, you may want to further restrict which columns can be updated
CREATE POLICY "Users can update their own orders" 
ON public.orders 
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Note: No DELETE policy is intentionally omitted for audit trail purposes
-- Orders should typically never be deleted, only marked as cancelled via status updates