
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface DogReport {
  id?: string;
  type: 'lost' | 'found';
  dog_name?: string;
  breed?: string;
  age?: number;
  gender?: 'male' | 'female' | 'unknown';
  size?: 'small' | 'medium' | 'large' | 'extra_large';
  color?: string;
  description?: string;
  last_seen_date?: string;
  last_seen_location?: string;
  contact_name: string;
  contact_phone: string;
  contact_email: string;
  reward_amount?: number;
  is_urgent?: boolean;
}

export const useDogReports = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const submitReport = async (report: DogReport, dogImage?: File | null) => {
    setIsSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      let image_url = null;

      // Upload image if provided
      if (dogImage) {
        const fileExt = dogImage.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `dog-reports/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('dog-images')
          .upload(filePath, dogImage);

        if (uploadError) {
          console.error('Upload error:', uploadError);
        } else {
          const { data: { publicUrl } } = supabase.storage
            .from('dog-images')
            .getPublicUrl(filePath);
          image_url = publicUrl;
        }
      }

      const { error } = await supabase
        .from('dog_reports')
        .insert({
          ...report,
          user_id: user?.id || null,
          image_url,
        });

      if (error) throw error;

      // Send notification email
      await supabase.functions.invoke('send-dog-report-email', {
        body: { report: { ...report, image_url } }
      });

      toast({
        title: "Report submitted successfully",
        description: `Your ${report.type} dog report has been submitted and posted publicly.`,
      });

      return { success: true };
    } catch (error: any) {
      console.error('Error submitting report:', error);
      toast({
        title: "Error submitting report",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
      return { success: false, error };
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submitReport,
    isSubmitting,
  };
};
