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

      <Container
        className='flex min-h-screen flex-col **:z-50'
        style={{
          gap: 'clamp(1.875vw, 2.5vw, 6.25vw)',
          paddingTop: 'clamp(12.5vw, 16.667vw, 41.667vw)',
        }}
      >
        <p className='text-heading'>
          Рыбные изделия <br />
          <span className='text-heading text-[#333B8F] italic'> высокого качества</span> <br /> для
          каждого дня
        </p>

        <p
          className='text-default'
          style={{
            maxWidth: 'clamp(25vw, 33.333vw, 80vw)',
            fontSize: 'clamp(0.625vw, 0.833vw, 2.083vw)',
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>

        <ProductList
          style={{
            marginTop: 'clamp(10.938vw, 14.583vw, 36.458vw)',
          }}
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
