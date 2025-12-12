"use client";

import { Button } from "@/shared/ui/button";
import { Container } from "@/shared/ui/container";
import { useIntersectionObserver } from "@/shared/lib/useIntersectionObserver";
import { cn } from "@/shared/utils";
import { useId } from "react";

interface CategoryItem {
  id: string;
  label: string;
  image: string;
  maskPath: string;
  maskViewBox: string;
  maskDimensions: { x: string; y: string; width: string; height: string };
  imageTransform?: string;
  imageDimensions: { x: string; y: string; width: string; height: string };
  pathScale?: number;
  pathTranslateX?: number;
  pathTranslateY?: number;
}

const categories: CategoryItem[] = [
  {
    id: "polufabrication",
    label: "Полуфабрикаты",
    image: "/polufa_1.png",
    maskPath:
      "M265.904 -22.8731L274.872 -25.7476C289.877 -30.5568 305.503 -33.1514 321.257 -33.4495L667.5 -40V333.5H0L8.19879 318.241C14.6018 306.324 24.2487 296.465 36.0228 289.803C49.0155 282.452 59.3867 271.225 65.6869 257.691L69.5 249.5L74.0577 236.421C78.5669 223.482 87.1046 212.329 98.418 204.598C106.691 198.945 116.174 195.31 126.105 193.986L150.207 190.772C159.029 189.596 167.651 187.236 175.842 183.755L181.024 181.552C195.678 175.324 208.154 164.888 216.871 151.564L218.249 149.459C225.916 137.741 230 124.041 230 110.038C230 99.4753 227.676 89.0423 223.193 79.4786L222.5 78C217.561 67.4625 215 55.9672 215 44.3294V33C215 15.3695 224.424 -0.916115 239.71 -9.70109L251.759 -16.6258C256.24 -19.2014 260.982 -21.2955 265.904 -22.8731Z",
    maskViewBox: "0 0 642 300",
    maskDimensions: { x: "0", y: "0", width: "642", height: "300" },
    imageDimensions: { x: "0", y: "20", width: "642", height: "300" },
    imageTransform: "scale(0.9)",
  },
  {
    id: "soup-sets",
    label: "Суп наборы",
    image: "/polufa_2.png",
    maskPath:
      "M56.9393 6.1088L41.5 -7H383V309H152.5L84.5 274.5L62.8097 265.535C52.3126 261.196 42.4102 255.539 33.3413 248.7L24.1273 241.752C19.0736 237.941 14.6478 233.362 11.0106 228.182L10.0551 226.821C3.51119 217.501 0 206.39 0 195.002C0 178.817 7.08033 163.443 19.3787 152.923L35.87 138.816C39.6184 135.61 43.5935 132.678 47.7641 130.044L64.5001 119.474C74.2679 113.305 81.925 104.307 86.4521 93.6777C89.4531 86.6319 91 79.0524 91 71.3941V70.0455C91 57.935 87.5355 46.0773 81.0153 35.8718L75.8119 27.7274C70.633 19.6213 64.2719 12.3346 56.9393 6.1088Z",
    maskViewBox: "0 0 371 300",
    maskDimensions: { x: "0", y: "0", width: "371", height: "300" },
    imageDimensions: { x: "0", y: "20", width: "371", height: "300" },
    pathScale: 0.95,
    imageTransform: "scale(0.8)",
  },
  {
    id: "vacuum-packed",
    label: "Вакуумированные",
    image: "/polufa_3.png",
    maskPath:
      "M80.3787 3.64037L74.3211 -7.43049C72.8522 -10.1149 74.8568 -13.3791 77.9153 -13.2831L358 -4.5V314L25.3277 318.928C22.6731 318.968 20.5 316.827 20.5 314.172V296.072C20.5 286.403 19.178 276.779 16.5709 267.467L15.8478 264.885C14.2871 259.311 12.1342 253.92 9.42588 248.804L8.91428 247.838C3.06036 236.781 0 224.459 0 211.948C0 203.703 1.32917 195.512 3.93634 187.691L8.79137 173.126C11.9117 163.765 16.4619 154.943 22.2806 146.974L26.6091 141.046C33.1014 132.155 41.6993 125.013 51.6315 120.263C64.224 114.241 74.6029 104.409 81.2984 92.1615L82.4424 90.0688C88.3854 79.1975 91.5 67.0067 91.5 54.6171V47.1344C91.5 39.0807 90.4263 31.0631 88.3072 23.2932C86.4422 16.4547 83.7812 9.85865 80.3787 3.64037Z",
    maskViewBox: "0 0 352 300",
    maskDimensions: { x: "0", y: "0", width: "320", height: "280" },
    imageDimensions: { x: "0", y: "55", width: "352", height: "300" },
    pathScale: 0.9,
    imageTransform: "scale(0.8)",
  },
  {
    id: "jars",
    label: "Икры",
    image: "/polufa_4.png",
    maskPath:
      "M62.0321 17.5261L72.5 13.5C110.911 0.585843 151.166 -6 191.69 -6H565V338.5H49L66.0725 321.978C75.2486 313.098 82.3921 302.336 87.0117 290.431L87.7215 288.602C91.2102 279.612 93 270.053 93 260.409V258.285C93 248.865 91.0382 239.548 87.2395 230.928C82.4948 220.161 75.0315 210.814 65.5824 203.803L49 191.5L43.0324 186.014C26.6393 170.943 14.5487 151.783 8 130.5L2.83251 104.017C0.970072 94.4716 1.36895 84.6231 3.99719 75.26C6.62902 65.8841 11.423 57.2561 17.9941 50.0689L24.0718 43.4215C34.5471 31.9642 47.5425 23.099 62.0321 17.5261Z",
    maskViewBox: "0 0 545 300",
    maskDimensions: { x: "0", y: "0", width: "545", height: "300" },
    imageDimensions: { x: "0", y: "10", width: "545", height: "300" },
    pathScale: 0.8,
    imageTransform: "scale(0.9)",
  },
];

