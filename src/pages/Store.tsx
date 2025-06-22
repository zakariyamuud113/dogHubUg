
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dog, ShoppingCart, Search, Filter, Star, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Store = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");

  const categories = [
    { id: "all", name: "All Products" },
    { id: "accessories", name: "Accessories" },
    { id: "food", name: "Food & Treats" },
    { id: "toys", name: "Toys" },
    { id: "grooming", name: "Grooming" },
    { id: "beds", name: "Beds & Furniture" },
    { id: "health", name: "Health & Wellness" },
  ];

  const products = [
    { id: 1, name: "Premium Leather Collar", price: 29.99, image: "/placeholder.svg", category: "accessories", rating: 4.8, reviews: 124, inStock: true },
    { id: 2, name: "Organic Chicken Treats", price: 15.99, image: "/placeholder.svg", category: "food", rating: 4.9, reviews: 89, inStock: true },
    { id: 3, name: "Luxury Dog Bed", price: 89.99, image: "/placeholder.svg", category: "beds", rating: 4.7, reviews: 56, inStock: true },
    { id: 4, name: "Training Harness", price: 34.99, image: "/placeholder.svg", category: "accessories", rating: 4.6, reviews: 203, inStock: true },
    { id: 5, name: "Interactive Puzzle Toy", price: 24.99, image: "/placeholder.svg", category: "toys", rating: 4.8, reviews: 167, inStock: true },
    { id: 6, name: "Professional Grooming Kit", price: 59.99, image: "/placeholder.svg", category: "grooming", rating: 4.7, reviews: 92, inStock: false },
    { id: 7, name: "Grain-Free Dry Kibble", price: 45.99, image: "/placeholder.svg", category: "food", rating: 4.9, reviews: 234, inStock: true },
    { id: 8, name: "Orthopedic Dog Bed", price: 129.99, image: "/placeholder.svg", category: "beds", rating: 4.8, reviews: 78, inStock: true },
    { id: 9, name: "Retractable Leash", price: 19.99, image: "/placeholder.svg", category: "accessories", rating: 4.5, reviews: 145, inStock: true },
    { id: 10, name: "Dental Chew Treats", price: 12.99, image: "/placeholder.svg", category: "health", rating: 4.6, reviews: 198, inStock: true },
    { id: 11, name: "Squeaky Ball Set", price: 16.99, image: "/placeholder.svg", category: "toys", rating: 4.7, reviews: 156, inStock: true },
    { id: 12, name: "Waterproof Dog Coat", price: 39.99, image: "/placeholder.svg", category: "accessories", rating: 4.8, reviews: 89, inStock: true },
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
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
              <Link to="/store" className="text-orange-500 font-semibold">Store</Link>
              <Link to="/marketplace" className="text-gray-700 hover:text-orange-500 transition-colors">Marketplace</Link>
              <Link to="/services" className="text-gray-700 hover:text-orange-500 transition-colors">Services</Link>
              <Link to="/blog" className="text-gray-700 hover:text-orange-500 transition-colors">Blog</Link>
              <Link to="/lost-found" className="text-gray-700 hover:text-orange-500 transition-colors">Lost & Found</Link>
              <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Cart (0)
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-orange-500 to-pink-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Premium Dog Products</h2>
          <p className="text-xl opacity-90">Everything your furry friend needs for a happy, healthy life</p>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 px-4 bg-white border-b">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 items-center flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
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
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800">
              {filteredProducts.length} Products Found
            </h3>
            <div className="hidden sm:flex gap-2">
              <Button variant="outline" size="sm">Grid View</Button>
              <Button variant="ghost" size="sm">List View</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative">
                  <div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white p-2"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                  {!product.inStock && (
                    <Badge className="absolute top-2 left-2 bg-red-500">
                      Out of Stock
                    </Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <Badge variant="secondary" className="mb-2 capitalize">
                    {product.category.replace('-', ' ')}
                  </Badge>
                  <h4 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                    {product.name}
                  </h4>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600 ml-1">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-orange-500">
                      ${product.price}
                    </span>
                    <Button 
                      size="sm"
                      disabled={!product.inStock}
                      className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:opacity-50"
                    >
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      Add
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <Dog className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Store;
