
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface CheckoutData {
  customer_email: string;
  customer_name?: string;
  customer_phone?: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image_url?: string;
  }>;
  shipping_address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
}

export const useCheckout = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const processCheckout = async (checkoutData: CheckoutData) => {
    setIsProcessing(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const total_amount = checkoutData.items.reduce(
        (sum, item) => sum + (item.price * item.quantity), 0
      );

      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: {
          ...checkoutData,
          user_id: user?.id || null,
          total_amount,
        }
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
        toast({
          title: "Redirecting to checkout",
          description: "Opening Stripe checkout in a new tab...",
        });
      }

      return { success: true, data };
    } catch (error: any) {
      console.error('Error processing checkout:', error);
      toast({
        title: "Checkout failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
      return { success: false, error };
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    processCheckout,
    isProcessing,
  };
};
