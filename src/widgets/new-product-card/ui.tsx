'use client';

import { Button } from '@/shared/ui/button';
import { CartIcon, HeartIcon } from '@/shared/ui/icons';
import Image from 'next/image';
import { useState } from 'react';

export interface NewProductCardProps {
  image: string;
  imageAlt: string;
  name: string;
  weight: string;
  description: string;
  price: string;
  isFavorite?: boolean;
  isInCart?: boolean;
  onAddToCart?: () => void;
  onToggleFavorite?: () => void;
}

export function NewProductCard({
  image,
  imageAlt,
  name,
  weight,
  description,
  price,
  isFavorite = false,
  isInCart = false,
  onAddToCart,
  onToggleFavorite,
}: NewProductCardProps) {
  const [favorite, setFavorite] = useState(isFavorite);
  const [inCart, setInCart] = useState(isInCart);

  const handleFavoriteClick = () => {
    setFavorite(!favorite);
    onToggleFavorite?.();
  };

  const handleAddToCart = () => {
    setInCart(true);
    onAddToCart?.();
  };

  return (
    <div
      className='relative flex flex-col overflow-hidden bg-white'
      style={{
        width: 'clamp(11.719vw, 15.625vw, 39.063vw)',
        borderRadius: 'clamp(0.938vw, 1.25vw, 3.125vw)',
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Image Section with Dark Blue Background */}
      <div
        className='relative flex items-center justify-center overflow-hidden'
        style={{
          backgroundColor: '#333B8F',
          height: 'clamp(11.719vw, 15.625vw, 39.063vw)',
          borderRadius: 'clamp(0.938vw, 1.25vw, 3.125vw) clamp(0.938vw, 1.25vw, 3.125vw) 0 0',
        }}
      >
        {/* "Новинка" Diagonal Ribbon */}
        <div
          className='absolute top-0 left-0 z-10 flex items-center justify-center font-semibold text-white'
          style={{
            backgroundColor: '#7DB3E8',
            transform: 'rotate(-45deg)',
            transformOrigin: 'center',
            width: 'clamp(6.25vw, 8.333vw, 20.833vw)',
            height: 'clamp(1.563vw, 2.083vw, 5.208vw)',
            top: 'clamp(0.938vw, 1.25vw, 3.125vw)',
            left: 'clamp(-2.344vw, -3.125vw, -7.813vw)',
            fontSize: 'clamp(0.469vw, 0.625vw, 1.563vw)',
            lineHeight: '1',
          }}
        >
          Новинка
        </div>

        {/* Favorite Icon */}
        <button
          onClick={handleFavoriteClick}
          className='absolute top-0 right-0 z-10 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-sm'
          style={{
            width: 'clamp(1.875vw, 2.5vw, 6.25vw)',
            height: 'clamp(1.875vw, 2.5vw, 6.25vw)',
            marginTop: 'clamp(0.469vw, 0.625vw, 1.563vw)',
            marginRight: 'clamp(0.469vw, 0.625vw, 1.563vw)',
          }}
        >
          <HeartIcon
            size='default'
            className={favorite ? '[&_path]:fill-[#FF0000]' : '[&_path]:fill-white'}
            style={{
              width: 'clamp(0.781vw, 1.042vw, 2.604vw)',
              height: 'clamp(0.781vw, 1.042vw, 2.604vw)',
            }}
          />
        </button>

        {/* Product Image */}
        <div
          className='relative flex items-center justify-center'
          style={{
            width: '80%',
            height: '80%',
          }}
        >
          <Image
            src={image}
            alt={imageAlt}
            className='object-contain'
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
        </div>
      </div>

      {/* Product Details Section */}
      <div
        className='flex flex-col'
        style={{
          padding: 'clamp(0.938vw, 1.25vw, 3.125vw)',
          backgroundColor: '#F9F9FA',
          borderRadius: '0 0 clamp(0.938vw, 1.25vw, 3.125vw) clamp(0.938vw, 1.25vw, 3.125vw)',
          gap: 'clamp(0.469vw, 0.625vw, 1.563vw)',
        }}
      >
        {/* Product Name and Weight */}
        <div className='flex items-start justify-between'>
          <h3
            className='text-label text-foreground flex-1'
            style={{
              marginRight: 'clamp(0.469vw, 0.625vw, 1.563vw)',
            }}
          >
            {name}
          </h3>
          <span
            className='text-label whitespace-nowrap text-[#7D7D7D]'
            style={{
              fontSize: 'clamp(0.469vw, 0.625vw, 1.563vw)',
            }}
          >
            {weight}
          </span>
        </div>

        {/* Description */}
        <p
          className='text-body-sm text-foreground'
          style={{
            fontSize: 'clamp(0.469vw, 0.625vw, 1.563vw)',
            lineHeight: 'clamp(0.625vw, 0.833vw, 2.083vw)',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            color: '#000000',
          }}
        >
          {description}
        </p>

        {/* Price */}
        <div
          className='text-price text-foreground'
          style={{
            fontSize: 'clamp(0.938vw, 1.25vw, 3.125vw)',
            lineHeight: 'clamp(1.094vw, 1.458vw, 3.646vw)',
            fontWeight: 700,
            color: '#000000',
            marginTop: 'clamp(0.313vw, 0.417vw, 1.042vw)',
          }}
        >
          {price}
        </div>

        {/* Add to Cart Button */}
        <Button
          variant={inCart ? 'primary' : 'secondary'}
          onClick={handleAddToCart}
          className='flex w-full items-center justify-center gap-2'
          style={{
            marginTop: 'clamp(0.469vw, 0.625vw, 1.563vw)',
            borderRadius: 'clamp(0.234vw, 0.313vw, 0.781vw)',
            border: inCart ? 'none' : '1px solid #E5E5E5',
          }}
        >
          <CartIcon
            size='default'
            className={inCart ? '[&_path]:fill-white' : '[&_path]:fill-[#333B8F]'}
            style={{
              width: 'clamp(0.781vw, 1.042vw, 2.604vw)',
              height: 'clamp(0.781vw, 1.042vw, 2.604vw)',
            }}
          />
          <span
            style={{
              fontSize: 'clamp(0.469vw, 0.625vw, 1.563vw)',
              fontWeight: 500,
            }}
          >
            В корзину
          </span>
        </Button>
      </div>
    </div>
  );
}
