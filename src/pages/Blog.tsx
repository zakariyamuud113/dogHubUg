
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dog, Calendar, User, Clock, Search, Filter, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Categories" },
    { id: "health", name: "Health & Wellness" },
    { id: "training", name: "Training Tips" },
    { id: "grooming", name: "Grooming" },
    { id: "nutrition", name: "Nutrition" },
    { id: "behavior", name: "Behavior" },
    { id: "lifestyle", name: "Lifestyle" },
  ];

  const blogPosts = [
    {
      id: 1,
      title: "Complete Guide to Puppy Potty Training",
      excerpt: "Learn effective techniques and schedules for successful potty training your new puppy.",
      content: "House training your puppy is one of the first and most important lessons...",
      category: "training",
      author: "Dr. Sarah Johnson",
      publishDate: "2024-01-15",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&h=400&fit=crop",
      tags: ["puppies", "training", "housebreaking"]
    },
    {
      id: 2,
      title: "Essential Grooming Tips for Long-Haired Dogs",
      excerpt: "Keep your long-haired companion looking beautiful with these professional grooming techniques.",
      content: "Long-haired dogs require special attention when it comes to grooming...",
      category: "grooming",
      author: "Mike Peterson",
      publishDate: "2024-01-12",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&h=400&fit=crop",
      tags: ["grooming", "long-hair", "maintenance"]
    },
    {
      id: 3,
      title: "Understanding Your Dog's Nutritional Needs",
      excerpt: "A comprehensive guide to feeding your dog the right nutrients for optimal health.",
      content: "Proper nutrition is fundamental to your dog's health and longevity...",
      category: "nutrition",
      author: "Dr. Emily Chen",
      publishDate: "2024-01-10",
      readTime: "10 min read",
      image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=600&h=400&fit=crop",
      tags: ["nutrition", "health", "diet"]
    },
    {
      id: 4,
      title: "Signs of Stress in Dogs and How to Help",
      excerpt: "Learn to recognize stress signals in your dog and discover effective ways to provide comfort.",
      content: "Dogs can experience stress just like humans, and it's important to recognize the signs...",
      category: "behavior",
      author: "Dr. Robert Kim",
      publishDate: "2024-01-08",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&h=400&fit=crop",
      tags: ["behavior", "stress", "mental-health"]
    },
    {
      id: 5,
      title: "Creating a Dog-Friendly Home Environment",
      excerpt: "Transform your living space into a safe and comfortable haven for your four-legged family member.",
      content: "Making your home dog-friendly involves more than just buying a few toys...",
      category: "lifestyle",
      author: "Jennifer Martinez",
      publishDate: "2024-01-05",
      readTime: "9 min read",
      image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=600&h=400&fit=crop",
      tags: ["home", "safety", "environment"]
    },
    {
      id: 6,
      title: "Common Health Issues in Senior Dogs",
      excerpt: "Understanding age-related health concerns and how to provide the best care for your aging companion.",
      content: "As dogs age, they may develop various health issues that require special attention...",
      category: "health",
      author: "Dr. Lisa Thompson",
      publishDate: "2024-01-03",
      readTime: "12 min read",
      image: "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=600&h=400&fit=crop",
      tags: ["senior-dogs", "health", "aging"]
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
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
              <Link to="/blog" className="text-purple-500 font-semibold">Blog</Link>
              <Link to="/lost-found" className="text-gray-700 hover:text-orange-500 transition-colors">Lost & Found</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Dog Care Blog</h2>
          <p className="text-xl opacity-90">Expert tips and advice for happy, healthy dogs</p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 px-4 bg-white border-b">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800">
              {filteredPosts.length} Articles Found
            </h3>
            <Button className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700">
              <BookOpen className="h-4 w-4 mr-2" />
              Write Article
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="aspect-video bg-gray-100 rounded-t-lg overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                  />
                </div>
                
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge 
                      variant="secondary" 
                      className="capitalize"
                    >
                      {post.category.replace('-', ' ')}
                    </Badge>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <CardTitle className="text-xl group-hover:text-purple-600 transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-gray-500 text-sm">
                      <User className="h-4 w-4 mr-1" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{new Date(post.publishDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  <Button 
                    className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
                  >
                    Read More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No articles found</h3>
              <p className="text-gray-500">Try adjusting your search filters</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
