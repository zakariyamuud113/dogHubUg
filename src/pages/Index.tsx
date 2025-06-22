import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Search, MapPin, ShoppingCart, Users, BookOpen, Gift, Star, Phone, Calendar, Dog } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const Index = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const featuredProducts = [
    { 
      id: 1, 
      name: "Premium Leather Collar", 
      price: 29.99, 
      image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=400&fit=crop", 
      category: "Accessories" 
    },
    { 
      id: 2, 
      name: "Organic Chicken Treats", 
      price: 15.99, 
      image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400&h=400&fit=crop", 
      category: "Food" 
    },
    { 
      id: 3, 
      name: "Luxury Dog Bed", 
      price: 89.99, 
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=400&fit=crop", 
      category: "Accessories" 
    },
    { 
      id: 4, 
      name: "Training Harness", 
      price: 34.99, 
      image: "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=400&h=400&fit=crop", 
      category: "Accessories" 
    },
  ];

  const featuredDogs = [
    { 
      id: 1, 
      name: "Buddy", 
      breed: "Golden Retriever", 
      age: "2 years", 
      location: "New York", 
      price: 800, 
      image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=400&fit=crop" 
    },
    { 
      id: 2, 
      name: "Luna", 
      breed: "Husky", 
      age: "6 months", 
      location: "California", 
      price: 1200, 
      image: "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=400&h=400&fit=crop" 
    },
    { 
      id: 3, 
      name: "Max", 
      breed: "German Shepherd", 
      age: "1 year", 
      location: "Texas", 
      price: 950, 
      image: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=400&h=400&fit=crop" 
    },
  ];

  const services = [
    { icon: <Phone className="h-6 w-6" />, title: "Veterinarians", count: "150+ Near You", color: "bg-blue-100 text-blue-600" },
    { icon: <Users className="h-6 w-6" />, title: "Dog Trainers", count: "80+ Certified", color: "bg-green-100 text-green-600" },
    { icon: <Heart className="h-6 w-6" />, title: "Pet Sitters", count: "200+ Available", color: "bg-pink-100 text-pink-600" },
    { icon: <Dog className="h-6 w-6" />, title: "Groomers", count: "120+ Professionals", color: "bg-purple-100 text-purple-600" },
  ];

  const blogPosts = [
    { title: "Complete Guide to Puppy Training", excerpt: "Essential tips for training your new puppy...", date: "Dec 20, 2024" },
    { title: "Best Dog Foods for Senior Dogs", excerpt: "Nutritional needs change as dogs age...", date: "Dec 18, 2024" },
    { title: "Grooming Tips for Long-Haired Breeds", excerpt: "Keep your furry friend looking their best...", date: "Dec 15, 2024" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Dog className="h-8 w-8 text-orange-500" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">
                DOGHub
              </h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/store" className="text-gray-700 hover:text-orange-500 transition-colors">Store</Link>
              <Link to="/marketplace" className="text-gray-700 hover:text-orange-500 transition-colors">Marketplace</Link>
              <Link to="/services" className="text-gray-700 hover:text-orange-500 transition-colors">Services</Link>
              <Link to="/blog" className="text-gray-700 hover:text-orange-500 transition-colors">Blog</Link>
              <Link to="/lost-found" className="text-gray-700 hover:text-orange-500 transition-colors">Lost & Found</Link>
              <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Cart
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-500 via-pink-500 to-blue-600 bg-clip-text text-transparent">
            Everything Your Dog Needs
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            From premium accessories and nutritious food to finding the perfect companion and essential services - 
            your one-stop platform for comprehensive dog care.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-8">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search products, dogs, services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <Button size="lg" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 h-12 px-8">
              Search
            </Button>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => navigate('/store')}
              className="hover:bg-orange-50 hover:border-orange-200"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Shop Now
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/marketplace')}
              className="hover:bg-blue-50 hover:border-blue-200"
            >
              <Heart className="h-5 w-5 mr-2" />
              Find a Dog
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/services')}
              className="hover:bg-green-50 hover:border-green-200"
            >
              <MapPin className="h-5 w-5 mr-2" />
              Find Services
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Featured Products</h3>
            <p className="text-gray-600">Premium accessories and nutritious food for your beloved companion</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <CardContent className="p-4">
                  <Badge variant="secondary" className="mb-2">{product.category}</Badge>
                  <h4 className="font-semibold text-gray-800 mb-2">{product.name}</h4>
                  <p className="text-2xl font-bold text-orange-500">${product.price}</p>
                  <Button className="w-full mt-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/store')}
              className="hover:bg-orange-50 hover:border-orange-200"
            >
              View All Products
            </Button>
          </div>
        </div>
      </section>

      {/* Dog Marketplace */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Find Your Perfect Companion</h3>
            <p className="text-gray-600">Browse our marketplace of loving dogs looking for their forever homes</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredDogs.map((dog) => (
              <Card key={dog.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
                  <img src={dog.image} alt={dog.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-lg text-gray-800">{dog.name}</h4>
                    <Badge className="bg-green-100 text-green-800">{dog.age}</Badge>
                  </div>
                  <p className="text-gray-600 mb-1">{dog.breed}</p>
                  <div className="flex items-center text-gray-500 mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{dog.location}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-blue-600">${dog.price}</span>
                    <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                      Contact
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/marketplace')}
              className="hover:bg-blue-50 hover:border-blue-200"
            >
              Browse All Dogs
            </Button>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Local Pet Services</h3>
            <p className="text-gray-600">Find trusted professionals in your area</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${service.color} mb-4`}>
                    {service.icon}
                  </div>
                  <h4 className="font-semibold text-lg text-gray-800 mb-2">{service.title}</h4>
                  <p className="text-gray-600 mb-4">{service.count}</p>
                  <Button variant="outline" className="w-full">
                    Find Near Me
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-green-50 to-teal-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Dog Care Tips & Guides</h3>
            <p className="text-gray-600">Expert advice for keeping your furry friend happy and healthy</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.map((post, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-3">
                    <BookOpen className="h-5 w-5 text-green-600 mr-2" />
                    <span className="text-sm text-gray-500">{post.date}</span>
                  </div>
                  <h4 className="font-semibold text-lg text-gray-800 mb-3">{post.title}</h4>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <Button variant="outline" className="hover:bg-green-50 hover:border-green-200">
                    Read More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/blog')}
              className="hover:bg-green-50 hover:border-green-200"
            >
              View All Articles
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-r from-orange-500 to-pink-600 text-white">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">Support Dog Welfare</h3>
          <p className="text-xl mb-8 opacity-90">Help us make a difference in the lives of dogs in need</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              variant="secondary"
              className="bg-white text-orange-600 hover:bg-gray-100"
            >
              <Gift className="h-5 w-5 mr-2" />
              Donate Now
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-orange-600"
              onClick={() => navigate('/lost-found')}
            >
              <Heart className="h-5 w-5 mr-2" />
              Adopt a Dog
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Dog className="h-6 w-6 text-orange-500" />
                <h4 className="text-xl font-bold">DOGHub</h4>
              </div>
              <p className="text-gray-400 mb-4">Your comprehensive platform for everything dog-related.</p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <Heart className="h-4 w-4" />
                </div>
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <Users className="h-4 w-4" />
                </div>
              </div>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Shop</h5>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/store" className="hover:text-white transition-colors">Accessories</Link></li>
                <li><Link to="/store" className="hover:text-white transition-colors">Dog Food</Link></li>
                <li><Link to="/store" className="hover:text-white transition-colors">Toys</Link></li>
                <li><Link to="/store" className="hover:text-white transition-colors">Grooming</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Services</h5>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/services" className="hover:text-white transition-colors">Veterinarians</Link></li>
                <li><Link to="/services" className="hover:text-white transition-colors">Dog Trainers</Link></li>
                <li><Link to="/services" className="hover:text-white transition-colors">Pet Sitters</Link></li>
                <li><Link to="/services" className="hover:text-white transition-colors">Groomers</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Community</h5>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link to="/lost-found" className="hover:text-white transition-colors">Lost & Found</Link></li>
                <li><Link to="/marketplace" className="hover:text-white transition-colors">Adoption</Link></li>
                <li><Link to="/donate" className="hover:text-white transition-colors">Donate</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 DOGHub. All rights reserved. Made with ❤️ for dog lovers everywhere.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
