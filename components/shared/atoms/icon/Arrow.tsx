import type { StyleProps } from 'types/props';

function Arrow({ className, style }: StyleProps) {
  return (
    <svg
      {...{ className, style }}
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M13 9L7 15L13 21" stroke="white" strokeWidth="2" />
      <line x1="8" y1="15" x2="23" y2="15" stroke="white" strokeWidth="2" />
    </svg>
  );
}
export { Arrow };
