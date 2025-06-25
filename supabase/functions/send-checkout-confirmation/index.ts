
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

    console.log("Sending checkout confirmation email to:", customer_email);

    const itemsList = items.map(item => 
      `<li>${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}</li>`
    ).join('');

    // Use the verified domain email or fallback to your email for testing
    const fromEmail = "PetCare Store <onboarding@resend.dev>";
    
    const emailResponse = await resend.emails.send({
      from: fromEmail,
      to: [customer_email],
      subject: `Order Confirmation - ${order_id.slice(0, 8)}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb;">Order Confirmation</h1>
          <p>Thank you for your order${customer_name ? `, ${customer_name}` : ''}!</p>
          <p><strong>Order ID:</strong> ${order_id.slice(0, 8)}...</p>
          
          <h2 style="color: #1f2937;">Order Summary:</h2>
          <ul style="list-style-type: none; padding: 0;">
            ${itemsList}
          </ul>
          
          <div style="background: #f3f4f6; padding: 16px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; font-size: 18px; font-weight: bold;">Total: $${total_amount.toFixed(2)}</p>
          </div>
          
          <p>Your order has been processed successfully. You will receive a shipping confirmation email once your items are dispatched.</p>
          
          <p>If you have any questions, please don't hesitate to contact us.</p>
          
          <p style="margin-top: 30px;">Best regards,<br><strong>PetCare Store Team</strong></p>
        </div>
      `,
    });

    console.log("Checkout confirmation email response:", emailResponse);

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Email sent successfully",
      email_id: emailResponse.data?.id 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending checkout confirmation:", error);
    
    // Return a more detailed error response
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: "Email sending failed. This might be due to email domain verification requirements.",
        suggestion: "Please verify your domain at resend.com/domains or use a verified email address."
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
