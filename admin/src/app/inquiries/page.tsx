import { db } from "@/lib/firebase-admin";

// Force dynamic rendering so it always fetches fresh data
export const dynamic = "force-dynamic";

export default async function AdminInquiriesPage() {
  let inquiries: any[] = [];

  try {
    const snapshot = await db.collection("inquiries").orderBy("createdAt", "desc").get();
    inquiries = snapshot.docs.map((doc: any) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt ? data.createdAt.toDate().toLocaleDateString() : "Unknown",
      };
    });
  } catch (error) {
    console.error("Error fetching inquiries:", error);
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Project Inquiries</h1>
        <p className="text-gray-400">View and manage all project requests from potential clients.</p>
      </div>

      <div className="bg-white/[0.02] border border-white/10 rounded-xl overflow-hidden">
        {inquiries.length === 0 ? (
          <div className="p-8 text-center text-gray-400">No inquiries yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-300">
              <thead className="bg-black text-xs uppercase text-gray-400 border-b border-white/10">
                <tr>
                  <th className="px-6 py-4">Client</th>
                  <th className="px-6 py-4">Project Type</th>
                  <th className="px-6 py-4">Budget</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-medium text-white">
                      <div>{inquiry.name}</div>
                      <div className="text-xs text-gray-500 font-normal">{inquiry.email}</div>
                    </td>
                    <td className="px-6 py-4">{inquiry.projectType}</td>
                    <td className="px-6 py-4">{inquiry.budget}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{inquiry.createdAt}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        inquiry.status === "New" ? "bg-green-500/20 text-green-400 border border-green-500/30" : 
                        "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                      }`}>
                        {inquiry.status || "New"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {/* In a real app, clicking this would open a modal with full details */}
                      <button className="text-cyan-neon hover:underline font-medium">View Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
