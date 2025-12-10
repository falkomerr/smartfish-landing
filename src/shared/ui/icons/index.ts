/**
 * Auto-generated icon components
 * Generated from SVG files in public/svg/
 * 
 * To regenerate icons, run: pnpm tsx scripts/generate-icons.ts
 */

export { BurgerIcon, type BurgerIconProps } from "./BurgerIcon";
export { CartIcon, type CartIconProps } from "./CartIcon";
export { HeartIcon, type HeartIconProps } from "./HeartIcon";
export { SearchIcon, type SearchIconProps } from "./SearchIcon";

// Export all icon names for reference
export const iconNames = ["Burger", "Cart", "Heart", "Search"] as const;
export type IconName = typeof iconNames[number];
