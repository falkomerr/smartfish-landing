"use client";

import { Button } from "@/shared/ui/button";
import { Container } from "@/shared/ui/container";
import { ProductCard, type ProductCardProps } from "@/widgets/product-card";
import { useIntersectionObserver } from "@/shared/lib/useIntersectionObserver";
import { ArrowUpRightIcon } from "lucide-react";

export interface AllProductsProps {
  products: ProductCardProps[];
  onViewAll?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export function AllProducts({
  products,
  onViewAll,
  className,
  style,
}: AllProductsProps) {
  const { elementRef, hasIntersected } = useIntersectionObserver({
    triggerOnce: true,
  });

  return (
    <Container
      ref={elementRef}
      className={`flex flex-col animate-on-scroll slide-up ${hasIntersected ? 'visible' : ''} ${className || ""}`}
      style={{
        gap: "clamp(1.25vw, 1.667vw, 4.167vw)",
        ...style,
      }}
    >
      {/* Title */}
      <h2 className="text-title-sm w-fit text-black animate-slide-in-left">Все товары</h2>

      {/* Products Grid */}
      <div
        className="grid w-full"
        style={{
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "clamp(0.938vw, 1.25vw, 3.125vw)",
        }}
      >
        {products.map((product, index) => (
          <ProductCard key={index} {...product} extended fillAvailableSpace />
        ))}
      </div>

      {/* View All Button */}
      <div className="flex items-center justify-center">
        <Button
          variant="primary"
          size="lg"
          onClick={onViewAll}
          className="group font-inter relative !h-fit rounded-full !py-4"
          style={{
            paddingLeft: "clamp(0.8125vw, 1.0833vw, 2.7083vw)",
            paddingRight: "clamp(3.5vw, 3.2vw, 4.1vw)",
            fontFamily: "var(--font-inter)",
            fontWeight: 600,
            fontStyle: "normal",
            fontSize: "clamp(0.625vw, 0.833vw, 2.083vw)",
            lineHeight: "clamp(0.938vw, 1.25vw, 3.125vw)",
            textAlign: "center",
            verticalAlign: "middle",
          }}
        >
          <div
            className="absolute top-1/2 -translate-y-1/2 rounded-full bg-white transition-all **:text-[#333B8F] group-hover:rotate-45"
            style={{
              right: "clamp(0.15vw, 0.3vw, 1.3vw)",
              padding: "clamp(0.325vw, 0.4333vw, 1.0833vw)",
            }}
          >
            <ArrowUpRightIcon
              style={{
                width: "clamp(1.016vw, 1.354vw, 3.385vw)",
                height: "clamp(1.016vw, 1.354vw, 3.385vw)",
              }}
            />
          </div>
          Смотреть все
        </Button>
      </div>
    </Container>
  );
}
