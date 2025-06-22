import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dog, Heart, MapPin, Calendar, Shield, Phone, Mail, Filter, Search } from "lucide-react";
import { Link } from "react-router-dom";

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBreed, setSelectedBreed] = useState("all");
  const [selectedAge, setSelectedAge] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");

  const breeds = [
    { id: "all", name: "All Breeds" },
    { id: "golden-retriever", name: "Golden Retriever" },
    { id: "labrador", name: "Labrador" },
    { id: "german-shepherd", name: "German Shepherd" },
    { id: "husky", name: "Husky" },
    { id: "bulldog", name: "Bulldog" },
    { id: "poodle", name: "Poodle" },
    { id: "mixed", name: "Mixed Breed" },
  ];

  const ages = [
    { id: "all", name: "All Ages" },
    { id: "puppy", name: "Puppy (0-1 year)" },
    { id: "young", name: "Young (1-3 years)" },
    { id: "adult", name: "Adult (3-7 years)" },
    { id: "senior", name: "Senior (7+ years)" },
  ];

  const locations = [
    { id: "all", name: "All Locations" },
    { id: "new-york", name: "New York" },
    { id: "california", name: "California" },
    { id: "texas", name: "Texas" },
    { id: "florida", name: "Florida" },
    { id: "illinois", name: "Illinois" },
  ];

  const dogs = [
    {
      id: 1,
      name: "Buddy",
      breed: "Golden Retriever",
      age: "2 years",
      ageCategory: "young",
      location: "New York",
      price: 800,
      type: "For Sale",
      image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=400&fit=crop",
      vaccinated: true,
      neutered: true,
      description: "Friendly and energetic golden retriever looking for a loving home.",
      contact: { phone: "(555) 123-4567", email: "owner@example.com" }
    },
    {
      id: 2,
      name: "Luna",
      breed: "Husky",
      age: "6 months",
      ageCategory: "puppy",
      location: "California",
      price: 1200,
      type: "For Sale",
      image: "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=400&h=400&fit=crop",
      vaccinated: true,
      neutered: false,
      description: "Beautiful husky puppy with striking blue eyes.",
      contact: { phone: "(555) 987-6543", email: "breeder@example.com" }
    },
    {
      id: 3,
      name: "Max",
      breed: "German Shepherd",
      age: "1 year",
      ageCategory: "young",
      location: "Texas",
      price: 0,
      type: "Adoption",
      image: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=400&h=400&fit=crop",
      vaccinated: true,
      neutered: true,
      description: "Rescued German Shepherd looking for a second chance at love.",
      contact: { phone: "(555) 456-7890", email: "rescue@example.com" }
    },
    {
      id: 4,
      name: "Bella",
      breed: "Labrador",
      age: "3 years",
      ageCategory: "adult",
      location: "Florida",
      price: 600,
      type: "For Sale",
      image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=400&fit=crop",
      vaccinated: true,
      neutered: true,
      description: "Sweet labrador who loves playing fetch and swimming.",
      contact: { phone: "(555) 321-0987", email: "family@example.com" }
    },
    {
      id: 5,
      name: "Charlie",
      breed: "Mixed Breed",
      age: "4 months",
      ageCategory: "puppy",
      location: "Illinois",
      price: 0,
      type: "Adoption",
      image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&h=400&fit=crop",
      vaccinated: false,
      neutered: false,
      description: "Adorable mixed breed puppy ready for a forever home.",
      contact: { phone: "(555) 654-3210", email: "shelter@example.com" }
    },
    {
      id: 6,
      name: "Rocky",
      breed: "Bulldog",
      age: "5 years",
      ageCategory: "adult",
      location: "New York",
      price: 900,
      type: "For Sale",
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=400&fit=crop",
      vaccinated: true,
      neutered: true,
      description: "Gentle bulldog with a calm temperament, great with kids.",
      contact: { phone: "(555) 789-0123", email: "bulldogowner@example.com" }
    },
    {
      id: 7,
      name: "Daisy",
      breed: "Poodle",
      age: "8 months",
      ageCategory: "puppy",
      location: "California",
      price: 1000,
      type: "For Sale",
      image: "https://images.unsplash.com/photo-1616190244161-03181958c5c8?w=400&h=400&fit=crop",
      vaccinated: true,
      neutered: false,
      description: "Intelligent and hypoallergenic poodle puppy.",
      contact: { phone: "(555) 111-2222", email: "poodlebreeder@example.com" }
    },
    {
      id: 8,
      name: "Zeus",
      breed: "German Shepherd",
      age: "4 years",
      ageCategory: "adult",
      location: "Texas", 
      price: 700,
      type: "For Sale",
      image: "https://images.unsplash.com/photo-1551717743-49959800b1f6?w=400&h=400&fit=crop",
      vaccinated: true,
      neutered: true,
      description: "Well-trained German Shepherd, excellent guard dog.",
      contact: { phone: "(555) 333-4444", email: "k9trainer@example.com" }
    }
  ];

  const filteredDogs = dogs.filter(dog => {
    const matchesSearch = dog.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dog.breed.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBreed = selectedBreed === "all" || dog.breed.toLowerCase().replace(' ', '-') === selectedBreed;
    const matchesAge = selectedAge === "all" || dog.ageCategory === selectedAge;
    const matchesLocation = selectedLocation === "all" || dog.location.toLowerCase().replace(' ', '-') === selectedLocation;
    
    return matchesSearch && matchesBreed && matchesAge && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
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
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Find Your Perfect Companion</h2>
          <p className="text-xl opacity-90">Browse loving dogs looking for their forever homes</p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 px-4 bg-white border-b">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search by name or breed..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-4">
              <Select value={selectedBreed} onValueChange={setSelectedBreed}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Breed" />
                </SelectTrigger>
                <SelectContent>
                  {breeds.map((breed) => (
                    <SelectItem key={breed.id} value={breed.id}>
                      {breed.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedAge} onValueChange={setSelectedAge}>
                <SelectTrigger className="w-48">
                  <Calendar className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Age" />
                </SelectTrigger>
                <SelectContent>
                  {ages.map((age) => (
                    <SelectItem key={age.id} value={age.id}>
                      {age.name}
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

      {/* Dogs Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800">
              {filteredDogs.length} Dogs Available
            </h3>
            <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
              List Your Dog
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white p-2"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Badge 
                    className={`absolute top-2 left-2 ${
                      dog.type === 'Adoption' 
                        ? 'bg-green-500 hover:bg-green-600' 
                        : 'bg-blue-500 hover:bg-blue-600'
                    }`}
                  >
                    {dog.type}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-bold text-xl text-gray-800 mb-1">{dog.name}</h4>
                      <p className="text-gray-600 mb-1">{dog.breed}</p>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{dog.age}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      {dog.price > 0 ? (
                        <span className="text-2xl font-bold text-blue-600">${dog.price}</span>
                      ) : (
                        <span className="text-2xl font-bold text-green-600">Free</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center text-gray-500 mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{dog.location}</span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {dog.description}
                  </p>

                  <div className="flex gap-2 mb-4">
                    {dog.vaccinated && (
                      <Badge variant="secondary" className="text-xs">
                        <Shield className="h-3 w-3 mr-1" />
                        Vaccinated
                      </Badge>
                    )}
                    {dog.neutered && (
                      <Badge variant="secondary" className="text-xs">
                        Neutered
                      </Badge>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Contact
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

          {filteredDogs.length === 0 && (
            <div className="text-center py-12">
              <Dog className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No dogs found</h3>
              <p className="text-gray-500">Try adjusting your search filters</p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to List Your Dog?</h3>
          <p className="text-xl mb-8 opacity-90">Join our community and help dogs find loving homes</p>
          <Button 
            size="lg" 
            variant="secondary"
            className="bg-white text-purple-600 hover:bg-gray-100"
          >
            Create Listing
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Marketplace;
