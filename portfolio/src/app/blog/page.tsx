import { db } from "@/lib/firebase-admin";
import Link from "next/link";
import { FileText, Calendar } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  let posts: any[] = [];

  try {
    const snapshot = await db.collection("blogs").orderBy("createdAt", "desc").get();
    posts = snapshot.docs
      .map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt ? data.createdAt.toDate().toLocaleDateString() : "Unknown",
        };
      })
      .filter((post: any) => post.published === true);
  } catch (error) {
    console.error("Error fetching blogs:", error);
  }

  // Removed fallback placeholder posts

  return (
    <div className="min-h-screen py-24 bg-black">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Blog</h1>
          <p className="text-xl text-gray-400">Thoughts, tutorials, and insights on web & mobile development.</p>
        </div>

        <div className="space-y-10">
          {posts.map((post) => (
            <Link href={`/blog/${post.slug || post.id}`} key={post.id} className="block group">
              <div className="bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden hover:bg-white/[0.04] transition-colors flex flex-col md:flex-row">
                
                <div className="md:w-1/3 relative h-64 md:h-auto bg-white/5 flex items-center justify-center overflow-hidden">
                  {post.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img 
                      src={post.imageUrl} 
                      alt={post.title} 
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <FileText className="w-12 h-12 text-purple-neon opacity-50 group-hover:scale-110 transition-transform duration-500" />
                  )}
                </div>
                
                <div className="p-8 md:w-2/3 flex flex-col justify-center">
                  <div className="flex items-center text-xs text-gray-500 mb-3 font-mono">
                    <Calendar className="w-4 h-4 mr-2" />
                    {post.createdAt}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-neon transition-colors">{post.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{post.excerpt}</p>
                  
                  <div className="mt-6 text-sm font-semibold text-purple-neon group-hover:underline">
                    Read More →
                  </div>
                </div>

              </div>
            </Link>
          ))}
        </div>
        
      </div>
    </div>
  );
}
