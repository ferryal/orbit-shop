import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCartStore } from "@/features/cart/model/cartStore";
import { CartItemRow } from "@/features/cart/ui/CartItemRow";
import { ConfirmDialog } from "@/shared/ui/ConfirmDialog";
import { ShoppingBag01Icon } from "hugeicons-react";
import { useState } from "react";
import { toast } from "sonner";

interface CartSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartSidebar({ open, onOpenChange }: CartSidebarProps) {
  const { items, totalPrice, clearCart } = useCartStore();
  const [showCheckoutDialog, setShowCheckoutDialog] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  async function handleConfirmCheckout() {
    setIsCheckingOut(true);
    // Simulate checkout API call (fixes issue #12 - loading state)
    await new Promise((resolve) => setTimeout(resolve, 1000));
    clearCart();
    setIsCheckingOut(false);
    setShowCheckoutDialog(false);
    onOpenChange(false);
    toast.success("Order placed successfully!", {
      description: "Thank you for your purchase.",
    });
  }

  const total = totalPrice();
  const isEmpty = items.length === 0;

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          className="w-full sm:max-w-md flex flex-col p-0"
          id="cart-sidebar"
        >
          <SheetHeader className="px-6 py-4 border-b border-border/50">
            <SheetTitle className="flex items-center gap-2 text-lg">
              <ShoppingBag01Icon size={20} />
              Shopping Cart
              {!isEmpty && (
                <span className="text-sm font-normal text-muted-foreground ml-1">
                  ({items.reduce((s, i) => s + i.quantity, 0)} items)
                </span>
              )}
            </SheetTitle>
          </SheetHeader>

          {/* Cart items */}
          <div className="flex-1 overflow-y-auto px-6">
            {isEmpty ? (
              <div className="flex flex-col items-center justify-center h-full gap-3 py-16 text-muted-foreground">
                <ShoppingBag01Icon size={48} className="opacity-20" />
                <p className="text-sm">Your cart is empty</p>
              </div>
            ) : (
              <div className="py-2">
                {items.map((item) => (
                  <CartItemRow key={item.product.id} item={item} />
                ))}
              </div>
            )}
          </div>

          {/* Footer with total + checkout */}
          {!isEmpty && (
            <div className="border-t border-border/50 px-6 py-4 space-y-3 bg-background/80 backdrop-blur-sm">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total</span>
                <span className="text-xl font-bold text-foreground">
                  NT$ {total.toLocaleString()}
                </span>
              </div>
              <Button
                className="w-full"
                size="lg"
                onClick={() => setShowCheckoutDialog(true)}
                id="checkout-btn"
                aria-label="Proceed to checkout"
              >
                Checkout
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Checkout confirmation dialog (F1) */}
      <ConfirmDialog
        open={showCheckoutDialog}
        onOpenChange={setShowCheckoutDialog}
        title="Confirm Checkout"
        description={`Proceed with your order of NT$ ${total.toLocaleString()}? This action cannot be undone.`}
        confirmLabel="Place Order"
        onConfirm={handleConfirmCheckout}
        isLoading={isCheckingOut}
      />
    </>
  );
}
