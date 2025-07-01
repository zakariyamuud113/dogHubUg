
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface DonationNotificationRequest {
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
    const donationData: DonationNotificationRequest = await req.json();

    // Send email to admin (you)
    const adminEmailResponse = await resend.emails.send({
      from: "DOGHub Donations <onboarding@resend.dev>",
      to: ["nahurirajoab@gmail.com"], // Your email
      subject: `New Donation Received - UGX ${donationData.amount.toLocaleString()}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #f97316;">New Donation Received!</h1>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #333; margin-top: 0;">Donation Details:</h2>
            <ul style="list-style: none; padding: 0;">
              <li><strong>Amount:</strong> UGX ${donationData.amount.toLocaleString()}</li>
              <li><strong>Donor Email:</strong> ${donationData.donor_email}</li>
              ${donationData.donor_name && !donationData.is_anonymous ? `<li><strong>Donor Name:</strong> ${donationData.donor_name}</li>` : ''}
              ${donationData.is_anonymous ? '<li><strong>Anonymous:</strong> Yes</li>' : ''}
              ${donationData.message ? `<li><strong>Message:</strong> ${donationData.message}</li>` : ''}
            </ul>
          </div>
          
          <p>This donation was processed through the DOGHub platform.</p>
          
          <p>Best regards,<br>DOGHub System</p>
        </div>
      `,
    });

    console.log("Admin donation notification sent:", adminEmailResponse);

    return new Response(JSON.stringify(adminEmailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending donation notification:", error);
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
