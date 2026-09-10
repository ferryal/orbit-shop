export interface Product {
  id: number;
  name: string;
  price: number;
  image?: string;
  category?: string;
}

const MOCK_PRODUCTS: Product[] = [
  { id: 1, name: "Wireless Bluetooth Earphones", price: 2999, category: "Audio" },
  { id: 2, name: "Smart Watch", price: 8999, category: "Wearables" },
  { id: 3, name: "Portable Power Bank", price: 1299, category: "Accessories" },
  { id: 4, name: "Wireless Mouse", price: 899, category: "Peripherals" },
  { id: 5, name: "Mechanical Keyboard", price: 3999, category: "Peripherals" },
  { id: 6, name: "Webcam HD", price: 2199, category: "Peripherals" },
  { id: 7, name: "USB Flash Drive 128GB", price: 599, category: "Storage" },
  { id: 8, name: "Desktop Speaker", price: 1599, category: "Audio" },
];

export async function fetchProducts(): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return MOCK_PRODUCTS;
}
