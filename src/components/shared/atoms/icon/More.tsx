import type { StyleProps } from '#types/props';

function More({ className, style }: StyleProps) {
  return (
    <svg
      {...{ className, style }}
      width="4"
      height="20"
      viewBox="0 0 4 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="2" cy="2" r="2" fill="white" />
      <circle cx="2" cy="10" r="2" fill="white" />
      <circle cx="2" cy="18" r="2" fill="white" />
    </svg>
  );
}
export { More };
