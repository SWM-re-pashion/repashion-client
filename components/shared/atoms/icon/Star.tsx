import type { StyleProps } from 'types/props';

function Star({ className, style }: StyleProps) {
  return (
    <svg
      {...{ className, style }}
      width="124"
      height="130"
      viewBox="0 0 124 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M62 0L77.2654 18.0178L100.206 12.4139L101.965 35.9634L123.819 44.9139L111.4 65L123.819 85.0861L101.965 94.0366L100.206 117.586L77.2654 111.982L62 130L46.7346 111.982L23.794 117.586L22.0346 94.0366L0.181328 85.0861L12.6 65L0.181328 44.9139L22.0346 35.9634L23.794 12.4139L46.7346 18.0178L62 0Z"
        fill="#B3FF85"
      />
    </svg>
  );
}
export { Star };
