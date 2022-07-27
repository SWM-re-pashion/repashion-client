import type { StyleProps } from 'types/props';

function Filter({ className, style }: StyleProps) {
  return (
    <svg
      {...{ className, style }}
      width="19"
      height="19"
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line y1="2.5" x2="19" y2="2.5" stroke="#936DFF" strokeWidth="3" />
      <line
        opacity="0.5"
        y1="9.5"
        x2="19"
        y2="9.5"
        stroke="#936DFF"
        strokeWidth="3"
      />
      <line y1="16.5" x2="19" y2="16.5" stroke="#936DFF" strokeWidth="3" />
      <circle cx="13.5" cy="2.5" r="2.5" fill="#C9B6FF" />
      <circle cx="5.5" cy="16.5" r="2.5" fill="#C9B6FF" />
    </svg>
  );
}
export { Filter };
