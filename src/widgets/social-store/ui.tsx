"use client";

import { useIntersectionObserver } from "@/shared/lib/useIntersectionObserver";
import { Container } from "@/shared/ui/container";
import { ArrowRightIcon } from "@/shared/ui/icons";
import { MapPinIcon } from "@/shared/ui/icons/MapPinIcon";
import { cn } from "@/shared/utils";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export interface SocialStoreProps {
  className?: string;
  style?: React.CSSProperties;
}

const addresses = [
  "ул. Токтогула, 146/1",
  "ул. Асанбая, 8/3",
  "ул. Акматбека Суюнбаева, 17 / ул. Московская, 7",
  "ул. Манаса, 97",
  "ул. Юнусалиева, 195",
];

export function SocialStore({ className, style }: SocialStoreProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const rafIdRef = useRef<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isScrollingRef = useRef(false);
  const { elementRef, hasIntersected } = useIntersectionObserver({
    triggerOnce: true,
  });

  const checkScrollability = (updateIndex = true) => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const { scrollLeft, scrollWidth, clientWidth } = container;

    // Определяем активный индекс на основе позиции элементов
    const children = Array.from(container.children) as HTMLElement[];
    let newActiveIndex = 0;
    let minDistance = Infinity;
    const containerCenter = scrollLeft + clientWidth / 2;

    children.forEach((child, index) => {
      const childCenter = child.offsetLeft + child.offsetWidth / 2;
      const distance = Math.abs(containerCenter - childCenter);

      if (distance < minDistance) {
        minDistance = distance;
        newActiveIndex = index;
      }
    });

    // Обновляем состояние кнопок на основе активного индекса
    const newCanScrollLeft = newActiveIndex > 0;
    const newCanScrollRight = newActiveIndex < children.length - 1;

    setCanScrollLeft(newCanScrollLeft);
    setCanScrollRight(newCanScrollRight);

    // Обновляем активный индекс только если он изменился и разрешено обновление
    if (updateIndex && newActiveIndex !== activeIndex) {
      setActiveIndex(newActiveIndex);
    }
  };

  // Центрируем активный элемент при изменении activeIndex
  useEffect(() => {
    const targetItem = itemRefs.current[activeIndex];
    const container = scrollContainerRef.current;

    if (targetItem && container && !isScrollingRef.current) {
      isScrollingRef.current = true;

      // Вычисляем позицию для центрирования элемента
      const containerRect = container.getBoundingClientRect();
      const itemRect = targetItem.getBoundingClientRect();

      // Текущая позиция скролла
      const currentScrollLeft = container.scrollLeft;

      // Разница между центром контейнера и центром элемента
      const containerCenter = containerRect.width / 2;
      const itemCenter =
        itemRect.left - containerRect.left + itemRect.width / 2;
      const offset = itemCenter - containerCenter;

      // Новая позиция скролла
      const newScrollLeft = currentScrollLeft + offset;

      // Отслеживаем завершение анимации скролла
      let scrollEnded = false;
      const handleScrollEnd = () => {
        if (!scrollEnded) {
          scrollEnded = true;
          isScrollingRef.current = false;
          container.removeEventListener("scrollend", handleScrollEnd);
          // Обновляем только состояние кнопок, не меняя activeIndex
          setTimeout(() => {
            checkScrollability(false);
          }, 50);
        }
      };

      container.addEventListener("scrollend", handleScrollEnd, { once: true });

      container.scrollTo({
        left: Math.max(0, newScrollLeft),
        behavior: "smooth",
      });

      // Fallback: сбрасываем флаг через максимальное время анимации
      const timeoutId = setTimeout(() => {
        if (!scrollEnded) {
          scrollEnded = true;
          isScrollingRef.current = false;
          container.removeEventListener("scrollend", handleScrollEnd);
          // Обновляем только состояние кнопок, не меняя activeIndex
          setTimeout(() => {
            checkScrollability(false);
          }, 50);
        }
      }, 1000);

      // Очистка при размонтировании
      return () => {
        clearTimeout(timeoutId);
        container.removeEventListener("scrollend", handleScrollEnd);
        isScrollingRef.current = false;
      };
    }
  }, [activeIndex]);

  const handleScroll = () => {
    // Блокируем обработку скролла во время анимации центрирования
    if (isScrollingRef.current) {
      return;
    }

    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
    }

    rafIdRef.current = requestAnimationFrame(() => {
      checkScrollability();
      rafIdRef.current = null;
    });
  };

  const handleScrollEnd = () => {
    // Блокируем обработку во время анимации центрирования
    if (isScrollingRef.current) {
      return;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      if (!scrollContainerRef.current || isScrollingRef.current) return;

      checkScrollability();

      // Центрируем активный элемент после скролла, если он не центрирован
      const container = scrollContainerRef.current;
      const children = Array.from(container.children) as HTMLElement[];

      if (children.length === 0) return;

      let closestIndex = 0;
      let minDistance = Infinity;
      const containerCenter = container.scrollLeft + container.clientWidth / 2;

      children.forEach((child, index) => {
        const childCenter = child.offsetLeft + child.offsetWidth / 2;
        const distance = Math.abs(containerCenter - childCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      // Если элемент не центрирован достаточно хорошо, обновляем активный индекс
      // useEffect автоматически центрирует элемент при изменении activeIndex
      if (
        minDistance > 50 &&
        closestIndex !== activeIndex &&
        !isScrollingRef.current
      ) {
        setActiveIndex(closestIndex);
      }
    }, 100);
  };

  useEffect(() => {
    const checkWithDelay = () => {
      // Проверяем несколько раз с задержками для надежности
      setTimeout(() => {
        checkScrollability();
      }, 100);
      setTimeout(() => checkScrollability(), 300);
      setTimeout(() => checkScrollability(), 500);
    };

    checkWithDelay();

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll, {
        passive: true,
      });
      scrollContainer.addEventListener("scrollend", handleScrollEnd, {
        passive: true,
      });

      const handleResize = () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
          checkScrollability();
        }, 150);
      };

      window.addEventListener("resize", handleResize, { passive: true });

      // Проверяем при загрузке изображений
      const images = scrollContainer.querySelectorAll("img");
      images.forEach((img) => {
        img.addEventListener("load", () => checkScrollability(), {
          once: true,
        });
      });

      return () => {
        scrollContainer.removeEventListener("scroll", handleScroll);
        scrollContainer.removeEventListener("scrollend", handleScrollEnd);
        window.removeEventListener("resize", handleResize);
        if (rafIdRef.current !== null) {
          cancelAnimationFrame(rafIdRef.current);
        }
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current && activeIndex > 0) {
      const newIndex = activeIndex - 1;
      setActiveIndex(newIndex);
      // Центрирование произойдет через ref callback
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current && activeIndex < 3) {
      const newIndex = activeIndex + 1;
      setActiveIndex(newIndex);
      // Центрирование произойдет через ref callback
    }
  };

  return (
    <Container
      ref={elementRef}
      className={cn(
        "flex flex-col animate-on-scroll slide-up",
        hasIntersected ? "visible" : "",
        className
      )}
      style={{
        gap: "clamp(0.833vw, 0.833vw, 0.833vw)",
        ...style,
      }}
    >
      {/* Top Section */}
      <div
        className="flex flex-col"
        style={{ gap: "clamp(0.833vw, 0.833vw, 0.833vw)" }}
      >
        {/* Title */}
        <h1 className="text-title-sm w-fit text-black animate-slide-in-left">
          Социальный магазин «Евразия»
        </h1>

        {/* Description */}
        <p
          className="font-inter text-black"
          style={{
            fontSize: "clamp(0.625vw, 0.833vw, 2.083vw)",
            lineHeight: "clamp(0.938vw, 1.25vw, 3.125vw)",
            maxWidth: "clamp(25vw, 33.333vw, 80vw)",
          }}
        >
          В 2025 году компания «Аква Пром» стала партнером социального магазина
          «Евразия». Основная миссия — поддержка пенсионеров, ветеранов и людей
          с ограниченными возможностями, предоставление им товаров первой
          необходимости по доступным ценам.
        </p>

        {/* Subtitle */}
        <h2
          className="font-inter font-semibold text-black"
          style={{
            fontSize: "clamp(0.833vw, 0.833vw, 0.833vw)",
            lineHeight: "clamp(1.042vw, 1.042vw, 1.042vw)",
            letterSpacing: "0px",
            verticalAlign: "middle",
          }}
        >
          Город Бишкек — социальные точки:
        </h2>

        {/* Addresses */}
        <div
          className="flex flex-wrap items-center"
          style={{
            gap: "clamp(0.938vw, 1.25vw, 3.125vw)",
          }}
        >
          {addresses.map((address, index) => (
            <div
              key={index}
              className="flex items-center"
              style={{
                gap: "clamp(0.313vw, 0.417vw, 1.042vw)",
              }}
            >
              <div
                className="flex items-center justify-center rounded-full border"
                style={{
                  padding: "clamp(0.521vw, 0.521vw, 0.521vw)",
                  borderColor: "#D6D8E9",
                }}
              >
                <MapPinIcon
                  style={{
                    width: "clamp(1.25vw, 1.25vw, 1.25vw)",
                    height: "clamp(1.25vw, 1.25vw, 1.25vw)",
                    flexShrink: 0,
                  }}
                />
              </div>
              <span
                className="font-inter text-black"
                style={{
                  fontFamily: "Inter",
                  fontWeight: 400,
                  fontStyle: "Regular",
                  fontSize: "clamp(0.729vw, 0.729vw, 0.729vw)",
                  lineHeight: "clamp(1.042vw, 1.042vw, 1.042vw)",
                  letterSpacing: "0px",
                  verticalAlign: "middle",
                }}
              >
                {address}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section - Image Carousel */}
      <div
        className="relative flex w-screen items-center"
        style={{
          marginLeft: "clamp(-2.083vw, -2.083vw, -2.083vw)",
          paddingLeft: "clamp(2.083vw, 2.083vw, 2.083vw)",
        }}
      >
        {/* Scrollable Image Container */}
        <div
          ref={scrollContainerRef}
          className="scrollbar-hide flex overflow-x-auto"
          style={{
            gap: "clamp(0.938vw, 1.25vw, 3.125vw)",
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            paddingRight: "clamp(3.125vw, 4.167vw, 10.417vw)",
          }}
        >
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              style={{
                scrollSnapAlign: "start",
                flexShrink: 0,
                width: "clamp(62.5vw, 62.5vw, 62.5vw)",
              }}
            >
              <div
                className={cn(
                  "relative w-full overflow-hidden transition-opacity",
                  activeIndex !== index && "opacity-70"
                )}
                style={{
                  borderRadius: "clamp(1.667vw, 1.667vw, 1.667vw)",
                }}
              >
                <Image
                  src="/shop-page.png"
                  alt={`Социальный магазин «Евразия» - изображение ${index + 1}`}
                  width={900}
                  height={506}
                  className="w-full aspect-[900/506] h-auto object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons Container */}
        <div
          className="absolute z-10 flex items-center rounded-full bg-white"
          style={{
            bottom: "clamp(0.833vw, 0.833vw, 0.833vw)",
            right: "clamp(0.833vw, 0.833vw, 0.833vw)",
            gap: "clamp(0.313vw, 0.417vw, 1.042vw)",
            padding: "clamp(0.469vw, 0.625vw, 1.563vw)",
          }}
        >
          {/* Left Arrow Button */}
          <button
            onClick={scrollLeft}
            className={cn(
              "group flex items-center hover:bg-[#333B8F] justify-center rounded-full transition-colors carousel-button button-hover",
              canScrollLeft
                ? "bg-transparent hover:bg-[#333B8F] visible"
                : "bg-transparent opacity-50 cursor-not-allowed hidden"
            )}
            style={{
              width: "clamp(2.5vw, 3.333vw, 8.333vw)",
              height: "clamp(2.5vw, 3.333vw, 8.333vw)",
            }}
            disabled={!canScrollLeft}
          >
            <ArrowRightIcon
              size="default"
              className="group-hover:[&_path]:fill-white rotate-180 transition-colors"
              style={{
                width: "clamp(1.2vw, 1.6vw, 4.167vw)",
                height: "clamp(1.2vw, 1.6vw, 4.167vw)",
              }}
            />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={scrollRight}
            className={cn(
              "group flex items-center hover:bg-[#333B8F] justify-center rounded-full transition-colors carousel-button button-hover",
              canScrollRight
                ? "bg-transparent hover:bg-[#333B8F] visible"
                : "bg-transparent opacity-50 cursor-not-allowed hidden"
            )}
            style={{
              width: "clamp(2.5vw, 3.333vw, 8.333vw)",
              height: "clamp(2.5vw, 3.333vw, 8.333vw)",
            }}
            disabled={!canScrollRight}
          >
            <ArrowRightIcon
              size="default"
              className="group-hover:[&_path]:fill-white transition-colors"
              style={{
                width: "clamp(1.2vw, 1.6vw, 4.167vw)",
                height: "clamp(1.2vw, 1.6vw, 4.167vw)",
              }}
            />
          </button>
        </div>
      </div>
    </Container>
  );
}
