'use client';

import { Button } from '@/shared/ui/button';
import { Container } from '@/shared/ui/container';
import { ArrowLeftIcon, ArrowRightIcon } from '@/shared/ui/icons';
import { ProductCard, type ProductCardProps } from '@/widgets/product-card';
import { ArrowUpRightIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export interface NewProductsProps {
  products: ProductCardProps[];
  onViewAll?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export function NewProducts({ products, onViewAll, className, style }: NewProductsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const rafIdRef = useRef<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const checkScrollability = () => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const { scrollLeft, scrollWidth, clientWidth } = container;

    // Используем более точную проверку с учетом возможных погрешностей округления
    const threshold = 2;
    const maxScrollLeft = scrollWidth - clientWidth;

    const newCanScrollLeft = scrollLeft > threshold;
    const newCanScrollRight = scrollLeft < maxScrollLeft - threshold;

    // Обновляем состояние только если значения действительно изменились
    setCanScrollLeft((prev) => {
      if (prev !== newCanScrollLeft) {
        return newCanScrollLeft;
      }
      return prev;
    });

    setCanScrollRight((prev) => {
      if (prev !== newCanScrollRight) {
        return newCanScrollRight;
      }
      return prev;
    });
  };

  const handleScroll = () => {
    // Отменяем предыдущий запрос, если он есть
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
    }

    // Используем requestAnimationFrame для оптимизации
    rafIdRef.current = requestAnimationFrame(() => {
      checkScrollability();
      rafIdRef.current = null;
    });
  };

  const handleScrollEnd = () => {
    // Проверяем после завершения скролла с небольшой задержкой
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      checkScrollability();
    }, 100);
  };

  useEffect(() => {
    // Проверяем после небольшой задержки, чтобы дать время на рендеринг
    const initialCheck = setTimeout(() => {
      checkScrollability();
    }, 100);

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      // Используем passive для лучшей производительности
      scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
      scrollContainer.addEventListener('scrollend', handleScrollEnd, { passive: true });

      const handleResize = () => {
        // Проверяем после ресайза с задержкой
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
          checkScrollability();
        }, 150);
      };

      window.addEventListener('resize', handleResize, { passive: true });

      return () => {
        clearTimeout(initialCheck);
        scrollContainer.removeEventListener('scroll', handleScroll);
        scrollContainer.removeEventListener('scrollend', handleScrollEnd);
        window.removeEventListener('resize', handleResize);
        if (rafIdRef.current !== null) {
          cancelAnimationFrame(rafIdRef.current);
        }
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }

    return () => {
      clearTimeout(initialCheck);
    };
  }, [products]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
      scrollContainerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <Container
      className={`flex flex-col ${className || ''}`}
      style={{
        gap: 'clamp(1.25vw, 1.667vw, 4.167vw)',
        ...style,
      }}
    >
      {/* Title */}
      <h2 className='text-title-sm w-fit text-black'>Новинки товаров</h2>

      {/* Carousel Container */}
      <div className='relative -ml-10 flex w-screen items-center pl-10'>
        {/* Scrollable Product Cards */}
        <div
          ref={scrollContainerRef}
          className='scrollbar-hide flex overflow-x-auto'
          style={{
            gap: 'clamp(0.938vw, 1.25vw, 3.125vw)',
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            paddingRight: 'clamp(3.125vw, 4.167vw, 10.417vw)',
          }}
        >
          {products.map((product, index) => (
            <div
              key={index}
              style={{
                scrollSnapAlign: 'start',
                flexShrink: 0,
              }}
            >
              <ProductCard {...product} extended weight='100 г' />
            </div>
          ))}
        </div>

        {/* Navigation Arrow Button Left */}
        {canScrollLeft && (
          <button
            onClick={scrollLeft}
            className='absolute left-4 z-10 flex items-center justify-center rounded-full bg-[#F1F1F7] transition-colors hover:bg-[#E5E5E5]'
            style={{
              width: 'clamp(2.5vw, 3.333vw, 8.333vw)',
              height: 'clamp(2.5vw, 3.333vw, 8.333vw)',
              boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <ArrowLeftIcon
              size='default'
              style={{
                width: 'clamp(0.938vw, 1.25vw, 3.125vw)',
                height: 'clamp(0.938vw, 1.25vw, 3.125vw)',
              }}
            />
          </button>
        )}

        {/* Navigation Arrow Button Right */}
        {canScrollRight && (
          <button
            onClick={scrollRight}
            className='absolute right-4 z-10 flex items-center justify-center rounded-full bg-[#F1F1F7] transition-colors hover:bg-[#E5E5E5]'
            style={{
              width: 'clamp(2.5vw, 3.333vw, 8.333vw)',
              height: 'clamp(2.5vw, 3.333vw, 8.333vw)',
              boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <ArrowRightIcon
              size='default'
              style={{
                width: 'clamp(0.938vw, 1.25vw, 3.125vw)',
                height: 'clamp(0.938vw, 1.25vw, 3.125vw)',
              }}
            />
          </button>
        )}
      </div>

      {/* View All Button */}
      <div className='flex items-center justify-center gap-2'>
        <Button
          variant='primary'
          size='lg'
          onClick={onViewAll}
          className='group font-inter relative !h-fit rounded-full !py-5'
          style={{
            paddingLeft: 'clamp(0.8125vw, 1.0833vw, 2.7083vw)',
            paddingRight: 'clamp(3.5vw, 3.2vw, 4.1vw)',
            fontFamily: 'var(--font-inter)',
            fontWeight: 600,
            fontStyle: 'normal',
            fontSize: 'clamp(0.625vw, 0.833vw, 2.083vw)',
            lineHeight: 'clamp(0.938vw, 1.25vw, 3.125vw)',
            textAlign: 'center',
            verticalAlign: 'middle',
          }}
        >
          <div
            className='absolute top-1/2 -translate-y-1/2 rounded-full bg-white transition-all **:text-[#333B8F] group-hover:rotate-45'
            style={{
              right: 'clamp(0.4875vw, 0.65vw, 1.625vw)',
              padding: 'clamp(0.325vw, 0.4333vw, 1.0833vw)',
            }}
          >
            <ArrowUpRightIcon
              style={{
                width: 'clamp(1.2194vw, 1.625vw, 4.0625vw)',
                height: 'clamp(1.2194vw, 1.625vw, 4.0625vw)',
              }}
            />
          </div>
          Смотреть все
        </Button>
      </div>
    </Container>
  );
}
