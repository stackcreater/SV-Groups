"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function EditBlogForm({ blog }: { blog: any }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title"),
      slug: formData.get("slug"),
      excerpt: formData.get("excerpt"),
      content: formData.get("content"),
      imageUrl: formData.get("imageUrl"),
      published: formData.get("published") === "on",
    };

    try {
      const res = await fetch(`/api/blogs?id=${blog.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to update blog post");

      router.push("/blog");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link href="/blog" className="text-gray-400 hover:text-white flex items-center mb-4 transition-colors w-fit">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog Posts
        </Link>
        <h1 className="text-3xl font-bold text-white">Edit Blog Post</h1>
      </div>

      <div className="bg-white/[0.02] border border-white/10 rounded-xl p-8">
        {error && (
          <div className="bg-red-500/20 text-red-400 p-4 rounded-lg mb-6 border border-red-500/30">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Post Title *</label>
              <input
                type="text"
                name="title"
                required
                defaultValue={blog.title}
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-neon focus:ring-1 focus:ring-cyan-neon"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Slug (URL friendly) *</label>
              <input
                type="text"
                name="slug"
                required
                defaultValue={blog.slug}
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-neon focus:ring-1 focus:ring-cyan-neon"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Excerpt</label>
            <textarea
              name="excerpt"
              rows={2}
              defaultValue={blog.excerpt}
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-neon focus:ring-1 focus:ring-cyan-neon"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Cover Image URL</label>
            <input
              type="url"
              name="imageUrl"
              defaultValue={blog.imageUrl}
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-neon focus:ring-1 focus:ring-cyan-neon"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Content</label>
            <textarea
              name="content"
              required
              rows={12}
              defaultValue={blog.content}
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-neon focus:ring-1 focus:ring-cyan-neon font-mono text-sm"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="published"
              id="published"
              defaultChecked={blog.published}
              className="w-5 h-5 rounded border-gray-600 bg-gray-800 text-cyan-neon focus:ring-cyan-neon focus:ring-offset-gray-900"
            />
            <label htmlFor="published" className="ml-3 text-sm font-medium text-gray-300">
              Published
            </label>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-gradient-to-r from-cyan-neon to-purple-neon text-white font-bold py-3 px-8 rounded-lg shadow hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
