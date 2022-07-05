import type { StyleProps } from 'types/props';

function RangeBtn({ className, style }: StyleProps) {
  return (
    <svg
      {...{ className, style }}
      width="29"
      height="16"
      viewBox="0 0 29 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="29" height="16" rx="8" fill="#936DFF" />
      <rect x="7" y="4" width="3" height="8" rx="1.5" fill="white" />
      <rect x="13" y="4" width="3" height="8" rx="1.5" fill="white" />
      <rect x="19" y="4" width="3" height="8" rx="1.5" fill="white" />
    </svg>
  );
}
export { RangeBtn };
