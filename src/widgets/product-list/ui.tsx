'use client';

import { cn } from '@/shared/lib/utils';
import { Pagination } from '@/shared/ui/pagination';
import { ProductCard, type ProductCardProps } from '@/widgets/product-card';
import { useState } from 'react';

export interface ProductListProps {
  products: ProductCardProps[];
  itemsPerPage?: number;
  className?: string;
}

export function ProductList({ products, itemsPerPage = 1, className }: ProductListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  return (
    <div className={cn('flex flex-col gap-6', className)}>
      {/* Product Card */}
      {currentProducts.map((product, index) => (
        <ProductCard
          key={index}
          {...product}
          onAddToCart={() => {
            product.onAddToCart?.();
            console.log('Добавлено в корзину:', product.name);
          }}
        />
      ))}

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
