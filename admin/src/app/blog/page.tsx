import { db } from "@/lib/firebase-admin";
import Link from "next/link";
import DeleteButton from "@/components/DeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  let blogs: any[] = [];

  try {
    const snapshot = await db.collection("blogs").orderBy("createdAt", "desc").get();
    blogs = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching blogs:", error);
  }

  return (
    <div className="transition-colors duration-300">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Blog Posts</h1>
          <p className="text-slate-600 dark:text-gray-400">Manage your blog posts here.</p>
        </div>
        <Link href="/blog/new" className="bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-neon dark:to-purple-neon text-white font-bold py-2 px-4 rounded-lg shadow hover:opacity-90 transition-opacity">
          Add Blog Post
        </Link>
      </div>

      <div className="bg-card text-card-foreground border border-border rounded-xl overflow-hidden shadow-sm dark:shadow-none transition-colors duration-300">
        {blogs.length === 0 ? (
          <div className="p-8 text-center text-slate-500 dark:text-gray-400">No blog posts found. Write one to get started!</div>
        ) : (
           <div className="p-4 grid gap-4">
             {blogs.map((blog) => (
                <div key={blog.id} className="p-4 border border-border rounded flex justify-between items-center">
                   <div className="font-bold text-slate-900 dark:text-white">{blog.title}</div>
                   <div className="flex items-center text-sm">
                     <Link href={`/blog/${blog.id}/edit`} className="text-cyan-600 dark:text-cyan-neon hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors mr-4">
                       Edit
                     </Link>
                     <DeleteButton id={blog.id} type="blogs" />
                   </div>
                </div>
             ))}
           </div>
        )}
      </div>
    </div>
  );
}
