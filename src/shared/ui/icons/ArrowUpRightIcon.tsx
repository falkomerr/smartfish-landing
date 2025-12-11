import { Icon, type IconProps } from '../Icon';

export interface ArrowUpRightIconProps extends Omit<IconProps, 'children' | 'viewBox'> {}

/**
 * Arrow up right icon component
 */
export function ArrowUpRightIcon(props: ArrowUpRightIconProps) {
  return (
    <Icon viewBox='0 0 24 24' {...props}>
      <path
        d='M7 17L17 7M17 7H7M17 7V17'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        fill='none'
      />
    </Icon>
  );
}
