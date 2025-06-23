
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DogReport } from "@/hooks/useDogReports";

interface LocationSectionProps {
  formData: DogReport;
  onInputChange: (field: keyof DogReport, value: any) => void;
  type: 'lost' | 'found';
}

export const LocationSection = ({ formData, onInputChange, type }: LocationSectionProps) => {
  return (
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
            onChange={(e) => onInputChange('last_seen_date', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="last_seen_location">Location</Label>
          <Input
            id="last_seen_location"
            placeholder="e.g., Central Park, New York"
            value={formData.last_seen_location}
            onChange={(e) => onInputChange('last_seen_location', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
