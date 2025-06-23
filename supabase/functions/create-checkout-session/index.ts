
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface CheckoutRequest {
  customer_email: string;
  customer_name?: string;
  customer_phone?: string;
  total_amount: number;
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
  user_id?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const checkoutData: CheckoutRequest = await req.json();

    // Here you would typically integrate with Stripe
    // For now, we'll create a mock checkout session
    const mockCheckoutSession = {
      id: `cs_${Date.now()}`,
      url: `https://checkout.stripe.com/pay/mock-session-${Date.now()}#fidkdWxOYHwnPyd1blppbHNgWjA0SUpwb2E3T0FPVktbN0xoXVNsZGBNQXRmdEtAN2FScTZqTWFKcHUyNXJtUm49`,
      status: 'open',
    };

    // In a real implementation, you would save the checkout session to the database
    console.log("Mock checkout session created:", mockCheckoutSession);
    console.log("Checkout data:", checkoutData);

    return new Response(JSON.stringify(mockCheckoutSession), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error creating checkout session:", error);
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
