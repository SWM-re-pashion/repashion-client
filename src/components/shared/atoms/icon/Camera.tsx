import type { IconProps } from '#types/props';

function Camera({ className, style }: IconProps) {
  return (
    <svg
      {...{ className, style }}
      width="20"
      height="19"
      viewBox="0 0 20 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="1"
        y="4"
        width="18"
        height="14"
        rx="3"
        stroke="white"
        strokeWidth="2"
      />
      <path
        d="M12 1L15 1"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="11" r="3" stroke="white" strokeWidth="2" />
    </svg>
  );
}
export { Camera };
