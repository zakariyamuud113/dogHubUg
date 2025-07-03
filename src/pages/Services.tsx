
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, MapPin, Star, Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";

const Services = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Mock services data - in a real app, this would come from your database
  const services = [
    {
      id: 1,
      title: "Professional Dog Grooming",
      description: "Complete grooming service including bath, haircut, nail trimming, and ear cleaning",
      category: "Grooming",
      price: 75000,
      duration: 120,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=300&h=200&fit=crop",
      available: true
    },
    {
      id: 2,
      title: "Veterinary Health Checkup",
      description: "Comprehensive health examination by certified veterinarians",
      category: "Healthcare",
      price: 120000,
      duration: 60,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=300&h=200&fit=crop",
      available: true
    },
    {
      id: 3,
      title: "Dog Training Sessions",
      description: "Basic obedience training and behavioral correction",
      category: "Training",
      price: 95000,
      duration: 90,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=300&h=200&fit=crop",
      available: true
    },
    {
      id: 4,
      title: "Pet Boarding",
      description: "Safe and comfortable overnight care for your pets",
      category: "Boarding",
      price: 50000,
      duration: 1440, // 24 hours
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300&h=200&fit=crop",
      available: true
    },
    {
      id: 5,
      title: "Dog Walking Service",
      description: "Daily exercise and outdoor activities for your dog",
      category: "Exercise",
      price: 25000,
      duration: 60,
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=300&h=200&fit=crop",
      available: true
    },
    {
      id: 6,
      title: "Pet Photography",
      description: "Professional photo sessions to capture precious moments",
      category: "Photography",
      price: 150000,
      duration: 120,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=300&h=200&fit=crop",
      available: false
    }
  ];

  const categories = ["Grooming", "Healthcare", "Training", "Boarding", "Exercise", "Photography"];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatPrice = (price: number) => {
    return `UGX ${price.toLocaleString()}`;
  };

  const formatDuration = (minutes: number) => {
    if (minutes >= 1440) {
      return `${Math.floor(minutes / 1440)} day${Math.floor(minutes / 1440) > 1 ? 's' : ''}`;
    }
    if (minutes >= 60) {
      return `${Math.floor(minutes / 60)} hour${Math.floor(minutes / 60) > 1 ? 's' : ''}`;
    }
    return `${minutes} minutes`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Professional pet care services delivered by certified experts who love animals as much as you do
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search services..."
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
          <div className="text-sm text-gray-600 flex items-center">
            Showing {filteredServices.length} services
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <Card key={service.id} className="group hover:shadow-lg transition-shadow">
            <CardHeader className="p-0">
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge 
                  className={`absolute top-3 right-3 ${
                    service.available ? 'bg-green-500' : 'bg-gray-500'
                  }`}
                >
                  {service.available ? 'Available' : 'Unavailable'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="mb-2">
                <Badge variant="outline" className="text-xs">
                  {service.category}
                </Badge>
              </div>
              <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
              <CardDescription className="mb-4">{service.description}</CardDescription>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{formatDuration(service.duration)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-gray-600">{service.rating}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>Available at our center</span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-orange-500">
                  {formatPrice(service.price)}
                </span>
              </div>

              <Button 
                asChild
                className={`w-full ${
                  service.available 
                    ? 'bg-orange-500 hover:bg-orange-600' 
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
                disabled={!service.available}
              >
                <Link to={service.available ? `/book-service/${service.id}` : '#'}>
                  <Calendar className="w-4 h-4 mr-2" />
                  {service.available ? 'Book Now' : 'Unavailable'}
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="text-center py-12">
          <div className="w-32 h-32 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <Search className="w-16 h-16 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No services found</h3>
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

      {/* CTA Section */}
      <div className="mt-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Need a Custom Service?</h2>
        <p className="text-xl mb-6 opacity-90">
          Can't find what you're looking for? We offer customized pet care solutions tailored to your needs.
        </p>
        <Button size="lg" variant="secondary">
          Contact Us
        </Button>
      </div>
    </div>
  );
};

export default Services;
