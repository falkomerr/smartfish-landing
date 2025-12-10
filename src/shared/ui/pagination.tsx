import { ChevronLeft, ChevronRight } from 'lucide-react';

import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

function Pagination({ currentPage, totalPages, onPageChange, className }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Button
        variant='ghost'
        size='icon'
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className='h-8 w-8 hover:bg-transparent'
      >
        <ChevronLeft className='h-4 w-4 text-black' />
        <span className='sr-only'>Предыдущая страница</span>
      </Button>

      {pages.map((page) => (
        <Button
          key={page}
          variant={currentPage === page ? 'primary' : 'ghost'}
          size='icon'
          onClick={() => onPageChange(page)}
          className={cn(
            'font-inter h-8 w-8 align-middle text-[12px] leading-none font-normal tracking-normal',
            currentPage === page
              ? '!bg-transparent !text-[#333B8F] hover:!text-[#333B8F]/90'
              : 'text-[#D6D8E9] hover:bg-transparent hover:text-[#D6D8E9]',
          )}
        >
          {String(page).padStart(2, '0')}
        </Button>
      ))}

      <Button
        variant='ghost'
        size='icon'
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className='h-8 w-8 hover:bg-transparent'
      >
        <ChevronRight className='h-4 w-4 text-black' />
        <span className='sr-only'>Следующая страница</span>
      </Button>
    </div>
  );
}

export { Pagination };
