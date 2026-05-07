import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // 1. Save to Firestore
    const contactRef = await db.collection("contacts").add({
      ...data,
      read: false,
      createdAt: new Date(),
    });

    // 2. Send Email Notification
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER || "stackcreater.dev@gmail.com",
        pass: process.env.EMAIL_PASS || "your_app_password",
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER || "stackcreater.dev@gmail.com",
      to: process.env.EMAIL_USER || "stackcreater.dev@gmail.com",
      subject: `New Contact Message from ${data.name}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <hr/>
        <p><strong>Message:</strong></p>
        <p>${data.message.replace(/\n/g, '<br/>')}</p>
      `,
    };

    try {
      if (process.env.EMAIL_PASS) {
        await transporter.sendMail(mailOptions);
      }
    } catch (emailError) {
      console.error("Failed to send email", emailError);
    }

    return NextResponse.json({ success: true, id: contactRef.id }, { status: 200 });
  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
