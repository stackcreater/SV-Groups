import { db } from "@/lib/firebase-admin";
import { FolderGit2 } from "lucide-react";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function PortfolioPage() {
  let projects: any[] = [];

  try {
    const snapshot = await db.collection("projects").orderBy("createdAt", "desc").get();
    projects = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching projects:", error);
  }

  // Removed fallback placeholder projects

  return (
    <div className="min-h-screen py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Portfolio</h1>
          <p className="text-xl text-gray-400">Some of my recent work and case studies.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-neon/50 transition-colors group flex flex-col">
              <div className="relative h-48 w-full bg-white/5 flex items-center justify-center overflow-hidden">
                {project.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <FolderGit2 className="w-12 h-12 text-cyan-neon opacity-50 group-hover:scale-110 transition-transform duration-500" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-4 flex-grow">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags?.map((tag: string, i: number) => (
                    <span key={i} className="text-xs font-medium px-2 py-1 bg-white/5 text-cyan-neon border border-cyan-neon/20 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
}
