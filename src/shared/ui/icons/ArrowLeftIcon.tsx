import { Icon, type IconProps } from '../Icon';

export interface ArrowLeftIconProps extends Omit<IconProps, 'children' | 'viewBox'> {}

/**
 * ArrowLeft icon component
 * Generated from public/svg/arrow-right.svg (mirrored)
 */
export function ArrowLeftIcon(props: ArrowLeftIconProps) {
  return (
    <Icon viewBox='0 0 36 36' {...props}>
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M23.2657 27.7955C23.7448 27.3562 23.7448 26.6438 23.2657 26.2045L15.1875 18.7955C14.7085 18.3562 14.7085 17.6438 15.1875 17.2045L23.2657 9.79549C23.7448 9.35615 23.7448 8.64385 23.2657 8.2045C22.7867 7.76517 22.0101 7.76517 21.531 8.2045L13.4528 15.6135C12.0157 16.9315 12.0157 19.0685 13.4528 20.3865L21.531 27.7955C22.0101 28.2348 22.7867 28.2348 23.2657 27.7955Z'
        fill='#333B8F'
      />
    </Icon>
  );
}
