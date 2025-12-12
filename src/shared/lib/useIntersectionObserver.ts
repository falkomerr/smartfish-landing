"use client";

import { useEffect, useRef, useState } from "react";

interface UseIntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {}
) {
  const { threshold = 0, rootMargin = "100px", triggerOnce = true } = options;
  const [hasIntersected, setHasIntersected] = useState(false);
  const elementRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const hasIntersectedRef = useRef(false);
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    const element = elementRef.current;
    if (!element) return;

    // Если уже пересекались и triggerOnce = true, не создаем observer
    if (hasIntersectedRef.current && triggerOnce) return;

    // Проверяем, виден ли элемент сразу при загрузке
    const checkInitialVisibility = () => {
      if (hasIntersectedRef.current || !mountedRef.current) return true;
      
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;
      
      // Расширенная проверка с учетом rootMargin
      const margin = 200;
      const isVisible = 
        rect.top < windowHeight + margin &&
        rect.bottom > -margin &&
        rect.left < windowWidth + margin &&
        rect.right > -margin;
      
      if (isVisible) {
        hasIntersectedRef.current = true;
        setHasIntersected(true);
        return true;
      }
      return false;
    };

    // Проверяем сразу
    if (checkInitialVisibility()) {
      return;
    }

    // Проверяем после небольшой задержки для элементов, которые могут быть видны после рендера
    const timeoutId1 = setTimeout(() => {
      if (mountedRef.current && checkInitialVisibility()) {
        return;
      }
    }, 150);

    // Еще одна проверка после полной загрузки
    const timeoutId2 = setTimeout(() => {
      if (mountedRef.current && checkInitialVisibility()) {
        return;
      }
    }, 500);

    // Создаем observer только если элемент еще не виден
    if (!hasIntersectedRef.current && mountedRef.current) {
      // Очищаем предыдущий observer если есть
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !hasIntersectedRef.current && mountedRef.current) {
            hasIntersectedRef.current = true;
            setHasIntersected(true);
            if (triggerOnce && observerRef.current) {
              observerRef.current.unobserve(element);
            }
          }
        },
        { threshold, rootMargin }
      );

      observerRef.current.observe(element);
    }

    return () => {
      mountedRef.current = false;
      clearTimeout(timeoutId1);
      clearTimeout(timeoutId2);
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { elementRef, hasIntersected };
}

