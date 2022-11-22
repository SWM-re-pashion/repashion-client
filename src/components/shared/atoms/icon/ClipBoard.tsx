import type { IconProps } from '#types/props';

function ClipBoard({ className, style, stroke }: IconProps) {
  return (
    <svg
      {...{ className, style }}
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-copy"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={stroke || '#9e9e9e'}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" />
      <rect x="8" y="8" width="12" height="12" rx="2" />
      <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" />
    </svg>
  );
}
export { ClipBoard };
