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
    <div className="relative min-h-screen py-24 bg-background transition-colors duration-300 overflow-hidden">
      {/* Abstract Background */}
      <div className="absolute inset-0 z-0 opacity-40 dark:opacity-80 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-cyan-neon/15 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] animate-blob"></div>
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-purple-neon/15 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">Portfolio</h1>
          <p className="text-xl text-slate-600 dark:text-gray-400">Some of my recent work and case studies.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="bg-card text-card-foreground border border-border rounded-2xl overflow-hidden hover:border-cyan-neon/50 transition-colors shadow-sm dark:shadow-none group flex flex-col">
              <div className="relative h-48 w-full bg-muted flex items-center justify-center overflow-hidden">
                {project.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <FolderGit2 className="w-12 h-12 text-cyan-600 dark:text-cyan-neon opacity-50 group-hover:scale-110 transition-transform duration-500" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{project.title}</h3>
                <p className="text-slate-600 dark:text-gray-400 text-sm mb-4 flex-grow">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags?.map((tag: string, i: number) => (
                    <span key={i} className="text-xs font-medium px-2 py-1 bg-muted text-cyan-600 dark:text-cyan-neon border border-cyan-200 dark:border-cyan-neon/20 rounded">
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
