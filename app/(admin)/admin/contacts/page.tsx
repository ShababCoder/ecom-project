"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ContactsPage() {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/admin/contacts")
      .then((res) => res.json())
      .then((data) => setMessages(data.messages));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Contact Messages</h1>
        <p className="text-zinc-500">Customer inquiries & branch messages</p>
      </div>

      <div className="space-y-4">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className="rounded-xl border bg-white p-6 shadow-sm dark:bg-zinc-900"
          >
            <div className="flex justify-between">
              <div>
                <h2 className="font-semibold">{msg.name}</h2>
                <p className="text-sm text-zinc-500">{msg.phone}</p>
              </div>
              <Badge variant="outline">{msg.branch?.title}</Badge>
            </div>

            <p className="mt-4 text-sm text-zinc-700 dark:text-zinc-300">
              {msg.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
