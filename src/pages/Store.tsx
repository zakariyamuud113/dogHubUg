
import { useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShoppingCart, Star, Search, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const Store = () => {
  const { data: products, isLoading } = useProducts();
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  const categories = [
    "Food & Treats",
    "Toys & Entertainment", 
    "Health & Wellness",
    "Training & Behavior",
    "Grooming & Care",
    "Accessories",
    "Beds & Furniture"
  ];

  const filteredProducts = products?.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
      default:
        return a.name.localeCompare(b.name);
    }
  }) || [];

  const handleAddToCart = (product: any) => {
    addToCart({ productId: product.id, quantity: 1 });
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const formatPrice = (price: number) => {
    return `UGX ${price.toLocaleString()}`;
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Pet Store</h1>
        <p className="text-gray-600">Everything your furry friend needs, delivered with love</p>
      </div>

      {/* Filters */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
        <div className="grid md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
            </SelectContent>
          </Select>
          <div className="text-sm text-gray-600 flex items-center">
            Showing {filteredProducts.length} products
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="group hover:shadow-lg transition-shadow">
            <CardHeader className="p-0">
              <div className="relative overflow-hidden rounded-t-lg">
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.image_url || "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=300&h=200&fit=crop"}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>
                {product.is_new && (
                  <Badge className="absolute top-3 left-3 bg-green-500">New</Badge>
                )}
                {product.is_sale && (
                  <Badge className="absolute top-3 right-3 bg-red-500">Sale</Badge>
                )}
                {!product.in_stock && (
                  <Badge className="absolute top-3 left-1/2 transform -translate-x-1/2 bg-gray-500">
                    Out of Stock
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="mb-2">
                <Badge variant="outline" className="text-xs">
                  {product.category}
                </Badge>
              </div>
              <CardTitle className="text-lg mb-2 line-clamp-2">
                <Link to={`/product/${product.id}`} className="hover:text-orange-500">
                  {product.name}
                </Link>
              </CardTitle>
              <CardDescription className="mb-3 line-clamp-2">
                {product.description}
              </CardDescription>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-orange-500">
                    {formatPrice(product.price)}
                  </span>
                  {product.original_price && (
                    <span className="text-sm text-gray-500 line-through">
                      {formatPrice(product.original_price)}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-gray-600">{product.rating || 4.5}</span>
                </div>
              </div>
              <Button 
                onClick={() => handleAddToCart(product)}
                className="w-full bg-orange-500 hover:bg-orange-600"
                disabled={!product.in_stock}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                {product.in_stock ? 'Add to Cart' : 'Out of Stock'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <div className="w-32 h-32 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <Search className="w-16 h-16 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600 mb-6">Try adjusting your search terms or filters</p>
          <Button 
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("all");
            }}
            variant="outline"
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default Store;
