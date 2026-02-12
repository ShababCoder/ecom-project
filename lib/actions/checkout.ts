// "use server";

// import { auth, currentUser } from "@clerk/nextjs/server";
// import Stripe from "stripe";
// import { client } from "@/sanity/lib/client";
// import { PRODUCTS_BY_IDS_QUERY } from "@/lib/sanity/queries/products";
// import { getOrCreateStripeCustomer } from "@/lib/actions/customer";

// if (!process.env.STRIPE_SECRET_KEY) {
//   throw new Error("STRIPE_SECRET_KEY is not defined");
// }

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
//   apiVersion: "2025-11-17.clover",
// });

// // Types
// interface CartItem {
//   productId: string;
//   name: string;
//   price: number;
//   quantity: number;
//   image?: string;
// }

// interface CheckoutResult {
//   success: boolean;
//   url?: string;
//   error?: string;
// }

// /**
//  * Creates a Stripe Checkout Session from cart items
//  * Validates stock and prices against Sanity before creating session
//  */
// export async function createCheckoutSession(
//   items: CartItem[]
// ): Promise<CheckoutResult> {
//   try {
//     // 1. Verify user is authenticated
//     const { userId } = await auth();
//     const user = await currentUser();

//     if (!userId || !user) {
//       return { success: false, error: "Please sign in to checkout" };
//     }

//     // 2. Validate cart is not empty
//     if (!items || items.length === 0) {
//       return { success: false, error: "Your cart is empty" };
//     }

//     // 3. Fetch current product data from Sanity to validate prices/stock
//     const productIds = items.map((item) => item.productId);
//     const products = await client.fetch(PRODUCTS_BY_IDS_QUERY, {
//       ids: productIds,
//     });

//     // 4. Validate each item
//     const validationErrors: string[] = [];
//     const validatedItems: {
//       product: (typeof products)[number];
//       quantity: number;
//     }[] = [];

//     for (const item of items) {
//       const product = products.find(
//         (p: { _id: string }) => p._id === item.productId
//       );

//       if (!product) {
//         validationErrors.push(`Product "${item.name}" is no longer available`);
//         continue;
//       }

//       if ((product.stock ?? 0) === 0) {
//         validationErrors.push(`"${product.name}" is out of stock`);
//         continue;
//       }

//       if (item.quantity > (product.stock ?? 0)) {
//         validationErrors.push(
//           `Only ${product.stock} of "${product.name}" available`
//         );
//         continue;
//       }

//       validatedItems.push({ product, quantity: item.quantity });
//     }

//     if (validationErrors.length > 0) {
//       return { success: false, error: validationErrors.join(". ") };
//     }

//     // 5. Create Stripe line items with validated prices
//     const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
//       validatedItems.map(({ product, quantity }) => ({
//         price_data: {
//           currency: "gbp",
//           product_data: {
//             name: product.name ?? "Product",
//             images: product.image?.asset?.url ? [product.image.asset.url] : [],
//             metadata: {
//               productId: product._id,
//             },
//           },
//           unit_amount: Math.round((product.price ?? 0) * 100), // Convert to pence
//         },
//         quantity,
//       }));

//     // 6. Get or create Stripe customer
//     const userEmail = user.emailAddresses[0]?.emailAddress ?? "";
//     const userName =
//       `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() || userEmail;

//     const { stripeCustomerId, sanityCustomerId } =
//       await getOrCreateStripeCustomer(userEmail, userName, userId);

//     // 7. Prepare metadata for webhook
//     const metadata = {
//       clerkUserId: userId,
//       userEmail,
//       sanityCustomerId,
//       productIds: validatedItems.map((i) => i.product._id).join(","),
//       quantities: validatedItems.map((i) => i.quantity).join(","),
//     };

//     // 8. Create Stripe Checkout Session
//     // Priority: NEXT_PUBLIC_BASE_URL > Vercel URL > localhost
//     const baseUrl =
//       process.env.NEXT_PUBLIC_BASE_URL ||
//       (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
//       "http://localhost:3000";

//     const session = await stripe.checkout.sessions.create({
//       mode: "payment",
//       payment_method_types: ["card"],
//       line_items: lineItems,
//       customer: stripeCustomerId,
//       shipping_address_collection: {
//         allowed_countries: [
//           "GB", // United Kingdom
//           "US", // United States
//           "CA", // Canada
//           "AU", // Australia
//           "NZ", // New Zealand
//           "IE", // Ireland
//           "DE", // Germany
//           "FR", // France
//           "ES", // Spain
//           "IT", // Italy
//           "NL", // Netherlands
//           "BE", // Belgium
//           "AT", // Austria
//           "CH", // Switzerland
//           "SE", // Sweden
//           "NO", // Norway
//           "DK", // Denmark
//           "FI", // Finland
//           "PT", // Portugal
//           "PL", // Poland
//           "CZ", // Czech Republic
//           "GR", // Greece
//           "HU", // Hungary
//           "RO", // Romania
//           "BG", // Bulgaria
//           "HR", // Croatia
//           "SI", // Slovenia
//           "SK", // Slovakia
//           "LT", // Lithuania
//           "LV", // Latvia
//           "EE", // Estonia
//           "LU", // Luxembourg
//           "MT", // Malta
//           "CY", // Cyprus
//           "JP", // Japan
//           "SG", // Singapore
//           "HK", // Hong Kong
//           "KR", // South Korea
//           "TW", // Taiwan
//           "MY", // Malaysia
//           "TH", // Thailand
//           "IN", // India
//           "AE", // United Arab Emirates
//           "SA", // Saudi Arabia
//           "IL", // Israel
//           "ZA", // South Africa
//           "BR", // Brazil
//           "MX", // Mexico
//           "AR", // Argentina
//           "CL", // Chile
//           "CO", // Colombia
//         ],
//       },
//       metadata,
//       success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: `${baseUrl}/checkout`,
//     });

