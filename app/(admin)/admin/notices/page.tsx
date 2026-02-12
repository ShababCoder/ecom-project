"use client";

import { useEffect, useState } from "react";
import { Bell, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NoticesPage() {
  const [notices, setNotices] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/admin/notices")
      .then((res) => res.json())
      .then((data) => setNotices(data.notices));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Notices</h1>
          <p className="text-zinc-500">Manage store announcements</p>
        </div>

        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Notice
        </Button>
      </div>

      <div className="space-y-4">
        {notices.map((notice) => (
          <div
            key={notice._id}
            className="rounded-xl border bg-white p-6 shadow-sm dark:bg-zinc-900"
          >
            <h2 className="font-semibold text-lg">{notice.title}</h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
              {notice.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
