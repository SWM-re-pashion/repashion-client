import type { StyleProps } from '#types/props';

function Plus({ className, style }: StyleProps) {
  return (
    <svg
      {...{ className, style }}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 10H20" stroke="white" strokeWidth="4" />
      <path d="M10 0L10 20" stroke="white" strokeWidth="4" />
    </svg>
  );
}
export { Plus };
