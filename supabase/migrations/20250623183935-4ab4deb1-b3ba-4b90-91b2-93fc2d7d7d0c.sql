
-- Create the admin user account
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'dogmin@admin.com',
  crypt('Admin123', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '{"provider": "email", "providers": ["email"]}',
  '{"first_name": "Dog", "last_name": "Min"}',
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
);

-- Get the admin user ID and assign admin role
WITH admin_user AS (
  SELECT id FROM auth.users WHERE email = 'dogmin@admin.com'
)
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role FROM admin_user;

-- Create services table
CREATE TABLE public.services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  price NUMERIC,
  duration INTEGER, -- duration in minutes
  category TEXT NOT NULL,
  image_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create blogs table
CREATE TABLE public.blogs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  author_id UUID REFERENCES auth.users(id),
  category TEXT,
  tags TEXT[],
  image_url TEXT,
  is_published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for services and blogs
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

-- RLS policies for services (public read, admin write)
CREATE POLICY "Anyone can view active services" ON public.services
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage services" ON public.services
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- RLS policies for blogs (public read published, admin write)
CREATE POLICY "Anyone can view published blogs" ON public.blogs
  FOR SELECT USING (is_published = true);

CREATE POLICY "Admins can manage blogs" ON public.blogs
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_services_category ON public.services(category);
CREATE INDEX IF NOT EXISTS idx_services_active ON public.services(is_active);
CREATE INDEX IF NOT EXISTS idx_blogs_published ON public.blogs(is_published);
CREATE INDEX IF NOT EXISTS idx_blogs_author ON public.blogs(author_id);
CREATE INDEX IF NOT EXISTS idx_blogs_category ON public.blogs(category);
