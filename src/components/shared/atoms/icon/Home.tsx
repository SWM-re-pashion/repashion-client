import type { IconProps } from '#types/props';

function Home({ className, style, fill }: IconProps) {
  return (
    <svg
      {...{ className, style }}
      width="20"
      height="17"
      viewBox="0 0 20 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 17V11H12V17H17V9H20L10 0L0 9H3V17H8Z"
        fill={fill || 'black'}
        fillOpacity="0.87"
      />
    </svg>
  );
}
export { Home };
