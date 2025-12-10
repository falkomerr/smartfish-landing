import { cn } from '@/shared/lib/utils';
import { type IconProps } from '@/shared/ui/Icon';
import * as React from 'react';

export interface InputProps extends React.ComponentProps<'input'> {
  /**
   * Icon to display on the left side of the input
   */
  leftIcon?: React.ReactElement<IconProps> | React.ReactNode;
  /**
   * Icon to display on the right side of the input
   */
  rightIcon?: React.ReactElement<IconProps> | React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, leftIcon, rightIcon, ...props }, ref) => {
    return (
      <div className={cn('flex h-12.5 items-center gap-1 rounded-full bg-[#F1F1F7]', className)}>
        {leftIcon && (
          <span className='flex shrink-0 items-center pl-1'>
            {React.isValidElement(leftIcon)
              ? React.cloneElement(leftIcon as React.ReactElement<IconProps>, {
                  size: 'default',
                })
              : leftIcon}
          </span>
        )}
        <input
          ref={ref}
          className={cn(
            'flex-1 border-none bg-transparent p-1 outline-none',
            'placeholder:text-[#919194]',
            'text-foreground',
            '[&::placeholder]:opacity-100',
            !leftIcon && !rightIcon && 'px-5',
          )}
          {...props}
        />
        {rightIcon && (
          <span className='flex shrink-0 items-center pr-1'>
            {React.isValidElement(rightIcon)
              ? React.cloneElement(rightIcon as React.ReactElement<IconProps>, {
                  size: 'default',
                })
              : rightIcon}
          </span>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export { Input };
