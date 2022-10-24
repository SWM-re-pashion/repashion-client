import type { StyleProps } from '#types/props';

function Check({ className, style }: StyleProps) {
  return (
    <svg
      {...{ className, style }}
      width="13"
      height="10"
      viewBox="0 0 13 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.5 5L5 8.5L11.5 2"
        stroke="#4A4A4A"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export { Check };
