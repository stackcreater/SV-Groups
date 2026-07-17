import { db } from "@/lib/firebase-admin";
import Link from "next/link";
import { FileText, Calendar } from "lucide-react";
import { BlogGrid, BlogCard } from "@/components/MagicBentoWrappers";

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
    <div className="relative min-h-screen py-24 bg-background transition-colors duration-300 overflow-hidden">
      {/* Abstract Background */}
      <div className="absolute inset-0 z-0 opacity-40 dark:opacity-80 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-cyan-neon/15 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] animate-blob"></div>
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-purple-neon/15 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">Blog</h1>
          <p className="text-xl text-slate-600 dark:text-gray-400">Thoughts, tutorials, and insights on web & mobile development.</p>
        </div>

        <BlogGrid>
          {posts.map((post) => (
            <Link href={`/blog/${post.slug || post.id}`} key={post.id} className="block group">
              <BlogCard>
                
                <div className="md:w-1/3 relative h-64 md:h-auto bg-muted flex items-center justify-center overflow-hidden">
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
                  <div className="flex items-center text-xs text-slate-500 dark:text-gray-500 mb-3 font-mono">
                    <Calendar className="w-4 h-4 mr-2" />
                    {post.createdAt}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-cyan-600 dark:group-hover:text-cyan-neon transition-colors">{post.title}</h3>
                  <p className="text-slate-600 dark:text-gray-400 leading-relaxed">{post.excerpt}</p>
                  
                  <div className="mt-6 text-sm font-semibold text-purple-600 dark:text-purple-neon group-hover:underline">
                    Read More →
                  </div>
                </div>

              </BlogCard>
            </Link>
          ))}
        </BlogGrid>
        
      </div>
    </div>
  );
}
