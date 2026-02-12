import { client } from "@/sanity/lib/client";
import { ALL_NOTICES_QUERY } from "@/lib/sanity/queries/notice";

export default async function NoticePage() {
  const notices = await client.fetch(ALL_NOTICES_QUERY);

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="mb-10 text-3xl font-bold">Notice Board</h1>

      <div className="space-y-6">
        {notices.map((notice: any) => (
          <div
            key={notice._id}
            className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950"
          >
            <h2 className="text-lg font-semibold mb-3">{notice.title}</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {notice.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
