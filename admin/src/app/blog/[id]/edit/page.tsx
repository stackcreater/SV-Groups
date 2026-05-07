import { db } from "@/lib/firebase-admin";
import EditBlogForm from "@/components/EditBlogForm";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function EditBlogPage({ params }: { params: { id: string } }) {
  try {
    const { id } = await params;
    const doc = await db.collection("blogs").doc(id).get();
    
    if (!doc.exists) {
      notFound();
    }

    const data = doc.data() as any;
    const blog = { 
      id: doc.id, 
      ...data,
      createdAt: data.createdAt ? data.createdAt.toDate().toISOString() : null
    };
    
    return <EditBlogForm blog={blog} />;
  } catch (error) {
    console.error("Error fetching blog for edit:", error);
    return <div>Error loading blog post.</div>;
  }
}
