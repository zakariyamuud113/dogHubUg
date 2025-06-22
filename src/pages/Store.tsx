import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dog, ShoppingCart, Heart, Star, Filter, Search } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

const Store = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");

  const categories = [
    { id: "all", name: "All Products" },
    { id: "accessories", name: "Accessories" },
    { id: "food", name: "Food & Treats" },
    { id: "toys", name: "Toys" },
    { id: "grooming", name: "Grooming" },
    { id: "beds", name: "Beds & Furniture" },
    { id: "health", name: "Health & Wellness" },
  ];

  const priceRanges = [
    { id: "all", name: "All Prices" },
    { id: "0-25", name: "$0 - $25" },
    { id: "25-50", name: "$25 - $50" },
    { id: "50-100", name: "$50 - $100" },
    { id: "100+", name: "$100+" },
  ];

  const products = [
    {
      id: 1,
      name: "Premium Leather Collar",
      price: 29.99,
      originalPrice: 39.99,
      rating: 4.8,
      reviews: 124,
      image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=400&fit=crop",
      category: "accessories",
      inStock: true,
      isNew: false,
      isSale: true
    },
    {
      id: 2,
      name: "Organic Chicken Treats",
      price: 15.99,
      originalPrice: null,
      rating: 4.9,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400&h=400&fit=crop",
      category: "food",
      inStock: true,
      isNew: true,
      isSale: false
    },
    {
      id: 3,
      name: "Luxury Orthopedic Dog Bed",
      price: 89.99,
      originalPrice: 120.00,
      rating: 4.7,
      reviews: 67,
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=400&fit=crop",
      category: "beds",
      inStock: true,
      isNew: false,
      isSale: true
    },
    {
      id: 4,
      name: "No-Pull Training Harness",
      price: 34.99,
      originalPrice: null,
      rating: 4.6,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=400&h=400&fit=crop",
      category: "accessories",
      inStock: true,
      isNew: false,
      isSale: false
    },
    {
      id: 5,
      name: "Interactive Puzzle Toy",
      price: 22.99,
      originalPrice: null,
      rating: 4.5,
      reviews: 203,
      image: "https://images.unsplash.com/photo-1605897667897-c2ba9c2c1d5e?w=400&h=400&fit=crop",
      category: "toys",
      inStock: true,
      isNew: true,
      isSale: false
    },
    {
      id: 6,
      name: "Professional Grooming Kit",
      price: 45.99,
      originalPrice: 55.99,
      rating: 4.4,
      reviews: 78,
      image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=400&h=400&fit=crop",
      category: "grooming",
      inStock: true,
      isNew: false,
      isSale: true
    },
    {
      id: 7,
      name: "Stainless Steel Food Bowl Set",
      price: 18.99,
      originalPrice: null,
      rating: 4.8,
      reviews: 142,
      image: "https://images.unsplash.com/photo-1589923188900-85dae523342b?w=400&h=400&fit=crop",
      category: "accessories",
      inStock: true,
      isNew: false,
      isSale: false
    },
    {
      id: 8,
      name: "Grain-Free Dry Kibble",
      price: 52.99,
      originalPrice: 65.99,
      rating: 4.7,
      reviews: 234,
      image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400&h=400&fit=crop",
      category: "food",
      inStock: true,
      isNew: false,
      isSale: true
    },
    {
      id: 9,
      name: "Dental Chew Treats",
      price: 12.99,
      originalPrice: null,
      rating: 4.6,
      reviews: 167,
      image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&h=400&fit=crop",
      category: "health",
      inStock: true,
      isNew: true,
      isSale: false
    },
    {
      id: 10,
      name: "Waterproof Dog Jacket",
      price: 38.99,
      originalPrice: 48.99,
      rating: 4.5,
      reviews: 95,
      image: "https://images.unsplash.com/photo-1605897667897-c2ba9c2c1d5e?w=400&h=400&fit=crop",
      category: "accessories",
      inStock: false,
      isNew: false,
      isSale: true
    },
    {
      id: 11,
      name: "Rope Tug Toy",
      price: 8.99,
      originalPrice: null,
      rating: 4.3,
      reviews: 312,
      image: "https://images.unsplash.com/photo-1605897667897-c2ba9c2c1d5e?w=400&h=400&fit=crop",
      category: "toys",
      inStock: true,
      isNew: false,
      isSale: false
    },
    {
      id: 12,
      name: "Travel Dog Carrier",
      price: 75.99,
      originalPrice: 95.99,
      rating: 4.7,
      reviews: 88,
      image: "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=400&h=400&fit=crop",
      category: "accessories",
      inStock: true,
      isNew: false,
      isSale: true
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesPrice = selectedPriceRange === "all" || 
      (selectedPriceRange === "0-25" && product.price <= 25) ||
      (selectedPriceRange === "25-50" && product.price > 25 && product.price <= 50) ||
      (selectedPriceRange === "50-100" && product.price > 50 && product.price <= 100) ||
      (selectedPriceRange === "100+" && product.price > 100);
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

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
              <Link to="/store" className="text-blue-500 font-semibold">Store</Link>
              <Link to="/marketplace" className="text-gray-700 hover:text-orange-500 transition-colors">Marketplace</Link>
              <Link to="/services" className="text-gray-700 hover:text-orange-500 transition-colors">Services</Link>
              <Link to="/blog" className="text-gray-700 hover:text-orange-500 transition-colors">Blog</Link>
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
          <h2 className="text-4xl font-bold mb-4">Premium Dog Products</h2>
          <p className="text-xl opacity-90">Everything your furry friend needs for a happy, healthy life</p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 px-4 bg-white border-b">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search products..."
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
              <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  {priceRanges.map((range) => (
                    <SelectItem key={range.id} value={range.id}>
                      {range.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
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
                  
                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {product.isNew && (
                      <Badge className="bg-green-500 hover:bg-green-600">New</Badge>
                    )}
                    {product.isSale && (
                      <Badge className="bg-red-500 hover:bg-red-600">Sale</Badge>
                    )}
                  </div>
                  
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white p-2"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                
                <CardContent className="p-4">
                  <h4 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h4>
                  
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-2">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-orange-600">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                    disabled={!product.inStock}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {product.inStock ? "Add to Cart" : "Out of Stock"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
              <p className="text-gray-500">Try adjusting your search filters</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Store;
