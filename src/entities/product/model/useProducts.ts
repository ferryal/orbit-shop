import { fetchProducts } from "@/shared/api/products";
import { useQuery } from "@tanstack/react-query";

export const productKeys = {
  all: ["products"] as const,
  list: () => [...productKeys.all, "list"] as const,
};

export function useProducts() {
  return useQuery({
    queryKey: productKeys.list(),
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000,
  });
}
