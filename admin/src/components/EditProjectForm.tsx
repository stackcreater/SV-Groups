"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function EditProjectForm({ project }: { project: any }) {
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
      const res = await fetch(`/api/projects?id=${project.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to update project");

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
        <h1 className="text-3xl font-bold text-white">Edit Project</h1>
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
              defaultValue={project.title}
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-neon focus:ring-1 focus:ring-cyan-neon"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description *</label>
            <textarea
              name="description"
              required
              rows={4}
              defaultValue={project.description}
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-neon focus:ring-1 focus:ring-cyan-neon"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Tags</label>
            <input
              type="text"
              name="tags"
              defaultValue={project.tags ? project.tags.join(", ") : ""}
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-neon focus:ring-1 focus:ring-cyan-neon"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Image URL</label>
            <input
              type="url"
              name="imageUrl"
              defaultValue={project.imageUrl}
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-neon focus:ring-1 focus:ring-cyan-neon"
            />
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
