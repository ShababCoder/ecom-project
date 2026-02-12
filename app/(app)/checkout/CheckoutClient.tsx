// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { ArrowLeft, ShoppingBag, AlertTriangle, Loader2 } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { CheckoutButton } from "@/components/app/CheckoutButton";
// import { formatPrice } from "@/lib/utils";
// import {
//   useCartItems,
//   useTotalPrice,
//   useTotalItems,
// } from "@/lib/store/cart-store-provider";
// import { useCartStock } from "@/lib/hooks/useCartStock";

// export function CheckoutClient() {
//   const items = useCartItems();
//   const totalPrice = useTotalPrice();
//   const totalItems = useTotalItems();
//   const { stockMap, isLoading, hasStockIssues } = useCartStock(items);

//   if (items.length === 0) {
//     return (
//       <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
//         <div className="text-center">
//           <ShoppingBag className="mx-auto h-16 w-16 text-zinc-300 dark:text-zinc-600" />
//           <h1 className="mt-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
//             Your cart is empty
//           </h1>
//           <p className="mt-2 text-zinc-500 dark:text-zinc-400">
//             Add some items to your cart before checking out.
//           </p>
//           <Button asChild className="mt-8">
//             <Link href="/">Continue Shopping</Link>
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
//       {/* Header */}
//       <div className="mb-8">
//         <Link
//           href="/"
//           className="inline-flex items-center text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
//         >
//           <ArrowLeft className="mr-2 h-4 w-4" />
//           Continue Shopping
//         </Link>
//         <h1 className="mt-4 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
//           Checkout
//         </h1>
//       </div>

//       <div className="grid gap-8 lg:grid-cols-5">
//         {/* Cart Items */}
//         <div className="lg:col-span-3">
//           <div className="rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
//             <div className="border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
//               <h2 className="font-semibold text-zinc-900 dark:text-zinc-100">
//                 Order Summary ({totalItems} items)
//               </h2>
//             </div>

//             {/* Stock Issues Warning */}
//             {hasStockIssues && !isLoading && (
//               <div className="mx-6 mt-4 flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-200">
//                 <AlertTriangle className="h-5 w-5 shrink-0" />
//                 <span>
//                   Some items have stock issues. Please update your cart before
//                   proceeding.
//                 </span>
//               </div>
//             )}

//             {/* Loading State */}
//             {isLoading && (
//               <div className="flex items-center justify-center py-8">
//                 <Loader2 className="h-6 w-6 animate-spin text-zinc-400" />
//                 <span className="ml-2 text-sm text-zinc-500">
//                   Verifying stock...
//                 </span>
//               </div>
//             )}

//             {/* Items List */}
//             <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
//               {items.map((item) => {
//                 const stockInfo = stockMap.get(item.productId);
//                 const hasIssue =
//                   stockInfo?.isOutOfStock || stockInfo?.exceedsStock;

//                 return (
//                   <div
//                     key={item.productId}
//                     className={`flex gap-4 px-6 py-4 ${
//                       hasIssue ? "bg-red-50 dark:bg-red-950/20" : ""
//                     }`}
//                   >
//                     {/* Image */}
//                     <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-zinc-100 dark:bg-zinc-800">
//                       {item.image ? (
//                         <Image
//                           src={item.image}
//                           alt={item.name}
//                           fill
//                           className="object-cover"
//                           sizes="80px"
//                         />
//                       ) : (
//                         <div className="flex h-full items-center justify-center text-xs text-zinc-400">
//                           No image
//                         </div>
//                       )}
//                     </div>

//                     {/* Details */}
//                     <div className="flex flex-1 flex-col justify-between">
//                       <div>
//                         <h3 className="font-medium text-zinc-900 dark:text-zinc-100">
//                           {item.name}
//                         </h3>
//                         <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
//                           Qty: {item.quantity}
//                         </p>
//                         {stockInfo?.isOutOfStock && (
//                           <p className="mt-1 text-sm font-medium text-red-600">
//                             Out of stock
//                           </p>
//                         )}
//                         {stockInfo?.exceedsStock && !stockInfo.isOutOfStock && (
//                           <p className="mt-1 text-sm font-medium text-amber-600">
//                             Only {stockInfo.currentStock} available
//                           </p>
//                         )}
//                       </div>
//                     </div>

