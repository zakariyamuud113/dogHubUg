
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DogReport } from "@/hooks/useDogReports";

interface ContactSectionProps {
  formData: DogReport;
  onInputChange: (field: keyof DogReport, value: any) => void;
}

export const ContactSection = ({ formData, onInputChange }: ContactSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Contact Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="contact_name">Your Name *</Label>
          <Input
            id="contact_name"
            required
            value={formData.contact_name}
            onChange={(e) => onInputChange('contact_name', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="contact_phone">Phone Number *</Label>
          <Input
            id="contact_phone"
            type="tel"
            required
            value={formData.contact_phone}
            onChange={(e) => onInputChange('contact_phone', e.target.value)}
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
          onChange={(e) => onInputChange('contact_email', e.target.value)}
        />
      </div>
    </div>
  );
};
