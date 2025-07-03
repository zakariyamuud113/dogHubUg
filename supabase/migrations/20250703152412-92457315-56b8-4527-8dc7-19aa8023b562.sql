
-- Update RLS policies for products table to allow admins to manage products
DROP POLICY IF EXISTS "Anyone can view products" ON public.products;
DROP POLICY IF EXISTS "Admins can manage products" ON public.products;

-- Create new policies for products
CREATE POLICY "Anyone can view products" ON public.products
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage products" ON public.products
  FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- Update checkout_sessions and donations currency default to UGX
ALTER TABLE public.checkout_sessions ALTER COLUMN currency SET DEFAULT 'UGX';
ALTER TABLE public.donations ALTER COLUMN currency SET DEFAULT 'UGX';