function CategoryCard({
  category,
  maskId,
  className,
  style,
}: {
  category: CategoryItem;
  maskId: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden cursor-pointer rounded-[clamp(1.5vw,2vw,5vw)] bg-[#F1F1F7] transition-all duration-300 card-hover",
        className
      )}
      style={style}
    >
      <svg
        width="100%"
        height="100%"
        viewBox={category.maskViewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        className="absolute -right-45"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <mask
            id={maskId}
            style={{ maskType: "alpha" }}
            maskUnits="userSpaceOnUse"
            maskContentUnits="userSpaceOnUse"
            x={category.maskDimensions.x}
            y={category.maskDimensions.y}
            width={category.maskDimensions.width}
            height={category.maskDimensions.height}
          >
            <path
              d={category.maskPath}
              fill="#D9D9D9"
              className="scale-x-120"
              transform={
                category.pathScale ? `scale(${category.pathScale})` : undefined
              }
            />
          </mask>
        </defs>
        {/* Light mask shape background */}
        <path
          d={category.maskPath}
          transform={
            category.pathScale ? `scale(${category.pathScale})` : undefined
          }
          fill="#F1F1F7"
        />
        {/* Image visible through mask */}
        <g mask={`url(#${maskId})`}>
          <image
            href={category.image}
            xlinkHref={category.image}
            x={category.imageDimensions.x}
            y={category.imageDimensions.y}
            width={category.imageDimensions.width}
            height={category.imageDimensions.height}
            preserveAspectRatio="xMidYMid slice"
            transform={category.imageTransform}
            className="transition-transform object-cover duration-300 group-hover:scale-110"
          />
        </g>
      </svg>

      {/* Text and Button Container */}
      <div className="absolute inset-0 z-10 h-full flex flex-col items-start justify-between p-[clamp(1.25vw,1.667vw,4.167vw)]">
        <h3
          className="font-semibold whitespace-nowrap text-black"
          style={{
            fontSize: "clamp(1.25vw, 1.667vw, 4.167vw)",
            lineHeight: "1.2",
          }}
        >
          {category.label}
        </h3>
        <Button
          variant="primary"
          className="mt-[clamp(0.938vw,1.25vw,3.125vw)] group-hover:scale-105 rounded-full whitespace-nowrap text-white"
          style={{
            fontSize: "clamp(0.625vw, 0.833vw, 2.083vw)",
            padding: "clamp(0.5vw, 0.667vw, 1.667vw) clamp(1.5vw, 2vw, 5vw)",
          }}
        >
          Перейти
        </Button>
      </div>
    </div>
  );
}

export function Categories() {
  const maskId1 = useId();
  const maskId2 = useId();
  const maskId3 = useId();
  const maskId4 = useId();
  const { elementRef, hasIntersected } = useIntersectionObserver({
    triggerOnce: true,
  });

  return (
    <Container
      ref={elementRef}
      className={`flex flex-col animate-on-scroll slide-up ${hasIntersected ? 'visible' : ''}`}
      style={{
        gap: "clamp(1.875vw, 2.5vw, 6.25vw)",
        paddingTop: "clamp(3.125vw, 4.167vw, 10.417vw)",
        paddingBottom: "clamp(3.125vw, 4.167vw, 10.417vw)",
      }}
    >
      {/* Title */}
      <h2 className="text-title-sm w-fit text-black animate-slide-in-left">Категории</h2>

      {/* Categories Grid */}
      <div
        className="flex flex-col"
        style={{
          gap: "clamp(0.938vw, 1.25vw, 3.125vw)",
        }}
      >
        <div
          className="flex"
          style={{
            height: "clamp(300px, 23.4375vw, 600px)",
            gap: "clamp(0.938vw, 1.25vw, 3.125vw)",
          }}
        >
          <CategoryCard
            category={categories[0]}
            maskId={maskId1}
            style={{
              flex: "0 0 58.407%",
            }}
          />
          <CategoryCard
            category={categories[1]}
            maskId={maskId2}
            style={{
              flex: "0 0 41.593%",
            }}
          />
        </div>
        <div
          className="flex"
          style={{
            height: "clamp(300px, 23.4375vw, 600px)",
            gap: "clamp(0.938vw, 1.25vw, 3.125vw)",
          }}
        >
          <CategoryCard
            category={categories[2]}
            maskId={maskId3}
            style={{
              flex: "0 0 41.593%",
            }}
          />

          <CategoryCard
            category={categories[3]}
            maskId={maskId4}
            style={{
              flex: "0 0 58.407%",
            }}
          />
        </div>
      </div>
    </Container>
  );
}
