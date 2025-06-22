
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dog, MapPin, Calendar, Phone, Mail, Search, Filter, AlertTriangle, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const LostFound = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  const locations = [
    { id: "all", name: "All Locations" },
    { id: "new-york", name: "New York" },
    { id: "california", name: "California" },
    { id: "texas", name: "Texas" },
    { id: "florida", name: "Florida" },
    { id: "illinois", name: "Illinois" },
  ];

  const types = [
    { id: "all", name: "All Types" },
    { id: "lost", name: "Lost Dogs" },
    { id: "found", name: "Found Dogs" },
    { id: "adoption", name: "Available for Adoption" },
  ];

  const reports = [
    {
      id: 1,
      type: "lost",
      title: "Missing Golden Retriever - Buddy",
      breed: "Golden Retriever",
      lastSeen: "2024-01-20",
      location: "Central Park, New York",
      description: "Friendly male golden retriever, 3 years old. Wearing a blue collar with name tag. Very social and responds to his name.",
      image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=400&fit=crop",
      contact: { phone: "(555) 123-4567", email: "owner@example.com", name: "Sarah Johnson" },
      reward: 500,
      urgent: true
    },
    {
      id: 2,
      type: "found",
      title: "Found Small Mixed Breed",
      breed: "Mixed Breed",
      lastSeen: "2024-01-22",
      location: "Downtown, California",
      description: "Small mixed breed dog found wandering near the shopping center. No collar or ID. Very gentle and well-behaved.",
      image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&h=400&fit=crop",
      contact: { phone: "(555) 987-6543", email: "finder@example.com", name: "Mike Chen" },
      reward: null,
      urgent: false
    },
    {
      id: 3,
      type: "adoption",
      title: "Luna - Sweet Husky Looking for Home",
      breed: "Husky",
      lastSeen: "2024-01-15",
      location: "Animal Shelter, Texas",
      description: "Beautiful 2-year-old husky female. Great with kids, house-trained, and loves to play. Looking for an active family.",
      image: "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=400&h=400&fit=crop",
      contact: { phone: "(555) 456-7890", email: "shelter@example.com", name: "Happy Paws Shelter" },
      reward: null,
      urgent: false
    },
    {
      id: 4,
      type: "lost",
      title: "Missing German Shepherd - Max",
      breed: "German Shepherd",
      lastSeen: "2024-01-18",
      location: "Riverside Park, Florida",
      description: "Large male German Shepherd, 4 years old. Black and tan coloring. May appear scared of strangers but is friendly.",
      image: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=400&h=400&fit=crop",
      contact: { phone: "(555) 321-0987", email: "family@example.com", name: "The Martinez Family" },
      reward: 1000,
      urgent: true
    },
    {
      id: 5,
      type: "adoption",
      title: "Charlie - Playful Labrador Mix",
      breed: "Labrador Mix",
      lastSeen: "2024-01-10",
      location: "Rescue Center, Illinois",
      description: "1-year-old Labrador mix with lots of energy. Loves fetch and swimming. Would do well with an active owner.",
      image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=400&fit=crop",
      contact: { phone: "(555) 654-3210", email: "rescue@example.com", name: "Second Chance Rescue" },
      reward: null,
      urgent: false
    },
    {
      id: 6,
      type: "found",
      title: "Found Senior Beagle",
      breed: "Beagle",
      lastSeen: "2024-01-21",
      location: "Suburban Area, New York",
      description: "Senior beagle found in suburban neighborhood. Appears to be well-cared for, likely has a family looking for him.",
      image: "https://images.unsplash.com/photo-1551717743-49959800b1f6?w=400&h=400&fit=crop",
      contact: { phone: "(555) 789-0123", email: "helper@example.com", name: "Jennifer Wilson" },
      reward: null,
      urgent: false
    }
  ];

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = selectedLocation === "all" || report.location.toLowerCase().includes(selectedLocation.replace('-', ' '));
    const matchesType = selectedType === "all" || report.type === selectedType;
    
    return matchesSearch && matchesLocation && matchesType;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
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
              <Link to="/lost-found" className="text-red-500 font-semibold">Lost & Found</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-red-500 to-orange-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Lost & Found Dogs</h2>
          <p className="text-xl opacity-90 mb-6">Help reunite dogs with their families and find homes for those in need</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-red-600 hover:bg-gray-100">
              Report Lost Dog
            </Button>
            <Button size="lg" variant="secondary" className="bg-white text-red-600 hover:bg-gray-100">
              Report Found Dog
            </Button>
          </div>
        </div>
      </section>

      {/* Emergency Alert */}
      <section className="py-4 px-4 bg-yellow-100 border-b border-yellow-200">
        <div className="container mx-auto">
          <div className="flex items-center justify-center text-yellow-800">
            <AlertTriangle className="h-5 w-5 mr-2" />
            <span className="text-sm">
              <strong>Emergency:</strong> If you find an injured dog, please contact local emergency veterinary services immediately.
            </span>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 px-4 bg-white border-b">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search by breed, name, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-4">
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  {types.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
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

      {/* Reports */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800">
              {filteredReports.length} Reports Found
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReports.map((report) => (
              <Card key={report.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative">
                  <div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
                    <img 
                      src={report.image} 
                      alt={report.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                  </div>
                  
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    <Badge 
                      className={`${
                        report.type === 'lost' 
                          ? 'bg-red-500 hover:bg-red-600' 
                          : report.type === 'found'
                          ? 'bg-blue-500 hover:bg-blue-600'
                          : 'bg-green-500 hover:bg-green-600'
                      }`}
                    >
                      {report.type === 'lost' ? 'Lost' : report.type === 'found' ? 'Found' : 'Adoption'}
                    </Badge>
                    {report.urgent && (
                      <Badge className="bg-yellow-500 hover:bg-yellow-600">
                        Urgent
                      </Badge>
                    )}
                  </div>

                  {report.reward && (
                    <Badge className="absolute top-2 right-2 bg-green-600 hover:bg-green-700">
                      ${report.reward} Reward
                    </Badge>
                  )}
                </div>
                
                <CardHeader>
                  <CardTitle className="text-lg">{report.title}</CardTitle>
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-500 text-sm">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{report.location}</span>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>
                        {report.type === 'lost' ? 'Last seen: ' : report.type === 'found' ? 'Found on: ' : 'Available since: '}
                        {new Date(report.lastSeen).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {report.description}
                  </p>

                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-1">Contact: {report.contact.name}</p>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      className={`flex-1 ${
                        report.type === 'lost' 
                          ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
                          : report.type === 'found'
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
                          : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
                      }`}
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

          {filteredReports.length === 0 && (
            <div className="text-center py-12">
              <Dog className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No reports found</h3>
              <p className="text-gray-500">Try adjusting your search filters</p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-r from-orange-500 to-red-600 text-white">
        <div className="container mx-auto text-center">
          <Heart className="h-16 w-16 mx-auto mb-6 opacity-80" />
          <h3 className="text-3xl font-bold mb-4">Help Make a Difference</h3>
          <p className="text-xl mb-8 opacity-90">Support our mission to reunite lost dogs with their families</p>
          <Button 
            size="lg" 
            variant="secondary"
            className="bg-white text-orange-600 hover:bg-gray-100"
          >
            <Heart className="h-5 w-5 mr-2" />
            Donate Now
          </Button>
        </div>
      </section>
    </div>
  );
};

export default LostFound;
