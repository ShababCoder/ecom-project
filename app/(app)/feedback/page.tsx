// "use client";

// import { useEffect, useState } from "react";
// import { Loader2, Send } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { client } from "@/sanity/lib/client";
// import { ALL_BRANCHES_QUERY } from "@/lib/sanity/queries/branches";

// interface Branch {
//   _id: string;
//   title: string;
// }

// export default function FeedbackPage() {
//   const [branches, setBranches] = useState<Branch[]>([]);
//   const [loadingBranches, setLoadingBranches] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [success, setSuccess] = useState(false);

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     nature: "",
//     branch: "",
//     message: "",
//   });

//   useEffect(() => {
//     async function fetchBranches() {
//       try {
//         const data = await client.fetch(ALL_BRANCHES_QUERY);
//         setBranches(data || []);
//       } catch (error) {
//         console.error("Failed to fetch branches:", error);
//       } finally {
//         setLoadingBranches(false);
//       }
//     }

//     fetchBranches();
//   }, []);

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();

//     if (
//       !form.name ||
//       !form.email ||
//       !form.phone ||
//       !form.nature ||
//       !form.branch ||
//       !form.message
//     ) {
//       alert("Please fill in all fields.");
//       return;
//     }

//     setSubmitting(true);

//     try {
//       const res = await fetch("/api/feedback", {
//         method: "POST",
//         body: JSON.stringify(form),
//       });

//       const data = await res.json();

//       if (data.success) {
//         setSuccess(true);
//         setForm({
//           name: "",
//           email: "",
//           phone: "",
//           nature: "",
//           branch: "",
//           message: "",
//         });
//       } else {
//         alert("Something went wrong. Please try again.");
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Submission failed.");
//     } finally {
//       setSubmitting(false);
//     }
//   }

//   return (
//     <div className="mx-auto max-w-3xl px-4 py-16">
//       <div className="mb-10 text-center">
//         <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
//           Customer Feedback
//         </h1>
//         <p className="mt-3 text-zinc-600 dark:text-zinc-400">
//           We value your feedback. Please share your complaint, request, or
//           enquiry.
//         </p>
//       </div>

//       <div className="rounded-xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
//         {success && (
//           <div className="mb-6 rounded-lg bg-green-50 p-4 text-sm text-green-700 dark:bg-green-950/30 dark:text-green-400">
//             Thank you! Your feedback has been submitted successfully.
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Name */}
//           <div>
//             <label className="block text-sm font-medium mb-2">Your Name</label>
//             <input
//               type="text"
//               className="w-full rounded-md border border-zinc-300 p-3 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-900"
//               value={form.name}
//               onChange={(e) => setForm({ ...form, name: e.target.value })}
//             />
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block text-sm font-medium mb-2">Your Email</label>
//             <input
//               type="email"
//               className="w-full rounded-md border border-zinc-300 p-3 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-900"
//               value={form.email}
//               onChange={(e) => setForm({ ...form, email: e.target.value })}
//             />
//           </div>

//           {/* Phone */}
//           <div>
//             <label className="block text-sm font-medium mb-2">
//               Mobile Phone Number
//             </label>
//             <input
//               type="tel"
//               className="w-full rounded-md border border-zinc-300 p-3 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-900"
//               value={form.phone}
//               onChange={(e) => setForm({ ...form, phone: e.target.value })}
//             />
//           </div>

//           {/* Nature */}
//           <div>
//             <label className="block text-sm font-medium mb-2">Nature</label>
//             <select
//               className="w-full rounded-md border border-zinc-300 p-3 dark:border-zinc-700 dark:bg-zinc-900"
//               value={form.nature}
//               onChange={(e) => setForm({ ...form, nature: e.target.value })}
//             >
//               <option value="">Choose...</option>
//               <option value="complaint">Complaint</option>
//               <option value="request">Request</option>
//             </select>
//           </div>

