import "./../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { SanityLive } from "@/sanity/lib/live";
import { Header } from "@/components/app/Header";
import { AppShell } from "@/components/app/AppShell";
import { CartSheet } from "@/components/app/CartSheet";
import { ChatStoreProvider } from "@/lib/store/chat-store-provider";
import { CartStoreProvider } from "@/lib/store/cart-store-provider";
import { Toaster } from "sonner";
import { ChatSheet } from "@/components/app/ChatSheet";

function layout({ children }: { children: React.ReactNode }) {
  <ClerkProvider>
    {/* <CartStoreProvider> */}
      {/* <ChatStoreProvider> */}
        {/* <AppShell> */}
          {/* <Header /> */}
          <main>{children}</main>
        {/* </AppShell> */}
        {/* <CartSheet /> */}
        {/* <ChatSheet /> */}
        {/* <Toaster position="bottom-center" /> */}
        <SanityLive />
      {/* </ChatStoreProvider> */}
    {/* </CartStoreProvider> */}
  </ClerkProvider>;
}

export default layout;
