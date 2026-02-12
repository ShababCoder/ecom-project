import { client } from "@/sanity/lib/client";
import { ALL_BRANCHES_QUERY } from "@/lib/sanity/queries/branches";

export default async function ContactPage() {
  const branches = await client.fetch(ALL_BRANCHES_QUERY);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="mb-10 text-3xl font-bold">Our Branches</h1>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {branches.map((branch: any) => (
          <div
            key={branch._id}
            className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
          >
            <h2 className="text-lg font-semibold mb-4">{branch.title}</h2>

            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
              {branch.location}
            </p>

            <div className="space-y-1">
              {branch.phoneNumbers.map((phone: string, index: number) => (
                <p key={index} className="text-sm font-medium">
                  {phone}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