//                     {/* Price */}
//                     <div className="text-right">
//                       <p className="font-medium text-zinc-900 dark:text-zinc-100">
//                         {formatPrice(item.price * item.quantity)}
//                       </p>
//                       {item.quantity > 1 && (
//                         <p className="text-sm text-zinc-500">
//                           {formatPrice(item.price)} each
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>

//         {/* Order Total & Checkout */}
//         <div className="lg:col-span-2">
//           <div className="sticky top-24 rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
//             <h2 className="font-semibold text-zinc-900 dark:text-zinc-100">
//               Payment Summary
//             </h2>

//             <div className="mt-6 space-y-4">
//               <div className="flex justify-between text-sm">
//                 <span className="text-zinc-500 dark:text-zinc-400">
//                   Subtotal
//                 </span>
//                 <span className="text-zinc-900 dark:text-zinc-100">
//                   {formatPrice(totalPrice)}
//                 </span>
//               </div>
//               <div className="flex justify-between text-sm">
//                 <span className="text-zinc-500 dark:text-zinc-400">
//                   Shipping
//                 </span>
//                 <span className="text-zinc-900 dark:text-zinc-100">
//                   Calculated at checkout
//                 </span>
//               </div>
//               <div className="border-t border-zinc-200 pt-4 dark:border-zinc-800">
//                 <div className="flex justify-between text-base font-semibold">
//                   <span className="text-zinc-900 dark:text-zinc-100">
//                     Total
//                   </span>
//                   <span className="text-zinc-900 dark:text-zinc-100">
//                     {formatPrice(totalPrice)}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <div className="mt-6">
//               <CheckoutButton disabled={hasStockIssues || isLoading} />
//             </div>

//             <p className="mt-4 text-center text-xs text-zinc-500 dark:text-zinc-400">
//               You&apos;ll be redirected to Stripe&apos;s secure checkout
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ShoppingBag,
  AlertTriangle,
  Loader2,
  Banknote,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import {
  useCartActions,
  useCartItems,
  useTotalItems,
  useTotalPrice,
} from "@/lib/store/cart-store-provider";
import { useCartStock } from "@/lib/hooks/useCartStock";
import { createOrderFromCart } from "@/lib/actions/checkout";

// shadcn inputs
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

type PaymentMethod = "bank_transfer" | "cod";

const BANK_DETAILS = {
  bankName: "YOUR BANK NAME",
  accountName: "YOUR ACCOUNT NAME",
  accountNumber: "0000000000",
};

