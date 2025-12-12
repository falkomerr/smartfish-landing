import { forwardRef } from 'react';
import { cn } from '@/shared/utils';

export const Container = forwardRef<HTMLDivElement, {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}>(({ children, className, style }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('flex', className)}
      style={{
        gap: 'clamp(0.938vw, 1.25vw, 3.125vw)',
        paddingLeft: 'clamp(1.563vw, 2.083vw, 5.208vw)',
        paddingRight: 'clamp(1.563vw, 2.083vw, 5.208vw)',
        ...style,
      }}
    >
      {children}
    </div>
  );
});

Container.displayName = 'Container';
