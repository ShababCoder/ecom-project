// import { client } from "@/sanity/lib/client";

// export async function POST(req: Request) {
//   const data = await req.formData();

//   const title = data.get("title") as string;
//   const file = data.get("image") as File;

//   const token = process.env.SANITY_API_WRITE_TOKEN;
//   const writeClient = client.withConfig({ token, useCdn: false });

//   let imageAsset;

//   if (file) {
//     imageAsset = await writeClient.assets.upload("image", file);
//   }

//   await writeClient.create({
//     _type: "category",
//     title,
//     image: imageAsset
//       ? {
//           _type: "image",
//           asset: {
//             _type: "reference",
//             _ref: imageAsset._id,
//           },
//         }
//       : undefined,
//   });

//   return Response.json({ success: true });
// }


import { client } from "@/sanity/lib/client";

export async function POST(req: Request) {
  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!token)
    return Response.json(
      { success: false, error: "Missing SANITY_API_WRITE_TOKEN" },
      { status: 500 },
    );

  const writeClient = client.withConfig({ token, useCdn: false });

  const form = await req.formData();
  const title = String(form.get("title") || "").trim();
  const file = form.get("image") as File | null;

  if (!title)
    return Response.json(
      { success: false, error: "Title is required" },
      { status: 400 },
    );

  let imageField: any = undefined;

  if (file && file.size > 0) {
    const asset = await writeClient.assets.upload("image", file);
    imageField = {
      _type: "image",
      asset: { _type: "reference", _ref: asset._id },
    };
  }

  const doc = await writeClient.create({
    _type: "category",
    title,
    ...(imageField ? { image: imageField } : {}),
  });

  return Response.json({ success: true, id: doc._id });
}
