import type { IconProps } from '#types/props';

function Home({ className, style, fill }: IconProps) {
  return (
    <svg
      {...{ className, style }}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 20V14H14V20H19V12H22L12 3L2 12H5V20H10Z"
        fill={fill || 'black'}
        fillOpacity="0.87"
      />
    </svg>
  );
}
export { Home };
