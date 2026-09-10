import type { Product } from "@/shared/api/products";

export type { Product };

export interface CartItem {
  product: Product;
  quantity: number;
}
