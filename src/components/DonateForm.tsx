
import { useState } from "react";
import { useDonations } from "@/hooks/useDonations";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Heart, CreditCard } from "lucide-react";

export const DonateForm = () => {
  const { processDonation, isProcessing } = useDonations();
  
  const [donationData, setDonationData] = useState({
    donor_email: "",
    donor_name: "",
    amount: 0,
    message: "",
    is_anonymous: false,
  });

  const [isDemoMode, setIsDemoMode] = useState(true);

  const formatPrice = (price: number) => {
    return `UGX ${price.toLocaleString()}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await processDonation(donationData, isDemoMode);
  };

  const handleAmountClick = (amount: number) => {
    setDonationData(prev => ({ ...prev, amount }));
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-2xl">
          <Heart className="w-6 h-6 text-red-500" />
          Make a Donation
        </CardTitle>
        <CardDescription>
          Your generous donation helps us care for pets in need and reunite lost animals with their families.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Demo Mode Toggle */}
          <div className="flex items-center space-x-2 p-4 bg-orange-50 rounded-lg">
            <Switch
              id="demo-mode"
              checked={isDemoMode}
              onCheckedChange={setIsDemoMode}
            />
            <Label htmlFor="demo-mode" className="text-sm">
              Demo Mode - {isDemoMode ? "Simulate donation" : "Live payment processing"}
            </Label>
          </div>

          {/* Donation Amount */}
          <div className="space-y-4">
            <Label className="text-lg font-semibold">Donation Amount (UGX)</Label>
            <div className="grid grid-cols-3 gap-4">
              {[25000, 50000, 100000, 250000, 500000, 1000000].map((amount) => (
                <Button
                  key={amount}
                  type="button"
                  variant={donationData.amount === amount ? "default" : "outline"}
                  onClick={() => handleAmountClick(amount)}
                  className="text-sm"
                >
                  {formatPrice(amount)}
                </Button>
              ))}
            </div>
            <div>
              <Label htmlFor="custom-amount">Custom Amount</Label>
              <Input
                id="custom-amount"
                type="number"
                min="1000"
                step="1000"
                value={donationData.amount || ""}
                onChange={(e) => setDonationData(prev => ({ ...prev, amount: parseInt(e.target.value) || 0 }))}
                placeholder="Enter custom amount"
              />
            </div>
          </div>

          {/* Donor Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Your Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="donor_name">Full Name</Label>
                <Input
                  id="donor_name"
                  value={donationData.donor_name}
                  onChange={(e) => setDonationData(prev => ({ ...prev, donor_name: e.target.value }))}
                  disabled={donationData.is_anonymous}
                />
              </div>
              <div>
                <Label htmlFor="donor_email">Email Address *</Label>
                <Input
                  id="donor_email"
                  type="email"
                  value={donationData.donor_email}
                  onChange={(e) => setDonationData(prev => ({ ...prev, donor_email: e.target.value }))}
                  required
                />
              </div>
            </div>
          </div>

          {/* Message */}
          <div>
            <Label htmlFor="message">Message (Optional)</Label>
            <Textarea
              id="message"
              value={donationData.message}
              onChange={(e) => setDonationData(prev => ({ ...prev, message: e.target.value }))}
              placeholder="Leave a message of support..."
              rows={3}
            />
          </div>

          {/* Anonymous Donation */}
          <div className="flex items-center space-x-2">
            <Switch
              id="anonymous"
              checked={donationData.is_anonymous}
              onCheckedChange={(checked) => setDonationData(prev => ({ 
                ...prev, 
                is_anonymous: checked,
                donor_name: checked ? "" : prev.donor_name
              }))}
            />
            <Label htmlFor="anonymous">Make this donation anonymous</Label>
          </div>

          {/* Summary */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span>Donation Amount:</span>
              <span className="font-semibold text-lg text-orange-500">
                {formatPrice(donationData.amount)}
              </span>
            </div>
            {donationData.is_anonymous && (
              <p className="text-sm text-gray-600">This donation will be made anonymously.</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isProcessing || donationData.amount < 1000}
            className="w-full bg-orange-500 hover:bg-orange-600"
            size="lg"
          >
            <CreditCard className="w-5 h-5 mr-2" />
            {isProcessing ? "Processing..." : `Donate ${formatPrice(donationData.amount)}`}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            Your donation is secure and helps support our mission to care for pets in need.
          </p>
        </form>
      </CardContent>
    </Card>
  );
};
