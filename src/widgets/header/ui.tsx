import { Button } from '@/shared/ui/button';
import { Container } from '@/shared/ui/container';
import { BurgerIcon, CartIcon, HeartIcon, SearchIcon } from '@/shared/ui/icons';
import { Input } from '@/shared/ui/input';
import { Logo } from '@/shared/ui/logo';

export const Header = () => {
  return (
    <header
      className='absolute top-0 left-0 w-full'
      style={{
        paddingTop: 'clamp(0.625vw, 0.833vw, 2.083vw)',
        paddingBottom: 'clamp(0.625vw, 0.833vw, 2.083vw)',
      }}
    >
      <Container className='w-full items-center justify-between'>
        <div
          className='flex items-center'
          style={{
            gap: 'clamp(0.938vw, 1.25vw, 3.125vw)',
          }}
        >
          <Logo
            style={{
              width: 'clamp(1.953vw, 2.604vw, 6.51vw)',
              height: 'clamp(1.953vw, 2.604vw, 6.51vw)',
            }}
          />
          <Button variant='secondary' size='lg'>
            <BurgerIcon />
            <p className='text-body-sm'>Меню</p>
          </Button>
          <Input
            placeholder='Поиск в магазине'
            className='text-body-sm'
            style={{
              minWidth: 'clamp(19.531vw, 26.042vw, 65.104vw)',
            }}
            leftIcon={
              <div
                className='flex items-center justify-center rounded-full bg-white'
                style={{
                  width: 'clamp(1.641vw, 2.188vw, 5.469vw)',
                  height: 'clamp(1.641vw, 2.188vw, 5.469vw)',
                }}
              >
                <SearchIcon className='scale-110' />
              </div>
            }
          />
        </div>
        <div
          className='z-50 flex items-center'
          style={{
            gap: 'clamp(0.938vw, 1.25vw, 3.125vw)',
          }}
        >
          <Button variant='tertiary' size='lg'>
            <HeartIcon
              style={{
                width: 'clamp(0.781vw, 1.042vw, 2.604vw)',
                height: 'clamp(0.781vw, 1.042vw, 2.604vw)',
              }}
            />
          </Button>
          <Button variant='tertiary' size='lg'>
            <CartIcon
              style={{
                width: 'clamp(0.781vw, 1.042vw, 2.604vw)',
                height: 'clamp(0.781vw, 1.042vw, 2.604vw)',
              }}
            />
          </Button>
          <Button variant='tertiary' size='lg'>
            Войти
          </Button>
        </div>
      </Container>
    </header>
  );
};
