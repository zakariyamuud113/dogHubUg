
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface DogReportEmailRequest {
  report: {
    type: 'lost' | 'found';
    dog_name?: string;
    breed?: string;
    age?: number;
    gender?: string;
    size?: string;
    color?: string;
    description?: string;
    last_seen_date?: string;
    last_seen_location?: string;
    contact_name: string;
    contact_phone: string;
    contact_email: string;
    reward_amount?: number;
    is_urgent?: boolean;
  };
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { report }: DogReportEmailRequest = await req.json();

    const reportType = report.type === 'lost' ? 'Lost Dog' : 'Found Dog';
    const subject = `${reportType} Report: ${report.dog_name || 'Unnamed Dog'}`;

    const emailHtml = `
      <h1>${reportType} Report Submitted</h1>
      
      <h2>Contact Information:</h2>
      <p><strong>Name:</strong> ${report.contact_name}</p>
      <p><strong>Phone:</strong> ${report.contact_phone}</p>
      <p><strong>Email:</strong> ${report.contact_email}</p>
      
      <h2>Dog Information:</h2>
      <p><strong>Name:</strong> ${report.dog_name || 'Unknown'}</p>
      <p><strong>Breed:</strong> ${report.breed || 'Unknown'}</p>
      <p><strong>Age:</strong> ${report.age ? `${report.age} years old` : 'Unknown'}</p>
      <p><strong>Gender:</strong> ${report.gender || 'Unknown'}</p>
      <p><strong>Size:</strong> ${report.size || 'Unknown'}</p>
      <p><strong>Color:</strong> ${report.color || 'Not specified'}</p>
      
      <h2>${report.type === 'lost' ? 'Last Seen' : 'Found'} Details:</h2>
      <p><strong>Date:</strong> ${report.last_seen_date || 'Not specified'}</p>
      <p><strong>Location:</strong> ${report.last_seen_location || 'Not specified'}</p>
      
      ${report.description ? `<h2>Description:</h2><p>${report.description}</p>` : ''}
      
      ${report.reward_amount && report.reward_amount > 0 ? `<p><strong>Reward:</strong> $${report.reward_amount}</p>` : ''}
      
      ${report.is_urgent ? '<p><strong style="color: red;">⚠️ URGENT REPORT</strong></p>' : ''}
      
      <hr>
      <p>This report has been posted publicly on DOGHub to help spread awareness.</p>
      <p>Thank you for helping keep our community's dogs safe!</p>
    `;

    // Send confirmation email to the reporter
    const reporterEmail = await resend.emails.send({
      from: "DOGHub <onboarding@resend.dev>",
      to: [report.contact_email],
      subject: `Confirmation: ${subject}`,
      html: `
        <h1>Report Confirmation</h1>
        <p>Thank you for submitting your ${report.type} dog report. Your report has been successfully posted and is now visible to the public.</p>
        ${emailHtml}
      `,
    });

    // Send notification to admin
    const adminEmail = await resend.emails.send({
      from: "DOGHub <onboarding@resend.dev>",
      to: ["nahurirajoab@gmail.com"],
      subject: `New ${reportType} Report`,
      html: `
        <h1>New ${reportType} Report Received</h1>
        <p>A new ${report.type} dog report has been submitted on DOGHub.</p>
        ${emailHtml}
      `,
    });

    console.log("Dog report emails sent successfully:", { reporterEmail, adminEmail });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending dog report email:", error);
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
