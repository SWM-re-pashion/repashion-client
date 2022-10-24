import type { StyleProps } from '#types/props';

function Strong({ className, style }: StyleProps) {
  return (
    <svg
      {...{ className, style }}
      width="7"
      height="14"
      viewBox="0 0 7 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="4.41421"
        y1="1"
        x2="6"
        y2="2.58579"
        stroke="#936DFF"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="1"
        y1="-1"
        x2="3.24264"
        y2="-1"
        transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 3 13)"
        stroke="#936DFF"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="1"
        y1="7"
        x2="5"
        y2="7"
        stroke="#936DFF"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
export { Strong };
