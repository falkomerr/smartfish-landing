'use client';

import { Button } from '@/shared/ui/button';
import Image from 'next/image';

export interface ProductCardProps {
  image: string;
  imageAlt: string;
  name: string;
  currentPrice: string;
  originalPrice?: string;
  discount?: number;
  onAddToCart?: () => void;
}

export function ProductCard({
  image,
  imageAlt,
  name,
  currentPrice,
  originalPrice,
  discount,
  onAddToCart,
}: ProductCardProps) {
  return (
    <div className='relative flex w-75 flex-col overflow-hidden rounded-[24px] bg-[#F9F9FA] p-3'>
      {/* Product Image with Discount Banner */}
      <div className='mb-4'>
        <div className='relative w-full overflow-hidden rounded-lg'>
          <Image
            src={image}
            alt={imageAlt}
            className='aspect-[220/165] w-full rounded-[16px]'
            width={220}
            height={165}
          />
        </div>
      </div>
      {discount && discount > 0 && (
        <div className='absolute top-0 left-0 mt-4 -translate-x-7 -rotate-45 bg-[#FDE108] px-10 py-1'>
          <span className='text-product-name font-semibold text-[#000000]'>-{discount}%</span>
        </div>
      )}

      {/* Product Name */}
      <h3 className='text-product-name text-foreground mb-3'>{name}</h3>

      {/* Price Section */}
      <div className='mb-4 flex items-end gap-2'>
        <span className='text-price-discount leading-none text-[#333B8F]'>{currentPrice} сом</span>
        {originalPrice && (
          <span className='text-price-original leading-[1.3] line-through'>
            {originalPrice} сом
          </span>
        )}
      </div>

      {/* Add to Cart Button */}
      <Button variant='primary' onClick={onAddToCart} className='w-full'>
        В корзину
      </Button>
    </div>
  );
}
