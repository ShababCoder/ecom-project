"use client";

import Link from "next/link";
import Image from "next/image";
import { Grid2x2 } from "lucide-react";
import type { ALL_CATEGORIES_QUERYResult } from "@/sanity.types";

interface CategoryTilesProps {
  categories: ALL_CATEGORIES_QUERYResult;
  activeCategory?: string;
}

export function CategoryTiles({
  categories,
  activeCategory,
}: CategoryTilesProps) {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      {/* Responsive Grid */}
      <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {/* All Products tile */}
        <Link
          href="/"
          className={`group relative overflow-hidden rounded-xl transition-all duration-300 ${
            !activeCategory
              ? "ring-2 ring-amber-500 ring-offset-2 dark:ring-offset-zinc-900"
              : "hover:ring-2 hover:ring-zinc-300 hover:ring-offset-2 dark:hover:ring-zinc-600 dark:hover:ring-offset-zinc-900"
          }`}
        >
          <div className="relative aspect-[4/3]">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900 dark:from-zinc-700 dark:to-zinc-800" />

            {/* Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Grid2x2 className="h-10 w-10 text-white/60 transition-transform duration-300 group-hover:scale-110" />
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Title */}
            <div className="absolute inset-x-0 bottom-0 p-4">
              <span className="text-base font-semibold text-white drop-shadow-md">
                All Products
              </span>
            </div>
          </div>
        </Link>

        {/* Category tiles */}
        {categories.map((category) => {
          const isActive = activeCategory === category.slug;
          const imageUrl = category.image?.asset?.url;

          return (
            <Link
              key={category._id}
              href={`/?category=${category.slug}`}
              className={`group relative overflow-hidden rounded-xl transition-all duration-300 ${
                isActive
                  ? "ring-2 ring-amber-500 ring-offset-2 dark:ring-offset-zinc-900"
                  : "hover:ring-2 hover:ring-zinc-300 hover:ring-offset-2 dark:hover:ring-zinc-600 dark:hover:ring-offset-zinc-900"
              }`}
            >
              <div className="relative aspect-[4/3]">
                {/* Background image or fallback */}
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={category.title ?? "Category"}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-600" />
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/80" />

                {/* Title */}
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <span className="text-base font-semibold text-white drop-shadow-md">
                    {category.title}
                  </span>
                </div>

                {/* Active indicator */}
                {isActive && (
                  <div className="absolute top-3 right-3">
                    <span className="flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
                    </span>
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
