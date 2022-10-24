import type { IconProps } from '#types/props';

function ImgClose({ className, style, fill, size }: IconProps) {
  return (
    <svg
      {...{ className, style }}
      width={size || '20'}
      height={size || '20'}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="10" cy="10" r="10" fill={fill || '#6A6A6A'} />
      <path
        d="M7 7L13 13"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 7L7 13"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export { ImgClose };
