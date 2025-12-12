'use client';

import { Button } from '@/shared/ui/button';
import { MoveUpRight } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';

interface HeroShapeProps {
  imageSrc: string;
  imageAlt?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  buttonPosition?: { x: number; y: number }; // Позиция кнопки в процентах (0-100)
  magnetRadius?: number; // Радиус примагничивания в пикселях (по умолчанию 150)
}

export const HeroShape = ({
  imageSrc,
  imageAlt = 'Product image',
  buttonText = 'Перейти в каталог',
  onButtonClick,
  buttonPosition = { x: 50, y: 50 }, // По умолчанию центр
  magnetRadius = 0, // Радиус примагничивания по умолчанию
}: HeroShapeProps) => {
  // Генерируем уникальный ID для маски, чтобы избежать конфликтов
  // useId гарантирует одинаковый ID на сервере и клиенте
  const maskId = useId();

  // Состояние для смещения кнопки при примагничивании
  const [buttonOffset, setButtonOffset] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const targetOffsetRef = useRef({ x: 0, y: 0 });
  const isInMagneticFieldRef = useRef(false);
  const distanceRef = useRef(0);

  useEffect(() => {
    const animate = () => {
      if (!isInMagneticFieldRef.current) {
        // Плавно возвращаем к исходному положению
        setButtonOffset((prev) => {
          const distanceFromOrigin = Math.sqrt(prev.x * prev.x + prev.y * prev.y);

          // Если смещение стало очень маленьким, останавливаем анимацию
          if (distanceFromOrigin < 0.1) {
            return { x: 0, y: 0 };
          }

          // Используем более плавный коэффициент для возврата
          // Чем дальше от исходной позиции, тем быстрее возврат (для плавности)
          const returnSpeed = 0.88;

          return {
            x: prev.x * returnSpeed,
            y: prev.y * returnSpeed,
          };
        });
      } else {
        // Плавно двигаемся к целевой позиции (курсору)
        setButtonOffset((prev) => {
          const diffX = targetOffsetRef.current.x - prev.x;
          const diffY = targetOffsetRef.current.y - prev.y;

          // Адаптивный коэффициент плавности в зависимости от расстояния до курсора
          // Чем ближе курсор, тем сильнее притяжение (более отзывчиво)
          // Чем дальше, тем плавнее движение
          const normalizedDistance = Math.min(distanceRef.current / magnetRadius, 1);
          // Используем обратную зависимость: близко = больше коэффициент (0.2), далеко = меньше (0.08)
          const smoothness = 0.08 + (1 - normalizedDistance) * 0.12;

          return {
            x: prev.x + diffX * smoothness,
            y: prev.y + diffY * smoothness,
          };
        });
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    const handleMouseMove = (e: MouseEvent) => {
      if (!buttonRef.current || !containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();

      // Вычисляем исходную позицию кнопки (без учета смещения)
      const baseLeft = (containerRect.width * buttonPosition.x) / 100;
      const baseTop = (containerRect.height * buttonPosition.y) / 100;
      const baseButtonCenterX = containerRect.left + baseLeft;
      const baseButtonCenterY = containerRect.top + baseTop;

      // Позиция курсора
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      // Расстояние между курсором и исходным центром кнопки
      const dx = mouseX - baseButtonCenterX;
      const dy = mouseY - baseButtonCenterY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Сохраняем расстояние для использования в анимации
      distanceRef.current = distance;

      // Если курсор в радиусе примагничивания
      if (distance < magnetRadius && distance > 0) {
        isInMagneticFieldRef.current = true;
        // Вычисляем целевое смещение - кнопка должна двигаться к курсору
        // Используем полное смещение к курсору, но с учетом плавности в анимации
        targetOffsetRef.current = {
          x: dx,
          y: dy,
        };
      } else {
        isInMagneticFieldRef.current = false;
        // Целевая позиция - исходное положение
        targetOffsetRef.current = { x: 0, y: 0 };
        distanceRef.current = magnetRadius; // Устанавливаем максимальное расстояние для плавного возврата
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [magnetRadius]);

  return (
    <div className='absolute h-full min-h-[250vh] w-full overflow-hidden'>
      <svg
        width='100%'
        height='100%'
        viewBox='-100 -50 1100 1600'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'
        className='absolute top-0'
        style={{
          width: 'clamp(46.875vw, 62.5vw, 100vw)',
          height: '250vh',
          right: '0',
          marginTop: 'clamp(-3.125vw, -4.167vw, -10.417vw)',
        }}
        preserveAspectRatio='xMaxYMin meet'
      >
        <defs>
          <mask
            id={maskId}
            style={{ maskType: 'alpha' }}
            maskUnits='userSpaceOnUse'
            x='-500'
            y='-20'
            clipPath='aspect-[1269/942]'
            width='2000'
            height='3200'
          >
            <g transform='scale(1.2, 1.2)'>
              <path
                d='M476.507 -1.56786L458.5 -30H942V1238.5H779.5H566C448.119 1238.5 330.69 1223.93 216.385 1195.11L210 1193.5L129.111 1160.66C115.733 1155.23 102.895 1148.56 90.766 1140.73L62.6178 1122.55C36.0305 1105.38 16.2151 1079.53 6.54496 1049.4L5.62108 1046.52C1.89637 1034.91 0 1022.79 0 1010.6C0 981.567 10.748 953.558 30.1726 931.975L41.5168 919.37C49.8114 910.154 59.1383 901.922 69.3138 894.837L90.4971 880.087C111.077 865.757 133.444 854.182 157.027 845.655L168.46 841.522C180.451 837.187 191.957 831.547 202.733 824.73C224.289 811.093 242.66 792.894 256.482 771.456L259.72 766.434C275.897 741.344 284.5 712.123 284.5 682.27C284.5 662.278 280.64 642.474 273.133 623.945L269.067 613.91C263.703 600.671 257.007 588.011 249.084 576.126L243.884 568.326C221.52 534.78 206.078 497.106 198.464 457.514L197.5 452.5C190.374 417.191 195.304 380.513 211.502 348.339L223 325.5C240.721 291.043 266.742 261.539 298.715 239.652L306.532 234.3C318.491 226.113 331.089 218.899 344.203 212.728L409.5 182L440.697 165.514C460.385 155.109 476.245 138.701 485.974 118.67C492.901 104.41 496.5 88.7626 496.5 72.9087V67.3664C496.5 42.9584 489.567 19.0525 476.507 -1.56786Z'
                fill='#333B8F'
              />
            </g>
          </mask>
        </defs>
        <g mask={`url(#${maskId})`}>
          <image
            href={imageSrc}
            xlinkHref={imageSrc}
            x='-50'
            y='-100'
            width='1100'
            height='1700'
            preserveAspectRatio='xMidYMid slice'
          />
        </g>
      </svg>

      <div
        ref={containerRef}
        className='pointer-events-none absolute top-0 z-10 w-full'
        style={{
          width: 'clamp(46.875vw, 62.5vw, 100vw)',
          height: '250vh',
          right: '0',
        }}
      >
        <div
          ref={buttonRef}
          className='absolute'
          style={{
            left: `${buttonPosition.x}%`,
            top: `${buttonPosition.y}%`,
            transform: `translate(calc(-50% + ${buttonOffset.x}px), calc(-50% + ${buttonOffset.y}px))`,
          }}
        >
          <div className='pointer-events-auto'>
            <Button
              variant='tertiary'
              size='lg'
              onClick={onButtonClick}
              className='group animate-fade-in delay-200 button-hover rounded-full border-[#333B8F] bg-white/40 font-medium text-[#333B8F] shadow shadow-lg backdrop-blur-md'
              style={{
                width: 'clamp(12.5vw, 16.667vw, 41.667vw)',
                height: 'clamp(12.5vw, 16.667vw, 41.667vw)',
                paddingLeft: 'clamp(1.25vw, 1.667vw, 4.167vw)',
                paddingRight: 'clamp(1.25vw, 1.667vw, 4.167vw)',
                paddingTop: 'clamp(0.625vw, 0.833vw, 2.083vw)',
                paddingBottom: 'clamp(0.625vw, 0.833vw, 2.083vw)',
                fontSize: 'clamp(0.938vw, 1.25vw, 3.125vw)',
                borderWidth: 'clamp(0.117vw, 0.156vw, 0.391vw)',
              }}
            >
              {buttonText}
              <MoveUpRight
                className='transition-all duration-400 group-hover:rotate-45'
                style={{
                  width: 'clamp(1.25vw, 1.667vw, 4.167vw)',
                  height: 'clamp(1.25vw, 1.667vw, 4.167vw)',
                }}
              />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
