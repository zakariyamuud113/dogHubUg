
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dog, ShoppingCart, Heart, MapPin, Calendar, Filter, Search, Star } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");

  const categories = [
    { id: "all", name: "All Categories" },
    { id: "breeders", name: "Breeders" },
    { id: "trainers", name: "Trainers" },
    { id: "walkers", name: "Walkers" },
    { id: "groomers", name: "Groomers" },
    { id: "sitters", name: "Sitters" },
    { id: "vets", name: "Veterinarians" },
  ];

  const priceRanges = [
    { id: "all", name: "All Prices" },
    { id: "0-50", name: "$0 - $50" },
    { id: "50-100", name: "$50 - $100" },
    { id: "100-200", name: "$100 - $200" },
    { id: "200+", name: "$200+" },
  ];

  const dogs = [
    {
      id: 1,
      name: "Golden Retriever Puppies",
      category: "breeders",
      location: "Los Angeles, CA",
      price: 1500,
      rating: 4.9,
      reviews: 230,
      image: "https://images.unsplash.com/photo-1537151608828-ea2b2a577c3a?w=400&h=400&fit=crop",
      available: true,
      isFeatured: true,
      description: "Adorable Golden Retriever puppies ready for their forever homes. AKC registered, health guaranteed.",
      contact: "breeder123@email.com"
    },
    {
      id: 2,
      name: "Professional Dog Training",
      category: "trainers",
      location: "New York, NY",
      price: 80,
      rating: 4.7,
      reviews: 150,
      image: "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=400&h=400&fit=crop",
      available: true,
      isFeatured: false,
      description: "Expert dog training services. Basic obedience, behavior modification, and advanced training.",
      contact: "training@email.com"
    },
    {
      id: 3,
      name: "Reliable Dog Walker",
      category: "walkers",
      location: "Chicago, IL",
      price: 25,
      rating: 4.5,
      reviews: 80,
      image: "https://images.unsplash.com/photo-1548247416-ec6613f930c4?w=400&h=400&fit=crop",
      available: true,
      isFeatured: false,
      description: "Daily dog walking services. Exercise, socialization, and potty breaks.",
      contact: "walker456@email.com"
    },
    {
      id: 4,
      name: "Gentle Dog Grooming",
      category: "groomers",
      location: "Houston, TX",
      price: 60,
      rating: 4.8,
      reviews: 190,
      image: "https://images.unsplash.com/photo-1562909492-57295e9a4553?w=400&h=400&fit=crop",
      available: true,
      isFeatured: true,
      description: "Professional dog grooming services. Bathing, haircuts, nail trims, and more.",
      contact: "grooming789@email.com"
    },
    {
      id: 5,
      name: "Caring Dog Sitter",
      category: "sitters",
      location: "Miami, FL",
      price: 40,
      rating: 4.6,
      reviews: 120,
      image: "https://images.unsplash.com/photo-1598515220341-5eb9a53d86c7?w=400&h=400&fit=crop",
      available: true,
      isFeatured: false,
      description: "In-home dog sitting services. Feeding, playtime, and lots of love.",
      contact: "sitter101@email.com"
    },
    {
      id: 6,
      name: "Experienced Veterinarian",
      category: "vets",
      location: "San Francisco, CA",
      price: 120,
      rating: 4.9,
      reviews: 250,
      image: "https://images.unsplash.com/photo-1584401934537-e9ff5498738a?w=400&h=400&fit=crop",
      available: true,
      isFeatured: true,
      description: "Comprehensive veterinary care. Check-ups, vaccinations, and emergency services.",
      contact: "vetcare@email.com"
    },
    {
      id: 7,
      name: "Energetic Dog Walker",
      category: "walkers",
      location: "Seattle, WA",
      price: 30,
      rating: 4.7,
      reviews: 95,
      image: "https://images.unsplash.com/photo-1552973877-49415c15939c?w=400&h=400&fit=crop",
      available: true,
      isFeatured: false,
      description: "Fun and reliable dog walking. Perfect for busy pet parents.",
      contact: "walkies@email.com"
    },
    {
      id: 8,
      name: "Certified Dog Trainer",
      category: "trainers",
      location: "Austin, TX",
      price: 90,
      rating: 4.8,
      reviews: 175,
      image: "https://images.unsplash.com/photo-1560792320-e19732f8a40a?w=400&h=400&fit=crop",
      available: true,
      isFeatured: true,
      description: "Positive reinforcement dog training. Build a strong bond with your dog.",
      contact: "trainright@email.com"
    },
    {
      id: 9,
      name: "Luxury Dog Grooming",
      category: "groomers",
      location: "Denver, CO",
      price: 75,
      rating: 4.6,
      reviews: 110,
      image: "https://images.unsplash.com/photo-1617534443446-039872575593?w=400&h=400&fit=crop",
      available: true,
      isFeatured: false,
      description: "Pamper your pooch with our luxury grooming services.",
      contact: "pamperpups@email.com"
    },
    {
      id: 10,
      name: "Loving Dog Sitter",
      category: "sitters",
      location: "Portland, OR",
      price: 45,
      rating: 4.9,
      reviews: 210,
      image: "https://images.unsplash.com/photo-1558981403-c5d9865a251c?w=400&h=400&fit=crop",
      available: true,
      isFeatured: true,
      description: "Your dog's home away from home. Safe, comfortable, and fun.",
      contact: "doglove@email.com"
    },
    {
      id: 11,
      name: "Top-Rated Veterinarian",
      category: "vets",
      location: "Atlanta, GA",
      price: 130,
      rating: 4.7,
      reviews: 160,
      image: "https://images.unsplash.com/photo-1565464027174-ca3c79a7067e?w=400&h=400&fit=crop",
      available: true,
      isFeatured: false,
      description: "Exceptional veterinary care for your beloved pets.",
      contact: "bestvet@email.com"
    },
    {
      id: 12,
      name: "Playful Dog Walker",
      category: "walkers",
      location: "San Diego, CA",
      price: 35,
      rating: 4.5,
      reviews: 75,
      image: "https://images.unsplash.com/photo-1534361960057-19889db962c8?w=400&h=400&fit=crop",
      available: true,
      isFeatured: false,
      description: "Keep your dog happy and healthy with our playful walking services.",
      contact: "playtime@email.com"
    }
  ];

  const filteredDogs = dogs.filter(dog => {
    const matchesSearch = dog.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || dog.category === selectedCategory;
    const matchesPrice = selectedPriceRange === "all" ||
      (selectedPriceRange === "0-50" && dog.price <= 50) ||
      (selectedPriceRange === "50-100" && dog.price > 50 && dog.price <= 100) ||
      (selectedPriceRange === "100-200" && dog.price > 100 && dog.price <= 200) ||
      (selectedPriceRange === "200+" && dog.price > 200);

    return matchesSearch && matchesCategory && matchesPrice;
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
              <Link to="/marketplace" className="text-blue-500 font-semibold">Marketplace</Link>
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

      {/* Hero Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-orange-500 to-blue-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Find Local Dog Experts</h2>
          <p className="text-xl opacity-90">Connect with trusted breeders, trainers, walkers, and more</p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 px-4 bg-white border-b">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search listings..."
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
              <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  {priceRanges.map((range) => (
                    <SelectItem key={range.id} value={range.id}>
                      {range.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Dogs Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800">
              {filteredDogs.length} Listings Found
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDogs.map((dog) => (
              <Card key={dog.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative">
                  <div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
                    <img
                      src={dog.image}
                      alt={dog.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {dog.isFeatured && (
                      <Badge className="bg-blue-500 hover:bg-blue-600">Featured</Badge>
                    )}
                    {!dog.available && (
                      <Badge className="bg-red-500 hover:bg-red-600">Unavailable</Badge>
                    )}
                  </div>

                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white p-2"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>

                <CardContent className="p-4">
                  <h4 className="font-semibold text-lg mb-2 line-clamp-2">{dog.name}</h4>

                  <div className="flex items-center mb-2">
                    <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                    <span className="text-sm text-gray-600">{dog.location}</span>
                  </div>

                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(dog.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-2">
                      {dog.rating} ({dog.reviews})
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-orange-600">
                        ${dog.price}
                      </span>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                    disabled={!dog.available}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    {dog.available ? "Book Now" : "Not Available"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredDogs.length === 0 && (
            <div className="text-center py-12">
              <Dog className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No listings found</h3>
              <p className="text-gray-500">Try adjusting your search filters</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Marketplace;
