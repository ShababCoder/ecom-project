// import { client } from "@/sanity/lib/client";

// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url);

//   const page = Number(searchParams.get("page") || 1);
//   const limit = Number(searchParams.get("limit") || 10);
//   const search = searchParams.get("search") || "";

//   const start = (page - 1) * limit;
//   const end = start + limit;

//   const query = `
//     *[_type == "category" && title match "*${search}*"]
//     | order(title asc)[${start}...${end}]{
//       _id,
//       title,
//       image{asset->{url}},
//       "productCount": count(*[_type=="product" && references(^._id)])
//     }
//   `;

//   const categories = await client.fetch(query);

//   return Response.json({ categories });
// }


import { client } from "@/sanity/lib/client";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 10);
  const search = (searchParams.get("search") || "").trim();

  const start = (page - 1) * limit;
  const end = start + limit;

  // Use GROQ params for safety
  const query = `
    {
      "items": *[_type == "category" && (!defined($search) || $search == "" || title match $match)]
        | order(title asc)[$start...$end]{
          _id,
          title,
          image{asset->{url}},
          "productCount": count(*[_type=="product" && references(^._id)])
        },
      "total": count(*[_type == "category" && (!defined($search) || $search == "" || title match $match)])
    }
  `;

  const data = await client.fetch(query, {
    search: search || "",
    match: `*${search}*`,
    start,
    end,
  });

  return Response.json({
    items: data.items ?? [],
    total: data.total ?? 0,
    page,
    limit,
    totalPages: Math.max(1, Math.ceil((data.total ?? 0) / limit)),
  });
}
