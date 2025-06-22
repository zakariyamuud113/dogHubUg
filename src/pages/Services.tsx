
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dog, MapPin, Star, Phone, Mail, Clock, DollarSign, Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";

const Services = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedService, setSelectedService] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");

  const serviceTypes = [
    { id: "all", name: "All Services" },
    { id: "veterinary", name: "Veterinary" },
    { id: "grooming", name: "Grooming" },
    { id: "training", name: "Training" },
    { id: "walking", name: "Dog Walking" },
    { id: "sitting", name: "Pet Sitting" },
    { id: "boarding", name: "Boarding" },
  ];

  const locations = [
    { id: "all", name: "All Locations" },
    { id: "new-york", name: "New York" },
    { id: "california", name: "California" },
    { id: "texas", name: "Texas" },
    { id: "florida", name: "Florida" },
    { id: "illinois", name: "Illinois" },
  ];

  const services = [
    {
      id: 1,
      name: "Happy Paws Veterinary Clinic",
      type: "veterinary",
      location: "New York",
      rating: 4.9,
      reviews: 245,
      price: "$50-150",
      image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=400&h=400&fit=crop",
      description: "Full-service veterinary clinic with emergency care available 24/7.",
      services: ["Check-ups", "Surgery", "Emergency Care", "Vaccinations"],
      hours: "24/7",
      contact: { phone: "(555) 123-4567", email: "info@happypawsvet.com" },
      verified: true
    },
    {
      id: 2,
      name: "Pampered Paws Grooming",
      type: "grooming",
      location: "California",
      rating: 4.8,
      reviews: 189,
      price: "$30-80",
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=400&fit=crop",
      description: "Professional grooming services with organic products and gentle care.",
      services: ["Full Grooming", "Nail Trimming", "Teeth Cleaning", "Spa Treatments"],
      hours: "Mon-Sat 8AM-6PM",
      contact: { phone: "(555) 987-6543", email: "book@pamperedpaws.com" },
      verified: true
    },
    {
      id: 3,
      name: "Elite Dog Training Academy",
      type: "training",
      location: "Texas",
      rating: 4.7,
      reviews: 156,
      price: "$40-100",
      image: "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=400&h=400&fit=crop",
      description: "Expert dog training with positive reinforcement methods for all ages.",
      services: ["Puppy Training", "Obedience", "Behavioral Issues", "Agility"],
      hours: "Mon-Fri 9AM-7PM",
      contact: { phone: "(555) 456-7890", email: "train@elitedogs.com" },
      verified: true
    },
    {
      id: 4,
      name: "City Dog Walkers",
      type: "walking",
      location: "New York",
      rating: 4.6,
      reviews: 324,
      price: "$20-35",
      image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=400&fit=crop",
      description: "Reliable dog walking services with GPS tracking and photo updates.",
      services: ["Daily Walks", "Group Walks", "Pet Sitting", "Emergency Visits"],
      hours: "7AM-8PM Daily",
      contact: { phone: "(555) 321-0987", email: "walk@citydogs.com" },
      verified: false
    },
    {
      id: 5,
      name: "Loving Care Pet Sitting",
      type: "sitting",
      location: "Florida",
      rating: 4.9,
      reviews: 134,
      price: "$25-50",
      image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=400&fit=crop",
      description: "Professional pet sitting in your home with overnight care available.",
      services: ["In-Home Sitting", "Overnight Care", "Pet Taxi", "Daily Updates"],
      hours: "Available 24/7",
      contact: { phone: "(555) 654-3210", email: "care@lovingpets.com" },
      verified: true
    },
    {
      id: 6,
      name: "Cozy Paws Boarding",
      type: "boarding",
      location: "Illinois",
      rating: 4.5,
      reviews: 98,
      price: "$35-60",
      image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&h=400&fit=crop",
      description: "Home-like boarding facility with large play areas and personalized care.",
      services: ["Day Boarding", "Overnight Boarding", "Playtime", "Special Diets"],
      hours: "Mon-Sun 7AM-7PM",
      contact: { phone: "(555) 789-0123", email: "stay@cozypaws.com" },
      verified: true
    }
  ];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesService = selectedService === "all" || service.type === selectedService;
    const matchesLocation = selectedLocation === "all" || service.location.toLowerCase().replace(' ', '-') === selectedLocation;
    
    return matchesSearch && matchesService && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
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
              <Link to="/services" className="text-blue-500 font-semibold">Services</Link>
              <Link to="/blog" className="text-gray-700 hover:text-orange-500 transition-colors">Blog</Link>
              <Link to="/lost-found" className="text-gray-700 hover:text-orange-500 transition-colors">Lost & Found</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-green-500 to-blue-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Professional Dog Services</h2>
          <p className="text-xl opacity-90">Find trusted professionals for all your dog's needs</p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 px-4 bg-white border-b">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-4">
              <Select value={selectedService} onValueChange={setSelectedService}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Service Type" />
                </SelectTrigger>
                <SelectContent>
                  {serviceTypes.map((service) => (
                    <SelectItem key={service.id} value={service.id}>
                      {service.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="w-48">
                  <MapPin className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location.id} value={location.id}>
                      {location.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800">
              {filteredServices.length} Services Available
            </h3>
            <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
              List Your Service
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <Card key={service.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative">
                  <div className="aspect-video bg-gray-100 rounded-t-lg overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                  </div>
                  {service.verified && (
                    <Badge className="absolute top-2 left-2 bg-green-500 hover:bg-green-600">
                      Verified
                    </Badge>
                  )}
                </div>
                
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg mb-1">{service.name}</CardTitle>
                      <div className="flex items-center mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(service.rating)
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500 ml-2">
                          {service.rating} ({service.reviews})
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-green-600 font-semibold">
                        <DollarSign className="h-4 w-4" />
                        <span>{service.price}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="flex items-center text-gray-500 mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{service.location}</span>
                    <Clock className="h-4 w-4 ml-4 mr-1" />
                    <span className="text-sm">{service.hours}</span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4">
                    {service.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {service.services.slice(0, 3).map((serviceItem, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {serviceItem}
                      </Badge>
                    ))}
                    {service.services.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{service.services.length - 3} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-12">
              <Dog className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No services found</h3>
              <p className="text-gray-500">Try adjusting your search filters</p>
            </div>
          )}
        </div>
      </section>
    </div>
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
  );
};

export default Services;
