import type { StyleProps } from '#types/props';

function Time({ className, style }: StyleProps) {
  return (
    <svg
      {...{ className, style }}
      width="11"
      height="10"
      viewBox="0 0 11 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="5.5" cy="5" r="4.5" stroke="#9E9E9E" />
      <path
        d="M5.5 2.75V5H7.1875"
        stroke="#9E9E9E"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export { Time };
