
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dog, ShoppingCart, Calendar, User, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

type Blog = Tables<'blogs'>;

const Blog = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .eq('is_published', true)
          .order('published_at', { ascending: false });

        if (error) throw error;
        setBlogs(data || []);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 flex flex-col">
        <header className="bg-white shadow-lg sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center space-x-2">
                <Dog className="h-8 w-8 text-orange-500" />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">
                  DOGHub
                </h1>
              </Link>
              <nav className="hidden md:flex items-center space-x-6">
                <Link to="/store" className="text-gray-700 hover:text-orange-500 transition-colors">Store</Link>
                <Link to="/marketplace" className="text-gray-700 hover:text-orange-500 transition-colors">Marketplace</Link>
                <Link to="/services" className="text-gray-700 hover:text-orange-500 transition-colors">Services</Link>
                <Link to="/blog" className="text-blue-500 font-semibold">Blog</Link>
                <Link to="/lost-found" className="text-gray-700 hover:text-orange-500 transition-colors">Lost & Found</Link>
              </nav>
              <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Cart (0)
              </Button>
            </div>
          </div>
        </header>

        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading blogs...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Dog className="h-8 w-8 text-orange-500" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">
                DOGHub
              </h1>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/store" className="text-gray-700 hover:text-orange-500 transition-colors">Store</Link>
              <Link to="/marketplace" className="text-gray-700 hover:text-orange-500 transition-colors">Marketplace</Link>
              <Link to="/services" className="text-gray-700 hover:text-orange-500 transition-colors">Services</Link>
              <Link to="/blog" className="text-blue-500 font-semibold">Blog</Link>
              <Link to="/lost-found" className="text-gray-700 hover:text-orange-500 transition-colors">Lost & Found</Link>
            </nav>
            <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Cart (0)
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-orange-500 to-blue-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">The DOGHub Blog</h2>
          <p className="text-xl opacity-90">Insights, tips, and stories for dog lovers</p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          {blogs.length === 0 ? (
            <div className="text-center py-16">
              <Dog className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-600 mb-2">No Blog Posts Yet</h3>
              <p className="text-gray-500">Check back soon for the latest dog care tips and stories!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <Card key={blog.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="relative">
                    <div className="aspect-video bg-gray-100 rounded-t-lg overflow-hidden">
                      {blog.image_url ? (
                        <img
                          src={blog.image_url}
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-orange-100 to-blue-100 flex items-center justify-center">
                          <Dog className="h-16 w-16 text-orange-400" />
                        </div>
                      )}
                    </div>
                    {blog.category && (
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-blue-500 hover:bg-blue-600">{blog.category}</Badge>
                      </div>
                    )}
                  </div>

                  <CardContent className="p-4">
                    <CardHeader className="p-0 pb-4">
                      <CardTitle className="line-clamp-2">{blog.title}</CardTitle>
                    </CardHeader>
                    <div className="flex items-center text-gray-500 text-sm mb-4">
                      <User className="h-4 w-4 mr-2" />
                      <span>Author</span>
                      <Calendar className="h-4 w-4 mx-2" />
                      <span>{blog.published_at ? new Date(blog.published_at).toLocaleDateString() : 'Draft'}</span>
                    </div>
                    {blog.excerpt && (
                      <p className="text-gray-700 line-clamp-3 mb-4">{blog.excerpt}</p>
                    )}
                    <Button asChild variant="link" className="mt-4">
                      <Link to={`/blog/${blog.id}`} className="flex items-center">
                        Read More
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
