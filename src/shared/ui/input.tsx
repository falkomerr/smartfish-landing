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
      <div
        className={cn('flex items-center rounded-full bg-[#F1F1F7]', className)}
        style={{
          height: 'clamp(1.953vw, 2.604vw, 6.51vw)',
          gap: 'clamp(0.156vw, 0.208vw, 0.521vw)',
        }}
      >
        {leftIcon && (
          <span
            className='flex shrink-0 items-center'
            style={{
              paddingLeft: 'clamp(0.039vw, 0.052vw, 0.13vw)',
            }}
          >
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
            'flex-1 border-none bg-transparent outline-none',
            'placeholder:text-[#919194]',
            'text-foreground',
            '[&::placeholder]:opacity-100',
          )}
          style={{
            padding: leftIcon || rightIcon ? 'clamp(0.039vw, 0.052vw, 0.13vw)' : 'clamp(0.195vw, 0.26vw, 0.651vw)',
          }}
          {...props}
        />
        {rightIcon && (
          <span
            className='flex shrink-0 items-center'
            style={{
              paddingRight: 'clamp(0.039vw, 0.052vw, 0.13vw)',
            }}
          >
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
