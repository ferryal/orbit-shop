import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/features/cart/model/cartStore";

export function CartBadge() {
  const totalQuantity = useCartStore((s) => s.totalQuantity());

  if (totalQuantity === 0) return null;

  return (
    <Badge
      className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs font-bold"
      id="cart-badge"
    >
      {totalQuantity > 99 ? "99+" : totalQuantity}
    </Badge>
  );
}
