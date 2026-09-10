# 🛍️ Orbit Shop

A modern electronics shopping cart application built as a **Frontend Architecture Challenge** — migrating a vanilla HTML/JS implementation into a production-grade React application.

![Orbit Shop Main Page](./reference/screenshots/main.png)

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🗂️ **Product Grid** | Responsive 4-column grid (collapses to 1 on mobile) with category badges |
| 🔍 **Search** | Real-time debounced (300ms) product search with empty state |
| 🛒 **Shopping Cart** | Slide-in cart sidebar with item list, subtotals, and total |
| 🔢 **Cart Badge** | Live quantity badge on cart icon, updated reactively via Zustand |
| ✅ **Confirm Dialogs** | Confirmation dialogs before checkout and item removal |
| 🔔 **Toast Notifications** | Non-blocking toast on every "Add to Cart" action |
| 💾 **Cart Persistence** | Cart state persisted to `localStorage` across page refreshes |
| ⏳ **Loading Skeletons** | Animated skeleton cards during product fetch |
| ❌ **Error Handling** | Error state with retry button if product fetch fails |

---

## 🧱 Tech Stack

| Concern | Library | Version |
|---------|---------|---------|
| Framework | React | ^19 |
| Build Tool | Vite | ^8 |
| Package Manager | pnpm | ^10 |
| Language | TypeScript | ^6 (strict) |
| Architecture | Feature-Sliced Design (FSD) | — |
| UI Components | [shadcn/ui](https://ui.shadcn.com/) (Base UI / Nova preset) | latest |
| Icons | [hugeicons-react](https://hugeicons.com/) | ^0.4 |
| State Management | [Zustand](https://zustand-demo.pmnd.rs/) + `persist` middleware | ^5 |
| Data Fetching | [TanStack Query](https://tanstack.com/query) | ^5 |
| Notifications | [Sonner](https://sonner.emilkowal.ski/) | ^2 |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) | ^4 |

---

## 🗂️ Architecture — Feature-Sliced Design (FSD)

This project strictly follows the [Feature-Sliced Design](https://feature-sliced.design/) methodology. Each layer can only import from layers below it.

```
src/
├── app/                                    # Bootstrap layer
│   └── providers/
│       └── QueryProvider.tsx               # TanStack Query client setup
│
├── pages/                                  # Route-level pages
│   └── shop/
│       └── index.tsx                       # ShopPage (product grid + search)
│
├── widgets/                                # Self-contained UI blocks
│   ├── header/ui/Header.tsx                # Sticky header with cart icon
│   └── cart-sidebar/ui/CartSidebar.tsx     # Slide-in cart panel
│
├── features/                               # User-facing features
│   ├── cart/
│   │   ├── model/cartStore.ts              # Zustand cart store
│   │   └── ui/
│   │       ├── CartBadge.tsx               # Reactive cart counter badge
│   │       └── CartItemRow.tsx             # Cart item with qty controls
│   └── product-search/
│       ├── model/useProductSearch.ts       # Debounced filter hook
│       └── ui/SearchBox.tsx                # Search input with icon
│
├── entities/                               # Domain models
│   └── product/
│       ├── model/
│       │   ├── types.ts                    # Product, CartItem interfaces
│       │   └── useProducts.ts              # TanStack Query hook
│       └── ui/ProductCard.tsx              # Product display card
│
└── shared/                                 # Pure utilities & primitives
    ├── api/products.ts                     # Mock fetchProducts() (800ms delay)
    ├── lib/useDebounce.ts                  # Generic debounce hook
    └── ui/ConfirmDialog.tsx                # Reusable confirm dialog
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) ≥ 18
- [pnpm](https://pnpm.io/) ≥ 9

### Install & Run

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

The dev server starts at **http://localhost:5173** (or next available port).

---

## 🏗️ State Management

### Cart Store (Zustand)

```ts
// src/features/cart/model/cartStore.ts
interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  totalQuantity: () => number;
  totalPrice: () => number;
}
```

Cart is persisted to `localStorage` under the key `orbit-cart`.

### Data Fetching (TanStack Query)

```ts
// src/entities/product/model/useProducts.ts
export function useProducts() {
  return useQuery({
    queryKey: ['products', 'list'],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
```

---

## 🔧 Issues Fixed (from Reference Implementation)

This project resolves all 16 documented issues from the original vanilla HTML reference:

| # | Category | Issue → Fix |
|---|----------|------------|
| 1 | CSS | Fixed `1200px` width → `max-w-7xl` responsive container |
| 2 | CSS | `float: right` cart icon → flexbox `justify-between` |
| 3 | CSS | Fixed 4-column grid → `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4` |
| 4 | CSS | Missing media queries → Tailwind responsive prefixes |
| 5 | CSS | Over-nested CSS selectors → flat Tailwind utilities |
| 6 | JS | Global `var` pollution → Zustand store |
| 7 | JS | No error handling on fetch → TanStack Query `isError` + retry |
| 8 | JS | Inefficient DOM mutation → declarative React rendering |
| 9 | JS | No debounce on search → `useDebounce(query, 300)` + `useMemo` |
| 10 | JS | No user feedback on add → Sonner toast notification |
| 11 | JS | Repeated DOM queries → Zustand selectors |
| 12 | JS | No loading state in checkout → `isCheckingOut` state + spinner |
| 13 | JS | No event delegation → React synthetic events |
| 14 | JS | No resize debounce → Tailwind (no listener needed) |
| 15 | JS | No load error handling → `isError` state with retry button |
| 16 | JS | No event listener cleanup → React lifecycle management |

---

## 📁 Reference

The original vanilla HTML/JS implementation is preserved in [`reference/index.html`](./reference/index.html) for comparison. The challenge brief is in [`reference/Doc.md`](./reference/Doc.md).

---

## 📄 License

MIT
