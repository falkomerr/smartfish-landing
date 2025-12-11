"use client";

import { Button } from "@/shared/ui/button";
import { Container } from "@/shared/ui/container";
import { PlayIcon } from "@/shared/ui/icons";
import { AllProducts } from "@/widgets/all-products";
import { Categories } from "@/widgets/categories";
import { HeroShape } from "@/widgets/hero-shape";
import { NewProducts } from "@/widgets/new-products";
import { ProductList } from "@/widgets/product-list";
import Image from "next/image";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <HeroShape
        imageSrc="/hero.png"
        imageAlt="Слабосоленые куски форели"
        buttonText="Перейти в каталог"
        buttonPosition={{ x: 20, y: 33.5 }}
        onButtonClick={() => {
          console.log("Переход в каталог");
        }}
      />

      <Container
        className="flex min-h-screen flex-col **:z-50"
        style={{
          gap: "clamp(1.875vw, 2.5vw, 6.25vw)",
          paddingTop: "clamp(12.5vw, 16.667vw, 41.667vw)",
        }}
      >
        <p className="text-title-lg">
          Рыбные изделия <br />
          <span className="text-title-lg text-[#333B8F] italic">
            {" "}
            высокого качества
          </span>{" "}
          <br /> для каждого дня
        </p>

        <p
          className="text-body-sm"
          style={{
            maxWidth: "clamp(25vw, 33.333vw, 80vw)",
            fontSize: "clamp(0.625vw, 0.833vw, 2.083vw)",
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>

        <ProductList
          style={{
            marginTop: "clamp(10.938vw, 14.583vw, 36.458vw)",
          }}
          products={Array.from({ length: 5 }).map((_, index) => ({
            image: "/hero.png",
            imageAlt: "Слабосоленые куски форели",
            name: "Слабосоленые куски форели",
            currentPrice: "100",
            originalPrice: "100",
            description:
              "Филе форели, полностью очищенное от костей и приправленное натуральными специями — солью и молотым чёрным перцем",
          }))}
        />
      </Container>

      <NewProducts
        style={{
          marginTop: "clamp(10.938vw, 14.583vw, 36.458vw)",
          paddingTop: "clamp(3.125vw, 4.167vw, 10.417vw)",
          paddingBottom: "clamp(3.125vw, 4.167vw, 10.417vw)",
        }}
        products={Array.from({ length: 10 }).map((_, index) => ({
          image: "/hero.png",
          imageAlt: "Слабосоленые куски форели",
          name: "Слабосоленые куски форели",
          currentPrice: "100",
          description:
            "Филе форели, полностью очищенное от костей и приправленное натуральными специями — солью и молотым чёрным перцем",
        }))}
        onViewAll={() => {
          console.log("Переход к просмотру всех новинок");
        }}
      />

      <Categories />

      <AllProducts
        style={{
          marginTop: "clamp(3.125vw, 4.167vw, 10.417vw)",
          paddingTop: "clamp(3.125vw, 4.167vw, 10.417vw)",
          paddingBottom: "clamp(3.125vw, 4.167vw, 10.417vw)",
        }}
        products={Array.from({ length: 12 }).map((_, index) => ({
          image: "/hero.png",
          imageAlt: "Слабосоленые куски форели",
          name: "Слабосоленые куски форели",
          currentPrice: "1600",
          description:
            "Филе форели, полностью очищенное от костей и приправленное натуральными специями — солью и молотым чёрным перцем",
          weight: "150 гр",
        }))}
        onViewAll={() => {
          console.log("Переход к просмотру всех товаров");
        }}
      />

      <Container>
        <section className="mt-11 flex w-full flex-col items-center gap-y-15 rounded-[60px] bg-[#009FE3] px-10 pt-15 pb-10">
          <h1 className="text-hero-title text-center text-white">
            Качественная рыба <br /> напрямую от производителя
            <br /> по доступной цене.
          </h1>
          <div className="relative aspect-[1280/492] w-full">
            <Image
              src="/video-preview.png"
              alt="video-preview"
              width={1280}
              height={492}
              className="aspect-[1280/492] w-full rounded-[32px]"
            />

            <Button
              variant="primary"
              className="absolute top-1/2 right-1/2 left-1/2 aspect-square !h-20 !w-20 shrink-0 -translate-x-1/2 -translate-y-1/2 !rounded-full"
            >
              <PlayIcon className="size-8" />
            </Button>
          </div>
        </section>
      </Container>
      <Container>
        <p className="text-description mx-auto mt-6 max-w-225">
          ОсОО «Аква Пром» - занимает одно из ведущих мест в рыбной отрасли
          Кыргызской Республики. Компания основана 04 октября 2017 года.
          Компания обладает полным производственным циклом от закладки
          оплодотворённой икры в инкубационно-мальковый цех, выращивания
          товарной рыбы, переработки, хранения и реализации готовой продукции.
          Обеспечены квалифицированным составом управляющих, технологов,
          ветеринаров, рыбоводов, инженеров и т.д. решающие сложные задачи
          производственного цикла. <br /> <br /> В 2025 году открыто 7 фирменных
          магазинов.
        </p>
      </Container>
    </main>
  );
}
