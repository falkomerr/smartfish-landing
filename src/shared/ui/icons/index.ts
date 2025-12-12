/**
 * Auto-generated icon components
 * Generated from SVG files in public/svg/
 * 
 * To regenerate icons, run: pnpm tsx scripts/generate-icons.ts
 */

export { ArrowRightIcon, type ArrowRightIconProps } from "./ArrowRightIcon";
export { BurgerIcon, type BurgerIconProps } from "./BurgerIcon";
export { CartHollowIcon, type CartHollowIconProps } from "./CartHollowIcon";
export { CartIcon, type CartIconProps } from "./CartIcon";
export { HeartIcon, type HeartIconProps } from "./HeartIcon";
export { PlayIcon, type PlayIconProps } from "./PlayIcon";
export { SearchIcon, type SearchIconProps } from "./SearchIcon";
export { StoreFrontIcon, type StoreFrontIconProps } from "./StoreFrontIcon";

// Export all icon names for reference
export const iconNames = ["ArrowRight", "Burger", "CartHollow", "Cart", "Heart", "Play", "Search", "StoreFront"] as const;
export type IconName = typeof iconNames[number];
