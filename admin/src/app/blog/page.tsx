import { db } from "@/lib/firebase-admin";

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
    <div>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Blog Posts</h1>
          <p className="text-gray-400">Manage your blog posts here.</p>
        </div>
        <button className="bg-gradient-to-r from-cyan-neon to-purple-neon text-white font-bold py-2 px-4 rounded-lg shadow hover:opacity-90 transition-opacity">
          Add Blog Post
        </button>
      </div>

      <div className="bg-white/[0.02] border border-white/10 rounded-xl overflow-hidden">
        {blogs.length === 0 ? (
          <div className="p-8 text-center text-gray-400">No blog posts found. Write one to get started!</div>
        ) : (
          <div className="p-4 grid gap-4">
             {blogs.map((blog) => (
                <div key={blog.id} className="p-4 border border-white/10 rounded flex justify-between items-center">
                   <div className="font-bold">{blog.title}</div>
                   <div className="text-sm text-gray-500">Edit / Delete</div>
                </div>
             ))}
          </div>
        )}
      </div>
    </div>
  );
}
