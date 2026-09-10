import { Button } from "@/components/ui/button";
import type { CartItem } from "@/entities/product/model/types";
import { useCartStore } from "@/features/cart/model/cartStore";
import { ConfirmDialog } from "@/shared/ui/ConfirmDialog";
import { Delete01Icon, MinusSignIcon, PlusSignIcon } from "hugeicons-react";
import { useState } from "react";

interface CartItemRowProps {
  item: CartItem;
}

const CATEGORY_EMOJIS: Record<string, string> = {
  Audio: "🎧",
  Wearables: "⌚",
  Accessories: "🔋",
  Peripherals: "🖱️",
  Storage: "💾",
};

export function CartItemRow({ item }: CartItemRowProps) {
  const { updateQuantity, removeItem } = useCartStore();
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);

  function handleDecrement() {
    if (item.quantity === 1) {
      setShowRemoveDialog(true);
    } else {
      updateQuantity(item.product.id, item.quantity - 1);
    }
  }

  function handleConfirmRemove() {
    removeItem(item.product.id);
    setShowRemoveDialog(false);
  }

  return (
    <>
      <div className="flex items-center gap-3 py-3 border-b border-border/50 last:border-0">
        {/* Product thumbnail */}
        <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-xl flex-shrink-0">
          {CATEGORY_EMOJIS[item.product.category ?? ""] ?? "📦"}
        </div>

        {/* Product details */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground truncate">
            {item.product.name}
          </p>
          <p className="text-sm text-primary font-semibold">
            NT$ {item.product.price.toLocaleString()}
          </p>

          {/* Quantity controls */}
          <div className="flex items-center gap-2 mt-1">
            <Button
              variant="outline"
              size="icon"
              className="h-6 w-6"
              onClick={handleDecrement}
              id={`decrement-${item.product.id}`}
              aria-label="Decrease quantity"
            >
              <MinusSignIcon size={12} />
            </Button>
            <span className="text-sm font-bold w-6 text-center" aria-label="Quantity">
              {item.quantity}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="h-6 w-6"
              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
              id={`increment-${item.product.id}`}
              aria-label="Increase quantity"
            >
              <PlusSignIcon size={12} />
            </Button>
          </div>
        </div>

        {/* Subtotal + remove */}
        <div className="flex flex-col items-end gap-1">
          <p className="text-sm font-bold">
            NT$ {(item.product.price * item.quantity).toLocaleString()}
          </p>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-destructive hover:text-destructive"
            onClick={() => setShowRemoveDialog(true)}
            id={`remove-${item.product.id}`}
            aria-label={`Remove ${item.product.name}`}
          >
            <Delete01Icon size={14} />
          </Button>
        </div>
      </div>

      {/* Remove confirmation dialog (F1) */}
      <ConfirmDialog
        open={showRemoveDialog}
        onOpenChange={setShowRemoveDialog}
        title="Remove Item"
        description={`Remove "${item.product.name}" from your cart?`}
        confirmLabel="Remove"
        onConfirm={handleConfirmRemove}
        variant="destructive"
      />
    </>
  );
}