//           {/* Branch */}
//           <div>
//             <label className="block text-sm font-medium mb-2">Brand</label>
//             <select
//               className="w-full rounded-md border border-zinc-300 p-3 dark:border-zinc-700 dark:bg-zinc-900"
//               value={form.branch}
//               onChange={(e) => setForm({ ...form, branch: e.target.value })}
//               disabled={loadingBranches}
//             >
//               <option value="">
//                 {loadingBranches ? "Loading branches..." : "Choose..."}
//               </option>
//               {branches.map((branch) => (
//                 <option key={branch._id} value={branch._id}>
//                   {branch.title}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Message */}
//           <div>
//             <label className="block text-sm font-medium mb-2">
//               Feedback / Suggestion / Enquiry
//             </label>
//             <textarea
//               rows={5}
//               className="w-full rounded-md border border-zinc-300 p-3 dark:border-zinc-700 dark:bg-zinc-900"
//               value={form.message}
//               onChange={(e) => setForm({ ...form, message: e.target.value })}
//             />
//           </div>

//           {/* Submit */}
//           <Button type="submit" className="w-full" disabled={submitting}>
//             {submitting ? (
//               <>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Submitting...
//               </>
//             ) : (
//               <>
//                 <Send className="mr-2 h-4 w-4" />
//                 Submit Feedback
//               </>
//             )}
//           </Button>
//         </form>
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { client } from "@/sanity/lib/client";
import { ALL_BRANCHES_QUERY } from "@/lib/sanity/queries/branches";
import { toast } from "sonner";

interface Branch {
  _id: string;
  title: string;
}

export default function FeedbackPage() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loadingBranches, setLoadingBranches] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    nature: "",
    branch: "",
    message: "",
  });

  useEffect(() => {
    async function fetchBranches() {
      const data = await client.fetch(ALL_BRANCHES_QUERY);
      setBranches(data || []);
      setLoadingBranches(false);
    }
    fetchBranches();
  }, []);

  function validateEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validatePhone(phone: string) {
    return /^[0-9+]{10,15}$/.test(phone);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validateEmail(form.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (!validatePhone(form.phone)) {
      toast.error("Please enter a valid mobile number.");
      return;
    }

    if (!form.name || !form.nature || !form.branch || !form.message) {
      toast.error("All fields are required.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Feedback submitted successfully!");
        setForm({
          name: "",
          email: "",
          phone: "",
          nature: "",
          branch: "",
          message: "",
        });
      } else {
        toast.error("Something went wrong.");
      }
    } catch {
      toast.error("Submission failed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="mb-8 text-3xl font-bold text-center">Customer Feedback</h1>

      <div className="rounded-xl border p-8 shadow-sm dark:bg-zinc-950">
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            className="w-full border p-3 rounded-md"
            placeholder="Your Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            type="email"
            className="w-full border p-3 rounded-md"
            placeholder="Your Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="tel"
            className="w-full border p-3 rounded-md"
            placeholder="Mobile Phone Number"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <select
            className="w-full border p-3 rounded-md"
            value={form.nature}
            onChange={(e) => setForm({ ...form, nature: e.target.value })}
          >
            <option value="">Choose Nature...</option>
            <option value="complaint">Complaint</option>
            <option value="request">Request</option>
          </select>

          <select
            className="w-full border p-3 rounded-md"
            value={form.branch}
            onChange={(e) => setForm({ ...form, branch: e.target.value })}
          >
            <option value="">
              {loadingBranches ? "Loading branches..." : "Choose Branch..."}
            </option>
            {branches.map((b) => (
              <option key={b._id} value={b._id}>
                {b.title}
              </option>
            ))}
          </select>

          <textarea
            rows={5}
            className="w-full border p-3 rounded-md"
            placeholder="Feedback / Suggestion / Enquiry"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />

          <Button type="submit" disabled={submitting} className="w-full">
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Submit Feedback
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
