"use server";

import { auth } from "@clerk/nextjs/server";
import { client } from "@/sanity/lib/client";
import { nanoid } from "nanoid";

interface OrderInput {
  customerName: string;
  phone: string;
  address: string;
  city: string;
  notes?: string;
  paymentMethod: "bank_transfer" | "cod";
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
  }[];
}

export async function createOrder(data: OrderInput) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const total = data.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const order = await client.create({
    _type: "order",
    orderNumber: nanoid(8).toUpperCase(),
    clerkUserId: userId,
    customerName: data.customerName,
    phone: data.phone,
    address: data.address,
    city: data.city,
    notes: data.notes ?? "",
    items: data.items,
    total,
    paymentMethod: data.paymentMethod,
    paymentStatus: data.paymentMethod === "cod" ? "pending" : "pending",
    status: "pending",
    createdAt: new Date().toISOString(),
  });

  return order;
}
