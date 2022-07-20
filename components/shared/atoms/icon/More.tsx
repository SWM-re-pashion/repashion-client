import type { StyleProps } from 'types/props';

function More({ className, style }: StyleProps) {
  return (
    <svg
      {...{ className, style }}
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="15" cy="7" r="2" fill="white" />
      <circle cx="15" cy="15" r="2" fill="white" />
      <circle cx="15" cy="23" r="2" fill="white" />
    </svg>
  );
}
export { More };
