
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
    amount: 25000,
    message: '',
    is_anonymous: false,
  });

  const [isDemoMode, setIsDemoMode] = useState(false);
  const { processDonation, isProcessing } = useDonations();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await processDonation(formData, isDemoMode);
    if (result.success) {
      onClose();
    }
  };

  const handleInputChange = (field: keyof DonationData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const quickAmounts = [10000, 25000, 50000, 100000];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl flex items-center">
              <Heart className="h-6 w-6 mr-2 text-red-500" />
              Make a Donation
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Demo Mode Toggle */}
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="demo-mode-donation"
                  checked={isDemoMode}
                  onChange={(e) => setIsDemoMode(e.target.checked)}
                  className="rounded"
                />
                <Label htmlFor="demo-mode-donation" className="text-blue-700 font-medium text-sm">
                  Demo Mode (Test donation - no redirect)
                </Label>
              </div>
            </div>

            <div>
              <Label htmlFor="amount">Donation Amount (UGX) *</Label>
              <div className="grid grid-cols-4 gap-2 mt-2 mb-3">
                {quickAmounts.map(amount => (
                  <Button
                    key={amount}
                    type="button"
                    variant={formData.amount === amount ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleInputChange('amount', amount)}
                  >
                    {amount.toLocaleString()}
                  </Button>
                ))}
              </div>
              <Input
                id="amount"
                type="number"
                min="1000"
                step="1000"
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
              <Label htmlFor="donor_name">Your Name</Label>
              <Input
                id="donor_name"
                value={formData.donor_name}
                onChange={(e) => handleInputChange('donor_name', e.target.value)}
                disabled={formData.is_anonymous}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="is_anonymous"
                checked={formData.is_anonymous}
                onCheckedChange={(checked) => {
                  handleInputChange('is_anonymous', checked);
                  if (checked) {
                    handleInputChange('donor_name', '');
                  }
                }}
              />
              <Label htmlFor="is_anonymous">Make this donation anonymous</Label>
            </div>

            <div>
              <Label htmlFor="message">Message (Optional)</Label>
              <Textarea
                id="message"
                placeholder="Leave a message of support..."
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isProcessing} 
                className={`flex-1 ${isDemoMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gradient-to-r from-red-500 to-pink-600'}`}
              >
                {isProcessing ? 'Processing...' : isDemoMode ? 'Demo Donate' : `Donate UGX ${formData.amount.toLocaleString()}`}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
