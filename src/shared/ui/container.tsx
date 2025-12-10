import { cn } from '@/shared/lib/utils';

export const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn('flex gap-6 px-10', className)}>{children}</div>;
};
