import type { StyleProps } from 'types/props';

function Polygon({ className, style }: StyleProps) {
  return (
    <svg
      {...{ className, style }}
      width="571"
      height="519"
      viewBox="0 0 571 519"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M328.049 0.487926L570.302 518.768L0.331331 469.426L328.049 0.487926Z"
        fill="#FF9635"
      />
    </svg>
  );
}
export { Polygon };