//     return { success: true, url: session.url ?? undefined };
//   } catch (error) {
//     console.error("Checkout error:", error);
//     return {
//       success: false,
//       error: "Something went wrong. Please try again.",
//     };
//   }
// }

// /**
//  * Retrieves a checkout session by ID (for success page)
//  */
// export async function getCheckoutSession(sessionId: string) {
//   try {
//     const { userId } = await auth();

//     if (!userId) {
//       return { success: false, error: "Not authenticated" };
//     }

//     const session = await stripe.checkout.sessions.retrieve(sessionId, {
//       expand: ["line_items", "customer_details"],
//     });

//     // Verify the session belongs to this user
//     if (session.metadata?.clerkUserId !== userId) {
//       return { success: false, error: "Session not found" };
//     }

//     return {
//       success: true,
//       session: {
//         id: session.id,
//         customerEmail: session.customer_details?.email,
//         customerName: session.customer_details?.name,
//         amountTotal: session.amount_total,
//         paymentStatus: session.payment_status,
//         shippingAddress: session.customer_details?.address,
//         lineItems: session.line_items?.data.map((item) => ({
//           name: item.description,
//           quantity: item.quantity,
//           amount: item.amount_total,
//         })),
//       },
//     };
//   } catch (error) {
//     console.error("Get session error:", error);
//     return { success: false, error: "Could not retrieve order details" };
//   }
// }


"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { client } from "@/sanity/lib/client";
import { PRODUCTS_BY_IDS_QUERY } from "@/lib/sanity/queries/products";

type PaymentMethod = "bank_transfer" | "cod";

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface DeliveryInfo {
  name: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  postcode?: string;
  country?: string;
  notes?: string;
}

interface CreateOrderResult {
  success: boolean;
  orderId?: string;
  orderNumber?: string;
  error?: string;
}

function makeOrderNumber() {
  // simple readable order number (no extra deps)
  return (
    Math.random().toString(36).slice(2, 6).toUpperCase() +
    "-" +
    Date.now().toString().slice(-6)
  );
}

function getWriteClient() {
  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!token) throw new Error("SANITY_API_WRITE_TOKEN is not defined");
  return client.withConfig({ token, useCdn: false });
}

/**
 * Create order in Sanity (Bank Transfer or COD)
 * - Validates user
 * - Validates stock & prices from Sanity
 * - Creates order doc
 */
export async function createOrderFromCart({
  items,
  delivery,
  paymentMethod,
}: {
  items: CartItem[];
  delivery: DeliveryInfo;
  paymentMethod: PaymentMethod;
}): Promise<CreateOrderResult> {
  try {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
      return { success: false, error: "Please sign in to checkout" };
    }

    if (!items || items.length === 0) {
      return { success: false, error: "Your cart is empty" };
    }

    // Fetch products to validate stock & price
    const productIds = items.map((i) => i.productId);
    const products = await client.fetch(PRODUCTS_BY_IDS_QUERY, {
      ids: productIds,
    });

    const validationErrors: string[] = [];
    const validatedItems: {
      productId: string;
      quantity: number;
      priceAtPurchase: number;
      nameAtPurchase: string;
      imageAtPurchase?: string;
    }[] = [];

    for (const item of items) {
      const product = products.find(
        (p: { _id: string }) => p._id === item.productId,
      );

      if (!product) {
        validationErrors.push(`Product "${item.name}" is no longer available`);
        continue;
      }

      const stock = product.stock ?? 0;
      if (stock <= 0) {
        validationErrors.push(`"${product.name}" is out of stock`);
        continue;
      }

      if (item.quantity > stock) {
        validationErrors.push(`Only ${stock} of "${product.name}" available`);
        continue;
      }

      const price = product.price ?? 0;
      validatedItems.push({
        productId: product._id,
        quantity: item.quantity,
        priceAtPurchase: price,
        nameAtPurchase: product.name ?? "Product",
        imageAtPurchase: product.images?.[0]?.asset?.url ?? undefined,
      });
    }

    if (validationErrors.length > 0) {
      return { success: false, error: validationErrors.join(". ") };
    }

    const total = validatedItems.reduce(
      (acc, it) => acc + (it.priceAtPurchase ?? 0) * (it.quantity ?? 1),
      0,
    );

    const email = user.emailAddresses?.[0]?.emailAddress ?? "";

    const writeClient = getWriteClient();
    const createdAt = new Date().toISOString();
    const orderNumber = makeOrderNumber();

    const orderDoc = await writeClient.create({
      _type: "order",
      orderNumber,
      clerkUserId: userId,
      email,
      status: "pending", // fulfillment status
      paymentMethod, // "bank_transfer" | "cod"
      paymentStatus: "pending", // manual confirmation later
      total,
      createdAt,
      notes: delivery.notes ?? "",
      address: {
        name: delivery.name,
        phone: delivery.phone,
        line1: delivery.line1,
        line2: delivery.line2 ?? "",
        city: delivery.city,
        postcode: delivery.postcode ?? "",
        country: delivery.country ?? "NG",
      },
      items: validatedItems.map((it, idx) => ({
        _key: `${it.productId}-${idx}-${Date.now()}`,
        quantity: it.quantity,
        priceAtPurchase: it.priceAtPurchase,
        // keep ref so your existing order queries still work
        product: { _type: "reference", _ref: it.productId },
      })),
    });

    return { success: true, orderId: orderDoc._id, orderNumber };
  } catch (e) {
    console.error("createOrderFromCart error:", e);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}
