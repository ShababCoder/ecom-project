// "use client";

// import Link from "next/link";
// import { Package, ShoppingBag, Sparkles, User } from "lucide-react";
// import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
// import { Button } from "@/components/ui/button";
// import { useCartActions, useTotalItems } from "@/lib/store/cart-store-provider";
// // import { useChatActions, useIsChatOpen } from "@/lib/store/chat-store-provider";

// export function Header() {
//   const { openCart } = useCartActions();
//   // const { openChat } = useChatActions();
//   // const isChatOpen = useIsChatOpen();
//   const totalItems = useTotalItems();

//   return (
//     <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
//       <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
//         {/* Logo */}
//         <Link href="/" className="flex items-center gap-2">
//           <span className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
//             The Furniture Store
//           </span>
//         </Link>

//         {/* Actions */}
//         <div className="flex items-center gap-2">
//           {/* My Orders - Only when signed in */}
//           <SignedIn>
//             <Button asChild>
//               <Link href="/orders" className="flex items-center gap-2">
//                 <Package className="h-5 w-5" />
//                 <span className="text-sm font-medium">My Orders</span>
//               </Link>
//             </Button>
//           </SignedIn>

//           {/* AI Shopping Assistant */}
//           {/* {!isChatOpen && (
//             <Button
//               onClick={openChat}
//               className="gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md shadow-amber-200/50 transition-all hover:from-amber-600 hover:to-orange-600 hover:shadow-lg hover:shadow-amber-300/50 dark:shadow-amber-900/30 dark:hover:shadow-amber-800/40"
//             >
//               <Sparkles className="h-4 w-4" />
//               <span className="text-sm font-medium">Ask AI</span>
//             </Button>
//           )} */}

//           {/* Cart Button */}
//           <Button
//             variant="ghost"
//             size="icon"
//             className="relative"
//             onClick={openCart}
//           >
//             <ShoppingBag className="h-5 w-5" />
//             {totalItems > 0 && (
//               <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-zinc-900 text-xs font-medium text-white dark:bg-zinc-100 dark:text-zinc-900">
//                 {totalItems > 99 ? "99+" : totalItems}
//               </span>
//             )}
//             <span className="sr-only">Open cart ({totalItems} items)</span>
//           </Button>

//           {/* User */}
//           <SignedIn>
//             <UserButton
//               afterSwitchSessionUrl="/"
//               appearance={{
//                 elements: {
//                   avatarBox: "h-9 w-9",
//                 },
//               }}
//             >
//               <UserButton.MenuItems>
//                 <UserButton.Link
//                   label="My Orders"
//                   labelIcon={<Package className="h-4 w-4" />}
//                   href="/orders"
//                 />
//               </UserButton.MenuItems>
//             </UserButton>
//           </SignedIn>
//           <SignedOut>
//             <SignInButton mode="modal">
//               <Button variant="ghost" size="icon">
//                 <User className="h-5 w-5" />
//                 <span className="sr-only">Sign in</span>
//               </Button>
//             </SignInButton>
//           </SignedOut>
//         </div>
//       </div>
//     </header>
//   );
// }


"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Package, ShoppingBag, User, ChevronDown } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useCartActions, useTotalItems } from "@/lib/store/cart-store-provider";
import { client } from "@/sanity/lib/client";
import { ALL_CATEGORIES_QUERY } from "@/lib/sanity/queries/categories";

export function Header() {
  const { openCart } = useCartActions();
  const totalItems = useTotalItems();
  const [categories, setCategories] = useState<any[]>([]);
  const [openDropdown, setOpenDropdown] = useState(false);

  useEffect(() => {
    async function fetchCategories() {
      const data = await client.fetch(ALL_CATEGORIES_QUERY);
      setCategories(data || []);
    }
    fetchCategories();
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          The Furniture Store
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/">Home</Link>
          <Link href="/notice">Notice</Link>

          {/* Categories Dropdown */}
          <div className="relative">
            <button
              onClick={() => setOpenDropdown(!openDropdown)}
              className="flex items-center gap-1"
            >
              Categories <ChevronDown className="h-4 w-4" />
            </button>

            {openDropdown && (
              <div className="absolute left-0 mt-2 w-56 rounded-lg border bg-white shadow-lg dark:bg-zinc-900">
                {categories.map((cat) => (
                  <Link
                    key={cat._id}
                    href={`/categories?slug=${cat.slug}`}
                    className="block px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    {cat.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/feedback">Feedback</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <SignedIn>
            <Link href="/orders" className="text-sm">
              My Orders
            </Link>
          </SignedIn>

          <Button variant="ghost" size="icon" onClick={openCart}>
            <ShoppingBag className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs text-white">
                {totalItems}
              </span>
            )}
          </Button>

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </header>
  );
}
