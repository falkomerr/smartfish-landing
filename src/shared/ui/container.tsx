import { cn } from '@/shared/utils';

export const Container = ({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) => {
  return (
    <div
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
};
