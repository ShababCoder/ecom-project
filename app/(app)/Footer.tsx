import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              The Furniture Store
            </h3>
            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
              Premium furniture for modern living. Designed for comfort, built
              for style.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-zinc-900 dark:text-zinc-100">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  href="/orders"
                  className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                >
                  Orders
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-zinc-900 dark:text-zinc-100">
              Follow Us
            </h4>
            <div className="mt-4 flex gap-4">
              <Facebook className="h-5 w-5 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white cursor-pointer" />
              <Instagram className="h-5 w-5 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white cursor-pointer" />
              <Twitter className="h-5 w-5 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t border-zinc-200 pt-6 text-center text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
          © {new Date().getFullYear()} GoGrub. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
