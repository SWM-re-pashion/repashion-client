import type { IconProps } from '#types/props';

function Chat({ className, style, fill }: IconProps) {
  return (
    <svg
      {...{ className, style }}
      width="18"
      height="15"
      viewBox="0 0 18 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 0C2.68629 0 0 2.68629 0 6V6.57949C0 9.79889 2.53556 12.4261 5.71865 12.573V14.8665L8.00565 12.5795H11.1539C14.4676 12.5795 17.1539 9.8932 17.1539 6.57949V6C17.1539 2.68629 14.4676 0 11.1539 0H6Z"
        fill={fill || '#212121'}
      />
    </svg>
  );
}
export { Chat };
