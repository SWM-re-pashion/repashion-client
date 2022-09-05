import type { IconProps } from 'types/props';

function BasicHeart({ stroke, size, className, style }: IconProps) {
  return (
    <svg
      {...{ className, style }}
      width={size}
      height="100%"
      viewBox="0 0 31 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.0919 28L12.9169 25.9858C5.19186 18.8599 0.0918579 14.1602 0.0918579 8.39237C0.0918579 3.69264 3.72186 0 8.34186 0C10.9519 0 13.4569 1.23597 15.0919 3.1891C16.7269 1.23597 19.2319 0 21.8419 0C26.4619 0 30.0919 3.69264 30.0919 8.39237C30.0919 14.1602 24.9919 18.8599 17.2669 26.0011L15.0919 28Z"
        fill={stroke || '#959595'}
      />
    </svg>
  );
}
export { BasicHeart };
