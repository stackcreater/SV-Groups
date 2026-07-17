import { db } from "@/lib/firebase-admin";
import { Users, FileText, Inbox, FolderGit2 } from "lucide-react";
import { HaloStatTile, HaloChip, HaloCard } from "@/components/halo";

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

  return (
    <div className="transition-colors duration-300">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Dashboard Overview</h1>
        <p className="text-slate-600 dark:text-gray-400">Welcome back! Here's what's happening with your portfolio today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <HaloStatTile
          eyebrow="Total Page Views"
          value="1.2K"
          tone="info"
          trendChip={<HaloChip tone="info">Live</HaloChip>}
          sparkData={[5, 10, 8, 12, 18, 15, 20]}
          headerIcon={<Users className="w-4 h-4 text-slate-500" />}
        />
        <HaloStatTile
          eyebrow="Project Inquiries"
          value={inquiryCount.toString()}
          tone="success"
          trendChip={<HaloChip tone="success">New</HaloChip>}
          sparkData={[1, 2, 2, 4, 3, 5, inquiryCount]}
          headerIcon={<Inbox className="w-4 h-4 text-slate-500" />}
        />
        <HaloStatTile
          eyebrow="Active Projects"
          value={projectCount.toString()}
          tone="primary"
          trendChip={<HaloChip tone="neutral">Active</HaloChip>}
          sparkData={[projectCount, projectCount, projectCount, projectCount]}
          headerIcon={<FolderGit2 className="w-4 h-4 text-slate-500" />}
        />
        <HaloStatTile
          eyebrow="Blog Posts"
          value={blogCount.toString()}
          tone="warning"
          trendChip={<HaloChip tone="warning">Published</HaloChip>}
          sparkData={[blogCount, blogCount, blogCount, blogCount]}
          headerIcon={<FileText className="w-4 h-4 text-slate-500" />}
        />
      </div>
      
      {/* Chart placeholder using HaloCard */}
      <HaloCard variant="base" className="h-96 flex items-center justify-center dark:bg-halo-surface">
         <p className="text-slate-500 font-mono">Analytics Chart Placeholder</p>
      </HaloCard>
    </div>
  );
}
