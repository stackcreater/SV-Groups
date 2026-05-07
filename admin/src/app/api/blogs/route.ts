import { NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";
import * as admin from "firebase-admin";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    const blogData = {
      ...data,
      published: data.published === true || data.published === "true",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    const docRef = await db.collection("blogs").add(blogData);

    return NextResponse.json({ id: docRef.id, success: true }, { status: 201 });
  } catch (error) {
    console.error("Error creating blog post:", error);
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 });
  }
}
