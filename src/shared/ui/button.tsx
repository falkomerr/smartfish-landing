import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/shared/utils';
import { type IconProps } from '@/shared/ui/Icon';

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium transition-all disabled:pointer-events-none cursor-pointer disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive button-hover",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        primary: 'bg-[#333B8F] text-[#FFFFFF] hover:bg-[#333B8F]/90',
        secondary: 'bg-[#F1F1F7] text-[#333B8F] hover:bg-[#F1F1F7]/90',
        tertiary: 'bg-[#FFFFFF] text-[#333B8F] hover:bg-[#FFFFFF]/90 ',
        destructive:
          'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'rounded-md',
        sm: 'rounded-md',
        lg: 'rounded-full',
        icon: '',
        'icon-sm': '',
        'icon-lg': '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

const getButtonSizeStyles = (size?: 'default' | 'sm' | 'lg' | 'icon' | 'icon-sm' | 'icon-lg' | null) => {
  switch (size) {
    case 'sm':
      return {
        height: 'clamp(1.25vw, 1.667vw, 4.167vw)',
        paddingLeft: 'clamp(0.469vw, 0.625vw, 1.563vw)',
        paddingRight: 'clamp(0.469vw, 0.625vw, 1.563vw)',
        paddingTop: 'clamp(0.313vw, 0.417vw, 1.042vw)',
        paddingBottom: 'clamp(0.313vw, 0.417vw, 1.042vw)',
        gap: 'clamp(0.234vw, 0.313vw, 0.781vw)',
        borderRadius: 'clamp(0.234vw, 0.313vw, 0.781vw)',
        fontSize: 'clamp(0.469vw, 0.625vw, 1.563vw)',
      };
    case 'lg':
      return {
        height: 'clamp(1.953vw, 2.604vw, 6.51vw)',
        paddingLeft: 'clamp(0.625vw, 0.833vw, 2.083vw)',
        paddingRight: 'clamp(0.625vw, 0.833vw, 2.083vw)',
        paddingTop: 'clamp(0.469vw, 0.625vw, 1.563vw)',
        paddingBottom: 'clamp(0.469vw, 0.625vw, 1.563vw)',
        gap: 'clamp(0.313vw, 0.417vw, 1.042vw)',
        borderRadius: '9999px',
        fontSize: 'clamp(0.469vw, 0.625vw, 1.563vw)',
      };
    case 'icon':
      return {
        width: 'clamp(1.406vw, 1.875vw, 4.688vw)',
        height: 'clamp(1.406vw, 1.875vw, 4.688vw)',
      };
    case 'icon-sm':
      return {
        width: 'clamp(1.25vw, 1.667vw, 4.167vw)',
        height: 'clamp(1.25vw, 1.667vw, 4.167vw)',
      };
    case 'icon-lg':
      return {
        width: 'clamp(1.563vw, 2.083vw, 5.208vw)',
        height: 'clamp(1.563vw, 2.083vw, 5.208vw)',
      };
    default:
      return {
        height: 'clamp(1.406vw, 1.875vw, 4.688vw)',
        paddingLeft: 'clamp(0.625vw, 0.833vw, 2.083vw)',
        paddingRight: 'clamp(0.625vw, 0.833vw, 2.083vw)',
        paddingTop: 'clamp(0.313vw, 0.417vw, 1.042vw)',
        paddingBottom: 'clamp(0.313vw, 0.417vw, 1.042vw)',
        gap: 'clamp(0.313vw, 0.417vw, 1.042vw)',
        borderRadius: 'clamp(0.234vw, 0.313vw, 0.781vw)',
        fontSize: 'clamp(0.469vw, 0.625vw, 1.563vw)',
      };
  }
};

export interface ButtonProps
  extends React.ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  /**
   * Icon to display on the left side of the button text
   */
  leftIcon?: React.ReactElement<IconProps> | React.ReactNode;
  /**
   * Icon to display on the right side of the button text
   */
  rightIcon?: React.ReactElement<IconProps> | React.ReactNode;
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  leftIcon,
  rightIcon,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button';

  // Determine icon size based on button size
  const iconSize = size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'default';
  const sizeStyles = getButtonSizeStyles(size);

  return (
    <Comp
      data-slot='button'
      className={cn(buttonVariants({ variant, size, className }))}
      style={sizeStyles}
      {...props}
    >
      {leftIcon && (
        <span className='flex items-center'>
          {React.isValidElement(leftIcon)
            ? React.cloneElement(leftIcon as React.ReactElement<IconProps>, {
                size: iconSize,
              })
            : leftIcon}
        </span>
      )}
      {children}
      {rightIcon && (
        <span className='flex items-center'>
          {React.isValidElement(rightIcon)
            ? React.cloneElement(rightIcon as React.ReactElement<IconProps>, {
                size: iconSize,
              })
            : rightIcon}
        </span>
      )}
    </Comp>
  );
}

export { Button, buttonVariants };
