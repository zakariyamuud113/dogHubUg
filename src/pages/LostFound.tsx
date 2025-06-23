import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dog, ShoppingCart, MapPin, Calendar, Search, Heart, Phone, AlertCircle, Filter, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import { ReportDogForm } from "@/components/ReportDogForm";
import { DonateForm } from "@/components/DonateForm";
import { supabase } from "@/integrations/supabase/client";

const LostFound = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [showReportForm, setShowReportForm] = useState<'lost' | 'found' | null>(null);
  const [showDonateForm, setShowDonateForm] = useState(false);
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
  ];

  // Fetch dog reports from database
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const { data, error } = await supabase
          .from('dog_reports')
          .select('*')
          .eq('status', 'active')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setReports(data || []);
      } catch (error) {
        console.error('Error fetching reports:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();

    // Set up real-time subscription for new reports
    const channel = supabase
      .channel('dog_reports_changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'dog_reports'
        },
        (payload) => {
          console.log('New dog report:', payload);
          setReports(prev => [payload.new, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const filteredReports = reports.filter(report => {
    const matchesSearch = 
      (report.dog_name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (report.breed || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (report.description || '').toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLocation = selectedLocation === "all" || 
      (report.last_seen_location || '').toLowerCase().includes(selectedLocation.replace('-', ' '));
    
    const matchesType = selectedType === "all" || report.type === selectedType;
    
    return matchesSearch && matchesLocation && matchesType;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Dog className="h-16 w-16 text-orange-500 mx-auto mb-4 animate-pulse" />
          <p className="text-lg text-gray-600">Loading reports...</p>
        </div>
      </div>
    );
  }

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
            <Button 
              size="lg" 
              variant="secondary" 
              className="bg-white text-red-600 hover:bg-gray-100"
              onClick={() => setShowReportForm('lost')}
            >
              Report Lost Dog
            </Button>
            <Button 
              size="lg" 
              variant="secondary" 
              className="bg-white text-red-600 hover:bg-gray-100"
              onClick={() => setShowReportForm('found')}
            >
              Report Found Dog
            </Button>
          </div>
        </div>
      </section>

      {/* Emergency Alert */}
      <section className="py-4 px-4 bg-yellow-100 border-b border-yellow-200">
        <div className="container mx-auto">
          <div className="flex items-center justify-center text-yellow-800">
            <AlertCircle className="h-5 w-5 mr-2" />
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
                    {report.image_url ? (
                      <img 
                        src={report.image_url} 
                        alt={report.dog_name || 'Dog'} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <Dog className="h-16 w-16 text-gray-400" />
                      </div>
                    )}
                  </div>
                  
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    <Badge 
                      className={`${
                        report.type === 'lost' 
                          ? 'bg-red-500 hover:bg-red-600' 
                          : 'bg-blue-500 hover:bg-blue-600'
                      }`}
                    >
                      {report.type === 'lost' ? 'Lost' : 'Found'}
                    </Badge>
                    {report.is_urgent && (
                      <Badge className="bg-yellow-500 hover:bg-yellow-600">
                        Urgent
                      </Badge>
                    )}
                  </div>

                  {report.reward_amount > 0 && (
                    <Badge className="absolute top-2 right-2 bg-green-600 hover:bg-green-700">
                      ${report.reward_amount} Reward
                    </Badge>
                  )}
                </div>
                
                <CardHeader>
                  <CardTitle className="text-lg">
                    {report.dog_name ? `${report.dog_name} - ${report.breed || 'Unknown Breed'}` : report.breed || 'Unknown Breed'}
                  </CardTitle>
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-500 text-sm">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{report.last_seen_location || 'Location not specified'}</span>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>
                        {report.type === 'lost' ? 'Last seen: ' : 'Found on: '}
                        {report.last_seen_date ? new Date(report.last_seen_date).toLocaleDateString() : 'Date not specified'}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {report.description || 'No description provided.'}
                  </p>

                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-1">Contact: {report.contact_name}</p>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      className={`flex-1 ${
                        report.type === 'lost' 
                          ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
                          : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
                      }`}
                      onClick={() => window.location.href = `tel:${report.contact_phone}`}
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => window.location.href = `mailto:${report.contact_email}`}
                    >
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
              <p className="text-gray-500">Try adjusting your search filters or be the first to report!</p>
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
            onClick={() => setShowDonateForm(true)}
          >
            <Heart className="h-5 w-5 mr-2" />
            Donate Now
          </Button>
        </div>
      </section>

      {/* Modals */}
      {showReportForm && (
        <ReportDogForm 
          type={showReportForm} 
          onClose={() => setShowReportForm(null)} 
        />
      )}

      {showDonateForm && (
        <DonateForm onClose={() => setShowDonateForm(false)} />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LostFound;
