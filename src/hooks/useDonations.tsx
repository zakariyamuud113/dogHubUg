
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

  const processDonation = async (donationData: DonationData) => {
    setIsProcessing(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-donation-session', {
        body: donationData
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
        toast({
          title: "Redirecting to donation",
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
