
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface DonationData {
  donor_email: string;
  donor_name?: string;
  amount: number;
  message?: string;
  is_anonymous?: boolean;
}

export const useDonations = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const processDonation = async (donationData: DonationData, isDemoMode: boolean = false) => {
    setIsProcessing(true);
    try {
      if (isDemoMode) {
        // Demo mode - simulate successful donation without external redirect
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate processing time
        
        // Save demo donation to database
        const { error: dbError } = await supabase
          .from('donations')
          .insert({
            ...donationData,
            status: 'completed',
            stripe_session_id: `demo_donation_${Date.now()}`,
          });

        if (dbError) throw dbError;

        // Send email notification
        await supabase.functions.invoke('send-donation-notification', {
          body: donationData
        });

        toast({
          title: "Demo Donation Successful!",
          description: `Thank you for your demo donation of UGX ${donationData.amount.toLocaleString()}!`,
        });

        return { success: true, data: { demo: true } };
      }

      // Real donation mode
      const { data, error } = await supabase.functions.invoke('create-donation-session', {
        body: donationData
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
        toast({
          title: "Redirecting to donation page",
          description: "Opening donation checkout in a new tab...",
        });
      }

      return { success: true, data };
    } catch (error: any) {
      console.error('Error processing donation:', error);
      toast({
        title: "Donation failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
      return { success: false, error };
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    processDonation,
    isProcessing,
  };
};
