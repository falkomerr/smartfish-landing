'use client';

import { Container } from '@/shared/ui/container';
import { HeroShape } from '@/widgets/hero-shape';
import { ProductList } from '@/widgets/product-list';

export default function Home() {
  return (
    <main className='relative min-h-screen'>
      <HeroShape
        imageSrc='/hero.png'
        imageAlt='Слабосоленые куски форели'
        buttonText='Перейти в каталог'
        buttonPosition={{ x: 20, y: 33.5 }}
        onButtonClick={() => {
          console.log('Переход в каталог');
        }}
      />

      <Container className='flex h-screen flex-col gap-y-12 pt-80 **:z-50'>
        <p className='text-heading'>
          Рыбные изделия <br />
          <span className='text-heading text-[#333B8F] italic'> высокого качества</span> <br /> для
          каждого дня
        </p>

        <p className='text-default max-w-160 text-[16px]'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>

        <ProductList
          className='mt-70'
          products={[
            {
              image: '/hero.png',
              imageAlt: 'Слабосоленые куски форели',
              name: 'Слабосоленые куски форели',
              currentPrice: '100',
              originalPrice: '100',
              discount: 10,
            },
            {
              image: '/hero.png',
              imageAlt: 'Слабосоленые куски форели',
              name: 'Слабосоленые куски форели',
              currentPrice: '100',
              originalPrice: '100',
            },
            {
              image: '/hero.png',
              imageAlt: 'Слабосоленые куски форели',
              name: 'Слабосоленые куски форели',
              currentPrice: '100',
              originalPrice: '100',
              discount: 10,
            },
          ]}
        />
      </Container>
    </main>
  );
}
