import type { Product } from "@/entities/product/model/types";
import { useDebounce } from "@/shared/lib/useDebounce";
import { useMemo, useState } from "react";

export function useProductSearch(products: Product[]) {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);

  const filtered = useMemo(
    () =>
      products.filter((p) =>
        p.name.toLowerCase().includes(debouncedQuery.toLowerCase())
      ),
    [products, debouncedQuery]
  );

  return { query, setQuery, filtered };
}
