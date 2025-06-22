
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dog, ShoppingCart, Heart, Star, ArrowLeft, Plus, Minus } from "lucide-react";
import Footer from "@/components/Footer";

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Sample product data - in real app this would come from API/database
  const product = {
    id: parseInt(id || "1"),
    name: "Premium Leather Collar",
    price: 29.99,
    originalPrice: 39.99,
    rating: 4.8,
    reviews: 124,
    images: [
      "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1548247416-ec6613f930c4?w=600&h=600&fit=crop"
    ],
    category: "Accessories",
    inStock: true,
    stockCount: 15,
    description: "This premium leather collar is handcrafted from genuine leather and features durable hardware. Perfect for medium to large dogs, it combines style with comfort for your furry friend.",
    features: [
      "Genuine leather construction",
      "Adjustable sizing from 14-20 inches",
      "Rust-resistant hardware",
      "Comfortable padding",
      "Easy-clean surface"
    ],
    specifications: {
      "Material": "Genuine Leather",
      "Size Range": "14-20 inches",
      "Width": "1 inch",
      "Weight": "4 oz",
      "Color": "Brown"
    }
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stockCount) {
      setQuantity(newQuantity);
    }
  };

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

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Link to="/" className="hover:text-orange-500">Home</Link>
          <span>/</span>
          <Link to="/store" className="hover:text-orange-500">Store</Link>
          <span>/</span>
          <span className="text-gray-800">{product.name}</span>
        </div>
        <Button
          variant="ghost"
          asChild
          className="mt-2 p-0 h-auto text-orange-500 hover:text-orange-600"
        >
          <Link to="/store">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Store
          </Link>
        </Button>
      </div>

      {/* Product Details */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? "border-orange-500" : "border-transparent"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge className="mb-2">{product.category}</Badge>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600 ml-2">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-orange-600">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-600">{product.description}</p>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Features</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium">Quantity:</span>
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 border-x">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stockCount}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <span className="text-sm text-gray-500">
                  {product.stockCount} in stock
                </span>
              </div>

              <div className="flex space-x-4">
                <Button
                  className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="icon">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Stock Status */}
            {product.inStock ? (
              <div className="text-green-600 text-sm">✓ In Stock</div>
            ) : (
              <div className="text-red-600 text-sm">✗ Out of Stock</div>
            )}
          </div>
        </div>

        {/* Product Specifications */}
        <Card className="mt-12">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between border-b pb-2">
                  <span className="font-medium">{key}:</span>
                  <span className="text-gray-600">{value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
