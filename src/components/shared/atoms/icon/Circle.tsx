import type { StyleProps } from '#types/props';

function Circle({ className, style }: StyleProps) {
  return (
    <svg
      {...{ className, style }}
      width="103"
      height="103"
      viewBox="0 0 103 103"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="51.5" cy="51.5" r="51.5" fill="#936DFF" />
    </svg>
  );
}
export { Circle };
