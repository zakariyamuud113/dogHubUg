
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dog, ShoppingCart, Minus, Plus, Trash2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Premium Leather Collar",
      price: 29.99,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=400&fit=crop"
    },
    {
      id: 2,
      name: "Organic Chicken Treats",
      price: 15.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400&h=400&fit=crop"
    }
  ]);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems(items => items.filter(item => item.id !== id));
    } else {
      setCartItems(items =>
        items.map(item =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

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
              <Link to="/blog" className="text-gray-700 hover:text-orange-500 transition-colors">Blog</Link>
              <Link to="/lost-found" className="text-gray-700 hover:text-orange-500 transition-colors">Lost & Found</Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-gray-700 hover:text-orange-500">Login</Link>
              <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Cart ({cartItems.length})
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-4 mb-8">
          <Button variant="ghost" asChild>
            <Link to="/store">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Continue Shopping
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Add some products to get started</p>
            <Button asChild className="bg-gradient-to-r from-orange-500 to-orange-600">
              <Link to="/store">Shop Now</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <p className="text-orange-600 font-bold">${item.price}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 0)}
                          className="w-16 text-center"
                          min="0"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping:</span>
                      <span>${shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax:</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total:</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
                    Proceed to Checkout
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
