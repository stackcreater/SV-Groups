import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // 1. Save to Firestore
    const inquiryRef = await db.collection("inquiries").add({
      ...data,
      status: "New",
      createdAt: new Date(),
    });

    // 2. Send Email Notification
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER || "stackcreater.dev@gmail.com",
        pass: process.env.EMAIL_PASS || "your_app_password", // User needs to set this in .env
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER || "stackcreater.dev@gmail.com",
      to: process.env.EMAIL_USER || "stackcreater.dev@gmail.com",
      subject: `New Project Inquiry from ${data.name} - ${data.projectType}`,
      html: `
        <h2>New Project Inquiry</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Company:</strong> ${data.company}</p>
        <hr/>
        <p><strong>Project Type:</strong> ${data.projectType}</p>
        <p><strong>Problem Statement:</strong> ${data.problemStatement}</p>
        <p><strong>Target Audience:</strong> ${data.targetAudience}</p>
        <p><strong>Reference URL:</strong> ${data.referenceUrl}</p>
        <hr/>
        <p><strong>Tech Stack:</strong> ${Array.isArray(data.techStack) ? data.techStack.join(', ') : data.techStack}</p>
        <p><strong>Database:</strong> ${data.database}</p>
        <p><strong>DB Usage:</strong> ${data.dbUsage}</p>
        <p><strong>Need Auth:</strong> ${data.needAuth}</p>
        <p><strong>Need Payment:</strong> ${data.needPayment}</p>
        <p><strong>Need Admin:</strong> ${data.needAdmin}</p>
        <hr/>
        <p><strong>Timeline:</strong> ${data.timeline}</p>
        <p><strong>Budget:</strong> ${data.budget}</p>
        <hr/>
        <p><strong>Additional Features:</strong> ${data.features}</p>
        <p><strong>Found via:</strong> ${data.foundVia}</p>
      `,
    };

    // We don't await the email so we can return fast to the user,
    // or we await it to ensure it sends. Let's await it.
    // If the credentials are not valid (placeholder), it will throw an error.
    // To prevent the form from failing just because email isn't set up yet, we'll catch it.
    try {
      if (process.env.EMAIL_PASS) {
        await transporter.sendMail(mailOptions);
      } else {
        console.log("Email skipped: EMAIL_PASS not set.");
      }
    } catch (emailError) {
      console.error("Failed to send email", emailError);
    }

    return NextResponse.json({ success: true, id: inquiryRef.id }, { status: 200 });
  } catch (error) {
    console.error("Inquiry API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
