
-- Create table for lost and found dog reports
CREATE TABLE public.dog_reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  type TEXT NOT NULL CHECK (type IN ('lost', 'found')),
  dog_name TEXT,
  breed TEXT,
  age INTEGER,
  gender TEXT CHECK (gender IN ('male', 'female', 'unknown')),
  size TEXT CHECK (size IN ('small', 'medium', 'large', 'extra_large')),
  color TEXT,
  description TEXT,
  last_seen_date DATE,
  last_seen_location TEXT,
  contact_name TEXT NOT NULL,
  contact_phone TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  reward_amount INTEGER DEFAULT 0,
  is_urgent BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'resolved', 'closed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for checkout/orders
CREATE TABLE public.checkout_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  customer_email TEXT NOT NULL,
  customer_name TEXT,
  customer_phone TEXT,
  total_amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  items JSONB NOT NULL,
  shipping_address JSONB,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')),
  stripe_session_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for donations
CREATE TABLE public.donations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  donor_email TEXT NOT NULL,
  donor_name TEXT,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  message TEXT,
  is_anonymous BOOLEAN DEFAULT false,
  stripe_session_id TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.dog_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.checkout_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for dog_reports (public read, authenticated users can insert/update their own)
CREATE POLICY "Anyone can view dog reports" ON public.dog_reports
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create dog reports" ON public.dog_reports
  FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can update their own dog reports" ON public.dog_reports
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for checkout_sessions
CREATE POLICY "Users can view their own checkout sessions" ON public.checkout_sessions
  FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Anyone can create checkout sessions" ON public.checkout_sessions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "System can update checkout sessions" ON public.checkout_sessions
  FOR UPDATE USING (true);

-- RLS Policies for donations (public read for non-anonymous donations)
CREATE POLICY "Anyone can view non-anonymous donations" ON public.donations
  FOR SELECT USING (NOT is_anonymous);

CREATE POLICY "Anyone can create donations" ON public.donations
  FOR INSERT WITH CHECK (true);

CREATE POLICY "System can update donations" ON public.donations
  FOR UPDATE USING (true);

-- Add indexes for better performance
CREATE INDEX idx_dog_reports_type ON public.dog_reports(type);
CREATE INDEX idx_dog_reports_status ON public.dog_reports(status);
CREATE INDEX idx_dog_reports_location ON public.dog_reports(last_seen_location);
CREATE INDEX idx_checkout_sessions_status ON public.checkout_sessions(status);
CREATE INDEX idx_donations_status ON public.donations(status);
