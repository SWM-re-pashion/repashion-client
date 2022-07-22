import type { StyleProps } from 'types/props';

function Skirt({ className, style }: StyleProps) {
  return (
    <svg
      {...{ className, style }}
      width="90"
      height="74"
      viewBox="0 0 90 74"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M13 0H58L66 74H0L13 0Z" fill="#DFD3FF" />
      <path d="M77 0H32L24 74H90L77 0Z" fill="#DFD3FF" />
      <path d="M20 0H70L78 74H12L20 0Z" fill="#936DFF" />
      <path
        d="M31 5.5L27.5 52"
        stroke="#DFD3FF"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="2 2"
      />
      <path
        d="M37 6L35 36.5"
        stroke="#DFD3FF"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="2 2"
      />
      <path
        d="M60 5.5L63.5 52"
        stroke="#DFD3FF"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="2 2"
      />
    </svg>
  );
}
export { Skirt };
