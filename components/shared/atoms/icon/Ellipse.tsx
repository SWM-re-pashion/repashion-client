import type { StyleProps } from 'types/props';

function Ellipse({ className, style }: StyleProps) {
  return (
    <svg
      {...{ className, style }}
      width="274"
      height="274"
      viewBox="0 0 274 274"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="137" cy="137" r="137" fill="#936DFF" />
      <circle cx="137" cy="137" r="137" fill="url(#paint0_linear_234_20)" />
      <defs>
        <linearGradient
          id="paint0_linear_234_20"
          x1="137"
          y1="0"
          x2="137"
          y2="274"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#936DFF" stopOpacity="0" />
          <stop offset="1" stopColor="#713FFF" />
        </linearGradient>
      </defs>
    </svg>
  );
}
export { Ellipse };
