
-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create products table for real product data
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  image_url TEXT,
  category TEXT NOT NULL,
  in_stock BOOLEAN NOT NULL DEFAULT TRUE,
  is_new BOOLEAN NOT NULL DEFAULT FALSE,
  is_sale BOOLEAN NOT NULL DEFAULT FALSE,
  rating DECIMAL(2,1) DEFAULT 0,
  reviews_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create cart items table
CREATE TABLE public.cart_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- Create orders table
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  shipping_address JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create order items table
CREATE TABLE public.order_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create RLS policies for products (public read access)
CREATE POLICY "Anyone can view products" ON public.products
  FOR SELECT USING (true);

-- Create RLS policies for cart items
CREATE POLICY "Users can view their own cart items" ON public.cart_items
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own cart items" ON public.cart_items
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own cart items" ON public.cart_items
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own cart items" ON public.cart_items
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for orders
CREATE POLICY "Users can view their own orders" ON public.orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own orders" ON public.orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for order items
CREATE POLICY "Users can view their own order items" ON public.order_items
  FOR SELECT USING (auth.uid() IN (SELECT user_id FROM public.orders WHERE id = order_id));

CREATE POLICY "Users can create order items for their orders" ON public.order_items
  FOR INSERT WITH CHECK (auth.uid() IN (SELECT user_id FROM public.orders WHERE id = order_id));

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name, email)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name',
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample product data
INSERT INTO public.products (name, description, price, original_price, image_url, category, in_stock, is_new, is_sale, rating, reviews_count) VALUES
('Premium Leather Collar', 'High-quality leather collar with adjustable sizing and durable hardware.', 29.99, 39.99, 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=400&fit=crop', 'accessories', true, false, true, 4.8, 124),
('Organic Chicken Treats', 'All-natural, organic chicken treats perfect for training and rewarding your dog.', 15.99, null, 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400&h=400&fit=crop', 'food', true, true, false, 4.9, 89),
('Luxury Orthopedic Dog Bed', 'Memory foam dog bed designed for optimal comfort and joint support.', 89.99, 120.00, 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=400&fit=crop', 'beds', true, false, true, 4.7, 67),
('No-Pull Training Harness', 'Ergonomic harness designed to reduce pulling and provide comfortable control.', 34.99, null, 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=400&h=400&fit=crop', 'accessories', true, false, false, 4.6, 156),
('Interactive Puzzle Toy', 'Mental stimulation toy that challenges your dog and provides hours of entertainment.', 22.99, null, 'https://images.unsplash.com/photo-1605897667897-c2ba9c2c1d5e?w=400&h=400&fit=crop', 'toys', true, true, false, 4.5, 203),
('Professional Grooming Kit', 'Complete grooming set with brushes, nail clippers, and cleaning supplies.', 45.99, 55.99, 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=400&h=400&fit=crop', 'grooming', true, false, true, 4.4, 78),
('Stainless Steel Food Bowl Set', 'Durable, non-slip stainless steel bowls perfect for food and water.', 18.99, null, 'https://images.unsplash.com/photo-1589923188900-85dae523342b?w=400&h=400&fit=crop', 'accessories', true, false, false, 4.8, 142),
('Grain-Free Dry Kibble', 'Premium grain-free kibble made with real meat and wholesome ingredients.', 52.99, 65.99, 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400&h=400&fit=crop', 'food', true, false, true, 4.7, 234),
('Dental Chew Treats', 'Dental health treats that help clean teeth and freshen breath naturally.', 12.99, null, 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&h=400&fit=crop', 'health', true, true, false, 4.6, 167),
('Waterproof Dog Jacket', 'Weather-resistant jacket to keep your dog warm and dry during outdoor adventures.', 38.99, 48.99, 'https://images.unsplash.com/photo-1605897667897-c2ba9c2c1d5e?w=400&h=400&fit=crop', 'accessories', false, false, true, 4.5, 95),
('Rope Tug Toy', 'Durable rope toy perfect for interactive play and dental health.', 8.99, null, 'https://images.unsplash.com/photo-1605897667897-c2ba9c2c1d5e?w=400&h=400&fit=crop', 'toys', true, false, false, 4.3, 312),
('Travel Dog Carrier', 'Airline-approved carrier for safe and comfortable travel with your pet.', 75.99, 95.99, 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=400&h=400&fit=crop', 'accessories', true, false, true, 4.7, 88);
