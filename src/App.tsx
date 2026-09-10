import { Toaster } from "@/components/ui/sonner";
import { CartSidebar } from "@/widgets/cart-sidebar/ui/CartSidebar";
import { Header } from "@/widgets/header/ui/Header";
import { ShopPage } from "@/pages/shop/index";
import { useState } from "react";
import { QueryProvider } from "@/app/providers/QueryProvider";

export function App() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <QueryProvider>
      <div className="min-h-screen bg-background">
        <Header onCartOpen={() => setCartOpen(true)} />
        <ShopPage />
        <CartSidebar open={cartOpen} onOpenChange={setCartOpen} />
        <Toaster position="bottom-right" richColors />
      </div>
    </QueryProvider>
  );
}
