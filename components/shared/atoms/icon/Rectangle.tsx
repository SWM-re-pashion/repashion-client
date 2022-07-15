import type { StyleProps } from 'types/props';

function Rectangle({ className, style }: StyleProps) {
  return (
    <svg
      {...{ className, style }}
      width="567"
      height="567"
      viewBox="0 0 567 567"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="157.571"
        width="438.4"
        height="438.4"
        transform="rotate(21.0647 157.571 0)"
        fill="#FF61D7"
      />
    </svg>
  );
}
export { Rectangle };
