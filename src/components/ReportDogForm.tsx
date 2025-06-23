
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { DogReport, useDogReports } from "@/hooks/useDogReports";
import { X } from "lucide-react";

interface ReportDogFormProps {
  type: 'lost' | 'found';
  onClose: () => void;
}

export const ReportDogForm = ({ type, onClose }: ReportDogFormProps) => {
  const [formData, setFormData] = useState<DogReport>({
    type,
    contact_name: '',
    contact_phone: '',
    contact_email: '',
    dog_name: '',
    breed: '',
    age: undefined,
    gender: 'unknown',
    size: 'medium',
    color: '',
    description: '',
    last_seen_date: '',
    last_seen_location: '',
    reward_amount: 0,
    is_urgent: false,
  });

  const { submitReport, isSubmitting } = useDogReports();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await submitReport(formData);
    if (result.success) {
      onClose();
    }
  };

  const handleInputChange = (field: keyof DogReport, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl">
              Report {type === 'lost' ? 'Lost' : 'Found'} Dog
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contact_name">Your Name *</Label>
                  <Input
                    id="contact_name"
                    required
                    value={formData.contact_name}
                    onChange={(e) => handleInputChange('contact_name', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="contact_phone">Phone Number *</Label>
                  <Input
                    id="contact_phone"
                    type="tel"
                    required
                    value={formData.contact_phone}
                    onChange={(e) => handleInputChange('contact_phone', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="contact_email">Email *</Label>
                <Input
                  id="contact_email"
                  type="email"
                  required
                  value={formData.contact_email}
                  onChange={(e) => handleInputChange('contact_email', e.target.value)}
                />
              </div>
            </div>

            {/* Dog Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Dog Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dog_name">Dog's Name</Label>
                  <Input
                    id="dog_name"
                    value={formData.dog_name}
                    onChange={(e) => handleInputChange('dog_name', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="breed">Breed</Label>
                  <Input
                    id="breed"
                    value={formData.breed}
                    onChange={(e) => handleInputChange('breed', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="age">Age (years)</Label>
                  <Input
                    id="age"
                    type="number"
                    min="0"
                    value={formData.age || ''}
                    onChange={(e) => handleInputChange('age', e.target.value ? parseInt(e.target.value) : undefined)}
                  />
                </div>
                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="unknown">Unknown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="size">Size</Label>
                  <Select value={formData.size} onValueChange={(value) => handleInputChange('size', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                      <SelectItem value="extra_large">Extra Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="color">Color/Markings</Label>
                <Input
                  id="color"
                  value={formData.color}
                  onChange={(e) => handleInputChange('color', e.target.value)}
                />
              </div>
            </div>

            {/* Location and Date */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">
                {type === 'lost' ? 'Last Seen' : 'Found'} Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="last_seen_date">Date</Label>
                  <Input
                    id="last_seen_date"
                    type="date"
                    value={formData.last_seen_date}
                    onChange={(e) => handleInputChange('last_seen_date', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="last_seen_location">Location</Label>
                  <Input
                    id="last_seen_location"
                    placeholder="e.g., Central Park, New York"
                    value={formData.last_seen_location}
                    onChange={(e) => handleInputChange('last_seen_location', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Additional Information</h3>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Provide any additional details about the dog's appearance, behavior, or circumstances..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                />
              </div>

              {type === 'lost' && (
                <div>
                  <Label htmlFor="reward_amount">Reward Amount ($)</Label>
                  <Input
                    id="reward_amount"
                    type="number"
                    min="0"
                    value={formData.reward_amount || ''}
                    onChange={(e) => handleInputChange('reward_amount', e.target.value ? parseInt(e.target.value) : 0)}
                  />
                </div>
              )}

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_urgent"
                  checked={formData.is_urgent}
                  onCheckedChange={(checked) => handleInputChange('is_urgent', checked)}
                />
                <Label htmlFor="is_urgent">Mark as urgent</Label>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting ? 'Submitting...' : `Submit ${type === 'lost' ? 'Lost' : 'Found'} Report`}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