export function CheckoutClient() {
  const router = useRouter();
  const items = useCartItems();
  const totalPrice = useTotalPrice();
  const totalItems = useTotalItems();
  const { clearCart } = useCartActions();

  const { stockMap, isLoading, hasStockIssues } = useCartStock(items);

  const [submitting, setSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("bank_transfer");

  const [delivery, setDelivery] = useState({
    name: "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    postcode: "",
    country: "NG",
    notes: "",
  });

  const [orderCreated, setOrderCreated] = useState<{
    orderId: string;
    orderNumber?: string;
  } | null>(null);
  const [transferModalOpen, setTransferModalOpen] = useState(false);

  const canSubmit = useMemo(() => {
    if (hasStockIssues || isLoading || submitting) return false;
    return (
      delivery.name.trim() &&
      delivery.phone.trim() &&
      delivery.line1.trim() &&
      delivery.city.trim() &&
      items.length > 0
    );
  }, [delivery, hasStockIssues, isLoading, items.length, submitting]);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <ShoppingBag className="mx-auto h-16 w-16 text-zinc-300 dark:text-zinc-600" />
          <h1 className="mt-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Your cart is empty
          </h1>
          <p className="mt-2 text-zinc-500 dark:text-zinc-400">
            Add some items to your cart before checking out.
          </p>
          <Button asChild className="mt-8">
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  async function handlePlaceOrder() {
    if (!canSubmit) return;

    setSubmitting(true);
    try {
      const res = await createOrderFromCart({
        items: items.map((i) => ({
          productId: i.productId,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
          image: i.image,
        })),
        delivery: {
          name: delivery.name,
          phone: delivery.phone,
          line1: delivery.line1,
          line2: delivery.line2 || undefined,
          city: delivery.city,
          postcode: delivery.postcode || undefined,
          country: delivery.country || "NG",
          notes: delivery.notes || undefined,
        },
        paymentMethod,
      });

      if (!res.success || !res.orderId) {
        alert(res.error ?? "Could not place order.");
        return;
      }

      setOrderCreated({ orderId: res.orderId, orderNumber: res.orderNumber });
      clearCart();

      if (paymentMethod === "bank_transfer") {
        setTransferModalOpen(true);
      } else {
        // COD -> go to orders
        router.push("/orders");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Continue Shopping
        </Link>
        <h1 className="mt-4 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
          Checkout
        </h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        {/* Left */}
        <div className="space-y-8 lg:col-span-3">
          {/* Delivery Info */}
          <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Delivery Information
            </h2>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={delivery.name}
                  onChange={(e) =>
                    setDelivery((p) => ({ ...p, name: e.target.value }))
                  }
                  placeholder="Your full name"
                />
              </div>

              <div className="sm:col-span-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={delivery.phone}
                  onChange={(e) =>
                    setDelivery((p) => ({ ...p, phone: e.target.value }))
                  }
                  placeholder="e.g. +234..."
                />
              </div>

              <div className="sm:col-span-2">
                <Label htmlFor="line1">Address</Label>
                <Input
                  id="line1"
                  value={delivery.line1}
                  onChange={(e) =>
                    setDelivery((p) => ({ ...p, line1: e.target.value }))
                  }
                  placeholder="Street / House / Area"
                />
              </div>

              <div className="sm:col-span-2">
                <Label htmlFor="line2">Address line 2 (optional)</Label>
                <Input
                  id="line2"
                  value={delivery.line2}
                  onChange={(e) =>
                    setDelivery((p) => ({ ...p, line2: e.target.value }))
                  }
                  placeholder="Landmark, apartment, etc."
                />
              </div>

              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={delivery.city}
                  onChange={(e) =>
                    setDelivery((p) => ({ ...p, city: e.target.value }))
                  }
                  placeholder="City"
                />
              </div>

              <div>
                <Label htmlFor="postcode">Postcode (optional)</Label>
                <Input
                  id="postcode"
                  value={delivery.postcode}
                  onChange={(e) =>
                    setDelivery((p) => ({ ...p, postcode: e.target.value }))
                  }
                  placeholder="Postcode"
                />
              </div>

              <div className="sm:col-span-2">
                <Label htmlFor="notes">Notes (optional)</Label>
                <Textarea
                  id="notes"
                  value={delivery.notes}
                  onChange={(e) =>
                    setDelivery((p) => ({ ...p, notes: e.target.value }))
                  }
                  placeholder="Anything we should know for delivery?"
                />
              </div>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
            <div className="border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
              <h2 className="font-semibold text-zinc-900 dark:text-zinc-100">
                Order Summary ({totalItems} items)
              </h2>
            </div>

            {hasStockIssues && !isLoading && (
              <div className="mx-6 mt-4 flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-200">
                <AlertTriangle className="h-5 w-5 shrink-0" />
                <span>
                  Some items have stock issues. Please update your cart before
                  proceeding.
                </span>
              </div>
            )}

            {isLoading && (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-zinc-400" />
                <span className="ml-2 text-sm text-zinc-500">
                  Verifying stock...
                </span>
              </div>
            )}

            <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {items.map((item) => {
                const stockInfo = stockMap.get(item.productId);
                const hasIssue =
                  stockInfo?.isOutOfStock || stockInfo?.exceedsStock;

                return (
                  <div
                    key={item.productId}
                    className={`flex gap-4 px-6 py-4 ${hasIssue ? "bg-red-50 dark:bg-red-950/20" : ""}`}
                  >
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-zinc-100 dark:bg-zinc-800">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-xs text-zinc-400">
                          No image
                        </div>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <h3 className="font-medium text-zinc-900 dark:text-zinc-100">
                          {item.name}
                        </h3>
                        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                          Qty: {item.quantity}
                        </p>

                        {stockInfo?.isOutOfStock && (
                          <p className="mt-1 text-sm font-medium text-red-600">
                            Out of stock
                          </p>
                        )}
                        {stockInfo?.exceedsStock && !stockInfo.isOutOfStock && (
                          <p className="mt-1 text-sm font-medium text-amber-600">
                            Only {stockInfo.currentStock} available
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-medium text-zinc-900 dark:text-zinc-100">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                      {item.quantity > 1 && (
                        <p className="text-sm text-zinc-500">
                          {formatPrice(item.price)} each
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="lg:col-span-2">
          <div className="sticky top-24 rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
            <h2 className="font-semibold text-zinc-900 dark:text-zinc-100">
              Payment
            </h2>

            <div className="mt-4">
              <RadioGroup
                value={paymentMethod}
                onValueChange={(v) => setPaymentMethod(v as PaymentMethod)}
                className="space-y-3"
              >
                <div className="flex items-start gap-3 rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
                  <RadioGroupItem
                    value="bank_transfer"
                    id="bank_transfer"
                    className="mt-1"
                  />
                  <Label
                    htmlFor="bank_transfer"
                    className="flex-1 cursor-pointer"
                  >
                    <div className="flex items-center gap-2 font-medium">
                      <Banknote className="h-4 w-4 text-zinc-500" />
                      Bank Transfer
                    </div>
                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                      You&apos;ll see our account details after placing the
                      order.
                    </p>
                  </Label>
                </div>

                <div className="flex items-start gap-3 rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
                  <RadioGroupItem value="cod" id="cod" className="mt-1" />
                  <Label htmlFor="cod" className="flex-1 cursor-pointer">
                    <div className="flex items-center gap-2 font-medium">
                      <Truck className="h-4 w-4 text-zinc-500" />
                      Cash on Delivery (COD 🚚)
                    </div>
                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                      Pay when your order is delivered.
                    </p>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500 dark:text-zinc-400">
                  Subtotal
                </span>
                <span className="text-zinc-900 dark:text-zinc-100">
                  {formatPrice(totalPrice)}
                </span>
              </div>

              <div className="border-t border-zinc-200 pt-4 dark:border-zinc-800">
                <div className="flex justify-between text-base font-semibold">
                  <span className="text-zinc-900 dark:text-zinc-100">
                    Total
                  </span>
                  <span className="text-zinc-900 dark:text-zinc-100">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Button
                className="w-full"
                onClick={handlePlaceOrder}
                disabled={!canSubmit}
              >
                {submitting ? "Placing order..." : "Place order"}
              </Button>

              {!canSubmit && (
                <p className="mt-3 text-center text-xs text-zinc-500 dark:text-zinc-400">
                  Fill delivery info to continue. Stock issues must be resolved.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bank Transfer Modal */}
      <Dialog
        open={transferModalOpen}
        onOpenChange={(v) => setTransferModalOpen(v)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bank Transfer</DialogTitle>
            <DialogDescription>
              Please transfer the total amount to the account below and then
              click “I have paid”.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-2 space-y-3 rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-500 dark:text-zinc-400">Bank</span>
              <span className="font-medium">{BANK_DETAILS.bankName}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-500 dark:text-zinc-400">
                Account Name
              </span>
              <span className="font-medium">{BANK_DETAILS.accountName}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-500 dark:text-zinc-400">
                Account Number
              </span>
              <span className="font-semibold">
                {BANK_DETAILS.accountNumber}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-500 dark:text-zinc-400">Amount</span>
              <span className="font-semibold">{formatPrice(totalPrice)}</span>
            </div>
            {orderCreated?.orderNumber && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-500 dark:text-zinc-400">Order</span>
                <span className="font-medium">#{orderCreated.orderNumber}</span>
              </div>
            )}
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" asChild>
              <Link href="/orders">View Orders</Link>
            </Button>
            <Button
              onClick={() => {
                setTransferModalOpen(false);
                router.push("/orders");
              }}
            >
              I have paid
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
