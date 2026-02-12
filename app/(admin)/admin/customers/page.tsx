"use client";

import { useEffect, useState } from "react";
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/admin/customers")
      .then((res) => res.json())
      .then((data) => setCustomers(data.customers));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Customers</h1>
        <p className="text-zinc-500">Registered users overview</p>
      </div>

      <div className="rounded-xl border bg-white p-4 dark:bg-zinc-900">
        <Table>
          <TableBody>
            {customers.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.orderCount} Orders</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
