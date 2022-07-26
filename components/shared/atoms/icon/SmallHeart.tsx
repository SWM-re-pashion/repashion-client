import type { StyleProps } from 'types/props';

function SmallHeart({ className, style }: StyleProps) {
  return (
    <svg
      {...{ className, style }}
      width="8"
      height="7"
      viewBox="0 0 8 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 7L3.42 6.49646C1.36 4.71499 0 3.54005 0 2.09809C0 0.923161 0.968 0 2.2 0C2.896 0 3.564 0.308992 4 0.797275C4.436 0.308992 5.104 0 5.8 0C7.032 0 8 0.923161 8 2.09809C8 3.54005 6.64 4.71499 4.58 6.50027L4 7Z"
        fill="#FF9635"
      />
    </svg>
  );
}
export { SmallHeart };
