import { Icon, type IconProps } from "../Icon";

export interface ArrowRightIconProps extends Omit<IconProps, "children" | "viewBox"> {}

/**
 * ArrowRight icon component
 * Generated from public/svg/arrow-right.svg
 */
export function ArrowRightIcon(props: ArrowRightIconProps) {
  return (
    <Icon viewBox="0 0 36 36" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M12.7343 27.7955C12.2552 27.3562 12.2552 26.6438 12.7343 26.2045L20.8125 18.7955C21.2915 18.3562 21.2915 17.6438 20.8125 17.2045L12.7343 9.79549C12.2552 9.35615 12.2552 8.64385 12.7343 8.2045C13.2133 7.76517 13.9899 7.76517 14.469 8.2045L22.5472 15.6135C23.9843 16.9315 23.9843 19.0685 22.5472 20.3865L14.469 27.7955C13.9899 28.2348 13.2133 28.2348 12.7343 27.7955Z" fill="#333B8F"/>
    </Icon>
  );
}
