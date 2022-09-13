import type { IconProps } from 'types/props';

function Shop({ className, style, fill }: IconProps) {
  return (
    <svg
      {...{ className, style }}
      width="17"
      height="14"
      viewBox="0 0 17 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.16123 1.58094C1.35883 0.658801 2.17376 0 3.11683 0H5V7H0L1.16123 1.58094Z"
        fill={fill || 'black'}
      />
      <path
        d="M15.8388 1.58094C15.6412 0.658801 14.8262 0 13.8832 0H12V7H17L15.8388 1.58094Z"
        fill={fill || 'black'}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.5 3C10.0385 3 11.2857 1.65685 11.2857 0H14C14.5523 0 15 0.447715 15 1V14H2V1C2 0.447716 2.44772 0 3 0H5.71429C5.71429 1.65685 6.96149 3 8.5 3Z"
        fill={fill || 'black'}
      />
    </svg>
  );
}
export { Shop };
