import { db } from "@/lib/firebase-admin";
import { Users, FileText, Inbox, FolderGit2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  let inquiryCount = 0;
  let projectCount = 0;
  let blogCount = 0;
  
  try {
    const [inquiriesSnapshot, projectsSnapshot, blogsSnapshot] = await Promise.all([
      db.collection("inquiries").count().get(),
      db.collection("projects").count().get(),
      db.collection("blogs").count().get(),
    ]);
    inquiryCount = inquiriesSnapshot.data().count;
    projectCount = projectsSnapshot.data().count;
    blogCount = blogsSnapshot.data().count;
  } catch (error) {
    console.error("Error fetching stats:", error);
  }

  const stats = [
    { name: "Total Page Views", value: "0", icon: Users, color: "text-blue-500 dark:text-blue-400" },
    { name: "Project Inquiries", value: inquiryCount.toString(), icon: Inbox, color: "text-cyan-600 dark:text-cyan-neon" },
    { name: "Active Projects", value: projectCount.toString(), icon: FolderGit2, color: "text-purple-600 dark:text-purple-neon" },
    { name: "Blog Posts", value: blogCount.toString(), icon: FileText, color: "text-green-600 dark:text-green-400" },
  ];

  return (
    <div className="transition-colors duration-300">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Dashboard Overview</h1>
        <p className="text-slate-600 dark:text-gray-400">Welcome back! Here's what's happening with your portfolio today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-card text-card-foreground border border-border rounded-xl p-6 flex items-center shadow-sm dark:shadow-none transition-colors duration-300">
            <div className={`p-4 rounded-full bg-muted border border-border mr-4 ${stat.color} transition-colors duration-300`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-gray-400">{stat.name}</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Chart placeholder */}
      <div className="bg-card text-card-foreground border border-border rounded-xl p-6 h-96 flex items-center justify-center transition-colors duration-300 shadow-sm dark:shadow-none">
         <p className="text-slate-500">Analytics Chart Placeholder</p>
      </div>
    </div>
  );
}
