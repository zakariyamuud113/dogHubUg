
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { DogReport } from "@/hooks/useDogReports";

interface AdditionalInfoSectionProps {
  formData: DogReport;
  onInputChange: (field: keyof DogReport, value: any) => void;
  type: 'lost' | 'found';
}

export const AdditionalInfoSection = ({ formData, onInputChange, type }: AdditionalInfoSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Additional Information</h3>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Provide any additional details about the dog's appearance, behavior, or circumstances..."
          value={formData.description}
          onChange={(e) => onInputChange('description', e.target.value)}
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
            onChange={(e) => onInputChange('reward_amount', e.target.value ? parseInt(e.target.value) : 0)}
          />
        </div>
      )}

      <div className="flex items-center space-x-2">
        <Switch
          id="is_urgent"
          checked={formData.is_urgent}
          onCheckedChange={(checked) => onInputChange('is_urgent', checked)}
        />
        <Label htmlFor="is_urgent">Mark as urgent</Label>
      </div>
    </div>
  );
};
