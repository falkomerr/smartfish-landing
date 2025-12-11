'use client';

import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { CartHollowIcon } from '@/shared/ui/icons';
import Image from 'next/image';

export interface ProductCardProps {
  image: string;
  imageAlt: string;
  name: string;
  currentPrice: string;
  originalPrice?: string;
  extended?: boolean;
  discount?: number;
  description?: string;
  weight?: string;
  onAddToCart?: () => void;
}

export function ProductCard({
  image,
  imageAlt,
  name,
  currentPrice,
  originalPrice,
  extended = false,
  discount,
  description,
  weight,
  onAddToCart,
}: ProductCardProps) {
  return (
    <div
      className={cn(
        'relative flex flex-col overflow-hidden bg-[#F9F9FA]',
        extended && 'bg-[#F1F1F7] p-3',
      )}
      style={{
        width: 'clamp(11.719vw, 15.625vw, 39.063vw)',
        padding: 'clamp(0.469vw, 0.625vw, 1.563vw)',
        borderRadius: 'clamp(0.938vw, 1.25vw, 3.125vw)',
      }}
    >
      {/* Product Image with Discount Banner */}
      <div
        style={{
          marginBottom: 'clamp(0.625vw, 0.833vw, 2.083vw)',
        }}
      >
        <div className='relative w-full overflow-hidden'>
          <Image
            src={image}
            alt={imageAlt}
            className={cn('aspect-[220/165] w-full', extended && 'aspect-[304/360] w-full')}
            style={{
              borderRadius: 'clamp(0.313vw, 0.417vw, 1.042vw)',
            }}
            width={220}
            height={165}
          />
        </div>
      </div>
      {discount && discount > 0 && (
        <div
          className='absolute top-0 left-0 -rotate-45 bg-[#FDE108]'
          style={{
            marginTop: 'clamp(0.625vw, 0.833vw, 2.083vw)',
            transform: 'translateX(clamp(-1.094vw, -1.458vw, -3.646vw)) rotate(-45deg)',
            paddingLeft: 'clamp(1.563vw, 2.083vw, 5.208vw)',
            paddingRight: 'clamp(1.563vw, 2.083vw, 5.208vw)',
            paddingTop: 'clamp(0.156vw, 0.208vw, 0.521vw)',
            paddingBottom: 'clamp(0.156vw, 0.208vw, 0.521vw)',
          }}
        >
          <span className='text-label font-semibold text-[#000000]'>-{discount}%</span>
        </div>
      )}

      {/* Product Name */}
      <div
        style={{
          marginBottom: 'clamp(0.469vw, 0.625vw, 1.563vw)',
        }}
        className='flex w-full flex-nowrap items-end justify-between gap-x-2'
      >
        <h3 className='text-label text-foreground overflow-hidden leading-none text-nowrap text-ellipsis'>
          {name}
        </h3>
        {extended && weight && (
          <span className='text-body-xs leading-none text-nowrap text-[#919194]'>{weight}</span>
        )}
      </div>

      {description && (
        <p
          className='text-body-xs line-clamp-2 text-[#919194]'
          style={{
            marginBottom: 'clamp(0.469vw, 0.625vw, 1.563vw)',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {description}
        </p>
      )}

      {/* Price Section */}
      <div
        className='mb-4 flex items-end'
        style={{
          marginBottom: 'clamp(0.625vw, 0.833vw, 2.083vw)',
          gap: 'clamp(0.313vw, 0.417vw, 1.042vw)',
        }}
      >
        <span className='text-price leading-none text-[#333B8F]'>{currentPrice} сом</span>
        {originalPrice && (
          <span className='text-body-md leading-[1.3] line-through'>{originalPrice} сом</span>
        )}
      </div>

      {/* Add to Cart Button */}
      <Button
        leftIcon={extended ? <CartHollowIcon className='group-hover:**:fill-white' /> : undefined}
        variant={extended ? 'tertiary' : 'primary'}
        className={cn(
          'group font-inter !h-fit w-full gap-x-2 !rounded-full !py-3 **:transition-all hover:bg-[#333B8F] hover:text-white',
          extended && 'border-none',
        )}
        style={{
          fontFamily: 'var(--font-inter)',
          fontWeight: 400,
          fontStyle: 'normal',
          fontSize: 'clamp(0.625vw, 0.833vw, 2.083vw)',
          lineHeight: '100%',
          letterSpacing: '0px',
          verticalAlign: 'middle',
        }}
        onClick={onAddToCart}
      >
        В корзину
      </Button>
    </div>
  );
}
