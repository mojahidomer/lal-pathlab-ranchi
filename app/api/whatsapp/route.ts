

import { NextRequest, NextResponse } from 'next/server';
import twilio from "twilio";
import Customer from '@/dbModels/appointments/basicDetails';
import connectDB from '@/dbConfig/db';
// export const dynamic = "force-dynamic";
// export const runtime = "nodejs";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);


export async function POST(request: NextRequest) {
    try {
        await connectDB()
        const { name, message, phoneNumber } = await request.json();
      
        // Validate required fields
        if (!name || !message || !phoneNumber) {
            return NextResponse.json(
                { error: "All fields including phone number are required" },
                { status: 400 }
            );
        }
        const customer = new Customer({
            fullName:name,
            phoneNumber,
            details:message,
          });
      
          await customer.save();
        // return NextResponse.json({ name, message, phoneNumber });

        // Format the WhatsApp message
        const whatsappMessage = `
    🎉 *New Query for an appointment*
    
    👤 *Name:* ${name}
    📞 *Phone Number:* ${phoneNumber}
    
    💬 *Message:*
    ${message}
    
    📅 *Submitted:* ${new Date().toLocaleString()}
        `.trim();

        // Send WhatsApp message using Twilio
        const twilioMessage = await client.messages.create({
            body: whatsappMessage,
            from: `whatsapp:${process.env.TWILIO_WHATSAPP_FROM}`, // Your Twilio WhatsApp number
            to: `whatsapp:${process.env.ADMIN_WHATSAPP_NUMBER}`, // Admin WhatsApp number
        });

        // Send confirmation WhatsApp to user (optional)
        const userConfirmationMessage = `
    Hi ${name}! 👋
    
    Thank you for reaching out to us! We've received your inquiry about *${'interest'}* and our team will get back to you within 24 hours.
    
    We're excited to learn more about your project at ${'company'}!
    
    Best regards,
    The Team
        `.trim();

        await client.messages.create({
            body: userConfirmationMessage,
            from: `whatsapp:${process.env.TWILIO_WHATSAPP_FROM}`,
            to: `whatsapp:${phoneNumber}`,
        });

        return NextResponse.json(
            {
                message: "WhatsApp messages sent successfully",
                messageSid: twilioMessage.sid
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error sending WhatsApp message:", error);
        return NextResponse.json(
            { error: "Failed to send WhatsApp message" },
            { status: 500 }
        );
    }
}