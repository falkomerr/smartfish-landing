/**
 * Auto-generated icon components
 * Generated from SVG files in public/svg/
 *
 * To regenerate icons, run: pnpm tsx scripts/generate-icons.ts
 */

export { ArrowLeftIcon, type ArrowLeftIconProps } from './ArrowLeftIcon';
export { ArrowRightIcon, type ArrowRightIconProps } from './ArrowRightIcon';
export { BurgerIcon, type BurgerIconProps } from './BurgerIcon';
export { CartHollowIcon, type CartHollowIconProps } from './CartHollowIcon';
export { CartIcon, type CartIconProps } from './CartIcon';
export { HeartIcon, type HeartIconProps } from './HeartIcon';
export { SearchIcon, type SearchIconProps } from './SearchIcon';

// Export all icon names for reference
export const iconNames = [
  'ArrowLeft',
  'ArrowRight',
  'Burger',
  'CartHollow',
  'Cart',
  'Heart',
  'Search',
] as const;
export type IconName = (typeof iconNames)[number];
