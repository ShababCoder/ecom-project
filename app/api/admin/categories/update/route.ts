// import { client } from "@/sanity/lib/client";

// export async function PATCH(req: Request) {
//   const data = await req.formData();
//   const id = data.get("id") as string;
//   const title = data.get("title") as string;
//   const file = data.get("image") as File;

//   const token = process.env.SANITY_API_WRITE_TOKEN;
//   const writeClient = client.withConfig({ token, useCdn: false });

//   let patch = writeClient.patch(id).set({ title });

//   if (file && file.size > 0) {
//     const imageAsset = await writeClient.assets.upload("image", file);
//     patch = patch.set({
//       image: {
//         _type: "image",
//         asset: {
//           _type: "reference",
//           _ref: imageAsset._id,
//         },
//       },
//     });
//   }

//   await patch.commit();

//   return Response.json({ success: true });
// }


import { client } from "@/sanity/lib/client";

export async function PATCH(req: Request) {
  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!token)
    return Response.json(
      { success: false, error: "Missing SANITY_API_WRITE_TOKEN" },
      { status: 500 },
    );

  const writeClient = client.withConfig({ token, useCdn: false });

  const form = await req.formData();
  const id = String(form.get("id") || "").trim();
  const title = String(form.get("title") || "").trim();
  const file = form.get("image") as File | null;

  if (!id)
    return Response.json(
      { success: false, error: "Missing id" },
      { status: 400 },
    );
  if (!title)
    return Response.json(
      { success: false, error: "Title is required" },
      { status: 400 },
    );

  let patch = writeClient.patch(id).set({ title });

  if (file && file.size > 0) {
    const asset = await writeClient.assets.upload("image", file);
    patch = patch.set({
      image: {
        _type: "image",
        asset: { _type: "reference", _ref: asset._id },
      },
    });
  }

  await patch.commit();
  return Response.json({ success: true });
}
