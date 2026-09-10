import { Button } from "@/components/ui/button";
import { CartBadge } from "@/features/cart/ui/CartBadge";
import { ShoppingCart01Icon } from "hugeicons-react";

interface HeaderProps {
  onCartOpen: () => void;
}

export function Header({ onCartOpen }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <span className="text-2xl" aria-hidden="true">🛍️</span>
            <h1 className="text-xl font-bold tracking-tight text-foreground">
              Orbit Shop
            </h1>
          </div>

          {/* Cart button */}
          <div className="relative">
            <Button
              variant="outline"
              size="icon"
              onClick={onCartOpen}
              id="open-cart-btn"
              aria-label="Open shopping cart"
              className="relative h-10 w-10"
            >
              <ShoppingCart01Icon size={20} />
            </Button>
            <CartBadge />
          </div>
        </div>
      </div>
    </header>
  );
}
