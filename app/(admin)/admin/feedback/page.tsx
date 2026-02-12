// import { client } from "@/sanity/lib/client";

// const FEEDBACK_QUERY = `
//   *[_type == "feedback"] | order(createdAt desc){
//     _id,
//     name,
//     email,
//     phone,
//     nature,
//     message,
//     status,
//     createdAt,
//     branch->{
//       title
//     }
//   }
// `;

// export default async function AdminFeedbackPage() {
//   const feedbacks = await client.fetch(FEEDBACK_QUERY);

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-6">Customer Feedback</h1>

//       <div className="space-y-6">
//         {feedbacks.map((item: any) => (
//           <div key={item._id} className="border p-6 rounded-lg">
//             <div className="flex justify-between mb-2">
//               <h2 className="font-semibold">{item.name}</h2>
//               <span
//                 className={`text-xs px-3 py-1 rounded-full ${
//                   item.status === "resolved"
//                     ? "bg-green-100 text-green-600"
//                     : "bg-amber-100 text-amber-600"
//                 }`}
//               >
//                 {item.status}
//               </span>
//             </div>

//             <p className="text-sm text-zinc-500">{item.branch?.title}</p>

//             <p className="mt-2 text-sm">{item.message}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AdminFeedbackPage() {
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const limit = 5;

  useEffect(() => {
    fetchFeedbacks();
  }, [page]);

  async function fetchFeedbacks() {
    const res = await fetch(`/api/admin/feedback?page=${page}&limit=${limit}`);
    const data = await res.json();
    setFeedbacks(data.feedbacks);
  }

  async function toggleStatus(id: string, currentStatus: string) {
    const newStatus = currentStatus === "pending" ? "resolved" : "pending";

    const res = await fetch("/api/admin/feedback/update-status", {
      method: "PATCH",
      body: JSON.stringify({ id, status: newStatus }),
    });

    const data = await res.json();

    if (data.success) {
      toast.success("Status updated");
      fetchFeedbacks();
    } else {
      toast.error("Update failed");
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Customer Feedback</h1>

      <div className="space-y-6">
        {feedbacks.map((item) => (
          <div key={item._id} className="border p-6 rounded-lg">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold">{item.name}</h2>

              <button
                onClick={() => toggleStatus(item._id, item.status)}
                className={`px-3 py-1 text-xs rounded-full ${
                  item.status === "resolved"
                    ? "bg-green-100 text-green-600"
                    : "bg-amber-100 text-amber-600"
                }`}
              >
                {item.status}
              </button>
            </div>

            <p className="text-sm text-zinc-500">{item.branch?.title}</p>

            <p className="mt-2 text-sm">{item.message}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex gap-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 border rounded"
        >
          Previous
        </button>

        <button
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 border rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}
