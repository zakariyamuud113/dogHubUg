
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { DonationData, useDonations } from "@/hooks/useDonations";
import { X, Heart } from "lucide-react";

interface DonateFormProps {
  onClose: () => void;
}

export const DonateForm = ({ onClose }: DonateFormProps) => {
  const [formData, setFormData] = useState<DonationData>({
    donor_email: '',
    donor_name: '',
    amount: 25,
    message: '',
    is_anonymous: false,
  });

  const { processDonation, isProcessing } = useDonations();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await processDonation(formData);
    if (result.success) {
      onClose();
    }
  };

  const handleInputChange = (field: keyof DonationData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const presetAmounts = [10, 25, 50, 100, 250];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl flex items-center">
              <Heart className="h-6 w-6 text-red-500 mr-2" />
              Make a Donation
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="amount">Donation Amount ($) *</Label>
              <div className="grid grid-cols-5 gap-2 mt-2 mb-3">
                {presetAmounts.map(amount => (
                  <Button
                    key={amount}
                    type="button"
                    variant={formData.amount === amount ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleInputChange('amount', amount)}
                  >
                    ${amount}
                  </Button>
                ))}
              </div>
              <Input
                id="amount"
                type="number"
                min="1"
                required
                value={formData.amount}
                onChange={(e) => handleInputChange('amount', parseFloat(e.target.value) || 0)}
              />
            </div>

            <div>
              <Label htmlFor="donor_email">Email Address *</Label>
              <Input
                id="donor_email"
                type="email"
                required
                value={formData.donor_email}
                onChange={(e) => handleInputChange('donor_email', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="donor_name">Full Name</Label>
              <Input
                id="donor_name"
                value={formData.donor_name}
                onChange={(e) => handleInputChange('donor_name', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="message">Message (Optional)</Label>
              <Textarea
                id="message"
                placeholder="Share why you're supporting our cause..."
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="is_anonymous"
                checked={formData.is_anonymous}
                onCheckedChange={(checked) => handleInputChange('is_anonymous', checked)}
              />
              <Label htmlFor="is_anonymous">Make this donation anonymous</Label>
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" disabled={isProcessing} className="flex-1 bg-gradient-to-r from-red-500 to-pink-600">
                {isProcessing ? 'Processing...' : `Donate $${formData.amount}`}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
