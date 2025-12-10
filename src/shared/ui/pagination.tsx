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
    <div
      className={cn('flex items-center', className)}
      style={{
        gap: 'clamp(0.313vw, 0.417vw, 1.042vw)',
      }}
    >
      <Button
        variant='ghost'
        size='icon'
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className='hover:bg-transparent'
        style={{
          width: 'clamp(1.25vw, 1.667vw, 4.167vw)',
          height: 'clamp(1.25vw, 1.667vw, 4.167vw)',
        }}
      >
        <ChevronLeft
          className='text-black'
          style={{
            width: 'clamp(0.625vw, 0.833vw, 2.083vw)',
            height: 'clamp(0.625vw, 0.833vw, 2.083vw)',
          }}
        />
        <span className='sr-only'>Предыдущая страница</span>
      </Button>

      {pages.map((page) => (
        <Button
          key={page}
          variant={currentPage === page ? 'primary' : 'ghost'}
          size='icon'
          onClick={() => onPageChange(page)}
          className={cn(
            'font-inter align-middle font-normal tracking-normal',
            currentPage === page
              ? '!bg-transparent !text-[#333B8F] hover:!text-[#333B8F]/90'
              : 'text-[#D6D8E9] hover:bg-transparent hover:text-[#D6D8E9]',
          )}
          style={{
            width: 'clamp(1.25vw, 1.667vw, 4.167vw)',
            height: 'clamp(1.25vw, 1.667vw, 4.167vw)',
            fontSize: 'clamp(0.469vw, 0.625vw, 1.563vw)',
            lineHeight: '1',
          }}
        >
          {String(page).padStart(2, '0')}
        </Button>
      ))}

      <Button
        variant='ghost'
        size='icon'
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className='hover:bg-transparent'
        style={{
          width: 'clamp(1.25vw, 1.667vw, 4.167vw)',
          height: 'clamp(1.25vw, 1.667vw, 4.167vw)',
        }}
      >
        <ChevronRight
          className='text-black'
          style={{
            width: 'clamp(0.625vw, 0.833vw, 2.083vw)',
            height: 'clamp(0.625vw, 0.833vw, 2.083vw)',
          }}
        />
        <span className='sr-only'>Следующая страница</span>
      </Button>
    </div>
  );
}

export { Pagination };
