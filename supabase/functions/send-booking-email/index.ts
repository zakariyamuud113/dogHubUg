
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface BookingRequest {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  preferredDate: string;
  message: string;
  itemName: string;
  itemType: "service" | "marketplace";
  price?: number;
  contact?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const booking: BookingRequest = await req.json();
    
    console.log('Booking request received:', booking);

    // Send email to the customer
    const customerEmailResponse = await resend.emails.send({
      from: "DogHub <onboarding@resend.dev>",
      to: [booking.customerEmail],
      subject: `Booking Confirmation - ${booking.itemName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #f97316;">Booking Confirmation</h1>
          <p>Dear ${booking.customerName},</p>
          
          <p>Thank you for your booking request! We have received your request for <strong>${booking.itemName}</strong>.</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #333; margin-top: 0;">Booking Details:</h2>
            <ul style="list-style: none; padding: 0;">
              <li><strong>Service/Item:</strong> ${booking.itemName}</li>
              <li><strong>Type:</strong> ${booking.itemType === 'service' ? 'Service' : 'Marketplace Item'}</li>
              ${booking.price ? `<li><strong>Price:</strong> $${booking.price}</li>` : ''}
              <li><strong>Preferred Date:</strong> ${booking.preferredDate}</li>
              <li><strong>Your Phone:</strong> ${booking.customerPhone}</li>
              ${booking.message ? `<li><strong>Message:</strong> ${booking.message}</li>` : ''}
            </ul>
          </div>
          
          <p>The service provider will contact you at <strong>${booking.customerPhone}</strong> to confirm your booking and arrange the details.</p>
          
          ${booking.contact ? `<p>Provider Contact: <strong>${booking.contact}</strong></p>` : ''}
          
          <p>We'll be in touch soon!</p>
          
          <p>Best regards,<br>The DogHub Team</p>
        </div>
      `,
    });

    // Send email to the service provider (if contact email is provided)
    let providerEmailResponse = null;
    if (booking.contact && booking.contact.includes('@')) {
      providerEmailResponse = await resend.emails.send({
        from: "DogHub <onboarding@resend.dev>",
        to: [booking.contact],
        subject: `New Booking Request - ${booking.itemName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #f97316;">New Booking Request</h1>
            <p>You have received a new booking request for <strong>${booking.itemName}</strong>.</p>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="color: #333; margin-top: 0;">Customer Details:</h2>
              <ul style="list-style: none; padding: 0;">
                <li><strong>Name:</strong> ${booking.customerName}</li>
                <li><strong>Email:</strong> ${booking.customerEmail}</li>
                <li><strong>Phone:</strong> ${booking.customerPhone}</li>
                <li><strong>Preferred Date:</strong> ${booking.preferredDate}</li>
                ${booking.message ? `<li><strong>Message:</strong> ${booking.message}</li>` : ''}
              </ul>
            </div>
            
            <div style="background-color: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="color: #333; margin-top: 0;">Service Details:</h2>
              <ul style="list-style: none; padding: 0;">
                <li><strong>Service/Item:</strong> ${booking.itemName}</li>
                <li><strong>Type:</strong> ${booking.itemType === 'service' ? 'Service' : 'Marketplace Item'}</li>
                ${booking.price ? `<li><strong>Price:</strong> $${booking.price}</li>` : ''}
              </ul>
            </div>
            
            <p>Please contact the customer at <strong>${booking.customerPhone}</strong> or <strong>${booking.customerEmail}</strong> to confirm the booking and arrange the details.</p>
            
            <p>Best regards,<br>The DogHub Team</p>
          </div>
        `,
      });
    }

    console.log('Customer email sent:', customerEmailResponse);
    if (providerEmailResponse) {
      console.log('Provider email sent:', providerEmailResponse);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Booking request processed and emails sent successfully',
        customerEmailId: customerEmailResponse?.id,
        providerEmailId: providerEmailResponse?.id
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  } catch (error) {
    console.error('Error processing booking request:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to process booking request',
        details: error.message 
      }),
      {
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  }
};

serve(handler);
