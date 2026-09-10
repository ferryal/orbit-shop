import { Input } from "@/components/ui/input";
import { Search01Icon } from "hugeicons-react";

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBox({
  value,
  onChange,
  placeholder = "Search products...",
}: SearchBoxProps) {
  return (
    <div className="relative w-full max-w-md">
      <Search01Icon
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
      />
      <Input
        id="product-search"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="pl-9"
        aria-label="Search products"
      />
    </div>
  );
}
