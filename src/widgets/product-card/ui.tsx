"use client";

import { Button } from "@/shared/ui/button";
import { CartHollowIcon, HeartIcon } from "@/shared/ui/icons";
import { cn } from "@/shared/utils";
import Image from "next/image";
import { useState } from "react";

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
  isFavorite?: boolean;
  isInCart?: boolean;
  fillAvailableSpace?: boolean;
  onAddToCart?: () => void;
  onToggleFavorite?: () => void;
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
  isFavorite = false,
  isInCart = false,
  fillAvailableSpace = false,
  onAddToCart,
  onToggleFavorite,
}: ProductCardProps) {
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
      className={cn(
        "relative flex flex-col overflow-hidden bg-[#F9F9FA]",
        extended && "bg-[#F1F1F7] p-3",
        fillAvailableSpace && "!w-full"
      )}
      style={{
        width: "clamp(11.719vw, 15.625vw, 39.063vw)",
        padding: "clamp(0.469vw, 0.625vw, 1.563vw)",
        borderRadius: "clamp(0.938vw, 1.25vw, 3.125vw)",
      }}
    >
      {/* Product Image with Discount Banner */}
      <div
        style={{
          marginBottom: "clamp(0.625vw, 0.833vw, 2.083vw)",
        }}
      >
        <div
          className={cn(
            "relative w-full overflow-hidden",
            extended && "flex items-center justify-center"
          )}
          style={{
            backgroundColor: extended ? "#333B8F" : "transparent",
            borderRadius: fillAvailableSpace
              ? "25px"
              : "clamp(0.313vw, 0.417vw, 1.042vw)",
            aspectRatio: extended ? "304/360" : "220/165",
          }}
        >
          {extended && (
            <button
              onClick={handleFavoriteClick}
              className="absolute top-0 right-0 z-10 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-sm"
              style={{
                width: "clamp(1.875vw, 2.5vw, 6.25vw)",
                height: "clamp(1.875vw, 2.5vw, 6.25vw)",
                marginTop: "clamp(0.469vw, 0.625vw, 1.563vw)",
                marginRight: "clamp(0.469vw, 0.625vw, 1.563vw)",
              }}
            >
              <HeartIcon
                size="default"
                className={
                  favorite ? "[&_path]:fill-[#FF0000]" : "[&_path]:fill-white"
                }
                style={{
                  width: "clamp(0.781vw, 1.042vw, 2.604vw)",
                  height: "clamp(0.781vw, 1.042vw, 2.604vw)",
                }}
              />
            </button>
          )}
          <div
            className={cn(
              "relative",
              extended && "flex items-center justify-center",
              fillAvailableSpace && "!w-full !h-full"
            )}
            style={{
              width: extended ? "80%" : "100%",
              height: extended ? "80%" : "100%",
            }}
          >
            <Image
              src={image}
              alt={imageAlt}
              className={cn(
                extended ? "object-contain" : "w-full h-full object-cover",
                fillAvailableSpace &&
                  "!w-full !h-full !rounded-[70px] object-cover"
              )}
              fill={extended}
              width={extended ? undefined : 220}
              height={extended ? undefined : 165}
              style={{
                borderRadius: extended
                  ? "0"
                  : "clamp(0.313vw, 0.417vw, 1.042vw)",
              }}
            />
          </div>
        </div>
      </div>
      {discount && discount > 0 && (
        <div
          className="absolute top-0 left-0 -rotate-45 bg-[#FDE108]"
          style={{
            marginTop: "clamp(0.625vw, 0.833vw, 2.083vw)",
            transform:
              "translateX(clamp(-1.094vw, -1.458vw, -3.646vw)) rotate(-45deg)",
            paddingLeft: "clamp(1.563vw, 2.083vw, 5.208vw)",
            paddingRight: "clamp(1.563vw, 2.083vw, 5.208vw)",
            paddingTop: "clamp(0.156vw, 0.208vw, 0.521vw)",
            paddingBottom: "clamp(0.156vw, 0.208vw, 0.521vw)",
          }}
        >
          <span className="text-label font-semibold text-[#000000]">
            -{discount}%
          </span>
        </div>
      )}

      {/* Product Name */}
      <div
        style={{
          marginBottom: "clamp(0.469vw, 0.625vw, 1.563vw)",
        }}
        className="flex w-full flex-nowrap items-end justify-between gap-x-2"
      >
        <h3 className="text-label text-foreground overflow-hidden leading-none text-nowrap text-ellipsis">
          {name}
        </h3>
        {extended && weight && (
          <span className="text-body-xs leading-none text-nowrap text-[#919194]">
            {weight}
          </span>
        )}
      </div>

      {description && (
        <p
          className="text-body-xs line-clamp-2 text-[#919194]"
          style={{
            marginBottom: "clamp(0.469vw, 0.625vw, 1.563vw)",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {description}
        </p>
      )}

      {/* Price Section */}
      <div
        className="mb-4 flex items-end"
        style={{
          marginBottom: "clamp(0.625vw, 0.833vw, 2.083vw)",
          gap: "clamp(0.313vw, 0.417vw, 1.042vw)",
        }}
      >
        <span
          className={cn(
            "text-price leading-none text-[#333B8F]",
            extended && "font-semibold text-black"
          )}
        >
          {currentPrice} сом
        </span>
        {originalPrice && (
          <span
            className={cn(
              "text-body-md leading-[1.3] line-through",
              extended && "text-black"
            )}
          >
            {originalPrice} сом
          </span>
        )}
      </div>

      {/* Add to Cart Button */}
      <Button
        leftIcon={
          extended ? (
            <CartHollowIcon
              className={cn(
                "group-hover:**:fill-white",
                inCart && "**:fill-white"
              )}
            />
          ) : undefined
        }
        variant={extended ? (inCart ? "primary" : "secondary") : "primary"}
        className={cn(
          "group font-inter !h-fit w-full gap-x-2 !rounded-full **:transition-all",
          fillAvailableSpace ? "!py-4" : "!py-3",
          extended &&
            !inCart &&
            "border border-[#E5E5E5] bg-white text-[#7D7D7D] hover:bg-[#333B8F] hover:text-white hover:border-[#333B8F]",
          extended && inCart && "border-none"
        )}
        style={{
          fontFamily: "var(--font-inter)",
          fontWeight: 400,
          fontStyle: "normal",
          fontSize: "clamp(0.625vw, 0.833vw, 2.083vw)",
          lineHeight: "100%",
          letterSpacing: "0px",
          verticalAlign: "middle",
        }}
        onClick={handleAddToCart}
      >
        В корзину
      </Button>
    </div>
  );
}
