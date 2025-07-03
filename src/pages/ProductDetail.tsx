
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useProduct } from "@/hooks/useProducts";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Star, Plus, Minus, Heart, Share2, Truck, Shield, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, error } = useProduct(id!);
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product.id, quantity);
      toast({
        title: "Added to cart",
        description: `${quantity} ${product.name}(s) added to your cart.`,
      });
    }
  };

  const formatPrice = (price: number) => {
    return `UGX ${price.toLocaleString()}`;
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-200 h-96 rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h1>
          <p className="text-gray-600">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="space-y-4">
          <div className="relative">
            <img
              src={product.image_url || "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=600&fit=crop"}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg"
            />
            {product.is_new && (
              <Badge className="absolute top-4 left-4 bg-green-500">New</Badge>
            )}
            {product.is_sale && (
              <Badge className="absolute top-4 right-4 bg-red-500">Sale</Badge>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <Badge variant="outline" className="mb-2">
              {product.category}
            </Badge>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= (product.rating || 4.5)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600">({product.reviews_count || 0} reviews)</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-orange-500">
              {formatPrice(product.price)}
            </span>
            {product.original_price && (
              <span className="text-xl text-gray-500 line-through">
                {formatPrice(product.original_price)}
              </span>
            )}
            {product.is_sale && product.original_price && (
              <Badge className="bg-red-500">
                Save {Math.round(((product.original_price - product.price) / product.original_price) * 100)}%
              </Badge>
            )}
          </div>

          {product.description && (
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-gray-600">{product.description}</p>
            </div>
          )}

          <Separator />

          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="font-semibold">Quantity:</span>
              <div className="flex items-center border rounded-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="px-4 py-2 font-semibold">{quantity}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={quantity >= 10}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={handleAddToCart}
                className="flex-1 bg-orange-500 hover:bg-orange-600"
                disabled={!product.in_stock}
                size="lg"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {product.in_stock ? 'Add to Cart' : 'Out of Stock'}
              </Button>
              <Button variant="outline" size="lg">
                <Heart className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            {!product.in_stock && (
              <p className="text-red-500 font-semibold">This item is currently out of stock</p>
            )}
          </div>

          <Separator />

          {/* Features */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="p-4 text-center">
              <Truck className="w-8 h-8 mx-auto mb-2 text-orange-500" />
              <p className="text-sm font-semibold">Free Delivery</p>
              <p className="text-xs text-gray-600">Orders over UGX 100,000</p>
            </Card>
            <Card className="p-4 text-center">
              <Shield className="w-8 h-8 mx-auto mb-2 text-orange-500" />
              <p className="text-sm font-semibold">Secure Payment</p>
              <p className="text-xs text-gray-600">SSL Protected</p>
            </Card>
            <Card className="p-4 text-center">
              <RotateCcw className="w-8 h-8 mx-auto mb-2 text-orange-500" />
              <p className="text-sm font-semibold">Easy Returns</p>
              <p className="text-xs text-gray-600">30-day policy</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
