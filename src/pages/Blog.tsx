import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dog, ShoppingCart, Calendar, User, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Benefits of Daily Dog Walking",
      author: "Alice Johnson",
      date: "2024-08-15",
      image: "https://images.unsplash.com/photo-1548199973-03c54c67ebcd?w=600&h=400&fit=crop",
      content: "Daily dog walks are essential for your furry friend's physical and mental health. Learn about the benefits and how to make the most of your walks.",
      category: "Health & Wellness"
    },
    {
      id: 2,
      title: "Top 10 Dog-Friendly Parks in the City",
      author: "Bob Williams",
      date: "2024-08-10",
      image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=600&h=400&fit=crop",
      content: "Discover the best dog parks in the city where your dog can socialize and play off-leash. We've compiled a list of the top 10 parks with all the details you need.",
      category: "Local Guides"
    },
    {
      id: 3,
      title: "Choosing the Right Dog Food: A Comprehensive Guide",
      author: "Carol Davis",
      date: "2024-08-05",
      image: "https://images.unsplash.com/photo-1560786386-62941453c3e1?w=600&h=400&fit=crop",
      content: "Selecting the right dog food can be overwhelming. This guide breaks down the different types of dog food and what to look for to ensure your dog gets the best nutrition.",
      category: "Nutrition"
    },
    {
      id: 4,
      title: "How to Train Your Dog Basic Commands",
      author: "David Miller",
      date: "2024-07-30",
      image: "https://images.unsplash.com/photo-1535930891776-0c2df1373949?w=600&h=400&fit=crop",
      content: "Training your dog basic commands is easier than you think. Learn step-by-step instructions for teaching your dog to sit, stay, come, and more.",
      category: "Training"
    },
    {
      id: 5,
      title: "The Ultimate Guide to Dog Grooming at Home",
      author: "Eve Taylor",
      date: "2024-07-25",
      image: "https://images.unsplash.com/photo-1568572933382-74d950614e5f?w=600&h=400&fit=crop",
      content: "Save money and keep your dog looking great with our ultimate guide to dog grooming at home. We cover everything from brushing to bathing to nail trimming.",
      category: "Grooming"
    },
    {
      id: 6,
      title: "Traveling with Your Dog: Tips and Tricks",
      author: "Frank Wilson",
      date: "2024-07-20",
      image: "https://images.unsplash.com/photo-1543466835-00a7907ca9be?w=600&h=400&fit=crop",
      content: "Traveling with your dog can be a fun and rewarding experience. Learn our top tips and tricks for making your trip safe and enjoyable for both you and your furry friend.",
      category: "Travel"
    }
  ];

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Card key={post.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative">
                  <div className="aspect-video bg-gray-100 rounded-t-lg overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-blue-500 hover:bg-blue-600">{post.category}</Badge>
                  </div>
                </div>

                <CardContent className="p-4">
                  <CardHeader className="p-0 pb-4">
                    <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                  </CardHeader>
                  <div className="flex items-center text-gray-500 text-sm mb-4">
                    <User className="h-4 w-4 mr-2" />
                    <span>{post.author}</span>
                    <Calendar className="h-4 w-4 mx-2" />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                  <p className="text-gray-700 line-clamp-3">{post.content}</p>
                  <Button asChild variant="link" className="mt-4">
                    <Link to={`/blog/${post.id}`} className="flex items-center">
                      Read More
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
