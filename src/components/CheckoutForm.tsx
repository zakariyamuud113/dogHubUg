
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckoutData, useCheckout } from "@/hooks/useCheckout";
import { X, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CheckoutFormProps {
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image_url?: string;
  }>;
  onClose: () => void;
}

export const CheckoutForm = ({ items, onClose }: CheckoutFormProps) => {
  const [formData, setFormData] = useState<CheckoutData>({
    customer_email: '',
    customer_name: '',
    customer_phone: '',
    items,
    shipping_address: {
      street: '',
      city: '',
      state: '',
      zip: '',
      country: 'US',
    },
  });

  const [isDemoMode, setIsDemoMode] = useState(false);
  const { processCheckout, isProcessing } = useCheckout();
  const { toast } = useToast();

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isDemoMode) {
      // Demo mode - simulate successful checkout
      toast({
        title: "Demo Checkout Successful!",
        description: `Demo order for $${total.toFixed(2)} has been processed successfully.`,
      });
      onClose();
      return;
    }

    const result = await processCheckout(formData);
    if (result.success) {
      onClose();
    }
  };

  const handleInputChange = (field: string, value: any) => {
    if (field.startsWith('shipping_address.')) {
      const addressField = field.split('.')[1];
      setFormData(prev => ({
        ...prev,
        shipping_address: {
          ...prev.shipping_address!,
          [addressField]: value,
        },
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl flex items-center">
              <CreditCard className="h-6 w-6 mr-2" />
              Checkout
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Demo Mode Toggle */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="demo-mode"
                  checked={isDemoMode}
                  onChange={(e) => setIsDemoMode(e.target.checked)}
                  className="rounded"
                />
                <Label htmlFor="demo-mode" className="text-blue-700 font-medium">
                  Demo Mode (Test checkout without payment)
                </Label>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Order Summary</h3>
              <div className="space-y-2">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between items-center">
                    <span>{item.name} x{item.quantity}</span>
                    <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t pt-2">
                  <div className="flex justify-between items-center font-bold text-lg">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Information */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Customer Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="customer_name">Full Name</Label>
                  <Input
                    id="customer_name"
                    value={formData.customer_name}
                    onChange={(e) => handleInputChange('customer_name', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="customer_email">Email *</Label>
                  <Input
                    id="customer_email"
                    type="email"
                    required
                    value={formData.customer_email}
                    onChange={(e) => handleInputChange('customer_email', e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-4">
                <Label htmlFor="customer_phone">Phone Number</Label>
                <Input
                  id="customer_phone"
                  type="tel"
                  value={formData.customer_phone}
                  onChange={(e) => handleInputChange('customer_phone', e.target.value)}
                />
              </div>
            </div>

            {/* Shipping Address */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Shipping Address</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="street">Street Address</Label>
                  <Input
                    id="street"
                    value={formData.shipping_address?.street}
                    onChange={(e) => handleInputChange('shipping_address.street', e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={formData.shipping_address?.city}
                      onChange={(e) => handleInputChange('shipping_address.city', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={formData.shipping_address?.state}
                      onChange={(e) => handleInputChange('shipping_address.state', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input
                      id="zip"
                      value={formData.shipping_address?.zip}
                      onChange={(e) => handleInputChange('shipping_address.zip', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isProcessing} 
                className={`flex-1 ${isDemoMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gradient-to-r from-orange-500 to-orange-600'}`}
              >
                {isProcessing ? 'Processing...' : isDemoMode ? 'Complete Demo Checkout' : 'Proceed to Payment'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
