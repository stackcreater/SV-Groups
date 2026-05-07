"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewProjectPage() {
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
      description: formData.get("description"),
      tags: formData.get("tags"),
      imageUrl: formData.get("imageUrl"),
    };

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to create project");

      router.push("/projects");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <Link href="/projects" className="text-gray-400 hover:text-white flex items-center mb-4 transition-colors w-fit">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Projects
        </Link>
        <h1 className="text-3xl font-bold text-white">Add New Project</h1>
      </div>

      <div className="bg-white/[0.02] border border-white/10 rounded-xl p-8">
        {error && (
          <div className="bg-red-500/20 text-red-400 p-4 rounded-lg mb-6 border border-red-500/30">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Project Title *</label>
            <input
              type="text"
              name="title"
              required
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-neon focus:ring-1 focus:ring-cyan-neon"
              placeholder="e.g., E-Commerce Dashboard"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description *</label>
            <textarea
              name="description"
              required
              rows={4}
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-neon focus:ring-1 focus:ring-cyan-neon"
              placeholder="Briefly describe the project..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Tags</label>
            <input
              type="text"
              name="tags"
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-neon focus:ring-1 focus:ring-cyan-neon"
              placeholder="e.g., Next.js, Tailwind, Firebase (comma separated)"
            />
            <p className="text-xs text-gray-500 mt-2">Separate tags with commas.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Image URL</label>
            <input
              type="url"
              name="imageUrl"
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-neon focus:ring-1 focus:ring-cyan-neon"
              placeholder="https://example.com/image.jpg"
            />
            <p className="text-xs text-gray-500 mt-2">Provide a public URL for the project thumbnail.</p>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-gradient-to-r from-cyan-neon to-purple-neon text-white font-bold py-3 px-8 rounded-lg shadow hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isLoading ? "Saving..." : "Save Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
