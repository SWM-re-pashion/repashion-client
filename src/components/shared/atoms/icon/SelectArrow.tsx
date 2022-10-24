import type { StyleProps } from '#types/props';

function SelectArrow({ className, style }: StyleProps) {
  return (
    <svg
      {...{ className, style }}
      width="12"
      height="6"
      viewBox="0 0 12 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.92383 1L6.24098 5L10.5581 1"
        stroke="#303030"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export { SelectArrow };
