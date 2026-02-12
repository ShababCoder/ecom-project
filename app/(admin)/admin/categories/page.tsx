// "use client";

// import { useEffect, useState } from "react";
// import { Grid } from "lucide-react";

// export default function CategoriesPage() {
//   const [categories, setCategories] = useState<any[]>([]);

//   useEffect(() => {
//     fetch("/api/admin/categories")
//       .then((res) => res.json())
//       .then((data) => setCategories(data.categories));
//   }, []);

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-2xl font-bold">Categories</h1>
//         <p className="text-zinc-500">Manage product categories</p>
//       </div>

//       <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//         {categories.map((cat) => (
//           <div
//             key={cat._id}
//             className="rounded-xl border bg-white p-6 shadow-sm dark:bg-zinc-900"
//           >
//             <h2 className="font-semibold text-lg">{cat.title}</h2>
//             <p className="text-sm text-zinc-500 mt-1">
//               {cat.productCount} products
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import { Plus, Search, Trash2, Eye, X } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { client } from "@/sanity/lib/client";
// import { toast } from "sonner";

// interface Category {
//   _id: string;
//   title: string;
//   image?: {
//     asset?: { url: string };
//   };
// }

// export default function CategoriesPage() {
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [search, setSearch] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState<Category | null>(
//     null,
//   );
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [newName, setNewName] = useState("");
//   const [newImage, setNewImage] = useState("");

//   async function fetchCategories() {
//     const data = await client.fetch(`
//       *[_type == "category"]{
//         _id,
//         title,
//         image{asset->{url}}
//       } | order(title asc)
//     `);
//     setCategories(data);
//   }

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const filtered = categories.filter((c) =>
//     c.title.toLowerCase().includes(search.toLowerCase()),
//   );

//   async function handleDelete(id: string) {
//     if (!confirm("Delete this category?")) return;

//     await fetch("/api/admin/categories/delete", {
//       method: "DELETE",
//       body: JSON.stringify({ id }),
//     });

//     toast.success("Category deleted");
//     fetchCategories();
//   }

//   async function handleAdd() {
//     if (!newName || !newImage) {
//       toast.error("All fields required");
//       return;
//     }

//     await fetch("/api/admin/categories/create", {
//       method: "POST",
//       body: JSON.stringify({
//         title: newName,
//         imageUrl: newImage,
//       }),
//     });

//     toast.success("Category created");
//     setShowAddModal(false);
//     setNewName("");
//     setNewImage("");
//     fetchCategories();
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold">Categories</h1>
//           <p className="text-zinc-500">Manage product categories</p>
//         </div>

//         <Button onClick={() => setShowAddModal(true)}>
//           <Plus className="mr-2 h-4 w-4" />
//           Add Category
//         </Button>
//       </div>

//       {/* Search */}
//       <div className="relative max-w-md">
//         <Search className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
//         <input
//           className="w-full rounded-md border pl-9 pr-4 py-2"
//           placeholder="Search category..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>

//       {/* Table */}
//       <div className="rounded-xl border bg-white dark:bg-zinc-900">
//         <table className="w-full text-sm">
//           <thead className="border-b bg-zinc-50 dark:bg-zinc-800">
//             <tr>
//               <th className="px-4 py-3 text-left">Image</th>
//               <th className="px-4 py-3 text-left">Category Name</th>
//               <th className="px-4 py-3 text-right">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {filtered.map((cat) => (
//               <tr
//                 key={cat._id}
//                 className="border-b hover:bg-zinc-50 dark:hover:bg-zinc-800"
//               >
//                 <td className="px-4 py-3">
//                   {cat.image?.asset?.url ? (
//                     <Image
//                       src={cat.image.asset.url}
//                       alt={cat.title}
//                       width={50}
//                       height={50}
//                       className="rounded-md object-cover"
//                     />
//                   ) : (
//                     <div className="h-12 w-12 rounded-md bg-zinc-200" />
//                   )}
//                 </td>

//                 <td className="px-4 py-3 font-medium">{cat.title}</td>

//                 <td className="px-4 py-3 text-right space-x-2">
//                   <Button
//                     size="icon"
//                     variant="ghost"
//                     onClick={() => setSelectedCategory(cat)}
//                   >
//                     <Eye className="h-4 w-4" />
//                   </Button>

//                   <Button
//                     size="icon"
//                     variant="ghost"
//                     onClick={() => handleDelete(cat._id)}
//                   >
//                     <Trash2 className="h-4 w-4 text-red-500" />
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* View Modal */}
//       {selectedCategory && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/40">
//           <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 w-[400px] relative">
//             <button
//               className="absolute right-4 top-4"
//               onClick={() => setSelectedCategory(null)}
//             >
//               <X className="h-4 w-4" />
//             </button>

//             <h2 className="text-lg font-semibold mb-4">Category Details</h2>

//             {selectedCategory.image?.asset?.url && (
//               <Image
//                 src={selectedCategory.image.asset.url}
//                 alt=""
//                 width={300}
//                 height={200}
//                 className="rounded-md mb-4"
//               />
//             )}

//             <p className="font-medium">{selectedCategory.title}</p>
//           </div>
//         </div>
//       )}

//       {/* Add Modal */}
//       {showAddModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/40">
//           <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 w-[400px] relative">
//             <button
//               className="absolute right-4 top-4"
//               onClick={() => setShowAddModal(false)}
//             >
//               <X className="h-4 w-4" />
//             </button>

//             <h2 className="text-lg font-semibold mb-4">Add Category</h2>

//             <input
//               placeholder="Category Name"
//               className="w-full border rounded-md p-2 mb-4"
//               value={newName}
//               onChange={(e) => setNewName(e.target.value)}
//             />

//             <input
//               placeholder="Image URL"
//               className="w-full border rounded-md p-2 mb-4"
//               value={newImage}
//               onChange={(e) => setNewImage(e.target.value)}
//             />

//             {newImage && (
//               <Image
//                 src={newImage}
//                 alt=""
//                 width={300}
//                 height={200}
//                 className="rounded-md mb-4"
//               />
//             )}

//             <Button className="w-full" onClick={handleAdd}>
//               Create Category
//             </Button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Plus, Search, Trash2, Eye, Pencil, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

type CategoryRow = {
  _id: string;
  title: string;
  image?: { asset?: { url?: string } };
  productCount?: number;
};

function useDebouncedValue<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export default function CategoriesPage() {
  const [items, setItems] = useState<CategoryRow[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [page, setPage] = useState(1);
  const limit = 10;

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search, 300);

  const [loading, setLoading] = useState(false);

  // Selection
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const allOnPageSelected = useMemo(
    () => items.length > 0 && selectedIds.length === items.length,
    [items, selectedIds],
  );

  // View / Edit / Add state
  const [viewing, setViewing] = useState<CategoryRow | null>(null);

  const [editing, setEditing] = useState<CategoryRow | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editFile, setEditFile] = useState<File | null>(null);
  const editPreviewUrl = useMemo(
    () => (editFile ? URL.createObjectURL(editFile) : null),
    [editFile],
  );

  const [addOpen, setAddOpen] = useState(false);
  const [addTitle, setAddTitle] = useState("");
  const [addFile, setAddFile] = useState<File | null>(null);
  const addPreviewUrl = useMemo(
    () => (addFile ? URL.createObjectURL(addFile) : null),
    [addFile],
  );

  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [confirmBulkDelete, setConfirmBulkDelete] = useState(false);

  async function fetchData() {
    setLoading(true);
    try {
      const qs = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        search: debouncedSearch,
      });

      const res = await fetch(`/api/admin/categories?${qs.toString()}`);
      if (!res.ok) throw new Error("Failed to load categories");

      const data = await res.json();
      setItems(data.items ?? []);
      setTotal(data.total ?? 0);
      setTotalPages(data.totalPages ?? 1);

      // reset selection if page changes / search changes
      setSelectedIds([]);
    } catch (e: any) {
      toast.error(e?.message || "Failed to load categories");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, debouncedSearch]);

  // cleanup object urls
  useEffect(() => {
    return () => {
      if (editPreviewUrl) URL.revokeObjectURL(editPreviewUrl);
      if (addPreviewUrl) URL.revokeObjectURL(addPreviewUrl);
    };
  }, [editPreviewUrl, addPreviewUrl]);

  function toggleRow(id: string) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  function toggleAllOnPage() {
    if (allOnPageSelected) setSelectedIds([]);
    else setSelectedIds(items.map((x) => x._id));
  }

  async function createCategory() {
    if (!addTitle.trim()) return toast.error("Category name is required");
    if (!addFile) return toast.error("Category image is required");

    const fd = new FormData();
    fd.set("title", addTitle.trim());
    fd.set("image", addFile);

    const t = toast.loading("Creating category...");
    try {
      const res = await fetch("/api/admin/categories/create", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data?.error || "Create failed");

      toast.success("Category created");
      setAddOpen(false);
      setAddTitle("");
      setAddFile(null);
      setPage(1);
      fetchData();
    } catch (e: any) {
      toast.error(e?.message || "Create failed");
    } finally {
      toast.dismiss(t);
    }
  }

  async function updateCategory() {
    if (!editing) return;
    if (!editTitle.trim()) return toast.error("Category name is required");

    const fd = new FormData();
    fd.set("id", editing._id);
    fd.set("title", editTitle.trim());
    if (editFile) fd.set("image", editFile);

    const t = toast.loading("Updating category...");
    try {
      const res = await fetch("/api/admin/categories/update", {
        method: "PATCH",
        body: fd,
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data?.error || "Update failed");

      toast.success("Category updated");
      setEditing(null);
      setEditTitle("");
      setEditFile(null);
      fetchData();
    } catch (e: any) {
      toast.error(e?.message || "Update failed");
    } finally {
      toast.dismiss(t);
    }
  }

  async function deleteOne(id: string) {
    const t = toast.loading("Deleting category...");
    try {
      const res = await fetch("/api/admin/categories/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data?.error || "Delete failed");

      toast.success("Category deleted");
      fetchData();
    } catch (e: any) {
      toast.error(e?.message || "Delete failed");
    } finally {
      toast.dismiss(t);
    }
  }

  async function deleteBulk() {
    if (selectedIds.length === 0) return;

    const t = toast.loading(`Deleting ${selectedIds.length} categories...`);
    try {
      const res = await fetch("/api/admin/categories/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: selectedIds }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data?.error || "Bulk delete failed");

      toast.success("Categories deleted");
      setConfirmBulkDelete(false);
      setSelectedIds([]);
      fetchData();
    } catch (e: any) {
      toast.error(e?.message || "Bulk delete failed");
    } finally {
      toast.dismiss(t);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Categories
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Manage product categories ({total})
          </p>
        </div>

        <div className="flex gap-2">
          {selectedIds.length > 0 && (
            <Button
              variant="destructive"
              onClick={() => setConfirmBulkDelete(true)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete ({selectedIds.length})
            </Button>
          )}

          <Button onClick={() => setAddOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Category
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center justify-between gap-3">
        <div className="relative w-full max-w-md">
          <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
          <Input
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            placeholder="Search categories..."
            className="pl-9"
          />
        </div>

        <div className="text-sm text-zinc-500 dark:text-zinc-400">
          Page {page} / {totalPages}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="border-b border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-800/40">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
              Category List
            </div>
            {loading && (
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Loading
              </div>
            )}
          </div>
        </div>

        <table className="w-full text-sm">
          <thead className="border-b border-zinc-200 dark:border-zinc-800">
            <tr className="text-left">
              <th className="px-4 py-3 w-10">
                <Checkbox
                  checked={allOnPageSelected}
                  onCheckedChange={() => toggleAllOnPage()}
                  aria-label="Select all"
                />
              </th>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Category Name</th>
              <th className="px-4 py-3">Products</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {!loading && items.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-zinc-500">
                  No categories found.
                </td>
              </tr>
            )}

            {items.map((cat) => {
              const checked = selectedIds.includes(cat._id);
              const imageUrl = cat.image?.asset?.url;

              return (
                <tr
                  key={cat._id}
                  className="border-b border-zinc-100 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/40"
                >
                  <td className="px-4 py-3 align-middle">
                    <Checkbox
                      checked={checked}
                      onCheckedChange={() => toggleRow(cat._id)}
                      aria-label={`Select ${cat.title}`}
                    />
                  </td>

                  <td className="px-4 py-3">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={cat.title}
                        width={44}
                        height={44}
                        className="h-11 w-11 rounded-lg object-cover ring-1 ring-zinc-200 dark:ring-zinc-700"
                      />
                    ) : (
                      <div className="h-11 w-11 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
                    )}
                  </td>

                  <td className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-100">
                    {cat.title}
                  </td>

                  <td className="px-4 py-3 text-zinc-600 dark:text-zinc-300">
                    {cat.productCount ?? 0}
                  </td>

                  <td className="px-4 py-3 text-right">
                    <div className="inline-flex items-center gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setViewing(cat)}
                        aria-label="View"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>

                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => {
                          setEditing(cat);
                          setEditTitle(cat.title);
                          setEditFile(null);
                        }}
                        aria-label="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>

                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setConfirmDeleteId(cat._id)}
                        aria-label="Delete"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <div className="text-xs text-zinc-500">
            Showing {(page - 1) * limit + 1} – {Math.min(page * limit, total)} of {total}
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              disabled={page <= 1 || loading}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              disabled={page >= totalPages || loading}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* VIEW Dialog */}
      <Dialog open={!!viewing} onOpenChange={(o) => !o && setViewing(null)}>
        <DialogContent className="sm:max-w-md data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95">
          <DialogHeader>
            <DialogTitle>Category Details</DialogTitle>
            <DialogDescription>Preview category info.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {viewing?.image?.asset?.url ? (
              <Image
                src={viewing.image.asset.url}
                alt={viewing.title}
                width={640}
                height={360}
                className="w-full rounded-xl object-cover ring-1 ring-zinc-200 dark:ring-zinc-800"
              />
            ) : (
              <div className="h-48 w-full rounded-xl bg-zinc-200 dark:bg-zinc-800" />
            )}

            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-sm dark:border-zinc-800 dark:bg-zinc-900">
              <div className="text-xs text-zinc-500">Name</div>
              <div className="font-medium text-zinc-900 dark:text-zinc-100">
                {viewing?.title}
              </div>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ADD Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="sm:max-w-md data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95">
          <DialogHeader>
            <DialogTitle>Add Category</DialogTitle>
            <DialogDescription>Create a new category like in Sanity.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="text-sm font-medium">Category Name</div>
              <Input value={addTitle} onChange={(e) => setAddTitle(e.target.value)} placeholder="e.g. Chairs" />
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium">Image</div>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setAddFile(e.target.files?.[0] ?? null)}
              />
              {addPreviewUrl ? (
                <Image
                  src={addPreviewUrl}
                  alt="Preview"
                  width={640}
                  height={360}
                  className="w-full rounded-xl object-cover ring-1 ring-zinc-200 dark:ring-zinc-800"
                />
              ) : (
                <div className="h-40 w-full rounded-xl border border-dashed border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900" />
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setAddOpen(false)}>
              Cancel
            </Button>
            <Button onClick={createCategory}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* EDIT Dialog */}
      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent className="sm:max-w-md data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95">
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>Update name and optionally replace the image.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="text-sm font-medium">Category Name</div>
              <Input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium">Image</div>
              <Input type="file" accept="image/*" onChange={(e) => setEditFile(e.target.files?.[0] ?? null)} />

              {editPreviewUrl ? (
                <Image
                  src={editPreviewUrl}
                  alt="Preview"
                  width={640}
                  height={360}
                  className="w-full rounded-xl object-cover ring-1 ring-zinc-200 dark:ring-zinc-800"
                />
              ) : editing?.image?.asset?.url ? (
                <Image
                  src={editing.image.asset.url}
                  alt={editing.title}
                  width={640}
                  height={360}
                  className="w-full rounded-xl object-cover ring-1 ring-zinc-200 dark:ring-zinc-800"
                />
              ) : (
                <div className="h-40 w-full rounded-xl border border-dashed border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900" />
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditing(null)}>
              Cancel
            </Button>
            <Button onClick={updateCategory}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* DELETE confirmation */}
      <AlertDialog open={!!confirmDeleteId} onOpenChange={(o) => !o && setConfirmDeleteId(null)}>
        <AlertDialogContent className="data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete category?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove the category. Products that reference it may be affected.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={async () => {
                const id = confirmDeleteId!;
                setConfirmDeleteId(null);
                await deleteOne(id);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* BULK DELETE confirmation */}
      <AlertDialog open={confirmBulkDelete} onOpenChange={setConfirmBulkDelete}>
        <AlertDialogContent className="data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete selected categories?</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to delete {selectedIds.length} categories.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={deleteBulk}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
