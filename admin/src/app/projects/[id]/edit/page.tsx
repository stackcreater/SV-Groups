import { db } from "@/lib/firebase-admin";
import EditProjectForm from "@/components/EditProjectForm";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function EditProjectPage({ params }: { params: { id: string } }) {
  try {
    const { id } = await params;
    const doc = await db.collection("projects").doc(id).get();
    
    if (!doc.exists) {
      notFound();
    }

    const data = doc.data() as any;
    const project = { 
      id: doc.id, 
      ...data,
      createdAt: data.createdAt ? data.createdAt.toDate().toISOString() : null
    };
    
    return <EditProjectForm project={project} />;
  } catch (error) {
    console.error("Error fetching project for edit:", error);
    return <div>Error loading project.</div>;
  }
}
