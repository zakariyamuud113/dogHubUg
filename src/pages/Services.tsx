import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dog, ShoppingCart, MapPin, Star, Phone, Calendar, Filter, Search, Stethoscope, Scissors, User, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

const Services = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Services" },
    { id: "veterinary", name: "Veterinary" },
    { id: "training", name: "Dog Training" },
    { id: "grooming", name: "Grooming" },
    { id: "pet-sitting", name: "Pet Sitting" },
    { id: "dog-walking", name: "Dog Walking" },
  ];

  const services = [
    {
      id: 1,
      name: "Wellness Exam",
      category: "veterinary",
      price: 75.00,
      rating: 4.7,
      reviews: 62,
      image: "https://images.unsplash.com/photo-1588943211345-c4c4164609d6?w=400&h=400&fit=crop",
      description: "A comprehensive check-up to ensure your dog's optimal health.",
      contact: "+1 (555) 123-4567",
      location: "123 Main St, Anytown",
      availability: "Mon-Fri, 9am-5pm",
      isFeatured: true,
    },
    {
      id: 2,
      name: "Basic Obedience Training",
      category: "training",
      price: 120.00,
      rating: 4.9,
      reviews: 145,
      image: "https://images.unsplash.com/photo-1537151608828-ea2b2a5770c3?w=400&h=400&fit=crop",
      description: "Teach your dog essential commands and improve their behavior.",
      contact: "+1 (555) 234-5678",
      location: "456 Elm St, Anytown",
      availability: "Sat-Sun, 10am-2pm",
      isFeatured: false,
    },
    {
      id: 3,
      name: "Full Grooming Package",
      category: "grooming",
      price: 60.00,
      rating: 4.6,
      reviews: 88,
      image: "https://images.unsplash.com/photo-1562909492-57295e9a7652?w=400&h=400&fit=crop",
      description: "Pamper your dog with a complete grooming session.",
      contact: "+1 (555) 345-6789",
      location: "789 Oak St, Anytown",
      availability: "Tue-Sat, 8am-4pm",
      isFeatured: false,
    },
    {
      id: 4,
      name: "Overnight Pet Sitting",
      category: "pet-sitting",
      price: 40.00,
      rating: 4.8,
      reviews: 112,
      image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=400&fit=crop",
      description: "Ensure your dog is safe and comfortable while you're away.",
      contact: "+1 (555) 456-7890",
      location: "In your home",
      availability: "Flexible",
      isFeatured: false,
    },
    {
      id: 5,
      name: "30-Minute Dog Walk",
      category: "dog-walking",
      price: 20.00,
      rating: 4.5,
      reviews: 75,
      image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=400&h=400&fit=crop",
      description: "Keep your dog active and happy with a brisk walk.",
      contact: "+1 (555) 567-8901",
      location: "Your neighborhood",
      availability: "Mon-Sun, 7am-7pm",
      isFeatured: false,
    },
    {
      id: 6,
      name: "Advanced Agility Training",
      category: "training",
      price: 150.00,
      rating: 4.9,
      reviews: 95,
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=400&fit=crop",
      description: "Challenge your dog with advanced agility courses.",
      contact: "+1 (555) 678-9012",
      location: "123 Training Ln, Anytown",
      availability: "Wed-Fri, 6pm-8pm",
      isFeatured: false,
    },
    {
      id: 7,
      name: "Teeth Cleaning",
      category: "veterinary",
      price: 85.00,
      rating: 4.7,
      reviews: 54,
      image: "https://images.unsplash.com/photo-1568558558379-389759122996?w=400&h=400&fit=crop",
      description: "Maintain your dog's dental health with professional teeth cleaning.",
      contact: "+1 (555) 789-0123",
      location: "456 Vet Ave, Anytown",
      availability: "Mon-Sat, 10am-6pm",
      isFeatured: false,
    },
    {
      id: 8,
      name: "Deluxe Grooming & Spa Day",
      category: "grooming",
      price: 90.00,
      rating: 4.8,
      reviews: 70,
      image: "https://images.unsplash.com/photo-1591604029355-4919191c47fa?w=400&h=400&fit=crop",
      description: "Treat your dog to a luxurious grooming and spa experience.",
      contact: "+1 (555) 890-1234",
      location: "789 Spa Rd, Anytown",
      availability: "Thu-Sun, 9am-5pm",
      isFeatured: false,
    },
    {
      id: 9,
      name: "Extended Pet Sitting",
      category: "pet-sitting",
      price: 60.00,
      rating: 4.9,
      reviews: 102,
      image: "https://images.unsplash.com/photo-1598550879261-2277c6760915?w=400&h=400&fit=crop",
      description: "Provide your dog with attentive care for longer periods.",
      contact: "+1 (555) 901-2345",
      location: "In your home",
      availability: "Flexible",
      isFeatured: false,
    },
    {
      id: 10,
      name: "Group Dog Walking",
      category: "dog-walking",
      price: 15.00,
      rating: 4.6,
      reviews: 68,
      image: "https://images.unsplash.com/photo-1560807707-8cc756ef73c1?w=400&h=400&fit=crop",
      description: "Let your dog socialize and exercise with other dogs.",
      contact: "+1 (555) 012-3456",
      location: "Local parks",
      availability: "Mon-Fri, 10am-12pm",
      isFeatured: false,
    },
    {
      id: 11,
      name: "Emergency Veterinary Care",
      category: "veterinary",
      price: 150.00,
      rating: 4.5,
      reviews: 42,
      image: "https://images.unsplash.com/photo-1576763159395-a9ca8141f1ca?w=400&h=400&fit=crop",
      description: "Get immediate veterinary attention for your dog in critical situations.",
      contact: "+1 (555) 123-4567",
      location: "123 Main St, Anytown",
      availability: "24/7",
      isFeatured: false,
    },
    {
      id: 12,
      name: "Behavioral Training",
      category: "training",
      price: 180.00,
      rating: 4.7,
      reviews: 80,
      image: "https://images.unsplash.com/photo-1591604029355-4919191c47fa?w=400&h=400&fit=crop",
      description: "Address specific behavioral issues with expert training techniques.",
      contact: "+1 (555) 234-5678",
      location: "456 Elm St, Anytown",
      availability: "Sat-Sun, 2pm-4pm",
      isFeatured: false,
    },
  ];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
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
              <Link to="/store" className="text-gray-700 hover:text-orange-500 transition-colors">Store</Link>
              <Link to="/marketplace" className="text-gray-700 hover:text-orange-500 transition-colors">Marketplace</Link>
              <Link to="/services" className="text-blue-500 font-semibold">Services</Link>
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
          <h2 className="text-4xl font-bold mb-4">Professional Dog Services</h2>
          <p className="text-xl opacity-90">Find the best care for your furry friend</p>
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
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800">
              {filteredServices.length} Services Found
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredServices.map((service) => (
              <Card key={service.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative">
                  <div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Featured Badge */}
                  {service.isFeatured && (
                    <Badge className="absolute top-2 left-2 bg-blue-500 hover:bg-blue-600">Featured</Badge>
                  )}

                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white p-2"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>

                <CardContent className="p-4">
                  <h4 className="font-semibold text-lg mb-2 line-clamp-2">{service.name}</h4>

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

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-orange-600">
                        ${service.price}
                      </span>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600 mb-2 line-clamp-3">{service.description}</div>

                  <div className="flex items-center gap-2 text-gray-500 mb-2">
                    <MapPin className="h-4 w-4" />
                    {service.location}
                  </div>

                  <div className="flex items-center gap-2 text-gray-500 mb-2">
                    <Calendar className="h-4 w-4" />
                    {service.availability}
                  </div>

                  <div className="flex items-center gap-2 text-gray-500 mb-4">
                    <Phone className="h-4 w-4" />
                    {service.contact}
                  </div>

                  <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-12">
              <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No services found</h3>
              <p className="text-gray-500">Try adjusting your search filters</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
