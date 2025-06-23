
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DogReport, useDogReports } from "@/hooks/useDogReports";
import { X } from "lucide-react";
import { ContactSection } from "./dog-reports/ContactSection";
import { DogInfoSection } from "./dog-reports/DogInfoSection";
import { LocationSection } from "./dog-reports/LocationSection";
import { ImageUploadSection } from "./dog-reports/ImageUploadSection";
import { AdditionalInfoSection } from "./dog-reports/AdditionalInfoSection";

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

  const [dogImage, setDogImage] = useState<File | null>(null);
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
          <form onSubmit={handleSubmit} className="space-y-6">
            <ContactSection formData={formData} onInputChange={handleInputChange} />
            <DogInfoSection formData={formData} onInputChange={handleInputChange} />
            <LocationSection formData={formData} onInputChange={handleInputChange} type={type} />
            <ImageUploadSection onImageChange={setDogImage} />
            <AdditionalInfoSection formData={formData} onInputChange={handleInputChange} type={type} />

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
