import type { StyleProps } from 'types/props';

function SmallTriangle({ className, style }: StyleProps) {
  return (
    <svg
      {...{ className, style }}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M11 7L0.500001 0.937822L0.5 13.0622L11 7Z" fill="#e3e1e133" />
    </svg>
  );
}
export { SmallTriangle };
