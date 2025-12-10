import { cn } from "@/shared/lib/utils";
import * as React from "react";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  /**
   * Size variant of the icon
   * @default "default"
   */
  size?: "sm" | "default" | "lg";
  /**
   * SVG content as children (inline SVG elements)
   */
  children?: React.ReactNode;
  /**
   * SVG path data (d attribute)
   */
  path?: string;
  /**
   * ViewBox for the SVG
   * @default "0 0 24 24"
   */
  viewBox?: string;
}

const sizeMap = {
  sm: "w-4 h-4",
  default: "w-5 h-5",
  lg: "w-6 h-6",
};

/**
 * Icon component for rendering SVG icons
 * Supports both inline SVG children and path-based SVG
 */
export const Icon = ({
  size = "default",
  className,
  children,
  path,
  viewBox = "0 0 24 24",
  ...props
}: IconProps) => {
  const sizeClasses = sizeMap[size];

  // If children are provided, render them as inline SVG content
  if (children) {
    return (
      <svg
        className={cn(sizeClasses, className)}
        viewBox={viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        {children}
      </svg>
    );
  }

  // If path is provided, render path-based SVG
  if (path) {
    return (
      <svg
        className={cn(sizeClasses, className)}
        viewBox={viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path d={path} fill="currentColor" />
      </svg>
    );
  }

  // If neither children nor path is provided, return null
  return null;
};
