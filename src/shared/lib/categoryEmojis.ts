export const CATEGORY_EMOJIS: Record<string, string> = {
  Audio: "🎧",
  Wearables: "⌚",
  Accessories: "🔋",
  Peripherals: "🖱️",
  Storage: "💾",
};

export function getCategoryEmoji(category?: string): string {
  return (category && CATEGORY_EMOJIS[category]) ?? "📦";
}
