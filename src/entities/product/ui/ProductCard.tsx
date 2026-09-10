import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import type { Product } from "@/entities/product/model/types";
import { useCartStore } from "@/features/cart/model/cartStore";
import { ShoppingCart01Icon } from "hugeicons-react";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

const CATEGORY_EMOJIS: Record<string, string> = {
  Audio: "🎧",
  Wearables: "⌚",
  Accessories: "🔋",
  Peripherals: "🖱️",
  Storage: "💾",
};

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);

  function handleAddToCart() {
    addItem(product);
    toast.success(`${product.name} added to cart`, {
      description: `NT$ ${product.price.toLocaleString()}`,
    });
  }

  return (
    <Card className="group flex flex-col h-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-border/60">
      <CardHeader className="p-0">
        <div className="relative h-48 bg-gradient-to-br from-muted/60 to-muted flex items-center justify-center text-5xl overflow-hidden">
          <span className="transition-transform duration-300 group-hover:scale-110 select-none">
            {CATEGORY_EMOJIS[product.category ?? ""] ?? "📦"}
          </span>
          {product.category && (
            <span className="absolute top-2 right-2 text-xs font-medium bg-background/80 backdrop-blur-sm text-muted-foreground px-2 py-1 rounded-full border border-border/50">
              {product.category}
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-4">
        <h3 className="font-semibold text-foreground text-sm leading-tight mb-2 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-lg font-bold text-primary">
          NT$ {product.price.toLocaleString()}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full gap-2"
          onClick={handleAddToCart}
          id={`add-to-cart-${product.id}`}
        >
          <ShoppingCart01Icon size={16} />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
