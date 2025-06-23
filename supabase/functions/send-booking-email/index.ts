
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

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

    // For now, we'll just log the booking request
    // In a real implementation, you would:
    // 1. Send an email to the service provider
    // 2. Send a confirmation email to the customer
    // 3. Store the booking in the database
    
    const emailContent = `
      New Booking Request for ${booking.itemName}
      
      Customer Details:
      - Name: ${booking.customerName}
      - Email: ${booking.customerEmail}
      - Phone: ${booking.customerPhone}
      - Preferred Date: ${booking.preferredDate}
      
      ${booking.message ? `Message: ${booking.message}` : ''}
      
      Item Type: ${booking.itemType}
      ${booking.price ? `Price: $${booking.price}` : ''}
      ${booking.contact ? `Provider Contact: ${booking.contact}` : ''}
    `;
    
    console.log('Email content:', emailContent);

    // Simulate email sending success
    await new Promise(resolve => setTimeout(resolve, 1000));

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Booking request processed successfully' 
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
