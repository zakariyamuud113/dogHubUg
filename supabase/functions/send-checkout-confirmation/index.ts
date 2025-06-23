
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface CheckoutConfirmationRequest {
  customer_email: string;
  customer_name?: string;
  order_id: string;
  total_amount: number;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      customer_email, 
      customer_name, 
      order_id, 
      total_amount, 
      items 
    }: CheckoutConfirmationRequest = await req.json();

    const itemsList = items.map(item => 
      `<li>${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}</li>`
    ).join('');

    const emailResponse = await resend.emails.send({
      from: "PetCare Store <onboarding@resend.dev>",
      to: [customer_email],
      subject: `Order Confirmation - ${order_id}`,
      html: `
        <h1>Order Confirmation</h1>
        <p>Thank you for your order${customer_name ? `, ${customer_name}` : ''}!</p>
        <p><strong>Order ID:</strong> ${order_id}</p>
        
        <h2>Order Summary:</h2>
        <ul>
          ${itemsList}
        </ul>
        
        <p><strong>Total: $${total_amount.toFixed(2)}</strong></p>
        
        <p>Your order has been processed successfully. You will receive a shipping confirmation email once your items are dispatched.</p>
        
        <p>If you have any questions, please don't hesitate to contact us.</p>
        
        <p>Best regards,<br>PetCare Store Team</p>
      `,
    });

    console.log("Checkout confirmation email sent:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending checkout confirmation:", error);
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
