import { client } from "@/sanity/lib/client";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 5);

  const start = (page - 1) * limit;
  const end = start + limit;

  const query = `
    *[_type == "feedback"] | order(createdAt desc)[${start}...${end}]{
      _id,
      name,
      email,
      phone,
      nature,
      message,
      status,
      branch->{title}
    }
  `;

  const feedbacks = await client.fetch(query);

  return Response.json({ feedbacks });
}
