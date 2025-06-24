
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dog, Heart, ShoppingCart, Star, Users, Package, Stethoscope, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DonateForm from "@/components/DonateForm";
import BookingForm from "@/components/BookingForm";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

type Product = Tables<'products'>;

const Index = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('in_stock', true)
          .order('created_at', { ascending: false })
          .limit(3);

        if (error) throw error;
        setFeaturedProducts(data || []);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  const handleFindDogClick = () => {
    navigate('/lost-found');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-r from-orange-500 to-blue-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto text-center relative z-10">
          <Dog className="h-16 w-16 mx-auto mb-6 animate-bounce" />
          <h1 className="text-5xl font-bold mb-6">
            Your One-Stop <span className="text-yellow-300">DOG</span> Hub
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Everything you need for your furry best friend - from premium products to professional services, 
            all in one place with love and care.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/store">
              <Button 
                size="lg" 
                className="bg-white text-orange-600 hover:bg-gray-100 font-semibold px-8 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Shop Now
              </Button>
            </Link>
            <BookingForm
              itemName="Dog Services"
              itemType="service"
              buttonText="Book Service"
              buttonClassName="bg-yellow-500 text-gray-900 hover:bg-yellow-400 font-semibold px-8 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 text-lg"
            />
            <Button 
              size="lg" 
              onClick={handleFindDogClick}
              className="bg-green-600 hover:bg-green-700 font-semibold px-8 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <Search className="h-5 w-5 mr-2" />
              Find a Dog
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow">
              <Users className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-gray-800 mb-2">10,000+</h3>
              <p className="text-gray-600">Happy Dog Owners</p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow">
              <Package className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-gray-800 mb-2">500+</h3>
              <p className="text-gray-600">Premium Products</p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow">
              <Stethoscope className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-gray-800 mb-2">50+</h3>
              <p className="text-gray-600">Professional Services</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Featured Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our top-rated products loved by dogs and their owners
            </p>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <Card 
                  key={product.id} 
                  className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                  onClick={() => handleProductClick(product.id)}
                >
                  <div className="relative">
                    <div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-orange-100 to-blue-100 flex items-center justify-center">
                          <Dog className="h-12 w-12 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="absolute top-2 left-2 flex gap-1">
                      {product.is_new && (
                        <Badge className="bg-green-500 hover:bg-green-600">New</Badge>
                      )}
                      {product.is_sale && (
                        <Badge className="bg-red-500 hover:bg-red-600">Sale</Badge>
                      )}
                    </div>
                  </div>

                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="line-clamp-2">{product.name}</CardTitle>
                      {product.rating && product.rating > 0 && (
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                        </div>
                      )}
                    </div>
                    {product.description && (
                      <CardDescription className="line-clamp-2">
                        {product.description}
                      </CardDescription>
                    )}
                  </CardHeader>

                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-orange-600">
                          ${product.price}
                        </span>
                        {product.original_price && product.original_price > product.price && (
                          <span className="text-gray-500 line-through">
                            ${product.original_price}
                          </span>
                        )}
                      </div>
                      <Badge variant={product.in_stock ? "default" : "secondary"}>
                        {product.in_stock ? "In Stock" : "Out of Stock"}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link to="/store">
              <Button size="lg" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Professional Dog Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Expert care and services for your beloved companion
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow text-center">
              <Stethoscope className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-800 mb-2">Veterinary Care</h3>
              <p className="text-gray-600 text-sm">Professional health checkups and treatments</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow text-center">
              <Users className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-800 mb-2">Dog Training</h3>
              <p className="text-gray-600 text-sm">Expert training for obedience and behavior</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow text-center">
              <Heart className="h-12 w-12 text-pink-500 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-800 mb-2">Grooming</h3>
              <p className="text-gray-600 text-sm">Professional grooming and spa services</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow text-center">
              <Dog className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-800 mb-2">Pet Sitting</h3>
              <p className="text-gray-600 text-sm">Reliable care when you're away</p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/services">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                Explore Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Donation Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white">
        <div className="container mx-auto text-center">
          <Heart className="h-16 w-16 mx-auto mb-6 animate-pulse" />
          <h2 className="text-3xl font-bold mb-6">Help Dogs in Need</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Your donation helps us rescue, care for, and find loving homes for dogs in need. 
            Every contribution makes a difference in a dog's life.
          </p>
          <DonateForm />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
