import { Button } from '@/shared/ui/button';
import { Container } from '@/shared/ui/container';
import { BurgerIcon, CartIcon, HeartIcon, SearchIcon } from '@/shared/ui/icons';
import { Input } from '@/shared/ui/input';
import { Logo } from '@/shared/ui/logo';

export const Header = () => {
  return (
    <header className='absolute top-0 left-0 w-full py-4'>
      <Container className='w-full items-center justify-between'>
        <div className='flex items-center gap-6'>
          <Logo className='size-12.5' />
          <Button variant='secondary' size='lg'>
            <BurgerIcon />
            <p className='text-default'>Меню</p>
          </Button>
          <Input
            placeholder='Поиск в магазине'
            className='text-default min-w-125'
            leftIcon={
              <div className='flex size-10.5 items-center justify-center rounded-full bg-white'>
                <SearchIcon className='scale-110' />
              </div>
            }
          />
        </div>
        <div className='z-50 flex items-center gap-6'>
          <Button variant='tertiary' size='lg'>
            <HeartIcon className='size-5' />
          </Button>
          <Button variant='tertiary' size='lg'>
            <CartIcon className='size-5' />
          </Button>
          <Button variant='tertiary' size='lg'>
            Войти
          </Button>
        </div>
      </Container>
    </header>
  );
};
