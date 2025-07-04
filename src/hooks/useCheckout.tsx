
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

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
  const queryClient = useQueryClient();

  const processCheckout = async (checkoutData: CheckoutData, isDemoMode: boolean = false) => {
    setIsProcessing(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const total_amount = checkoutData.items.reduce(
        (sum, item) => sum + (item.price * item.quantity), 0
      );

      if (isDemoMode) {
        // Demo mode - simulate successful checkout without external redirect
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate processing time
        
        // Save demo order to database
        const { data: orderData, error: dbError } = await supabase
          .from('checkout_sessions')
          .insert({
            ...checkoutData,
            user_id: user?.id || null,
            total_amount,
            status: 'completed',
            stripe_session_id: `demo_${Date.now()}`,
          })
          .select()
          .single();

        if (dbError) {
          console.error('Database error:', dbError);
          throw dbError;
        }

        console.log('Order saved to database:', orderData);

        // Clear cart after successful checkout
        if (user) {
          await supabase
            .from('cart_items')
            .delete()
            .eq('user_id', user.id);
          
          // Invalidate cart cache
          queryClient.invalidateQueries({ queryKey: ['cart', user.id] });
        }

        // Send confirmation email (don't fail checkout if email fails)
        try {
          console.log('Attempting to send confirmation email...');
          const { data: emailData, error: emailError } = await supabase.functions.invoke('send-checkout-confirmation', {
            body: {
              customer_email: checkoutData.customer_email,
              customer_name: checkoutData.customer_name,
              order_id: orderData.id,
              total_amount,
              items: checkoutData.items,
            }
          });

          if (emailError) {
            console.error('Email sending error:', emailError);
            // Don't throw error, just log it
            toast({
              title: "Demo Checkout Successful!",
              description: `Demo order for $${total_amount.toFixed(2)} has been processed successfully. Note: Email confirmation may have failed due to domain verification requirements.`,
            });
          } else {
            console.log('Email sent successfully:', emailData);
            toast({
              title: "Demo Checkout Successful!",
              description: `Demo order for $${total_amount.toFixed(2)} has been processed successfully. Check your email for confirmation.`,
            });
          }
        } catch (emailError) {
          console.error('Email sending failed:', emailError);
          toast({
            title: "Demo Checkout Successful!",
            description: `Demo order for $${total_amount.toFixed(2)} has been processed successfully. Email confirmation failed but order is saved.`,
          });
        }

        return { success: true, data: { demo: true, order: orderData } };
      }

      // Real checkout mode
      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: {
          ...checkoutData,
          user_id: user?.id || null,
          total_amount,
        }
      });

      if (error) {
        console.error('Checkout session error:', error);
        throw error;
      }

      console.log('Checkout session created:', data);

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
