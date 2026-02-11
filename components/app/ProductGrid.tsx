import { PackageSearch } from "lucide-react";
import { ProductCard } from "./ProductCard";
// import { EmptyState } from "@/components/ui/empty";
import type { FILTER_PRODUCTS_BY_NAME_QUERYResult } from "@/sanity.types";
import { Card, CardContent } from "../ui/card";

interface ProductGridProps {
  products: FILTER_PRODUCTS_BY_NAME_QUERYResult;
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
     return (
       <div className="flex min-h-[400px] items-center justify-center">
         <Card className="w-full max-w-md border-dashed">
           <CardContent className="flex flex-col items-center justify-center py-16 text-center">
             <div className="mb-4 rounded-full bg-muted p-4">
               <PackageSearch className="h-8 w-8 text-muted-foreground" />
             </div>

             <h3 className="text-lg font-semibold">No products found</h3>

             <p className="mt-2 text-sm text-muted-foreground">
               Try adjusting your search or filters to find what you're looking
               for.
             </p>
           </CardContent>
         </Card>
       </div>
     );
  }

  return (
    <div className="@container">
      <div className="grid grid-cols-1 gap-6 @md:grid-cols-2 @xl:grid-cols-3 @6xl:grid-cols-4 @md:gap-8">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
