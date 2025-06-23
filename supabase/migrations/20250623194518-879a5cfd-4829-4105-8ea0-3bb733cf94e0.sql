
-- Create storage bucket for blog images
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true);

-- Create policy for blog image uploads (allow authenticated users to upload)
CREATE POLICY "Allow authenticated users to upload blog images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'blog-images');

-- Create policy for public read access to blog images
CREATE POLICY "Allow public read access to blog images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'blog-images');

-- Create policy for authenticated users to update their uploaded images
CREATE POLICY "Allow authenticated users to update blog images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'blog-images');

-- Create policy for authenticated users to delete blog images
CREATE POLICY "Allow authenticated users to delete blog images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'blog-images');
