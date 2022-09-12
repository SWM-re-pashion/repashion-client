import type { StyleProps } from 'types/props';

function Search({ className, style }: StyleProps) {
  return (
    <svg
      {...{ className, style }}
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        opacity="0.5"
        x="15"
        y="17.8286"
        width="4"
        height="5"
        transform="rotate(-45 15 17.8286)"
        fill="#936DFF"
      />
      <circle cx="10" cy="10" r="8" stroke="#936DFF" strokeWidth="4" />
    </svg>
  );
}
export { Search };
