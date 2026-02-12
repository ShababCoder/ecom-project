import { client } from "@/sanity/lib/client";

export async function PATCH(req: Request) {
  try {
    const { id, status } = await req.json();

    const token = process.env.SANITY_API_WRITE_TOKEN;
    if (!token) {
      return Response.json({ success: false }, { status: 500 });
    }

    const writeClient = client.withConfig({ token, useCdn: false });

    await writeClient.patch(id).set({ status }).commit();

    return Response.json({ success: true });
  } catch (error) {
    console.error(error);
    return Response.json({ success: false }, { status: 500 });
  }
}
