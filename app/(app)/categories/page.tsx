import { client } from "@/sanity/lib/client";
import { ALL_CATEGORIES_QUERY } from "@/lib/sanity/queries/categories";
import Link from "next/link";

export default async function CategoriesPage() {
  const categories = await client.fetch(ALL_CATEGORIES_QUERY);

  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Categories</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((cat: any) => (
          <Link
            key={cat._id}
            href={`/?category=${cat.slug}`}
            className="p-6 border rounded-lg hover:shadow-lg transition"
          >
            {cat.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
