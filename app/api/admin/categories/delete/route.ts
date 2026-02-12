// import { client } from "@/sanity/lib/client";

// export async function DELETE(req: Request) {
//   const { id, ids } = await req.json();

//   const token = process.env.SANITY_API_WRITE_TOKEN;
//   const writeClient = client.withConfig({ token, useCdn: false });

//   if (ids) {
//     for (const categoryId of ids) {
//       await writeClient.delete(categoryId);
//     }
//   } else if (id) {
//     await writeClient.delete(id);
//   }

//   return Response.json({ success: true });
// }


import { client } from "@/sanity/lib/client";

export async function DELETE(req: Request) {
  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!token)
    return Response.json(
      { success: false, error: "Missing SANITY_API_WRITE_TOKEN" },
      { status: 500 },
    );

  const writeClient = client.withConfig({ token, useCdn: false });

  const body = await req.json().catch(() => ({}));
  const id = body?.id as string | undefined;
  const ids = body?.ids as string[] | undefined;

  if (Array.isArray(ids) && ids.length > 0) {
    // Transaction delete = faster
    let tx = writeClient.transaction();
    for (const cid of ids) tx = tx.delete(cid);
    await tx.commit();
    return Response.json({ success: true });
  }

  if (id) {
    await writeClient.delete(id);
    return Response.json({ success: true });
  }

  return Response.json(
    { success: false, error: "No id/ids provided" },
    { status: 400 },
  );
}
