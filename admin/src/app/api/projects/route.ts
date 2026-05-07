import { NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";
import * as admin from "firebase-admin";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    const projectData = {
      ...data,
      tags: data.tags ? data.tags.split(",").map((t: string) => t.trim()).filter(Boolean) : [],
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    const docRef = await db.collection("projects").add(projectData);

    return NextResponse.json({ id: docRef.id, success: true }, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
