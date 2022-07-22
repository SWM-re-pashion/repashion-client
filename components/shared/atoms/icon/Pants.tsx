import type { StyleProps } from 'types/props';

function Pants({ className, style }: StyleProps) {
  return (
    <svg
      {...{ className, style }}
      width="86"
      height="80"
      viewBox="0 0 86 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 0H46L40 80H0V0Z" fill="#936DFF" />
      <path d="M43 0H86V80H50L43 0Z" fill="#8860FB" />
      <rect width="86" height="13" fill="#DFD3FF" />
      <path
        d="M14 13.5V19C14 26.4558 7.95584 32.5 0.5 32.5V32.5"
        stroke="#DFD3FF"
      />
      <path
        d="M18 14V20C18 29.3888 10.3888 37 1 37V37"
        stroke="#DFD3FF"
        stroke-dasharray="2 2"
      />
      <path
        d="M67 14V20C67 29.3888 74.6112 37 84 37V37"
        stroke="#DFD3FF"
        stroke-dasharray="2 2"
      />
      <path
        d="M72 13.5V19C72 26.4558 78.0442 32.5 85.5 32.5V32.5"
        stroke="#DFD3FF"
      />
    </svg>
  );
}
export { Pants };
