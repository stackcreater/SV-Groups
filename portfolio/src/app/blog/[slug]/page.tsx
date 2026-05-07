import { db } from "@/lib/firebase-admin";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  let post: any = null;
  const { slug } = await params;

  try {
    // First, try fetching by document ID
    const docRef = db.collection("blogs").doc(slug);
    const docSnap = await docRef.get();

    if (docSnap.exists) {
      post = { id: docSnap.id, ...docSnap.data() };
    } else {
      // If not found by ID, query by slug
      const snapshot = await db.collection("blogs").where("slug", "==", slug).limit(1).get();
      if (!snapshot.empty) {
        post = { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
      }
    }
  } catch (error) {
    console.error("Error fetching blog post:", error);
  }

  if (!post || !post.published) {
    notFound();
  }

  const createdAt = post.createdAt ? post.createdAt.toDate().toLocaleDateString() : "Unknown";

  return (
    <div className="min-h-screen py-24 bg-black">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/blog" className="text-gray-400 hover:text-white flex items-center mb-8 transition-colors w-fit">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
        </Link>

        {post.imageUrl && (
          <div className="mb-8 rounded-2xl overflow-hidden shadow-lg border border-white/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.imageUrl} alt={post.title} className="w-full h-auto object-cover max-h-[400px]" />
          </div>
        )}

        <div className="flex items-center text-sm text-cyan-neon mb-4 font-mono">
          <Calendar className="w-4 h-4 mr-2" />
          {createdAt}
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
          {post.title}
        </h1>

        <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed text-lg whitespace-pre-wrap">
          {post.content}
        </div>
      </div>
    </div>
  );
}
