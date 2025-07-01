
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface DonationRequest {
  donor_email: string;
  donor_name?: string;
  amount: number;
  message?: string;
  is_anonymous?: boolean;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const donationData: DonationRequest = await req.json();

    // Here you would typically integrate with Stripe
    // For now, we'll create a mock donation session
    const mockDonationSession = {
      id: `cs_donation_${Date.now()}`,
      url: `https://checkout.stripe.com/pay/mock-donation-${Date.now()}#fidkdWxOYHwnPyd1blppbHNgWjA0SUpwb2E3T0FPVktbN0xoXVNsZGBNQXRmdEtAN2FScTZqTWFKcHUyNXJtUm49`,
      status: 'open',
      currency: 'ugx',
    };

    // In a real implementation, you would save the donation to the database
    console.log("Mock donation session created:", mockDonationSession);
    console.log("Donation data:", donationData);

    return new Response(JSON.stringify(mockDonationSession), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error creating donation session:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
