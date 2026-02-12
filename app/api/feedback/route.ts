// import { client } from "@/sanity/lib/client";

// export async function POST(req: Request) {
//   const data = await req.json();

//   const token = process.env.SANITY_API_WRITE_TOKEN;
//   if (!token) {
//     return Response.json({ success: false }, { status: 500 });
//   }

//   const writeClient = client.withConfig({ token, useCdn: false });

//   await writeClient.create({
//     _type: "feedback",
//     ...data,
//     createdAt: new Date().toISOString(),
//   });

//   return Response.json({ success: true });
// }

import { client } from "@/sanity/lib/client";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const data = await req.json();

  const token = process.env.SANITY_API_WRITE_TOKEN;
  const writeClient = client.withConfig({ token, useCdn: false });

  const doc = await writeClient.create({
    _type: "feedback",
    ...data,
    status: "pending",
    createdAt: new Date().toISOString(),
  });

  await resend.emails.send({
    from: "Feedback <onboarding@resend.dev>",
    to: process.env.ADMIN_EMAIL!,
    subject: "New Customer Feedback",
    html: `
      <h2>New Feedback Received</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Nature:</strong> ${data.nature}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message}</p>
    `,
  });

  return Response.json({ success: true });
}
