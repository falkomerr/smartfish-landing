import { Icon, type IconProps } from "../Icon";

export interface StoreIconProps extends Omit<IconProps, "children" | "viewBox"> {}

/**
 * Store icon component
 * Storefront icon with awning for store locations
 */
export function StoreIcon(props: StoreIconProps) {
  return (
    <Icon viewBox="0 0 24 24" {...props}>
      {/* Building base */}
      <rect
        x="3"
        y="12"
        width="18"
        height="9"
        fill="none"
        stroke="#333B8F"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Awning */}
      <path
        d="M3 12L12 6L21 12"
        fill="none"
        stroke="#333B8F"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Door */}
      <rect
        x="9"
        y="16"
        width="2"
        height="5"
        fill="none"
        stroke="#333B8F"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Window left */}
      <rect
        x="5"
        y="14"
        width="2"
        height="2"
        fill="none"
        stroke="#333B8F"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Window right */}
      <rect
        x="17"
        y="14"
        width="2"
        height="2"
        fill="none"
        stroke="#333B8F"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}

