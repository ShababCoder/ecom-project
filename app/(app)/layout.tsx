import "./../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { SanityLive } from "@/sanity/lib/live";
import { Header } from "@/components/app/Header";
import { AppShell } from "@/components/app/AppShell";
import { CartSheet } from "@/components/app/CartSheet";
// import { ChatStoreProvider } from "@/lib/store/chat-store-provider";
import { CartStoreProvider } from "@/lib/store/cart-store-provider";
import { Toaster } from "sonner";
import { ChatSheet } from "@/components/app/ChatSheet";
import { Footer } from "./Footer";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <CartStoreProvider>
        <Header />
        <main>{children}</main>
        <Footer />
        <CartSheet />
        <Toaster position="bottom-center" />
        <SanityLive />
      </CartStoreProvider>
    </ClerkProvider>
  );
}

export default layout;
