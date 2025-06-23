
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dog, ShoppingCart, Heart, Star, MapPin, Calendar, Users, Package, Stethoscope } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useProducts } from "@/hooks/useProducts";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { DonateForm } from "@/components/DonateForm";

type Service = Tables<'services'>;

const Index = () => {
  const { data: products = [], isLoading: productsLoading } = useProducts();
  const [services, setServices] = useState<Service[]>([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [showDonateForm, setShowDonateForm] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .eq('is_active', true)
          .limit(3);

        if (error) throw error;
        setServices(data || []);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setServicesLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Get featured products (first 6 products)
  const featuredProducts = products.slice(0, 6);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 px-4 text-center bg-gradient-to-r from-orange-500 to-blue-600 text-white">
        <div className="container mx-auto">
          <div className="flex justify-center mb-6">
            <Dog className="h-16 w-16" />
          </div>
          <h2 className="text-5xl font-bold mb-6">Welcome to DOGHub</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Your one-stop destination for everything your furry friend needs. From premium products to expert services, we've got your dog covered.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-orange-500 hover:bg-gray-100">
              <Link to="/store">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Shop Now
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-500">
              <Link to="/services">
                <Heart className="h-5 w-5 mr-2" />
                Book Services
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-red-500"
              onClick={() => setShowDonateForm(true)}
            >
              <Heart className="h-5 w-5 mr-2" />
              Donate Now
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Featured Products</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our most popular products, carefully selected for your dog's health and happiness.
            </p>
          </div>
          
          {productsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="aspect-square bg-gray-200 rounded-t-lg"></div>
                  <CardContent className="p-4">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <Link key={product.id} to={`/product/${product.id}`}>
                  <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer">
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
                            <Dog className="h-16 w-16 text-orange-400" />
                          </div>
                        )}
                      </div>
                      {product.is_sale && (
                        <div className="absolute top-2 left-2">
                          <Badge className="bg-red-500 hover:bg-red-600">Sale</Badge>
                        </div>
                      )}
                      {product.is_new && (
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-green-500 hover:bg-green-600">New</Badge>
                        </div>
                      )}
                    </div>

                    <CardContent className="p-4">
                      <CardHeader className="p-0 pb-2">
                        <CardTitle className="line-clamp-2 group-hover:text-orange-500 transition-colors">
                          {product.name}
                        </CardTitle>
                      </CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-orange-500">
                            ${product.price}
                          </span>
                          {product.original_price && product.original_price > product.price && (
                            <span className="text-sm text-gray-500 line-through">
                              ${product.original_price}
                            </span>
                          )}
                        </div>
                        {product.rating && product.rating > 0 && (
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                          </div>
                        )}
                      </div>
                      <Badge variant="secondary" className="mb-2">
                        {product.category}
                      </Badge>
                      {product.description && (
                        <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-8">
            <Button asChild size="lg">
              <Link to="/store">
                View All Products
                <ShoppingCart className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Our Services</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Professional care and services to keep your dog healthy, happy, and well-groomed.
            </p>
          </div>
          
          {servicesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="aspect-video bg-gray-200 rounded-t-lg"></div>
                  <CardContent className="p-6">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service) => (
                <Card key={service.id} className="hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-orange-100 rounded-t-lg flex items-center justify-center">
                    {service.image_url ? (
                      <img
                        src={service.image_url}
                        alt={service.title}
                        className="w-full h-full object-cover rounded-t-lg"
                      />
                    ) : (
                      <Stethoscope className="h-16 w-16 text-blue-500" />
                    )}
                  </div>
                  <CardContent className="p-6">
                    <CardHeader className="p-0 pb-4">
                      <CardTitle>{service.title}</CardTitle>
                    </CardHeader>
                    <p className="text-gray-600 mb-4 line-clamp-3">{service.description}</p>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        <Badge variant="secondary">{service.category}</Badge>
                      </div>
                      {service.price && (
                        <span className="text-lg font-bold text-blue-500">
                          ${service.price}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="text-center mt-8">
            <Button asChild size="lg" className="bg-blue-500 hover:bg-blue-600">
              <Link to="/services">
                View All Services
                <Stethoscope className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-orange-500 to-blue-600 text-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <Users className="h-12 w-12 mx-auto mb-4" />
              <h4 className="text-3xl font-bold mb-2">10,000+</h4>
              <p className="opacity-90">Happy Dog Parents</p>
            </div>
            <div>
              <Package className="h-12 w-12 mx-auto mb-4" />
              <h4 className="text-3xl font-bold mb-2">500+</h4>
              <p className="opacity-90">Premium Products</p>
            </div>
            <div>
              <Stethoscope className="h-12 w-12 mx-auto mb-4" />
              <h4 className="text-3xl font-bold mb-2">50+</h4>
              <p className="opacity-90">Expert Services</p>
            </div>
            <div>
              <Heart className="h-12 w-12 mx-auto mb-4" />
              <h4 className="text-3xl font-bold mb-2">99%</h4>
              <p className="opacity-90">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold text-gray-800 mb-4">Join the DOGHub Community</h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with other dog lovers, share experiences, and get expert advice for your furry friend.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/marketplace">
                <MapPin className="h-5 w-5 mr-2" />
                Explore Marketplace
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/blog">
                <Calendar className="h-5 w-5 mr-2" />
                Read Our Blog
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {showDonateForm && <DonateForm onClose={() => setShowDonateForm(false)} />}
      <Footer />
    </div>
  );
};

export default Index;
