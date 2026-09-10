import { Skeleton } from "@/components/ui/skeleton";
import { ProductCard } from "@/entities/product/ui/ProductCard";
import { useProducts } from "@/entities/product/model/useProducts";
import { useProductSearch } from "@/features/product-search/model/useProductSearch";
import { SearchBox } from "@/features/product-search/ui/SearchBox";
import { Search01Icon } from "hugeicons-react";

export function ShopPage() {
  const { data: products = [], isLoading, isError, refetch } = useProducts();
  const { query, setQuery, filtered } = useProductSearch(products);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page heading */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-foreground mb-1">
          Products
        </h2>
        <p className="text-muted-foreground text-sm">
          {isLoading
            ? "Loading products..."
            : `${products.length} products available`}
        </p>
      </div>

      {/* Search bar (F4) */}
      {!isLoading && !isError && (
        <div className="mb-6">
          <SearchBox value={query} onChange={setQuery} />
        </div>
      )}

      {/* Error state (fixes issue #15, #7) */}
      {isError && (
        <div className="flex flex-col items-center gap-4 py-20 text-center">
          <p className="text-muted-foreground text-lg">Failed to load products</p>
          <button
            onClick={() => refetch()}
            className="text-primary underline underline-offset-4 hover:opacity-80 transition-opacity text-sm"
            id="retry-load-btn"
          >
            Try again
          </button>
        </div>
      )}

      {/* Loading state — skeleton grid (fixes issue #7, #8) */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-3">
              <Skeleton className="h-48 w-full rounded-xl" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      )}

      {/* Empty search state */}
      {!isLoading && !isError && filtered.length === 0 && query && (
        <div className="flex flex-col items-center gap-3 py-20 text-center text-muted-foreground">
          <Search01Icon size={48} className="opacity-30" />
          <p className="text-lg font-medium">No products found</p>
          <p className="text-sm">Try adjusting your search term</p>
        </div>
      )}

      {/* Product grid (fixes issues #1, #3, #4) — responsive Tailwind grid */}
      {!isLoading && !isError && filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}
